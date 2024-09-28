// Work in progress
export const InvalidArgumentException = function (argument, method) {
    this.message = 'Invalid argument ' + argument + ' passed to method ' + method;
    this.name = 'InvalidArgumentException';

    this.toString = function() {
        return this.name + this.message
    };
}
