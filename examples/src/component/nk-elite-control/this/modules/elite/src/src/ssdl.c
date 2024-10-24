/**
 *
 * Elite - The New Kind.
 *
 * SDL2 related routines, largely based on the original Allegro version of Graphics routines.
 * In fact, kinda hacky, trying to emulate Allegro at some placed in odd ways ...
 *
 * The code in this file has not been derived from the original Elite code.
 * Written by C.J.Pinder 1999-2001.
 * email: <christian@newkind.co.uk>
 * This code is re-worked/extened by G.Lenart (LGB) 2019, <lgblgblgb@gmail.com>
 *
 * Routines for drawing anti-aliased lines and circles by T.Harte.
 *
 **/

#include "etnk.h"

#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <ctype.h>

#include <SDL2/SDL.h>
#include "SDL2_gfxPrimitives.h"

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

#include "main.h"
#include "ssdl.h"
#include "elite.h"
#include "keyboard.h"
#include "datafile.h"
#include "sound.h"
#include "file.h"


SDL_Texture		*sdl_tex = NULL;
SDL_Texture		*sdl_tex_pri = NULL;
SDL_Window      *sdl_win = NULL;
SDL_Renderer    *sdl_ren = NULL;

#define MAX_POLYS	100

int scanner_width;
int scanner_height;
int wnd_width;
int wnd_height;
int wnd_fullscreen;
double wnd_scale;

static int start_poly;
static int total_polys;

int have_joystick;

struct poly_data
{
	int z;
	int no_points;
	int face_colour;
	int point_list[16];
	int next;
};

static struct poly_data poly_chain[MAX_POLYS];

#define RGBA_PARAM(col)				the_palette_r[col],the_palette_g[col],the_palette_b[col],0xFF

// sdl2_gfx substitutions of allegro functions

#define rectfilled(ren,tx,ty,bx,by,c)           boxRGBA(sdl_ren,tx,ty,bx,by,RGBA_PARAM(c))
#define rectsimple(ren,tx,ty,bx,by,c)           rectangleRGBA(sdl_ren,tx,ty,bx,by,RGBA_PARAM(c))
#define rectroundedfilled(ren,tx,ty,bx,by,c)    roundedBoxRGBA(sdl_ren,tx,ty,bx,by,6,RGBA_PARAM(c))
#define rectroundedsimple(ren,tx,ty,bx,by,c)    roundedRectangleRGBA(sdl_ren,tx,ty,bx,by,6,RGBA_PARAM(c))

#define	line(ren,x1,y1,x2,y2,c)                 lineRGBA(sdl_ren,x1,y1,x2,y2,RGBA_PARAM(c))
#define hline(ren,x1,y,x2,c)                    hlineRGBA(sdl_ren,x1,x2,y,RGBA_PARAM(c))
#define vline(ren,x1,y1,y2,c)                   vlineRGBA(sdl_ren,x1,y1,y2,RGBA_PARAM(c))

#define putpixel(ren,x,y,c)                     pixelRGBA(sdl_ren,x,y,RGBA_PARAM(c))
#define triangle(ren,x1,y1,x2,y2,x3,y3,c)       filledTrigonRGBA(sdl_ren,x1,y1,x2,y2,x3,y3,RGBA_PARAM(c))

//#define textout(g,font,str,x,y,c)		fprintf(stderr,"FIXME: no string function (textout) for displaying string \"%s\" at pos %d,%d\n",str,x,y)
//#define textout_centre(g,font,str,x,y,c)	fprintf(stderr,"FIXME: no string function (textout_centre) for displaying string \"%s\" at pos %d,%d\n",str,x,y)

#define textout(g,font,str,x,y,c)			stringRGBA(sdl_ren,x,y,str,RGBA_PARAM(c))
#define textout_centre(g,font,str,x,y,c)	stringRGBA(sdl_ren,x-strlen(str)*4,y,str,RGBA_PARAM(c))


Uint8 the_palette_r[0x100];
Uint8 the_palette_g[0x100];
Uint8 the_palette_b[0x100];
//Uint32 the_palette32[0x100];

static struct {
	SDL_Texture *tex;
	SDL_Rect rect;
} sprites[IMG_NUM_OF];


SDL_RWops *datafile_open ( const char *fn )
{
	const Uint8 *data_p;
	int data_size;
	datafile_select(fn, &data_p, &data_size);
	SDL_RWops *v = SDL_RWFromConstMem(data_p, data_size);
	if (!v) {
		ERROR_WINDOW("DATAFILE: cannot create rwmem from databank for \"%s\": %s", fn, SDL_GetError());
		exit(1);	// brutal ...
	}
	return v;
}

#define IS_IMG_EXTERNAL	0x100

static void load_sprite ( int i, const char *fn, SDL_Surface **pass_surface_back )
{
	SDL_Surface *surface;
	if (i & IS_IMG_EXTERNAL) {
		char path[PATH_MAX];
		i &= ~IS_IMG_EXTERNAL;
		sprintf(path, "%s%s", pref_path, fn);
		surface = SDL_LoadBMP(path);
		if (!surface) {
			printf("SPRITE: cannot load sprite %s: %s\n", path, SDL_GetError());
			return;
		}
	} else {
		surface = SDL_LoadBMP_RW(datafile_open(fn), 1);
		if (!surface) {
			ERROR_WINDOW("Cannot load \"%s\": %s", fn, SDL_GetError());
			exit(1);
		}
	}
	sprites[i].tex = SDL_CreateTextureFromSurface(sdl_ren, surface);
	if (!pass_surface_back)
		SDL_FreeSurface(surface);
	else
		*pass_surface_back = surface;
	if (!sprites[i].tex) {
		ERROR_WINDOW("Cannot create texture from \"%s\": %s", fn, SDL_GetError());
		exit(1);
	}
	if (SDL_QueryTexture(sprites[i].tex, NULL, NULL, &sprites[i].rect.w, &sprites[i].rect.h)) {
		ERROR_WINDOW("Cannot query texture for \"%s\": %s", fn, SDL_GetError());
		exit(1);
	}
	// these must be set by the drawer func ...
	sprites[i].rect.x = 0;
	sprites[i].rect.y = 0;
}

// Allegro fixed math stuffs to "emulate" ...
static ETNK_INLINE fixed itofix ( int x ) {
	return x << 16;
}

static ETNK_INLINE fixed ftofix ( double x ) {
	if (x > 32767.0) {
		//*allegro_errno = ERANGE;
		return 0x7FFFFFFF;
	}
	if (x < -32767.0) {
		//*allegro_errno = ERANGE;
		return -0x7FFFFFFF;
	}
	return (fixed)(x * 65536.0 + (x < 0 ? -0.5 : 0.5));
}

static ETNK_INLINE double fixtof ( fixed x ) {
	return (double)x / 65536.0;
}

static ETNK_INLINE fixed fixmul ( fixed x, fixed y ) {
	return ftofix(fixtof(x) * fixtof(y));
#if 0
	LONG_LONG lx = x;
	LONG_LONG ly = y;
	LONG_LONG lres = (lx*ly);
	if (lres > 0x7FFFFFFF0000LL) {
		*allegro_errno = ERANGE;
		return 0x7FFFFFFF;
	} else if (lres < -0x7FFFFFFF0000LL) {
		*allegro_errno = ERANGE;
		return 0x80000000;
	} else {
		int res = lres >> 16;
		return res;
	}
#endif
}

static ETNK_INLINE fixed fixdiv ( fixed x, fixed y ) {
	if (y == 0) {
		//*allegro_errno = ERANGE;
		return (x < 0) ? -0x7FFFFFFF : 0x7FFFFFFF;
	} else
		return ftofix(fixtof(x) / fixtof(y));
}

void gfx_texture_clone()
{
    Uint32 format;
    int w, h;
    SDL_BlendMode blendmode;
    SDL_Texture* renderTarget;
    // Get all properties from the texture we are duplicating
    SDL_QueryTexture(sdl_tex, &format, NULL, &w, &h);
    SDL_GetTextureBlendMode(sdl_tex, &blendmode);
    // Save the current rendering target (will be NULL if it is the current window)
    renderTarget = SDL_GetRenderTarget(sdl_ren);
    // Create a new texture with the same properties as the one we are duplicating
    sdl_tex_pri = SDL_CreateTexture(sdl_ren, format, SDL_TEXTUREACCESS_TARGET, w, h);
    // Set its blending mode and make it the render target
    SDL_SetTextureBlendMode(sdl_tex_pri, SDL_BLENDMODE_NONE);
    SDL_SetRenderTarget(sdl_ren, sdl_tex_pri);
    // Render the full original texture onto the new one
    SDL_RenderCopy(sdl_ren, sdl_tex, NULL, NULL);
    // Change the blending mode of the new texture to the same as the original one
    SDL_SetTextureBlendMode(sdl_tex_pri, blendmode);
    // Restore the render target
    SDL_SetRenderTarget(sdl_ren, renderTarget);
}

void gfx_swap_tex()
{
	SDL_Texture *sdl_tex_temp = sdl_tex;

	sdl_tex = sdl_tex_pri;
	sdl_tex_pri = sdl_tex_temp;

	if (SDL_SetRenderTarget(sdl_ren, sdl_tex)) {
		ERROR_WINDOW("Cannot set render target: %s", SDL_GetError());
	}
}

#define fmul(x,y)	fixmul(x,y)
#define fdiv(x,y)	fixdiv(x,y)

int gfx_graphics_startup (void)
{
	int status = 0;

#ifdef __EMSCRIPTEN__

	emscripten_get_canvas_size(&wnd_width, &wnd_height, &wnd_fullscreen);
//		emscripten_get_canvas_element_size("#canvas",&wnd_height, &wnd_height);
	wnd_width = 800;
	wnd_height = 600;
	wnd_fullscreen = 0;

#else

	wnd_width = 800;
	wnd_height = 600;
	wnd_fullscreen = 0;

#endif

	printf( "VIDEO: width: %d; height: %d; fullscreen: %d; scale: %f\n", wnd_width, wnd_height, wnd_fullscreen, wnd_scale);

	sdl_win = SDL_CreateWindow(
		OUR_WINDOW_TITLE,
		SDL_WINDOWPOS_UNDEFINED,
		SDL_WINDOWPOS_UNDEFINED,
		wnd_width, wnd_height,
		SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE
	);

	if (!sdl_win) {
		ERROR_WINDOW("Unable to open window: %s", SDL_GetError());
		return 1;
	}

	int rc_drv = SDL_GetNumRenderDrivers();
	for ( int i = 0; i < rc_drv; i++ ) {
		SDL_RendererInfo info;
		SDL_GetRenderDriverInfo( i, &info );
		printf( "InfoDrv: idx=%d name=%s\n", i, info.name );
	}

	sdl_ren = SDL_CreateRenderer(sdl_win, 0, SDL_RENDERER_ACCELERATED);
	if (!sdl_ren) {
		ERROR_WINDOW("Cannot create renderer: %s", SDL_GetError());
		return 1;
	}

	status = SDL_RenderSetLogicalSize(sdl_ren, wnd_width, wnd_height);
	if ( status ) {
		ERROR_WINDOW("Cannot set render logical size: %s", SDL_GetError());
		return 1;
	}

	SDL_PixelFormat *pixfmt = SDL_AllocFormat(PIXEL_FORMAT);
	if (!pixfmt) {
		ERROR_WINDOW("Cannot allocate pixel format: %s", SDL_GetError());
		return 1;
	}

#if 0
	datafile = load_datafile("elite.dat");
	if (!datafile) {
		set_gfx_mode(GFX_TEXT, 0, 0, 0, 0);
		ERROR_WINDOW("Error loading %s!\n", "elite.dat");
		return 1;
	}
#endif

#if 0
	scanner_image = load_bitmap(scanner_filename, the_palette);
	if (!scanner_image) {
		set_gfx_mode(GFX_TEXT, 0, 0, 0, 0);
		ERROR_WINDOW("Error reading scanner bitmap file.\n");
		return 1;
	}
#endif

	sdl_tex = SDL_CreateTexture(sdl_ren, PIXEL_FORMAT, SDL_TEXTUREACCESS_TARGET, wnd_width, wnd_height);
	if (!sdl_tex) {
		ERROR_WINDOW("Cannot create texture: %s", SDL_GetError());
		return 1;
	}

	sdl_tex_pri = SDL_CreateTexture(sdl_ren, PIXEL_FORMAT, SDL_TEXTUREACCESS_TARGET, wnd_width, wnd_height);
	if (!sdl_tex_pri) {
		ERROR_WINDOW("Cannot create texture: %s", SDL_GetError());
		return 1;
	}

	if (SDL_SetRenderTarget(sdl_ren, sdl_tex)) {
		ERROR_WINDOW("Cannot set render target: %s", SDL_GetError());
		return 1;
	}

	SDL_SetRenderDrawColor(sdl_ren, 0, 0, 0, 0xFF);
	SDL_RenderClear(sdl_ren);

	for (int a = 0; a < IMG_NUM_OF; a++)
		sprites[a].tex = NULL;

	SDL_Surface *surface = NULL;

	if (*scanner_filename) {
		printf("SCANNER: trying to use %s as the scanner\n", scanner_filename);
		load_sprite(IMG_THE_SCANNER | IS_IMG_EXTERNAL, scanner_filename, &surface);
	} else {
		printf("SCANNER: no external scanner was specified");
	}

	if (!surface) {
		printf("SCANNER: defaulting to built-in scanner ...");
		load_sprite(IMG_THE_SCANNER, "scanner.bmp",	&surface);
	}

	load_sprite(IMG_GREEN_DOT,      "greendot.bmp", NULL);
	load_sprite(IMG_RED_DOT,        "reddot.bmp",   NULL);
	load_sprite(IMG_BIG_S,          "safe.bmp",     NULL);
	load_sprite(IMG_ELITE_TXT,      "elitetx3.bmp", NULL);
	load_sprite(IMG_BIG_E,          "ecm.bmp",      NULL);
	load_sprite(IMG_BLAKE,          "blake.bmp",    NULL);
	load_sprite(IMG_MISSILE_GREEN,  "missgrn.bmp",  NULL);
	load_sprite(IMG_MISSILE_YELLOW, "missyell.bmp", NULL);
	load_sprite(IMG_MISSILE_RED,    "missred.bmp",  NULL);

	for (int a = 0; a < 0x100; a++) {
		the_palette_r[a] = surface->format->palette->colors[a].r;
		the_palette_g[a] = surface->format->palette->colors[a].g;
		the_palette_b[a] = surface->format->palette->colors[a].b;
		//the_palette32[a] = SDL_MapRGBA(pixfmt, the_palette_r[a], the_palette_g[a], the_palette_b[a], 0xFF);
	}

	SDL_FreeSurface(surface);
//	scanner_texture = SDL_CreateTextureFromSurface(sdl_ren, surface);
//	scanner_texture = sprites[0].tex;

	surface = SDL_LoadBMP_RW(datafile_open("icon.bmp"), 1);
	if (surface) {
		SDL_SetWindowIcon(sdl_win, surface);
		SDL_FreeSurface(surface);
	}

	scanner_width = sprites[IMG_THE_SCANNER].rect.w; 
	scanner_height = sprites[IMG_THE_SCANNER].rect.h;

	sprites[IMG_THE_SCANNER].rect.x = GFX_SCANNER_L_COORD;	// unlike other "sprites" the position is the same to put, always, so set it here ...
	sprites[IMG_THE_SCANNER].rect.y = GFX_SCANNER_T_COORD;

	
//  gfx_draw_simplerect(GFX_WINDOW_L_COORD, GFX_WINDOW_T_COORD, GFX_WINDOW_R_COORD, GFX_WINDOW_B_COORD, GFX_COL_WHITE);
//  gfx_draw_line (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD, GFX_VIEW_R_COORD, GFX_VIEW_T_COORD);
//  gfx_draw_line (GFX_VIEW_L_COORD, GFX_VIEW_T_COORD + GFX_VIEW_HSIZE, GFX_VIEW_R_COORD, GFX_VIEW_T_COORD + GFX_VIEW_HSIZE);
//	gfx_draw_line (0, 0, 0, GFX_WINDOW_B_COORD);
//	gfx_draw_line (0, 0, GFX_WINDOW_R_COORD, 0);
//	gfx_draw_line (GFX_WINDOW_R_COORD, 0, GFX_WINDOW_R_COORD, GFX_WINDOW_B_COORD);
//	gfx_draw_line (GFX_WINDOW_R_COORD, 0, GFX_WINDOW_R_COORD, GFX_WINDOW_B_COORD);
	
	gfx_draw_scanner();

#if 0
	/* Install a timer to regulate the speed of the game... */

	LOCK_VARIABLE(frame_count);
	LOCK_FUNCTION(frame_timer);
	frame_count = 0;
	install_int (frame_timer, speed_cap);
#endif	

	return 0;
}


void gfx_graphics_shutdown (void)
{
	puts("ETNK: graphics shutdown");
#if 0
	destroy_bitmap(scanner_image);
	destroy_bitmap(gfx_screen);
	unload_datafile(datafile);
#endif
}


/*
 * Blit the back buffer to the screen.
 */

void gfx_update_screen (void)
{
	SDL_SetRenderTarget(sdl_ren, NULL);
	SDL_SetRenderDrawColor(sdl_ren,0,0,0,0xFF);
	SDL_RenderClear(sdl_ren);
	SDL_RenderCopy(sdl_ren, sdl_tex, NULL, NULL);
	SDL_RenderPresent(sdl_ren);
	SDL_SetRenderTarget(sdl_ren, sdl_tex);
	SDL_SetRenderDrawColor(sdl_ren,0,0,0,0xFF);
	SDL_RenderClear(sdl_ren);

//    #ifdef __EMSCRIPTEN__
//        emscripten_sleep(speed_cap);
//    #else
//        SDL_Delay(speed_cap);
//    #endif

}

void gfx_acquire_screen (void)
{
	// acquire_bitmap (gfx_screen);
	// puts("FIXME: gfx_acquire_screen() is not implemented");
}

void gfx_release_screen (void)
{
	// release_bitmap(gfx_screen);
	// puts("FIXME: gfx_release_screen() is not implemented");
}

void gfx_fast_plot_pixel (int x, int y, int circle_colour)
{
	pixelRGBA( sdl_ren, x, y, the_palette_r[circle_colour], the_palette_g[circle_colour], the_palette_b[circle_colour], 0xff);
}

void gfx_plot_pixel (int x, int y, int circle_colour)
{
	pixelRGBA( sdl_ren, x, y, the_palette_r[circle_colour], the_palette_g[circle_colour], the_palette_b[circle_colour], 0xff);
}

#define AA_BITS 3
#define AA_AND  7
#define AA_BASE 235

#define trunc(x) ((x) & ~65535)
#define frac(x) ((x) & 65535)
#define invfrac(x) (65535-frac(x))
#define plot(x,y,c) putpixel(gfx_screen, (x), (y), (c)+AA_BASE)

/*
 * Draw anti-aliased wireframe circle.
 * By T.Harte.
 */

void gfx_draw_aa_circle(int cx, int cy, int radius)
{
	int x,y;
	int s;
	int sx, sy;

	cx += GFX_X_OFFSET;
	cy += GFX_Y_OFFSET;

	radius >>= (16 - AA_BITS);

	x = radius;
	s = -radius;
	y = 0;

	while (y <= x)
	{
		/* wide pixels */
		sx = cx + (x >> AA_BITS); sy = cy + (y >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx + 1,	sy,	x&AA_AND);

		sy = cy - (y >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx + 1,	sy,	x&AA_AND);

		sx = cx - (x >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx - 1,	sy,	x&AA_AND);

		sy = cy + (y >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx - 1,	sy,	x&AA_AND);

		/* tall pixels */
		sx = cx + (y >> AA_BITS); sy = cy + (x >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx,	sy + 1,	x&AA_AND);

		sy = cy - (x >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx,	sy - 1,	x&AA_AND);

		sx = cx - (y >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx,	sy - 1,	x&AA_AND);

		sy = cy + (x >> AA_BITS);

		plot(sx,	sy,	AA_AND - (x&AA_AND));
		plot(sx,	sy + 1,	x&AA_AND);

		s +=	AA_AND+1 + (y << (AA_BITS+1)) + ((1 << (AA_BITS+2))-2);
		y +=	AA_AND+1;

		while(s >= 0)
		{
			s -= (x << 1) + 2;
			x --;
		}
	}
}


/*
 * Draw anti-aliased line.
 * By T.Harte.
 */
 
void gfx_draw_aa_line (int x1, int y1, int x2, int y2)
{
	fixed grad, xd, yd;
	fixed xgap, ygap, xend, yend, xf, yf;
	fixed brightness1, brightness2, swap;

	int x, y, ix1, ix2, iy1, iy2;

	x1 += itofix(GFX_X_OFFSET);
	x2 += itofix(GFX_X_OFFSET);
	y1 += itofix(GFX_Y_OFFSET);
	y2 += itofix(GFX_Y_OFFSET);

	xd = x2 - x1;
	yd = y2 - y1;

	if (abs(xd) > abs(yd))
	{
		if(x1 > x2)
		{
			swap = x1; x1 = x2; x2 = swap;
			swap = y1; y1 = y2; y2 = swap;
			xd   = -xd;
			yd   = -yd;
		}

		grad = fdiv(yd, xd);

		/* end point 1 */

		xend = trunc(x1 + 32768);
		yend = y1 + fmul(grad, xend-x1);

		xgap = invfrac(x1+32768);

		ix1  = xend >> 16;
		iy1  = yend >> 16;

		brightness1 = fmul(invfrac(yend), xgap);
		brightness2 = fmul(frac(yend), xgap);

		plot(ix1, iy1, brightness1 >> (16-AA_BITS));
		plot(ix1, iy1+1, brightness2 >> (16-AA_BITS));

		yf = yend+grad;

		/* end point 2; */

		xend = trunc(x2 + 32768);
		yend = y2 + fmul(grad, xend-x2);

		xgap = invfrac(x2 - 32768);

		ix2 = xend >> 16;
		iy2 = yend >> 16;

		brightness1 = fmul(invfrac(yend), xgap);
		brightness2 = fmul(frac(yend), xgap);
      
		plot(ix2, iy2, brightness1 >> (16-AA_BITS));
		plot(ix2, iy2+1, brightness2 >> (16-AA_BITS));

		for(x = ix1+1; x <= ix2-1; x++)
		{
			brightness1 = invfrac(yf);
			brightness2 = frac(yf);

			plot(x, (yf >> 16), brightness1 >> (16-AA_BITS));
			plot(x, 1+(yf >> 16), brightness2 >> (16-AA_BITS));

			yf += grad;
		}
	}
	else
	{
		if(y1 > y2)
		{
			swap = x1; x1 = x2; x2 = swap;
			swap = y1; y1 = y2; y2 = swap;
			xd   = -xd;
			yd   = -yd;
		}

		grad = fdiv(xd, yd);

		/* end point 1 */

		yend = trunc(y1 + 32768);
		xend = x1 + fmul(grad, yend-y1);

		ygap = invfrac(y1+32768);

		iy1  = yend >> 16;
		ix1  = xend >> 16;

		brightness1 = fmul(invfrac(xend), ygap);
		brightness2 = fmul(frac(xend), ygap);

		plot(ix1, iy1, brightness1 >> (16-AA_BITS));
		plot(ix1+1, iy1, brightness2 >> (16-AA_BITS));

		xf = xend+grad;

		/* end point 2; */

		yend = trunc(y2 + 32768);
		xend = x2 + fmul(grad, yend-y2);

		ygap = invfrac(y2 - 32768);

		ix2 = xend >> 16;
		iy2 = yend >> 16;

		brightness1 = fmul(invfrac(xend), ygap);
		brightness2 = fmul(frac(xend), ygap);
      
		plot(ix2, iy2, brightness1 >> (16-AA_BITS));
		plot(ix2+1, iy2, brightness2 >> (16-AA_BITS));

		for(y = iy1+1; y <= iy2-1; y++)
		{
			brightness1 = invfrac(xf);
			brightness2 = frac(xf);

			plot((xf >> 16), y, brightness1 >> (16-AA_BITS));
			plot(1+(xf >> 16), y, brightness2 >> (16-AA_BITS));

			xf += grad;
		}
	}
}

#undef trunc
#undef frac
#undef invfrac
#undef plot

#undef AA_BITS
#undef AA_AND
#undef AA_BASE

void gfx_draw_circle (int cx, int cy, int radius, Uint32 circle_colour)
{
	circleRGBA(sdl_ren, cx, cy, radius, the_palette_r[circle_colour], the_palette_g[circle_colour], the_palette_b[circle_colour], 0xff);
}

void gfx_draw_filled_circle (int cx, int cy, int radius, Uint32 circle_colour)
{
	filledCircleRGBA(sdl_ren, cx, cy, radius, the_palette_r[circle_colour], the_palette_g[circle_colour], the_palette_b[circle_colour], 0xff);
}

void gfx_draw_line (int x1, int y1, int x2, int y2)
{
	if (y1 == y2)
	{
		hline (gfx_screen, x1 + GFX_X_OFFSET, y1 + GFX_Y_OFFSET, x2 + GFX_X_OFFSET, GFX_COL_WHITE);
		return;
	}

	if (x1 == x2)
	{
		vline (gfx_screen, x1 + GFX_X_OFFSET, y1 + GFX_Y_OFFSET, y2 + GFX_Y_OFFSET, GFX_COL_WHITE);
		return;
	}

	if (anti_alias_gfx)
		gfx_draw_aa_line (itofix(x1), itofix(y1), itofix(x2), itofix(y2));
	else
		line (gfx_screen, x1 + GFX_X_OFFSET, y1 + GFX_Y_OFFSET, x2 + GFX_X_OFFSET, y2 + GFX_Y_OFFSET, GFX_COL_WHITE);
}

int pixelGetRGBA( SDL_Surface *surface, int x, int y, Uint8 *r, Uint8 *g, Uint8 *b, Uint8 *a )
{
	int result = 0;
	Uint32 *pixels = (Uint32 *)surface->pixels;
	Uint32 pixel = pixels[ ( y * surface->w ) + x ];
	*a = ((Uint8*)&pixel)[0];
	*r = ((Uint8*)&pixel)[1];
	*g = ((Uint8*)&pixel)[2];
	*b = ((Uint8*)&pixel)[3];
	return result;
}

void pixelPutRGBA( SDL_Surface *surface, int x, int y, Uint32 pixel )
{    
	Uint32 *pixels = (Uint32 *)surface->pixels;        
	pixels[ ( y * surface->w ) + x ] = pixel;
}


int pixelRGBALogical(SDL_Renderer * renderer, Sint16 x, Sint16 y, Uint8 r, Uint8 g, Uint8 b, Uint8 a, Sint32 logical_mode)
{
	int result = 0;
	Uint8 _r,_g,_b,_a;
	result |= SDL_SetRenderDrawBlendMode(renderer, (a == 255) ? SDL_BLENDMODE_NONE : SDL_BLENDMODE_BLEND);
	//SDL_SetRenderTarget
	//SDL_Surface *surface = NULL;
	//result |= SDL_LockTextureToSurface(texture, NULL, &surface);
	//printf( "Render surface: %p\n", surface );
	//result |= pixelGetRGBA(surface, x, y, &_r, &_g, &_b, &_a);
	//SDL_UnlockTexture( texture );
	printf( "Color: %d, %d, %d, %d\n", _r, _g, _b, _a );
	if ( logical_mode == 1 )
		result |= SDL_SetRenderDrawColor(renderer, r^_r, g^_g, b^_b, a);
	else if ( logical_mode == 2 )
		result |= SDL_SetRenderDrawColor(renderer, r|_r, g|_g, b|_b, a);
	else 
		result |= SDL_SetRenderDrawColor(renderer, _r, _g, _b, a);
	result |= SDL_RenderDrawPoint(renderer, x, y);
	return result;
}


void gfx_draw_colour_line_logical (int x1, int y1, int x2, int y2, unsigned int line_colour, int logical_mode )
{
	if ( x1 == x2 ) {
		// vertical line
		for ( int i = ((y1 >= y2) ? y2 : y1); i <= ((y1 <= y2) ? y2 : y1); i++ ) {
			// pixelRGBALogical(sdl_ren, x1, i, the_palette_r[line_colour], the_palette_g[line_colour], the_palette_b[line_colour], 0xff, logical_mode);
			pixelRGBA(sdl_ren, x1, i, the_palette_r[line_colour], the_palette_g[line_colour], the_palette_b[line_colour], 0xff);
		}
		return;
	} else if ( y1 == y2 ) {
		// horizontal line
		for ( int i = ((x1 >= x2) ? x2 : x1); i <= ((x1 <= x2) ? x2 : x1); i++ ) {
			// pixelRGBALogical(sdl_ren, i, y1, the_palette_r[line_colour], the_palette_g[line_colour], the_palette_b[line_colour], 0xff, logical_mode);
			pixelRGBA(sdl_ren, i, y1, the_palette_r[line_colour], the_palette_g[line_colour], the_palette_b[line_colour], 0xff);
		}
		return;
	}

	gfx_draw_colour_line (x1, y1, x2, y2, line_colour);
}

void gfx_draw_colour_line (int x1, int y1, int x2, int y2, int line_colour)
{
	if (y1 == y2)
	{
		hline (gfx_screen, x1 + GFX_X_OFFSET, y1 + GFX_Y_OFFSET, x2 + GFX_X_OFFSET, line_colour);
		return;
	}
	if (x1 == x2)
	{
		vline (gfx_screen, x1 + GFX_X_OFFSET, y1 + GFX_Y_OFFSET, y2 + GFX_Y_OFFSET, line_colour);
		return;
	}
	if (anti_alias_gfx && (line_colour == GFX_COL_WHITE))
		gfx_draw_aa_line (itofix(x1), itofix(y1), itofix(x2), itofix(y2));
	else
		line (gfx_screen, x1 + GFX_X_OFFSET, y1 + GFX_Y_OFFSET, x2 + GFX_X_OFFSET, y2 + GFX_Y_OFFSET, line_colour);
}

void gfx_draw_triangle (int x1, int y1, int x2, int y2, int x3, int y3, int col)
{
	triangle (gfx_screen, x1 + GFX_X_OFFSET, y1 + GFX_Y_OFFSET, x2 + GFX_X_OFFSET, y2 + GFX_Y_OFFSET,
				   x3 + GFX_X_OFFSET, y3 + GFX_Y_OFFSET, col);
}

void gfx_display_text (int x, int y, char *txt)
{
	//text_mode (-1);
	textout (gfx_screen, datafile[ELITE_1].dat, txt, x, y, GFX_COL_WHITE);
}

void gfx_display_colour_text (int x, int y, char *txt, int col)
{
	//text_mode (-1);
	textout (gfx_screen, datafile[ELITE_1].dat, txt, x, y, col);
}

void gfx_display_centre_text (int y, char *str, int psize, int col)
{
	int txt_colour;
#if 0
	// FIXME: add txt_size support!
	int txt_size;
	
	if (psize == 140)
	{
		txt_size = ELITE_2;
		txt_colour = -1;
	}
	else
	{
		txt_size = ELITE_1;
		txt_colour = col;
	}
#endif
	txt_colour = col;
	//text_mode (-1);
	textout_centre (gfx_screen,  datafile[txt_size].dat, str, (wnd_width / 2), y, txt_colour);
}

void gfx_clear_display (void)
{
	gfx_draw_simplerect (GFX_VIEW_L_COORD, GFX_WINDOW_T_COORD + GFX_BORDER_SIZE, GFX_VIEW_R_COORD, GFX_WINDOW_B_COORD - GFX_BORDER_SIZE, GFX_COL_BLACK);
}

void gfx_clear_text_area (void)
{
	gfx_clear_area (GFX_VIEW_L_COORD, GFX_WINDOW_B_COORD - GFX_FOOTER_SIZE, GFX_VIEW_R_COORD, GFX_WINDOW_B_COORD - GFX_BORDER_SIZE);
}

void gfx_clear_area (int tx, int ty, int bx, int by)
{
	gfx_draw_filledrect (tx, ty, bx, by, GFX_COL_BLACK);
}

void gfx_draw_roundedsimplerect (int tx, int ty, int bx, int by, int col)
{
	rectroundedsimple (gfx_screen, tx, ty, bx, by, col);	
}

void gfx_draw_roundedfilledrect (int tx, int ty, int bx, int by, int col)
{
	rectroundedfilled (gfx_screen, tx, ty, bx, by, col);	
}

void gfx_draw_filledrect (int tx, int ty, int bx, int by, int col)
{
	rectfilled (gfx_screen, tx, ty, bx, by, col);	
}

void gfx_draw_simplerect (int tx, int ty, int bx, int by, int col)
{
	rectsimple (gfx_screen, tx, ty, bx, by, col);
}

void gfx_display_pretty_text (int tx, int ty, int bx, int by, char *txt)
{
	char strbuf[100];
	char *str;
	char *bptr;
	int len;
	int pos;
	int maxlen;
	
	maxlen = (bx - tx) / 8;

	str = txt;	
	len = strlen(txt);
	
	while (len > 0)
	{
		pos = maxlen;
		if (pos > len)
			pos = len;

		while ((str[pos] != ' ') && (str[pos] != ',') &&
			   (str[pos] != '.') && (str[pos] != '\0'))
		{
			pos--;
		}

		len = len - pos - 1;
	
		for (bptr = strbuf; pos >= 0; pos--)
			*bptr++ = *str++;

		*bptr = '\0';

		//text_mode (-1);
		gfx_display_colour_text ( tx, ty, strbuf, GFX_COL_WHITE);
		ty += 16;
	}
}


void gfx_set_clip ( int x1, int y1, int x2, int y2 )
{
	SDL_Rect rect;
	rect.x = x1;
	rect.y = y1;
	rect.w = x2 - x1 + 1;
	rect.h = y2 - y1 + 1;
	SDL_RenderSetClipRect(sdl_ren, &rect);
}

void gfx_clear_scanner()
{
	gfx_draw_simplerect (GFX_SCANNER_L_COORD, GFX_SCANNER_T_COORD, GFX_SCANNER_R_COORD, GFX_SCANNER_B_COORD, GFX_COL_BLACK);
}

void gfx_draw_scanner (void)
{
	SDL_RenderCopy(sdl_ren, sprites[IMG_THE_SCANNER].tex, NULL, &sprites[IMG_THE_SCANNER].rect);
}

void gfx_set_clip_region (int tx, int ty, int bx, int by)
{
	gfx_set_clip (tx, ty, bx, by);
}

void gfx_start_render (void)
{
	start_poly = 0;
	total_polys = 0;
}

void gfx_render_polygon (int num_points, int *point_list, int face_colour, int zavg)
{
	int i;
	int x;
	int nx;
	
	if (total_polys == MAX_POLYS) return;

	x = total_polys;
	total_polys++;
	
	poly_chain[x].no_points = num_points;
	poly_chain[x].face_colour = face_colour;
	poly_chain[x].z = zavg;
	poly_chain[x].next = -1;

	for (i = 0; i < 16; i++)
		poly_chain[x].point_list[i] = point_list[i];				

	if (x == 0)
		return;

	if (zavg > poly_chain[start_poly].z)
	{
		poly_chain[x].next = start_poly;
		start_poly = x;
		return;
	} 	

	for (i = start_poly; poly_chain[i].next != -1; i = poly_chain[i].next)
	{
		nx = poly_chain[i].next;
		
		if (zavg > poly_chain[nx].z) {
			poly_chain[i].next = x;
			poly_chain[x].next = nx;
			return;
		}
	}	
	
	poly_chain[i].next = x;
}


void gfx_render_line (int x1, int y1, int x2, int y2, int dist, int col)
{
	int point_list[4];
	
	point_list[0] = x1;
	point_list[1] = y1;
	point_list[2] = x2;
	point_list[3] = y2;
	
	gfx_render_polygon (2, point_list, col, dist);
}


void gfx_finish_render (void)
{
	int num_points;
	int *pl;
	int i;
	int col;
	
	if (total_polys == 0)
		return;
		
	for (i = start_poly; i != -1; i = poly_chain[i].next)
	{
		num_points = poly_chain[i].no_points;
		pl = poly_chain[i].point_list;
		col = poly_chain[i].face_colour;

		if (num_points == 2)
		{
			gfx_draw_colour_line (pl[0], pl[1], pl[2], pl[3], col);
			continue;
		}
		
		gfx_polygon (num_points, pl, col); 
	};
}



void gfx_polygon (int num_points, int *poly_list, int face_colour)
{
#if 0
	int i;
	int x,y;
	
	x = 0;
	y = 1;
	for (i = 0; i < num_points; i++)
	{
		poly_list[x] += GFX_X_OFFSET;
		poly_list[y] += GFX_Y_OFFSET;
		x += 2;
		y += 2;
	}
	
	polygon (gfx_screen, num_points, poly_list, face_colour);
#endif
	Sint16 vx[MAX_POLYS], vy[MAX_POLYS];
	for (int i = 0, j = 0; i < num_points; i++) {
		vx[i] = poly_list[j++] + GFX_X_OFFSET;
		vy[i] = poly_list[j++] + GFX_Y_OFFSET;
	}
	filledPolygonRGBA(sdl_ren, vx, vy, num_points, RGBA_PARAM(face_colour));
}


void gfx_draw_sprite ( int sprite_no, int x, int y )
{
	if (sprite_no >= IMG_NUM_OF || !sprites[sprite_no].tex) {
		ERROR_WINDOW("gfx_draw_sprite(): trying to render non-existing sprite number #%d", sprite_no);
		exit(1);
	}
	if (x == -1)
		x = (wnd_width - sprites[sprite_no].rect.w ) / 2;
	//draw_sprite (gfx_screen, sprite_bmp, x + GFX_X_OFFSET, y + GFX_Y_OFFSET);
	//SDL_Rect rect;
	sprites[sprite_no].rect.x = x + GFX_X_OFFSET;
	sprites[sprite_no].rect.y = y + GFX_Y_OFFSET;
	//rect.w = sprites[sprite_no].w;
	//rect.h = sprites[sprite_no].h;
	SDL_RenderCopy(sdl_ren, sprites[sprite_no].tex, NULL, &sprites[sprite_no].rect);
}


int gfx_request_file (char *title, char *path, char *ext)
{
	// TODO / FIXME
	fprintf(stderr, "FIXME: add file selector code! [title=\"%s\" path=\"%s\" ext=\"%s\"]\n", title, path, ext);
	return 0;
#if 0
	int okay;

	show_mouse (screen);
	okay = file_select (title, path, ext);
	show_mouse (NULL);

	return okay;
#endif
}

static void shutdown_sdl ( void )
{
	puts("SDL: shutting system down ...");
	snd_sound_shutdown();
	midi_sound_shutdown();
	if (sdl_tex)
		SDL_DestroyTexture(sdl_tex);
	for (int i = 0; i < IMG_NUM_OF; i++)
		if (sprites[i].tex)
			SDL_DestroyTexture(sprites[i].tex);
	if (sdl_ren)
		SDL_DestroyRenderer(sdl_ren);
	if (sdl_win)
		SDL_DestroyWindow(sdl_win);
	SDL_Quit();
}

int start_sdl ( void )
{
    if (SDL_Init(SDL_INIT_EVENTS | SDL_INIT_VIDEO | SDL_INIT_AUDIO) < 0) {
        printf("SDL_Init() failed: %s\n", SDL_GetError());
        return 1;
    }

    atexit(shutdown_sdl);

    pref_path = SDL_GetBasePath();
    printf( "FILE: [\"pref_path\"]=\"%s\"\n", pref_path );

//	pref_path = SDL_GetPrefPath("lgb", "newkind");
//	if (!pref_path) {
//		ERROR_WINDOW("Cannot make use of pref path: %s", SDL_GetError());
//		return 1;
//	}
	//SDL_StartTextInput();
#if 0
	allegro_init();
	install_keyboard(); 
	install_timer();
	install_mouse();
#endif
	// FIXME: no joystick ...
	have_joystick = 0;
#if 0   
	if (install_joystick(JOY_TYPE_AUTODETECT) == 0) {
		have_joystick = (num_joysticks > 0);
	}
#endif
	return 0;
}

int sdl_last_key_pressed;
char key[KEY_MAX];

static const struct {
	SDL_Keycode sdl;
	int etnk;
} keydefs[] = {
	{ SDLK_0, KEY_0 },
	{ SDLK_a, KEY_a },
	{ SDLK_BACKSPACE, KEY_BACKSPACE },
	{ SDLK_c, KEY_c },
	{ SDLK_COMMA, KEY_COMMA },
	{ SDLK_d, KEY_d },
	{ SDLK_DOWN, KEY_DOWN },
	{ SDLK_e, KEY_e },
	{ SDLK_ESCAPE, KEY_ESCAPE },
	{ SDLK_f, KEY_f },
	{ SDLK_F1, KEY_F1 },
	{ SDLK_F10, KEY_F10 },
	{ SDLK_F11, KEY_F11 },
	{ SDLK_F12, KEY_F12 },
	{ SDLK_F2, KEY_F2 },
	{ SDLK_F3, KEY_F3 },
	{ SDLK_F4, KEY_F4 },
	{ SDLK_F5, KEY_F5 },
	{ SDLK_F6, KEY_F6 },
	{ SDLK_F7, KEY_F7 },
	{ SDLK_F8, KEY_F8 },
	{ SDLK_F9, KEY_F9 },
	{ SDLK_h, KEY_h },
	{ SDLK_i, KEY_i },
	{ SDLK_j, KEY_j },
	{ SDLK_LCTRL, KEY_LCTRL },
	{ SDLK_LEFT, KEY_LEFT },
	{ SDLK_m, KEY_m },
	{ SDLK_n, KEY_n },
	{ SDLK_o, KEY_o },
	{ SDLK_p, KEY_p },
	{ SDLK_r, KEY_r },
	{ SDLK_RCTRL, KEY_RCTRL },
	{ SDLK_RETURN, KEY_RETURN },
	{ SDLK_RIGHT, KEY_RIGHT },
	{ SDLK_s, KEY_s },
	{ SDLK_SLASH, KEY_SLASH },
	{ SDLK_SPACE, KEY_SPACE },
	{ SDLK_STOP, KEY_STOP },
	{ SDLK_t, KEY_t },
	{ SDLK_TAB, KEY_TAB },
	{ SDLK_u, KEY_u },
	{ SDLK_UP, KEY_UP },
	{ SDLK_x, KEY_x },
	{ SDLK_y, KEY_y },
	{ SDLK_z, KEY_z },
	{ 0, 0 }
};


int decode_keysym ( SDL_Keycode sym )
{
	for (int i = 0; keydefs[i].sdl; i++) {
		if (sym == keydefs[i].sdl)
			return keydefs[i].etnk;
	}
	return -1;
}


void handle_sdl_events ( void )
{
	SDL_Event event;
	while (SDL_PollEvent(&event)) {
		switch (event.type) {
			case SDL_QUIT:
				exit(0);	// FIXME: do it nicer ...
			case SDL_KEYUP:
			case SDL_KEYDOWN:
				/*
				 printf("KEY: scan=%s[#%d] sym=%s[#%d] event=%s repeated=%d\n",
					SDL_GetScancodeName(event.key.keysym.scancode),
					event.key.keysym.scancode,
					SDL_GetKeyName(event.key.keysym.sym),
					event.key.keysym.sym,
					event.key.state == SDL_PRESSED ? "DOWN": "UP",
					event.key.repeat
				);
				*/
				if (!event.key.repeat) {
					int game_code = decode_keysym(event.key.keysym.sym);
					//printf("KEY_MAP=%d\n", game_code);
					if (game_code >= 0) {
						if (event.key.state == SDL_PRESSED) {
							key[game_code] = 1;
							sdl_last_key_pressed = game_code;
						} else {
							key[game_code] = 0;
						}
					} 
				}
				break;
		}
	}
}



