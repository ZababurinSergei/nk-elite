/**
 * Wrap an object to an observable object
 * @param object target object
 * @param callback callback when target observed
 */
export function observableWrapper(object, callback) {
    Object.setPrototypeOf(object, {
        handlers: [],
        subscribe: function (onChange) {
            object.handlers.push(onChange);
        },
    });
    const handler = {
        get(target, property, receiver) {
            if (target.hasOwnProperty(property)) {
                try {
                    return new Proxy(target[property], handler);
                }
                catch (err) {
                    return Reflect.get(target, property, receiver);
                }
            }
            return Reflect.get(target, property, receiver);
        },
        set: function (target, property, value, receiver) {
            let nextTarget = target;
            if (target.hasOwnProperty(property)) {
                try {
                    Reflect.set(target, property, value, receiver);
                    nextTarget = new Proxy(target[property], handler);
                }
                catch (err) {
                    nextTarget = Reflect.set(target, property, value, receiver);
                }
            }
            else {
                nextTarget = Reflect.set(target, property, value, receiver);
            }
            if (callback) {
                callback(target, property, value);
            }
            if (object.handlers) {
                object.handlers.forEach((hand) => hand(target, property, value));
            }
            return nextTarget;
        },
    };
    return new Proxy(object, handler);
}
/**
 * Observable decorator
 * @param target observable target object
 * @param name
 * @param descriptor
 */
export function observable() {
    return function (target, property, descriptor) {
        try {
            const Original = target;
            const decoratedConstructor = function (...args) {
                const Obj = function () {
                    return new Original(args);
                };
                Obj.prototype = Original.prototype;
                const result = new Obj();
                return observableWrapper(result);
            };
            decoratedConstructor.prototype = Original.prototype;
            return decoratedConstructor;
        }
        catch (e) {
            return target;
        }
    };
}
