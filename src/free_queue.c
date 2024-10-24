#include <emscripten.h>
#include <emscripten/wasm_worker.h>
#include <stdatomic.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h> 

#ifdef __cplusplus
extern "C" {
#endif

struct FreeQueue {
  size_t buffer_length;
  size_t channel_count;
  double **channel_data;
  atomic_uint *state;
  emscripten_lock_t lock;
};

/**
 * An index set for shared state fields.
 * @enum {number}
 */
enum FreeQueueState {
  /** @type {number} A shared index for reading from the queue. (consumer) */
  READ = 0,
  /** @type {number} A shared index for writing into the queue. (producer) */
  WRITE = 1
};

uint32_t _getAvailableRead(
  struct FreeQueue *queue, 
  uint32_t read_index, 
  uint32_t write_index
) 
{  
  if (write_index >= read_index)
    return write_index - read_index;
  
  return write_index + queue->buffer_length - read_index;
}

uint32_t _getAvailableWrite(
  struct FreeQueue *queue, 
  uint32_t read_index, 
  uint32_t write_index
) {
  if (write_index >= read_index)
    return queue->buffer_length - write_index + read_index - 1;
  return read_index - write_index - 1;
}

EMSCRIPTEN_KEEPALIVE
int TryLock( struct FreeQueue *queue )
{
	if ( queue ) {
		if( !emscripten_lock_try_acquire( &queue->lock ) ) return 0;
		emscripten_lock_init( &queue->lock );
	}
	return 1;
}

EMSCRIPTEN_KEEPALIVE
void Lock( struct FreeQueue *queue )
{
	if ( queue ) {
		emscripten_lock_init( &queue->lock );
	}
}

EMSCRIPTEN_KEEPALIVE
void Unlock( struct FreeQueue *queue )
{
	if ( queue ) {
		emscripten_lock_release( &queue->lock );		
	}
}

EMSCRIPTEN_KEEPALIVE
void ChangeChannelsCount( struct FreeQueue *queue, size_t channel_count ) 
{
	if ( queue ) {
                Lock( queue );

		if ( queue->channel_count != channel_count && channel_count > 0 )
                {
                    queue->channel_count = channel_count;
                    queue->channel_data = (double **)realloc(queue->channel_data, queue->channel_count * sizeof(double *));
                    for (int i = 0; i < queue->channel_count; i++) {
                        queue->channel_data[i] = (double *)realloc(queue->channel_data[i], queue->buffer_length * sizeof(double));
//                        for (int j = 0; j < queue->buffer_length; j++) {
//                            queue->channel_data[i][j] = 0;
//                        }
                    }
                }

                Unlock( queue );
	}
}

EMSCRIPTEN_KEEPALIVE
void ChangeBufferLength( struct FreeQueue *queue, size_t length ) 
{
	if ( queue ) {
                Lock( queue );

		if ( queue->buffer_length != length + 1 && length > 0 )
		{
                    queue->buffer_length = length + 1;
                    queue->channel_data = (double **)realloc(queue->channel_data, queue->channel_count * sizeof(double *));
                    for (int i = 0; i < queue->channel_count; i++) {
                        queue->channel_data[i] = (double *)realloc(queue->channel_data[i], queue->buffer_length * sizeof(double));
//                        for (int j = 0; j < queue->buffer_length; j++) {
//                            queue->channel_data[i][j] = 0;
//                        }
                    }
                }

                Unlock( queue );
	}
}

EMSCRIPTEN_KEEPALIVE
void *CreateFreeQueue(size_t length, size_t channel_count) 
{
  struct FreeQueue *queue = (struct FreeQueue *)malloc(sizeof(struct FreeQueue));
  if ( queue ) {
    queue->buffer_length = length + 1;
    queue->channel_count = channel_count;
    queue->lock = 0;
    queue->state = (atomic_uint *)malloc(2 * sizeof(atomic_uint));
    atomic_store(queue->state + READ, 0);
    atomic_store(queue->state + WRITE, 0);
    queue->channel_data = (double **)malloc(queue->channel_count * sizeof(double *));
    for (int i = 0; i < queue->channel_count; i++) {
      queue->channel_data[i] = (double *)malloc(queue->buffer_length * sizeof(double));
      for (int j = 0; j < queue->buffer_length; j++) {
        queue->channel_data[i][j] = 0;
      }
    }
    return (void*)queue;
  }
  return 0;
}

EMSCRIPTEN_KEEPALIVE
void DestroyFreeQueue(struct FreeQueue *queue) 
{
  if ( queue ) {
    Lock( queue );

    for (int i = 0; i < queue->channel_count; i++) {
      free(queue->channel_data[i]);
    }
    free(queue->channel_data);
    free(queue);

    Unlock( queue );
  }
}

EMSCRIPTEN_KEEPALIVE
bool FreeQueuePush(struct FreeQueue *queue, double **input, size_t block_length) 
{
  if ( queue ) 
  {
    Lock( queue );

    uint32_t current_read = atomic_load(queue->state + READ);
    uint32_t current_write = atomic_load(queue->state + WRITE);
  
    if (_getAvailableWrite(queue, current_read, current_write) < block_length) {
      Unlock( queue );

      return false;
    }
    for (uint32_t i = 0; i < block_length; i++) {
      for (uint32_t channel = 0; channel < queue->channel_count; channel++) {
        queue->channel_data[channel][(current_write + i) % queue->buffer_length] = 
            input[channel][i];
      }
    }

    uint32_t next_write = (current_write + block_length) % queue->buffer_length;
    atomic_store(queue->state + WRITE, next_write);

    Unlock( queue );

    return true;
  }

  return false;
}

EMSCRIPTEN_KEEPALIVE
bool FreeQueuePull(struct FreeQueue *queue, double **output, size_t block_length) 
{
  
  if ( queue ) {
    Lock( queue );

    uint32_t current_read = atomic_load(queue->state + READ);
    uint32_t current_write = atomic_load(queue->state + WRITE);
    if (_getAvailableRead(queue, current_read, current_write) < block_length) {

      Unlock( queue );
      return false;
    }
    for (uint32_t i = 0; i < block_length; i++) {
      for (uint32_t channel = 0; channel < queue->channel_count; channel++) {
        output[channel][i] = 
            queue->channel_data[channel][(current_read + i) % queue->buffer_length];
      }
    }
    uint32_t nextRead = (current_read + block_length) % queue->buffer_length;
    atomic_store(queue->state + READ, nextRead);
    Unlock( queue );
    return true;
  }
  return false;
}

EMSCRIPTEN_KEEPALIVE
void *GetFreeQueueObjectPointer( struct FreeQueue* queue, void* object ) 
{
  if ( queue ) {
    printf( "object: %p\n", object );
    return (void*)object;
  }	
  return 0;
}

EMSCRIPTEN_KEEPALIVE
void *GetFreeQueuePointers( struct FreeQueue* queue, char* data ) 
{
  if ( queue ) {
    if ( strcmp(data, "buffer_length") == 0 ) {
      return ( void* )&queue->buffer_length;
    } else if ( strcmp(data, "channel_count") == 0 ) {
      return ( void* )&queue->channel_count;
    } else if ( strcmp(data, "state") == 0 ) {
      return ( void* )&queue->state;
    } else if ( strcmp(data, "channel_data") == 0 ) {
      return ( void* )&queue->channel_data;
    } else if ( strcmp(data, "lock") == 0 ) {
      return ( void* )&Lock;
    } else if ( strcmp(data, "unlock") == 0 ) {
      return ( void* )&Unlock;
    } else if ( strcmp(data, "trylock") == 0 ) {
      return ( void* )&TryLock;
    }
  }
  return 0;
}

EMSCRIPTEN_KEEPALIVE 
void PrintQueueInfo(struct FreeQueue *queue) {
  if ( queue ) {
    Lock( queue );
    uint32_t current_read = atomic_load(queue->state + READ);
    uint32_t current_write = atomic_load(queue->state + WRITE);
    for (uint32_t channel = 0; channel < queue->channel_count; channel++) {
      printf("channel %d: ", channel);
      for (uint32_t i = 0; i < queue->buffer_length; i++) {
        printf("%f ", queue->channel_data[channel][i]);
      }
      printf("\n");
    }
    printf("----------\n");
    printf("current_read: %u  | current_write: %u\n", current_read, current_write);
    printf("available_read: %u  | available_write: %u\n", 
        _getAvailableRead(queue, current_read, current_write), 
        _getAvailableWrite(queue, current_read, current_write));
    printf("----------\n");
    Unlock( queue );
  }
}

EMSCRIPTEN_KEEPALIVE 
void PrintQueueAddresses(struct FreeQueue *queue) {
  if ( queue ) {
    Lock( queue );
    printf("buffer_length: %p   uint: %zu\n", 
        &queue->buffer_length, (size_t)&queue->buffer_length);
    printf("channel_count: %p   uint: %zu\n", 
        &queue->channel_count, (size_t)&queue->channel_count);
    printf("state       : %p   uint: %zu\n", 
        &queue->state, (size_t)&queue->state);
    printf("channel_data    : %p   uint: %zu\n", 
        &queue->channel_data, (size_t)&queue->channel_data);
    for (uint32_t channel = 0; channel < queue->channel_count; channel++) {
        printf("channel_data[%d]    : %p   uint: %zu\n", channel,
            &queue->channel_data[channel], (size_t)&queue->channel_data[channel]);
    }
    printf("state[0]    : %p   uint: %zu\n", &queue->state[0], (size_t)&queue->state[0]);
    printf("state[1]    : %p   uint: %zu\n", &queue->state[1], (size_t)&queue->state[1]);
    Unlock( queue );
  }
}

#ifdef __cplusplus
}
#endif

