var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod4) => function __require() {
  return mod4 || (0, cb[__getOwnPropNames(cb)[0]])((mod4 = { exports: {} }).exports, mod4), mod4.exports;
};
var __export = (target, all) => {
  for (var name7 in all)
    __defProp(target, name7, { get: all[name7], enumerable: true });
};
var __copyProps = (to, from14, except, desc) => {
  if (from14 && typeof from14 === "object" || typeof from14 === "function") {
    for (let key of __getOwnPropNames(from14))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from14[key], enumerable: !(desc = __getOwnPropDesc(from14, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod4, isNodeMode, target) => (target = mod4 != null ? __create(__getProtoOf(mod4)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod4 || !mod4.__esModule ? __defProp(target, "default", { value: mod4, enumerable: true }) : target,
  mod4
));

// node_modules/err-code/index.js
var require_err_code = __commonJS({
  "node_modules/err-code/index.js"(exports, module) {
    "use strict";
    function assign(obj, props) {
      for (const key in props) {
        Object.defineProperty(obj, key, {
          value: props[key],
          enumerable: true,
          configurable: true
        });
      }
      return obj;
    }
    function createError(err, code7, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code7 === "object") {
        props = code7;
        code7 = "";
      }
      if (code7) {
        props.code = code7;
      }
      try {
        return assign(err, props);
      } catch (_) {
        props.message = err.message;
        props.stack = err.stack;
        const ErrClass = function() {
        };
        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
        const output3 = assign(new ErrClass(), props);
        return output3;
      }
    }
    module.exports = createError;
  }
});

// node_modules/node-forge/lib/forge.js
var require_forge = __commonJS({
  "node_modules/node-forge/lib/forge.js"(exports, module) {
    module.exports = {
      // default options
      options: {
        usePureJavaScript: false
      }
    };
  }
});

// node_modules/node-forge/lib/baseN.js
var require_baseN = __commonJS({
  "node_modules/node-forge/lib/baseN.js"(exports, module) {
    var api = {};
    module.exports = api;
    var _reverseAlphabets = {};
    api.encode = function(input, alphabet6, maxline) {
      if (typeof alphabet6 !== "string") {
        throw new TypeError('"alphabet" must be a string.');
      }
      if (maxline !== void 0 && typeof maxline !== "number") {
        throw new TypeError('"maxline" must be a number.');
      }
      var output3 = "";
      if (!(input instanceof Uint8Array)) {
        output3 = _encodeWithByteBuffer(input, alphabet6);
      } else {
        var i = 0;
        var base11 = alphabet6.length;
        var first = alphabet6.charAt(0);
        var digits = [0];
        for (i = 0; i < input.length; ++i) {
          for (var j = 0, carry = input[i]; j < digits.length; ++j) {
            carry += digits[j] << 8;
            digits[j] = carry % base11;
            carry = carry / base11 | 0;
          }
          while (carry > 0) {
            digits.push(carry % base11);
            carry = carry / base11 | 0;
          }
        }
        for (i = 0; input[i] === 0 && i < input.length - 1; ++i) {
          output3 += first;
        }
        for (i = digits.length - 1; i >= 0; --i) {
          output3 += alphabet6[digits[i]];
        }
      }
      if (maxline) {
        var regex = new RegExp(".{1," + maxline + "}", "g");
        output3 = output3.match(regex).join("\r\n");
      }
      return output3;
    };
    api.decode = function(input, alphabet6) {
      if (typeof input !== "string") {
        throw new TypeError('"input" must be a string.');
      }
      if (typeof alphabet6 !== "string") {
        throw new TypeError('"alphabet" must be a string.');
      }
      var table2 = _reverseAlphabets[alphabet6];
      if (!table2) {
        table2 = _reverseAlphabets[alphabet6] = [];
        for (var i = 0; i < alphabet6.length; ++i) {
          table2[alphabet6.charCodeAt(i)] = i;
        }
      }
      input = input.replace(/\s/g, "");
      var base11 = alphabet6.length;
      var first = alphabet6.charAt(0);
      var bytes3 = [0];
      for (var i = 0; i < input.length; i++) {
        var value = table2[input.charCodeAt(i)];
        if (value === void 0) {
          return;
        }
        for (var j = 0, carry = value; j < bytes3.length; ++j) {
          carry += bytes3[j] * base11;
          bytes3[j] = carry & 255;
          carry >>= 8;
        }
        while (carry > 0) {
          bytes3.push(carry & 255);
          carry >>= 8;
        }
      }
      for (var k = 0; input[k] === first && k < input.length - 1; ++k) {
        bytes3.push(0);
      }
      if (typeof Buffer !== "undefined") {
        return Buffer.from(bytes3.reverse());
      }
      return new Uint8Array(bytes3.reverse());
    };
    function _encodeWithByteBuffer(input, alphabet6) {
      var i = 0;
      var base11 = alphabet6.length;
      var first = alphabet6.charAt(0);
      var digits = [0];
      for (i = 0; i < input.length(); ++i) {
        for (var j = 0, carry = input.at(i); j < digits.length; ++j) {
          carry += digits[j] << 8;
          digits[j] = carry % base11;
          carry = carry / base11 | 0;
        }
        while (carry > 0) {
          digits.push(carry % base11);
          carry = carry / base11 | 0;
        }
      }
      var output3 = "";
      for (i = 0; input.at(i) === 0 && i < input.length() - 1; ++i) {
        output3 += first;
      }
      for (i = digits.length - 1; i >= 0; --i) {
        output3 += alphabet6[digits[i]];
      }
      return output3;
    }
  }
});

// node_modules/node-forge/lib/util.js
var require_util = __commonJS({
  "node_modules/node-forge/lib/util.js"(exports, module) {
    var forge6 = require_forge();
    var baseN = require_baseN();
    var util = module.exports = forge6.util = forge6.util || {};
    (function() {
      if (typeof process !== "undefined" && process.nextTick && !process.browser) {
        util.nextTick = process.nextTick;
        if (typeof setImmediate === "function") {
          util.setImmediate = setImmediate;
        } else {
          util.setImmediate = util.nextTick;
        }
        return;
      }
      if (typeof setImmediate === "function") {
        util.setImmediate = function() {
          return setImmediate.apply(void 0, arguments);
        };
        util.nextTick = function(callback) {
          return setImmediate(callback);
        };
        return;
      }
      util.setImmediate = function(callback) {
        setTimeout(callback, 0);
      };
      if (typeof window !== "undefined" && typeof window.postMessage === "function") {
        let handler2 = function(event) {
          if (event.source === window && event.data === msg) {
            event.stopPropagation();
            var copy = callbacks.slice();
            callbacks.length = 0;
            copy.forEach(function(callback) {
              callback();
            });
          }
        };
        var handler = handler2;
        var msg = "forge.setImmediate";
        var callbacks = [];
        util.setImmediate = function(callback) {
          callbacks.push(callback);
          if (callbacks.length === 1) {
            window.postMessage(msg, "*");
          }
        };
        window.addEventListener("message", handler2, true);
      }
      if (typeof MutationObserver !== "undefined") {
        var now = Date.now();
        var attr = true;
        var div = document.createElement("div");
        var callbacks = [];
        new MutationObserver(function() {
          var copy = callbacks.slice();
          callbacks.length = 0;
          copy.forEach(function(callback) {
            callback();
          });
        }).observe(div, { attributes: true });
        var oldSetImmediate = util.setImmediate;
        util.setImmediate = function(callback) {
          if (Date.now() - now > 15) {
            now = Date.now();
            oldSetImmediate(callback);
          } else {
            callbacks.push(callback);
            if (callbacks.length === 1) {
              div.setAttribute("a", attr = !attr);
            }
          }
        };
      }
      util.nextTick = util.setImmediate;
    })();
    util.isNodejs = typeof process !== "undefined" && process.versions && process.versions.node;
    util.globalScope = function() {
      if (util.isNodejs) {
        return window;
      }
      return typeof self === "undefined" ? window : self;
    }();
    util.isArray = Array.isArray || function(x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    };
    util.isArrayBuffer = function(x) {
      return typeof ArrayBuffer !== "undefined" && x instanceof ArrayBuffer;
    };
    util.isArrayBufferView = function(x) {
      return x && util.isArrayBuffer(x.buffer) && x.byteLength !== void 0;
    };
    function _checkBitsParam(n) {
      if (!(n === 8 || n === 16 || n === 24 || n === 32)) {
        throw new Error("Only 8, 16, 24, or 32 bits supported: " + n);
      }
    }
    util.ByteBuffer = ByteStringBuffer;
    function ByteStringBuffer(b) {
      this.data = "";
      this.read = 0;
      if (typeof b === "string") {
        this.data = b;
      } else if (util.isArrayBuffer(b) || util.isArrayBufferView(b)) {
        if (typeof Buffer !== "undefined" && b instanceof Buffer) {
          this.data = b.toString("binary");
        } else {
          var arr = new Uint8Array(b);
          try {
            this.data = String.fromCharCode.apply(null, arr);
          } catch (e) {
            for (var i = 0; i < arr.length; ++i) {
              this.putByte(arr[i]);
            }
          }
        }
      } else if (b instanceof ByteStringBuffer || typeof b === "object" && typeof b.data === "string" && typeof b.read === "number") {
        this.data = b.data;
        this.read = b.read;
      }
      this._constructedStringLength = 0;
    }
    util.ByteStringBuffer = ByteStringBuffer;
    var _MAX_CONSTRUCTED_STRING_LENGTH = 4096;
    util.ByteStringBuffer.prototype._optimizeConstructedString = function(x) {
      this._constructedStringLength += x;
      if (this._constructedStringLength > _MAX_CONSTRUCTED_STRING_LENGTH) {
        this.data.substr(0, 1);
        this._constructedStringLength = 0;
      }
    };
    util.ByteStringBuffer.prototype.length = function() {
      return this.data.length - this.read;
    };
    util.ByteStringBuffer.prototype.isEmpty = function() {
      return this.length() <= 0;
    };
    util.ByteStringBuffer.prototype.putByte = function(b) {
      return this.putBytes(String.fromCharCode(b));
    };
    util.ByteStringBuffer.prototype.fillWithByte = function(b, n) {
      b = String.fromCharCode(b);
      var d = this.data;
      while (n > 0) {
        if (n & 1) {
          d += b;
        }
        n >>>= 1;
        if (n > 0) {
          b += b;
        }
      }
      this.data = d;
      this._optimizeConstructedString(n);
      return this;
    };
    util.ByteStringBuffer.prototype.putBytes = function(bytes3) {
      this.data += bytes3;
      this._optimizeConstructedString(bytes3.length);
      return this;
    };
    util.ByteStringBuffer.prototype.putString = function(str) {
      return this.putBytes(util.encodeUtf8(str));
    };
    util.ByteStringBuffer.prototype.putInt16 = function(i) {
      return this.putBytes(
        String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt24 = function(i) {
      return this.putBytes(
        String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt32 = function(i) {
      return this.putBytes(
        String.fromCharCode(i >> 24 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt16Le = function(i) {
      return this.putBytes(
        String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt24Le = function(i) {
      return this.putBytes(
        String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i >> 16 & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt32Le = function(i) {
      return this.putBytes(
        String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 24 & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt = function(i, n) {
      _checkBitsParam(n);
      var bytes3 = "";
      do {
        n -= 8;
        bytes3 += String.fromCharCode(i >> n & 255);
      } while (n > 0);
      return this.putBytes(bytes3);
    };
    util.ByteStringBuffer.prototype.putSignedInt = function(i, n) {
      if (i < 0) {
        i += 2 << n - 1;
      }
      return this.putInt(i, n);
    };
    util.ByteStringBuffer.prototype.putBuffer = function(buffer) {
      return this.putBytes(buffer.getBytes());
    };
    util.ByteStringBuffer.prototype.getByte = function() {
      return this.data.charCodeAt(this.read++);
    };
    util.ByteStringBuffer.prototype.getInt16 = function() {
      var rval = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
      this.read += 2;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt24 = function() {
      var rval = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
      this.read += 3;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt32 = function() {
      var rval = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
      this.read += 4;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt16Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
      this.read += 2;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt24Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
      this.read += 3;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt32Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
      this.read += 4;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt = function(n) {
      _checkBitsParam(n);
      var rval = 0;
      do {
        rval = (rval << 8) + this.data.charCodeAt(this.read++);
        n -= 8;
      } while (n > 0);
      return rval;
    };
    util.ByteStringBuffer.prototype.getSignedInt = function(n) {
      var x = this.getInt(n);
      var max = 2 << n - 2;
      if (x >= max) {
        x -= max << 1;
      }
      return x;
    };
    util.ByteStringBuffer.prototype.getBytes = function(count) {
      var rval;
      if (count) {
        count = Math.min(this.length(), count);
        rval = this.data.slice(this.read, this.read + count);
        this.read += count;
      } else if (count === 0) {
        rval = "";
      } else {
        rval = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return rval;
    };
    util.ByteStringBuffer.prototype.bytes = function(count) {
      return typeof count === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + count);
    };
    util.ByteStringBuffer.prototype.at = function(i) {
      return this.data.charCodeAt(this.read + i);
    };
    util.ByteStringBuffer.prototype.setAt = function(i, b) {
      this.data = this.data.substr(0, this.read + i) + String.fromCharCode(b) + this.data.substr(this.read + i + 1);
      return this;
    };
    util.ByteStringBuffer.prototype.last = function() {
      return this.data.charCodeAt(this.data.length - 1);
    };
    util.ByteStringBuffer.prototype.copy = function() {
      var c = util.createBuffer(this.data);
      c.read = this.read;
      return c;
    };
    util.ByteStringBuffer.prototype.compact = function() {
      if (this.read > 0) {
        this.data = this.data.slice(this.read);
        this.read = 0;
      }
      return this;
    };
    util.ByteStringBuffer.prototype.clear = function() {
      this.data = "";
      this.read = 0;
      return this;
    };
    util.ByteStringBuffer.prototype.truncate = function(count) {
      var len = Math.max(0, this.length() - count);
      this.data = this.data.substr(this.read, len);
      this.read = 0;
      return this;
    };
    util.ByteStringBuffer.prototype.toHex = function() {
      var rval = "";
      for (var i = this.read; i < this.data.length; ++i) {
        var b = this.data.charCodeAt(i);
        if (b < 16) {
          rval += "0";
        }
        rval += b.toString(16);
      }
      return rval;
    };
    util.ByteStringBuffer.prototype.toString = function() {
      return util.decodeUtf8(this.bytes());
    };
    function DataBuffer(b, options) {
      options = options || {};
      this.read = options.readOffset || 0;
      this.growSize = options.growSize || 1024;
      var isArrayBuffer = util.isArrayBuffer(b);
      var isArrayBufferView = util.isArrayBufferView(b);
      if (isArrayBuffer || isArrayBufferView) {
        if (isArrayBuffer) {
          this.data = new DataView(b);
        } else {
          this.data = new DataView(b.buffer, b.byteOffset, b.byteLength);
        }
        this.write = "writeOffset" in options ? options.writeOffset : this.data.byteLength;
        return;
      }
      this.data = new DataView(new ArrayBuffer(0));
      this.write = 0;
      if (b !== null && b !== void 0) {
        this.putBytes(b);
      }
      if ("writeOffset" in options) {
        this.write = options.writeOffset;
      }
    }
    util.DataBuffer = DataBuffer;
    util.DataBuffer.prototype.length = function() {
      return this.write - this.read;
    };
    util.DataBuffer.prototype.isEmpty = function() {
      return this.length() <= 0;
    };
    util.DataBuffer.prototype.accommodate = function(amount, growSize) {
      if (this.length() >= amount) {
        return this;
      }
      growSize = Math.max(growSize || this.growSize, amount);
      var src8 = new Uint8Array(
        this.data.buffer,
        this.data.byteOffset,
        this.data.byteLength
      );
      var dst = new Uint8Array(this.length() + growSize);
      dst.set(src8);
      this.data = new DataView(dst.buffer);
      return this;
    };
    util.DataBuffer.prototype.putByte = function(b) {
      this.accommodate(1);
      this.data.setUint8(this.write++, b);
      return this;
    };
    util.DataBuffer.prototype.fillWithByte = function(b, n) {
      this.accommodate(n);
      for (var i = 0; i < n; ++i) {
        this.data.setUint8(b);
      }
      return this;
    };
    util.DataBuffer.prototype.putBytes = function(bytes3, encoding) {
      if (util.isArrayBufferView(bytes3)) {
        var src8 = new Uint8Array(bytes3.buffer, bytes3.byteOffset, bytes3.byteLength);
        var len = src8.byteLength - src8.byteOffset;
        this.accommodate(len);
        var dst = new Uint8Array(this.data.buffer, this.write);
        dst.set(src8);
        this.write += len;
        return this;
      }
      if (util.isArrayBuffer(bytes3)) {
        var src8 = new Uint8Array(bytes3);
        this.accommodate(src8.byteLength);
        var dst = new Uint8Array(this.data.buffer);
        dst.set(src8, this.write);
        this.write += src8.byteLength;
        return this;
      }
      if (bytes3 instanceof util.DataBuffer || typeof bytes3 === "object" && typeof bytes3.read === "number" && typeof bytes3.write === "number" && util.isArrayBufferView(bytes3.data)) {
        var src8 = new Uint8Array(bytes3.data.byteLength, bytes3.read, bytes3.length());
        this.accommodate(src8.byteLength);
        var dst = new Uint8Array(bytes3.data.byteLength, this.write);
        dst.set(src8);
        this.write += src8.byteLength;
        return this;
      }
      if (bytes3 instanceof util.ByteStringBuffer) {
        bytes3 = bytes3.data;
        encoding = "binary";
      }
      encoding = encoding || "binary";
      if (typeof bytes3 === "string") {
        var view;
        if (encoding === "hex") {
          this.accommodate(Math.ceil(bytes3.length / 2));
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util.binary.hex.decode(bytes3, view, this.write);
          return this;
        }
        if (encoding === "base64") {
          this.accommodate(Math.ceil(bytes3.length / 4) * 3);
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util.binary.base64.decode(bytes3, view, this.write);
          return this;
        }
        if (encoding === "utf8") {
          bytes3 = util.encodeUtf8(bytes3);
          encoding = "binary";
        }
        if (encoding === "binary" || encoding === "raw") {
          this.accommodate(bytes3.length);
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util.binary.raw.decode(view);
          return this;
        }
        if (encoding === "utf16") {
          this.accommodate(bytes3.length * 2);
          view = new Uint16Array(this.data.buffer, this.write);
          this.write += util.text.utf16.encode(view);
          return this;
        }
        throw new Error("Invalid encoding: " + encoding);
      }
      throw Error("Invalid parameter: " + bytes3);
    };
    util.DataBuffer.prototype.putBuffer = function(buffer) {
      this.putBytes(buffer);
      buffer.clear();
      return this;
    };
    util.DataBuffer.prototype.putString = function(str) {
      return this.putBytes(str, "utf16");
    };
    util.DataBuffer.prototype.putInt16 = function(i) {
      this.accommodate(2);
      this.data.setInt16(this.write, i);
      this.write += 2;
      return this;
    };
    util.DataBuffer.prototype.putInt24 = function(i) {
      this.accommodate(3);
      this.data.setInt16(this.write, i >> 8 & 65535);
      this.data.setInt8(this.write, i >> 16 & 255);
      this.write += 3;
      return this;
    };
    util.DataBuffer.prototype.putInt32 = function(i) {
      this.accommodate(4);
      this.data.setInt32(this.write, i);
      this.write += 4;
      return this;
    };
    util.DataBuffer.prototype.putInt16Le = function(i) {
      this.accommodate(2);
      this.data.setInt16(this.write, i, true);
      this.write += 2;
      return this;
    };
    util.DataBuffer.prototype.putInt24Le = function(i) {
      this.accommodate(3);
      this.data.setInt8(this.write, i >> 16 & 255);
      this.data.setInt16(this.write, i >> 8 & 65535, true);
      this.write += 3;
      return this;
    };
    util.DataBuffer.prototype.putInt32Le = function(i) {
      this.accommodate(4);
      this.data.setInt32(this.write, i, true);
      this.write += 4;
      return this;
    };
    util.DataBuffer.prototype.putInt = function(i, n) {
      _checkBitsParam(n);
      this.accommodate(n / 8);
      do {
        n -= 8;
        this.data.setInt8(this.write++, i >> n & 255);
      } while (n > 0);
      return this;
    };
    util.DataBuffer.prototype.putSignedInt = function(i, n) {
      _checkBitsParam(n);
      this.accommodate(n / 8);
      if (i < 0) {
        i += 2 << n - 1;
      }
      return this.putInt(i, n);
    };
    util.DataBuffer.prototype.getByte = function() {
      return this.data.getInt8(this.read++);
    };
    util.DataBuffer.prototype.getInt16 = function() {
      var rval = this.data.getInt16(this.read);
      this.read += 2;
      return rval;
    };
    util.DataBuffer.prototype.getInt24 = function() {
      var rval = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
      this.read += 3;
      return rval;
    };
    util.DataBuffer.prototype.getInt32 = function() {
      var rval = this.data.getInt32(this.read);
      this.read += 4;
      return rval;
    };
    util.DataBuffer.prototype.getInt16Le = function() {
      var rval = this.data.getInt16(this.read, true);
      this.read += 2;
      return rval;
    };
    util.DataBuffer.prototype.getInt24Le = function() {
      var rval = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, true) << 8;
      this.read += 3;
      return rval;
    };
    util.DataBuffer.prototype.getInt32Le = function() {
      var rval = this.data.getInt32(this.read, true);
      this.read += 4;
      return rval;
    };
    util.DataBuffer.prototype.getInt = function(n) {
      _checkBitsParam(n);
      var rval = 0;
      do {
        rval = (rval << 8) + this.data.getInt8(this.read++);
        n -= 8;
      } while (n > 0);
      return rval;
    };
    util.DataBuffer.prototype.getSignedInt = function(n) {
      var x = this.getInt(n);
      var max = 2 << n - 2;
      if (x >= max) {
        x -= max << 1;
      }
      return x;
    };
    util.DataBuffer.prototype.getBytes = function(count) {
      var rval;
      if (count) {
        count = Math.min(this.length(), count);
        rval = this.data.slice(this.read, this.read + count);
        this.read += count;
      } else if (count === 0) {
        rval = "";
      } else {
        rval = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return rval;
    };
    util.DataBuffer.prototype.bytes = function(count) {
      return typeof count === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + count);
    };
    util.DataBuffer.prototype.at = function(i) {
      return this.data.getUint8(this.read + i);
    };
    util.DataBuffer.prototype.setAt = function(i, b) {
      this.data.setUint8(i, b);
      return this;
    };
    util.DataBuffer.prototype.last = function() {
      return this.data.getUint8(this.write - 1);
    };
    util.DataBuffer.prototype.copy = function() {
      return new util.DataBuffer(this);
    };
    util.DataBuffer.prototype.compact = function() {
      if (this.read > 0) {
        var src8 = new Uint8Array(this.data.buffer, this.read);
        var dst = new Uint8Array(src8.byteLength);
        dst.set(src8);
        this.data = new DataView(dst);
        this.write -= this.read;
        this.read = 0;
      }
      return this;
    };
    util.DataBuffer.prototype.clear = function() {
      this.data = new DataView(new ArrayBuffer(0));
      this.read = this.write = 0;
      return this;
    };
    util.DataBuffer.prototype.truncate = function(count) {
      this.write = Math.max(0, this.length() - count);
      this.read = Math.min(this.read, this.write);
      return this;
    };
    util.DataBuffer.prototype.toHex = function() {
      var rval = "";
      for (var i = this.read; i < this.data.byteLength; ++i) {
        var b = this.data.getUint8(i);
        if (b < 16) {
          rval += "0";
        }
        rval += b.toString(16);
      }
      return rval;
    };
    util.DataBuffer.prototype.toString = function(encoding) {
      var view = new Uint8Array(this.data, this.read, this.length());
      encoding = encoding || "utf8";
      if (encoding === "binary" || encoding === "raw") {
        return util.binary.raw.encode(view);
      }
      if (encoding === "hex") {
        return util.binary.hex.encode(view);
      }
      if (encoding === "base64") {
        return util.binary.base64.encode(view);
      }
      if (encoding === "utf8") {
        return util.text.utf8.decode(view);
      }
      if (encoding === "utf16") {
        return util.text.utf16.decode(view);
      }
      throw new Error("Invalid encoding: " + encoding);
    };
    util.createBuffer = function(input, encoding) {
      encoding = encoding || "raw";
      if (input !== void 0 && encoding === "utf8") {
        input = util.encodeUtf8(input);
      }
      return new util.ByteBuffer(input);
    };
    util.fillString = function(c, n) {
      var s = "";
      while (n > 0) {
        if (n & 1) {
          s += c;
        }
        n >>>= 1;
        if (n > 0) {
          c += c;
        }
      }
      return s;
    };
    util.xorBytes = function(s1, s2, n) {
      var s3 = "";
      var b = "";
      var t = "";
      var i = 0;
      var c = 0;
      for (; n > 0; --n, ++i) {
        b = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        if (c >= 10) {
          s3 += t;
          t = "";
          c = 0;
        }
        t += String.fromCharCode(b);
        ++c;
      }
      s3 += t;
      return s3;
    };
    util.hexToBytes = function(hex) {
      var rval = "";
      var i = 0;
      if (hex.length & true) {
        i = 1;
        rval += String.fromCharCode(parseInt(hex[0], 16));
      }
      for (; i < hex.length; i += 2) {
        rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return rval;
    };
    util.bytesToHex = function(bytes3) {
      return util.createBuffer(bytes3).toHex();
    };
    util.int32ToBytes = function(i) {
      return String.fromCharCode(i >> 24 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255);
    };
    var _base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var _base64Idx = [
      /*43 -43 = 0*/
      /*'+',  1,  2,  3,'/' */
      62,
      -1,
      -1,
      -1,
      63,
      /*'0','1','2','3','4','5','6','7','8','9' */
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      /*15, 16, 17,'=', 19, 20, 21 */
      -1,
      -1,
      -1,
      64,
      -1,
      -1,
      -1,
      /*65 - 43 = 22*/
      /*'A','B','C','D','E','F','G','H','I','J','K','L','M', */
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      /*'N','O','P','Q','R','S','T','U','V','W','X','Y','Z' */
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      /*91 - 43 = 48 */
      /*48, 49, 50, 51, 52, 53 */
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      /*97 - 43 = 54*/
      /*'a','b','c','d','e','f','g','h','i','j','k','l','m' */
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      /*'n','o','p','q','r','s','t','u','v','w','x','y','z' */
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51
    ];
    var _base58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    util.encode64 = function(input, maxline) {
      var line = "";
      var output3 = "";
      var chr1, chr2, chr3;
      var i = 0;
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        line += _base64.charAt(chr1 >> 2);
        line += _base64.charAt((chr1 & 3) << 4 | chr2 >> 4);
        if (isNaN(chr2)) {
          line += "==";
        } else {
          line += _base64.charAt((chr2 & 15) << 2 | chr3 >> 6);
          line += isNaN(chr3) ? "=" : _base64.charAt(chr3 & 63);
        }
        if (maxline && line.length > maxline) {
          output3 += line.substr(0, maxline) + "\r\n";
          line = line.substr(maxline);
        }
      }
      output3 += line;
      return output3;
    };
    util.decode64 = function(input) {
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var output3 = "";
      var enc1, enc2, enc3, enc4;
      var i = 0;
      while (i < input.length) {
        enc1 = _base64Idx[input.charCodeAt(i++) - 43];
        enc2 = _base64Idx[input.charCodeAt(i++) - 43];
        enc3 = _base64Idx[input.charCodeAt(i++) - 43];
        enc4 = _base64Idx[input.charCodeAt(i++) - 43];
        output3 += String.fromCharCode(enc1 << 2 | enc2 >> 4);
        if (enc3 !== 64) {
          output3 += String.fromCharCode((enc2 & 15) << 4 | enc3 >> 2);
          if (enc4 !== 64) {
            output3 += String.fromCharCode((enc3 & 3) << 6 | enc4);
          }
        }
      }
      return output3;
    };
    util.encodeUtf8 = function(str) {
      return unescape(encodeURIComponent(str));
    };
    util.decodeUtf8 = function(str) {
      return decodeURIComponent(escape(str));
    };
    util.binary = {
      raw: {},
      hex: {},
      base64: {},
      base58: {},
      baseN: {
        encode: baseN.encode,
        decode: baseN.decode
      }
    };
    util.binary.raw.encode = function(bytes3) {
      return String.fromCharCode.apply(null, bytes3);
    };
    util.binary.raw.decode = function(str, output3, offset) {
      var out = output3;
      if (!out) {
        out = new Uint8Array(str.length);
      }
      offset = offset || 0;
      var j = offset;
      for (var i = 0; i < str.length; ++i) {
        out[j++] = str.charCodeAt(i);
      }
      return output3 ? j - offset : out;
    };
    util.binary.hex.encode = util.bytesToHex;
    util.binary.hex.decode = function(hex, output3, offset) {
      var out = output3;
      if (!out) {
        out = new Uint8Array(Math.ceil(hex.length / 2));
      }
      offset = offset || 0;
      var i = 0, j = offset;
      if (hex.length & 1) {
        i = 1;
        out[j++] = parseInt(hex[0], 16);
      }
      for (; i < hex.length; i += 2) {
        out[j++] = parseInt(hex.substr(i, 2), 16);
      }
      return output3 ? j - offset : out;
    };
    util.binary.base64.encode = function(input, maxline) {
      var line = "";
      var output3 = "";
      var chr1, chr2, chr3;
      var i = 0;
      while (i < input.byteLength) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        line += _base64.charAt(chr1 >> 2);
        line += _base64.charAt((chr1 & 3) << 4 | chr2 >> 4);
        if (isNaN(chr2)) {
          line += "==";
        } else {
          line += _base64.charAt((chr2 & 15) << 2 | chr3 >> 6);
          line += isNaN(chr3) ? "=" : _base64.charAt(chr3 & 63);
        }
        if (maxline && line.length > maxline) {
          output3 += line.substr(0, maxline) + "\r\n";
          line = line.substr(maxline);
        }
      }
      output3 += line;
      return output3;
    };
    util.binary.base64.decode = function(input, output3, offset) {
      var out = output3;
      if (!out) {
        out = new Uint8Array(Math.ceil(input.length / 4) * 3);
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      offset = offset || 0;
      var enc1, enc2, enc3, enc4;
      var i = 0, j = offset;
      while (i < input.length) {
        enc1 = _base64Idx[input.charCodeAt(i++) - 43];
        enc2 = _base64Idx[input.charCodeAt(i++) - 43];
        enc3 = _base64Idx[input.charCodeAt(i++) - 43];
        enc4 = _base64Idx[input.charCodeAt(i++) - 43];
        out[j++] = enc1 << 2 | enc2 >> 4;
        if (enc3 !== 64) {
          out[j++] = (enc2 & 15) << 4 | enc3 >> 2;
          if (enc4 !== 64) {
            out[j++] = (enc3 & 3) << 6 | enc4;
          }
        }
      }
      return output3 ? j - offset : out.subarray(0, j);
    };
    util.binary.base58.encode = function(input, maxline) {
      return util.binary.baseN.encode(input, _base58, maxline);
    };
    util.binary.base58.decode = function(input, maxline) {
      return util.binary.baseN.decode(input, _base58, maxline);
    };
    util.text = {
      utf8: {},
      utf16: {}
    };
    util.text.utf8.encode = function(str, output3, offset) {
      str = util.encodeUtf8(str);
      var out = output3;
      if (!out) {
        out = new Uint8Array(str.length);
      }
      offset = offset || 0;
      var j = offset;
      for (var i = 0; i < str.length; ++i) {
        out[j++] = str.charCodeAt(i);
      }
      return output3 ? j - offset : out;
    };
    util.text.utf8.decode = function(bytes3) {
      return util.decodeUtf8(String.fromCharCode.apply(null, bytes3));
    };
    util.text.utf16.encode = function(str, output3, offset) {
      var out = output3;
      if (!out) {
        out = new Uint8Array(str.length * 2);
      }
      var view = new Uint16Array(out.buffer);
      offset = offset || 0;
      var j = offset;
      var k = offset;
      for (var i = 0; i < str.length; ++i) {
        view[k++] = str.charCodeAt(i);
        j += 2;
      }
      return output3 ? j - offset : out;
    };
    util.text.utf16.decode = function(bytes3) {
      return String.fromCharCode.apply(null, new Uint16Array(bytes3.buffer));
    };
    util.deflate = function(api, bytes3, raw) {
      bytes3 = util.decode64(api.deflate(util.encode64(bytes3)).rval);
      if (raw) {
        var start = 2;
        var flg = bytes3.charCodeAt(1);
        if (flg & 32) {
          start = 6;
        }
        bytes3 = bytes3.substring(start, bytes3.length - 4);
      }
      return bytes3;
    };
    util.inflate = function(api, bytes3, raw) {
      var rval = api.inflate(util.encode64(bytes3)).rval;
      return rval === null ? null : util.decode64(rval);
    };
    var _setStorageObject = function(api, id, obj) {
      if (!api) {
        throw new Error("WebStorage not available.");
      }
      var rval;
      if (obj === null) {
        rval = api.removeItem(id);
      } else {
        obj = util.encode64(JSON.stringify(obj));
        rval = api.setItem(id, obj);
      }
      if (typeof rval !== "undefined" && rval.rval !== true) {
        var error = new Error(rval.error.message);
        error.id = rval.error.id;
        error.name = rval.error.name;
        throw error;
      }
    };
    var _getStorageObject = function(api, id) {
      if (!api) {
        throw new Error("WebStorage not available.");
      }
      var rval = api.getItem(id);
      if (api.init) {
        if (rval.rval === null) {
          if (rval.error) {
            var error = new Error(rval.error.message);
            error.id = rval.error.id;
            error.name = rval.error.name;
            throw error;
          }
          rval = null;
        } else {
          rval = rval.rval;
        }
      }
      if (rval !== null) {
        rval = JSON.parse(util.decode64(rval));
      }
      return rval;
    };
    var _setItem = function(api, id, key, data) {
      var obj = _getStorageObject(api, id);
      if (obj === null) {
        obj = {};
      }
      obj[key] = data;
      _setStorageObject(api, id, obj);
    };
    var _getItem = function(api, id, key) {
      var rval = _getStorageObject(api, id);
      if (rval !== null) {
        rval = key in rval ? rval[key] : null;
      }
      return rval;
    };
    var _removeItem = function(api, id, key) {
      var obj = _getStorageObject(api, id);
      if (obj !== null && key in obj) {
        delete obj[key];
        var empty8 = true;
        for (var prop in obj) {
          empty8 = false;
          break;
        }
        if (empty8) {
          obj = null;
        }
        _setStorageObject(api, id, obj);
      }
    };
    var _clearItems = function(api, id) {
      _setStorageObject(api, id, null);
    };
    var _callStorageFunction = function(func, args, location) {
      var rval = null;
      if (typeof location === "undefined") {
        location = ["web", "flash"];
      }
      var type;
      var done = false;
      var exception = null;
      for (var idx in location) {
        type = location[idx];
        try {
          if (type === "flash" || type === "both") {
            if (args[0] === null) {
              throw new Error("Flash local storage not available.");
            }
            rval = func.apply(this, args);
            done = type === "flash";
          }
          if (type === "web" || type === "both") {
            args[0] = localStorage;
            rval = func.apply(this, args);
            done = true;
          }
        } catch (ex) {
          exception = ex;
        }
        if (done) {
          break;
        }
      }
      if (!done) {
        throw exception;
      }
      return rval;
    };
    util.setItem = function(api, id, key, data, location) {
      _callStorageFunction(_setItem, arguments, location);
    };
    util.getItem = function(api, id, key, location) {
      return _callStorageFunction(_getItem, arguments, location);
    };
    util.removeItem = function(api, id, key, location) {
      _callStorageFunction(_removeItem, arguments, location);
    };
    util.clearItems = function(api, id, location) {
      _callStorageFunction(_clearItems, arguments, location);
    };
    util.isEmpty = function(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    };
    util.format = function(format6) {
      var re = /%./g;
      var match;
      var part;
      var argi = 0;
      var parts = [];
      var last = 0;
      while (match = re.exec(format6)) {
        part = format6.substring(last, re.lastIndex - 2);
        if (part.length > 0) {
          parts.push(part);
        }
        last = re.lastIndex;
        var code7 = match[0][1];
        switch (code7) {
          case "s":
          case "o":
            if (argi < arguments.length) {
              parts.push(arguments[argi++ + 1]);
            } else {
              parts.push("<?>");
            }
            break;
          case "%":
            parts.push("%");
            break;
          default:
            parts.push("<%" + code7 + "?>");
        }
      }
      parts.push(format6.substring(last));
      return parts.join("");
    };
    util.formatNumber = function(number3, decimals, dec_point, thousands_sep) {
      var n = number3, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
      var d = dec_point === void 0 ? "," : dec_point;
      var t = thousands_sep === void 0 ? "." : thousands_sep, s = n < 0 ? "-" : "";
      var i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
      var j = i.length > 3 ? i.length % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    util.formatSize = function(size) {
      if (size >= 1073741824) {
        size = util.formatNumber(size / 1073741824, 2, ".", "") + " GiB";
      } else if (size >= 1048576) {
        size = util.formatNumber(size / 1048576, 2, ".", "") + " MiB";
      } else if (size >= 1024) {
        size = util.formatNumber(size / 1024, 0) + " KiB";
      } else {
        size = util.formatNumber(size, 0) + " bytes";
      }
      return size;
    };
    util.bytesFromIP = function(ip) {
      if (ip.indexOf(".") !== -1) {
        return util.bytesFromIPv4(ip);
      }
      if (ip.indexOf(":") !== -1) {
        return util.bytesFromIPv6(ip);
      }
      return null;
    };
    util.bytesFromIPv4 = function(ip) {
      ip = ip.split(".");
      if (ip.length !== 4) {
        return null;
      }
      var b = util.createBuffer();
      for (var i = 0; i < ip.length; ++i) {
        var num = parseInt(ip[i], 10);
        if (isNaN(num)) {
          return null;
        }
        b.putByte(num);
      }
      return b.getBytes();
    };
    util.bytesFromIPv6 = function(ip) {
      var blanks = 0;
      ip = ip.split(":").filter(function(e) {
        if (e.length === 0)
          ++blanks;
        return true;
      });
      var zeros = (8 - ip.length + blanks) * 2;
      var b = util.createBuffer();
      for (var i = 0; i < 8; ++i) {
        if (!ip[i] || ip[i].length === 0) {
          b.fillWithByte(0, zeros);
          zeros = 0;
          continue;
        }
        var bytes3 = util.hexToBytes(ip[i]);
        if (bytes3.length < 2) {
          b.putByte(0);
        }
        b.putBytes(bytes3);
      }
      return b.getBytes();
    };
    util.bytesToIP = function(bytes3) {
      if (bytes3.length === 4) {
        return util.bytesToIPv4(bytes3);
      }
      if (bytes3.length === 16) {
        return util.bytesToIPv6(bytes3);
      }
      return null;
    };
    util.bytesToIPv4 = function(bytes3) {
      if (bytes3.length !== 4) {
        return null;
      }
      var ip = [];
      for (var i = 0; i < bytes3.length; ++i) {
        ip.push(bytes3.charCodeAt(i));
      }
      return ip.join(".");
    };
    util.bytesToIPv6 = function(bytes3) {
      if (bytes3.length !== 16) {
        return null;
      }
      var ip = [];
      var zeroGroups = [];
      var zeroMaxGroup = 0;
      for (var i = 0; i < bytes3.length; i += 2) {
        var hex = util.bytesToHex(bytes3[i] + bytes3[i + 1]);
        while (hex[0] === "0" && hex !== "0") {
          hex = hex.substr(1);
        }
        if (hex === "0") {
          var last = zeroGroups[zeroGroups.length - 1];
          var idx = ip.length;
          if (!last || idx !== last.end + 1) {
            zeroGroups.push({ start: idx, end: idx });
          } else {
            last.end = idx;
            if (last.end - last.start > zeroGroups[zeroMaxGroup].end - zeroGroups[zeroMaxGroup].start) {
              zeroMaxGroup = zeroGroups.length - 1;
            }
          }
        }
        ip.push(hex);
      }
      if (zeroGroups.length > 0) {
        var group = zeroGroups[zeroMaxGroup];
        if (group.end - group.start > 0) {
          ip.splice(group.start, group.end - group.start + 1, "");
          if (group.start === 0) {
            ip.unshift("");
          }
          if (group.end === 7) {
            ip.push("");
          }
        }
      }
      return ip.join(":");
    };
    util.estimateCores = function(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = options || {};
      if ("cores" in util && !options.update) {
        return callback(null, util.cores);
      }
      if (typeof navigator !== "undefined" && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0) {
        util.cores = navigator.hardwareConcurrency;
        return callback(null, util.cores);
      }
      if (typeof Worker === "undefined") {
        util.cores = 1;
        return callback(null, util.cores);
      }
      if (typeof Blob === "undefined") {
        util.cores = 2;
        return callback(null, util.cores);
      }
      var blobUrl = URL.createObjectURL(new Blob([
        "(",
        function() {
          self.addEventListener("message", function(e) {
            var st = Date.now();
            var et = st + 4;
            while (Date.now() < et)
              ;
            self.postMessage({ st, et });
          });
        }.toString(),
        ")()"
      ], { type: "application/javascript" }));
      sample([], 5, 16);
      function sample(max, samples, numWorkers) {
        if (samples === 0) {
          var avg = Math.floor(max.reduce(function(avg2, x) {
            return avg2 + x;
          }, 0) / max.length);
          util.cores = Math.max(1, avg);
          URL.revokeObjectURL(blobUrl);
          return callback(null, util.cores);
        }
        map(numWorkers, function(err, results) {
          max.push(reduce(numWorkers, results));
          sample(max, samples - 1, numWorkers);
        });
      }
      function map(numWorkers, callback2) {
        var workers = [];
        var results = [];
        for (var i = 0; i < numWorkers; ++i) {
          var worker = new Worker(blobUrl);
          worker.addEventListener("message", function(e) {
            results.push(e.data);
            if (results.length === numWorkers) {
              for (var i2 = 0; i2 < numWorkers; ++i2) {
                workers[i2].terminate();
              }
              callback2(null, results);
            }
          });
          workers.push(worker);
        }
        for (var i = 0; i < numWorkers; ++i) {
          workers[i].postMessage(i);
        }
      }
      function reduce(numWorkers, results) {
        var overlaps = [];
        for (var n = 0; n < numWorkers; ++n) {
          var r1 = results[n];
          var overlap = overlaps[n] = [];
          for (var i = 0; i < numWorkers; ++i) {
            if (n === i) {
              continue;
            }
            var r2 = results[i];
            if (r1.st > r2.st && r1.st < r2.et || r2.st > r1.st && r2.st < r1.et) {
              overlap.push(i);
            }
          }
        }
        return overlaps.reduce(function(max, overlap2) {
          return Math.max(max, overlap2.length);
        }, 0);
      }
    };
  }
});

// node_modules/node-forge/lib/oids.js
var require_oids = __commonJS({
  "node_modules/node-forge/lib/oids.js"(exports, module) {
    var forge6 = require_forge();
    forge6.pki = forge6.pki || {};
    var oids = module.exports = forge6.pki.oids = forge6.oids = forge6.oids || {};
    function _IN(id, name7) {
      oids[id] = name7;
      oids[name7] = id;
    }
    function _I_(id, name7) {
      oids[id] = name7;
    }
    _IN("1.2.840.113549.1.1.1", "rsaEncryption");
    _IN("1.2.840.113549.1.1.4", "md5WithRSAEncryption");
    _IN("1.2.840.113549.1.1.5", "sha1WithRSAEncryption");
    _IN("1.2.840.113549.1.1.7", "RSAES-OAEP");
    _IN("1.2.840.113549.1.1.8", "mgf1");
    _IN("1.2.840.113549.1.1.9", "pSpecified");
    _IN("1.2.840.113549.1.1.10", "RSASSA-PSS");
    _IN("1.2.840.113549.1.1.11", "sha256WithRSAEncryption");
    _IN("1.2.840.113549.1.1.12", "sha384WithRSAEncryption");
    _IN("1.2.840.113549.1.1.13", "sha512WithRSAEncryption");
    _IN("1.3.101.112", "EdDSA25519");
    _IN("1.2.840.10040.4.3", "dsa-with-sha1");
    _IN("1.3.14.3.2.7", "desCBC");
    _IN("1.3.14.3.2.26", "sha1");
    _IN("1.3.14.3.2.29", "sha1WithRSASignature");
    _IN("2.16.840.1.101.3.4.2.1", "sha256");
    _IN("2.16.840.1.101.3.4.2.2", "sha384");
    _IN("2.16.840.1.101.3.4.2.3", "sha512");
    _IN("2.16.840.1.101.3.4.2.4", "sha224");
    _IN("2.16.840.1.101.3.4.2.5", "sha512-224");
    _IN("2.16.840.1.101.3.4.2.6", "sha512-256");
    _IN("1.2.840.113549.2.2", "md2");
    _IN("1.2.840.113549.2.5", "md5");
    _IN("1.2.840.113549.1.7.1", "data");
    _IN("1.2.840.113549.1.7.2", "signedData");
    _IN("1.2.840.113549.1.7.3", "envelopedData");
    _IN("1.2.840.113549.1.7.4", "signedAndEnvelopedData");
    _IN("1.2.840.113549.1.7.5", "digestedData");
    _IN("1.2.840.113549.1.7.6", "encryptedData");
    _IN("1.2.840.113549.1.9.1", "emailAddress");
    _IN("1.2.840.113549.1.9.2", "unstructuredName");
    _IN("1.2.840.113549.1.9.3", "contentType");
    _IN("1.2.840.113549.1.9.4", "messageDigest");
    _IN("1.2.840.113549.1.9.5", "signingTime");
    _IN("1.2.840.113549.1.9.6", "counterSignature");
    _IN("1.2.840.113549.1.9.7", "challengePassword");
    _IN("1.2.840.113549.1.9.8", "unstructuredAddress");
    _IN("1.2.840.113549.1.9.14", "extensionRequest");
    _IN("1.2.840.113549.1.9.20", "friendlyName");
    _IN("1.2.840.113549.1.9.21", "localKeyId");
    _IN("1.2.840.113549.1.9.22.1", "x509Certificate");
    _IN("1.2.840.113549.1.12.10.1.1", "keyBag");
    _IN("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag");
    _IN("1.2.840.113549.1.12.10.1.3", "certBag");
    _IN("1.2.840.113549.1.12.10.1.4", "crlBag");
    _IN("1.2.840.113549.1.12.10.1.5", "secretBag");
    _IN("1.2.840.113549.1.12.10.1.6", "safeContentsBag");
    _IN("1.2.840.113549.1.5.13", "pkcs5PBES2");
    _IN("1.2.840.113549.1.5.12", "pkcs5PBKDF2");
    _IN("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4");
    _IN("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4");
    _IN("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC");
    _IN("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC");
    _IN("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC");
    _IN("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC");
    _IN("1.2.840.113549.2.7", "hmacWithSHA1");
    _IN("1.2.840.113549.2.8", "hmacWithSHA224");
    _IN("1.2.840.113549.2.9", "hmacWithSHA256");
    _IN("1.2.840.113549.2.10", "hmacWithSHA384");
    _IN("1.2.840.113549.2.11", "hmacWithSHA512");
    _IN("1.2.840.113549.3.7", "des-EDE3-CBC");
    _IN("2.16.840.1.101.3.4.1.2", "aes128-CBC");
    _IN("2.16.840.1.101.3.4.1.22", "aes192-CBC");
    _IN("2.16.840.1.101.3.4.1.42", "aes256-CBC");
    _IN("2.5.4.3", "commonName");
    _IN("2.5.4.4", "surname");
    _IN("2.5.4.5", "serialNumber");
    _IN("2.5.4.6", "countryName");
    _IN("2.5.4.7", "localityName");
    _IN("2.5.4.8", "stateOrProvinceName");
    _IN("2.5.4.9", "streetAddress");
    _IN("2.5.4.10", "organizationName");
    _IN("2.5.4.11", "organizationalUnitName");
    _IN("2.5.4.12", "title");
    _IN("2.5.4.13", "description");
    _IN("2.5.4.15", "businessCategory");
    _IN("2.5.4.17", "postalCode");
    _IN("2.5.4.42", "givenName");
    _IN("1.3.6.1.4.1.311.60.2.1.2", "jurisdictionOfIncorporationStateOrProvinceName");
    _IN("1.3.6.1.4.1.311.60.2.1.3", "jurisdictionOfIncorporationCountryName");
    _IN("2.16.840.1.113730.1.1", "nsCertType");
    _IN("2.16.840.1.113730.1.13", "nsComment");
    _I_("2.5.29.1", "authorityKeyIdentifier");
    _I_("2.5.29.2", "keyAttributes");
    _I_("2.5.29.3", "certificatePolicies");
    _I_("2.5.29.4", "keyUsageRestriction");
    _I_("2.5.29.5", "policyMapping");
    _I_("2.5.29.6", "subtreesConstraint");
    _I_("2.5.29.7", "subjectAltName");
    _I_("2.5.29.8", "issuerAltName");
    _I_("2.5.29.9", "subjectDirectoryAttributes");
    _I_("2.5.29.10", "basicConstraints");
    _I_("2.5.29.11", "nameConstraints");
    _I_("2.5.29.12", "policyConstraints");
    _I_("2.5.29.13", "basicConstraints");
    _IN("2.5.29.14", "subjectKeyIdentifier");
    _IN("2.5.29.15", "keyUsage");
    _I_("2.5.29.16", "privateKeyUsagePeriod");
    _IN("2.5.29.17", "subjectAltName");
    _IN("2.5.29.18", "issuerAltName");
    _IN("2.5.29.19", "basicConstraints");
    _I_("2.5.29.20", "cRLNumber");
    _I_("2.5.29.21", "cRLReason");
    _I_("2.5.29.22", "expirationDate");
    _I_("2.5.29.23", "instructionCode");
    _I_("2.5.29.24", "invalidityDate");
    _I_("2.5.29.25", "cRLDistributionPoints");
    _I_("2.5.29.26", "issuingDistributionPoint");
    _I_("2.5.29.27", "deltaCRLIndicator");
    _I_("2.5.29.28", "issuingDistributionPoint");
    _I_("2.5.29.29", "certificateIssuer");
    _I_("2.5.29.30", "nameConstraints");
    _IN("2.5.29.31", "cRLDistributionPoints");
    _IN("2.5.29.32", "certificatePolicies");
    _I_("2.5.29.33", "policyMappings");
    _I_("2.5.29.34", "policyConstraints");
    _IN("2.5.29.35", "authorityKeyIdentifier");
    _I_("2.5.29.36", "policyConstraints");
    _IN("2.5.29.37", "extKeyUsage");
    _I_("2.5.29.46", "freshestCRL");
    _I_("2.5.29.54", "inhibitAnyPolicy");
    _IN("1.3.6.1.4.1.11129.2.4.2", "timestampList");
    _IN("1.3.6.1.5.5.7.1.1", "authorityInfoAccess");
    _IN("1.3.6.1.5.5.7.3.1", "serverAuth");
    _IN("1.3.6.1.5.5.7.3.2", "clientAuth");
    _IN("1.3.6.1.5.5.7.3.3", "codeSigning");
    _IN("1.3.6.1.5.5.7.3.4", "emailProtection");
    _IN("1.3.6.1.5.5.7.3.8", "timeStamping");
  }
});

// node_modules/node-forge/lib/asn1.js
var require_asn1 = __commonJS({
  "node_modules/node-forge/lib/asn1.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    require_oids();
    var asn1 = module.exports = forge6.asn1 = forge6.asn1 || {};
    asn1.Class = {
      UNIVERSAL: 0,
      APPLICATION: 64,
      CONTEXT_SPECIFIC: 128,
      PRIVATE: 192
    };
    asn1.Type = {
      NONE: 0,
      BOOLEAN: 1,
      INTEGER: 2,
      BITSTRING: 3,
      OCTETSTRING: 4,
      NULL: 5,
      OID: 6,
      ODESC: 7,
      EXTERNAL: 8,
      REAL: 9,
      ENUMERATED: 10,
      EMBEDDED: 11,
      UTF8: 12,
      ROID: 13,
      SEQUENCE: 16,
      SET: 17,
      PRINTABLESTRING: 19,
      IA5STRING: 22,
      UTCTIME: 23,
      GENERALIZEDTIME: 24,
      BMPSTRING: 30
    };
    asn1.create = function(tagClass, type, constructed, value, options) {
      if (forge6.util.isArray(value)) {
        var tmp = [];
        for (var i = 0; i < value.length; ++i) {
          if (value[i] !== void 0) {
            tmp.push(value[i]);
          }
        }
        value = tmp;
      }
      var obj = {
        tagClass,
        type,
        constructed,
        composed: constructed || forge6.util.isArray(value),
        value
      };
      if (options && "bitStringContents" in options) {
        obj.bitStringContents = options.bitStringContents;
        obj.original = asn1.copy(obj);
      }
      return obj;
    };
    asn1.copy = function(obj, options) {
      var copy;
      if (forge6.util.isArray(obj)) {
        copy = [];
        for (var i = 0; i < obj.length; ++i) {
          copy.push(asn1.copy(obj[i], options));
        }
        return copy;
      }
      if (typeof obj === "string") {
        return obj;
      }
      copy = {
        tagClass: obj.tagClass,
        type: obj.type,
        constructed: obj.constructed,
        composed: obj.composed,
        value: asn1.copy(obj.value, options)
      };
      if (options && !options.excludeBitStringContents) {
        copy.bitStringContents = obj.bitStringContents;
      }
      return copy;
    };
    asn1.equals = function(obj1, obj2, options) {
      if (forge6.util.isArray(obj1)) {
        if (!forge6.util.isArray(obj2)) {
          return false;
        }
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (var i = 0; i < obj1.length; ++i) {
          if (!asn1.equals(obj1[i], obj2[i])) {
            return false;
          }
        }
        return true;
      }
      if (typeof obj1 !== typeof obj2) {
        return false;
      }
      if (typeof obj1 === "string") {
        return obj1 === obj2;
      }
      var equal = obj1.tagClass === obj2.tagClass && obj1.type === obj2.type && obj1.constructed === obj2.constructed && obj1.composed === obj2.composed && asn1.equals(obj1.value, obj2.value);
      if (options && options.includeBitStringContents) {
        equal = equal && obj1.bitStringContents === obj2.bitStringContents;
      }
      return equal;
    };
    asn1.getBerValueLength = function(b) {
      var b2 = b.getByte();
      if (b2 === 128) {
        return void 0;
      }
      var length8;
      var longForm = b2 & 128;
      if (!longForm) {
        length8 = b2;
      } else {
        length8 = b.getInt((b2 & 127) << 3);
      }
      return length8;
    };
    function _checkBufferLength(bytes3, remaining, n) {
      if (n > remaining) {
        var error = new Error("Too few bytes to parse DER.");
        error.available = bytes3.length();
        error.remaining = remaining;
        error.requested = n;
        throw error;
      }
    }
    var _getValueLength = function(bytes3, remaining) {
      var b2 = bytes3.getByte();
      remaining--;
      if (b2 === 128) {
        return void 0;
      }
      var length8;
      var longForm = b2 & 128;
      if (!longForm) {
        length8 = b2;
      } else {
        var longFormBytes = b2 & 127;
        _checkBufferLength(bytes3, remaining, longFormBytes);
        length8 = bytes3.getInt(longFormBytes << 3);
      }
      if (length8 < 0) {
        throw new Error("Negative length: " + length8);
      }
      return length8;
    };
    asn1.fromDer = function(bytes3, options) {
      if (options === void 0) {
        options = {
          strict: true,
          parseAllBytes: true,
          decodeBitStrings: true
        };
      }
      if (typeof options === "boolean") {
        options = {
          strict: options,
          parseAllBytes: true,
          decodeBitStrings: true
        };
      }
      if (!("strict" in options)) {
        options.strict = true;
      }
      if (!("parseAllBytes" in options)) {
        options.parseAllBytes = true;
      }
      if (!("decodeBitStrings" in options)) {
        options.decodeBitStrings = true;
      }
      if (typeof bytes3 === "string") {
        bytes3 = forge6.util.createBuffer(bytes3);
      }
      var byteCount = bytes3.length();
      var value = _fromDer(bytes3, bytes3.length(), 0, options);
      if (options.parseAllBytes && bytes3.length() !== 0) {
        var error = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
        error.byteCount = byteCount;
        error.remaining = bytes3.length();
        throw error;
      }
      return value;
    };
    function _fromDer(bytes3, remaining, depth, options) {
      var start;
      _checkBufferLength(bytes3, remaining, 2);
      var b1 = bytes3.getByte();
      remaining--;
      var tagClass = b1 & 192;
      var type = b1 & 31;
      start = bytes3.length();
      var length8 = _getValueLength(bytes3, remaining);
      remaining -= start - bytes3.length();
      if (length8 !== void 0 && length8 > remaining) {
        if (options.strict) {
          var error = new Error("Too few bytes to read ASN.1 value.");
          error.available = bytes3.length();
          error.remaining = remaining;
          error.requested = length8;
          throw error;
        }
        length8 = remaining;
      }
      var value;
      var bitStringContents;
      var constructed = (b1 & 32) === 32;
      if (constructed) {
        value = [];
        if (length8 === void 0) {
          for (; ; ) {
            _checkBufferLength(bytes3, remaining, 2);
            if (bytes3.bytes(2) === String.fromCharCode(0, 0)) {
              bytes3.getBytes(2);
              remaining -= 2;
              break;
            }
            start = bytes3.length();
            value.push(_fromDer(bytes3, remaining, depth + 1, options));
            remaining -= start - bytes3.length();
          }
        } else {
          while (length8 > 0) {
            start = bytes3.length();
            value.push(_fromDer(bytes3, length8, depth + 1, options));
            remaining -= start - bytes3.length();
            length8 -= start - bytes3.length();
          }
        }
      }
      if (value === void 0 && tagClass === asn1.Class.UNIVERSAL && type === asn1.Type.BITSTRING) {
        bitStringContents = bytes3.bytes(length8);
      }
      if (value === void 0 && options.decodeBitStrings && tagClass === asn1.Class.UNIVERSAL && // FIXME: OCTET STRINGs not yet supported here
      // .. other parts of forge expect to decode OCTET STRINGs manually
      type === asn1.Type.BITSTRING && length8 > 1) {
        var savedRead = bytes3.read;
        var savedRemaining = remaining;
        var unused = 0;
        if (type === asn1.Type.BITSTRING) {
          _checkBufferLength(bytes3, remaining, 1);
          unused = bytes3.getByte();
          remaining--;
        }
        if (unused === 0) {
          try {
            start = bytes3.length();
            var subOptions = {
              // enforce strict mode to avoid parsing ASN.1 from plain data
              strict: true,
              decodeBitStrings: true
            };
            var composed = _fromDer(bytes3, remaining, depth + 1, subOptions);
            var used = start - bytes3.length();
            remaining -= used;
            if (type == asn1.Type.BITSTRING) {
              used++;
            }
            var tc = composed.tagClass;
            if (used === length8 && (tc === asn1.Class.UNIVERSAL || tc === asn1.Class.CONTEXT_SPECIFIC)) {
              value = [composed];
            }
          } catch (ex) {
          }
        }
        if (value === void 0) {
          bytes3.read = savedRead;
          remaining = savedRemaining;
        }
      }
      if (value === void 0) {
        if (length8 === void 0) {
          if (options.strict) {
            throw new Error("Non-constructed ASN.1 object of indefinite length.");
          }
          length8 = remaining;
        }
        if (type === asn1.Type.BMPSTRING) {
          value = "";
          for (; length8 > 0; length8 -= 2) {
            _checkBufferLength(bytes3, remaining, 2);
            value += String.fromCharCode(bytes3.getInt16());
            remaining -= 2;
          }
        } else {
          value = bytes3.getBytes(length8);
          remaining -= length8;
        }
      }
      var asn1Options = bitStringContents === void 0 ? null : {
        bitStringContents
      };
      return asn1.create(tagClass, type, constructed, value, asn1Options);
    }
    asn1.toDer = function(obj) {
      var bytes3 = forge6.util.createBuffer();
      var b1 = obj.tagClass | obj.type;
      var value = forge6.util.createBuffer();
      var useBitStringContents = false;
      if ("bitStringContents" in obj) {
        useBitStringContents = true;
        if (obj.original) {
          useBitStringContents = asn1.equals(obj, obj.original);
        }
      }
      if (useBitStringContents) {
        value.putBytes(obj.bitStringContents);
      } else if (obj.composed) {
        if (obj.constructed) {
          b1 |= 32;
        } else {
          value.putByte(0);
        }
        for (var i = 0; i < obj.value.length; ++i) {
          if (obj.value[i] !== void 0) {
            value.putBuffer(asn1.toDer(obj.value[i]));
          }
        }
      } else {
        if (obj.type === asn1.Type.BMPSTRING) {
          for (var i = 0; i < obj.value.length; ++i) {
            value.putInt16(obj.value.charCodeAt(i));
          }
        } else {
          if (obj.type === asn1.Type.INTEGER && obj.value.length > 1 && // leading 0x00 for positive integer
          (obj.value.charCodeAt(0) === 0 && (obj.value.charCodeAt(1) & 128) === 0 || // leading 0xFF for negative integer
          obj.value.charCodeAt(0) === 255 && (obj.value.charCodeAt(1) & 128) === 128)) {
            value.putBytes(obj.value.substr(1));
          } else {
            value.putBytes(obj.value);
          }
        }
      }
      bytes3.putByte(b1);
      if (value.length() <= 127) {
        bytes3.putByte(value.length() & 127);
      } else {
        var len = value.length();
        var lenBytes = "";
        do {
          lenBytes += String.fromCharCode(len & 255);
          len = len >>> 8;
        } while (len > 0);
        bytes3.putByte(lenBytes.length | 128);
        for (var i = lenBytes.length - 1; i >= 0; --i) {
          bytes3.putByte(lenBytes.charCodeAt(i));
        }
      }
      bytes3.putBuffer(value);
      return bytes3;
    };
    asn1.oidToDer = function(oid) {
      var values = oid.split(".");
      var bytes3 = forge6.util.createBuffer();
      bytes3.putByte(40 * parseInt(values[0], 10) + parseInt(values[1], 10));
      var last, valueBytes, value, b;
      for (var i = 2; i < values.length; ++i) {
        last = true;
        valueBytes = [];
        value = parseInt(values[i], 10);
        do {
          b = value & 127;
          value = value >>> 7;
          if (!last) {
            b |= 128;
          }
          valueBytes.push(b);
          last = false;
        } while (value > 0);
        for (var n = valueBytes.length - 1; n >= 0; --n) {
          bytes3.putByte(valueBytes[n]);
        }
      }
      return bytes3;
    };
    asn1.derToOid = function(bytes3) {
      var oid;
      if (typeof bytes3 === "string") {
        bytes3 = forge6.util.createBuffer(bytes3);
      }
      var b = bytes3.getByte();
      oid = Math.floor(b / 40) + "." + b % 40;
      var value = 0;
      while (bytes3.length() > 0) {
        b = bytes3.getByte();
        value = value << 7;
        if (b & 128) {
          value += b & 127;
        } else {
          oid += "." + (value + b);
          value = 0;
        }
      }
      return oid;
    };
    asn1.utcTimeToDate = function(utc) {
      var date = /* @__PURE__ */ new Date();
      var year = parseInt(utc.substr(0, 2), 10);
      year = year >= 50 ? 1900 + year : 2e3 + year;
      var MM = parseInt(utc.substr(2, 2), 10) - 1;
      var DD = parseInt(utc.substr(4, 2), 10);
      var hh = parseInt(utc.substr(6, 2), 10);
      var mm = parseInt(utc.substr(8, 2), 10);
      var ss = 0;
      if (utc.length > 11) {
        var c = utc.charAt(10);
        var end = 10;
        if (c !== "+" && c !== "-") {
          ss = parseInt(utc.substr(10, 2), 10);
          end += 2;
        }
      }
      date.setUTCFullYear(year, MM, DD);
      date.setUTCHours(hh, mm, ss, 0);
      if (end) {
        c = utc.charAt(end);
        if (c === "+" || c === "-") {
          var hhoffset = parseInt(utc.substr(end + 1, 2), 10);
          var mmoffset = parseInt(utc.substr(end + 4, 2), 10);
          var offset = hhoffset * 60 + mmoffset;
          offset *= 6e4;
          if (c === "+") {
            date.setTime(+date - offset);
          } else {
            date.setTime(+date + offset);
          }
        }
      }
      return date;
    };
    asn1.generalizedTimeToDate = function(gentime) {
      var date = /* @__PURE__ */ new Date();
      var YYYY = parseInt(gentime.substr(0, 4), 10);
      var MM = parseInt(gentime.substr(4, 2), 10) - 1;
      var DD = parseInt(gentime.substr(6, 2), 10);
      var hh = parseInt(gentime.substr(8, 2), 10);
      var mm = parseInt(gentime.substr(10, 2), 10);
      var ss = parseInt(gentime.substr(12, 2), 10);
      var fff = 0;
      var offset = 0;
      var isUTC = false;
      if (gentime.charAt(gentime.length - 1) === "Z") {
        isUTC = true;
      }
      var end = gentime.length - 5, c = gentime.charAt(end);
      if (c === "+" || c === "-") {
        var hhoffset = parseInt(gentime.substr(end + 1, 2), 10);
        var mmoffset = parseInt(gentime.substr(end + 4, 2), 10);
        offset = hhoffset * 60 + mmoffset;
        offset *= 6e4;
        if (c === "+") {
          offset *= -1;
        }
        isUTC = true;
      }
      if (gentime.charAt(14) === ".") {
        fff = parseFloat(gentime.substr(14), 10) * 1e3;
      }
      if (isUTC) {
        date.setUTCFullYear(YYYY, MM, DD);
        date.setUTCHours(hh, mm, ss, fff);
        date.setTime(+date + offset);
      } else {
        date.setFullYear(YYYY, MM, DD);
        date.setHours(hh, mm, ss, fff);
      }
      return date;
    };
    asn1.dateToUtcTime = function(date) {
      if (typeof date === "string") {
        return date;
      }
      var rval = "";
      var format6 = [];
      format6.push(("" + date.getUTCFullYear()).substr(2));
      format6.push("" + (date.getUTCMonth() + 1));
      format6.push("" + date.getUTCDate());
      format6.push("" + date.getUTCHours());
      format6.push("" + date.getUTCMinutes());
      format6.push("" + date.getUTCSeconds());
      for (var i = 0; i < format6.length; ++i) {
        if (format6[i].length < 2) {
          rval += "0";
        }
        rval += format6[i];
      }
      rval += "Z";
      return rval;
    };
    asn1.dateToGeneralizedTime = function(date) {
      if (typeof date === "string") {
        return date;
      }
      var rval = "";
      var format6 = [];
      format6.push("" + date.getUTCFullYear());
      format6.push("" + (date.getUTCMonth() + 1));
      format6.push("" + date.getUTCDate());
      format6.push("" + date.getUTCHours());
      format6.push("" + date.getUTCMinutes());
      format6.push("" + date.getUTCSeconds());
      for (var i = 0; i < format6.length; ++i) {
        if (format6[i].length < 2) {
          rval += "0";
        }
        rval += format6[i];
      }
      rval += "Z";
      return rval;
    };
    asn1.integerToDer = function(x) {
      var rval = forge6.util.createBuffer();
      if (x >= -128 && x < 128) {
        return rval.putSignedInt(x, 8);
      }
      if (x >= -32768 && x < 32768) {
        return rval.putSignedInt(x, 16);
      }
      if (x >= -8388608 && x < 8388608) {
        return rval.putSignedInt(x, 24);
      }
      if (x >= -2147483648 && x < 2147483648) {
        return rval.putSignedInt(x, 32);
      }
      var error = new Error("Integer too large; max is 32-bits.");
      error.integer = x;
      throw error;
    };
    asn1.derToInteger = function(bytes3) {
      if (typeof bytes3 === "string") {
        bytes3 = forge6.util.createBuffer(bytes3);
      }
      var n = bytes3.length() * 8;
      if (n > 32) {
        throw new Error("Integer too large; max is 32-bits.");
      }
      return bytes3.getSignedInt(n);
    };
    asn1.validate = function(obj, v, capture, errors) {
      var rval = false;
      if ((obj.tagClass === v.tagClass || typeof v.tagClass === "undefined") && (obj.type === v.type || typeof v.type === "undefined")) {
        if (obj.constructed === v.constructed || typeof v.constructed === "undefined") {
          rval = true;
          if (v.value && forge6.util.isArray(v.value)) {
            var j = 0;
            for (var i = 0; rval && i < v.value.length; ++i) {
              rval = v.value[i].optional || false;
              if (obj.value[j]) {
                rval = asn1.validate(obj.value[j], v.value[i], capture, errors);
                if (rval) {
                  ++j;
                } else if (v.value[i].optional) {
                  rval = true;
                }
              }
              if (!rval && errors) {
                errors.push(
                  "[" + v.name + '] Tag class "' + v.tagClass + '", type "' + v.type + '" expected value length "' + v.value.length + '", got "' + obj.value.length + '"'
                );
              }
            }
          }
          if (rval && capture) {
            if (v.capture) {
              capture[v.capture] = obj.value;
            }
            if (v.captureAsn1) {
              capture[v.captureAsn1] = obj;
            }
            if (v.captureBitStringContents && "bitStringContents" in obj) {
              capture[v.captureBitStringContents] = obj.bitStringContents;
            }
            if (v.captureBitStringValue && "bitStringContents" in obj) {
              var value;
              if (obj.bitStringContents.length < 2) {
                capture[v.captureBitStringValue] = "";
              } else {
                var unused = obj.bitStringContents.charCodeAt(0);
                if (unused !== 0) {
                  throw new Error(
                    "captureBitStringValue only supported for zero unused bits"
                  );
                }
                capture[v.captureBitStringValue] = obj.bitStringContents.slice(1);
              }
            }
          }
        } else if (errors) {
          errors.push(
            "[" + v.name + '] Expected constructed "' + v.constructed + '", got "' + obj.constructed + '"'
          );
        }
      } else if (errors) {
        if (obj.tagClass !== v.tagClass) {
          errors.push(
            "[" + v.name + '] Expected tag class "' + v.tagClass + '", got "' + obj.tagClass + '"'
          );
        }
        if (obj.type !== v.type) {
          errors.push(
            "[" + v.name + '] Expected type "' + v.type + '", got "' + obj.type + '"'
          );
        }
      }
      return rval;
    };
    var _nonLatinRegex = /[^\\u0000-\\u00ff]/;
    asn1.prettyPrint = function(obj, level, indentation) {
      var rval = "";
      level = level || 0;
      indentation = indentation || 2;
      if (level > 0) {
        rval += "\n";
      }
      var indent = "";
      for (var i = 0; i < level * indentation; ++i) {
        indent += " ";
      }
      rval += indent + "Tag: ";
      switch (obj.tagClass) {
        case asn1.Class.UNIVERSAL:
          rval += "Universal:";
          break;
        case asn1.Class.APPLICATION:
          rval += "Application:";
          break;
        case asn1.Class.CONTEXT_SPECIFIC:
          rval += "Context-Specific:";
          break;
        case asn1.Class.PRIVATE:
          rval += "Private:";
          break;
      }
      if (obj.tagClass === asn1.Class.UNIVERSAL) {
        rval += obj.type;
        switch (obj.type) {
          case asn1.Type.NONE:
            rval += " (None)";
            break;
          case asn1.Type.BOOLEAN:
            rval += " (Boolean)";
            break;
          case asn1.Type.INTEGER:
            rval += " (Integer)";
            break;
          case asn1.Type.BITSTRING:
            rval += " (Bit string)";
            break;
          case asn1.Type.OCTETSTRING:
            rval += " (Octet string)";
            break;
          case asn1.Type.NULL:
            rval += " (Null)";
            break;
          case asn1.Type.OID:
            rval += " (Object Identifier)";
            break;
          case asn1.Type.ODESC:
            rval += " (Object Descriptor)";
            break;
          case asn1.Type.EXTERNAL:
            rval += " (External or Instance of)";
            break;
          case asn1.Type.REAL:
            rval += " (Real)";
            break;
          case asn1.Type.ENUMERATED:
            rval += " (Enumerated)";
            break;
          case asn1.Type.EMBEDDED:
            rval += " (Embedded PDV)";
            break;
          case asn1.Type.UTF8:
            rval += " (UTF8)";
            break;
          case asn1.Type.ROID:
            rval += " (Relative Object Identifier)";
            break;
          case asn1.Type.SEQUENCE:
            rval += " (Sequence)";
            break;
          case asn1.Type.SET:
            rval += " (Set)";
            break;
          case asn1.Type.PRINTABLESTRING:
            rval += " (Printable String)";
            break;
          case asn1.Type.IA5String:
            rval += " (IA5String (ASCII))";
            break;
          case asn1.Type.UTCTIME:
            rval += " (UTC time)";
            break;
          case asn1.Type.GENERALIZEDTIME:
            rval += " (Generalized time)";
            break;
          case asn1.Type.BMPSTRING:
            rval += " (BMP String)";
            break;
        }
      } else {
        rval += obj.type;
      }
      rval += "\n";
      rval += indent + "Constructed: " + obj.constructed + "\n";
      if (obj.composed) {
        var subvalues = 0;
        var sub = "";
        for (var i = 0; i < obj.value.length; ++i) {
          if (obj.value[i] !== void 0) {
            subvalues += 1;
            sub += asn1.prettyPrint(obj.value[i], level + 1, indentation);
            if (i + 1 < obj.value.length) {
              sub += ",";
            }
          }
        }
        rval += indent + "Sub values: " + subvalues + sub;
      } else {
        rval += indent + "Value: ";
        if (obj.type === asn1.Type.OID) {
          var oid = asn1.derToOid(obj.value);
          rval += oid;
          if (forge6.pki && forge6.pki.oids) {
            if (oid in forge6.pki.oids) {
              rval += " (" + forge6.pki.oids[oid] + ") ";
            }
          }
        }
        if (obj.type === asn1.Type.INTEGER) {
          try {
            rval += asn1.derToInteger(obj.value);
          } catch (ex) {
            rval += "0x" + forge6.util.bytesToHex(obj.value);
          }
        } else if (obj.type === asn1.Type.BITSTRING) {
          if (obj.value.length > 1) {
            rval += "0x" + forge6.util.bytesToHex(obj.value.slice(1));
          } else {
            rval += "(none)";
          }
          if (obj.value.length > 0) {
            var unused = obj.value.charCodeAt(0);
            if (unused == 1) {
              rval += " (1 unused bit shown)";
            } else if (unused > 1) {
              rval += " (" + unused + " unused bits shown)";
            }
          }
        } else if (obj.type === asn1.Type.OCTETSTRING) {
          if (!_nonLatinRegex.test(obj.value)) {
            rval += "(" + obj.value + ") ";
          }
          rval += "0x" + forge6.util.bytesToHex(obj.value);
        } else if (obj.type === asn1.Type.UTF8) {
          try {
            rval += forge6.util.decodeUtf8(obj.value);
          } catch (e) {
            if (e.message === "URI malformed") {
              rval += "0x" + forge6.util.bytesToHex(obj.value) + " (malformed UTF8)";
            } else {
              throw e;
            }
          }
        } else if (obj.type === asn1.Type.PRINTABLESTRING || obj.type === asn1.Type.IA5String) {
          rval += obj.value;
        } else if (_nonLatinRegex.test(obj.value)) {
          rval += "0x" + forge6.util.bytesToHex(obj.value);
        } else if (obj.value.length === 0) {
          rval += "[null]";
        } else {
          rval += obj.value;
        }
      }
      return rval;
    };
  }
});

// node_modules/node-forge/lib/cipher.js
var require_cipher = __commonJS({
  "node_modules/node-forge/lib/cipher.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    module.exports = forge6.cipher = forge6.cipher || {};
    forge6.cipher.algorithms = forge6.cipher.algorithms || {};
    forge6.cipher.createCipher = function(algorithm, key) {
      var api = algorithm;
      if (typeof api === "string") {
        api = forge6.cipher.getAlgorithm(api);
        if (api) {
          api = api();
        }
      }
      if (!api) {
        throw new Error("Unsupported algorithm: " + algorithm);
      }
      return new forge6.cipher.BlockCipher({
        algorithm: api,
        key,
        decrypt: false
      });
    };
    forge6.cipher.createDecipher = function(algorithm, key) {
      var api = algorithm;
      if (typeof api === "string") {
        api = forge6.cipher.getAlgorithm(api);
        if (api) {
          api = api();
        }
      }
      if (!api) {
        throw new Error("Unsupported algorithm: " + algorithm);
      }
      return new forge6.cipher.BlockCipher({
        algorithm: api,
        key,
        decrypt: true
      });
    };
    forge6.cipher.registerAlgorithm = function(name7, algorithm) {
      name7 = name7.toUpperCase();
      forge6.cipher.algorithms[name7] = algorithm;
    };
    forge6.cipher.getAlgorithm = function(name7) {
      name7 = name7.toUpperCase();
      if (name7 in forge6.cipher.algorithms) {
        return forge6.cipher.algorithms[name7];
      }
      return null;
    };
    var BlockCipher = forge6.cipher.BlockCipher = function(options) {
      this.algorithm = options.algorithm;
      this.mode = this.algorithm.mode;
      this.blockSize = this.mode.blockSize;
      this._finish = false;
      this._input = null;
      this.output = null;
      this._op = options.decrypt ? this.mode.decrypt : this.mode.encrypt;
      this._decrypt = options.decrypt;
      this.algorithm.initialize(options);
    };
    BlockCipher.prototype.start = function(options) {
      options = options || {};
      var opts = {};
      for (var key in options) {
        opts[key] = options[key];
      }
      opts.decrypt = this._decrypt;
      this._finish = false;
      this._input = forge6.util.createBuffer();
      this.output = options.output || forge6.util.createBuffer();
      this.mode.start(opts);
    };
    BlockCipher.prototype.update = function(input) {
      if (input) {
        this._input.putBuffer(input);
      }
      while (!this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish) {
      }
      this._input.compact();
    };
    BlockCipher.prototype.finish = function(pad) {
      if (pad && (this.mode.name === "ECB" || this.mode.name === "CBC")) {
        this.mode.pad = function(input) {
          return pad(this.blockSize, input, false);
        };
        this.mode.unpad = function(output3) {
          return pad(this.blockSize, output3, true);
        };
      }
      var options = {};
      options.decrypt = this._decrypt;
      options.overflow = this._input.length() % this.blockSize;
      if (!this._decrypt && this.mode.pad) {
        if (!this.mode.pad(this._input, options)) {
          return false;
        }
      }
      this._finish = true;
      this.update();
      if (this._decrypt && this.mode.unpad) {
        if (!this.mode.unpad(this.output, options)) {
          return false;
        }
      }
      if (this.mode.afterFinish) {
        if (!this.mode.afterFinish(this.output, options)) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/node-forge/lib/cipherModes.js
var require_cipherModes = __commonJS({
  "node_modules/node-forge/lib/cipherModes.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    forge6.cipher = forge6.cipher || {};
    var modes = module.exports = forge6.cipher.modes = forge6.cipher.modes || {};
    modes.ecb = function(options) {
      options = options || {};
      this.name = "ECB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    modes.ecb.prototype.start = function(options) {
    };
    modes.ecb.prototype.encrypt = function(input, output3, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output3.putInt32(this._outBlock[i]);
      }
    };
    modes.ecb.prototype.decrypt = function(input, output3, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output3.putInt32(this._outBlock[i]);
      }
    };
    modes.ecb.prototype.pad = function(input, options) {
      var padding = input.length() === this.blockSize ? this.blockSize : this.blockSize - input.length();
      input.fillWithByte(padding, padding);
      return true;
    };
    modes.ecb.prototype.unpad = function(output3, options) {
      if (options.overflow > 0) {
        return false;
      }
      var len = output3.length();
      var count = output3.at(len - 1);
      if (count > this.blockSize << 2) {
        return false;
      }
      output3.truncate(count);
      return true;
    };
    modes.cbc = function(options) {
      options = options || {};
      this.name = "CBC";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    modes.cbc.prototype.start = function(options) {
      if (options.iv === null) {
        if (!this._prev) {
          throw new Error("Invalid IV parameter.");
        }
        this._iv = this._prev.slice(0);
      } else if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      } else {
        this._iv = transformIV(options.iv, this.blockSize);
        this._prev = this._iv.slice(0);
      }
    };
    modes.cbc.prototype.encrypt = function(input, output3, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = this._prev[i] ^ input.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output3.putInt32(this._outBlock[i]);
      }
      this._prev = this._outBlock;
    };
    modes.cbc.prototype.decrypt = function(input, output3, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output3.putInt32(this._prev[i] ^ this._outBlock[i]);
      }
      this._prev = this._inBlock.slice(0);
    };
    modes.cbc.prototype.pad = function(input, options) {
      var padding = input.length() === this.blockSize ? this.blockSize : this.blockSize - input.length();
      input.fillWithByte(padding, padding);
      return true;
    };
    modes.cbc.prototype.unpad = function(output3, options) {
      if (options.overflow > 0) {
        return false;
      }
      var len = output3.length();
      var count = output3.at(len - 1);
      if (count > this.blockSize << 2) {
        return false;
      }
      output3.truncate(count);
      return true;
    };
    modes.cfb = function(options) {
      options = options || {};
      this.name = "CFB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialBlock = new Array(this._ints);
      this._partialOutput = forge6.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.cfb.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.cfb.prototype.encrypt = function(input, output3, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = input.getInt32() ^ this._outBlock[i];
          output3.putInt32(this._inBlock[i]);
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialBlock[i] = input.getInt32() ^ this._outBlock[i];
        this._partialOutput.putInt32(this._partialBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._partialBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output3.putBytes(this._partialOutput.getBytes(
          partialBytes - this._partialBytes
        ));
        this._partialBytes = partialBytes;
        return true;
      }
      output3.putBytes(this._partialOutput.getBytes(
        inputLength - this._partialBytes
      ));
      this._partialBytes = 0;
    };
    modes.cfb.prototype.decrypt = function(input, output3, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = input.getInt32();
          output3.putInt32(this._inBlock[i] ^ this._outBlock[i]);
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialBlock[i] = input.getInt32();
        this._partialOutput.putInt32(this._partialBlock[i] ^ this._outBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._partialBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output3.putBytes(this._partialOutput.getBytes(
          partialBytes - this._partialBytes
        ));
        this._partialBytes = partialBytes;
        return true;
      }
      output3.putBytes(this._partialOutput.getBytes(
        inputLength - this._partialBytes
      ));
      this._partialBytes = 0;
    };
    modes.ofb = function(options) {
      options = options || {};
      this.name = "OFB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge6.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.ofb.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.ofb.prototype.encrypt = function(input, output3, finish) {
      var inputLength = input.length();
      if (input.length() === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output3.putInt32(input.getInt32() ^ this._outBlock[i]);
          this._inBlock[i] = this._outBlock[i];
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._outBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output3.putBytes(this._partialOutput.getBytes(
          partialBytes - this._partialBytes
        ));
        this._partialBytes = partialBytes;
        return true;
      }
      output3.putBytes(this._partialOutput.getBytes(
        inputLength - this._partialBytes
      ));
      this._partialBytes = 0;
    };
    modes.ofb.prototype.decrypt = modes.ofb.prototype.encrypt;
    modes.ctr = function(options) {
      options = options || {};
      this.name = "CTR";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge6.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.ctr.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.ctr.prototype.encrypt = function(input, output3, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output3.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
      } else {
        var partialBytes = (this.blockSize - inputLength) % this.blockSize;
        if (partialBytes > 0) {
          partialBytes = this.blockSize - partialBytes;
        }
        this._partialOutput.clear();
        for (var i = 0; i < this._ints; ++i) {
          this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
        if (partialBytes > 0) {
          input.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (partialBytes > 0 && !finish) {
          output3.putBytes(this._partialOutput.getBytes(
            partialBytes - this._partialBytes
          ));
          this._partialBytes = partialBytes;
          return true;
        }
        output3.putBytes(this._partialOutput.getBytes(
          inputLength - this._partialBytes
        ));
        this._partialBytes = 0;
      }
      inc32(this._inBlock);
    };
    modes.ctr.prototype.decrypt = modes.ctr.prototype.encrypt;
    modes.gcm = function(options) {
      options = options || {};
      this.name = "GCM";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge6.util.createBuffer();
      this._partialBytes = 0;
      this._R = 3774873600;
    };
    modes.gcm.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      var iv = forge6.util.createBuffer(options.iv);
      this._cipherLength = 0;
      var additionalData;
      if ("additionalData" in options) {
        additionalData = forge6.util.createBuffer(options.additionalData);
      } else {
        additionalData = forge6.util.createBuffer();
      }
      if ("tagLength" in options) {
        this._tagLength = options.tagLength;
      } else {
        this._tagLength = 128;
      }
      this._tag = null;
      if (options.decrypt) {
        this._tag = forge6.util.createBuffer(options.tag).getBytes();
        if (this._tag.length !== this._tagLength / 8) {
          throw new Error("Authentication tag does not match tag length.");
        }
      }
      this._hashBlock = new Array(this._ints);
      this.tag = null;
      this._hashSubkey = new Array(this._ints);
      this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey);
      this.componentBits = 4;
      this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
      var ivLength = iv.length();
      if (ivLength === 12) {
        this._j0 = [iv.getInt32(), iv.getInt32(), iv.getInt32(), 1];
      } else {
        this._j0 = [0, 0, 0, 0];
        while (iv.length() > 0) {
          this._j0 = this.ghash(
            this._hashSubkey,
            this._j0,
            [iv.getInt32(), iv.getInt32(), iv.getInt32(), iv.getInt32()]
          );
        }
        this._j0 = this.ghash(
          this._hashSubkey,
          this._j0,
          [0, 0].concat(from64To32(ivLength * 8))
        );
      }
      this._inBlock = this._j0.slice(0);
      inc32(this._inBlock);
      this._partialBytes = 0;
      additionalData = forge6.util.createBuffer(additionalData);
      this._aDataLength = from64To32(additionalData.length() * 8);
      var overflow = additionalData.length() % this.blockSize;
      if (overflow) {
        additionalData.fillWithByte(0, this.blockSize - overflow);
      }
      this._s = [0, 0, 0, 0];
      while (additionalData.length() > 0) {
        this._s = this.ghash(this._hashSubkey, this._s, [
          additionalData.getInt32(),
          additionalData.getInt32(),
          additionalData.getInt32(),
          additionalData.getInt32()
        ]);
      }
    };
    modes.gcm.prototype.encrypt = function(input, output3, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output3.putInt32(this._outBlock[i] ^= input.getInt32());
        }
        this._cipherLength += this.blockSize;
      } else {
        var partialBytes = (this.blockSize - inputLength) % this.blockSize;
        if (partialBytes > 0) {
          partialBytes = this.blockSize - partialBytes;
        }
        this._partialOutput.clear();
        for (var i = 0; i < this._ints; ++i) {
          this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
        if (partialBytes <= 0 || finish) {
          if (finish) {
            var overflow = inputLength % this.blockSize;
            this._cipherLength += overflow;
            this._partialOutput.truncate(this.blockSize - overflow);
          } else {
            this._cipherLength += this.blockSize;
          }
          for (var i = 0; i < this._ints; ++i) {
            this._outBlock[i] = this._partialOutput.getInt32();
          }
          this._partialOutput.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (partialBytes > 0 && !finish) {
          input.read -= this.blockSize;
          output3.putBytes(this._partialOutput.getBytes(
            partialBytes - this._partialBytes
          ));
          this._partialBytes = partialBytes;
          return true;
        }
        output3.putBytes(this._partialOutput.getBytes(
          inputLength - this._partialBytes
        ));
        this._partialBytes = 0;
      }
      this._s = this.ghash(this._hashSubkey, this._s, this._outBlock);
      inc32(this._inBlock);
    };
    modes.gcm.prototype.decrypt = function(input, output3, finish) {
      var inputLength = input.length();
      if (inputLength < this.blockSize && !(finish && inputLength > 0)) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      inc32(this._inBlock);
      this._hashBlock[0] = input.getInt32();
      this._hashBlock[1] = input.getInt32();
      this._hashBlock[2] = input.getInt32();
      this._hashBlock[3] = input.getInt32();
      this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
      for (var i = 0; i < this._ints; ++i) {
        output3.putInt32(this._outBlock[i] ^ this._hashBlock[i]);
      }
      if (inputLength < this.blockSize) {
        this._cipherLength += inputLength % this.blockSize;
      } else {
        this._cipherLength += this.blockSize;
      }
    };
    modes.gcm.prototype.afterFinish = function(output3, options) {
      var rval = true;
      if (options.decrypt && options.overflow) {
        output3.truncate(this.blockSize - options.overflow);
      }
      this.tag = forge6.util.createBuffer();
      var lengths = this._aDataLength.concat(from64To32(this._cipherLength * 8));
      this._s = this.ghash(this._hashSubkey, this._s, lengths);
      var tag = [];
      this.cipher.encrypt(this._j0, tag);
      for (var i = 0; i < this._ints; ++i) {
        this.tag.putInt32(this._s[i] ^ tag[i]);
      }
      this.tag.truncate(this.tag.length() % (this._tagLength / 8));
      if (options.decrypt && this.tag.bytes() !== this._tag) {
        rval = false;
      }
      return rval;
    };
    modes.gcm.prototype.multiply = function(x, y) {
      var z_i = [0, 0, 0, 0];
      var v_i = y.slice(0);
      for (var i = 0; i < 128; ++i) {
        var x_i = x[i / 32 | 0] & 1 << 31 - i % 32;
        if (x_i) {
          z_i[0] ^= v_i[0];
          z_i[1] ^= v_i[1];
          z_i[2] ^= v_i[2];
          z_i[3] ^= v_i[3];
        }
        this.pow(v_i, v_i);
      }
      return z_i;
    };
    modes.gcm.prototype.pow = function(x, out) {
      var lsb = x[3] & 1;
      for (var i = 3; i > 0; --i) {
        out[i] = x[i] >>> 1 | (x[i - 1] & 1) << 31;
      }
      out[0] = x[0] >>> 1;
      if (lsb) {
        out[0] ^= this._R;
      }
    };
    modes.gcm.prototype.tableMultiply = function(x) {
      var z = [0, 0, 0, 0];
      for (var i = 0; i < 32; ++i) {
        var idx = i / 8 | 0;
        var x_i = x[idx] >>> (7 - i % 8) * 4 & 15;
        var ah = this._m[i][x_i];
        z[0] ^= ah[0];
        z[1] ^= ah[1];
        z[2] ^= ah[2];
        z[3] ^= ah[3];
      }
      return z;
    };
    modes.gcm.prototype.ghash = function(h, y, x) {
      y[0] ^= x[0];
      y[1] ^= x[1];
      y[2] ^= x[2];
      y[3] ^= x[3];
      return this.tableMultiply(y);
    };
    modes.gcm.prototype.generateHashTable = function(h, bits2) {
      var multiplier = 8 / bits2;
      var perInt = 4 * multiplier;
      var size = 16 * multiplier;
      var m = new Array(size);
      for (var i = 0; i < size; ++i) {
        var tmp = [0, 0, 0, 0];
        var idx = i / perInt | 0;
        var shft = (perInt - 1 - i % perInt) * bits2;
        tmp[idx] = 1 << bits2 - 1 << shft;
        m[i] = this.generateSubHashTable(this.multiply(tmp, h), bits2);
      }
      return m;
    };
    modes.gcm.prototype.generateSubHashTable = function(mid, bits2) {
      var size = 1 << bits2;
      var half = size >>> 1;
      var m = new Array(size);
      m[half] = mid.slice(0);
      var i = half >>> 1;
      while (i > 0) {
        this.pow(m[2 * i], m[i] = []);
        i >>= 1;
      }
      i = 2;
      while (i < half) {
        for (var j = 1; j < i; ++j) {
          var m_i = m[i];
          var m_j = m[j];
          m[i + j] = [
            m_i[0] ^ m_j[0],
            m_i[1] ^ m_j[1],
            m_i[2] ^ m_j[2],
            m_i[3] ^ m_j[3]
          ];
        }
        i *= 2;
      }
      m[0] = [0, 0, 0, 0];
      for (i = half + 1; i < size; ++i) {
        var c = m[i ^ half];
        m[i] = [mid[0] ^ c[0], mid[1] ^ c[1], mid[2] ^ c[2], mid[3] ^ c[3]];
      }
      return m;
    };
    function transformIV(iv, blockSize) {
      if (typeof iv === "string") {
        iv = forge6.util.createBuffer(iv);
      }
      if (forge6.util.isArray(iv) && iv.length > 4) {
        var tmp = iv;
        iv = forge6.util.createBuffer();
        for (var i = 0; i < tmp.length; ++i) {
          iv.putByte(tmp[i]);
        }
      }
      if (iv.length() < blockSize) {
        throw new Error(
          "Invalid IV length; got " + iv.length() + " bytes and expected " + blockSize + " bytes."
        );
      }
      if (!forge6.util.isArray(iv)) {
        var ints = [];
        var blocks = blockSize / 4;
        for (var i = 0; i < blocks; ++i) {
          ints.push(iv.getInt32());
        }
        iv = ints;
      }
      return iv;
    }
    function inc32(block) {
      block[block.length - 1] = block[block.length - 1] + 1 & 4294967295;
    }
    function from64To32(num) {
      return [num / 4294967296 | 0, num & 4294967295];
    }
  }
});

// node_modules/node-forge/lib/aes.js
var require_aes = __commonJS({
  "node_modules/node-forge/lib/aes.js"(exports, module) {
    var forge6 = require_forge();
    require_cipher();
    require_cipherModes();
    require_util();
    module.exports = forge6.aes = forge6.aes || {};
    forge6.aes.startEncrypting = function(key, iv, output3, mode) {
      var cipher = _createCipher({
        key,
        output: output3,
        decrypt: false,
        mode
      });
      cipher.start(iv);
      return cipher;
    };
    forge6.aes.createEncryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: false,
        mode
      });
    };
    forge6.aes.startDecrypting = function(key, iv, output3, mode) {
      var cipher = _createCipher({
        key,
        output: output3,
        decrypt: true,
        mode
      });
      cipher.start(iv);
      return cipher;
    };
    forge6.aes.createDecryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: true,
        mode
      });
    };
    forge6.aes.Algorithm = function(name7, mode) {
      if (!init) {
        initialize();
      }
      var self2 = this;
      self2.name = name7;
      self2.mode = new mode({
        blockSize: 16,
        cipher: {
          encrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._w, inBlock, outBlock, false);
          },
          decrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._w, inBlock, outBlock, true);
          }
        }
      });
      self2._init = false;
    };
    forge6.aes.Algorithm.prototype.initialize = function(options) {
      if (this._init) {
        return;
      }
      var key = options.key;
      var tmp;
      if (typeof key === "string" && (key.length === 16 || key.length === 24 || key.length === 32)) {
        key = forge6.util.createBuffer(key);
      } else if (forge6.util.isArray(key) && (key.length === 16 || key.length === 24 || key.length === 32)) {
        tmp = key;
        key = forge6.util.createBuffer();
        for (var i = 0; i < tmp.length; ++i) {
          key.putByte(tmp[i]);
        }
      }
      if (!forge6.util.isArray(key)) {
        tmp = key;
        key = [];
        var len = tmp.length();
        if (len === 16 || len === 24 || len === 32) {
          len = len >>> 2;
          for (var i = 0; i < len; ++i) {
            key.push(tmp.getInt32());
          }
        }
      }
      if (!forge6.util.isArray(key) || !(key.length === 4 || key.length === 6 || key.length === 8)) {
        throw new Error("Invalid key parameter.");
      }
      var mode = this.mode.name;
      var encryptOp = ["CFB", "OFB", "CTR", "GCM"].indexOf(mode) !== -1;
      this._w = _expandKey(key, options.decrypt && !encryptOp);
      this._init = true;
    };
    forge6.aes._expandKey = function(key, decrypt2) {
      if (!init) {
        initialize();
      }
      return _expandKey(key, decrypt2);
    };
    forge6.aes._updateBlock = _updateBlock;
    registerAlgorithm("AES-ECB", forge6.cipher.modes.ecb);
    registerAlgorithm("AES-CBC", forge6.cipher.modes.cbc);
    registerAlgorithm("AES-CFB", forge6.cipher.modes.cfb);
    registerAlgorithm("AES-OFB", forge6.cipher.modes.ofb);
    registerAlgorithm("AES-CTR", forge6.cipher.modes.ctr);
    registerAlgorithm("AES-GCM", forge6.cipher.modes.gcm);
    function registerAlgorithm(name7, mode) {
      var factory = function() {
        return new forge6.aes.Algorithm(name7, mode);
      };
      forge6.cipher.registerAlgorithm(name7, factory);
    }
    var init = false;
    var Nb = 4;
    var sbox;
    var isbox;
    var rcon;
    var mix;
    var imix;
    function initialize() {
      init = true;
      rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      var xtime = new Array(256);
      for (var i = 0; i < 128; ++i) {
        xtime[i] = i << 1;
        xtime[i + 128] = i + 128 << 1 ^ 283;
      }
      sbox = new Array(256);
      isbox = new Array(256);
      mix = new Array(4);
      imix = new Array(4);
      for (var i = 0; i < 4; ++i) {
        mix[i] = new Array(256);
        imix[i] = new Array(256);
      }
      var e = 0, ei = 0, e2, e4, e8, sx, sx2, me, ime;
      for (var i = 0; i < 256; ++i) {
        sx = ei ^ ei << 1 ^ ei << 2 ^ ei << 3 ^ ei << 4;
        sx = sx >> 8 ^ sx & 255 ^ 99;
        sbox[e] = sx;
        isbox[sx] = e;
        sx2 = xtime[sx];
        e2 = xtime[e];
        e4 = xtime[e2];
        e8 = xtime[e4];
        me = sx2 << 24 ^ // 2
        sx << 16 ^ // 1
        sx << 8 ^ // 1
        (sx ^ sx2);
        ime = (e2 ^ e4 ^ e8) << 24 ^ // E (14)
        (e ^ e8) << 16 ^ // 9
        (e ^ e4 ^ e8) << 8 ^ // D (13)
        (e ^ e2 ^ e8);
        for (var n = 0; n < 4; ++n) {
          mix[n][e] = me;
          imix[n][sx] = ime;
          me = me << 24 | me >>> 8;
          ime = ime << 24 | ime >>> 8;
        }
        if (e === 0) {
          e = ei = 1;
        } else {
          e = e2 ^ xtime[xtime[xtime[e2 ^ e8]]];
          ei ^= xtime[xtime[ei]];
        }
      }
    }
    function _expandKey(key, decrypt2) {
      var w = key.slice(0);
      var temp, iNk = 1;
      var Nk = w.length;
      var Nr1 = Nk + 6 + 1;
      var end = Nb * Nr1;
      for (var i = Nk; i < end; ++i) {
        temp = w[i - 1];
        if (i % Nk === 0) {
          temp = sbox[temp >>> 16 & 255] << 24 ^ sbox[temp >>> 8 & 255] << 16 ^ sbox[temp & 255] << 8 ^ sbox[temp >>> 24] ^ rcon[iNk] << 24;
          iNk++;
        } else if (Nk > 6 && i % Nk === 4) {
          temp = sbox[temp >>> 24] << 24 ^ sbox[temp >>> 16 & 255] << 16 ^ sbox[temp >>> 8 & 255] << 8 ^ sbox[temp & 255];
        }
        w[i] = w[i - Nk] ^ temp;
      }
      if (decrypt2) {
        var tmp;
        var m0 = imix[0];
        var m1 = imix[1];
        var m2 = imix[2];
        var m3 = imix[3];
        var wnew = w.slice(0);
        end = w.length;
        for (var i = 0, wi = end - Nb; i < end; i += Nb, wi -= Nb) {
          if (i === 0 || i === end - Nb) {
            wnew[i] = w[wi];
            wnew[i + 1] = w[wi + 3];
            wnew[i + 2] = w[wi + 2];
            wnew[i + 3] = w[wi + 1];
          } else {
            for (var n = 0; n < Nb; ++n) {
              tmp = w[wi + n];
              wnew[i + (3 & -n)] = m0[sbox[tmp >>> 24]] ^ m1[sbox[tmp >>> 16 & 255]] ^ m2[sbox[tmp >>> 8 & 255]] ^ m3[sbox[tmp & 255]];
            }
          }
        }
        w = wnew;
      }
      return w;
    }
    function _updateBlock(w, input, output3, decrypt2) {
      var Nr = w.length / 4 - 1;
      var m0, m1, m2, m3, sub;
      if (decrypt2) {
        m0 = imix[0];
        m1 = imix[1];
        m2 = imix[2];
        m3 = imix[3];
        sub = isbox;
      } else {
        m0 = mix[0];
        m1 = mix[1];
        m2 = mix[2];
        m3 = mix[3];
        sub = sbox;
      }
      var a, b, c, d, a2, b2, c2;
      a = input[0] ^ w[0];
      b = input[decrypt2 ? 3 : 1] ^ w[1];
      c = input[2] ^ w[2];
      d = input[decrypt2 ? 1 : 3] ^ w[3];
      var i = 3;
      for (var round = 1; round < Nr; ++round) {
        a2 = m0[a >>> 24] ^ m1[b >>> 16 & 255] ^ m2[c >>> 8 & 255] ^ m3[d & 255] ^ w[++i];
        b2 = m0[b >>> 24] ^ m1[c >>> 16 & 255] ^ m2[d >>> 8 & 255] ^ m3[a & 255] ^ w[++i];
        c2 = m0[c >>> 24] ^ m1[d >>> 16 & 255] ^ m2[a >>> 8 & 255] ^ m3[b & 255] ^ w[++i];
        d = m0[d >>> 24] ^ m1[a >>> 16 & 255] ^ m2[b >>> 8 & 255] ^ m3[c & 255] ^ w[++i];
        a = a2;
        b = b2;
        c = c2;
      }
      output3[0] = sub[a >>> 24] << 24 ^ sub[b >>> 16 & 255] << 16 ^ sub[c >>> 8 & 255] << 8 ^ sub[d & 255] ^ w[++i];
      output3[decrypt2 ? 3 : 1] = sub[b >>> 24] << 24 ^ sub[c >>> 16 & 255] << 16 ^ sub[d >>> 8 & 255] << 8 ^ sub[a & 255] ^ w[++i];
      output3[2] = sub[c >>> 24] << 24 ^ sub[d >>> 16 & 255] << 16 ^ sub[a >>> 8 & 255] << 8 ^ sub[b & 255] ^ w[++i];
      output3[decrypt2 ? 1 : 3] = sub[d >>> 24] << 24 ^ sub[a >>> 16 & 255] << 16 ^ sub[b >>> 8 & 255] << 8 ^ sub[c & 255] ^ w[++i];
    }
    function _createCipher(options) {
      options = options || {};
      var mode = (options.mode || "CBC").toUpperCase();
      var algorithm = "AES-" + mode;
      var cipher;
      if (options.decrypt) {
        cipher = forge6.cipher.createDecipher(algorithm, options.key);
      } else {
        cipher = forge6.cipher.createCipher(algorithm, options.key);
      }
      var start = cipher.start;
      cipher.start = function(iv, options2) {
        var output3 = null;
        if (options2 instanceof forge6.util.ByteBuffer) {
          output3 = options2;
          options2 = {};
        }
        options2 = options2 || {};
        options2.output = output3;
        options2.iv = iv;
        start.call(cipher, options2);
      };
      return cipher;
    }
  }
});

// node_modules/node-forge/lib/des.js
var require_des = __commonJS({
  "node_modules/node-forge/lib/des.js"(exports, module) {
    var forge6 = require_forge();
    require_cipher();
    require_cipherModes();
    require_util();
    module.exports = forge6.des = forge6.des || {};
    forge6.des.startEncrypting = function(key, iv, output3, mode) {
      var cipher = _createCipher({
        key,
        output: output3,
        decrypt: false,
        mode: mode || (iv === null ? "ECB" : "CBC")
      });
      cipher.start(iv);
      return cipher;
    };
    forge6.des.createEncryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: false,
        mode
      });
    };
    forge6.des.startDecrypting = function(key, iv, output3, mode) {
      var cipher = _createCipher({
        key,
        output: output3,
        decrypt: true,
        mode: mode || (iv === null ? "ECB" : "CBC")
      });
      cipher.start(iv);
      return cipher;
    };
    forge6.des.createDecryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: true,
        mode
      });
    };
    forge6.des.Algorithm = function(name7, mode) {
      var self2 = this;
      self2.name = name7;
      self2.mode = new mode({
        blockSize: 8,
        cipher: {
          encrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._keys, inBlock, outBlock, false);
          },
          decrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._keys, inBlock, outBlock, true);
          }
        }
      });
      self2._init = false;
    };
    forge6.des.Algorithm.prototype.initialize = function(options) {
      if (this._init) {
        return;
      }
      var key = forge6.util.createBuffer(options.key);
      if (this.name.indexOf("3DES") === 0) {
        if (key.length() !== 24) {
          throw new Error("Invalid Triple-DES key size: " + key.length() * 8);
        }
      }
      this._keys = _createKeys(key);
      this._init = true;
    };
    registerAlgorithm("DES-ECB", forge6.cipher.modes.ecb);
    registerAlgorithm("DES-CBC", forge6.cipher.modes.cbc);
    registerAlgorithm("DES-CFB", forge6.cipher.modes.cfb);
    registerAlgorithm("DES-OFB", forge6.cipher.modes.ofb);
    registerAlgorithm("DES-CTR", forge6.cipher.modes.ctr);
    registerAlgorithm("3DES-ECB", forge6.cipher.modes.ecb);
    registerAlgorithm("3DES-CBC", forge6.cipher.modes.cbc);
    registerAlgorithm("3DES-CFB", forge6.cipher.modes.cfb);
    registerAlgorithm("3DES-OFB", forge6.cipher.modes.ofb);
    registerAlgorithm("3DES-CTR", forge6.cipher.modes.ctr);
    function registerAlgorithm(name7, mode) {
      var factory = function() {
        return new forge6.des.Algorithm(name7, mode);
      };
      forge6.cipher.registerAlgorithm(name7, factory);
    }
    var spfunction1 = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756];
    var spfunction2 = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344];
    var spfunction3 = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584];
    var spfunction4 = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928];
    var spfunction5 = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080];
    var spfunction6 = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312];
    var spfunction7 = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154];
    var spfunction8 = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
    function _createKeys(key) {
      var pc2bytes0 = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], pc2bytes1 = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], pc2bytes2 = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], pc2bytes3 = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], pc2bytes4 = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], pc2bytes5 = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], pc2bytes6 = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], pc2bytes7 = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], pc2bytes8 = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], pc2bytes9 = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], pc2bytes10 = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], pc2bytes11 = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], pc2bytes12 = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], pc2bytes13 = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261];
      var iterations = key.length() > 8 ? 3 : 1;
      var keys = [];
      var shifts = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
      var n = 0, tmp;
      for (var j = 0; j < iterations; j++) {
        var left = key.getInt32();
        var right = key.getInt32();
        tmp = (left >>> 4 ^ right) & 252645135;
        right ^= tmp;
        left ^= tmp << 4;
        tmp = (right >>> -16 ^ left) & 65535;
        left ^= tmp;
        right ^= tmp << -16;
        tmp = (left >>> 2 ^ right) & 858993459;
        right ^= tmp;
        left ^= tmp << 2;
        tmp = (right >>> -16 ^ left) & 65535;
        left ^= tmp;
        right ^= tmp << -16;
        tmp = (left >>> 1 ^ right) & 1431655765;
        right ^= tmp;
        left ^= tmp << 1;
        tmp = (right >>> 8 ^ left) & 16711935;
        left ^= tmp;
        right ^= tmp << 8;
        tmp = (left >>> 1 ^ right) & 1431655765;
        right ^= tmp;
        left ^= tmp << 1;
        tmp = left << 8 | right >>> 20 & 240;
        left = right << 24 | right << 8 & 16711680 | right >>> 8 & 65280 | right >>> 24 & 240;
        right = tmp;
        for (var i = 0; i < shifts.length; ++i) {
          if (shifts[i]) {
            left = left << 2 | left >>> 26;
            right = right << 2 | right >>> 26;
          } else {
            left = left << 1 | left >>> 27;
            right = right << 1 | right >>> 27;
          }
          left &= -15;
          right &= -15;
          var lefttmp = pc2bytes0[left >>> 28] | pc2bytes1[left >>> 24 & 15] | pc2bytes2[left >>> 20 & 15] | pc2bytes3[left >>> 16 & 15] | pc2bytes4[left >>> 12 & 15] | pc2bytes5[left >>> 8 & 15] | pc2bytes6[left >>> 4 & 15];
          var righttmp = pc2bytes7[right >>> 28] | pc2bytes8[right >>> 24 & 15] | pc2bytes9[right >>> 20 & 15] | pc2bytes10[right >>> 16 & 15] | pc2bytes11[right >>> 12 & 15] | pc2bytes12[right >>> 8 & 15] | pc2bytes13[right >>> 4 & 15];
          tmp = (righttmp >>> 16 ^ lefttmp) & 65535;
          keys[n++] = lefttmp ^ tmp;
          keys[n++] = righttmp ^ tmp << 16;
        }
      }
      return keys;
    }
    function _updateBlock(keys, input, output3, decrypt2) {
      var iterations = keys.length === 32 ? 3 : 9;
      var looping;
      if (iterations === 3) {
        looping = decrypt2 ? [30, -2, -2] : [0, 32, 2];
      } else {
        looping = decrypt2 ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
      }
      var tmp;
      var left = input[0];
      var right = input[1];
      tmp = (left >>> 4 ^ right) & 252645135;
      right ^= tmp;
      left ^= tmp << 4;
      tmp = (left >>> 16 ^ right) & 65535;
      right ^= tmp;
      left ^= tmp << 16;
      tmp = (right >>> 2 ^ left) & 858993459;
      left ^= tmp;
      right ^= tmp << 2;
      tmp = (right >>> 8 ^ left) & 16711935;
      left ^= tmp;
      right ^= tmp << 8;
      tmp = (left >>> 1 ^ right) & 1431655765;
      right ^= tmp;
      left ^= tmp << 1;
      left = left << 1 | left >>> 31;
      right = right << 1 | right >>> 31;
      for (var j = 0; j < iterations; j += 3) {
        var endloop = looping[j + 1];
        var loopinc = looping[j + 2];
        for (var i = looping[j]; i != endloop; i += loopinc) {
          var right1 = right ^ keys[i];
          var right2 = (right >>> 4 | right << 28) ^ keys[i + 1];
          tmp = left;
          left = right;
          right = tmp ^ (spfunction2[right1 >>> 24 & 63] | spfunction4[right1 >>> 16 & 63] | spfunction6[right1 >>> 8 & 63] | spfunction8[right1 & 63] | spfunction1[right2 >>> 24 & 63] | spfunction3[right2 >>> 16 & 63] | spfunction5[right2 >>> 8 & 63] | spfunction7[right2 & 63]);
        }
        tmp = left;
        left = right;
        right = tmp;
      }
      left = left >>> 1 | left << 31;
      right = right >>> 1 | right << 31;
      tmp = (left >>> 1 ^ right) & 1431655765;
      right ^= tmp;
      left ^= tmp << 1;
      tmp = (right >>> 8 ^ left) & 16711935;
      left ^= tmp;
      right ^= tmp << 8;
      tmp = (right >>> 2 ^ left) & 858993459;
      left ^= tmp;
      right ^= tmp << 2;
      tmp = (left >>> 16 ^ right) & 65535;
      right ^= tmp;
      left ^= tmp << 16;
      tmp = (left >>> 4 ^ right) & 252645135;
      right ^= tmp;
      left ^= tmp << 4;
      output3[0] = left;
      output3[1] = right;
    }
    function _createCipher(options) {
      options = options || {};
      var mode = (options.mode || "CBC").toUpperCase();
      var algorithm = "DES-" + mode;
      var cipher;
      if (options.decrypt) {
        cipher = forge6.cipher.createDecipher(algorithm, options.key);
      } else {
        cipher = forge6.cipher.createCipher(algorithm, options.key);
      }
      var start = cipher.start;
      cipher.start = function(iv, options2) {
        var output3 = null;
        if (options2 instanceof forge6.util.ByteBuffer) {
          output3 = options2;
          options2 = {};
        }
        options2 = options2 || {};
        options2.output = output3;
        options2.iv = iv;
        start.call(cipher, options2);
      };
      return cipher;
    }
  }
});

// node_modules/node-forge/lib/md.js
var require_md = __commonJS({
  "node_modules/node-forge/lib/md.js"(exports, module) {
    var forge6 = require_forge();
    module.exports = forge6.md = forge6.md || {};
    forge6.md.algorithms = forge6.md.algorithms || {};
  }
});

// node_modules/node-forge/lib/hmac.js
var require_hmac = __commonJS({
  "node_modules/node-forge/lib/hmac.js"(exports, module) {
    var forge6 = require_forge();
    require_md();
    require_util();
    var hmac2 = module.exports = forge6.hmac = forge6.hmac || {};
    hmac2.create = function() {
      var _key = null;
      var _md = null;
      var _ipadding = null;
      var _opadding = null;
      var ctx = {};
      ctx.start = function(md, key) {
        if (md !== null) {
          if (typeof md === "string") {
            md = md.toLowerCase();
            if (md in forge6.md.algorithms) {
              _md = forge6.md.algorithms[md].create();
            } else {
              throw new Error('Unknown hash algorithm "' + md + '"');
            }
          } else {
            _md = md;
          }
        }
        if (key === null) {
          key = _key;
        } else {
          if (typeof key === "string") {
            key = forge6.util.createBuffer(key);
          } else if (forge6.util.isArray(key)) {
            var tmp = key;
            key = forge6.util.createBuffer();
            for (var i = 0; i < tmp.length; ++i) {
              key.putByte(tmp[i]);
            }
          }
          var keylen = key.length();
          if (keylen > _md.blockLength) {
            _md.start();
            _md.update(key.bytes());
            key = _md.digest();
          }
          _ipadding = forge6.util.createBuffer();
          _opadding = forge6.util.createBuffer();
          keylen = key.length();
          for (var i = 0; i < keylen; ++i) {
            var tmp = key.at(i);
            _ipadding.putByte(54 ^ tmp);
            _opadding.putByte(92 ^ tmp);
          }
          if (keylen < _md.blockLength) {
            var tmp = _md.blockLength - keylen;
            for (var i = 0; i < tmp; ++i) {
              _ipadding.putByte(54);
              _opadding.putByte(92);
            }
          }
          _key = key;
          _ipadding = _ipadding.bytes();
          _opadding = _opadding.bytes();
        }
        _md.start();
        _md.update(_ipadding);
      };
      ctx.update = function(bytes3) {
        _md.update(bytes3);
      };
      ctx.getMac = function() {
        var inner = _md.digest().bytes();
        _md.start();
        _md.update(_opadding);
        _md.update(inner);
        return _md.digest();
      };
      ctx.digest = ctx.getMac;
      return ctx;
    };
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
  }
});

// node_modules/node-forge/lib/pbkdf2.js
var require_pbkdf2 = __commonJS({
  "node_modules/node-forge/lib/pbkdf2.js"(exports, module) {
    var forge6 = require_forge();
    require_hmac();
    require_md();
    require_util();
    var pkcs5 = forge6.pkcs5 = forge6.pkcs5 || {};
    var crypto5;
    if (forge6.util.isNodejs && !forge6.options.usePureJavaScript) {
      crypto5 = require_crypto();
    }
    module.exports = forge6.pbkdf2 = pkcs5.pbkdf2 = function(p, s, c, dkLen, md, callback) {
      if (typeof md === "function") {
        callback = md;
        md = null;
      }
      if (forge6.util.isNodejs && !forge6.options.usePureJavaScript && crypto5.pbkdf2 && (md === null || typeof md !== "object") && (crypto5.pbkdf2Sync.length > 4 || (!md || md === "sha1"))) {
        if (typeof md !== "string") {
          md = "sha1";
        }
        p = Buffer.from(p, "binary");
        s = Buffer.from(s, "binary");
        if (!callback) {
          if (crypto5.pbkdf2Sync.length === 4) {
            return crypto5.pbkdf2Sync(p, s, c, dkLen).toString("binary");
          }
          return crypto5.pbkdf2Sync(p, s, c, dkLen, md).toString("binary");
        }
        if (crypto5.pbkdf2Sync.length === 4) {
          return crypto5.pbkdf2(p, s, c, dkLen, function(err2, key) {
            if (err2) {
              return callback(err2);
            }
            callback(null, key.toString("binary"));
          });
        }
        return crypto5.pbkdf2(p, s, c, dkLen, md, function(err2, key) {
          if (err2) {
            return callback(err2);
          }
          callback(null, key.toString("binary"));
        });
      }
      if (typeof md === "undefined" || md === null) {
        md = "sha1";
      }
      if (typeof md === "string") {
        if (!(md in forge6.md.algorithms)) {
          throw new Error("Unknown hash algorithm: " + md);
        }
        md = forge6.md[md].create();
      }
      var hLen = md.digestLength;
      if (dkLen > 4294967295 * hLen) {
        var err = new Error("Derived key is too long.");
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      var len = Math.ceil(dkLen / hLen);
      var r = dkLen - (len - 1) * hLen;
      var prf = forge6.hmac.create();
      prf.start(md, p);
      var dk = "";
      var xor2, u_c, u_c1;
      if (!callback) {
        for (var i = 1; i <= len; ++i) {
          prf.start(null, null);
          prf.update(s);
          prf.update(forge6.util.int32ToBytes(i));
          xor2 = u_c1 = prf.digest().getBytes();
          for (var j = 2; j <= c; ++j) {
            prf.start(null, null);
            prf.update(u_c1);
            u_c = prf.digest().getBytes();
            xor2 = forge6.util.xorBytes(xor2, u_c, hLen);
            u_c1 = u_c;
          }
          dk += i < len ? xor2 : xor2.substr(0, r);
        }
        return dk;
      }
      var i = 1, j;
      function outer() {
        if (i > len) {
          return callback(null, dk);
        }
        prf.start(null, null);
        prf.update(s);
        prf.update(forge6.util.int32ToBytes(i));
        xor2 = u_c1 = prf.digest().getBytes();
        j = 2;
        inner();
      }
      function inner() {
        if (j <= c) {
          prf.start(null, null);
          prf.update(u_c1);
          u_c = prf.digest().getBytes();
          xor2 = forge6.util.xorBytes(xor2, u_c, hLen);
          u_c1 = u_c;
          ++j;
          return forge6.util.setImmediate(inner);
        }
        dk += i < len ? xor2 : xor2.substr(0, r);
        ++i;
        outer();
      }
      outer();
    };
  }
});

// node_modules/node-forge/lib/pem.js
var require_pem = __commonJS({
  "node_modules/node-forge/lib/pem.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    var pem = module.exports = forge6.pem = forge6.pem || {};
    pem.encode = function(msg, options) {
      options = options || {};
      var rval = "-----BEGIN " + msg.type + "-----\r\n";
      var header;
      if (msg.procType) {
        header = {
          name: "Proc-Type",
          values: [String(msg.procType.version), msg.procType.type]
        };
        rval += foldHeader(header);
      }
      if (msg.contentDomain) {
        header = { name: "Content-Domain", values: [msg.contentDomain] };
        rval += foldHeader(header);
      }
      if (msg.dekInfo) {
        header = { name: "DEK-Info", values: [msg.dekInfo.algorithm] };
        if (msg.dekInfo.parameters) {
          header.values.push(msg.dekInfo.parameters);
        }
        rval += foldHeader(header);
      }
      if (msg.headers) {
        for (var i = 0; i < msg.headers.length; ++i) {
          rval += foldHeader(msg.headers[i]);
        }
      }
      if (msg.procType) {
        rval += "\r\n";
      }
      rval += forge6.util.encode64(msg.body, options.maxline || 64) + "\r\n";
      rval += "-----END " + msg.type + "-----\r\n";
      return rval;
    };
    pem.decode = function(str) {
      var rval = [];
      var rMessage = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g;
      var rHeader = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/;
      var rCRLF = /\r?\n/;
      var match;
      while (true) {
        match = rMessage.exec(str);
        if (!match) {
          break;
        }
        var type = match[1];
        if (type === "NEW CERTIFICATE REQUEST") {
          type = "CERTIFICATE REQUEST";
        }
        var msg = {
          type,
          procType: null,
          contentDomain: null,
          dekInfo: null,
          headers: [],
          body: forge6.util.decode64(match[3])
        };
        rval.push(msg);
        if (!match[2]) {
          continue;
        }
        var lines = match[2].split(rCRLF);
        var li = 0;
        while (match && li < lines.length) {
          var line = lines[li].replace(/\s+$/, "");
          for (var nl = li + 1; nl < lines.length; ++nl) {
            var next = lines[nl];
            if (!/\s/.test(next[0])) {
              break;
            }
            line += next;
            li = nl;
          }
          match = line.match(rHeader);
          if (match) {
            var header = { name: match[1], values: [] };
            var values = match[2].split(",");
            for (var vi = 0; vi < values.length; ++vi) {
              header.values.push(ltrim(values[vi]));
            }
            if (!msg.procType) {
              if (header.name !== "Proc-Type") {
                throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');
              } else if (header.values.length !== 2) {
                throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');
              }
              msg.procType = { version: values[0], type: values[1] };
            } else if (!msg.contentDomain && header.name === "Content-Domain") {
              msg.contentDomain = values[0] || "";
            } else if (!msg.dekInfo && header.name === "DEK-Info") {
              if (header.values.length === 0) {
                throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');
              }
              msg.dekInfo = { algorithm: values[0], parameters: values[1] || null };
            } else {
              msg.headers.push(header);
            }
          }
          ++li;
        }
        if (msg.procType === "ENCRYPTED" && !msg.dekInfo) {
          throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".');
        }
      }
      if (rval.length === 0) {
        throw new Error("Invalid PEM formatted message.");
      }
      return rval;
    };
    function foldHeader(header) {
      var rval = header.name + ": ";
      var values = [];
      var insertSpace = function(match, $1) {
        return " " + $1;
      };
      for (var i = 0; i < header.values.length; ++i) {
        values.push(header.values[i].replace(/^(\S+\r\n)/, insertSpace));
      }
      rval += values.join(",") + "\r\n";
      var length8 = 0;
      var candidate = -1;
      for (var i = 0; i < rval.length; ++i, ++length8) {
        if (length8 > 65 && candidate !== -1) {
          var insert = rval[candidate];
          if (insert === ",") {
            ++candidate;
            rval = rval.substr(0, candidate) + "\r\n " + rval.substr(candidate);
          } else {
            rval = rval.substr(0, candidate) + "\r\n" + insert + rval.substr(candidate + 1);
          }
          length8 = i - candidate - 1;
          candidate = -1;
          ++i;
        } else if (rval[i] === " " || rval[i] === "	" || rval[i] === ",") {
          candidate = i;
        }
      }
      return rval;
    }
    function ltrim(str) {
      return str.replace(/^\s+/, "");
    }
  }
});

// node_modules/node-forge/lib/sha256.js
var require_sha256 = __commonJS({
  "node_modules/node-forge/lib/sha256.js"(exports, module) {
    var forge6 = require_forge();
    require_md();
    require_util();
    var sha2568 = module.exports = forge6.sha256 = forge6.sha256 || {};
    forge6.md.sha256 = forge6.md.algorithms.sha256 = sha2568;
    sha2568.create = function() {
      if (!_initialized) {
        _init();
      }
      var _state = null;
      var _input = forge6.util.createBuffer();
      var _w = new Array(64);
      var md = {
        algorithm: "sha256",
        blockLength: 64,
        digestLength: 32,
        // 56-bit length of message so far (does not including padding)
        messageLength: 0,
        // true message length
        fullMessageLength: null,
        // size of message length in bytes
        messageLengthSize: 8
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength64 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge6.util.createBuffer();
        _state = {
          h0: 1779033703,
          h1: 3144134277,
          h2: 1013904242,
          h3: 2773480762,
          h4: 1359893119,
          h5: 2600822924,
          h6: 528734635,
          h7: 1541459225
        };
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge6.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_state, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge6.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits2 = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits2 += carry;
          finalBlock.putInt32(bits2 >>> 0);
          bits2 = next >>> 0;
        }
        finalBlock.putInt32(bits2);
        var s2 = {
          h0: _state.h0,
          h1: _state.h1,
          h2: _state.h2,
          h3: _state.h3,
          h4: _state.h4,
          h5: _state.h5,
          h6: _state.h6,
          h7: _state.h7
        };
        _update(s2, _w, finalBlock);
        var rval = forge6.util.createBuffer();
        rval.putInt32(s2.h0);
        rval.putInt32(s2.h1);
        rval.putInt32(s2.h2);
        rval.putInt32(s2.h3);
        rval.putInt32(s2.h4);
        rval.putInt32(s2.h5);
        rval.putInt32(s2.h6);
        rval.putInt32(s2.h7);
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    var _k = null;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge6.util.fillString(String.fromCharCode(0), 64);
      _k = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      _initialized = true;
    }
    function _update(s, w, bytes3) {
      var t1, t2, s0, s1, ch, maj, i, a, b, c, d, e, f, g, h;
      var len = bytes3.length();
      while (len >= 64) {
        for (i = 0; i < 16; ++i) {
          w[i] = bytes3.getInt32();
        }
        for (; i < 64; ++i) {
          t1 = w[i - 2];
          t1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
          t2 = w[i - 15];
          t2 = (t2 >>> 7 | t2 << 25) ^ (t2 >>> 18 | t2 << 14) ^ t2 >>> 3;
          w[i] = t1 + w[i - 7] + t2 + w[i - 16] | 0;
        }
        a = s.h0;
        b = s.h1;
        c = s.h2;
        d = s.h3;
        e = s.h4;
        f = s.h5;
        g = s.h6;
        h = s.h7;
        for (i = 0; i < 64; ++i) {
          s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
          ch = g ^ e & (f ^ g);
          s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
          maj = a & b | c & (a ^ b);
          t1 = h + s1 + ch + _k[i] + w[i];
          t2 = s0 + maj;
          h = g;
          g = f;
          f = e;
          e = d + t1 >>> 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 >>> 0;
        }
        s.h0 = s.h0 + a | 0;
        s.h1 = s.h1 + b | 0;
        s.h2 = s.h2 + c | 0;
        s.h3 = s.h3 + d | 0;
        s.h4 = s.h4 + e | 0;
        s.h5 = s.h5 + f | 0;
        s.h6 = s.h6 + g | 0;
        s.h7 = s.h7 + h | 0;
        len -= 64;
      }
    }
  }
});

// node_modules/node-forge/lib/prng.js
var require_prng = __commonJS({
  "node_modules/node-forge/lib/prng.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    var _crypto = null;
    if (forge6.util.isNodejs && !forge6.options.usePureJavaScript && !process.versions["node-webkit"]) {
      _crypto = require_crypto();
    }
    var prng = module.exports = forge6.prng = forge6.prng || {};
    prng.create = function(plugin) {
      var ctx = {
        plugin,
        key: null,
        seed: null,
        time: null,
        // number of reseeds so far
        reseeds: 0,
        // amount of data generated so far
        generated: 0,
        // no initial key bytes
        keyBytes: ""
      };
      var md = plugin.md;
      var pools = new Array(32);
      for (var i = 0; i < 32; ++i) {
        pools[i] = md.create();
      }
      ctx.pools = pools;
      ctx.pool = 0;
      ctx.generate = function(count, callback) {
        if (!callback) {
          return ctx.generateSync(count);
        }
        var cipher = ctx.plugin.cipher;
        var increment = ctx.plugin.increment;
        var formatKey = ctx.plugin.formatKey;
        var formatSeed = ctx.plugin.formatSeed;
        var b = forge6.util.createBuffer();
        ctx.key = null;
        generate();
        function generate(err) {
          if (err) {
            return callback(err);
          }
          if (b.length() >= count) {
            return callback(null, b.getBytes(count));
          }
          if (ctx.generated > 1048575) {
            ctx.key = null;
          }
          if (ctx.key === null) {
            return forge6.util.nextTick(function() {
              _reseed(generate);
            });
          }
          var bytes3 = cipher(ctx.key, ctx.seed);
          ctx.generated += bytes3.length;
          b.putBytes(bytes3);
          ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
          ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));
          forge6.util.setImmediate(generate);
        }
      };
      ctx.generateSync = function(count) {
        var cipher = ctx.plugin.cipher;
        var increment = ctx.plugin.increment;
        var formatKey = ctx.plugin.formatKey;
        var formatSeed = ctx.plugin.formatSeed;
        ctx.key = null;
        var b = forge6.util.createBuffer();
        while (b.length() < count) {
          if (ctx.generated > 1048575) {
            ctx.key = null;
          }
          if (ctx.key === null) {
            _reseedSync();
          }
          var bytes3 = cipher(ctx.key, ctx.seed);
          ctx.generated += bytes3.length;
          b.putBytes(bytes3);
          ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
          ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));
        }
        return b.getBytes(count);
      };
      function _reseed(callback) {
        if (ctx.pools[0].messageLength >= 32) {
          _seed();
          return callback();
        }
        var needed = 32 - ctx.pools[0].messageLength << 5;
        ctx.seedFile(needed, function(err, bytes3) {
          if (err) {
            return callback(err);
          }
          ctx.collect(bytes3);
          _seed();
          callback();
        });
      }
      function _reseedSync() {
        if (ctx.pools[0].messageLength >= 32) {
          return _seed();
        }
        var needed = 32 - ctx.pools[0].messageLength << 5;
        ctx.collect(ctx.seedFileSync(needed));
        _seed();
      }
      function _seed() {
        ctx.reseeds = ctx.reseeds === 4294967295 ? 0 : ctx.reseeds + 1;
        var md2 = ctx.plugin.md.create();
        md2.update(ctx.keyBytes);
        var _2powK = 1;
        for (var k = 0; k < 32; ++k) {
          if (ctx.reseeds % _2powK === 0) {
            md2.update(ctx.pools[k].digest().getBytes());
            ctx.pools[k].start();
          }
          _2powK = _2powK << 1;
        }
        ctx.keyBytes = md2.digest().getBytes();
        md2.start();
        md2.update(ctx.keyBytes);
        var seedBytes = md2.digest().getBytes();
        ctx.key = ctx.plugin.formatKey(ctx.keyBytes);
        ctx.seed = ctx.plugin.formatSeed(seedBytes);
        ctx.generated = 0;
      }
      function defaultSeedFile(needed) {
        var getRandomValues = null;
        var globalScope = forge6.util.globalScope;
        var _crypto2 = globalScope.crypto || globalScope.msCrypto;
        if (_crypto2 && _crypto2.getRandomValues) {
          getRandomValues = function(arr) {
            return _crypto2.getRandomValues(arr);
          };
        }
        var b = forge6.util.createBuffer();
        if (getRandomValues) {
          while (b.length() < needed) {
            var count = Math.max(1, Math.min(needed - b.length(), 65536) / 4);
            var entropy = new Uint32Array(Math.floor(count));
            try {
              getRandomValues(entropy);
              for (var i2 = 0; i2 < entropy.length; ++i2) {
                b.putInt32(entropy[i2]);
              }
            } catch (e) {
              if (!(typeof QuotaExceededError !== "undefined" && e instanceof QuotaExceededError)) {
                throw e;
              }
            }
          }
        }
        if (b.length() < needed) {
          var hi, lo, next;
          var seed = Math.floor(Math.random() * 65536);
          while (b.length() < needed) {
            lo = 16807 * (seed & 65535);
            hi = 16807 * (seed >> 16);
            lo += (hi & 32767) << 16;
            lo += hi >> 15;
            lo = (lo & 2147483647) + (lo >> 31);
            seed = lo & 4294967295;
            for (var i2 = 0; i2 < 3; ++i2) {
              next = seed >>> (i2 << 3);
              next ^= Math.floor(Math.random() * 256);
              b.putByte(next & 255);
            }
          }
        }
        return b.getBytes(needed);
      }
      if (_crypto) {
        ctx.seedFile = function(needed, callback) {
          _crypto.randomBytes(needed, function(err, bytes3) {
            if (err) {
              return callback(err);
            }
            callback(null, bytes3.toString());
          });
        };
        ctx.seedFileSync = function(needed) {
          return _crypto.randomBytes(needed).toString();
        };
      } else {
        ctx.seedFile = function(needed, callback) {
          try {
            callback(null, defaultSeedFile(needed));
          } catch (e) {
            callback(e);
          }
        };
        ctx.seedFileSync = defaultSeedFile;
      }
      ctx.collect = function(bytes3) {
        var count = bytes3.length;
        for (var i2 = 0; i2 < count; ++i2) {
          ctx.pools[ctx.pool].update(bytes3.substr(i2, 1));
          ctx.pool = ctx.pool === 31 ? 0 : ctx.pool + 1;
        }
      };
      ctx.collectInt = function(i2, n) {
        var bytes3 = "";
        for (var x = 0; x < n; x += 8) {
          bytes3 += String.fromCharCode(i2 >> x & 255);
        }
        ctx.collect(bytes3);
      };
      ctx.registerWorker = function(worker) {
        if (worker === self) {
          ctx.seedFile = function(needed, callback) {
            function listener2(e) {
              var data = e.data;
              if (data.forge && data.forge.prng) {
                self.removeEventListener("message", listener2);
                callback(data.forge.prng.err, data.forge.prng.bytes);
              }
            }
            self.addEventListener("message", listener2);
            self.postMessage({ forge: { prng: { needed } } });
          };
        } else {
          var listener = function(e) {
            var data = e.data;
            if (data.forge && data.forge.prng) {
              ctx.seedFile(data.forge.prng.needed, function(err, bytes3) {
                worker.postMessage({ forge: { prng: { err, bytes: bytes3 } } });
              });
            }
          };
          worker.addEventListener("message", listener);
        }
      };
      return ctx;
    };
  }
});

// node_modules/node-forge/lib/random.js
var require_random = __commonJS({
  "node_modules/node-forge/lib/random.js"(exports, module) {
    var forge6 = require_forge();
    require_aes();
    require_sha256();
    require_prng();
    require_util();
    (function() {
      if (forge6.random && forge6.random.getBytes) {
        module.exports = forge6.random;
        return;
      }
      (function(jQuery2) {
        var prng_aes = {};
        var _prng_aes_output = new Array(4);
        var _prng_aes_buffer = forge6.util.createBuffer();
        prng_aes.formatKey = function(key2) {
          var tmp = forge6.util.createBuffer(key2);
          key2 = new Array(4);
          key2[0] = tmp.getInt32();
          key2[1] = tmp.getInt32();
          key2[2] = tmp.getInt32();
          key2[3] = tmp.getInt32();
          return forge6.aes._expandKey(key2, false);
        };
        prng_aes.formatSeed = function(seed) {
          var tmp = forge6.util.createBuffer(seed);
          seed = new Array(4);
          seed[0] = tmp.getInt32();
          seed[1] = tmp.getInt32();
          seed[2] = tmp.getInt32();
          seed[3] = tmp.getInt32();
          return seed;
        };
        prng_aes.cipher = function(key2, seed) {
          forge6.aes._updateBlock(key2, seed, _prng_aes_output, false);
          _prng_aes_buffer.putInt32(_prng_aes_output[0]);
          _prng_aes_buffer.putInt32(_prng_aes_output[1]);
          _prng_aes_buffer.putInt32(_prng_aes_output[2]);
          _prng_aes_buffer.putInt32(_prng_aes_output[3]);
          return _prng_aes_buffer.getBytes();
        };
        prng_aes.increment = function(seed) {
          ++seed[3];
          return seed;
        };
        prng_aes.md = forge6.md.sha256;
        function spawnPrng() {
          var ctx = forge6.prng.create(prng_aes);
          ctx.getBytes = function(count, callback) {
            return ctx.generate(count, callback);
          };
          ctx.getBytesSync = function(count) {
            return ctx.generate(count);
          };
          return ctx;
        }
        var _ctx = spawnPrng();
        var getRandomValues = null;
        var globalScope = forge6.util.globalScope;
        var _crypto = globalScope.crypto || globalScope.msCrypto;
        if (_crypto && _crypto.getRandomValues) {
          getRandomValues = function(arr) {
            return _crypto.getRandomValues(arr);
          };
        }
        if (forge6.options.usePureJavaScript || !forge6.util.isNodejs && !getRandomValues) {
          if (typeof window === "undefined" || window.document === void 0) {
          }
          _ctx.collectInt(+/* @__PURE__ */ new Date(), 32);
          if (typeof navigator !== "undefined") {
            var _navBytes = "";
            for (var key in navigator) {
              try {
                if (typeof navigator[key] == "string") {
                  _navBytes += navigator[key];
                }
              } catch (e) {
              }
            }
            _ctx.collect(_navBytes);
            _navBytes = null;
          }
          if (jQuery2) {
            jQuery2().mousemove(function(e) {
              _ctx.collectInt(e.clientX, 16);
              _ctx.collectInt(e.clientY, 16);
            });
            jQuery2().keypress(function(e) {
              _ctx.collectInt(e.charCode, 8);
            });
          }
        }
        if (!forge6.random) {
          forge6.random = _ctx;
        } else {
          for (var key in _ctx) {
            forge6.random[key] = _ctx[key];
          }
        }
        forge6.random.createInstance = spawnPrng;
        module.exports = forge6.random;
      })(typeof jQuery !== "undefined" ? jQuery : null);
    })();
  }
});

// node_modules/node-forge/lib/rc2.js
var require_rc2 = __commonJS({
  "node_modules/node-forge/lib/rc2.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    var piTable = [
      217,
      120,
      249,
      196,
      25,
      221,
      181,
      237,
      40,
      233,
      253,
      121,
      74,
      160,
      216,
      157,
      198,
      126,
      55,
      131,
      43,
      118,
      83,
      142,
      98,
      76,
      100,
      136,
      68,
      139,
      251,
      162,
      23,
      154,
      89,
      245,
      135,
      179,
      79,
      19,
      97,
      69,
      109,
      141,
      9,
      129,
      125,
      50,
      189,
      143,
      64,
      235,
      134,
      183,
      123,
      11,
      240,
      149,
      33,
      34,
      92,
      107,
      78,
      130,
      84,
      214,
      101,
      147,
      206,
      96,
      178,
      28,
      115,
      86,
      192,
      20,
      167,
      140,
      241,
      220,
      18,
      117,
      202,
      31,
      59,
      190,
      228,
      209,
      66,
      61,
      212,
      48,
      163,
      60,
      182,
      38,
      111,
      191,
      14,
      218,
      70,
      105,
      7,
      87,
      39,
      242,
      29,
      155,
      188,
      148,
      67,
      3,
      248,
      17,
      199,
      246,
      144,
      239,
      62,
      231,
      6,
      195,
      213,
      47,
      200,
      102,
      30,
      215,
      8,
      232,
      234,
      222,
      128,
      82,
      238,
      247,
      132,
      170,
      114,
      172,
      53,
      77,
      106,
      42,
      150,
      26,
      210,
      113,
      90,
      21,
      73,
      116,
      75,
      159,
      208,
      94,
      4,
      24,
      164,
      236,
      194,
      224,
      65,
      110,
      15,
      81,
      203,
      204,
      36,
      145,
      175,
      80,
      161,
      244,
      112,
      57,
      153,
      124,
      58,
      133,
      35,
      184,
      180,
      122,
      252,
      2,
      54,
      91,
      37,
      85,
      151,
      49,
      45,
      93,
      250,
      152,
      227,
      138,
      146,
      174,
      5,
      223,
      41,
      16,
      103,
      108,
      186,
      201,
      211,
      0,
      230,
      207,
      225,
      158,
      168,
      44,
      99,
      22,
      1,
      63,
      88,
      226,
      137,
      169,
      13,
      56,
      52,
      27,
      171,
      51,
      255,
      176,
      187,
      72,
      12,
      95,
      185,
      177,
      205,
      46,
      197,
      243,
      219,
      71,
      229,
      165,
      156,
      119,
      10,
      166,
      32,
      104,
      254,
      127,
      193,
      173
    ];
    var s = [1, 2, 3, 5];
    var rol = function(word, bits2) {
      return word << bits2 & 65535 | (word & 65535) >> 16 - bits2;
    };
    var ror = function(word, bits2) {
      return (word & 65535) >> bits2 | word << 16 - bits2 & 65535;
    };
    module.exports = forge6.rc2 = forge6.rc2 || {};
    forge6.rc2.expandKey = function(key, effKeyBits) {
      if (typeof key === "string") {
        key = forge6.util.createBuffer(key);
      }
      effKeyBits = effKeyBits || 128;
      var L = key;
      var T = key.length();
      var T1 = effKeyBits;
      var T8 = Math.ceil(T1 / 8);
      var TM = 255 >> (T1 & 7);
      var i;
      for (i = T; i < 128; i++) {
        L.putByte(piTable[L.at(i - 1) + L.at(i - T) & 255]);
      }
      L.setAt(128 - T8, piTable[L.at(128 - T8) & TM]);
      for (i = 127 - T8; i >= 0; i--) {
        L.setAt(i, piTable[L.at(i + 1) ^ L.at(i + T8)]);
      }
      return L;
    };
    var createCipher = function(key, bits2, encrypt2) {
      var _finish = false, _input = null, _output = null, _iv = null;
      var mixRound, mashRound;
      var i, j, K = [];
      key = forge6.rc2.expandKey(key, bits2);
      for (i = 0; i < 64; i++) {
        K.push(key.getInt16Le());
      }
      if (encrypt2) {
        mixRound = function(R) {
          for (i = 0; i < 4; i++) {
            R[i] += K[j] + (R[(i + 3) % 4] & R[(i + 2) % 4]) + (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            R[i] = rol(R[i], s[i]);
            j++;
          }
        };
        mashRound = function(R) {
          for (i = 0; i < 4; i++) {
            R[i] += K[R[(i + 3) % 4] & 63];
          }
        };
      } else {
        mixRound = function(R) {
          for (i = 3; i >= 0; i--) {
            R[i] = ror(R[i], s[i]);
            R[i] -= K[j] + (R[(i + 3) % 4] & R[(i + 2) % 4]) + (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            j--;
          }
        };
        mashRound = function(R) {
          for (i = 3; i >= 0; i--) {
            R[i] -= K[R[(i + 3) % 4] & 63];
          }
        };
      }
      var runPlan = function(plan) {
        var R = [];
        for (i = 0; i < 4; i++) {
          var val = _input.getInt16Le();
          if (_iv !== null) {
            if (encrypt2) {
              val ^= _iv.getInt16Le();
            } else {
              _iv.putInt16Le(val);
            }
          }
          R.push(val & 65535);
        }
        j = encrypt2 ? 0 : 63;
        for (var ptr = 0; ptr < plan.length; ptr++) {
          for (var ctr = 0; ctr < plan[ptr][0]; ctr++) {
            plan[ptr][1](R);
          }
        }
        for (i = 0; i < 4; i++) {
          if (_iv !== null) {
            if (encrypt2) {
              _iv.putInt16Le(R[i]);
            } else {
              R[i] ^= _iv.getInt16Le();
            }
          }
          _output.putInt16Le(R[i]);
        }
      };
      var cipher = null;
      cipher = {
        /**
         * Starts or restarts the encryption or decryption process, whichever
         * was previously configured.
         *
         * To use the cipher in CBC mode, iv may be given either as a string
         * of bytes, or as a byte buffer.  For ECB mode, give null as iv.
         *
         * @param iv the initialization vector to use, null for ECB mode.
         * @param output the output the buffer to write to, null to create one.
         */
        start: function(iv, output3) {
          if (iv) {
            if (typeof iv === "string") {
              iv = forge6.util.createBuffer(iv);
            }
          }
          _finish = false;
          _input = forge6.util.createBuffer();
          _output = output3 || new forge6.util.createBuffer();
          _iv = iv;
          cipher.output = _output;
        },
        /**
         * Updates the next block.
         *
         * @param input the buffer to read from.
         */
        update: function(input) {
          if (!_finish) {
            _input.putBuffer(input);
          }
          while (_input.length() >= 8) {
            runPlan([
              [5, mixRound],
              [1, mashRound],
              [6, mixRound],
              [1, mashRound],
              [5, mixRound]
            ]);
          }
        },
        /**
         * Finishes encrypting or decrypting.
         *
         * @param pad a padding function to use, null for PKCS#7 padding,
         *           signature(blockSize, buffer, decrypt).
         *
         * @return true if successful, false on error.
         */
        finish: function(pad) {
          var rval = true;
          if (encrypt2) {
            if (pad) {
              rval = pad(8, _input, !encrypt2);
            } else {
              var padding = _input.length() === 8 ? 8 : 8 - _input.length();
              _input.fillWithByte(padding, padding);
            }
          }
          if (rval) {
            _finish = true;
            cipher.update();
          }
          if (!encrypt2) {
            rval = _input.length() === 0;
            if (rval) {
              if (pad) {
                rval = pad(8, _output, !encrypt2);
              } else {
                var len = _output.length();
                var count = _output.at(len - 1);
                if (count > len) {
                  rval = false;
                } else {
                  _output.truncate(count);
                }
              }
            }
          }
          return rval;
        }
      };
      return cipher;
    };
    forge6.rc2.startEncrypting = function(key, iv, output3) {
      var cipher = forge6.rc2.createEncryptionCipher(key, 128);
      cipher.start(iv, output3);
      return cipher;
    };
    forge6.rc2.createEncryptionCipher = function(key, bits2) {
      return createCipher(key, bits2, true);
    };
    forge6.rc2.startDecrypting = function(key, iv, output3) {
      var cipher = forge6.rc2.createDecryptionCipher(key, 128);
      cipher.start(iv, output3);
      return cipher;
    };
    forge6.rc2.createDecryptionCipher = function(key, bits2) {
      return createCipher(key, bits2, false);
    };
  }
});

// node_modules/node-forge/lib/jsbn.js
var require_jsbn = __commonJS({
  "node_modules/node-forge/lib/jsbn.js"(exports, module) {
    var forge6 = require_forge();
    module.exports = forge6.jsbn = forge6.jsbn || {};
    var dbits;
    var canary = 244837814094590;
    var j_lm = (canary & 16777215) == 15715070;
    function BigInteger(a, b, c) {
      this.data = [];
      if (a != null)
        if ("number" == typeof a)
          this.fromNumber(a, b, c);
        else if (b == null && "string" != typeof a)
          this.fromString(a, 256);
        else
          this.fromString(a, b);
    }
    forge6.jsbn.BigInteger = BigInteger;
    function nbi() {
      return new BigInteger(null);
    }
    function am1(i, x, w, j, c, n) {
      while (--n >= 0) {
        var v = x * this.data[i++] + w.data[j] + c;
        c = Math.floor(v / 67108864);
        w.data[j++] = v & 67108863;
      }
      return c;
    }
    function am2(i, x, w, j, c, n) {
      var xl = x & 32767, xh = x >> 15;
      while (--n >= 0) {
        var l = this.data[i] & 32767;
        var h = this.data[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 32767) << 15) + w.data[j] + (c & 1073741823);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w.data[j++] = l & 1073741823;
      }
      return c;
    }
    function am3(i, x, w, j, c, n) {
      var xl = x & 16383, xh = x >> 14;
      while (--n >= 0) {
        var l = this.data[i] & 16383;
        var h = this.data[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 16383) << 14) + w.data[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w.data[j++] = l & 268435455;
      }
      return c;
    }
    if (typeof navigator === "undefined") {
      BigInteger.prototype.am = am3;
      dbits = 28;
    } else if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
      BigInteger.prototype.am = am2;
      dbits = 30;
    } else if (j_lm && navigator.appName != "Netscape") {
      BigInteger.prototype.am = am1;
      dbits = 26;
    } else {
      BigInteger.prototype.am = am3;
      dbits = 28;
    }
    BigInteger.prototype.DB = dbits;
    BigInteger.prototype.DM = (1 << dbits) - 1;
    BigInteger.prototype.DV = 1 << dbits;
    var BI_FP = 52;
    BigInteger.prototype.FV = Math.pow(2, BI_FP);
    BigInteger.prototype.F1 = BI_FP - dbits;
    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr;
    var vv;
    rr = "0".charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv)
      BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    function int2char(n) {
      return BI_RM.charAt(n);
    }
    function intAt(s, i) {
      var c = BI_RC[s.charCodeAt(i)];
      return c == null ? -1 : c;
    }
    function bnpCopyTo(r) {
      for (var i = this.t - 1; i >= 0; --i)
        r.data[i] = this.data[i];
      r.t = this.t;
      r.s = this.s;
    }
    function bnpFromInt(x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0)
        this.data[0] = x;
      else if (x < -1)
        this.data[0] = x + this.DV;
      else
        this.t = 0;
    }
    function nbv(i) {
      var r = nbi();
      r.fromInt(i);
      return r;
    }
    function bnpFromString(s, b) {
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 256)
        k = 8;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else {
        this.fromRadix(s, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i = s.length, mi = false, sh = 0;
      while (--i >= 0) {
        var x = k == 8 ? s[i] & 255 : intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-")
            mi = true;
          continue;
        }
        mi = false;
        if (sh == 0)
          this.data[this.t++] = x;
        else if (sh + k > this.DB) {
          this.data[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this.data[this.t++] = x >> this.DB - sh;
        } else
          this.data[this.t - 1] |= x << sh;
        sh += k;
        if (sh >= this.DB)
          sh -= this.DB;
      }
      if (k == 8 && (s[0] & 128) != 0) {
        this.s = -1;
        if (sh > 0)
          this.data[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
      }
      this.clamp();
      if (mi)
        BigInteger.ZERO.subTo(this, this);
    }
    function bnpClamp() {
      var c = this.s & this.DM;
      while (this.t > 0 && this.data[this.t - 1] == c)
        --this.t;
    }
    function bnToString(b) {
      if (this.s < 0)
        return "-" + this.negate().toString(b);
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else
        return this.toRadix(b);
      var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
      var p = this.DB - i * this.DB % k;
      if (i-- > 0) {
        if (p < this.DB && (d = this.data[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }
        while (i >= 0) {
          if (p < k) {
            d = (this.data[i] & (1 << p) - 1) << k - p;
            d |= this.data[--i] >> (p += this.DB - k);
          } else {
            d = this.data[i] >> (p -= k) & km;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if (d > 0)
            m = true;
          if (m)
            r += int2char(d);
        }
      }
      return m ? r : "0";
    }
    function bnNegate() {
      var r = nbi();
      BigInteger.ZERO.subTo(this, r);
      return r;
    }
    function bnAbs() {
      return this.s < 0 ? this.negate() : this;
    }
    function bnCompareTo(a) {
      var r = this.s - a.s;
      if (r != 0)
        return r;
      var i = this.t;
      r = i - a.t;
      if (r != 0)
        return this.s < 0 ? -r : r;
      while (--i >= 0)
        if ((r = this.data[i] - a.data[i]) != 0)
          return r;
      return 0;
    }
    function nbits(x) {
      var r = 1, t;
      if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
      }
      if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
      }
      if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
      }
      if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
      }
      if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
      }
      return r;
    }
    function bnBitLength() {
      if (this.t <= 0)
        return 0;
      return this.DB * (this.t - 1) + nbits(this.data[this.t - 1] ^ this.s & this.DM);
    }
    function bnpDLShiftTo(n, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i)
        r.data[i + n] = this.data[i];
      for (i = n - 1; i >= 0; --i)
        r.data[i] = 0;
      r.t = this.t + n;
      r.s = this.s;
    }
    function bnpDRShiftTo(n, r) {
      for (var i = n; i < this.t; ++i)
        r.data[i - n] = this.data[i];
      r.t = Math.max(this.t - n, 0);
      r.s = this.s;
    }
    function bnpLShiftTo(n, r) {
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / this.DB), c = this.s << bs & this.DM, i;
      for (i = this.t - 1; i >= 0; --i) {
        r.data[i + ds + 1] = this.data[i] >> cbs | c;
        c = (this.data[i] & bm) << bs;
      }
      for (i = ds - 1; i >= 0; --i)
        r.data[i] = 0;
      r.data[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    }
    function bnpRShiftTo(n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r.data[0] = this.data[ds] >> bs;
      for (var i = ds + 1; i < this.t; ++i) {
        r.data[i - ds - 1] |= (this.data[i] & bm) << cbs;
        r.data[i - ds] = this.data[i] >> bs;
      }
      if (bs > 0)
        r.data[this.t - ds - 1] |= (this.s & bm) << cbs;
      r.t = this.t - ds;
      r.clamp();
    }
    function bnpSubTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this.data[i] - a.data[i];
        r.data[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
          c += this.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c -= a.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1)
        r.data[i++] = this.DV + c;
      else if (c > 0)
        r.data[i++] = c;
      r.t = i;
      r.clamp();
    }
    function bnpMultiplyTo(a, r) {
      var x = this.abs(), y = a.abs();
      var i = x.t;
      r.t = i + y.t;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = 0; i < y.t; ++i)
        r.data[i + x.t] = x.am(0, y.data[i], r, i, 0, x.t);
      r.s = 0;
      r.clamp();
      if (this.s != a.s)
        BigInteger.ZERO.subTo(r, r);
    }
    function bnpSquareTo(r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x.data[i], r, 2 * i, 0, 1);
        if ((r.data[i + x.t] += x.am(i + 1, 2 * x.data[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r.data[i + x.t] -= x.DV;
          r.data[i + x.t + 1] = 1;
        }
      }
      if (r.t > 0)
        r.data[r.t - 1] += x.am(i, x.data[i], r, 2 * i, 0, 1);
      r.s = 0;
      r.clamp();
    }
    function bnpDivRemTo(m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0)
        return;
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null)
          q.fromInt(0);
        if (r != null)
          this.copyTo(r);
        return;
      }
      if (r == null)
        r = nbi();
      var y = nbi(), ts = this.s, ms = m.s;
      var nsh = this.DB - nbits(pm.data[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y.data[ys - 1];
      if (y0 == 0)
        return;
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y.data[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
      var i = r.t, j = i - ys, t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);
      if (r.compareTo(t) >= 0) {
        r.data[r.t++] = 1;
        r.subTo(t, r);
      }
      BigInteger.ONE.dlShiftTo(ys, t);
      t.subTo(y, y);
      while (y.t < ys)
        y.data[y.t++] = 0;
      while (--j >= 0) {
        var qd = r.data[--i] == y0 ? this.DM : Math.floor(r.data[i] * d1 + (r.data[i - 1] + e) * d2);
        if ((r.data[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
          y.dlShiftTo(j, t);
          r.subTo(t, r);
          while (r.data[i] < --qd)
            r.subTo(t, r);
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms)
          BigInteger.ZERO.subTo(q, q);
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0)
        r.rShiftTo(nsh, r);
      if (ts < 0)
        BigInteger.ZERO.subTo(r, r);
    }
    function bnMod(a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        a.subTo(r, r);
      return r;
    }
    function Classic(m) {
      this.m = m;
    }
    function cConvert(x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0)
        return x.mod(this.m);
      else
        return x;
    }
    function cRevert(x) {
      return x;
    }
    function cReduce(x) {
      x.divRemTo(this.m, null, x);
    }
    function cMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    function cSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
      if (this.t < 1)
        return 0;
      var x = this.data[0];
      if ((x & 1) == 0)
        return 0;
      var y = x & 3;
      y = y * (2 - (x & 15) * y) & 15;
      y = y * (2 - (x & 255) * y) & 255;
      y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
      y = y * (2 - x * y % this.DV) % this.DV;
      return y > 0 ? this.DV - y : -y;
    }
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    function montConvert(x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(r, r);
      return r;
    }
    function montRevert(x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
    function montReduce(x) {
      while (x.t <= this.mt2)
        x.data[x.t++] = 0;
      for (var i = 0; i < this.m.t; ++i) {
        var j = x.data[i] & 32767;
        var u0 = j * this.mpl + ((j * this.mph + (x.data[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
        j = i + this.m.t;
        x.data[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        while (x.data[j] >= x.DV) {
          x.data[j] -= x.DV;
          x.data[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function montSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function montMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() {
      return (this.t > 0 ? this.data[0] & 1 : this.s) == 0;
    }
    function bnpExp(e, z) {
      if (e > 4294967295 || e < 1)
        return BigInteger.ONE;
      var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
      g.copyTo(r);
      while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & 1 << i) > 0)
          z.mulTo(r2, g, r);
        else {
          var t = r;
          r = r2;
          r2 = t;
        }
      }
      return z.revert(r);
    }
    function bnModPowInt(e, m) {
      var z;
      if (e < 256 || m.isEven())
        z = new Classic(m);
      else
        z = new Montgomery(m);
      return this.exp(e, z);
    }
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);
    function bnClone() {
      var r = nbi();
      this.copyTo(r);
      return r;
    }
    function bnIntValue() {
      if (this.s < 0) {
        if (this.t == 1)
          return this.data[0] - this.DV;
        else if (this.t == 0)
          return -1;
      } else if (this.t == 1)
        return this.data[0];
      else if (this.t == 0)
        return 0;
      return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0];
    }
    function bnByteValue() {
      return this.t == 0 ? this.s : this.data[0] << 24 >> 24;
    }
    function bnShortValue() {
      return this.t == 0 ? this.s : this.data[0] << 16 >> 16;
    }
    function bnpChunkSize(r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    }
    function bnSigNum() {
      if (this.s < 0)
        return -1;
      else if (this.t <= 0 || this.t == 1 && this.data[0] <= 0)
        return 0;
      else
        return 1;
    }
    function bnpToRadix(b) {
      if (b == null)
        b = 10;
      if (this.signum() == 0 || b < 2 || b > 36)
        return "0";
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a), y = nbi(), z = nbi(), r = "";
      this.divRemTo(d, y, z);
      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }
      return z.intValue().toString(b) + r;
    }
    function bnpFromRadix(s, b) {
      this.fromInt(0);
      if (b == null)
        b = 10;
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0)
            mi = true;
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi)
        BigInteger.ZERO.subTo(this, this);
    }
    function bnpFromNumber(a, b, c) {
      if ("number" == typeof b) {
        if (a < 2)
          this.fromInt(1);
        else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1))
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          if (this.isEven())
            this.dAddOffset(1, 0);
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a)
              this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
          }
        }
      } else {
        var x = new Array(), t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0)
          x[0] &= (1 << t) - 1;
        else
          x[0] = 0;
        this.fromString(x, 256);
      }
    }
    function bnToByteArray() {
      var i = this.t, r = new Array();
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8, d, k = 0;
      if (i-- > 0) {
        if (p < this.DB && (d = this.data[i] >> p) != (this.s & this.DM) >> p)
          r[k++] = d | this.s << this.DB - p;
        while (i >= 0) {
          if (p < 8) {
            d = (this.data[i] & (1 << p) - 1) << 8 - p;
            d |= this.data[--i] >> (p += this.DB - 8);
          } else {
            d = this.data[i] >> (p -= 8) & 255;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if ((d & 128) != 0)
            d |= -256;
          if (k == 0 && (this.s & 128) != (d & 128))
            ++k;
          if (k > 0 || d != this.s)
            r[k++] = d;
        }
      }
      return r;
    }
    function bnEquals(a) {
      return this.compareTo(a) == 0;
    }
    function bnMin(a) {
      return this.compareTo(a) < 0 ? this : a;
    }
    function bnMax(a) {
      return this.compareTo(a) > 0 ? this : a;
    }
    function bnpBitwiseTo(a, op, r) {
      var i, f, m = Math.min(a.t, this.t);
      for (i = 0; i < m; ++i)
        r.data[i] = op(this.data[i], a.data[i]);
      if (a.t < this.t) {
        f = a.s & this.DM;
        for (i = m; i < this.t; ++i)
          r.data[i] = op(this.data[i], f);
        r.t = this.t;
      } else {
        f = this.s & this.DM;
        for (i = m; i < a.t; ++i)
          r.data[i] = op(f, a.data[i]);
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    }
    function op_and(x, y) {
      return x & y;
    }
    function bnAnd(a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    }
    function op_or(x, y) {
      return x | y;
    }
    function bnOr(a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    }
    function op_xor(x, y) {
      return x ^ y;
    }
    function bnXor(a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    }
    function op_andnot(x, y) {
      return x & ~y;
    }
    function bnAndNot(a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    }
    function bnNot() {
      var r = nbi();
      for (var i = 0; i < this.t; ++i)
        r.data[i] = this.DM & ~this.data[i];
      r.t = this.t;
      r.s = ~this.s;
      return r;
    }
    function bnShiftLeft(n) {
      var r = nbi();
      if (n < 0)
        this.rShiftTo(-n, r);
      else
        this.lShiftTo(n, r);
      return r;
    }
    function bnShiftRight(n) {
      var r = nbi();
      if (n < 0)
        this.lShiftTo(-n, r);
      else
        this.rShiftTo(n, r);
      return r;
    }
    function lbit(x) {
      if (x == 0)
        return -1;
      var r = 0;
      if ((x & 65535) == 0) {
        x >>= 16;
        r += 16;
      }
      if ((x & 255) == 0) {
        x >>= 8;
        r += 8;
      }
      if ((x & 15) == 0) {
        x >>= 4;
        r += 4;
      }
      if ((x & 3) == 0) {
        x >>= 2;
        r += 2;
      }
      if ((x & 1) == 0)
        ++r;
      return r;
    }
    function bnGetLowestSetBit() {
      for (var i = 0; i < this.t; ++i)
        if (this.data[i] != 0)
          return i * this.DB + lbit(this.data[i]);
      if (this.s < 0)
        return this.t * this.DB;
      return -1;
    }
    function cbit(x) {
      var r = 0;
      while (x != 0) {
        x &= x - 1;
        ++r;
      }
      return r;
    }
    function bnBitCount() {
      var r = 0, x = this.s & this.DM;
      for (var i = 0; i < this.t; ++i)
        r += cbit(this.data[i] ^ x);
      return r;
    }
    function bnTestBit(n) {
      var j = Math.floor(n / this.DB);
      if (j >= this.t)
        return this.s != 0;
      return (this.data[j] & 1 << n % this.DB) != 0;
    }
    function bnpChangeBit(n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    }
    function bnSetBit(n) {
      return this.changeBit(n, op_or);
    }
    function bnClearBit(n) {
      return this.changeBit(n, op_andnot);
    }
    function bnFlipBit(n) {
      return this.changeBit(n, op_xor);
    }
    function bnpAddTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this.data[i] + a.data[i];
        r.data[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i < this.t) {
          c += this.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c += a.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0)
        r.data[i++] = c;
      else if (c < -1)
        r.data[i++] = this.DV + c;
      r.t = i;
      r.clamp();
    }
    function bnAdd(a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    }
    function bnSubtract(a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    }
    function bnMultiply(a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    }
    function bnDivide(a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    }
    function bnRemainder(a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    }
    function bnDivideAndRemainder(a) {
      var q = nbi(), r = nbi();
      this.divRemTo(a, q, r);
      return new Array(q, r);
    }
    function bnpDMultiply(n) {
      this.data[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    }
    function bnpDAddOffset(n, w) {
      if (n == 0)
        return;
      while (this.t <= w)
        this.data[this.t++] = 0;
      this.data[w] += n;
      while (this.data[w] >= this.DV) {
        this.data[w] -= this.DV;
        if (++w >= this.t)
          this.data[this.t++] = 0;
        ++this.data[w];
      }
    }
    function NullExp() {
    }
    function nNop(x) {
      return x;
    }
    function nMulTo(x, y, r) {
      x.multiplyTo(y, r);
    }
    function nSqrTo(x, r) {
      x.squareTo(r);
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(e) {
      return this.exp(e, new NullExp());
    }
    function bnpMultiplyLowerTo(a, n, r) {
      var i = Math.min(this.t + a.t, n);
      r.s = 0;
      r.t = i;
      while (i > 0)
        r.data[--i] = 0;
      var j;
      for (j = r.t - this.t; i < j; ++i)
        r.data[i + this.t] = this.am(0, a.data[i], r, i, 0, this.t);
      for (j = Math.min(a.t, n); i < j; ++i)
        this.am(0, a.data[i], r, i, 0, n - i);
      r.clamp();
    }
    function bnpMultiplyUpperTo(a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;
      r.s = 0;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = Math.max(n - this.t, 0); i < a.t; ++i)
        r.data[this.t + i - n] = this.am(n - i, a.data[i], r, 0, 0, this.t + i - n);
      r.clamp();
      r.drShiftTo(1, r);
    }
    function Barrett(m) {
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
      this.m = m;
    }
    function barrettConvert(x) {
      if (x.s < 0 || x.t > 2 * this.m.t)
        return x.mod(this.m);
      else if (x.compareTo(this.m) < 0)
        return x;
      else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    }
    function barrettRevert(x) {
      return x;
    }
    function barrettReduce(x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0)
        x.dAddOffset(1, this.m.t + 1);
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function barrettSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function barrettMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(e, m) {
      var i = e.bitLength(), k, r = nbv(1), z;
      if (i <= 0)
        return r;
      else if (i < 18)
        k = 1;
      else if (i < 48)
        k = 3;
      else if (i < 144)
        k = 4;
      else if (i < 768)
        k = 5;
      else
        k = 6;
      if (i < 8)
        z = new Classic(m);
      else if (m.isEven())
        z = new Barrett(m);
      else
        z = new Montgomery(m);
      var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
      g[1] = z.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);
        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }
      var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
      i = nbits(e.data[j]) - 1;
      while (j >= 0) {
        if (i >= k1)
          w = e.data[j] >> i - k1 & km;
        else {
          w = (e.data[j] & (1 << i + 1) - 1) << k1 - i;
          if (j > 0)
            w |= e.data[j - 1] >> this.DB + i - k1;
        }
        n = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }
        if ((i -= n) < 0) {
          i += this.DB;
          --j;
        }
        if (is1) {
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }
          if (n > 0)
            z.sqrTo(r, r2);
          else {
            t = r;
            r = r2;
            r2 = t;
          }
          z.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e.data[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;
          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }
      return z.revert(r);
    }
    function bnGCD(a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit(), g = y.getLowestSetBit();
      if (g < 0)
        return x;
      if (i < g)
        g = i;
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0)
          x.rShiftTo(i, x);
        if ((i = y.getLowestSetBit()) > 0)
          y.rShiftTo(i, y);
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0)
        y.lShiftTo(g, y);
      return y;
    }
    function bnpModInt(n) {
      if (n <= 0)
        return 0;
      var d = this.DV % n, r = this.s < 0 ? n - 1 : 0;
      if (this.t > 0)
        if (d == 0)
          r = this.data[0] % n;
        else
          for (var i = this.t - 1; i >= 0; --i)
            r = (d * r + this.data[i]) % n;
      return r;
    }
    function bnModInverse(m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0)
        return BigInteger.ZERO;
      var u = m.clone(), v = this.clone();
      var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else if (!b.isEven())
            b.subTo(m, b);
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else if (!d.isEven())
            d.subTo(m, d);
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac)
            a.subTo(c, a);
          b.subTo(d, b);
        } else {
          v.subTo(u, v);
          if (ac)
            c.subTo(a, c);
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger.ONE) != 0)
        return BigInteger.ZERO;
      if (d.compareTo(m) >= 0)
        return d.subtract(m);
      if (d.signum() < 0)
        d.addTo(m, d);
      else
        return d;
      if (d.signum() < 0)
        return d.add(m);
      else
        return d;
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(t) {
      var i, x = this.abs();
      if (x.t == 1 && x.data[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i)
          if (x.data[0] == lowprimes[i])
            return true;
        return false;
      }
      if (x.isEven())
        return false;
      i = 1;
      while (i < lowprimes.length) {
        var m = lowprimes[i], j = i + 1;
        while (j < lowprimes.length && m < lplim)
          m *= lowprimes[j++];
        m = x.modInt(m);
        while (i < j)
          if (m % lowprimes[i++] == 0)
            return false;
      }
      return x.millerRabin(t);
    }
    function bnpMillerRabin(t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0)
        return false;
      var r = n1.shiftRight(k);
      var prng = bnGetPrng();
      var a;
      for (var i = 0; i < t; ++i) {
        do {
          a = new BigInteger(this.bitLength(), prng);
        } while (a.compareTo(BigInteger.ONE) <= 0 || a.compareTo(n1) >= 0);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger.ONE) == 0)
              return false;
          }
          if (y.compareTo(n1) != 0)
            return false;
        }
      }
      return true;
    }
    function bnGetPrng() {
      return {
        // x is an array to fill with bytes
        nextBytes: function(x) {
          for (var i = 0; i < x.length; ++i) {
            x[i] = Math.floor(Math.random() * 256);
          }
        }
      };
    }
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
  }
});

// node_modules/node-forge/lib/sha1.js
var require_sha1 = __commonJS({
  "node_modules/node-forge/lib/sha1.js"(exports, module) {
    var forge6 = require_forge();
    require_md();
    require_util();
    var sha1 = module.exports = forge6.sha1 = forge6.sha1 || {};
    forge6.md.sha1 = forge6.md.algorithms.sha1 = sha1;
    sha1.create = function() {
      if (!_initialized) {
        _init();
      }
      var _state = null;
      var _input = forge6.util.createBuffer();
      var _w = new Array(80);
      var md = {
        algorithm: "sha1",
        blockLength: 64,
        digestLength: 20,
        // 56-bit length of message so far (does not including padding)
        messageLength: 0,
        // true message length
        fullMessageLength: null,
        // size of message length in bytes
        messageLengthSize: 8
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength64 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge6.util.createBuffer();
        _state = {
          h0: 1732584193,
          h1: 4023233417,
          h2: 2562383102,
          h3: 271733878,
          h4: 3285377520
        };
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge6.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_state, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge6.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits2 = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits2 += carry;
          finalBlock.putInt32(bits2 >>> 0);
          bits2 = next >>> 0;
        }
        finalBlock.putInt32(bits2);
        var s2 = {
          h0: _state.h0,
          h1: _state.h1,
          h2: _state.h2,
          h3: _state.h3,
          h4: _state.h4
        };
        _update(s2, _w, finalBlock);
        var rval = forge6.util.createBuffer();
        rval.putInt32(s2.h0);
        rval.putInt32(s2.h1);
        rval.putInt32(s2.h2);
        rval.putInt32(s2.h3);
        rval.putInt32(s2.h4);
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge6.util.fillString(String.fromCharCode(0), 64);
      _initialized = true;
    }
    function _update(s, w, bytes3) {
      var t, a, b, c, d, e, f, i;
      var len = bytes3.length();
      while (len >= 64) {
        a = s.h0;
        b = s.h1;
        c = s.h2;
        d = s.h3;
        e = s.h4;
        for (i = 0; i < 16; ++i) {
          t = bytes3.getInt32();
          w[i] = t;
          f = d ^ b & (c ^ d);
          t = (a << 5 | a >>> 27) + f + e + 1518500249 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 20; ++i) {
          t = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
          t = t << 1 | t >>> 31;
          w[i] = t;
          f = d ^ b & (c ^ d);
          t = (a << 5 | a >>> 27) + f + e + 1518500249 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 32; ++i) {
          t = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
          t = t << 1 | t >>> 31;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 1859775393 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 40; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 1859775393 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 60; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b & c | d & (b ^ c);
          t = (a << 5 | a >>> 27) + f + e + 2400959708 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 80; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 3395469782 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        s.h0 = s.h0 + a | 0;
        s.h1 = s.h1 + b | 0;
        s.h2 = s.h2 + c | 0;
        s.h3 = s.h3 + d | 0;
        s.h4 = s.h4 + e | 0;
        len -= 64;
      }
    }
  }
});

// node_modules/node-forge/lib/pkcs1.js
var require_pkcs1 = __commonJS({
  "node_modules/node-forge/lib/pkcs1.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    require_random();
    require_sha1();
    var pkcs1 = module.exports = forge6.pkcs1 = forge6.pkcs1 || {};
    pkcs1.encode_rsa_oaep = function(key, message2, options) {
      var label;
      var seed;
      var md;
      var mgf1Md;
      if (typeof options === "string") {
        label = options;
        seed = arguments[3] || void 0;
        md = arguments[4] || void 0;
      } else if (options) {
        label = options.label || void 0;
        seed = options.seed || void 0;
        md = options.md || void 0;
        if (options.mgf1 && options.mgf1.md) {
          mgf1Md = options.mgf1.md;
        }
      }
      if (!md) {
        md = forge6.md.sha1.create();
      } else {
        md.start();
      }
      if (!mgf1Md) {
        mgf1Md = md;
      }
      var keyLength = Math.ceil(key.n.bitLength() / 8);
      var maxLength = keyLength - 2 * md.digestLength - 2;
      if (message2.length > maxLength) {
        var error = new Error("RSAES-OAEP input message length is too long.");
        error.length = message2.length;
        error.maxLength = maxLength;
        throw error;
      }
      if (!label) {
        label = "";
      }
      md.update(label, "raw");
      var lHash = md.digest();
      var PS = "";
      var PS_length = maxLength - message2.length;
      for (var i = 0; i < PS_length; i++) {
        PS += "\0";
      }
      var DB = lHash.getBytes() + PS + "" + message2;
      if (!seed) {
        seed = forge6.random.getBytes(md.digestLength);
      } else if (seed.length !== md.digestLength) {
        var error = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");
        error.seedLength = seed.length;
        error.digestLength = md.digestLength;
        throw error;
      }
      var dbMask = rsa_mgf1(seed, keyLength - md.digestLength - 1, mgf1Md);
      var maskedDB = forge6.util.xorBytes(DB, dbMask, DB.length);
      var seedMask = rsa_mgf1(maskedDB, md.digestLength, mgf1Md);
      var maskedSeed = forge6.util.xorBytes(seed, seedMask, seed.length);
      return "\0" + maskedSeed + maskedDB;
    };
    pkcs1.decode_rsa_oaep = function(key, em, options) {
      var label;
      var md;
      var mgf1Md;
      if (typeof options === "string") {
        label = options;
        md = arguments[3] || void 0;
      } else if (options) {
        label = options.label || void 0;
        md = options.md || void 0;
        if (options.mgf1 && options.mgf1.md) {
          mgf1Md = options.mgf1.md;
        }
      }
      var keyLength = Math.ceil(key.n.bitLength() / 8);
      if (em.length !== keyLength) {
        var error = new Error("RSAES-OAEP encoded message length is invalid.");
        error.length = em.length;
        error.expectedLength = keyLength;
        throw error;
      }
      if (md === void 0) {
        md = forge6.md.sha1.create();
      } else {
        md.start();
      }
      if (!mgf1Md) {
        mgf1Md = md;
      }
      if (keyLength < 2 * md.digestLength + 2) {
        throw new Error("RSAES-OAEP key is too short for the hash function.");
      }
      if (!label) {
        label = "";
      }
      md.update(label, "raw");
      var lHash = md.digest().getBytes();
      var y = em.charAt(0);
      var maskedSeed = em.substring(1, md.digestLength + 1);
      var maskedDB = em.substring(1 + md.digestLength);
      var seedMask = rsa_mgf1(maskedDB, md.digestLength, mgf1Md);
      var seed = forge6.util.xorBytes(maskedSeed, seedMask, maskedSeed.length);
      var dbMask = rsa_mgf1(seed, keyLength - md.digestLength - 1, mgf1Md);
      var db = forge6.util.xorBytes(maskedDB, dbMask, maskedDB.length);
      var lHashPrime = db.substring(0, md.digestLength);
      var error = y !== "\0";
      for (var i = 0; i < md.digestLength; ++i) {
        error |= lHash.charAt(i) !== lHashPrime.charAt(i);
      }
      var in_ps = 1;
      var index = md.digestLength;
      for (var j = md.digestLength; j < db.length; j++) {
        var code7 = db.charCodeAt(j);
        var is_0 = code7 & 1 ^ 1;
        var error_mask = in_ps ? 65534 : 0;
        error |= code7 & error_mask;
        in_ps = in_ps & is_0;
        index += in_ps;
      }
      if (error || db.charCodeAt(index) !== 1) {
        throw new Error("Invalid RSAES-OAEP padding.");
      }
      return db.substring(index + 1);
    };
    function rsa_mgf1(seed, maskLength, hash3) {
      if (!hash3) {
        hash3 = forge6.md.sha1.create();
      }
      var t = "";
      var count = Math.ceil(maskLength / hash3.digestLength);
      for (var i = 0; i < count; ++i) {
        var c = String.fromCharCode(
          i >> 24 & 255,
          i >> 16 & 255,
          i >> 8 & 255,
          i & 255
        );
        hash3.start();
        hash3.update(seed + c);
        t += hash3.digest().getBytes();
      }
      return t.substring(0, maskLength);
    }
  }
});

// node_modules/node-forge/lib/prime.js
var require_prime = __commonJS({
  "node_modules/node-forge/lib/prime.js"(exports, module) {
    var forge6 = require_forge();
    require_util();
    require_jsbn();
    require_random();
    (function() {
      if (forge6.prime) {
        module.exports = forge6.prime;
        return;
      }
      var prime = module.exports = forge6.prime = forge6.prime || {};
      var BigInteger = forge6.jsbn.BigInteger;
      var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
      var THIRTY = new BigInteger(null);
      THIRTY.fromInt(30);
      var op_or = function(x, y) {
        return x | y;
      };
      prime.generateProbablePrime = function(bits2, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        options = options || {};
        var algorithm = options.algorithm || "PRIMEINC";
        if (typeof algorithm === "string") {
          algorithm = { name: algorithm };
        }
        algorithm.options = algorithm.options || {};
        var prng = options.prng || forge6.random;
        var rng = {
          // x is an array to fill with bytes
          nextBytes: function(x) {
            var b = prng.getBytesSync(x.length);
            for (var i = 0; i < x.length; ++i) {
              x[i] = b.charCodeAt(i);
            }
          }
        };
        if (algorithm.name === "PRIMEINC") {
          return primeincFindPrime(bits2, rng, algorithm.options, callback);
        }
        throw new Error("Invalid prime generation algorithm: " + algorithm.name);
      };
      function primeincFindPrime(bits2, rng, options, callback) {
        if ("workers" in options) {
          return primeincFindPrimeWithWorkers(bits2, rng, options, callback);
        }
        return primeincFindPrimeWithoutWorkers(bits2, rng, options, callback);
      }
      function primeincFindPrimeWithoutWorkers(bits2, rng, options, callback) {
        var num = generateRandom(bits2, rng);
        var deltaIdx = 0;
        var mrTests = getMillerRabinTests(num.bitLength());
        if ("millerRabinTests" in options) {
          mrTests = options.millerRabinTests;
        }
        var maxBlockTime = 10;
        if ("maxBlockTime" in options) {
          maxBlockTime = options.maxBlockTime;
        }
        _primeinc(num, bits2, rng, deltaIdx, mrTests, maxBlockTime, callback);
      }
      function _primeinc(num, bits2, rng, deltaIdx, mrTests, maxBlockTime, callback) {
        var start = +/* @__PURE__ */ new Date();
        do {
          if (num.bitLength() > bits2) {
            num = generateRandom(bits2, rng);
          }
          if (num.isProbablePrime(mrTests)) {
            return callback(null, num);
          }
          num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
        } while (maxBlockTime < 0 || +/* @__PURE__ */ new Date() - start < maxBlockTime);
        forge6.util.setImmediate(function() {
          _primeinc(num, bits2, rng, deltaIdx, mrTests, maxBlockTime, callback);
        });
      }
      function primeincFindPrimeWithWorkers(bits2, rng, options, callback) {
        if (typeof Worker === "undefined") {
          return primeincFindPrimeWithoutWorkers(bits2, rng, options, callback);
        }
        var num = generateRandom(bits2, rng);
        var numWorkers = options.workers;
        var workLoad = options.workLoad || 100;
        var range = workLoad * 30 / 8;
        var workerScript = options.workerScript || "forge/prime.worker.js";
        if (numWorkers === -1) {
          return forge6.util.estimateCores(function(err, cores) {
            if (err) {
              cores = 2;
            }
            numWorkers = cores - 1;
            generate();
          });
        }
        generate();
        function generate() {
          numWorkers = Math.max(1, numWorkers);
          var workers = [];
          for (var i = 0; i < numWorkers; ++i) {
            workers[i] = new Worker(workerScript);
          }
          var running = numWorkers;
          for (var i = 0; i < numWorkers; ++i) {
            workers[i].addEventListener("message", workerMessage);
          }
          var found = false;
          function workerMessage(e) {
            if (found) {
              return;
            }
            --running;
            var data = e.data;
            if (data.found) {
              for (var i2 = 0; i2 < workers.length; ++i2) {
                workers[i2].terminate();
              }
              found = true;
              return callback(null, new BigInteger(data.prime, 16));
            }
            if (num.bitLength() > bits2) {
              num = generateRandom(bits2, rng);
            }
            var hex = num.toString(16);
            e.target.postMessage({
              hex,
              workLoad
            });
            num.dAddOffset(range, 0);
          }
        }
      }
      function generateRandom(bits2, rng) {
        var num = new BigInteger(bits2, rng);
        var bits1 = bits2 - 1;
        if (!num.testBit(bits1)) {
          num.bitwiseTo(BigInteger.ONE.shiftLeft(bits1), op_or, num);
        }
        num.dAddOffset(31 - num.mod(THIRTY).byteValue(), 0);
        return num;
      }
      function getMillerRabinTests(bits2) {
        if (bits2 <= 100)
          return 27;
        if (bits2 <= 150)
          return 18;
        if (bits2 <= 200)
          return 15;
        if (bits2 <= 250)
          return 12;
        if (bits2 <= 300)
          return 9;
        if (bits2 <= 350)
          return 8;
        if (bits2 <= 400)
          return 7;
        if (bits2 <= 500)
          return 6;
        if (bits2 <= 600)
          return 5;
        if (bits2 <= 800)
          return 4;
        if (bits2 <= 1250)
          return 3;
        return 2;
      }
    })();
  }
});

// node_modules/node-forge/lib/rsa.js
var require_rsa = __commonJS({
  "node_modules/node-forge/lib/rsa.js"(exports, module) {
    var forge6 = require_forge();
    require_asn1();
    require_jsbn();
    require_oids();
    require_pkcs1();
    require_prime();
    require_random();
    require_util();
    if (typeof BigInteger === "undefined") {
      BigInteger = forge6.jsbn.BigInteger;
    }
    var BigInteger;
    var _crypto = forge6.util.isNodejs ? require_crypto() : null;
    var asn1 = forge6.asn1;
    var util = forge6.util;
    forge6.pki = forge6.pki || {};
    module.exports = forge6.pki.rsa = forge6.rsa = forge6.rsa || {};
    var pki = forge6.pki;
    var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
    var privateKeyValidator = {
      // PrivateKeyInfo
      name: "PrivateKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        // Version (INTEGER)
        name: "PrivateKeyInfo.version",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        // privateKeyAlgorithm
        name: "PrivateKeyInfo.privateKeyAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "privateKeyOid"
        }]
      }, {
        // PrivateKey
        name: "PrivateKeyInfo",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "privateKey"
      }]
    };
    var rsaPrivateKeyValidator = {
      // RSAPrivateKey
      name: "RSAPrivateKey",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        // Version (INTEGER)
        name: "RSAPrivateKey.version",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        // modulus (n)
        name: "RSAPrivateKey.modulus",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyModulus"
      }, {
        // publicExponent (e)
        name: "RSAPrivateKey.publicExponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPublicExponent"
      }, {
        // privateExponent (d)
        name: "RSAPrivateKey.privateExponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrivateExponent"
      }, {
        // prime1 (p)
        name: "RSAPrivateKey.prime1",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime1"
      }, {
        // prime2 (q)
        name: "RSAPrivateKey.prime2",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime2"
      }, {
        // exponent1 (d mod (p-1))
        name: "RSAPrivateKey.exponent1",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent1"
      }, {
        // exponent2 (d mod (q-1))
        name: "RSAPrivateKey.exponent2",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent2"
      }, {
        // coefficient ((inverse of q) mod p)
        name: "RSAPrivateKey.coefficient",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyCoefficient"
      }]
    };
    var rsaPublicKeyValidator = {
      // RSAPublicKey
      name: "RSAPublicKey",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        // modulus (n)
        name: "RSAPublicKey.modulus",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyModulus"
      }, {
        // publicExponent (e)
        name: "RSAPublicKey.exponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyExponent"
      }]
    };
    var publicKeyValidator = forge6.pki.rsa.publicKeyValidator = {
      name: "SubjectPublicKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "subjectPublicKeyInfo",
      value: [{
        name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "publicKeyOid"
        }]
      }, {
        // subjectPublicKey
        name: "SubjectPublicKeyInfo.subjectPublicKey",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.BITSTRING,
        constructed: false,
        value: [{
          // RSAPublicKey
          name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          optional: true,
          captureAsn1: "rsaPublicKey"
        }]
      }]
    };
    var digestInfoValidator = {
      name: "DigestInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "DigestInfo.DigestAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "algorithmIdentifier"
        }, {
          // NULL paramters
          name: "DigestInfo.DigestAlgorithm.parameters",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.NULL,
          // captured only to check existence for md2 and md5
          capture: "parameters",
          optional: true,
          constructed: false
        }]
      }, {
        // digest
        name: "DigestInfo.digest",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "digest"
      }]
    };
    var emsaPkcs1v15encode = function(md) {
      var oid;
      if (md.algorithm in pki.oids) {
        oid = pki.oids[md.algorithm];
      } else {
        var error = new Error("Unknown message digest algorithm.");
        error.algorithm = md.algorithm;
        throw error;
      }
      var oidBytes = asn1.oidToDer(oid).getBytes();
      var digestInfo = asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.SEQUENCE,
        true,
        []
      );
      var digestAlgorithm = asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.SEQUENCE,
        true,
        []
      );
      digestAlgorithm.value.push(asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.OID,
        false,
        oidBytes
      ));
      digestAlgorithm.value.push(asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.NULL,
        false,
        ""
      ));
      var digest7 = asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.OCTETSTRING,
        false,
        md.digest().getBytes()
      );
      digestInfo.value.push(digestAlgorithm);
      digestInfo.value.push(digest7);
      return asn1.toDer(digestInfo).getBytes();
    };
    var _modPow = function(x, key, pub) {
      if (pub) {
        return x.modPow(key.e, key.n);
      }
      if (!key.p || !key.q) {
        return x.modPow(key.d, key.n);
      }
      if (!key.dP) {
        key.dP = key.d.mod(key.p.subtract(BigInteger.ONE));
      }
      if (!key.dQ) {
        key.dQ = key.d.mod(key.q.subtract(BigInteger.ONE));
      }
      if (!key.qInv) {
        key.qInv = key.q.modInverse(key.p);
      }
      var r;
      do {
        r = new BigInteger(
          forge6.util.bytesToHex(forge6.random.getBytes(key.n.bitLength() / 8)),
          16
        );
      } while (r.compareTo(key.n) >= 0 || !r.gcd(key.n).equals(BigInteger.ONE));
      x = x.multiply(r.modPow(key.e, key.n)).mod(key.n);
      var xp = x.mod(key.p).modPow(key.dP, key.p);
      var xq = x.mod(key.q).modPow(key.dQ, key.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(key.p);
      }
      var y = xp.subtract(xq).multiply(key.qInv).mod(key.p).multiply(key.q).add(xq);
      y = y.multiply(r.modInverse(key.n)).mod(key.n);
      return y;
    };
    pki.rsa.encrypt = function(m, key, bt) {
      var pub = bt;
      var eb;
      var k = Math.ceil(key.n.bitLength() / 8);
      if (bt !== false && bt !== true) {
        pub = bt === 2;
        eb = _encodePkcs1_v1_5(m, key, bt);
      } else {
        eb = forge6.util.createBuffer();
        eb.putBytes(m);
      }
      var x = new BigInteger(eb.toHex(), 16);
      var y = _modPow(x, key, pub);
      var yhex = y.toString(16);
      var ed = forge6.util.createBuffer();
      var zeros = k - Math.ceil(yhex.length / 2);
      while (zeros > 0) {
        ed.putByte(0);
        --zeros;
      }
      ed.putBytes(forge6.util.hexToBytes(yhex));
      return ed.getBytes();
    };
    pki.rsa.decrypt = function(ed, key, pub, ml) {
      var k = Math.ceil(key.n.bitLength() / 8);
      if (ed.length !== k) {
        var error = new Error("Encrypted message length is invalid.");
        error.length = ed.length;
        error.expected = k;
        throw error;
      }
      var y = new BigInteger(forge6.util.createBuffer(ed).toHex(), 16);
      if (y.compareTo(key.n) >= 0) {
        throw new Error("Encrypted message is invalid.");
      }
      var x = _modPow(y, key, pub);
      var xhex = x.toString(16);
      var eb = forge6.util.createBuffer();
      var zeros = k - Math.ceil(xhex.length / 2);
      while (zeros > 0) {
        eb.putByte(0);
        --zeros;
      }
      eb.putBytes(forge6.util.hexToBytes(xhex));
      if (ml !== false) {
        return _decodePkcs1_v1_5(eb.getBytes(), key, pub);
      }
      return eb.getBytes();
    };
    pki.rsa.createKeyPairGenerationState = function(bits2, e, options) {
      if (typeof bits2 === "string") {
        bits2 = parseInt(bits2, 10);
      }
      bits2 = bits2 || 2048;
      options = options || {};
      var prng = options.prng || forge6.random;
      var rng = {
        // x is an array to fill with bytes
        nextBytes: function(x) {
          var b = prng.getBytesSync(x.length);
          for (var i = 0; i < x.length; ++i) {
            x[i] = b.charCodeAt(i);
          }
        }
      };
      var algorithm = options.algorithm || "PRIMEINC";
      var rval;
      if (algorithm === "PRIMEINC") {
        rval = {
          algorithm,
          state: 0,
          bits: bits2,
          rng,
          eInt: e || 65537,
          e: new BigInteger(null),
          p: null,
          q: null,
          qBits: bits2 >> 1,
          pBits: bits2 - (bits2 >> 1),
          pqState: 0,
          num: null,
          keys: null
        };
        rval.e.fromInt(rval.eInt);
      } else {
        throw new Error("Invalid key generation algorithm: " + algorithm);
      }
      return rval;
    };
    pki.rsa.stepKeyPairGenerationState = function(state, n) {
      if (!("algorithm" in state)) {
        state.algorithm = "PRIMEINC";
      }
      var THIRTY = new BigInteger(null);
      THIRTY.fromInt(30);
      var deltaIdx = 0;
      var op_or = function(x, y) {
        return x | y;
      };
      var t1 = +/* @__PURE__ */ new Date();
      var t2;
      var total = 0;
      while (state.keys === null && (n <= 0 || total < n)) {
        if (state.state === 0) {
          var bits2 = state.p === null ? state.pBits : state.qBits;
          var bits1 = bits2 - 1;
          if (state.pqState === 0) {
            state.num = new BigInteger(bits2, state.rng);
            if (!state.num.testBit(bits1)) {
              state.num.bitwiseTo(
                BigInteger.ONE.shiftLeft(bits1),
                op_or,
                state.num
              );
            }
            state.num.dAddOffset(31 - state.num.mod(THIRTY).byteValue(), 0);
            deltaIdx = 0;
            ++state.pqState;
          } else if (state.pqState === 1) {
            if (state.num.bitLength() > bits2) {
              state.pqState = 0;
            } else if (state.num.isProbablePrime(
              _getMillerRabinTests(state.num.bitLength())
            )) {
              ++state.pqState;
            } else {
              state.num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
            }
          } else if (state.pqState === 2) {
            state.pqState = state.num.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) === 0 ? 3 : 0;
          } else if (state.pqState === 3) {
            state.pqState = 0;
            if (state.p === null) {
              state.p = state.num;
            } else {
              state.q = state.num;
            }
            if (state.p !== null && state.q !== null) {
              ++state.state;
            }
            state.num = null;
          }
        } else if (state.state === 1) {
          if (state.p.compareTo(state.q) < 0) {
            state.num = state.p;
            state.p = state.q;
            state.q = state.num;
          }
          ++state.state;
        } else if (state.state === 2) {
          state.p1 = state.p.subtract(BigInteger.ONE);
          state.q1 = state.q.subtract(BigInteger.ONE);
          state.phi = state.p1.multiply(state.q1);
          ++state.state;
        } else if (state.state === 3) {
          if (state.phi.gcd(state.e).compareTo(BigInteger.ONE) === 0) {
            ++state.state;
          } else {
            state.p = null;
            state.q = null;
            state.state = 0;
          }
        } else if (state.state === 4) {
          state.n = state.p.multiply(state.q);
          if (state.n.bitLength() === state.bits) {
            ++state.state;
          } else {
            state.q = null;
            state.state = 0;
          }
        } else if (state.state === 5) {
          var d = state.e.modInverse(state.phi);
          state.keys = {
            privateKey: pki.rsa.setPrivateKey(
              state.n,
              state.e,
              d,
              state.p,
              state.q,
              d.mod(state.p1),
              d.mod(state.q1),
              state.q.modInverse(state.p)
            ),
            publicKey: pki.rsa.setPublicKey(state.n, state.e)
          };
        }
        t2 = +/* @__PURE__ */ new Date();
        total += t2 - t1;
        t1 = t2;
      }
      return state.keys !== null;
    };
    pki.rsa.generateKeyPair = function(bits2, e, options, callback) {
      if (arguments.length === 1) {
        if (typeof bits2 === "object") {
          options = bits2;
          bits2 = void 0;
        } else if (typeof bits2 === "function") {
          callback = bits2;
          bits2 = void 0;
        }
      } else if (arguments.length === 2) {
        if (typeof bits2 === "number") {
          if (typeof e === "function") {
            callback = e;
            e = void 0;
          } else if (typeof e !== "number") {
            options = e;
            e = void 0;
          }
        } else {
          options = bits2;
          callback = e;
          bits2 = void 0;
          e = void 0;
        }
      } else if (arguments.length === 3) {
        if (typeof e === "number") {
          if (typeof options === "function") {
            callback = options;
            options = void 0;
          }
        } else {
          callback = options;
          options = e;
          e = void 0;
        }
      }
      options = options || {};
      if (bits2 === void 0) {
        bits2 = options.bits || 2048;
      }
      if (e === void 0) {
        e = options.e || 65537;
      }
      if (!forge6.options.usePureJavaScript && !options.prng && bits2 >= 256 && bits2 <= 16384 && (e === 65537 || e === 3)) {
        if (callback) {
          if (_detectNodeCrypto("generateKeyPair")) {
            return _crypto.generateKeyPair("rsa", {
              modulusLength: bits2,
              publicExponent: e,
              publicKeyEncoding: {
                type: "spki",
                format: "pem"
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
              }
            }, function(err, pub, priv) {
              if (err) {
                return callback(err);
              }
              callback(null, {
                privateKey: pki.privateKeyFromPem(priv),
                publicKey: pki.publicKeyFromPem(pub)
              });
            });
          }
          if (_detectSubtleCrypto("generateKey") && _detectSubtleCrypto("exportKey")) {
            return util.globalScope.crypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bits2,
              publicExponent: _intToUint8Array(e),
              hash: { name: "SHA-256" }
            }, true, ["sign", "verify"]).then(function(pair2) {
              return util.globalScope.crypto.subtle.exportKey(
                "pkcs8",
                pair2.privateKey
              );
            }).then(void 0, function(err) {
              callback(err);
            }).then(function(pkcs8) {
              if (pkcs8) {
                var privateKey = pki.privateKeyFromAsn1(
                  asn1.fromDer(forge6.util.createBuffer(pkcs8))
                );
                callback(null, {
                  privateKey,
                  publicKey: pki.setRsaPublicKey(privateKey.n, privateKey.e)
                });
              }
            });
          }
          if (_detectSubtleMsCrypto("generateKey") && _detectSubtleMsCrypto("exportKey")) {
            var genOp = util.globalScope.msCrypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bits2,
              publicExponent: _intToUint8Array(e),
              hash: { name: "SHA-256" }
            }, true, ["sign", "verify"]);
            genOp.oncomplete = function(e2) {
              var pair2 = e2.target.result;
              var exportOp = util.globalScope.msCrypto.subtle.exportKey(
                "pkcs8",
                pair2.privateKey
              );
              exportOp.oncomplete = function(e3) {
                var pkcs8 = e3.target.result;
                var privateKey = pki.privateKeyFromAsn1(
                  asn1.fromDer(forge6.util.createBuffer(pkcs8))
                );
                callback(null, {
                  privateKey,
                  publicKey: pki.setRsaPublicKey(privateKey.n, privateKey.e)
                });
              };
              exportOp.onerror = function(err) {
                callback(err);
              };
            };
            genOp.onerror = function(err) {
              callback(err);
            };
            return;
          }
        } else {
          if (_detectNodeCrypto("generateKeyPairSync")) {
            var keypair = _crypto.generateKeyPairSync("rsa", {
              modulusLength: bits2,
              publicExponent: e,
              publicKeyEncoding: {
                type: "spki",
                format: "pem"
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
              }
            });
            return {
              privateKey: pki.privateKeyFromPem(keypair.privateKey),
              publicKey: pki.publicKeyFromPem(keypair.publicKey)
            };
          }
        }
      }
      var state = pki.rsa.createKeyPairGenerationState(bits2, e, options);
      if (!callback) {
        pki.rsa.stepKeyPairGenerationState(state, 0);
        return state.keys;
      }
      _generateKeyPair(state, options, callback);
    };
    pki.setRsaPublicKey = pki.rsa.setPublicKey = function(n, e) {
      var key = {
        n,
        e
      };
      key.encrypt = function(data, scheme, schemeOptions) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSAES-PKCS1-V1_5";
        }
        if (scheme === "RSAES-PKCS1-V1_5") {
          scheme = {
            encode: function(m, key2, pub) {
              return _encodePkcs1_v1_5(m, key2, 2).getBytes();
            }
          };
        } else if (scheme === "RSA-OAEP" || scheme === "RSAES-OAEP") {
          scheme = {
            encode: function(m, key2) {
              return forge6.pkcs1.encode_rsa_oaep(key2, m, schemeOptions);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(scheme) !== -1) {
          scheme = { encode: function(e3) {
            return e3;
          } };
        } else if (typeof scheme === "string") {
          throw new Error('Unsupported encryption scheme: "' + scheme + '".');
        }
        var e2 = scheme.encode(data, key, true);
        return pki.rsa.encrypt(e2, key, true);
      };
      key.verify = function(digest7, signature, scheme, options) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSASSA-PKCS1-V1_5";
        }
        if (options === void 0) {
          options = {
            _parseAllDigestBytes: true
          };
        }
        if (!("_parseAllDigestBytes" in options)) {
          options._parseAllDigestBytes = true;
        }
        if (scheme === "RSASSA-PKCS1-V1_5") {
          scheme = {
            verify: function(digest8, d2) {
              d2 = _decodePkcs1_v1_5(d2, key, true);
              var obj = asn1.fromDer(d2, {
                parseAllBytes: options._parseAllDigestBytes
              });
              var capture = {};
              var errors = [];
              if (!asn1.validate(obj, digestInfoValidator, capture, errors)) {
                var error = new Error(
                  "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value."
                );
                error.errors = errors;
                throw error;
              }
              var oid = asn1.derToOid(capture.algorithmIdentifier);
              if (!(oid === forge6.oids.md2 || oid === forge6.oids.md5 || oid === forge6.oids.sha1 || oid === forge6.oids.sha224 || oid === forge6.oids.sha256 || oid === forge6.oids.sha384 || oid === forge6.oids.sha512 || oid === forge6.oids["sha512-224"] || oid === forge6.oids["sha512-256"])) {
                var error = new Error(
                  "Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier."
                );
                error.oid = oid;
                throw error;
              }
              if (oid === forge6.oids.md2 || oid === forge6.oids.md5) {
                if (!("parameters" in capture)) {
                  throw new Error(
                    "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifer NULL parameters."
                  );
                }
              }
              return digest8 === capture.digest;
            }
          };
        } else if (scheme === "NONE" || scheme === "NULL" || scheme === null) {
          scheme = {
            verify: function(digest8, d2) {
              d2 = _decodePkcs1_v1_5(d2, key, true);
              return digest8 === d2;
            }
          };
        }
        var d = pki.rsa.decrypt(signature, key, true, false);
        return scheme.verify(digest7, d, key.n.bitLength());
      };
      return key;
    };
    pki.setRsaPrivateKey = pki.rsa.setPrivateKey = function(n, e, d, p, q, dP, dQ, qInv) {
      var key = {
        n,
        e,
        d,
        p,
        q,
        dP,
        dQ,
        qInv
      };
      key.decrypt = function(data, scheme, schemeOptions) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSAES-PKCS1-V1_5";
        }
        var d2 = pki.rsa.decrypt(data, key, false, false);
        if (scheme === "RSAES-PKCS1-V1_5") {
          scheme = { decode: _decodePkcs1_v1_5 };
        } else if (scheme === "RSA-OAEP" || scheme === "RSAES-OAEP") {
          scheme = {
            decode: function(d3, key2) {
              return forge6.pkcs1.decode_rsa_oaep(key2, d3, schemeOptions);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(scheme) !== -1) {
          scheme = { decode: function(d3) {
            return d3;
          } };
        } else {
          throw new Error('Unsupported encryption scheme: "' + scheme + '".');
        }
        return scheme.decode(d2, key, false);
      };
      key.sign = function(md, scheme) {
        var bt = false;
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        }
        if (scheme === void 0 || scheme === "RSASSA-PKCS1-V1_5") {
          scheme = { encode: emsaPkcs1v15encode };
          bt = 1;
        } else if (scheme === "NONE" || scheme === "NULL" || scheme === null) {
          scheme = { encode: function() {
            return md;
          } };
          bt = 1;
        }
        var d2 = scheme.encode(md, key.n.bitLength());
        return pki.rsa.encrypt(d2, key, bt);
      };
      return key;
    };
    pki.wrapRsaPrivateKey = function(rsaKey) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // version (0)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          asn1.integerToDer(0).getBytes()
        ),
        // privateKeyAlgorithm
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(
            asn1.Class.UNIVERSAL,
            asn1.Type.OID,
            false,
            asn1.oidToDer(pki.oids.rsaEncryption).getBytes()
          ),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
        ]),
        // PrivateKey
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.OCTETSTRING,
          false,
          asn1.toDer(rsaKey).getBytes()
        )
      ]);
    };
    pki.privateKeyFromAsn1 = function(obj) {
      var capture = {};
      var errors = [];
      if (asn1.validate(obj, privateKeyValidator, capture, errors)) {
        obj = asn1.fromDer(forge6.util.createBuffer(capture.privateKey));
      }
      capture = {};
      errors = [];
      if (!asn1.validate(obj, rsaPrivateKeyValidator, capture, errors)) {
        var error = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
        error.errors = errors;
        throw error;
      }
      var n, e, d, p, q, dP, dQ, qInv;
      n = forge6.util.createBuffer(capture.privateKeyModulus).toHex();
      e = forge6.util.createBuffer(capture.privateKeyPublicExponent).toHex();
      d = forge6.util.createBuffer(capture.privateKeyPrivateExponent).toHex();
      p = forge6.util.createBuffer(capture.privateKeyPrime1).toHex();
      q = forge6.util.createBuffer(capture.privateKeyPrime2).toHex();
      dP = forge6.util.createBuffer(capture.privateKeyExponent1).toHex();
      dQ = forge6.util.createBuffer(capture.privateKeyExponent2).toHex();
      qInv = forge6.util.createBuffer(capture.privateKeyCoefficient).toHex();
      return pki.setRsaPrivateKey(
        new BigInteger(n, 16),
        new BigInteger(e, 16),
        new BigInteger(d, 16),
        new BigInteger(p, 16),
        new BigInteger(q, 16),
        new BigInteger(dP, 16),
        new BigInteger(dQ, 16),
        new BigInteger(qInv, 16)
      );
    };
    pki.privateKeyToAsn1 = pki.privateKeyToRSAPrivateKey = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // version (0 = only 2 primes, 1 multiple primes)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          asn1.integerToDer(0).getBytes()
        ),
        // modulus (n)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.n)
        ),
        // publicExponent (e)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.e)
        ),
        // privateExponent (d)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.d)
        ),
        // privateKeyPrime1 (p)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.p)
        ),
        // privateKeyPrime2 (q)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.q)
        ),
        // privateKeyExponent1 (dP)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.dP)
        ),
        // privateKeyExponent2 (dQ)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.dQ)
        ),
        // coefficient (qInv)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.qInv)
        )
      ]);
    };
    pki.publicKeyFromAsn1 = function(obj) {
      var capture = {};
      var errors = [];
      if (asn1.validate(obj, publicKeyValidator, capture, errors)) {
        var oid = asn1.derToOid(capture.publicKeyOid);
        if (oid !== pki.oids.rsaEncryption) {
          var error = new Error("Cannot read public key. Unknown OID.");
          error.oid = oid;
          throw error;
        }
        obj = capture.rsaPublicKey;
      }
      errors = [];
      if (!asn1.validate(obj, rsaPublicKeyValidator, capture, errors)) {
        var error = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
        error.errors = errors;
        throw error;
      }
      var n = forge6.util.createBuffer(capture.publicKeyModulus).toHex();
      var e = forge6.util.createBuffer(capture.publicKeyExponent).toHex();
      return pki.setRsaPublicKey(
        new BigInteger(n, 16),
        new BigInteger(e, 16)
      );
    };
    pki.publicKeyToAsn1 = pki.publicKeyToSubjectPublicKeyInfo = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // AlgorithmIdentifier
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          // algorithm
          asn1.create(
            asn1.Class.UNIVERSAL,
            asn1.Type.OID,
            false,
            asn1.oidToDer(pki.oids.rsaEncryption).getBytes()
          ),
          // parameters (null)
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
        ]),
        // subjectPublicKey
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.BITSTRING, false, [
          pki.publicKeyToRSAPublicKey(key)
        ])
      ]);
    };
    pki.publicKeyToRSAPublicKey = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // modulus (n)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.n)
        ),
        // publicExponent (e)
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.e)
        )
      ]);
    };
    function _encodePkcs1_v1_5(m, key, bt) {
      var eb = forge6.util.createBuffer();
      var k = Math.ceil(key.n.bitLength() / 8);
      if (m.length > k - 11) {
        var error = new Error("Message is too long for PKCS#1 v1.5 padding.");
        error.length = m.length;
        error.max = k - 11;
        throw error;
      }
      eb.putByte(0);
      eb.putByte(bt);
      var padNum = k - 3 - m.length;
      var padByte;
      if (bt === 0 || bt === 1) {
        padByte = bt === 0 ? 0 : 255;
        for (var i = 0; i < padNum; ++i) {
          eb.putByte(padByte);
        }
      } else {
        while (padNum > 0) {
          var numZeros = 0;
          var padBytes = forge6.random.getBytes(padNum);
          for (var i = 0; i < padNum; ++i) {
            padByte = padBytes.charCodeAt(i);
            if (padByte === 0) {
              ++numZeros;
            } else {
              eb.putByte(padByte);
            }
          }
          padNum = numZeros;
        }
      }
      eb.putByte(0);
      eb.putBytes(m);
      return eb;
    }
    function _decodePkcs1_v1_5(em, key, pub, ml) {
      var k = Math.ceil(key.n.bitLength() / 8);
      var eb = forge6.util.createBuffer(em);
      var first = eb.getByte();
      var bt = eb.getByte();
      if (first !== 0 || pub && bt !== 0 && bt !== 1 || !pub && bt != 2 || pub && bt === 0 && typeof ml === "undefined") {
        throw new Error("Encryption block is invalid.");
      }
      var padNum = 0;
      if (bt === 0) {
        padNum = k - 3 - ml;
        for (var i = 0; i < padNum; ++i) {
          if (eb.getByte() !== 0) {
            throw new Error("Encryption block is invalid.");
          }
        }
      } else if (bt === 1) {
        padNum = 0;
        while (eb.length() > 1) {
          if (eb.getByte() !== 255) {
            --eb.read;
            break;
          }
          ++padNum;
        }
      } else if (bt === 2) {
        padNum = 0;
        while (eb.length() > 1) {
          if (eb.getByte() === 0) {
            --eb.read;
            break;
          }
          ++padNum;
        }
      }
      var zero2 = eb.getByte();
      if (zero2 !== 0 || padNum !== k - 3 - eb.length()) {
        throw new Error("Encryption block is invalid.");
      }
      return eb.getBytes();
    }
    function _generateKeyPair(state, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = options || {};
      var opts = {
        algorithm: {
          name: options.algorithm || "PRIMEINC",
          options: {
            workers: options.workers || 2,
            workLoad: options.workLoad || 100,
            workerScript: options.workerScript
          }
        }
      };
      if ("prng" in options) {
        opts.prng = options.prng;
      }
      generate();
      function generate() {
        getPrime(state.pBits, function(err, num) {
          if (err) {
            return callback(err);
          }
          state.p = num;
          if (state.q !== null) {
            return finish(err, state.q);
          }
          getPrime(state.qBits, finish);
        });
      }
      function getPrime(bits2, callback2) {
        forge6.prime.generateProbablePrime(bits2, opts, callback2);
      }
      function finish(err, num) {
        if (err) {
          return callback(err);
        }
        state.q = num;
        if (state.p.compareTo(state.q) < 0) {
          var tmp = state.p;
          state.p = state.q;
          state.q = tmp;
        }
        if (state.p.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.p = null;
          generate();
          return;
        }
        if (state.q.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.q = null;
          getPrime(state.qBits, finish);
          return;
        }
        state.p1 = state.p.subtract(BigInteger.ONE);
        state.q1 = state.q.subtract(BigInteger.ONE);
        state.phi = state.p1.multiply(state.q1);
        if (state.phi.gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.p = state.q = null;
          generate();
          return;
        }
        state.n = state.p.multiply(state.q);
        if (state.n.bitLength() !== state.bits) {
          state.q = null;
          getPrime(state.qBits, finish);
          return;
        }
        var d = state.e.modInverse(state.phi);
        state.keys = {
          privateKey: pki.rsa.setPrivateKey(
            state.n,
            state.e,
            d,
            state.p,
            state.q,
            d.mod(state.p1),
            d.mod(state.q1),
            state.q.modInverse(state.p)
          ),
          publicKey: pki.rsa.setPublicKey(state.n, state.e)
        };
        callback(null, state.keys);
      }
    }
    function _bnToBytes(b) {
      var hex = b.toString(16);
      if (hex[0] >= "8") {
        hex = "00" + hex;
      }
      var bytes3 = forge6.util.hexToBytes(hex);
      if (bytes3.length > 1 && // leading 0x00 for positive integer
      (bytes3.charCodeAt(0) === 0 && (bytes3.charCodeAt(1) & 128) === 0 || // leading 0xFF for negative integer
      bytes3.charCodeAt(0) === 255 && (bytes3.charCodeAt(1) & 128) === 128)) {
        return bytes3.substr(1);
      }
      return bytes3;
    }
    function _getMillerRabinTests(bits2) {
      if (bits2 <= 100)
        return 27;
      if (bits2 <= 150)
        return 18;
      if (bits2 <= 200)
        return 15;
      if (bits2 <= 250)
        return 12;
      if (bits2 <= 300)
        return 9;
      if (bits2 <= 350)
        return 8;
      if (bits2 <= 400)
        return 7;
      if (bits2 <= 500)
        return 6;
      if (bits2 <= 600)
        return 5;
      if (bits2 <= 800)
        return 4;
      if (bits2 <= 1250)
        return 3;
      return 2;
    }
    function _detectNodeCrypto(fn) {
      return forge6.util.isNodejs && typeof _crypto[fn] === "function";
    }
    function _detectSubtleCrypto(fn) {
      return typeof util.globalScope !== "undefined" && typeof util.globalScope.crypto === "object" && typeof util.globalScope.crypto.subtle === "object" && typeof util.globalScope.crypto.subtle[fn] === "function";
    }
    function _detectSubtleMsCrypto(fn) {
      return typeof util.globalScope !== "undefined" && typeof util.globalScope.msCrypto === "object" && typeof util.globalScope.msCrypto.subtle === "object" && typeof util.globalScope.msCrypto.subtle[fn] === "function";
    }
    function _intToUint8Array(x) {
      var bytes3 = forge6.util.hexToBytes(x.toString(16));
      var buffer = new Uint8Array(bytes3.length);
      for (var i = 0; i < bytes3.length; ++i) {
        buffer[i] = bytes3.charCodeAt(i);
      }
      return buffer;
    }
  }
});

// node_modules/node-forge/lib/pbe.js
var require_pbe = __commonJS({
  "node_modules/node-forge/lib/pbe.js"(exports, module) {
    var forge6 = require_forge();
    require_aes();
    require_asn1();
    require_des();
    require_md();
    require_oids();
    require_pbkdf2();
    require_pem();
    require_random();
    require_rc2();
    require_rsa();
    require_util();
    if (typeof BigInteger === "undefined") {
      BigInteger = forge6.jsbn.BigInteger;
    }
    var BigInteger;
    var asn1 = forge6.asn1;
    var pki = forge6.pki = forge6.pki || {};
    module.exports = pki.pbe = forge6.pbe = forge6.pbe || {};
    var oids = pki.oids;
    var encryptedPrivateKeyValidator = {
      name: "EncryptedPrivateKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "encryptionOid"
        }, {
          name: "AlgorithmIdentifier.parameters",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "encryptionParams"
        }]
      }, {
        // encryptedData
        name: "EncryptedPrivateKeyInfo.encryptedData",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "encryptedData"
      }]
    };
    var PBES2AlgorithmsValidator = {
      name: "PBES2Algorithms",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PBES2Algorithms.keyDerivationFunc",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.keyDerivationFunc.oid",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "kdfOid"
        }, {
          name: "PBES2Algorithms.params",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "PBES2Algorithms.params.salt",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.OCTETSTRING,
            constructed: false,
            capture: "kdfSalt"
          }, {
            name: "PBES2Algorithms.params.iterationCount",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.INTEGER,
            constructed: false,
            capture: "kdfIterationCount"
          }, {
            name: "PBES2Algorithms.params.keyLength",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.INTEGER,
            constructed: false,
            optional: true,
            capture: "keyLength"
          }, {
            // prf
            name: "PBES2Algorithms.params.prf",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.SEQUENCE,
            constructed: true,
            optional: true,
            value: [{
              name: "PBES2Algorithms.params.prf.algorithm",
              tagClass: asn1.Class.UNIVERSAL,
              type: asn1.Type.OID,
              constructed: false,
              capture: "prfOid"
            }]
          }]
        }]
      }, {
        name: "PBES2Algorithms.encryptionScheme",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.encryptionScheme.oid",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "encOid"
        }, {
          name: "PBES2Algorithms.encryptionScheme.iv",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OCTETSTRING,
          constructed: false,
          capture: "encIv"
        }]
      }]
    };
    var pkcs12PbeParamsValidator = {
      name: "pkcs-12PbeParams",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "pkcs-12PbeParams.salt",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "salt"
      }, {
        name: "pkcs-12PbeParams.iterations",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "iterations"
      }]
    };
    pki.encryptPrivateKeyInfo = function(obj, password, options) {
      options = options || {};
      options.saltSize = options.saltSize || 8;
      options.count = options.count || 2048;
      options.algorithm = options.algorithm || "aes128";
      options.prfAlgorithm = options.prfAlgorithm || "sha1";
      var salt = forge6.random.getBytesSync(options.saltSize);
      var count = options.count;
      var countBytes = asn1.integerToDer(count);
      var dkLen;
      var encryptionAlgorithm;
      var encryptedData;
      if (options.algorithm.indexOf("aes") === 0 || options.algorithm === "des") {
        var ivLen, encOid, cipherFn;
        switch (options.algorithm) {
          case "aes128":
            dkLen = 16;
            ivLen = 16;
            encOid = oids["aes128-CBC"];
            cipherFn = forge6.aes.createEncryptionCipher;
            break;
          case "aes192":
            dkLen = 24;
            ivLen = 16;
            encOid = oids["aes192-CBC"];
            cipherFn = forge6.aes.createEncryptionCipher;
            break;
          case "aes256":
            dkLen = 32;
            ivLen = 16;
            encOid = oids["aes256-CBC"];
            cipherFn = forge6.aes.createEncryptionCipher;
            break;
          case "des":
            dkLen = 8;
            ivLen = 8;
            encOid = oids["desCBC"];
            cipherFn = forge6.des.createEncryptionCipher;
            break;
          default:
            var error = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
            error.algorithm = options.algorithm;
            throw error;
        }
        var prfAlgorithm = "hmacWith" + options.prfAlgorithm.toUpperCase();
        var md = prfAlgorithmToMessageDigest(prfAlgorithm);
        var dk = forge6.pkcs5.pbkdf2(password, salt, count, dkLen, md);
        var iv = forge6.random.getBytesSync(ivLen);
        var cipher = cipherFn(dk);
        cipher.start(iv);
        cipher.update(asn1.toDer(obj));
        cipher.finish();
        encryptedData = cipher.output.getBytes();
        var params = createPbkdf2Params(salt, countBytes, dkLen, prfAlgorithm);
        encryptionAlgorithm = asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.SEQUENCE,
          true,
          [
            asn1.create(
              asn1.Class.UNIVERSAL,
              asn1.Type.OID,
              false,
              asn1.oidToDer(oids["pkcs5PBES2"]).getBytes()
            ),
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
              // keyDerivationFunc
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
                asn1.create(
                  asn1.Class.UNIVERSAL,
                  asn1.Type.OID,
                  false,
                  asn1.oidToDer(oids["pkcs5PBKDF2"]).getBytes()
                ),
                // PBKDF2-params
                params
              ]),
              // encryptionScheme
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
                asn1.create(
                  asn1.Class.UNIVERSAL,
                  asn1.Type.OID,
                  false,
                  asn1.oidToDer(encOid).getBytes()
                ),
                // iv
                asn1.create(
                  asn1.Class.UNIVERSAL,
                  asn1.Type.OCTETSTRING,
                  false,
                  iv
                )
              ])
            ])
          ]
        );
      } else if (options.algorithm === "3des") {
        dkLen = 24;
        var saltBytes = new forge6.util.ByteBuffer(salt);
        var dk = pki.pbe.generatePkcs12Key(password, saltBytes, 1, count, dkLen);
        var iv = pki.pbe.generatePkcs12Key(password, saltBytes, 2, count, dkLen);
        var cipher = forge6.des.createEncryptionCipher(dk);
        cipher.start(iv);
        cipher.update(asn1.toDer(obj));
        cipher.finish();
        encryptedData = cipher.output.getBytes();
        encryptionAlgorithm = asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.SEQUENCE,
          true,
          [
            asn1.create(
              asn1.Class.UNIVERSAL,
              asn1.Type.OID,
              false,
              asn1.oidToDer(oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()
            ),
            // pkcs-12PbeParams
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
              // salt
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, salt),
              // iteration count
              asn1.create(
                asn1.Class.UNIVERSAL,
                asn1.Type.INTEGER,
                false,
                countBytes.getBytes()
              )
            ])
          ]
        );
      } else {
        var error = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
        error.algorithm = options.algorithm;
        throw error;
      }
      var rval = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // encryptionAlgorithm
        encryptionAlgorithm,
        // encryptedData
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.OCTETSTRING,
          false,
          encryptedData
        )
      ]);
      return rval;
    };
    pki.decryptPrivateKeyInfo = function(obj, password) {
      var rval = null;
      var capture = {};
      var errors = [];
      if (!asn1.validate(obj, encryptedPrivateKeyValidator, capture, errors)) {
        var error = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      var oid = asn1.derToOid(capture.encryptionOid);
      var cipher = pki.pbe.getCipher(oid, capture.encryptionParams, password);
      var encrypted = forge6.util.createBuffer(capture.encryptedData);
      cipher.update(encrypted);
      if (cipher.finish()) {
        rval = asn1.fromDer(cipher.output);
      }
      return rval;
    };
    pki.encryptedPrivateKeyToPem = function(epki, maxline) {
      var msg = {
        type: "ENCRYPTED PRIVATE KEY",
        body: asn1.toDer(epki).getBytes()
      };
      return forge6.pem.encode(msg, { maxline });
    };
    pki.encryptedPrivateKeyFromPem = function(pem) {
      var msg = forge6.pem.decode(pem)[0];
      if (msg.type !== "ENCRYPTED PRIVATE KEY") {
        var error = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
        error.headerType = msg.type;
        throw error;
      }
      if (msg.procType && msg.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
      }
      return asn1.fromDer(msg.body);
    };
    pki.encryptRsaPrivateKey = function(rsaKey, password, options) {
      options = options || {};
      if (!options.legacy) {
        var rval = pki.wrapRsaPrivateKey(pki.privateKeyToAsn1(rsaKey));
        rval = pki.encryptPrivateKeyInfo(rval, password, options);
        return pki.encryptedPrivateKeyToPem(rval);
      }
      var algorithm;
      var iv;
      var dkLen;
      var cipherFn;
      switch (options.algorithm) {
        case "aes128":
          algorithm = "AES-128-CBC";
          dkLen = 16;
          iv = forge6.random.getBytesSync(16);
          cipherFn = forge6.aes.createEncryptionCipher;
          break;
        case "aes192":
          algorithm = "AES-192-CBC";
          dkLen = 24;
          iv = forge6.random.getBytesSync(16);
          cipherFn = forge6.aes.createEncryptionCipher;
          break;
        case "aes256":
          algorithm = "AES-256-CBC";
          dkLen = 32;
          iv = forge6.random.getBytesSync(16);
          cipherFn = forge6.aes.createEncryptionCipher;
          break;
        case "3des":
          algorithm = "DES-EDE3-CBC";
          dkLen = 24;
          iv = forge6.random.getBytesSync(8);
          cipherFn = forge6.des.createEncryptionCipher;
          break;
        case "des":
          algorithm = "DES-CBC";
          dkLen = 8;
          iv = forge6.random.getBytesSync(8);
          cipherFn = forge6.des.createEncryptionCipher;
          break;
        default:
          var error = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + options.algorithm + '".');
          error.algorithm = options.algorithm;
          throw error;
      }
      var dk = forge6.pbe.opensslDeriveBytes(password, iv.substr(0, 8), dkLen);
      var cipher = cipherFn(dk);
      cipher.start(iv);
      cipher.update(asn1.toDer(pki.privateKeyToAsn1(rsaKey)));
      cipher.finish();
      var msg = {
        type: "RSA PRIVATE KEY",
        procType: {
          version: "4",
          type: "ENCRYPTED"
        },
        dekInfo: {
          algorithm,
          parameters: forge6.util.bytesToHex(iv).toUpperCase()
        },
        body: cipher.output.getBytes()
      };
      return forge6.pem.encode(msg);
    };
    pki.decryptRsaPrivateKey = function(pem, password) {
      var rval = null;
      var msg = forge6.pem.decode(pem)[0];
      if (msg.type !== "ENCRYPTED PRIVATE KEY" && msg.type !== "PRIVATE KEY" && msg.type !== "RSA PRIVATE KEY") {
        var error = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');
        error.headerType = error;
        throw error;
      }
      if (msg.procType && msg.procType.type === "ENCRYPTED") {
        var dkLen;
        var cipherFn;
        switch (msg.dekInfo.algorithm) {
          case "DES-CBC":
            dkLen = 8;
            cipherFn = forge6.des.createDecryptionCipher;
            break;
          case "DES-EDE3-CBC":
            dkLen = 24;
            cipherFn = forge6.des.createDecryptionCipher;
            break;
          case "AES-128-CBC":
            dkLen = 16;
            cipherFn = forge6.aes.createDecryptionCipher;
            break;
          case "AES-192-CBC":
            dkLen = 24;
            cipherFn = forge6.aes.createDecryptionCipher;
            break;
          case "AES-256-CBC":
            dkLen = 32;
            cipherFn = forge6.aes.createDecryptionCipher;
            break;
          case "RC2-40-CBC":
            dkLen = 5;
            cipherFn = function(key) {
              return forge6.rc2.createDecryptionCipher(key, 40);
            };
            break;
          case "RC2-64-CBC":
            dkLen = 8;
            cipherFn = function(key) {
              return forge6.rc2.createDecryptionCipher(key, 64);
            };
            break;
          case "RC2-128-CBC":
            dkLen = 16;
            cipherFn = function(key) {
              return forge6.rc2.createDecryptionCipher(key, 128);
            };
            break;
          default:
            var error = new Error('Could not decrypt private key; unsupported encryption algorithm "' + msg.dekInfo.algorithm + '".');
            error.algorithm = msg.dekInfo.algorithm;
            throw error;
        }
        var iv = forge6.util.hexToBytes(msg.dekInfo.parameters);
        var dk = forge6.pbe.opensslDeriveBytes(password, iv.substr(0, 8), dkLen);
        var cipher = cipherFn(dk);
        cipher.start(iv);
        cipher.update(forge6.util.createBuffer(msg.body));
        if (cipher.finish()) {
          rval = cipher.output.getBytes();
        } else {
          return rval;
        }
      } else {
        rval = msg.body;
      }
      if (msg.type === "ENCRYPTED PRIVATE KEY") {
        rval = pki.decryptPrivateKeyInfo(asn1.fromDer(rval), password);
      } else {
        rval = asn1.fromDer(rval);
      }
      if (rval !== null) {
        rval = pki.privateKeyFromAsn1(rval);
      }
      return rval;
    };
    pki.pbe.generatePkcs12Key = function(password, salt, id, iter, n, md) {
      var j, l;
      if (typeof md === "undefined" || md === null) {
        if (!("sha1" in forge6.md)) {
          throw new Error('"sha1" hash algorithm unavailable.');
        }
        md = forge6.md.sha1.create();
      }
      var u = md.digestLength;
      var v = md.blockLength;
      var result = new forge6.util.ByteBuffer();
      var passBuf = new forge6.util.ByteBuffer();
      if (password !== null && password !== void 0) {
        for (l = 0; l < password.length; l++) {
          passBuf.putInt16(password.charCodeAt(l));
        }
        passBuf.putInt16(0);
      }
      var p = passBuf.length();
      var s = salt.length();
      var D = new forge6.util.ByteBuffer();
      D.fillWithByte(id, v);
      var Slen = v * Math.ceil(s / v);
      var S = new forge6.util.ByteBuffer();
      for (l = 0; l < Slen; l++) {
        S.putByte(salt.at(l % s));
      }
      var Plen = v * Math.ceil(p / v);
      var P = new forge6.util.ByteBuffer();
      for (l = 0; l < Plen; l++) {
        P.putByte(passBuf.at(l % p));
      }
      var I = S;
      I.putBuffer(P);
      var c = Math.ceil(n / u);
      for (var i = 1; i <= c; i++) {
        var buf = new forge6.util.ByteBuffer();
        buf.putBytes(D.bytes());
        buf.putBytes(I.bytes());
        for (var round = 0; round < iter; round++) {
          md.start();
          md.update(buf.getBytes());
          buf = md.digest();
        }
        var B = new forge6.util.ByteBuffer();
        for (l = 0; l < v; l++) {
          B.putByte(buf.at(l % u));
        }
        var k = Math.ceil(s / v) + Math.ceil(p / v);
        var Inew = new forge6.util.ByteBuffer();
        for (j = 0; j < k; j++) {
          var chunk = new forge6.util.ByteBuffer(I.getBytes(v));
          var x = 511;
          for (l = B.length() - 1; l >= 0; l--) {
            x = x >> 8;
            x += B.at(l) + chunk.at(l);
            chunk.setAt(l, x & 255);
          }
          Inew.putBuffer(chunk);
        }
        I = Inew;
        result.putBuffer(buf);
      }
      result.truncate(result.length() - n);
      return result;
    };
    pki.pbe.getCipher = function(oid, params, password) {
      switch (oid) {
        case pki.oids["pkcs5PBES2"]:
          return pki.pbe.getCipherForPBES2(oid, params, password);
        case pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
        case pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
          return pki.pbe.getCipherForPKCS12PBE(oid, params, password);
        default:
          var error = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
          error.oid = oid;
          error.supportedOids = [
            "pkcs5PBES2",
            "pbeWithSHAAnd3-KeyTripleDES-CBC",
            "pbewithSHAAnd40BitRC2-CBC"
          ];
          throw error;
      }
    };
    pki.pbe.getCipherForPBES2 = function(oid, params, password) {
      var capture = {};
      var errors = [];
      if (!asn1.validate(params, PBES2AlgorithmsValidator, capture, errors)) {
        var error = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      oid = asn1.derToOid(capture.kdfOid);
      if (oid !== pki.oids["pkcs5PBKDF2"]) {
        var error = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
        error.oid = oid;
        error.supportedOids = ["pkcs5PBKDF2"];
        throw error;
      }
      oid = asn1.derToOid(capture.encOid);
      if (oid !== pki.oids["aes128-CBC"] && oid !== pki.oids["aes192-CBC"] && oid !== pki.oids["aes256-CBC"] && oid !== pki.oids["des-EDE3-CBC"] && oid !== pki.oids["desCBC"]) {
        var error = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
        error.oid = oid;
        error.supportedOids = [
          "aes128-CBC",
          "aes192-CBC",
          "aes256-CBC",
          "des-EDE3-CBC",
          "desCBC"
        ];
        throw error;
      }
      var salt = capture.kdfSalt;
      var count = forge6.util.createBuffer(capture.kdfIterationCount);
      count = count.getInt(count.length() << 3);
      var dkLen;
      var cipherFn;
      switch (pki.oids[oid]) {
        case "aes128-CBC":
          dkLen = 16;
          cipherFn = forge6.aes.createDecryptionCipher;
          break;
        case "aes192-CBC":
          dkLen = 24;
          cipherFn = forge6.aes.createDecryptionCipher;
          break;
        case "aes256-CBC":
          dkLen = 32;
          cipherFn = forge6.aes.createDecryptionCipher;
          break;
        case "des-EDE3-CBC":
          dkLen = 24;
          cipherFn = forge6.des.createDecryptionCipher;
          break;
        case "desCBC":
          dkLen = 8;
          cipherFn = forge6.des.createDecryptionCipher;
          break;
      }
      var md = prfOidToMessageDigest(capture.prfOid);
      var dk = forge6.pkcs5.pbkdf2(password, salt, count, dkLen, md);
      var iv = capture.encIv;
      var cipher = cipherFn(dk);
      cipher.start(iv);
      return cipher;
    };
    pki.pbe.getCipherForPKCS12PBE = function(oid, params, password) {
      var capture = {};
      var errors = [];
      if (!asn1.validate(params, pkcs12PbeParamsValidator, capture, errors)) {
        var error = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      var salt = forge6.util.createBuffer(capture.salt);
      var count = forge6.util.createBuffer(capture.iterations);
      count = count.getInt(count.length() << 3);
      var dkLen, dIvLen, cipherFn;
      switch (oid) {
        case pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
          dkLen = 24;
          dIvLen = 8;
          cipherFn = forge6.des.startDecrypting;
          break;
        case pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
          dkLen = 5;
          dIvLen = 8;
          cipherFn = function(key2, iv2) {
            var cipher = forge6.rc2.createDecryptionCipher(key2, 40);
            cipher.start(iv2, null);
            return cipher;
          };
          break;
        default:
          var error = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
          error.oid = oid;
          throw error;
      }
      var md = prfOidToMessageDigest(capture.prfOid);
      var key = pki.pbe.generatePkcs12Key(password, salt, 1, count, dkLen, md);
      md.start();
      var iv = pki.pbe.generatePkcs12Key(password, salt, 2, count, dIvLen, md);
      return cipherFn(key, iv);
    };
    pki.pbe.opensslDeriveBytes = function(password, salt, dkLen, md) {
      if (typeof md === "undefined" || md === null) {
        if (!("md5" in forge6.md)) {
          throw new Error('"md5" hash algorithm unavailable.');
        }
        md = forge6.md.md5.create();
      }
      if (salt === null) {
        salt = "";
      }
      var digests = [hash3(md, password + salt)];
      for (var length8 = 16, i = 1; length8 < dkLen; ++i, length8 += 16) {
        digests.push(hash3(md, digests[i - 1] + password + salt));
      }
      return digests.join("").substr(0, dkLen);
    };
    function hash3(md, bytes3) {
      return md.start().update(bytes3).digest().getBytes();
    }
    function prfOidToMessageDigest(prfOid) {
      var prfAlgorithm;
      if (!prfOid) {
        prfAlgorithm = "hmacWithSHA1";
      } else {
        prfAlgorithm = pki.oids[asn1.derToOid(prfOid)];
        if (!prfAlgorithm) {
          var error = new Error("Unsupported PRF OID.");
          error.oid = prfOid;
          error.supported = [
            "hmacWithSHA1",
            "hmacWithSHA224",
            "hmacWithSHA256",
            "hmacWithSHA384",
            "hmacWithSHA512"
          ];
          throw error;
        }
      }
      return prfAlgorithmToMessageDigest(prfAlgorithm);
    }
    function prfAlgorithmToMessageDigest(prfAlgorithm) {
      var factory = forge6.md;
      switch (prfAlgorithm) {
        case "hmacWithSHA224":
          factory = forge6.md.sha512;
        case "hmacWithSHA1":
        case "hmacWithSHA256":
        case "hmacWithSHA384":
        case "hmacWithSHA512":
          prfAlgorithm = prfAlgorithm.substr(8).toLowerCase();
          break;
        default:
          var error = new Error("Unsupported PRF algorithm.");
          error.algorithm = prfAlgorithm;
          error.supported = [
            "hmacWithSHA1",
            "hmacWithSHA224",
            "hmacWithSHA256",
            "hmacWithSHA384",
            "hmacWithSHA512"
          ];
          throw error;
      }
      if (!factory || !(prfAlgorithm in factory)) {
        throw new Error("Unknown hash algorithm: " + prfAlgorithm);
      }
      return factory[prfAlgorithm].create();
    }
    function createPbkdf2Params(salt, countBytes, dkLen, prfAlgorithm) {
      var params = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        // salt
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.OCTETSTRING,
          false,
          salt
        ),
        // iteration count
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          countBytes.getBytes()
        )
      ]);
      if (prfAlgorithm !== "hmacWithSHA1") {
        params.value.push(
          // key length
          asn1.create(
            asn1.Class.UNIVERSAL,
            asn1.Type.INTEGER,
            false,
            forge6.util.hexToBytes(dkLen.toString(16))
          ),
          // AlgorithmIdentifier
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
            // algorithm
            asn1.create(
              asn1.Class.UNIVERSAL,
              asn1.Type.OID,
              false,
              asn1.oidToDer(pki.oids[prfAlgorithm]).getBytes()
            ),
            // parameters (null)
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
          ])
        );
      }
      return params;
    }
  }
});

// node_modules/node-forge/lib/sha512.js
var require_sha512 = __commonJS({
  "node_modules/node-forge/lib/sha512.js"(exports, module) {
    var forge6 = require_forge();
    require_md();
    require_util();
    var sha5127 = module.exports = forge6.sha512 = forge6.sha512 || {};
    forge6.md.sha512 = forge6.md.algorithms.sha512 = sha5127;
    var sha384 = forge6.sha384 = forge6.sha512.sha384 = forge6.sha512.sha384 || {};
    sha384.create = function() {
      return sha5127.create("SHA-384");
    };
    forge6.md.sha384 = forge6.md.algorithms.sha384 = sha384;
    forge6.sha512.sha256 = forge6.sha512.sha256 || {
      create: function() {
        return sha5127.create("SHA-512/256");
      }
    };
    forge6.md["sha512/256"] = forge6.md.algorithms["sha512/256"] = forge6.sha512.sha256;
    forge6.sha512.sha224 = forge6.sha512.sha224 || {
      create: function() {
        return sha5127.create("SHA-512/224");
      }
    };
    forge6.md["sha512/224"] = forge6.md.algorithms["sha512/224"] = forge6.sha512.sha224;
    sha5127.create = function(algorithm) {
      if (!_initialized) {
        _init();
      }
      if (typeof algorithm === "undefined") {
        algorithm = "SHA-512";
      }
      if (!(algorithm in _states)) {
        throw new Error("Invalid SHA-512 algorithm: " + algorithm);
      }
      var _state = _states[algorithm];
      var _h = null;
      var _input = forge6.util.createBuffer();
      var _w = new Array(80);
      for (var wi = 0; wi < 80; ++wi) {
        _w[wi] = new Array(2);
      }
      var digestLength = 64;
      switch (algorithm) {
        case "SHA-384":
          digestLength = 48;
          break;
        case "SHA-512/256":
          digestLength = 32;
          break;
        case "SHA-512/224":
          digestLength = 28;
          break;
      }
      var md = {
        // SHA-512 => sha512
        algorithm: algorithm.replace("-", "").toLowerCase(),
        blockLength: 128,
        digestLength,
        // 56-bit length of message so far (does not including padding)
        messageLength: 0,
        // true message length
        fullMessageLength: null,
        // size of message length in bytes
        messageLengthSize: 16
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength128 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge6.util.createBuffer();
        _h = new Array(_state.length);
        for (var i = 0; i < _state.length; ++i) {
          _h[i] = _state[i].slice(0);
        }
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge6.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_h, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge6.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits2 = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits2 += carry;
          finalBlock.putInt32(bits2 >>> 0);
          bits2 = next >>> 0;
        }
        finalBlock.putInt32(bits2);
        var h = new Array(_h.length);
        for (var i = 0; i < _h.length; ++i) {
          h[i] = _h[i].slice(0);
        }
        _update(h, _w, finalBlock);
        var rval = forge6.util.createBuffer();
        var hlen;
        if (algorithm === "SHA-512") {
          hlen = h.length;
        } else if (algorithm === "SHA-384") {
          hlen = h.length - 2;
        } else {
          hlen = h.length - 4;
        }
        for (var i = 0; i < hlen; ++i) {
          rval.putInt32(h[i][0]);
          if (i !== hlen - 1 || algorithm !== "SHA-512/224") {
            rval.putInt32(h[i][1]);
          }
        }
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    var _k = null;
    var _states = null;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge6.util.fillString(String.fromCharCode(0), 128);
      _k = [
        [1116352408, 3609767458],
        [1899447441, 602891725],
        [3049323471, 3964484399],
        [3921009573, 2173295548],
        [961987163, 4081628472],
        [1508970993, 3053834265],
        [2453635748, 2937671579],
        [2870763221, 3664609560],
        [3624381080, 2734883394],
        [310598401, 1164996542],
        [607225278, 1323610764],
        [1426881987, 3590304994],
        [1925078388, 4068182383],
        [2162078206, 991336113],
        [2614888103, 633803317],
        [3248222580, 3479774868],
        [3835390401, 2666613458],
        [4022224774, 944711139],
        [264347078, 2341262773],
        [604807628, 2007800933],
        [770255983, 1495990901],
        [1249150122, 1856431235],
        [1555081692, 3175218132],
        [1996064986, 2198950837],
        [2554220882, 3999719339],
        [2821834349, 766784016],
        [2952996808, 2566594879],
        [3210313671, 3203337956],
        [3336571891, 1034457026],
        [3584528711, 2466948901],
        [113926993, 3758326383],
        [338241895, 168717936],
        [666307205, 1188179964],
        [773529912, 1546045734],
        [1294757372, 1522805485],
        [1396182291, 2643833823],
        [1695183700, 2343527390],
        [1986661051, 1014477480],
        [2177026350, 1206759142],
        [2456956037, 344077627],
        [2730485921, 1290863460],
        [2820302411, 3158454273],
        [3259730800, 3505952657],
        [3345764771, 106217008],
        [3516065817, 3606008344],
        [3600352804, 1432725776],
        [4094571909, 1467031594],
        [275423344, 851169720],
        [430227734, 3100823752],
        [506948616, 1363258195],
        [659060556, 3750685593],
        [883997877, 3785050280],
        [958139571, 3318307427],
        [1322822218, 3812723403],
        [1537002063, 2003034995],
        [1747873779, 3602036899],
        [1955562222, 1575990012],
        [2024104815, 1125592928],
        [2227730452, 2716904306],
        [2361852424, 442776044],
        [2428436474, 593698344],
        [2756734187, 3733110249],
        [3204031479, 2999351573],
        [3329325298, 3815920427],
        [3391569614, 3928383900],
        [3515267271, 566280711],
        [3940187606, 3454069534],
        [4118630271, 4000239992],
        [116418474, 1914138554],
        [174292421, 2731055270],
        [289380356, 3203993006],
        [460393269, 320620315],
        [685471733, 587496836],
        [852142971, 1086792851],
        [1017036298, 365543100],
        [1126000580, 2618297676],
        [1288033470, 3409855158],
        [1501505948, 4234509866],
        [1607167915, 987167468],
        [1816402316, 1246189591]
      ];
      _states = {};
      _states["SHA-512"] = [
        [1779033703, 4089235720],
        [3144134277, 2227873595],
        [1013904242, 4271175723],
        [2773480762, 1595750129],
        [1359893119, 2917565137],
        [2600822924, 725511199],
        [528734635, 4215389547],
        [1541459225, 327033209]
      ];
      _states["SHA-384"] = [
        [3418070365, 3238371032],
        [1654270250, 914150663],
        [2438529370, 812702999],
        [355462360, 4144912697],
        [1731405415, 4290775857],
        [2394180231, 1750603025],
        [3675008525, 1694076839],
        [1203062813, 3204075428]
      ];
      _states["SHA-512/256"] = [
        [573645204, 4230739756],
        [2673172387, 3360449730],
        [596883563, 1867755857],
        [2520282905, 1497426621],
        [2519219938, 2827943907],
        [3193839141, 1401305490],
        [721525244, 746961066],
        [246885852, 2177182882]
      ];
      _states["SHA-512/224"] = [
        [2352822216, 424955298],
        [1944164710, 2312950998],
        [502970286, 855612546],
        [1738396948, 1479516111],
        [258812777, 2077511080],
        [2011393907, 79989058],
        [1067287976, 1780299464],
        [286451373, 2446758561]
      ];
      _initialized = true;
    }
    function _update(s, w, bytes3) {
      var t1_hi, t1_lo;
      var t2_hi, t2_lo;
      var s0_hi, s0_lo;
      var s1_hi, s1_lo;
      var ch_hi, ch_lo;
      var maj_hi, maj_lo;
      var a_hi, a_lo;
      var b_hi, b_lo;
      var c_hi, c_lo;
      var d_hi, d_lo;
      var e_hi, e_lo;
      var f_hi, f_lo;
      var g_hi, g_lo;
      var h_hi, h_lo;
      var i, hi, lo, w2, w7, w15, w16;
      var len = bytes3.length();
      while (len >= 128) {
        for (i = 0; i < 16; ++i) {
          w[i][0] = bytes3.getInt32() >>> 0;
          w[i][1] = bytes3.getInt32() >>> 0;
        }
        for (; i < 80; ++i) {
          w2 = w[i - 2];
          hi = w2[0];
          lo = w2[1];
          t1_hi = ((hi >>> 19 | lo << 13) ^ // ROTR 19
          (lo >>> 29 | hi << 3) ^ // ROTR 61/(swap + ROTR 29)
          hi >>> 6) >>> 0;
          t1_lo = ((hi << 13 | lo >>> 19) ^ // ROTR 19
          (lo << 3 | hi >>> 29) ^ // ROTR 61/(swap + ROTR 29)
          (hi << 26 | lo >>> 6)) >>> 0;
          w15 = w[i - 15];
          hi = w15[0];
          lo = w15[1];
          t2_hi = ((hi >>> 1 | lo << 31) ^ // ROTR 1
          (hi >>> 8 | lo << 24) ^ // ROTR 8
          hi >>> 7) >>> 0;
          t2_lo = ((hi << 31 | lo >>> 1) ^ // ROTR 1
          (hi << 24 | lo >>> 8) ^ // ROTR 8
          (hi << 25 | lo >>> 7)) >>> 0;
          w7 = w[i - 7];
          w16 = w[i - 16];
          lo = t1_lo + w7[1] + t2_lo + w16[1];
          w[i][0] = t1_hi + w7[0] + t2_hi + w16[0] + (lo / 4294967296 >>> 0) >>> 0;
          w[i][1] = lo >>> 0;
        }
        a_hi = s[0][0];
        a_lo = s[0][1];
        b_hi = s[1][0];
        b_lo = s[1][1];
        c_hi = s[2][0];
        c_lo = s[2][1];
        d_hi = s[3][0];
        d_lo = s[3][1];
        e_hi = s[4][0];
        e_lo = s[4][1];
        f_hi = s[5][0];
        f_lo = s[5][1];
        g_hi = s[6][0];
        g_lo = s[6][1];
        h_hi = s[7][0];
        h_lo = s[7][1];
        for (i = 0; i < 80; ++i) {
          s1_hi = ((e_hi >>> 14 | e_lo << 18) ^ // ROTR 14
          (e_hi >>> 18 | e_lo << 14) ^ // ROTR 18
          (e_lo >>> 9 | e_hi << 23)) >>> 0;
          s1_lo = ((e_hi << 18 | e_lo >>> 14) ^ // ROTR 14
          (e_hi << 14 | e_lo >>> 18) ^ // ROTR 18
          (e_lo << 23 | e_hi >>> 9)) >>> 0;
          ch_hi = (g_hi ^ e_hi & (f_hi ^ g_hi)) >>> 0;
          ch_lo = (g_lo ^ e_lo & (f_lo ^ g_lo)) >>> 0;
          s0_hi = ((a_hi >>> 28 | a_lo << 4) ^ // ROTR 28
          (a_lo >>> 2 | a_hi << 30) ^ // ROTR 34/(swap + ROTR 2)
          (a_lo >>> 7 | a_hi << 25)) >>> 0;
          s0_lo = ((a_hi << 4 | a_lo >>> 28) ^ // ROTR 28
          (a_lo << 30 | a_hi >>> 2) ^ // ROTR 34/(swap + ROTR 2)
          (a_lo << 25 | a_hi >>> 7)) >>> 0;
          maj_hi = (a_hi & b_hi | c_hi & (a_hi ^ b_hi)) >>> 0;
          maj_lo = (a_lo & b_lo | c_lo & (a_lo ^ b_lo)) >>> 0;
          lo = h_lo + s1_lo + ch_lo + _k[i][1] + w[i][1];
          t1_hi = h_hi + s1_hi + ch_hi + _k[i][0] + w[i][0] + (lo / 4294967296 >>> 0) >>> 0;
          t1_lo = lo >>> 0;
          lo = s0_lo + maj_lo;
          t2_hi = s0_hi + maj_hi + (lo / 4294967296 >>> 0) >>> 0;
          t2_lo = lo >>> 0;
          h_hi = g_hi;
          h_lo = g_lo;
          g_hi = f_hi;
          g_lo = f_lo;
          f_hi = e_hi;
          f_lo = e_lo;
          lo = d_lo + t1_lo;
          e_hi = d_hi + t1_hi + (lo / 4294967296 >>> 0) >>> 0;
          e_lo = lo >>> 0;
          d_hi = c_hi;
          d_lo = c_lo;
          c_hi = b_hi;
          c_lo = b_lo;
          b_hi = a_hi;
          b_lo = a_lo;
          lo = t1_lo + t2_lo;
          a_hi = t1_hi + t2_hi + (lo / 4294967296 >>> 0) >>> 0;
          a_lo = lo >>> 0;
        }
        lo = s[0][1] + a_lo;
        s[0][0] = s[0][0] + a_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[0][1] = lo >>> 0;
        lo = s[1][1] + b_lo;
        s[1][0] = s[1][0] + b_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[1][1] = lo >>> 0;
        lo = s[2][1] + c_lo;
        s[2][0] = s[2][0] + c_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[2][1] = lo >>> 0;
        lo = s[3][1] + d_lo;
        s[3][0] = s[3][0] + d_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[3][1] = lo >>> 0;
        lo = s[4][1] + e_lo;
        s[4][0] = s[4][0] + e_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[4][1] = lo >>> 0;
        lo = s[5][1] + f_lo;
        s[5][0] = s[5][0] + f_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[5][1] = lo >>> 0;
        lo = s[6][1] + g_lo;
        s[6][0] = s[6][0] + g_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[6][1] = lo >>> 0;
        lo = s[7][1] + h_lo;
        s[7][0] = s[7][0] + h_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[7][1] = lo >>> 0;
        len -= 128;
      }
    }
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name7) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name7 + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce8;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash3 = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash3 = (hash3 << 5) - hash3 + namespace.charCodeAt(i);
          hash3 |= 0;
        }
        return createDebug.colors[Math.abs(hash3) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug3(...args) {
          if (!debug3.enabled) {
            return;
          }
          const self2 = debug3;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format6) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format6];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug3.namespace = namespace;
        debug3.useColors = createDebug.useColors();
        debug3.color = createDebug.selectColor(namespace);
        debug3.extend = extend;
        debug3.destroy = createDebug.destroy;
        Object.defineProperty(debug3, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug3);
        }
        return debug3;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name7) {
        if (name7[name7.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name7)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name7)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce8(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/uint8-varint/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe(size = 0) {
  return new Uint8Array(size);
}

// node_modules/uint8-varint/dist/src/index.js
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var MSB = 128;
var REST = 127;
function encodingLength(value) {
  if (value < N1) {
    return 1;
  }
  if (value < N2) {
    return 2;
  }
  if (value < N3) {
    return 3;
  }
  if (value < N4) {
    return 4;
  }
  if (value < N5) {
    return 5;
  }
  if (value < N6) {
    return 6;
  }
  if (value < N7) {
    return 7;
  }
  if (Number.MAX_SAFE_INTEGER != null && value > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("Could not encode varint");
  }
  return 8;
}
function encodeUint8Array(value, buf, offset = 0) {
  switch (encodingLength(value)) {
    case 8: {
      buf[offset++] = value & 255 | MSB;
      value /= 128;
    }
    case 7: {
      buf[offset++] = value & 255 | MSB;
      value /= 128;
    }
    case 6: {
      buf[offset++] = value & 255 | MSB;
      value /= 128;
    }
    case 5: {
      buf[offset++] = value & 255 | MSB;
      value /= 128;
    }
    case 4: {
      buf[offset++] = value & 255 | MSB;
      value >>>= 7;
    }
    case 3: {
      buf[offset++] = value & 255 | MSB;
      value >>>= 7;
    }
    case 2: {
      buf[offset++] = value & 255 | MSB;
      value >>>= 7;
    }
    case 1: {
      buf[offset++] = value & 255;
      value >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf;
}
function encodeUint8ArrayList(value, buf, offset = 0) {
  switch (encodingLength(value)) {
    case 8: {
      buf.set(offset++, value & 255 | MSB);
      value /= 128;
    }
    case 7: {
      buf.set(offset++, value & 255 | MSB);
      value /= 128;
    }
    case 6: {
      buf.set(offset++, value & 255 | MSB);
      value /= 128;
    }
    case 5: {
      buf.set(offset++, value & 255 | MSB);
      value /= 128;
    }
    case 4: {
      buf.set(offset++, value & 255 | MSB);
      value >>>= 7;
    }
    case 3: {
      buf.set(offset++, value & 255 | MSB);
      value >>>= 7;
    }
    case 2: {
      buf.set(offset++, value & 255 | MSB);
      value >>>= 7;
    }
    case 1: {
      buf.set(offset++, value & 255);
      value >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf;
}
function decodeUint8Array(buf, offset) {
  let b = buf[offset];
  let res = 0;
  res += b & REST;
  if (b < MSB) {
    return res;
  }
  b = buf[offset + 1];
  res += (b & REST) << 7;
  if (b < MSB) {
    return res;
  }
  b = buf[offset + 2];
  res += (b & REST) << 14;
  if (b < MSB) {
    return res;
  }
  b = buf[offset + 3];
  res += (b & REST) << 21;
  if (b < MSB) {
    return res;
  }
  b = buf[offset + 4];
  res += (b & REST) * N4;
  if (b < MSB) {
    return res;
  }
  b = buf[offset + 5];
  res += (b & REST) * N5;
  if (b < MSB) {
    return res;
  }
  b = buf[offset + 6];
  res += (b & REST) * N6;
  if (b < MSB) {
    return res;
  }
  b = buf[offset + 7];
  res += (b & REST) * N7;
  if (b < MSB) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function decodeUint8ArrayList(buf, offset) {
  let b = buf.get(offset);
  let res = 0;
  res += b & REST;
  if (b < MSB) {
    return res;
  }
  b = buf.get(offset + 1);
  res += (b & REST) << 7;
  if (b < MSB) {
    return res;
  }
  b = buf.get(offset + 2);
  res += (b & REST) << 14;
  if (b < MSB) {
    return res;
  }
  b = buf.get(offset + 3);
  res += (b & REST) << 21;
  if (b < MSB) {
    return res;
  }
  b = buf.get(offset + 4);
  res += (b & REST) * N4;
  if (b < MSB) {
    return res;
  }
  b = buf.get(offset + 5);
  res += (b & REST) * N5;
  if (b < MSB) {
    return res;
  }
  b = buf.get(offset + 6);
  res += (b & REST) * N6;
  if (b < MSB) {
    return res;
  }
  b = buf.get(offset + 7);
  res += (b & REST) * N7;
  if (b < MSB) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function encode(value, buf, offset = 0) {
  if (buf == null) {
    buf = allocUnsafe(encodingLength(value));
  }
  if (buf instanceof Uint8Array) {
    return encodeUint8Array(value, buf, offset);
  } else {
    return encodeUint8ArrayList(value, buf, offset);
  }
}
function decode(buf, offset = 0) {
  if (buf instanceof Uint8Array) {
    return decodeUint8Array(buf, offset);
  } else {
    return decodeUint8ArrayList(buf, offset);
  }
}

// node_modules/uint8arraylist/node_modules/uint8arrays/dist/src/alloc.js
function alloc(size = 0) {
  return new Uint8Array(size);
}
function allocUnsafe2(size = 0) {
  return new Uint8Array(size);
}

// node_modules/uint8arraylist/node_modules/uint8arrays/dist/src/util/as-uint8array.js
function asUint8Array(buf) {
  return buf;
}

// node_modules/uint8arraylist/node_modules/uint8arrays/dist/src/concat.js
function concat(arrays, length8) {
  if (length8 == null) {
    length8 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output3 = allocUnsafe2(length8);
  let offset = 0;
  for (const arr of arrays) {
    output3.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output3);
}

// node_modules/uint8arraylist/node_modules/uint8arrays/dist/src/equals.js
function equals(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/uint8arraylist/dist/src/index.js
var symbol = Symbol.for("@achingbrain/uint8arraylist");
function findBufAndOffset(bufs, index) {
  if (index == null || index < 0) {
    throw new RangeError("index is out of bounds");
  }
  let offset = 0;
  for (const buf of bufs) {
    const bufEnd = offset + buf.byteLength;
    if (index < bufEnd) {
      return {
        buf,
        index: index - offset
      };
    }
    offset = bufEnd;
  }
  throw new RangeError("index is out of bounds");
}
function isUint8ArrayList(value) {
  return Boolean(value?.[symbol]);
}
var Uint8ArrayList = class _Uint8ArrayList {
  bufs;
  length;
  [symbol] = true;
  constructor(...data) {
    this.bufs = [];
    this.length = 0;
    if (data.length > 0) {
      this.appendAll(data);
    }
  }
  *[Symbol.iterator]() {
    yield* this.bufs;
  }
  get byteLength() {
    return this.length;
  }
  /**
   * Add one or more `bufs` to the end of this Uint8ArrayList
   */
  append(...bufs) {
    this.appendAll(bufs);
  }
  /**
   * Add all `bufs` to the end of this Uint8ArrayList
   */
  appendAll(bufs) {
    let length8 = 0;
    for (const buf of bufs) {
      if (buf instanceof Uint8Array) {
        length8 += buf.byteLength;
        this.bufs.push(buf);
      } else if (isUint8ArrayList(buf)) {
        length8 += buf.byteLength;
        this.bufs.push(...buf.bufs);
      } else {
        throw new Error("Could not append value, must be an Uint8Array or a Uint8ArrayList");
      }
    }
    this.length += length8;
  }
  /**
   * Add one or more `bufs` to the start of this Uint8ArrayList
   */
  prepend(...bufs) {
    this.prependAll(bufs);
  }
  /**
   * Add all `bufs` to the start of this Uint8ArrayList
   */
  prependAll(bufs) {
    let length8 = 0;
    for (const buf of bufs.reverse()) {
      if (buf instanceof Uint8Array) {
        length8 += buf.byteLength;
        this.bufs.unshift(buf);
      } else if (isUint8ArrayList(buf)) {
        length8 += buf.byteLength;
        this.bufs.unshift(...buf.bufs);
      } else {
        throw new Error("Could not prepend value, must be an Uint8Array or a Uint8ArrayList");
      }
    }
    this.length += length8;
  }
  /**
   * Read the value at `index`
   */
  get(index) {
    const res = findBufAndOffset(this.bufs, index);
    return res.buf[res.index];
  }
  /**
   * Set the value at `index` to `value`
   */
  set(index, value) {
    const res = findBufAndOffset(this.bufs, index);
    res.buf[res.index] = value;
  }
  /**
   * Copy bytes from `buf` to the index specified by `offset`
   */
  write(buf, offset = 0) {
    if (buf instanceof Uint8Array) {
      for (let i = 0; i < buf.length; i++) {
        this.set(offset + i, buf[i]);
      }
    } else if (isUint8ArrayList(buf)) {
      for (let i = 0; i < buf.length; i++) {
        this.set(offset + i, buf.get(i));
      }
    } else {
      throw new Error("Could not write value, must be an Uint8Array or a Uint8ArrayList");
    }
  }
  /**
   * Remove bytes from the front of the pool
   */
  consume(bytes3) {
    bytes3 = Math.trunc(bytes3);
    if (Number.isNaN(bytes3) || bytes3 <= 0) {
      return;
    }
    if (bytes3 === this.byteLength) {
      this.bufs = [];
      this.length = 0;
      return;
    }
    while (this.bufs.length > 0) {
      if (bytes3 >= this.bufs[0].byteLength) {
        bytes3 -= this.bufs[0].byteLength;
        this.length -= this.bufs[0].byteLength;
        this.bufs.shift();
      } else {
        this.bufs[0] = this.bufs[0].subarray(bytes3);
        this.length -= bytes3;
        break;
      }
    }
  }
  /**
   * Extracts a section of an array and returns a new array.
   *
   * This is a copy operation as it is with Uint8Arrays and Arrays
   * - note this is different to the behaviour of Node Buffers.
   */
  slice(beginInclusive, endExclusive) {
    const { bufs, length: length8 } = this._subList(beginInclusive, endExclusive);
    return concat(bufs, length8);
  }
  /**
   * Returns a alloc from the given start and end element index.
   *
   * In the best case where the data extracted comes from a single Uint8Array
   * internally this is a no-copy operation otherwise it is a copy operation.
   */
  subarray(beginInclusive, endExclusive) {
    const { bufs, length: length8 } = this._subList(beginInclusive, endExclusive);
    if (bufs.length === 1) {
      return bufs[0];
    }
    return concat(bufs, length8);
  }
  /**
   * Returns a allocList from the given start and end element index.
   *
   * This is a no-copy operation.
   */
  sublist(beginInclusive, endExclusive) {
    const { bufs, length: length8 } = this._subList(beginInclusive, endExclusive);
    const list = new _Uint8ArrayList();
    list.length = length8;
    list.bufs = [...bufs];
    return list;
  }
  _subList(beginInclusive, endExclusive) {
    beginInclusive = beginInclusive ?? 0;
    endExclusive = endExclusive ?? this.length;
    if (beginInclusive < 0) {
      beginInclusive = this.length + beginInclusive;
    }
    if (endExclusive < 0) {
      endExclusive = this.length + endExclusive;
    }
    if (beginInclusive < 0 || endExclusive > this.length) {
      throw new RangeError("index is out of bounds");
    }
    if (beginInclusive === endExclusive) {
      return { bufs: [], length: 0 };
    }
    if (beginInclusive === 0 && endExclusive === this.length) {
      return { bufs: this.bufs, length: this.length };
    }
    const bufs = [];
    let offset = 0;
    for (let i = 0; i < this.bufs.length; i++) {
      const buf = this.bufs[i];
      const bufStart = offset;
      const bufEnd = bufStart + buf.byteLength;
      offset = bufEnd;
      if (beginInclusive >= bufEnd) {
        continue;
      }
      const sliceStartInBuf = beginInclusive >= bufStart && beginInclusive < bufEnd;
      const sliceEndsInBuf = endExclusive > bufStart && endExclusive <= bufEnd;
      if (sliceStartInBuf && sliceEndsInBuf) {
        if (beginInclusive === bufStart && endExclusive === bufEnd) {
          bufs.push(buf);
          break;
        }
        const start = beginInclusive - bufStart;
        bufs.push(buf.subarray(start, start + (endExclusive - beginInclusive)));
        break;
      }
      if (sliceStartInBuf) {
        if (beginInclusive === 0) {
          bufs.push(buf);
          continue;
        }
        bufs.push(buf.subarray(beginInclusive - bufStart));
        continue;
      }
      if (sliceEndsInBuf) {
        if (endExclusive === bufEnd) {
          bufs.push(buf);
          break;
        }
        bufs.push(buf.subarray(0, endExclusive - bufStart));
        break;
      }
      bufs.push(buf);
    }
    return { bufs, length: endExclusive - beginInclusive };
  }
  indexOf(search, offset = 0) {
    if (!isUint8ArrayList(search) && !(search instanceof Uint8Array)) {
      throw new TypeError('The "value" argument must be a Uint8ArrayList or Uint8Array');
    }
    const needle = search instanceof Uint8Array ? search : search.subarray();
    offset = Number(offset ?? 0);
    if (isNaN(offset)) {
      offset = 0;
    }
    if (offset < 0) {
      offset = this.length + offset;
    }
    if (offset < 0) {
      offset = 0;
    }
    if (search.length === 0) {
      return offset > this.length ? this.length : offset;
    }
    const M = needle.byteLength;
    if (M === 0) {
      throw new TypeError("search must be at least 1 byte long");
    }
    const radix = 256;
    const rightmostPositions = new Int32Array(radix);
    for (let c = 0; c < radix; c++) {
      rightmostPositions[c] = -1;
    }
    for (let j = 0; j < M; j++) {
      rightmostPositions[needle[j]] = j;
    }
    const right = rightmostPositions;
    const lastIndex = this.byteLength - needle.byteLength;
    const lastPatIndex = needle.byteLength - 1;
    let skip;
    for (let i = offset; i <= lastIndex; i += skip) {
      skip = 0;
      for (let j = lastPatIndex; j >= 0; j--) {
        const char = this.get(i + j);
        if (needle[j] !== char) {
          skip = Math.max(1, j - right[char]);
          break;
        }
      }
      if (skip === 0) {
        return i;
      }
    }
    return -1;
  }
  getInt8(byteOffset) {
    const buf = this.subarray(byteOffset, byteOffset + 1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getInt8(0);
  }
  setInt8(byteOffset, value) {
    const buf = allocUnsafe2(1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setInt8(0, value);
    this.write(buf, byteOffset);
  }
  getInt16(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getInt16(0, littleEndian);
  }
  setInt16(byteOffset, value, littleEndian) {
    const buf = alloc(2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setInt16(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  getInt32(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getInt32(0, littleEndian);
  }
  setInt32(byteOffset, value, littleEndian) {
    const buf = alloc(4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setInt32(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  getBigInt64(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getBigInt64(0, littleEndian);
  }
  setBigInt64(byteOffset, value, littleEndian) {
    const buf = alloc(8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setBigInt64(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  getUint8(byteOffset) {
    const buf = this.subarray(byteOffset, byteOffset + 1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getUint8(0);
  }
  setUint8(byteOffset, value) {
    const buf = allocUnsafe2(1);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setUint8(0, value);
    this.write(buf, byteOffset);
  }
  getUint16(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getUint16(0, littleEndian);
  }
  setUint16(byteOffset, value, littleEndian) {
    const buf = alloc(2);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setUint16(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  getUint32(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getUint32(0, littleEndian);
  }
  setUint32(byteOffset, value, littleEndian) {
    const buf = alloc(4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setUint32(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  getBigUint64(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getBigUint64(0, littleEndian);
  }
  setBigUint64(byteOffset, value, littleEndian) {
    const buf = alloc(8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setBigUint64(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  getFloat32(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getFloat32(0, littleEndian);
  }
  setFloat32(byteOffset, value, littleEndian) {
    const buf = alloc(4);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setFloat32(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  getFloat64(byteOffset, littleEndian) {
    const buf = this.subarray(byteOffset, byteOffset + 8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    return view.getFloat64(0, littleEndian);
  }
  setFloat64(byteOffset, value, littleEndian) {
    const buf = alloc(8);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    view.setFloat64(0, value, littleEndian);
    this.write(buf, byteOffset);
  }
  equals(other) {
    if (other == null) {
      return false;
    }
    if (!(other instanceof _Uint8ArrayList)) {
      return false;
    }
    if (other.bufs.length !== this.bufs.length) {
      return false;
    }
    for (let i = 0; i < this.bufs.length; i++) {
      if (!equals(this.bufs[i], other.bufs[i])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Create a Uint8ArrayList from a pre-existing list of Uint8Arrays.  Use this
   * method if you know the total size of all the Uint8Arrays ahead of time.
   */
  static fromUint8Arrays(bufs, length8) {
    const list = new _Uint8ArrayList();
    list.bufs = bufs;
    if (length8 == null) {
      length8 = bufs.reduce((acc, curr) => acc + curr.byteLength, 0);
    }
    list.length = length8;
    return list;
  }
};

// node_modules/it-length-prefixed/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe3(size = 0) {
  return new Uint8Array(size);
}

// node_modules/it-length-prefixed/dist/src/utils.js
function isAsyncIterable(thing) {
  return thing[Symbol.asyncIterator] != null;
}

// node_modules/it-length-prefixed/dist/src/encode.js
var defaultEncoder = (length8) => {
  const lengthLength = encodingLength(length8);
  const lengthBuf = allocUnsafe3(lengthLength);
  encode(length8, lengthBuf);
  defaultEncoder.bytes = lengthLength;
  return lengthBuf;
};
defaultEncoder.bytes = 0;
function encode2(source, options) {
  options = options ?? {};
  const encodeLength = options.lengthEncoder ?? defaultEncoder;
  function* maybeYield(chunk) {
    const length8 = encodeLength(chunk.byteLength);
    if (length8 instanceof Uint8Array) {
      yield length8;
    } else {
      yield* length8;
    }
    if (chunk instanceof Uint8Array) {
      yield chunk;
    } else {
      yield* chunk;
    }
  }
  if (isAsyncIterable(source)) {
    return async function* () {
      for await (const chunk of source) {
        yield* maybeYield(chunk);
      }
    }();
  }
  return function* () {
    for (const chunk of source) {
      yield* maybeYield(chunk);
    }
  }();
}
encode2.single = (chunk, options) => {
  options = options ?? {};
  const encodeLength = options.lengthEncoder ?? defaultEncoder;
  return new Uint8ArrayList(encodeLength(chunk.byteLength), chunk);
};

// node_modules/it-length-prefixed/dist/src/errors.js
var InvalidMessageLengthError = class extends Error {
  name = "InvalidMessageLengthError";
  code = "ERR_INVALID_MSG_LENGTH";
};
var InvalidDataLengthError = class extends Error {
  name = "InvalidDataLengthError";
  code = "ERR_MSG_DATA_TOO_LONG";
};
var InvalidDataLengthLengthError = class extends Error {
  name = "InvalidDataLengthLengthError";
  code = "ERR_MSG_LENGTH_TOO_LONG";
};
var UnexpectedEOFError = class extends Error {
  name = "UnexpectedEOFError";
  code = "ERR_UNEXPECTED_EOF";
};

// node_modules/it-length-prefixed/dist/src/decode.js
var MAX_LENGTH_LENGTH = 8;
var MAX_DATA_LENGTH = 1024 * 1024 * 4;
var ReadMode;
(function(ReadMode2) {
  ReadMode2[ReadMode2["LENGTH"] = 0] = "LENGTH";
  ReadMode2[ReadMode2["DATA"] = 1] = "DATA";
})(ReadMode || (ReadMode = {}));
var defaultDecoder = (buf) => {
  const length8 = decode(buf);
  defaultDecoder.bytes = encodingLength(length8);
  return length8;
};
defaultDecoder.bytes = 0;
function decode2(source, options) {
  const buffer = new Uint8ArrayList();
  let mode = ReadMode.LENGTH;
  let dataLength = -1;
  const lengthDecoder = options?.lengthDecoder ?? defaultDecoder;
  const maxLengthLength = options?.maxLengthLength ?? MAX_LENGTH_LENGTH;
  const maxDataLength = options?.maxDataLength ?? MAX_DATA_LENGTH;
  function* maybeYield() {
    while (buffer.byteLength > 0) {
      if (mode === ReadMode.LENGTH) {
        try {
          dataLength = lengthDecoder(buffer);
          if (dataLength < 0) {
            throw new InvalidMessageLengthError("Invalid message length");
          }
          if (dataLength > maxDataLength) {
            throw new InvalidDataLengthError("Message length too long");
          }
          const dataLengthLength = lengthDecoder.bytes;
          buffer.consume(dataLengthLength);
          if (options?.onLength != null) {
            options.onLength(dataLength);
          }
          mode = ReadMode.DATA;
        } catch (err) {
          if (err instanceof RangeError) {
            if (buffer.byteLength > maxLengthLength) {
              throw new InvalidDataLengthLengthError("Message length length too long");
            }
            break;
          }
          throw err;
        }
      }
      if (mode === ReadMode.DATA) {
        if (buffer.byteLength < dataLength) {
          break;
        }
        const data = buffer.sublist(0, dataLength);
        buffer.consume(dataLength);
        if (options?.onData != null) {
          options.onData(data);
        }
        yield data;
        mode = ReadMode.LENGTH;
      }
    }
  }
  if (isAsyncIterable(source)) {
    return async function* () {
      for await (const buf of source) {
        buffer.append(buf);
        yield* maybeYield();
      }
      if (buffer.byteLength > 0) {
        throw new UnexpectedEOFError("Unexpected end of input");
      }
    }();
  }
  return function* () {
    for (const buf of source) {
      buffer.append(buf);
      yield* maybeYield();
    }
    if (buffer.byteLength > 0) {
      throw new UnexpectedEOFError("Unexpected end of input");
    }
  }();
}
decode2.fromReader = (reader, options) => {
  let byteLength = 1;
  const varByteSource = async function* () {
    while (true) {
      try {
        const { done, value } = await reader.next(byteLength);
        if (done === true) {
          return;
        }
        if (value != null) {
          yield value;
        }
      } catch (err) {
        if (err.code === "ERR_UNDER_READ") {
          return { done: true, value: null };
        }
        throw err;
      } finally {
        byteLength = 1;
      }
    }
  }();
  const onLength = (l) => {
    byteLength = l;
  };
  return decode2(varByteSource, {
    ...options ?? {},
    onLength
  });
};

// node_modules/p-defer/index.js
function pDefer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

// node_modules/it-pair/dist/src/index.js
function pair() {
  const deferred = pDefer();
  let piped = false;
  return {
    sink: async (source) => {
      if (piped) {
        throw new Error("already piped");
      }
      piped = true;
      deferred.resolve(source);
    },
    source: async function* () {
      const source = await deferred.promise;
      yield* source;
    }()
  };
}

// node_modules/it-pair/dist/src/duplex.js
function duplexPair() {
  const a = pair();
  const b = pair();
  return [
    {
      source: a.source,
      sink: b.sink
    },
    {
      source: b.source,
      sink: a.sink
    }
  ];
}

// node_modules/it-pb-stream/dist/src/index.js
var import_err_code = __toESM(require_err_code(), 1);

// node_modules/it-pushable/dist/src/fifo.js
var FixedFIFO = class {
  buffer;
  mask;
  top;
  btm;
  next;
  constructor(hwm) {
    if (!(hwm > 0) || (hwm - 1 & hwm) !== 0) {
      throw new Error("Max size for a FixedFIFO should be a power of two");
    }
    this.buffer = new Array(hwm);
    this.mask = hwm - 1;
    this.top = 0;
    this.btm = 0;
    this.next = null;
  }
  push(data) {
    if (this.buffer[this.top] !== void 0) {
      return false;
    }
    this.buffer[this.top] = data;
    this.top = this.top + 1 & this.mask;
    return true;
  }
  shift() {
    const last = this.buffer[this.btm];
    if (last === void 0) {
      return void 0;
    }
    this.buffer[this.btm] = void 0;
    this.btm = this.btm + 1 & this.mask;
    return last;
  }
  isEmpty() {
    return this.buffer[this.btm] === void 0;
  }
};
var FIFO = class {
  size;
  hwm;
  head;
  tail;
  constructor(options = {}) {
    this.hwm = options.splitLimit ?? 16;
    this.head = new FixedFIFO(this.hwm);
    this.tail = this.head;
    this.size = 0;
  }
  calculateSize(obj) {
    if (obj?.byteLength != null) {
      return obj.byteLength;
    }
    return 1;
  }
  push(val) {
    if (val?.value != null) {
      this.size += this.calculateSize(val.value);
    }
    if (!this.head.push(val)) {
      const prev = this.head;
      this.head = prev.next = new FixedFIFO(2 * this.head.buffer.length);
      this.head.push(val);
    }
  }
  shift() {
    let val = this.tail.shift();
    if (val === void 0 && this.tail.next != null) {
      const next = this.tail.next;
      this.tail.next = null;
      this.tail = next;
      val = this.tail.shift();
    }
    if (val?.value != null) {
      this.size -= this.calculateSize(val.value);
    }
    return val;
  }
  isEmpty() {
    return this.head.isEmpty();
  }
};

// node_modules/it-pushable/dist/src/index.js
var AbortError = class extends Error {
  type;
  code;
  constructor(message2, code7) {
    super(message2 ?? "The operation was aborted");
    this.type = "aborted";
    this.code = code7 ?? "ABORT_ERR";
  }
};
function pushable(options = {}) {
  const getNext = (buffer) => {
    const next = buffer.shift();
    if (next == null) {
      return { done: true };
    }
    if (next.error != null) {
      throw next.error;
    }
    return {
      done: next.done === true,
      // @ts-expect-error if done is false, value will be present
      value: next.value
    };
  };
  return _pushable(getNext, options);
}
function _pushable(getNext, options) {
  options = options ?? {};
  let onEnd = options.onEnd;
  let buffer = new FIFO();
  let pushable2;
  let onNext;
  let ended;
  let drain = pDefer();
  const waitNext = async () => {
    try {
      if (!buffer.isEmpty()) {
        return getNext(buffer);
      }
      if (ended) {
        return { done: true };
      }
      return await new Promise((resolve, reject) => {
        onNext = (next) => {
          onNext = null;
          buffer.push(next);
          try {
            resolve(getNext(buffer));
          } catch (err) {
            reject(err);
          }
          return pushable2;
        };
      });
    } finally {
      if (buffer.isEmpty()) {
        queueMicrotask(() => {
          drain.resolve();
          drain = pDefer();
        });
      }
    }
  };
  const bufferNext = (next) => {
    if (onNext != null) {
      return onNext(next);
    }
    buffer.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer = new FIFO();
    if (onNext != null) {
      return onNext({ error: err });
    }
    buffer.push({ error: err });
    return pushable2;
  };
  const push = (value) => {
    if (ended) {
      return pushable2;
    }
    if (options?.objectMode !== true && value?.byteLength == null) {
      throw new Error("objectMode was not true but tried to push non-Uint8Array value");
    }
    return bufferNext({ done: false, value });
  };
  const end = (err) => {
    if (ended)
      return pushable2;
    ended = true;
    return err != null ? bufferError(err) : bufferNext({ done: true });
  };
  const _return = () => {
    buffer = new FIFO();
    end();
    return { done: true };
  };
  const _throw = (err) => {
    end(err);
    return { done: true };
  };
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next: waitNext,
    return: _return,
    throw: _throw,
    push,
    end,
    get readableLength() {
      return buffer.size;
    },
    onEmpty: async (options2) => {
      const signal = options2?.signal;
      signal?.throwIfAborted();
      if (buffer.isEmpty()) {
        return;
      }
      let cancel;
      let listener;
      if (signal != null) {
        cancel = new Promise((resolve, reject) => {
          listener = () => {
            reject(new AbortError());
          };
          signal.addEventListener("abort", listener);
        });
      }
      try {
        await Promise.race([
          drain.promise,
          cancel
        ]);
      } finally {
        if (listener != null && signal != null) {
          signal?.removeEventListener("abort", listener);
        }
      }
    }
  };
  if (onEnd == null) {
    return pushable2;
  }
  const _pushable2 = pushable2;
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return _pushable2.next();
    },
    throw(err) {
      _pushable2.throw(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return { done: true };
    },
    return() {
      _pushable2.return();
      if (onEnd != null) {
        onEnd();
        onEnd = void 0;
      }
      return { done: true };
    },
    push,
    end(err) {
      _pushable2.end(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return pushable2;
    },
    get readableLength() {
      return _pushable2.readableLength;
    },
    onEmpty: (opts) => {
      return _pushable2.onEmpty(opts);
    }
  };
  return pushable2;
}

// node_modules/byte-access/dist/src/index.js
function accessor(buf) {
  if (buf instanceof Uint8Array) {
    return {
      get(index) {
        return buf[index];
      },
      set(index, value) {
        buf[index] = value;
      }
    };
  }
  return {
    get(index) {
      return buf.get(index);
    },
    set(index, value) {
      buf.set(index, value);
    }
  };
}

// node_modules/longbits/dist/src/index.js
var TWO_32 = 4294967296;
var LongBits = class _LongBits {
  constructor(hi = 0, lo = 0) {
    this.hi = hi;
    this.lo = lo;
  }
  /**
   * Returns these hi/lo bits as a BigInt
   */
  toBigInt(unsigned2) {
    if (unsigned2 === true) {
      return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n);
    }
    if (this.hi >>> 31 !== 0) {
      const lo = ~this.lo + 1 >>> 0;
      let hi = ~this.hi >>> 0;
      if (lo === 0) {
        hi = hi + 1 >>> 0;
      }
      return -(BigInt(lo) + (BigInt(hi) << 32n));
    }
    return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n);
  }
  /**
   * Returns these hi/lo bits as a Number - this may overflow, toBigInt
   * should be preferred
   */
  toNumber(unsigned2) {
    return Number(this.toBigInt(unsigned2));
  }
  /**
   * ZigZag decode a LongBits object
   */
  zzDecode() {
    const mask = -(this.lo & 1);
    const lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    const hi = (this.hi >>> 1 ^ mask) >>> 0;
    return new _LongBits(hi, lo);
  }
  /**
   * ZigZag encode a LongBits object
   */
  zzEncode() {
    const mask = this.hi >> 31;
    const hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    const lo = (this.lo << 1 ^ mask) >>> 0;
    return new _LongBits(hi, lo);
  }
  /**
   * Encode a LongBits object as a varint byte array
   */
  toBytes(buf, offset = 0) {
    const access = accessor(buf);
    while (this.hi > 0) {
      access.set(offset++, this.lo & 127 | 128);
      this.lo = (this.lo >>> 7 | this.hi << 25) >>> 0;
      this.hi >>>= 7;
    }
    while (this.lo > 127) {
      access.set(offset++, this.lo & 127 | 128);
      this.lo = this.lo >>> 7;
    }
    access.set(offset++, this.lo);
  }
  /**
   * Parse a LongBits object from a BigInt
   */
  static fromBigInt(value) {
    if (value === 0n) {
      return new _LongBits();
    }
    const negative = value < 0;
    if (negative) {
      value = -value;
    }
    let hi = Number(value >> 32n) | 0;
    let lo = Number(value - (BigInt(hi) << 32n)) | 0;
    if (negative) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > TWO_32) {
        lo = 0;
        if (++hi > TWO_32) {
          hi = 0;
        }
      }
    }
    return new _LongBits(hi, lo);
  }
  /**
   * Parse a LongBits object from a Number
   */
  static fromNumber(value) {
    if (value === 0) {
      return new _LongBits();
    }
    const sign3 = value < 0;
    if (sign3) {
      value = -value;
    }
    let lo = value >>> 0;
    let hi = (value - lo) / 4294967296 >>> 0;
    if (sign3) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > 4294967295) {
        lo = 0;
        if (++hi > 4294967295) {
          hi = 0;
        }
      }
    }
    return new _LongBits(hi, lo);
  }
  /**
   * Parse a LongBits object from a varint byte array
   */
  static fromBytes(buf, offset = 0) {
    const access = accessor(buf);
    const bits2 = new _LongBits();
    let i = 0;
    if (buf.length - offset > 4) {
      for (; i < 4; ++i) {
        bits2.lo = (bits2.lo | (access.get(offset) & 127) << i * 7) >>> 0;
        if (access.get(offset++) < 128) {
          return bits2;
        }
      }
      bits2.lo = (bits2.lo | (access.get(offset) & 127) << 28) >>> 0;
      bits2.hi = (bits2.hi | (access.get(offset) & 127) >> 4) >>> 0;
      if (access.get(offset++) < 128) {
        return bits2;
      }
      i = 0;
    } else {
      for (; i < 4; ++i) {
        if (offset >= buf.length) {
          throw RangeError(`index out of range: ${offset} > ${buf.length}`);
        }
        bits2.lo = (bits2.lo | (access.get(offset) & 127) << i * 7) >>> 0;
        if (access.get(offset++) < 128) {
          return bits2;
        }
      }
    }
    if (buf.length - offset > 4) {
      for (; i < 5; ++i) {
        bits2.hi = (bits2.hi | (access.get(offset) & 127) << i * 7 + 3) >>> 0;
        if (access.get(offset++) < 128) {
          return bits2;
        }
      }
    } else if (offset < buf.byteLength) {
      for (; i < 5; ++i) {
        if (offset >= buf.length) {
          throw RangeError(`index out of range: ${offset} > ${buf.length}`);
        }
        bits2.hi = (bits2.hi | (access.get(offset) & 127) << i * 7 + 3) >>> 0;
        if (access.get(offset++) < 128) {
          return bits2;
        }
      }
    }
    throw RangeError("invalid varint encoding");
  }
};

// node_modules/uint8arrays/dist/src/util/as-uint8array.js
function asUint8Array2(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}

// node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe4(size = 0) {
  if (globalThis.Buffer?.allocUnsafe != null) {
    return asUint8Array2(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}

// node_modules/it-pb-stream/node_modules/uint8-varint/dist/src/index.js
var N12 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N42 = Math.pow(2, 28);
var N52 = Math.pow(2, 35);
var N62 = Math.pow(2, 42);
var N72 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var unsigned = {
  encodingLength(value) {
    if (value < N12) {
      return 1;
    }
    if (value < N22) {
      return 2;
    }
    if (value < N32) {
      return 3;
    }
    if (value < N42) {
      return 4;
    }
    if (value < N52) {
      return 5;
    }
    if (value < N62) {
      return 6;
    }
    if (value < N72) {
      return 7;
    }
    if (value < N8) {
      return 8;
    }
    if (value < N9) {
      return 9;
    }
    return 10;
  },
  encode(value, buf, offset = 0) {
    if (Number.MAX_SAFE_INTEGER != null && value > Number.MAX_SAFE_INTEGER) {
      throw new RangeError("Could not encode varint");
    }
    if (buf == null) {
      buf = allocUnsafe4(unsigned.encodingLength(value));
    }
    LongBits.fromNumber(value).toBytes(buf, offset);
    return buf;
  },
  decode(buf, offset = 0) {
    return LongBits.fromBytes(buf, offset).toNumber(true);
  }
};

// node_modules/it-pb-stream/dist/src/index.js
var defaultLengthDecoder = (buf) => {
  return unsigned.decode(buf);
};
defaultLengthDecoder.bytes = 0;
function pbStream(duplex, opts) {
  const write2 = pushable();
  duplex.sink(write2).catch((err) => {
    write2.end(err);
  });
  duplex.sink = async (source2) => {
    for await (const buf of source2) {
      write2.push(buf);
    }
    write2.end();
  };
  let source = duplex.source;
  if (duplex.source[Symbol.iterator] != null) {
    source = duplex.source[Symbol.iterator]();
  } else if (duplex.source[Symbol.asyncIterator] != null) {
    source = duplex.source[Symbol.asyncIterator]();
  }
  const readBuffer = new Uint8ArrayList();
  const W = {
    read: async (bytes3) => {
      if (bytes3 == null) {
        const { done, value } = await source.next();
        if (done === true) {
          return new Uint8ArrayList();
        }
        return value;
      }
      while (readBuffer.byteLength < bytes3) {
        const { value, done } = await source.next();
        if (done === true) {
          throw (0, import_err_code.default)(new Error("unexpected end of input"), "ERR_UNEXPECTED_EOF");
        }
        readBuffer.append(value);
      }
      const buf = readBuffer.sublist(0, bytes3);
      readBuffer.consume(bytes3);
      return buf;
    },
    readLP: async () => {
      let dataLength = -1;
      const lengthBuffer = new Uint8ArrayList();
      const decodeLength = opts?.lengthDecoder ?? defaultLengthDecoder;
      while (true) {
        lengthBuffer.append(await W.read(1));
        try {
          dataLength = decodeLength(lengthBuffer);
        } catch (err) {
          if (err instanceof RangeError) {
            continue;
          }
          throw err;
        }
        if (dataLength > -1) {
          break;
        }
        if (opts?.maxLengthLength != null && lengthBuffer.byteLength > opts.maxLengthLength) {
          throw (0, import_err_code.default)(new Error("message length length too long"), "ERR_MSG_LENGTH_TOO_LONG");
        }
      }
      if (opts?.maxDataLength != null && dataLength > opts.maxDataLength) {
        throw (0, import_err_code.default)(new Error("message length too long"), "ERR_MSG_DATA_TOO_LONG");
      }
      return W.read(dataLength);
    },
    readPB: async (proto) => {
      const value = await W.readLP();
      if (value == null) {
        throw new Error("Value is null");
      }
      const buf = value instanceof Uint8Array ? value : value.subarray();
      return proto.decode(buf);
    },
    write: (data) => {
      if (data instanceof Uint8Array) {
        write2.push(data);
      } else {
        write2.push(data.subarray());
      }
    },
    writeLP: (data) => {
      W.write(encode2.single(data, opts));
    },
    writePB: (data, proto) => {
      W.writeLP(proto.encode(data));
    },
    pb: (proto) => {
      return {
        read: async () => W.readPB(proto),
        write: (d) => {
          W.writePB(d, proto);
        },
        unwrap: () => W
      };
    },
    unwrap: () => {
      const originalStream = duplex.source;
      duplex.source = async function* () {
        yield* readBuffer;
        yield* originalStream;
      }();
      return duplex;
    }
  };
  return W;
}

// node_modules/it-merge/dist/src/index.js
function isAsyncIterable2(thing) {
  return thing[Symbol.asyncIterator] != null;
}
function merge(...sources) {
  const syncSources = [];
  for (const source of sources) {
    if (!isAsyncIterable2(source)) {
      syncSources.push(source);
    }
  }
  if (syncSources.length === sources.length) {
    return function* () {
      for (const source of syncSources) {
        yield* source;
      }
    }();
  }
  return async function* () {
    const output3 = pushable({
      objectMode: true
    });
    void Promise.resolve().then(async () => {
      try {
        await Promise.all(sources.map(async (source) => {
          for await (const item of source) {
            output3.push(item);
          }
        }));
        output3.end();
      } catch (err) {
        output3.end(err);
      }
    });
    yield* output3;
  }();
}
var src_default = merge;

// node_modules/it-pipe/dist/src/index.js
function pipe(first, ...rest) {
  if (first == null) {
    throw new Error("Empty pipeline");
  }
  if (isDuplex(first)) {
    const duplex = first;
    first = () => duplex.source;
  } else if (isIterable(first) || isAsyncIterable3(first)) {
    const source = first;
    first = () => source;
  }
  const fns = [first, ...rest];
  if (fns.length > 1) {
    if (isDuplex(fns[fns.length - 1])) {
      fns[fns.length - 1] = fns[fns.length - 1].sink;
    }
  }
  if (fns.length > 2) {
    for (let i = 1; i < fns.length - 1; i++) {
      if (isDuplex(fns[i])) {
        fns[i] = duplexPipelineFn(fns[i]);
      }
    }
  }
  return rawPipe(...fns);
}
var rawPipe = (...fns) => {
  let res;
  while (fns.length > 0) {
    res = fns.shift()(res);
  }
  return res;
};
var isAsyncIterable3 = (obj) => {
  return obj?.[Symbol.asyncIterator] != null;
};
var isIterable = (obj) => {
  return obj?.[Symbol.iterator] != null;
};
var isDuplex = (obj) => {
  if (obj == null) {
    return false;
  }
  return obj.sink != null && obj.source != null;
};
var duplexPipelineFn = (duplex) => {
  return (source) => {
    const p = duplex.sink(source);
    if (p?.then != null) {
      const stream = pushable({
        objectMode: true
      });
      p.then(() => {
        stream.end();
      }, (err) => {
        stream.end(err);
      });
      let sourceWrap;
      const source2 = duplex.source;
      if (isAsyncIterable3(source2)) {
        sourceWrap = async function* () {
          yield* source2;
          stream.end();
        };
      } else if (isIterable(source2)) {
        sourceWrap = function* () {
          yield* source2;
          stream.end();
        };
      } else {
        throw new Error("Unknown duplex source type - must be Iterable or AsyncIterable");
      }
      return src_default(stream, sourceWrap());
    }
    return duplex.source;
  };
};

// node_modules/@chainsafe/libp2p-noise/dist/src/constants.js
var NOISE_MSG_MAX_LENGTH_BYTES = 65535;
var NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG = NOISE_MSG_MAX_LENGTH_BYTES - 16;
var DUMP_SESSION_KEYS = Boolean(globalThis.process?.env?.DUMP_SESSION_KEYS);

// node_modules/@noble/ciphers/esm/utils.js
var u8a = (a) => a instanceof Uint8Array;
var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
var isPlainObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]" && obj.constructor === Object;
function checkOpts(defaults, opts) {
  if (opts !== void 0 && (typeof opts !== "object" || !isPlainObject(opts)))
    throw new Error("Options should be object or undefined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
function ensureBytes(b, len) {
  if (!(b instanceof Uint8Array))
    throw new Error("Uint8Array expected");
  if (typeof len === "number") {
    if (b.length !== len)
      throw new Error(`Uint8Array length ${len} expected`);
  }
}
function equalBytes(a, b) {
  if (a.length !== b.length)
    throw new Error("equalBytes: Different size of Uint8Arrays");
  let isSame = true;
  for (let i = 0; i < a.length; i++)
    isSame && (isSame = a[i] === b[i]);
  return isSame;
}
function setBigUint64(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE3 ? 4 : 0;
  const l = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE3);
  view.setUint32(byteOffset + l, wl, isLE3);
}

// node_modules/@noble/ciphers/esm/_assert.js
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function bool(b) {
  if (typeof b !== "boolean")
    throw new Error(`Expected boolean, not ${b}`);
}
function bytes(b, ...lengths) {
  if (!(b instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function hash(hash3) {
  if (typeof hash3 !== "function" || typeof hash3.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(hash3.outputLen);
  number(hash3.blockLen);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
var assert = { number, bool, bytes, hash, exists, output };
var assert_default = assert;

// node_modules/@noble/ciphers/esm/_poly1305.js
var u8to16 = (a, i) => a[i++] & 255 | (a[i++] & 255) << 8;
var Poly1305 = class {
  constructor(key) {
    this.blockLen = 16;
    this.outputLen = 16;
    this.buffer = new Uint8Array(16);
    this.r = new Uint16Array(10);
    this.h = new Uint16Array(10);
    this.pad = new Uint16Array(8);
    this.pos = 0;
    this.finished = false;
    key = toBytes(key);
    ensureBytes(key, 32);
    const t0 = u8to16(key, 0);
    const t1 = u8to16(key, 2);
    const t2 = u8to16(key, 4);
    const t3 = u8to16(key, 6);
    const t4 = u8to16(key, 8);
    const t5 = u8to16(key, 10);
    const t6 = u8to16(key, 12);
    const t7 = u8to16(key, 14);
    this.r[0] = t0 & 8191;
    this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
    this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
    this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
    this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
    this.r[5] = t4 >>> 1 & 8190;
    this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
    this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
    this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
    this.r[9] = t7 >>> 5 & 127;
    for (let i = 0; i < 8; i++)
      this.pad[i] = u8to16(key, 16 + 2 * i);
  }
  process(data, offset, isLast = false) {
    const hibit = isLast ? 0 : 1 << 11;
    const { h, r } = this;
    const r0 = r[0];
    const r1 = r[1];
    const r2 = r[2];
    const r3 = r[3];
    const r4 = r[4];
    const r5 = r[5];
    const r6 = r[6];
    const r7 = r[7];
    const r8 = r[8];
    const r9 = r[9];
    const t0 = u8to16(data, offset + 0);
    const t1 = u8to16(data, offset + 2);
    const t2 = u8to16(data, offset + 4);
    const t3 = u8to16(data, offset + 6);
    const t4 = u8to16(data, offset + 8);
    const t5 = u8to16(data, offset + 10);
    const t6 = u8to16(data, offset + 12);
    const t7 = u8to16(data, offset + 14);
    let h0 = h[0] + (t0 & 8191);
    let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 8191);
    let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 8191);
    let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 8191);
    let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 8191);
    let h5 = h[5] + (t4 >>> 1 & 8191);
    let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 8191);
    let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 8191);
    let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 8191);
    let h9 = h[9] + (t7 >>> 5 | hibit);
    let c = 0;
    let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
    c = d0 >>> 13;
    d0 &= 8191;
    d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
    c += d0 >>> 13;
    d0 &= 8191;
    let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
    c = d1 >>> 13;
    d1 &= 8191;
    d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
    c += d1 >>> 13;
    d1 &= 8191;
    let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
    c = d2 >>> 13;
    d2 &= 8191;
    d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
    c += d2 >>> 13;
    d2 &= 8191;
    let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
    c = d3 >>> 13;
    d3 &= 8191;
    d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
    c += d3 >>> 13;
    d3 &= 8191;
    let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
    c = d4 >>> 13;
    d4 &= 8191;
    d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
    c += d4 >>> 13;
    d4 &= 8191;
    let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
    c = d5 >>> 13;
    d5 &= 8191;
    d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
    c += d5 >>> 13;
    d5 &= 8191;
    let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
    c = d6 >>> 13;
    d6 &= 8191;
    d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
    c += d6 >>> 13;
    d6 &= 8191;
    let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
    c = d7 >>> 13;
    d7 &= 8191;
    d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
    c += d7 >>> 13;
    d7 &= 8191;
    let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
    c = d8 >>> 13;
    d8 &= 8191;
    d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
    c += d8 >>> 13;
    d8 &= 8191;
    let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
    c = d9 >>> 13;
    d9 &= 8191;
    d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
    c += d9 >>> 13;
    d9 &= 8191;
    c = (c << 2) + c | 0;
    c = c + d0 | 0;
    d0 = c & 8191;
    c = c >>> 13;
    d1 += c;
    h[0] = d0;
    h[1] = d1;
    h[2] = d2;
    h[3] = d3;
    h[4] = d4;
    h[5] = d5;
    h[6] = d6;
    h[7] = d7;
    h[8] = d8;
    h[9] = d9;
  }
  finalize() {
    const { h, pad } = this;
    const g = new Uint16Array(10);
    let c = h[1] >>> 13;
    h[1] &= 8191;
    for (let i = 2; i < 10; i++) {
      h[i] += c;
      c = h[i] >>> 13;
      h[i] &= 8191;
    }
    h[0] += c * 5;
    c = h[0] >>> 13;
    h[0] &= 8191;
    h[1] += c;
    c = h[1] >>> 13;
    h[1] &= 8191;
    h[2] += c;
    g[0] = h[0] + 5;
    c = g[0] >>> 13;
    g[0] &= 8191;
    for (let i = 1; i < 10; i++) {
      g[i] = h[i] + c;
      c = g[i] >>> 13;
      g[i] &= 8191;
    }
    g[9] -= 1 << 13;
    let mask = (c ^ 1) - 1;
    for (let i = 0; i < 10; i++)
      g[i] &= mask;
    mask = ~mask;
    for (let i = 0; i < 10; i++)
      h[i] = h[i] & mask | g[i];
    h[0] = (h[0] | h[1] << 13) & 65535;
    h[1] = (h[1] >>> 3 | h[2] << 10) & 65535;
    h[2] = (h[2] >>> 6 | h[3] << 7) & 65535;
    h[3] = (h[3] >>> 9 | h[4] << 4) & 65535;
    h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 65535;
    h[5] = (h[6] >>> 2 | h[7] << 11) & 65535;
    h[6] = (h[7] >>> 5 | h[8] << 8) & 65535;
    h[7] = (h[8] >>> 8 | h[9] << 5) & 65535;
    let f = h[0] + pad[0];
    h[0] = f & 65535;
    for (let i = 1; i < 8; i++) {
      f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
      h[i] = f & 65535;
    }
  }
  update(data) {
    assert_default.exists(this);
    const { buffer, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(data, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(buffer, 0, false);
        this.pos = 0;
      }
    }
    return this;
  }
  destroy() {
    this.h.fill(0);
    this.r.fill(0);
    this.buffer.fill(0);
    this.pad.fill(0);
  }
  digestInto(out) {
    assert_default.exists(this);
    assert_default.output(out, this);
    this.finished = true;
    const { buffer, h } = this;
    let { pos } = this;
    if (pos) {
      buffer[pos++] = 1;
      for (; pos < 16; pos++)
        buffer[pos] = 0;
      this.process(buffer, 0, true);
    }
    this.finalize();
    let opos = 0;
    for (let i = 0; i < 8; i++) {
      out[opos++] = h[i] >>> 0;
      out[opos++] = h[i] >>> 8;
    }
    return out;
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
};
function wrapConstructorWithKey(hashCons) {
  const hashC = (msg, key) => hashCons(key).update(toBytes(msg)).digest();
  const tmp = hashCons(new Uint8Array(32));
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key) => hashCons(key);
  return hashC;
}
var poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));

// node_modules/@noble/ciphers/esm/_salsa.js
var sigma16 = utf8ToBytes("expand 16-byte k");
var sigma32 = utf8ToBytes("expand 32-byte k");
var sigma16_32 = u32(sigma16);
var sigma32_32 = u32(sigma32);
var isAligned32 = (b) => !(b.byteOffset % 4);
var salsaBasic = (opts) => {
  const { core, rounds, counterRight, counterLen, allow128bitKeys, extendNonceFn, blockLen } = checkOpts({ rounds: 20, counterRight: false, counterLen: 8, allow128bitKeys: true, blockLen: 64 }, opts);
  assert_default.number(counterLen);
  assert_default.number(rounds);
  assert_default.number(blockLen);
  assert_default.bool(counterRight);
  assert_default.bool(allow128bitKeys);
  const blockLen32 = blockLen / 4;
  if (blockLen % 4 !== 0)
    throw new Error("Salsa/ChaCha: blockLen should be aligned to 4 bytes");
  return (key, nonce, data, output3, counter = 0) => {
    assert_default.bytes(key);
    assert_default.bytes(nonce);
    assert_default.bytes(data);
    if (!output3)
      output3 = new Uint8Array(data.length);
    assert_default.bytes(output3);
    assert_default.number(counter);
    if (counter < 0 || counter >= 2 ** 32 - 1)
      throw new Error("Salsa/ChaCha: counter overflow");
    if (output3.length < data.length) {
      throw new Error(`Salsa/ChaCha: output (${output3.length}) is shorter than data (${data.length})`);
    }
    const toClean = [];
    let k, sigma;
    if (key.length === 32) {
      k = key;
      sigma = sigma32_32;
    } else if (key.length === 16 && allow128bitKeys) {
      k = new Uint8Array(32);
      k.set(key);
      k.set(key, 16);
      sigma = sigma16_32;
      toClean.push(k);
    } else
      throw new Error(`Salsa/ChaCha: wrong key length=${key.length}, expected`);
    if (extendNonceFn) {
      if (nonce.length <= 16)
        throw new Error(`Salsa/ChaCha: extended nonce should be bigger than 16 bytes`);
      k = extendNonceFn(sigma, k, nonce.subarray(0, 16), new Uint8Array(32));
      toClean.push(k);
      nonce = nonce.subarray(16);
    }
    const nonceLen = 16 - counterLen;
    if (nonce.length !== nonceLen)
      throw new Error(`Salsa/ChaCha: nonce should be ${nonceLen} or 16 bytes`);
    if (nonceLen !== 12) {
      const nc = new Uint8Array(12);
      nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
      toClean.push(nonce = nc);
    }
    const block = new Uint8Array(blockLen);
    const b32 = u32(block);
    const k32 = u32(k);
    const n32 = u32(nonce);
    const d32 = isAligned32(data) && u32(data);
    const o32 = isAligned32(output3) && u32(output3);
    toClean.push(b32);
    const len = data.length;
    for (let pos = 0, ctr = counter; pos < len; ctr++) {
      core(sigma, k32, n32, b32, ctr, rounds);
      if (ctr >= 2 ** 32 - 1)
        throw new Error("Salsa/ChaCha: counter overflow");
      const take = Math.min(blockLen, len - pos);
      if (take === blockLen && o32 && d32) {
        const pos32 = pos / 4;
        if (pos % 4 !== 0)
          throw new Error("Salsa/ChaCha: wrong block position");
        for (let j = 0; j < blockLen32; j++)
          o32[pos32 + j] = d32[pos32 + j] ^ b32[j];
        pos += blockLen;
        continue;
      }
      for (let j = 0; j < take; j++)
        output3[pos + j] = data[pos + j] ^ block[j];
      pos += take;
    }
    for (let i = 0; i < toClean.length; i++)
      toClean[i].fill(0);
    return output3;
  };
};

// node_modules/@noble/ciphers/esm/chacha.js
var rotl = (a, b) => a << b | a >>> 32 - b;
function chachaCore(c, k, n, out, cnt, rounds = 20) {
  let y00 = c[0], y01 = c[1], y02 = c[2], y03 = c[3];
  let y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3];
  let y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7];
  let y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let i = 0; i < rounds; i += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  let oi = 0;
  out[oi++] = y00 + x00 | 0;
  out[oi++] = y01 + x01 | 0;
  out[oi++] = y02 + x02 | 0;
  out[oi++] = y03 + x03 | 0;
  out[oi++] = y04 + x04 | 0;
  out[oi++] = y05 + x05 | 0;
  out[oi++] = y06 + x06 | 0;
  out[oi++] = y07 + x07 | 0;
  out[oi++] = y08 + x08 | 0;
  out[oi++] = y09 + x09 | 0;
  out[oi++] = y10 + x10 | 0;
  out[oi++] = y11 + x11 | 0;
  out[oi++] = y12 + x12 | 0;
  out[oi++] = y13 + x13 | 0;
  out[oi++] = y14 + x14 | 0;
  out[oi++] = y15 + x15 | 0;
}
function hchacha(c, key, src8, out) {
  const k32 = u32(key);
  const i32 = u32(src8);
  const o32 = u32(out);
  let x00 = c[0], x01 = c[1], x02 = c[2], x03 = c[3];
  let x04 = k32[0], x05 = k32[1], x06 = k32[2], x07 = k32[3];
  let x08 = k32[4], x09 = k32[5], x10 = k32[6], x11 = k32[7];
  let x12 = i32[0], x13 = i32[1], x14 = i32[2], x15 = i32[3];
  for (let i = 0; i < 20; i += 2) {
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 16);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 12);
    x00 = x00 + x04 | 0;
    x12 = rotl(x12 ^ x00, 8);
    x08 = x08 + x12 | 0;
    x04 = rotl(x04 ^ x08, 7);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 16);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 12);
    x01 = x01 + x05 | 0;
    x13 = rotl(x13 ^ x01, 8);
    x09 = x09 + x13 | 0;
    x05 = rotl(x05 ^ x09, 7);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 16);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 12);
    x02 = x02 + x06 | 0;
    x14 = rotl(x14 ^ x02, 8);
    x10 = x10 + x14 | 0;
    x06 = rotl(x06 ^ x10, 7);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 16);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 12);
    x03 = x03 + x07 | 0;
    x15 = rotl(x15 ^ x03, 8);
    x11 = x11 + x15 | 0;
    x07 = rotl(x07 ^ x11, 7);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 16);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 12);
    x00 = x00 + x05 | 0;
    x15 = rotl(x15 ^ x00, 8);
    x10 = x10 + x15 | 0;
    x05 = rotl(x05 ^ x10, 7);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 16);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 12);
    x01 = x01 + x06 | 0;
    x12 = rotl(x12 ^ x01, 8);
    x11 = x11 + x12 | 0;
    x06 = rotl(x06 ^ x11, 7);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 16);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 12);
    x02 = x02 + x07 | 0;
    x13 = rotl(x13 ^ x02, 8);
    x08 = x08 + x13 | 0;
    x07 = rotl(x07 ^ x08, 7);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 16);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 12);
    x03 = x03 + x04 | 0;
    x14 = rotl(x14 ^ x03, 8);
    x09 = x09 + x14 | 0;
    x04 = rotl(x04 ^ x09, 7);
  }
  o32[0] = x00;
  o32[1] = x01;
  o32[2] = x02;
  o32[3] = x03;
  o32[4] = x12;
  o32[5] = x13;
  o32[6] = x14;
  o32[7] = x15;
  return out;
}
var chacha20orig = salsaBasic({ core: chachaCore, counterRight: false, counterLen: 8 });
var chacha20 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 4,
  allow128bitKeys: false
});
var xchacha20 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 8,
  extendNonceFn: hchacha,
  allow128bitKeys: false
});
var chacha8 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 4,
  rounds: 8
});
var chacha12 = salsaBasic({
  core: chachaCore,
  counterRight: false,
  counterLen: 4,
  rounds: 12
});
var ZERO = new Uint8Array(16);
var updatePadded = (h, msg) => {
  h.update(msg);
  const left = msg.length % 16;
  if (left)
    h.update(ZERO.subarray(left));
};
var computeTag = (fn, key, nonce, data, AAD) => {
  const authKey = fn(key, nonce, new Uint8Array(32));
  const h = poly1305.create(authKey);
  if (AAD)
    updatePadded(h, AAD);
  updatePadded(h, data);
  const num = new Uint8Array(16);
  const view = createView(num);
  setBigUint64(view, 0, BigInt(AAD ? AAD.length : 0), true);
  setBigUint64(view, 8, BigInt(data.length), true);
  h.update(num);
  const res = h.digest();
  authKey.fill(0);
  return res;
};
var _poly1305_aead = (fn) => (key, nonce, AAD) => {
  const tagLength = 16;
  ensureBytes(key, 32);
  ensureBytes(nonce);
  return {
    tagLength,
    encrypt: (plaintext) => {
      const res = new Uint8Array(plaintext.length + tagLength);
      fn(key, nonce, plaintext, res, 1);
      const tag = computeTag(fn, key, nonce, res.subarray(0, -tagLength), AAD);
      res.set(tag, plaintext.length);
      return res;
    },
    decrypt: (ciphertext) => {
      if (ciphertext.length < tagLength)
        throw new Error(`Encrypted data should be at least ${tagLength}`);
      const realTag = ciphertext.subarray(-tagLength);
      const data = ciphertext.subarray(0, -tagLength);
      const tag = computeTag(fn, key, nonce, data, AAD);
      if (!equalBytes(realTag, tag))
        throw new Error("Wrong tag");
      return fn(key, nonce, data, void 0, 1);
    }
  };
};
var chacha20_poly1305 = _poly1305_aead(chacha20);
var xchacha20_poly1305 = _poly1305_aead(xchacha20);

// node_modules/@noble/hashes/esm/_assert.js
function number2(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function isBytes(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
function bytes2(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function hash2(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number2(h.outputLen);
  number2(h.blockLen);
}
function exists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output2(out, instance) {
  bytes2(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}

// node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
var createView2 = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var rotr = (word, shift) => word << 32 - shift | word >>> shift;
var isLE2 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes2(data);
  bytes2(data);
  return data;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/@noble/hashes/esm/_md.js
function setBigUint642(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE3 ? 4 : 0;
  const l = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE3);
  view.setUint32(byteOffset + l, wl, isLE3);
}
var Chi = (a, b, c) => a & b ^ ~a & c;
var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE3) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE3;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView2(this.buffer);
  }
  update(data) {
    exists2(this);
    const { view, buffer, blockLen } = this;
    data = toBytes2(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView2(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    exists2(this);
    output2(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE3 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint642(view, blockLen - 8, BigInt(this.length * 8), isLE3);
    this.process(view, 0);
    const oview = createView2(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE3);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length: length8, finished, destroyed, pos } = this;
    to.length = length8;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length8 % blockLen)
      to.buffer.set(buffer);
    return to;
  }
};

// node_modules/@noble/curves/esm/abstract/utils.js
var _0n = /* @__PURE__ */ BigInt(0);
function isBytes2(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
function abytes(item) {
  if (!isBytes2(item))
    throw new Error("Uint8Array expected");
}
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes3) {
  abytes(bytes3);
  let hex = "";
  for (let i = 0; i < bytes3.length; i++) {
    hex += hexes[bytes3[i]];
  }
  return hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return BigInt(hex === "" ? "0" : `0x${hex}`);
}
var asciis = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function asciiToBase16(char) {
  if (char >= asciis._0 && char <= asciis._9)
    return char - asciis._0;
  if (char >= asciis._A && char <= asciis._F)
    return char - (asciis._A - 10);
  if (char >= asciis._a && char <= asciis._f)
    return char - (asciis._a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function bytesToNumberLE(bytes3) {
  abytes(bytes3);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes3).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes2(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
    }
  } else if (isBytes2(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(`${title} must be hex string or Uint8Array`);
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
  return res;
}
var isPosBig = (n) => typeof n === "bigint" && _0n <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error(`expected valid ${title}: ${min} <= n < ${max}, got ${typeof n} ${n}`);
}
var validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error(`Invalid validator "${type}", expected function`);
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}

// node_modules/@noble/curves/esm/abstract/modular.js
var _0n2 = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _3n = BigInt(3);
var _4n = BigInt(4);
var _5n = BigInt(5);
var _8n = BigInt(8);
var _9n = BigInt(9);
var _16n = BigInt(16);
function mod(a, b) {
  const result = a % b;
  return result >= _0n2 ? result : b + result;
}
function pow(num, power, modulo) {
  if (modulo <= _0n2 || power < _0n2)
    throw new Error("Expected power/modulo > 0");
  if (modulo === _1n)
    return _0n2;
  let res = _1n;
  while (power > _0n2) {
    if (power & _1n)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n;
  }
  return res;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}

// node_modules/@noble/curves/esm/abstract/montgomery.js
var _0n3 = BigInt(0);
var _1n2 = BigInt(1);
function validateOpts(curve) {
  validateObject(curve, {
    a: "bigint"
  }, {
    montgomeryBits: "isSafeInteger",
    nByteLength: "isSafeInteger",
    adjustScalarBytes: "function",
    domain: "function",
    powPminus2: "function",
    Gu: "bigint"
  });
  return Object.freeze({ ...curve });
}
function montgomery(curveDef) {
  const CURVE3 = validateOpts(curveDef);
  const { P } = CURVE3;
  const modP = (n) => mod(n, P);
  const montgomeryBits = CURVE3.montgomeryBits;
  const montgomeryBytes = Math.ceil(montgomeryBits / 8);
  const fieldLen2 = CURVE3.nByteLength;
  const adjustScalarBytes2 = CURVE3.adjustScalarBytes || ((bytes3) => bytes3);
  const powPminus2 = CURVE3.powPminus2 || ((x) => pow(x, P - BigInt(2), P));
  function cswap(swap, x_2, x_3) {
    const dummy = modP(swap * (x_2 - x_3));
    x_2 = modP(x_2 - dummy);
    x_3 = modP(x_3 + dummy);
    return [x_2, x_3];
  }
  const a24 = (CURVE3.a - BigInt(2)) / BigInt(4);
  function montgomeryLadder(u, scalar) {
    aInRange("u", u, _0n3, P);
    aInRange("scalar", scalar, _0n3, P);
    const k = scalar;
    const x_1 = u;
    let x_2 = _1n2;
    let z_2 = _0n3;
    let x_3 = u;
    let z_3 = _1n2;
    let swap = _0n3;
    let sw;
    for (let t = BigInt(montgomeryBits - 1); t >= _0n3; t--) {
      const k_t = k >> t & _1n2;
      swap ^= k_t;
      sw = cswap(swap, x_2, x_3);
      x_2 = sw[0];
      x_3 = sw[1];
      sw = cswap(swap, z_2, z_3);
      z_2 = sw[0];
      z_3 = sw[1];
      swap = k_t;
      const A = x_2 + z_2;
      const AA = modP(A * A);
      const B = x_2 - z_2;
      const BB = modP(B * B);
      const E = AA - BB;
      const C = x_3 + z_3;
      const D = x_3 - z_3;
      const DA = modP(D * A);
      const CB = modP(C * B);
      const dacb = DA + CB;
      const da_cb = DA - CB;
      x_3 = modP(dacb * dacb);
      z_3 = modP(x_1 * modP(da_cb * da_cb));
      x_2 = modP(AA * BB);
      z_2 = modP(E * (AA + modP(a24 * E)));
    }
    sw = cswap(swap, x_2, x_3);
    x_2 = sw[0];
    x_3 = sw[1];
    sw = cswap(swap, z_2, z_3);
    z_2 = sw[0];
    z_3 = sw[1];
    const z2 = powPminus2(z_2);
    return modP(x_2 * z2);
  }
  function encodeUCoordinate(u) {
    return numberToBytesLE(modP(u), montgomeryBytes);
  }
  function decodeUCoordinate(uEnc) {
    const u = ensureBytes2("u coordinate", uEnc, montgomeryBytes);
    if (fieldLen2 === 32)
      u[31] &= 127;
    return bytesToNumberLE(u);
  }
  function decodeScalar(n) {
    const bytes3 = ensureBytes2("scalar", n);
    const len = bytes3.length;
    if (len !== montgomeryBytes && len !== fieldLen2)
      throw new Error(`Expected ${montgomeryBytes} or ${fieldLen2} bytes, got ${len}`);
    return bytesToNumberLE(adjustScalarBytes2(bytes3));
  }
  function scalarMult(scalar, u) {
    const pointU = decodeUCoordinate(u);
    const _scalar = decodeScalar(scalar);
    const pu = montgomeryLadder(pointU, _scalar);
    if (pu === _0n3)
      throw new Error("Invalid private or public key received");
    return encodeUCoordinate(pu);
  }
  const GuBytes = encodeUCoordinate(CURVE3.Gu);
  function scalarMultBase(scalar) {
    return scalarMult(scalar, GuBytes);
  }
  return {
    scalarMult,
    scalarMultBase,
    getSharedSecret: (privateKey, publicKey) => scalarMult(privateKey, publicKey),
    getPublicKey: (privateKey) => scalarMultBase(privateKey),
    utils: { randomPrivateKey: () => CURVE3.randomBytes(CURVE3.nByteLength) },
    GuBytes
  };
}

// node_modules/@noble/curves/esm/ed25519.js
var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var _0n4 = BigInt(0);
var _1n3 = BigInt(1);
var _2n2 = BigInt(2);
var _3n2 = BigInt(3);
var _5n2 = BigInt(5);
var _8n2 = BigInt(8);
function ed25519_pow_2_252_3(x) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P = ED25519_P;
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow2(b2, _2n2, P) * b2 % P;
  const b5 = pow2(b4, _1n3, P) * x % P;
  const b10 = pow2(b5, _5n2, P) * b5 % P;
  const b20 = pow2(b10, _10n, P) * b10 % P;
  const b40 = pow2(b20, _20n, P) * b20 % P;
  const b80 = pow2(b40, _40n, P) * b40 % P;
  const b160 = pow2(b80, _80n, P) * b80 % P;
  const b240 = pow2(b160, _80n, P) * b80 % P;
  const b250 = pow2(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow2(b250, _2n2, P) * x % P;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes3) {
  bytes3[0] &= 248;
  bytes3[31] &= 127;
  bytes3[31] |= 64;
  return bytes3;
}
var x25519 = /* @__PURE__ */ (() => montgomery({
  P: ED25519_P,
  a: BigInt(486662),
  montgomeryBits: 255,
  // n is 253 bits
  nByteLength: 32,
  Gu: BigInt(9),
  powPminus2: (x) => {
    const P = ED25519_P;
    const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
    return mod(pow2(pow_p_5_8, _3n2, P) * b2, P);
  },
  adjustScalarBytes,
  randomBytes
}))();

// node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash3, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    hash2(hash3);
    const key = toBytes2(_key);
    this.iHash = hash3.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash3.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf) {
    exists2(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    exists2(this);
    bytes2(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash3, key, message2) => new HMAC(hash3, key).update(message2).digest();
hmac.create = (hash3, key) => new HMAC(hash3, key);

// node_modules/@noble/hashes/esm/hkdf.js
function extract(hash3, ikm, salt) {
  hash2(hash3);
  if (salt === void 0)
    salt = new Uint8Array(hash3.outputLen);
  return hmac(hash3, toBytes2(salt), toBytes2(ikm));
}
var HKDF_COUNTER = /* @__PURE__ */ new Uint8Array([0]);
var EMPTY_BUFFER = /* @__PURE__ */ new Uint8Array();
function expand(hash3, prk, info, length8 = 32) {
  hash2(hash3);
  number2(length8);
  if (length8 > 255 * hash3.outputLen)
    throw new Error("Length should be <= 255*HashLen");
  const blocks = Math.ceil(length8 / hash3.outputLen);
  if (info === void 0)
    info = EMPTY_BUFFER;
  const okm = new Uint8Array(blocks * hash3.outputLen);
  const HMAC2 = hmac.create(hash3, prk);
  const HMACTmp = HMAC2._cloneInto();
  const T = new Uint8Array(HMAC2.outputLen);
  for (let counter = 0; counter < blocks; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    HMACTmp.update(counter === 0 ? EMPTY_BUFFER : T).update(info).update(HKDF_COUNTER).digestInto(T);
    okm.set(T, hash3.outputLen * counter);
    HMAC2._cloneInto(HMACTmp);
  }
  HMAC2.destroy();
  HMACTmp.destroy();
  T.fill(0);
  HKDF_COUNTER.fill(0);
  return okm.slice(0, length8);
}

// node_modules/@noble/hashes/esm/sha256.js
var SHA256_K = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_IV = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor() {
    super(64, 32, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

// node_modules/@chainsafe/libp2p-noise/dist/src/crypto/js.js
var pureJsCrypto = {
  hashSHA256(data) {
    return sha256(data);
  },
  getHKDF(ck, ikm) {
    const prk = extract(sha256, ikm, ck);
    const okmU8Array = expand(sha256, prk, void 0, 96);
    const okm = okmU8Array;
    const k1 = okm.subarray(0, 32);
    const k2 = okm.subarray(32, 64);
    const k3 = okm.subarray(64, 96);
    return [k1, k2, k3];
  },
  generateX25519KeyPair() {
    const secretKey = x25519.utils.randomPrivateKey();
    const publicKey = x25519.getPublicKey(secretKey);
    return {
      publicKey,
      privateKey: secretKey
    };
  },
  generateX25519KeyPairFromSeed(seed) {
    const publicKey = x25519.getPublicKey(seed);
    return {
      publicKey,
      privateKey: seed
    };
  },
  generateX25519SharedKey(privateKey, publicKey) {
    return x25519.getSharedSecret(privateKey, publicKey);
  },
  chaCha20Poly1305Encrypt(plaintext, nonce, ad, k) {
    return chacha20_poly1305(k, nonce, ad).encrypt(plaintext);
  },
  chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, dst) {
    const result = chacha20_poly1305(k, nonce, ad).decrypt(ciphertext);
    if (dst) {
      dst.set(result);
      return result;
    }
    return result;
  }
};

// node_modules/uint8arrays/dist/src/concat.js
function concat2(arrays, length8) {
  if (length8 == null) {
    length8 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output3 = allocUnsafe4(length8);
  let offset = 0;
  for (const arr of arrays) {
    output3.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array2(output3);
}

// node_modules/@chainsafe/libp2p-noise/dist/src/encoder.js
var allocUnsafe5 = (len) => {
  if (globalThis.Buffer) {
    return globalThis.Buffer.allocUnsafe(len);
  }
  return new Uint8Array(len);
};
var uint16BEEncode = (value) => {
  const target = allocUnsafe5(2);
  new DataView(target.buffer, target.byteOffset, target.byteLength).setUint16(0, value, false);
  return target;
};
uint16BEEncode.bytes = 2;
var uint16BEDecode = (data) => {
  if (data.length < 2)
    throw RangeError("Could not decode int16BE");
  if (data instanceof Uint8Array) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength).getUint16(0, false);
  }
  return data.getUint16(0);
};
uint16BEDecode.bytes = 2;
function encode0(message2) {
  return concat2([message2.ne, message2.ciphertext], message2.ne.length + message2.ciphertext.length);
}
function encode1(message2) {
  return concat2([message2.ne, message2.ns, message2.ciphertext], message2.ne.length + message2.ns.length + message2.ciphertext.length);
}
function encode22(message2) {
  return concat2([message2.ns, message2.ciphertext], message2.ns.length + message2.ciphertext.length);
}
function decode0(input) {
  if (input.length < 32) {
    throw new Error("Cannot decode stage 0 MessageBuffer: length less than 32 bytes.");
  }
  return {
    ne: input.subarray(0, 32),
    ciphertext: input.subarray(32, input.length),
    ns: new Uint8Array(0)
  };
}
function decode1(input) {
  if (input.length < 80) {
    throw new Error("Cannot decode stage 1 MessageBuffer: length less than 80 bytes.");
  }
  return {
    ne: input.subarray(0, 32),
    ns: input.subarray(32, 80),
    ciphertext: input.subarray(80, input.length)
  };
}
function decode22(input) {
  if (input.length < 48) {
    throw new Error("Cannot decode stage 2 MessageBuffer: length less than 48 bytes.");
  }
  return {
    ne: new Uint8Array(0),
    ns: input.subarray(0, 48),
    ciphertext: input.subarray(48, input.length)
  };
}

// node_modules/@chainsafe/libp2p-noise/dist/src/crypto/streaming.js
var CHACHA_TAG_LENGTH = 16;
function encryptStream(handshake, metrics) {
  return async function* (source) {
    for await (const chunk of source) {
      for (let i = 0; i < chunk.length; i += NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG) {
        let end = i + NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG;
        if (end > chunk.length) {
          end = chunk.length;
        }
        const data = handshake.encrypt(chunk.subarray(i, end), handshake.session);
        metrics?.encryptedPackets.increment();
        yield uint16BEEncode(data.byteLength);
        yield data;
      }
    }
  };
}
function decryptStream(handshake, metrics) {
  return async function* (source) {
    for await (const chunk of source) {
      for (let i = 0; i < chunk.length; i += NOISE_MSG_MAX_LENGTH_BYTES) {
        let end = i + NOISE_MSG_MAX_LENGTH_BYTES;
        if (end > chunk.length) {
          end = chunk.length;
        }
        if (end - CHACHA_TAG_LENGTH < i) {
          throw new Error("Invalid chunk");
        }
        const encrypted = chunk.subarray(i, end);
        const dst = chunk.subarray(i, end - CHACHA_TAG_LENGTH);
        const { plaintext: decrypted, valid } = handshake.decrypt(encrypted, handshake.session, dst);
        if (!valid) {
          metrics?.decryptErrors.increment();
          throw new Error("Failed to validate decrypted chunk");
        }
        metrics?.decryptedPackets.increment();
        yield decrypted;
      }
    }
  };
}

// node_modules/@libp2p/interface-connection-encrypter/dist/src/errors.js
var UnexpectedPeerError = class _UnexpectedPeerError extends Error {
  code;
  constructor(message2 = "Unexpected Peer") {
    super(message2);
    this.code = _UnexpectedPeerError.code;
  }
  static code = "ERR_UNEXPECTED_PEER";
};
var InvalidCryptoExchangeError = class _InvalidCryptoExchangeError extends Error {
  code;
  constructor(message2 = "Invalid crypto exchange") {
    super(message2);
    this.code = _InvalidCryptoExchangeError.code;
  }
  static code = "ERR_INVALID_CRYPTO_EXCHANGE";
};

// node_modules/@libp2p/crypto/dist/src/keys/index.js
var import_asn12 = __toESM(require_asn1(), 1);
var import_pbe = __toESM(require_pbe(), 1);

// node_modules/@libp2p/interfaces/dist/src/errors.js
var CodeError = class extends Error {
  code;
  props;
  constructor(message2, code7, props) {
    super(message2);
    this.code = code7;
    this.name = props?.name ?? "CodeError";
    this.props = props ?? {};
  }
};

// node_modules/@libp2p/crypto/dist/src/keys/index.js
var import_forge5 = __toESM(require_forge(), 1);

// node_modules/multiformats/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});

// node_modules/multiformats/vendor/base-x.js
function base(ALPHABET, name7) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode28(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length8 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length8) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      pbegin++;
    }
    var it2 = size - length8;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length8 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length8) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length8;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode33(string4) {
    var buffer = decodeUnsafe(string4);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name7} character`);
  }
  return {
    encode: encode28,
    decodeUnsafe,
    decode: decode33
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/multiformats/src/bytes.js
var empty = new Uint8Array(0);
var equals2 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b) => new TextDecoder().decode(b);

// node_modules/multiformats/src/bases/base.js
var Encoder = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name7, prefix, baseEncode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes3) {
    if (bytes3 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes3)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or = (left, right) => new ComposedDecoder(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
var Codec = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseEncode, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name7, prefix, baseEncode);
    this.decoder = new Decoder(name7, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name7, prefix, encode: encode28, decode: decode33 }) => new Codec(name7, prefix, encode28, decode33);
var baseX = ({ prefix, name: name7, alphabet: alphabet6 }) => {
  const { encode: encode28, decode: decode33 } = base_x_default(alphabet6, name7);
  return from({
    prefix,
    name: name7,
    encode: encode28,
    /**
     * @param {string} text
     */
    decode: (text) => coerce(decode33(text))
  });
};
var decode3 = (string4, alphabet6, bitsPerChar, name7) => {
  const codes2 = {};
  for (let i = 0; i < alphabet6.length; ++i) {
    codes2[alphabet6[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name7} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || 255 & buffer << 8 - bits2) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode3 = (data, alphabet6, bitsPerChar) => {
  const pad = alphabet6[alphabet6.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet6[mask & buffer >> bits2];
    }
  }
  if (bits2) {
    out += alphabet6[mask & buffer << bitsPerChar - bits2];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name7, prefix, bitsPerChar, alphabet: alphabet6 }) => {
  return from({
    prefix,
    name: name7,
    encode(input) {
      return encode3(input, alphabet6, bitsPerChar);
    },
    decode(input) {
      return decode3(input, alphabet6, bitsPerChar, name7);
    }
  });
};

// node_modules/multiformats/src/bases/base10.js
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/multiformats/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/multiformats/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/multiformats/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = (
  /** @type {string[]} */
  alphabet.reduce(
    (p, c, i) => {
      p[i] = c;
      return p;
    },
    /** @type {string[]} */
    []
  )
);
var alphabetCharsToBytes = (
  /** @type {number[]} */
  alphabet.reduce(
    (p, c, i) => {
      p[
        /** @type {number} */
        c.codePointAt(0)
      ] = i;
      return p;
    },
    /** @type {number[]} */
    []
  )
);
function encode4(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode4(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[
      /** @type {number} */
      char.codePointAt(0)
    ];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode4,
  decode: decode4
});

// node_modules/multiformats/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/multiformats/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/multiformats/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/multiformats/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/multiformats/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/multiformats/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity = from({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// node_modules/multiformats/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/multiformats/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});

// node_modules/multiformats/vendor/varint.js
var encode_1 = encode5;
var MSB2 = 128;
var REST2 = 127;
var MSBALL = ~REST2;
var INT = Math.pow(2, 31);
function encode5(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB2;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB2;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode5.bytes = offset - oldOffset + 1;
  return out;
}
var decode5 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N13 = Math.pow(2, 7);
var N23 = Math.pow(2, 14);
var N33 = Math.pow(2, 21);
var N43 = Math.pow(2, 28);
var N53 = Math.pow(2, 35);
var N63 = Math.pow(2, 42);
var N73 = Math.pow(2, 49);
var N82 = Math.pow(2, 56);
var N92 = Math.pow(2, 63);
var length = function(value) {
  return value < N13 ? 1 : value < N23 ? 2 : value < N33 ? 3 : value < N43 ? 4 : value < N53 ? 5 : value < N63 ? 6 : value < N73 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode5,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/multiformats/src/varint.js
var decode6 = (data, offset = 0) => {
  const code7 = varint_default.decode(data, offset);
  return [code7, varint_default.decode.bytes];
};
var encodeTo = (int, target, offset = 0) => {
  varint_default.encode(int, target, offset);
  return target;
};
var encodingLength2 = (int) => {
  return varint_default.encodingLength(int);
};

// node_modules/multiformats/src/hashes/digest.js
var create = (code7, digest7) => {
  const size = digest7.byteLength;
  const sizeOffset = encodingLength2(code7);
  const digestOffset = sizeOffset + encodingLength2(size);
  const bytes3 = new Uint8Array(digestOffset + size);
  encodeTo(code7, bytes3, 0);
  encodeTo(size, bytes3, sizeOffset);
  bytes3.set(digest7, digestOffset);
  return new Digest(code7, size, digest7, bytes3);
};
var decode7 = (multihash) => {
  const bytes3 = coerce(multihash);
  const [code7, sizeOffset] = decode6(bytes3);
  const [size, digestOffset] = decode6(bytes3.subarray(sizeOffset));
  const digest7 = bytes3.subarray(sizeOffset + digestOffset);
  if (digest7.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code7, size, digest7, bytes3);
};
var equals3 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    const data = (
      /** @type {{code?:unknown, size?:unknown, bytes?:unknown}} */
      b
    );
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals2(a.bytes, data.bytes);
  }
};
var Digest = class {
  /**
   * Creates a multihash digest.
   *
   * @param {Code} code
   * @param {Size} size
   * @param {Uint8Array} digest
   * @param {Uint8Array} bytes
   */
  constructor(code7, size, digest7, bytes3) {
    this.code = code7;
    this.size = size;
    this.digest = digest7;
    this.bytes = bytes3;
  }
};

// node_modules/multiformats/src/hashes/identity.js
var code = 0;
var name = "identity";
var encode6 = coerce;
var digest = (input) => create(code, encode6(input));
var identity2 = { code, name, encode: encode6, digest };

// node_modules/multiformats/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha2562,
  sha512: () => sha512
});

// node_modules/multiformats/src/hashes/hasher.js
var from2 = ({ name: name7, code: code7, encode: encode28 }) => new Hasher(name7, code7, encode28);
var Hasher = class {
  /**
   *
   * @param {Name} name
   * @param {Code} code
   * @param {(input: Uint8Array) => Await<Uint8Array>} encode
   */
  constructor(name7, code7, encode28) {
    this.name = name7;
    this.code = code7;
    this.encode = encode28;
  }
  /**
   * @param {Uint8Array} input
   * @returns {Await<Digest.Digest<Code, number>>}
   */
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest7) => create(this.code, digest7));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/multiformats/src/hashes/sha2-browser.js
var sha = (name7) => (
  /**
   * @param {Uint8Array} data
   */
  async (data) => new Uint8Array(await crypto.subtle.digest(name7, data))
);
var sha2562 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/multiformats/src/cid.js
var format = (link, base11) => {
  const { bytes: bytes3, version } = link;
  switch (version) {
    case 0:
      return toStringV0(
        bytes3,
        baseCache(link),
        /** @type {API.MultibaseEncoder<"z">} */
        base11 || base58btc.encoder
      );
    default:
      return toStringV1(
        bytes3,
        baseCache(link),
        /** @type {API.MultibaseEncoder<Prefix>} */
        base11 || base32.encoder
      );
  }
};
var cache = /* @__PURE__ */ new WeakMap();
var baseCache = (cid) => {
  const baseCache6 = cache.get(cid);
  if (baseCache6 == null) {
    const baseCache7 = /* @__PURE__ */ new Map();
    cache.set(cid, baseCache7);
    return baseCache7;
  }
  return baseCache6;
};
var CID = class _CID {
  /**
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} multihash - (Multi)hash of the of the content.
   * @param {Uint8Array} bytes
   */
  constructor(version, code7, multihash, bytes3) {
    this.code = code7;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes3;
    this["/"] = bytes3;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  /**
   * @returns {CID<Data, API.DAG_PB, API.SHA_256, 0>}
   */
  toV0() {
    switch (this.version) {
      case 0: {
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          this
        );
      }
      case 1: {
        const { code: code7, multihash } = this;
        if (code7 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          _CID.createV0(
            /** @type {API.MultihashDigest<API.SHA_256>} */
            multihash
          )
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 0. This is a bug please report`
        );
      }
    }
  }
  /**
   * @returns {CID<Data, Format, Alg, 1>}
   */
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code7, digest: digest7 } = this.multihash;
        const multihash = create(code7, digest7);
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          _CID.createV1(this.code, multihash)
        );
      }
      case 1: {
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          this
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 1. This is a bug please report`
        );
      }
    }
  }
  /**
   * @param {unknown} other
   * @returns {other is CID<Data, Format, Alg, Version>}
   */
  equals(other) {
    return _CID.equals(this, other);
  }
  /**
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {API.Link<Data, Format, Alg, Version>} self
   * @param {unknown} other
   * @returns {other is CID}
   */
  static equals(self2, other) {
    const unknown = (
      /** @type {{code?:unknown, version?:unknown, multihash?:unknown}} */
      other
    );
    return unknown && self2.code === unknown.code && self2.version === unknown.version && equals3(self2.multihash, unknown.multihash);
  }
  /**
   * @param {API.MultibaseEncoder<string>} [base]
   * @returns {string}
   */
  toString(base11) {
    return format(this, base11);
  }
  /**
   * @returns {API.LinkJSON<this>}
   */
  toJSON() {
    return { "/": format(this) };
  }
  link() {
    return this;
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @template {unknown} U
   * @param {API.Link<Data, Format, Alg, Version>|U} input
   * @returns {CID<Data, Format, Alg, Version>|null}
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = (
      /** @type {any} */
      input
    );
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code7, multihash, bytes: bytes3 } = value;
      return new _CID(
        version,
        code7,
        /** @type {API.MultihashDigest<Alg>} */
        multihash,
        bytes3 || encodeCID(version, code7, multihash.bytes)
      );
    } else if (value[cidSymbol] === true) {
      const { version, multihash, code: code7 } = value;
      const digest7 = (
        /** @type {API.MultihashDigest<Alg>} */
        decode7(multihash)
      );
      return _CID.create(version, code7, digest7);
    } else {
      return null;
    }
  }
  /**
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} digest - (Multi)hash of the of the content.
   * @returns {CID<Data, Format, Alg, Version>}
   */
  static create(version, code7, digest7) {
    if (typeof code7 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest7.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code7 !== DAG_PB_CODE) {
          throw new Error(
            `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`
          );
        } else {
          return new _CID(version, code7, digest7, digest7.bytes);
        }
      }
      case 1: {
        const bytes3 = encodeCID(version, code7, digest7.bytes);
        return new _CID(version, code7, digest7, bytes3);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   *
   * @template {unknown} [T=unknown]
   * @param {API.MultihashDigest<typeof SHA_256_CODE>} digest - Multihash.
   * @returns {CID<T, typeof DAG_PB_CODE, typeof SHA_256_CODE, 0>}
   */
  static createV0(digest7) {
    return _CID.create(0, DAG_PB_CODE, digest7);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @param {Code} code - Content encoding format code.
   * @param {API.MultihashDigest<Alg>} digest - Miltihash of the content.
   * @returns {CID<Data, Code, Alg, 1>}
   */
  static createV1(code7, digest7) {
    return _CID.create(1, code7, digest7);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ByteView<API.Link<Data, Code, Alg, Ver>>} bytes
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static decode(bytes3) {
    const [cid, remainder] = _CID.decodeFirst(bytes3);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} bytes
   * @returns {[CID<T, C, A, V>, Uint8Array]}
   */
  static decodeFirst(bytes3) {
    const specs = _CID.inspectBytes(bytes3);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(
      bytes3.subarray(prefixSize, prefixSize + specs.multihashSize)
    );
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(
      specs.multihashSize - specs.digestSize
    );
    const digest7 = new Digest(
      specs.multihashCode,
      specs.digestSize,
      digestBytes,
      multihashBytes
    );
    const cid = specs.version === 0 ? _CID.createV0(
      /** @type {API.MultihashDigest<API.SHA_256>} */
      digest7
    ) : _CID.createV1(specs.codec, digest7);
    return [
      /** @type {CID<T, C, A, V>} */
      cid,
      bytes3.subarray(specs.size)
    ];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} initialBytes
   * @returns {{ version:V, codec:C, multihashCode:A, digestSize:number, multihashSize:number, size:number }}
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length8] = decode6(initialBytes.subarray(offset));
      offset += length8;
      return i;
    };
    let version = (
      /** @type {V} */
      next()
    );
    let codec = (
      /** @type {C} */
      DAG_PB_CODE
    );
    if (
      /** @type {number} */
      version === 18
    ) {
      version = /** @type {V} */
      0;
      offset = 0;
    } else {
      codec = /** @type {C} */
      next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = (
      /** @type {A} */
      next()
    );
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   *
   * @template {string} Prefix
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ToString<API.Link<Data, Code, Alg, Ver>, Prefix>} source
   * @param {API.MultibaseDecoder<Prefix>} [base]
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static parse(source, base11) {
    const [prefix, bytes3] = parseCIDtoBytes(source, base11);
    const cid = _CID.decode(bytes3);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache(cid).set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes = (source, base11) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base11 || base58btc;
      return [
        /** @type {Prefix} */
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base11 || base58btc;
      return [
        /** @type {Prefix} */
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base11 || base32;
      return [
        /** @type {Prefix} */
        base32.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base11 == null) {
        throw Error(
          "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
        );
      }
      return [
        /** @type {Prefix} */
        source[0],
        base11.decode(source)
      ];
    }
  }
};
var toStringV0 = (bytes3, cache6, base11) => {
  const { prefix } = base11;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base11.name} encoding`);
  }
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3).slice(1);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV1 = (bytes3, cache6, base11) => {
  const { prefix } = base11;
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
var encodeCID = (version, code7, multihash) => {
  const codeOffset = encodingLength2(version);
  const hashOffset = codeOffset + encodingLength2(code7);
  const bytes3 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version, bytes3, 0);
  encodeTo(code7, bytes3, codeOffset);
  bytes3.set(multihash, hashOffset);
  return bytes3;
};
var cidSymbol = Symbol.for("@ipld/js-cid/CID");

// node_modules/multiformats/src/basics.js
var bases = { ...identity_exports, ...base2_exports, ...base8_exports, ...base10_exports, ...base16_exports, ...base32_exports, ...base36_exports, ...base58_exports, ...base64_exports, ...base256emoji_exports };
var hashes = { ...sha2_browser_exports, ...identity_exports2 };

// node_modules/uint8arrays/dist/src/util/bases.js
function createCodec(name7, prefix, encode28, decode33) {
  return {
    name: name7,
    prefix,
    encoder: {
      name: name7,
      prefix,
      encode: encode28
    },
    decoder: {
      decode: decode33
    }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string4 = "a";
  for (let i = 0; i < buf.length; i++) {
    string4 += String.fromCharCode(buf[i]);
  }
  return string4;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe4(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/uint8arrays/dist/src/from-string.js
function fromString2(string4, encoding = "utf8") {
  const base11 = bases_default[encoding];
  if (base11 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array2(globalThis.Buffer.from(string4, "utf-8"));
  }
  return base11.decoder.decode(`${base11.prefix}${string4}`);
}

// node_modules/@libp2p/crypto/dist/src/keys/ed25519-class.js
var ed25519_class_exports = {};
__export(ed25519_class_exports, {
  Ed25519PrivateKey: () => Ed25519PrivateKey,
  Ed25519PublicKey: () => Ed25519PublicKey,
  generateKeyPair: () => generateKeyPair,
  generateKeyPairFromSeed: () => generateKeyPairFromSeed,
  unmarshalEd25519PrivateKey: () => unmarshalEd25519PrivateKey,
  unmarshalEd25519PublicKey: () => unmarshalEd25519PublicKey
});

// node_modules/@libp2p/crypto/node_modules/multiformats/vendor/base-x.js
function base3(ALPHABET, name7) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode28(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length8 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length8) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      pbegin++;
    }
    var it2 = size - length8;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length8 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length8) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length8;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode33(string4) {
    var buffer = decodeUnsafe(string4);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name7} character`);
  }
  return {
    encode: encode28,
    decodeUnsafe,
    decode: decode33
  };
}
var src2 = base3;
var _brrp__multiformats_scope_baseX2 = src2;
var base_x_default2 = _brrp__multiformats_scope_baseX2;

// node_modules/@libp2p/crypto/node_modules/multiformats/src/bytes.js
var empty2 = new Uint8Array(0);
var coerce2 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};

// node_modules/@libp2p/crypto/node_modules/multiformats/src/bases/base.js
var Encoder2 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name7, prefix, baseEncode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes3) {
    if (bytes3 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes3)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder2 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or2(this, decoder);
  }
};
var ComposedDecoder2 = class {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or2(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or2 = (left, right) => new ComposedDecoder2(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
var Codec2 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseEncode, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder2(name7, prefix, baseEncode);
    this.decoder = new Decoder2(name7, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from3 = ({ name: name7, prefix, encode: encode28, decode: decode33 }) => new Codec2(name7, prefix, encode28, decode33);
var baseX2 = ({ prefix, name: name7, alphabet: alphabet6 }) => {
  const { encode: encode28, decode: decode33 } = base_x_default2(alphabet6, name7);
  return from3({
    prefix,
    name: name7,
    encode: encode28,
    /**
     * @param {string} text
     */
    decode: (text) => coerce2(decode33(text))
  });
};
var decode8 = (string4, alphabet6, bitsPerChar, name7) => {
  const codes2 = {};
  for (let i = 0; i < alphabet6.length; ++i) {
    codes2[alphabet6[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name7} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || 255 & buffer << 8 - bits2) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode7 = (data, alphabet6, bitsPerChar) => {
  const pad = alphabet6[alphabet6.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet6[mask & buffer >> bits2];
    }
  }
  if (bits2) {
    out += alphabet6[mask & buffer << bitsPerChar - bits2];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc46482 = ({ name: name7, prefix, bitsPerChar, alphabet: alphabet6 }) => {
  return from3({
    prefix,
    name: name7,
    encode(input) {
      return encode7(input, alphabet6, bitsPerChar);
    },
    decode(input) {
      return decode8(input, alphabet6, bitsPerChar, name7);
    }
  });
};

// node_modules/@libp2p/crypto/node_modules/multiformats/src/bases/base58.js
var base58btc2 = baseX2({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr2 = baseX2({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@libp2p/crypto/node_modules/multiformats/vendor/varint.js
var encode_12 = encode8;
var MSB3 = 128;
var REST3 = 127;
var MSBALL2 = ~REST3;
var INT2 = Math.pow(2, 31);
function encode8(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT2) {
    out[offset++] = num & 255 | MSB3;
    num /= 128;
  }
  while (num & MSBALL2) {
    out[offset++] = num & 255 | MSB3;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode8.bytes = offset - oldOffset + 1;
  return out;
}
var decode9 = read2;
var MSB$12 = 128;
var REST$12 = 127;
function read2(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read2.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$12) << shift : (b & REST$12) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$12);
  read2.bytes = counter - offset;
  return res;
}
var N14 = Math.pow(2, 7);
var N24 = Math.pow(2, 14);
var N34 = Math.pow(2, 21);
var N44 = Math.pow(2, 28);
var N54 = Math.pow(2, 35);
var N64 = Math.pow(2, 42);
var N74 = Math.pow(2, 49);
var N83 = Math.pow(2, 56);
var N93 = Math.pow(2, 63);
var length2 = function(value) {
  return value < N14 ? 1 : value < N24 ? 2 : value < N34 ? 3 : value < N44 ? 4 : value < N54 ? 5 : value < N64 ? 6 : value < N74 ? 7 : value < N83 ? 8 : value < N93 ? 9 : 10;
};
var varint2 = {
  encode: encode_12,
  decode: decode9,
  encodingLength: length2
};
var _brrp_varint2 = varint2;
var varint_default2 = _brrp_varint2;

// node_modules/@libp2p/crypto/node_modules/multiformats/src/varint.js
var encodeTo2 = (int, target, offset = 0) => {
  varint_default2.encode(int, target, offset);
  return target;
};
var encodingLength3 = (int) => {
  return varint_default2.encodingLength(int);
};

// node_modules/@libp2p/crypto/node_modules/multiformats/src/hashes/digest.js
var create2 = (code7, digest7) => {
  const size = digest7.byteLength;
  const sizeOffset = encodingLength3(code7);
  const digestOffset = sizeOffset + encodingLength3(size);
  const bytes3 = new Uint8Array(digestOffset + size);
  encodeTo2(code7, bytes3, 0);
  encodeTo2(size, bytes3, sizeOffset);
  bytes3.set(digest7, digestOffset);
  return new Digest2(code7, size, digest7, bytes3);
};
var Digest2 = class {
  /**
   * Creates a multihash digest.
   *
   * @param {Code} code
   * @param {Size} size
   * @param {Uint8Array} digest
   * @param {Uint8Array} bytes
   */
  constructor(code7, size, digest7, bytes3) {
    this.code = code7;
    this.size = size;
    this.digest = digest7;
    this.bytes = bytes3;
  }
};

// node_modules/@libp2p/crypto/node_modules/multiformats/src/hashes/identity.js
var code2 = 0;
var name2 = "identity";
var encode9 = coerce2;
var digest2 = (input) => create2(code2, encode9(input));
var identity3 = { code: code2, name: name2, encode: encode9, digest: digest2 };

// node_modules/@libp2p/crypto/node_modules/multiformats/src/hashes/hasher.js
var from4 = ({ name: name7, code: code7, encode: encode28 }) => new Hasher2(name7, code7, encode28);
var Hasher2 = class {
  /**
   *
   * @param {Name} name
   * @param {Code} code
   * @param {(input: Uint8Array) => Await<Uint8Array>} encode
   */
  constructor(name7, code7, encode28) {
    this.name = name7;
    this.code = code7;
    this.encode = encode28;
  }
  /**
   * @param {Uint8Array} input
   * @returns {Await<Digest.Digest<Code, number>>}
   */
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create2(this.code, result) : result.then((digest7) => create2(this.code, digest7));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@libp2p/crypto/node_modules/multiformats/src/hashes/sha2-browser.js
var sha2 = (name7) => (
  /**
   * @param {Uint8Array} data
   */
  async (data) => new Uint8Array(await crypto.subtle.digest(name7, data))
);
var sha2563 = from4({
  name: "sha2-256",
  code: 18,
  encode: sha2("SHA-256")
});
var sha5122 = from4({
  name: "sha2-512",
  code: 19,
  encode: sha2("SHA-512")
});

// node_modules/uint8arrays/dist/src/equals.js
function equals5(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/@noble/ed25519/lib/esm/index.js
var nodeCrypto = __toESM(require_crypto(), 1);
var _0n5 = BigInt(0);
var _1n4 = BigInt(1);
var _2n3 = BigInt(2);
var _8n3 = BigInt(8);
var CU_O = BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989");
var CURVE = Object.freeze({
  a: BigInt(-1),
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  P: BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),
  l: CU_O,
  n: CU_O,
  h: BigInt(8),
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960")
});
var POW_2_256 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
var SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
var SQRT_D = BigInt("6853475219497561581579357271197624642482790079785650197046958215289687604742");
var SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var ExtendedPoint = class _ExtendedPoint {
  constructor(x, y, z, t) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.t = t;
  }
  static fromAffine(p) {
    if (!(p instanceof Point)) {
      throw new TypeError("ExtendedPoint#fromAffine: expected Point");
    }
    if (p.equals(Point.ZERO))
      return _ExtendedPoint.ZERO;
    return new _ExtendedPoint(p.x, p.y, _1n4, mod2(p.x * p.y));
  }
  static toAffineBatch(points) {
    const toInv = invertBatch(points.map((p) => p.z));
    return points.map((p, i) => p.toAffine(toInv[i]));
  }
  static normalizeZ(points) {
    return this.toAffineBatch(points).map(this.fromAffine);
  }
  equals(other) {
    assertExtPoint(other);
    const { x: X1, y: Y1, z: Z1 } = this;
    const { x: X2, y: Y2, z: Z2 } = other;
    const X1Z2 = mod2(X1 * Z2);
    const X2Z1 = mod2(X2 * Z1);
    const Y1Z2 = mod2(Y1 * Z2);
    const Y2Z1 = mod2(Y2 * Z1);
    return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
  }
  negate() {
    return new _ExtendedPoint(mod2(-this.x), this.y, this.z, mod2(-this.t));
  }
  double() {
    const { x: X1, y: Y1, z: Z1 } = this;
    const { a } = CURVE;
    const A = mod2(X1 * X1);
    const B = mod2(Y1 * Y1);
    const C = mod2(_2n3 * mod2(Z1 * Z1));
    const D = mod2(a * A);
    const x1y1 = X1 + Y1;
    const E = mod2(mod2(x1y1 * x1y1) - A - B);
    const G = D + B;
    const F = G - C;
    const H = D - B;
    const X3 = mod2(E * F);
    const Y3 = mod2(G * H);
    const T3 = mod2(E * H);
    const Z3 = mod2(F * G);
    return new _ExtendedPoint(X3, Y3, Z3, T3);
  }
  add(other) {
    assertExtPoint(other);
    const { x: X1, y: Y1, z: Z1, t: T1 } = this;
    const { x: X2, y: Y2, z: Z2, t: T2 } = other;
    const A = mod2((Y1 - X1) * (Y2 + X2));
    const B = mod2((Y1 + X1) * (Y2 - X2));
    const F = mod2(B - A);
    if (F === _0n5)
      return this.double();
    const C = mod2(Z1 * _2n3 * T2);
    const D = mod2(T1 * _2n3 * Z2);
    const E = D + C;
    const G = B + A;
    const H = D - C;
    const X3 = mod2(E * F);
    const Y3 = mod2(G * H);
    const T3 = mod2(E * H);
    const Z3 = mod2(F * G);
    return new _ExtendedPoint(X3, Y3, Z3, T3);
  }
  subtract(other) {
    return this.add(other.negate());
  }
  precomputeWindow(W) {
    const windows = 1 + 256 / W;
    const points = [];
    let p = this;
    let base11 = p;
    for (let window2 = 0; window2 < windows; window2++) {
      base11 = p;
      points.push(base11);
      for (let i = 1; i < 2 ** (W - 1); i++) {
        base11 = base11.add(p);
        points.push(base11);
      }
      p = base11.double();
    }
    return points;
  }
  wNAF(n, affinePoint) {
    if (!affinePoint && this.equals(_ExtendedPoint.BASE))
      affinePoint = Point.BASE;
    const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
    if (256 % W) {
      throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
    }
    let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
    if (!precomputes) {
      precomputes = this.precomputeWindow(W);
      if (affinePoint && W !== 1) {
        precomputes = _ExtendedPoint.normalizeZ(precomputes);
        pointPrecomputes.set(affinePoint, precomputes);
      }
    }
    let p = _ExtendedPoint.ZERO;
    let f = _ExtendedPoint.BASE;
    const windows = 1 + 256 / W;
    const windowSize = 2 ** (W - 1);
    const mask = BigInt(2 ** W - 1);
    const maxNumber = 2 ** W;
    const shiftBy = BigInt(W);
    for (let window2 = 0; window2 < windows; window2++) {
      const offset = window2 * windowSize;
      let wbits = Number(n & mask);
      n >>= shiftBy;
      if (wbits > windowSize) {
        wbits -= maxNumber;
        n += _1n4;
      }
      const offset1 = offset;
      const offset2 = offset + Math.abs(wbits) - 1;
      const cond1 = window2 % 2 !== 0;
      const cond2 = wbits < 0;
      if (wbits === 0) {
        f = f.add(constTimeNegate(cond1, precomputes[offset1]));
      } else {
        p = p.add(constTimeNegate(cond2, precomputes[offset2]));
      }
    }
    return _ExtendedPoint.normalizeZ([p, f])[0];
  }
  multiply(scalar, affinePoint) {
    return this.wNAF(normalizeScalar(scalar, CURVE.l), affinePoint);
  }
  multiplyUnsafe(scalar) {
    let n = normalizeScalar(scalar, CURVE.l, false);
    const G = _ExtendedPoint.BASE;
    const P0 = _ExtendedPoint.ZERO;
    if (n === _0n5)
      return P0;
    if (this.equals(P0) || n === _1n4)
      return this;
    if (this.equals(G))
      return this.wNAF(n);
    let p = P0;
    let d = this;
    while (n > _0n5) {
      if (n & _1n4)
        p = p.add(d);
      d = d.double();
      n >>= _1n4;
    }
    return p;
  }
  isSmallOrder() {
    return this.multiplyUnsafe(CURVE.h).equals(_ExtendedPoint.ZERO);
  }
  isTorsionFree() {
    let p = this.multiplyUnsafe(CURVE.l / _2n3).double();
    if (CURVE.l % _2n3)
      p = p.add(this);
    return p.equals(_ExtendedPoint.ZERO);
  }
  toAffine(invZ) {
    const { x, y, z } = this;
    const is0 = this.equals(_ExtendedPoint.ZERO);
    if (invZ == null)
      invZ = is0 ? _8n3 : invert(z);
    const ax = mod2(x * invZ);
    const ay = mod2(y * invZ);
    const zz = mod2(z * invZ);
    if (is0)
      return Point.ZERO;
    if (zz !== _1n4)
      throw new Error("invZ was invalid");
    return new Point(ax, ay);
  }
  fromRistrettoBytes() {
    legacyRist();
  }
  toRistrettoBytes() {
    legacyRist();
  }
  fromRistrettoHash() {
    legacyRist();
  }
};
ExtendedPoint.BASE = new ExtendedPoint(CURVE.Gx, CURVE.Gy, _1n4, mod2(CURVE.Gx * CURVE.Gy));
ExtendedPoint.ZERO = new ExtendedPoint(_0n5, _1n4, _1n4, _0n5);
function constTimeNegate(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function assertExtPoint(other) {
  if (!(other instanceof ExtendedPoint))
    throw new TypeError("ExtendedPoint expected");
}
function assertRstPoint(other) {
  if (!(other instanceof RistrettoPoint))
    throw new TypeError("RistrettoPoint expected");
}
function legacyRist() {
  throw new Error("Legacy method: switch to RistrettoPoint");
}
var RistrettoPoint = class _RistrettoPoint {
  constructor(ep) {
    this.ep = ep;
  }
  static calcElligatorRistrettoMap(r0) {
    const { d } = CURVE;
    const r = mod2(SQRT_M1 * r0 * r0);
    const Ns = mod2((r + _1n4) * ONE_MINUS_D_SQ);
    let c = BigInt(-1);
    const D = mod2((c - d * r) * mod2(r + d));
    let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
    let s_ = mod2(s * r0);
    if (!edIsNegative(s_))
      s_ = mod2(-s_);
    if (!Ns_D_is_sq)
      s = s_;
    if (!Ns_D_is_sq)
      c = r;
    const Nt = mod2(c * (r - _1n4) * D_MINUS_ONE_SQ - D);
    const s2 = s * s;
    const W0 = mod2((s + s) * D);
    const W1 = mod2(Nt * SQRT_AD_MINUS_ONE);
    const W2 = mod2(_1n4 - s2);
    const W3 = mod2(_1n4 + s2);
    return new ExtendedPoint(mod2(W0 * W3), mod2(W2 * W1), mod2(W1 * W3), mod2(W0 * W2));
  }
  static hashToCurve(hex) {
    hex = ensureBytes3(hex, 64);
    const r1 = bytes255ToNumberLE(hex.slice(0, 32));
    const R1 = this.calcElligatorRistrettoMap(r1);
    const r2 = bytes255ToNumberLE(hex.slice(32, 64));
    const R2 = this.calcElligatorRistrettoMap(r2);
    return new _RistrettoPoint(R1.add(R2));
  }
  static fromHex(hex) {
    hex = ensureBytes3(hex, 32);
    const { a, d } = CURVE;
    const emsg = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint";
    const s = bytes255ToNumberLE(hex);
    if (!equalBytes2(numberTo32BytesLE(s), hex) || edIsNegative(s))
      throw new Error(emsg);
    const s2 = mod2(s * s);
    const u1 = mod2(_1n4 + a * s2);
    const u2 = mod2(_1n4 - a * s2);
    const u1_2 = mod2(u1 * u1);
    const u2_2 = mod2(u2 * u2);
    const v = mod2(a * d * u1_2 - u2_2);
    const { isValid, value: I } = invertSqrt(mod2(v * u2_2));
    const Dx = mod2(I * u2);
    const Dy = mod2(I * Dx * v);
    let x = mod2((s + s) * Dx);
    if (edIsNegative(x))
      x = mod2(-x);
    const y = mod2(u1 * Dy);
    const t = mod2(x * y);
    if (!isValid || edIsNegative(t) || y === _0n5)
      throw new Error(emsg);
    return new _RistrettoPoint(new ExtendedPoint(x, y, _1n4, t));
  }
  toRawBytes() {
    let { x, y, z, t } = this.ep;
    const u1 = mod2(mod2(z + y) * mod2(z - y));
    const u2 = mod2(x * y);
    const u2sq = mod2(u2 * u2);
    const { value: invsqrt } = invertSqrt(mod2(u1 * u2sq));
    const D1 = mod2(invsqrt * u1);
    const D2 = mod2(invsqrt * u2);
    const zInv = mod2(D1 * D2 * t);
    let D;
    if (edIsNegative(t * zInv)) {
      let _x = mod2(y * SQRT_M1);
      let _y = mod2(x * SQRT_M1);
      x = _x;
      y = _y;
      D = mod2(D1 * INVSQRT_A_MINUS_D);
    } else {
      D = D2;
    }
    if (edIsNegative(x * zInv))
      y = mod2(-y);
    let s = mod2((z - y) * D);
    if (edIsNegative(s))
      s = mod2(-s);
    return numberTo32BytesLE(s);
  }
  toHex() {
    return bytesToHex2(this.toRawBytes());
  }
  toString() {
    return this.toHex();
  }
  equals(other) {
    assertRstPoint(other);
    const a = this.ep;
    const b = other.ep;
    const one = mod2(a.x * b.y) === mod2(a.y * b.x);
    const two = mod2(a.y * b.y) === mod2(a.x * b.x);
    return one || two;
  }
  add(other) {
    assertRstPoint(other);
    return new _RistrettoPoint(this.ep.add(other.ep));
  }
  subtract(other) {
    assertRstPoint(other);
    return new _RistrettoPoint(this.ep.subtract(other.ep));
  }
  multiply(scalar) {
    return new _RistrettoPoint(this.ep.multiply(scalar));
  }
  multiplyUnsafe(scalar) {
    return new _RistrettoPoint(this.ep.multiplyUnsafe(scalar));
  }
};
RistrettoPoint.BASE = new RistrettoPoint(ExtendedPoint.BASE);
RistrettoPoint.ZERO = new RistrettoPoint(ExtendedPoint.ZERO);
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var Point = class _Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  _setWindowSize(windowSize) {
    this._WINDOW_SIZE = windowSize;
    pointPrecomputes.delete(this);
  }
  static fromHex(hex, strict = true) {
    const { d, P } = CURVE;
    hex = ensureBytes3(hex, 32);
    const normed = hex.slice();
    normed[31] = hex[31] & ~128;
    const y = bytesToNumberLE2(normed);
    if (strict && y >= P)
      throw new Error("Expected 0 < hex < P");
    if (!strict && y >= POW_2_256)
      throw new Error("Expected 0 < hex < 2**256");
    const y2 = mod2(y * y);
    const u = mod2(y2 - _1n4);
    const v = mod2(d * y2 + _1n4);
    let { isValid, value: x } = uvRatio(u, v);
    if (!isValid)
      throw new Error("Point.fromHex: invalid y coordinate");
    const isXOdd = (x & _1n4) === _1n4;
    const isLastByteOdd = (hex[31] & 128) !== 0;
    if (isLastByteOdd !== isXOdd) {
      x = mod2(-x);
    }
    return new _Point(x, y);
  }
  static async fromPrivateKey(privateKey) {
    return (await getExtendedPublicKey(privateKey)).point;
  }
  toRawBytes() {
    const bytes3 = numberTo32BytesLE(this.y);
    bytes3[31] |= this.x & _1n4 ? 128 : 0;
    return bytes3;
  }
  toHex() {
    return bytesToHex2(this.toRawBytes());
  }
  toX25519() {
    const { y } = this;
    const u = mod2((_1n4 + y) * invert(_1n4 - y));
    return numberTo32BytesLE(u);
  }
  isTorsionFree() {
    return ExtendedPoint.fromAffine(this).isTorsionFree();
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  negate() {
    return new _Point(mod2(-this.x), this.y);
  }
  add(other) {
    return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
  }
  subtract(other) {
    return this.add(other.negate());
  }
  multiply(scalar) {
    return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
  }
};
Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
Point.ZERO = new Point(_0n5, _1n4);
var Signature = class _Signature {
  constructor(r, s) {
    this.r = r;
    this.s = s;
    this.assertValidity();
  }
  static fromHex(hex) {
    const bytes3 = ensureBytes3(hex, 64);
    const r = Point.fromHex(bytes3.slice(0, 32), false);
    const s = bytesToNumberLE2(bytes3.slice(32, 64));
    return new _Signature(r, s);
  }
  assertValidity() {
    const { r, s } = this;
    if (!(r instanceof Point))
      throw new Error("Expected Point instance");
    normalizeScalar(s, CURVE.l, false);
    return this;
  }
  toRawBytes() {
    const u8 = new Uint8Array(64);
    u8.set(this.r.toRawBytes());
    u8.set(numberTo32BytesLE(this.s), 32);
    return u8;
  }
  toHex() {
    return bytesToHex2(this.toRawBytes());
  }
};
function concatBytes2(...arrays) {
  if (!arrays.every((a) => a instanceof Uint8Array))
    throw new Error("Expected Uint8Array list");
  if (arrays.length === 1)
    return arrays[0];
  const length8 = arrays.reduce((a, arr) => a + arr.length, 0);
  const result = new Uint8Array(length8);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, pad);
    pad += arr.length;
  }
  return result;
}
var hexes2 = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
function bytesToHex2(uint8a) {
  if (!(uint8a instanceof Uint8Array))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes2[uint8a[i]];
  }
  return hex;
}
function hexToBytes2(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToBytes: expected string, got " + typeof hex);
  }
  if (hex.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex");
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}
function numberTo32BytesBE(num) {
  const length8 = 32;
  const hex = num.toString(16).padStart(length8 * 2, "0");
  return hexToBytes2(hex);
}
function numberTo32BytesLE(num) {
  return numberTo32BytesBE(num).reverse();
}
function edIsNegative(num) {
  return (mod2(num) & _1n4) === _1n4;
}
function bytesToNumberLE2(uint8a) {
  if (!(uint8a instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  return BigInt("0x" + bytesToHex2(Uint8Array.from(uint8a).reverse()));
}
var MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function bytes255ToNumberLE(bytes3) {
  return mod2(bytesToNumberLE2(bytes3) & MAX_255B);
}
function mod2(a, b = CURVE.P) {
  const res = a % b;
  return res >= _0n5 ? res : b + res;
}
function invert(number3, modulo = CURVE.P) {
  if (number3 === _0n5 || modulo <= _0n5) {
    throw new Error(`invert: expected positive integers, got n=${number3} mod=${modulo}`);
  }
  let a = mod2(number3, modulo);
  let b = modulo;
  let x = _0n5, y = _1n4, u = _1n4, v = _0n5;
  while (a !== _0n5) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n4)
    throw new Error("invert: does not exist");
  return mod2(x, modulo);
}
function invertBatch(nums, p = CURVE.P) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (num === _0n5)
      return acc;
    tmp[i] = acc;
    return mod2(acc * num, p);
  }, _1n4);
  const inverted = invert(lastMultiplied, p);
  nums.reduceRight((acc, num, i) => {
    if (num === _0n5)
      return acc;
    tmp[i] = mod2(acc * tmp[i], p);
    return mod2(acc * num, p);
  }, inverted);
  return tmp;
}
function pow22(x, power) {
  const { P } = CURVE;
  let res = x;
  while (power-- > _0n5) {
    res *= res;
    res %= P;
  }
  return res;
}
function pow_2_252_3(x) {
  const { P } = CURVE;
  const _5n3 = BigInt(5);
  const _10n = BigInt(10);
  const _20n = BigInt(20);
  const _40n = BigInt(40);
  const _80n = BigInt(80);
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow22(b2, _2n3) * b2 % P;
  const b5 = pow22(b4, _1n4) * x % P;
  const b10 = pow22(b5, _5n3) * b5 % P;
  const b20 = pow22(b10, _10n) * b10 % P;
  const b40 = pow22(b20, _20n) * b20 % P;
  const b80 = pow22(b40, _40n) * b40 % P;
  const b160 = pow22(b80, _80n) * b80 % P;
  const b240 = pow22(b160, _80n) * b80 % P;
  const b250 = pow22(b240, _10n) * b10 % P;
  const pow_p_5_8 = pow22(b250, _2n3) * x % P;
  return { pow_p_5_8, b2 };
}
function uvRatio(u, v) {
  const v3 = mod2(v * v * v);
  const v7 = mod2(v3 * v3 * v);
  const pow3 = pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod2(u * v3 * pow3);
  const vx2 = mod2(v * x * x);
  const root1 = x;
  const root2 = mod2(x * SQRT_M1);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod2(-u);
  const noRoot = vx2 === mod2(-u * SQRT_M1);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (edIsNegative(x))
    x = mod2(-x);
  return { isValid: useRoot1 || useRoot2, value: x };
}
function invertSqrt(number3) {
  return uvRatio(_1n4, number3);
}
function modlLE(hash3) {
  return mod2(bytesToNumberLE2(hash3), CURVE.l);
}
function equalBytes2(b1, b2) {
  if (b1.length !== b2.length) {
    return false;
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] !== b2[i]) {
      return false;
    }
  }
  return true;
}
function ensureBytes3(hex, expectedLength) {
  const bytes3 = hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes2(hex);
  if (typeof expectedLength === "number" && bytes3.length !== expectedLength)
    throw new Error(`Expected ${expectedLength} bytes`);
  return bytes3;
}
function normalizeScalar(num, max, strict = true) {
  if (!max)
    throw new TypeError("Specify max value");
  if (typeof num === "number" && Number.isSafeInteger(num))
    num = BigInt(num);
  if (typeof num === "bigint" && num < max) {
    if (strict) {
      if (_0n5 < num)
        return num;
    } else {
      if (_0n5 <= num)
        return num;
    }
  }
  throw new TypeError("Expected valid scalar: 0 < scalar < max");
}
function adjustBytes25519(bytes3) {
  bytes3[0] &= 248;
  bytes3[31] &= 127;
  bytes3[31] |= 64;
  return bytes3;
}
function checkPrivateKey(key) {
  key = typeof key === "bigint" || typeof key === "number" ? numberTo32BytesBE(normalizeScalar(key, POW_2_256)) : ensureBytes3(key);
  if (key.length !== 32)
    throw new Error(`Expected 32 bytes`);
  return key;
}
function getKeyFromHash(hashed) {
  const head = adjustBytes25519(hashed.slice(0, 32));
  const prefix = hashed.slice(32, 64);
  const scalar = modlLE(head);
  const point = Point.BASE.multiply(scalar);
  const pointBytes = point.toRawBytes();
  return { head, prefix, scalar, point, pointBytes };
}
var _sha512Sync;
async function getExtendedPublicKey(key) {
  return getKeyFromHash(await utils.sha512(checkPrivateKey(key)));
}
async function getPublicKey(privateKey) {
  return (await getExtendedPublicKey(privateKey)).pointBytes;
}
async function sign(message2, privateKey) {
  message2 = ensureBytes3(message2);
  const { prefix, scalar, pointBytes } = await getExtendedPublicKey(privateKey);
  const r = modlLE(await utils.sha512(prefix, message2));
  const R = Point.BASE.multiply(r);
  const k = modlLE(await utils.sha512(R.toRawBytes(), pointBytes, message2));
  const s = mod2(r + k * scalar, CURVE.l);
  return new Signature(R, s).toRawBytes();
}
function prepareVerification(sig, message2, publicKey) {
  message2 = ensureBytes3(message2);
  if (!(publicKey instanceof Point))
    publicKey = Point.fromHex(publicKey, false);
  const { r, s } = sig instanceof Signature ? sig.assertValidity() : Signature.fromHex(sig);
  const SB = ExtendedPoint.BASE.multiplyUnsafe(s);
  return { r, s, SB, pub: publicKey, msg: message2 };
}
function finishVerification(publicKey, r, SB, hashed) {
  const k = modlLE(hashed);
  const kA = ExtendedPoint.fromAffine(publicKey).multiplyUnsafe(k);
  const RkA = ExtendedPoint.fromAffine(r).add(kA);
  return RkA.subtract(SB).multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
}
async function verify(sig, message2, publicKey) {
  const { r, SB, msg, pub } = prepareVerification(sig, message2, publicKey);
  const hashed = await utils.sha512(r.toRawBytes(), pub.toRawBytes(), msg);
  return finishVerification(pub, r, SB, hashed);
}
Point.BASE._setWindowSize(8);
var crypto3 = {
  node: nodeCrypto,
  web: typeof self === "object" && "crypto" in self ? self.crypto : void 0
};
var utils = {
  bytesToHex: bytesToHex2,
  hexToBytes: hexToBytes2,
  concatBytes: concatBytes2,
  getExtendedPublicKey,
  mod: mod2,
  invert,
  TORSION_SUBGROUP: [
    "0100000000000000000000000000000000000000000000000000000000000000",
    "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
    "0000000000000000000000000000000000000000000000000000000000000080",
    "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
    "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
    "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
    "0000000000000000000000000000000000000000000000000000000000000000",
    "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"
  ],
  hashToPrivateScalar: (hash3) => {
    hash3 = ensureBytes3(hash3);
    if (hash3.length < 40 || hash3.length > 1024)
      throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
    return mod2(bytesToNumberLE2(hash3), CURVE.l - _1n4) + _1n4;
  },
  randomBytes: (bytesLength = 32) => {
    if (crypto3.web) {
      return crypto3.web.getRandomValues(new Uint8Array(bytesLength));
    } else if (crypto3.node) {
      const { randomBytes: randomBytes3 } = crypto3.node;
      return new Uint8Array(randomBytes3(bytesLength).buffer);
    } else {
      throw new Error("The environment doesn't have randomBytes function");
    }
  },
  randomPrivateKey: () => {
    return utils.randomBytes(32);
  },
  sha512: async (...messages) => {
    const message2 = concatBytes2(...messages);
    if (crypto3.web) {
      const buffer = await crypto3.web.subtle.digest("SHA-512", message2.buffer);
      return new Uint8Array(buffer);
    } else if (crypto3.node) {
      return Uint8Array.from(crypto3.node.createHash("sha512").update(message2).digest());
    } else {
      throw new Error("The environment doesn't have sha512 function");
    }
  },
  precompute(windowSize = 8, point = Point.BASE) {
    const cached = point.equals(Point.BASE) ? point : new Point(point.x, point.y);
    cached._setWindowSize(windowSize);
    cached.multiply(_2n3);
    return cached;
  },
  sha512Sync: void 0
};
Object.defineProperties(utils, {
  sha512Sync: {
    configurable: false,
    get() {
      return _sha512Sync;
    },
    set(val) {
      if (!_sha512Sync)
        _sha512Sync = val;
    }
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/ed25519-browser.js
var PUBLIC_KEY_BYTE_LENGTH = 32;
var PRIVATE_KEY_BYTE_LENGTH = 64;
var KEYS_BYTE_LENGTH = 32;
async function generateKey() {
  const privateKeyRaw = utils.randomPrivateKey();
  const publicKey = await getPublicKey(privateKeyRaw);
  const privateKey = concatKeys(privateKeyRaw, publicKey);
  return {
    privateKey,
    publicKey
  };
}
async function generateKeyFromSeed(seed) {
  if (seed.length !== KEYS_BYTE_LENGTH) {
    throw new TypeError('"seed" must be 32 bytes in length.');
  } else if (!(seed instanceof Uint8Array)) {
    throw new TypeError('"seed" must be a node.js Buffer, or Uint8Array.');
  }
  const privateKeyRaw = seed;
  const publicKey = await getPublicKey(privateKeyRaw);
  const privateKey = concatKeys(privateKeyRaw, publicKey);
  return {
    privateKey,
    publicKey
  };
}
async function hashAndSign(privateKey, msg) {
  const privateKeyRaw = privateKey.subarray(0, KEYS_BYTE_LENGTH);
  return sign(msg, privateKeyRaw);
}
async function hashAndVerify(publicKey, sig, msg) {
  return verify(sig, msg, publicKey);
}
function concatKeys(privateKeyRaw, publicKey) {
  const privateKey = new Uint8Array(PRIVATE_KEY_BYTE_LENGTH);
  for (let i = 0; i < KEYS_BYTE_LENGTH; i++) {
    privateKey[i] = privateKeyRaw[i];
    privateKey[KEYS_BYTE_LENGTH + i] = publicKey[i];
  }
  return privateKey;
}

// node_modules/@libp2p/crypto/node_modules/multiformats/src/bases/base64.js
var base642 = rfc46482({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad2 = rfc46482({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url2 = rfc46482({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad2 = rfc46482({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@libp2p/crypto/dist/src/webcrypto.js
var webcrypto_default = {
  get(win = globalThis) {
    const nativeCrypto = win.crypto;
    if (nativeCrypto == null || nativeCrypto.subtle == null) {
      throw Object.assign(new Error("Missing Web Crypto API. The most likely cause of this error is that this page is being accessed from an insecure context (i.e. not HTTPS). For more information and possible resolutions see https://github.com/libp2p/js-libp2p-crypto/blob/master/README.md#web-crypto-api"), { code: "ERR_MISSING_WEB_CRYPTO" });
    }
    return nativeCrypto;
  }
};

// node_modules/@libp2p/crypto/dist/src/ciphers/aes-gcm.browser.js
var derivedEmptyPasswordKey = { alg: "A128GCM", ext: true, k: "scm9jmO_4BJAgdwWGVulLg", key_ops: ["encrypt", "decrypt"], kty: "oct" };
function create3(opts) {
  const algorithm = opts?.algorithm ?? "AES-GCM";
  let keyLength = opts?.keyLength ?? 16;
  const nonceLength = opts?.nonceLength ?? 12;
  const digest7 = opts?.digest ?? "SHA-256";
  const saltLength = opts?.saltLength ?? 16;
  const iterations = opts?.iterations ?? 32767;
  const crypto5 = webcrypto_default.get();
  keyLength *= 8;
  async function encrypt2(data, password) {
    const salt = crypto5.getRandomValues(new Uint8Array(saltLength));
    const nonce = crypto5.getRandomValues(new Uint8Array(nonceLength));
    const aesGcm = { name: algorithm, iv: nonce };
    if (typeof password === "string") {
      password = fromString2(password);
    }
    let cryptoKey;
    if (password.length === 0) {
      cryptoKey = await crypto5.subtle.importKey("jwk", derivedEmptyPasswordKey, { name: "AES-GCM" }, true, ["encrypt"]);
      try {
        const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest7 } };
        const runtimeDerivedEmptyPassword = await crypto5.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
        cryptoKey = await crypto5.subtle.deriveKey(deriveParams, runtimeDerivedEmptyPassword, { name: algorithm, length: keyLength }, true, ["encrypt"]);
      } catch {
        cryptoKey = await crypto5.subtle.importKey("jwk", derivedEmptyPasswordKey, { name: "AES-GCM" }, true, ["encrypt"]);
      }
    } else {
      const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest7 } };
      const rawKey = await crypto5.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
      cryptoKey = await crypto5.subtle.deriveKey(deriveParams, rawKey, { name: algorithm, length: keyLength }, true, ["encrypt"]);
    }
    const ciphertext = await crypto5.subtle.encrypt(aesGcm, cryptoKey, data);
    return concat2([salt, aesGcm.iv, new Uint8Array(ciphertext)]);
  }
  async function decrypt2(data, password) {
    const salt = data.subarray(0, saltLength);
    const nonce = data.subarray(saltLength, saltLength + nonceLength);
    const ciphertext = data.subarray(saltLength + nonceLength);
    const aesGcm = { name: algorithm, iv: nonce };
    if (typeof password === "string") {
      password = fromString2(password);
    }
    let cryptoKey;
    if (password.length === 0) {
      try {
        const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest7 } };
        const runtimeDerivedEmptyPassword = await crypto5.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
        cryptoKey = await crypto5.subtle.deriveKey(deriveParams, runtimeDerivedEmptyPassword, { name: algorithm, length: keyLength }, true, ["decrypt"]);
      } catch {
        cryptoKey = await crypto5.subtle.importKey("jwk", derivedEmptyPasswordKey, { name: "AES-GCM" }, true, ["decrypt"]);
      }
    } else {
      const deriveParams = { name: "PBKDF2", salt, iterations, hash: { name: digest7 } };
      const rawKey = await crypto5.subtle.importKey("raw", password, { name: "PBKDF2" }, false, ["deriveKey"]);
      cryptoKey = await crypto5.subtle.deriveKey(deriveParams, rawKey, { name: algorithm, length: keyLength }, true, ["decrypt"]);
    }
    const plaintext = await crypto5.subtle.decrypt(aesGcm, cryptoKey, ciphertext);
    return new Uint8Array(plaintext);
  }
  const cipher = {
    encrypt: encrypt2,
    decrypt: decrypt2
  };
  return cipher;
}

// node_modules/@libp2p/crypto/dist/src/keys/exporter.js
async function exporter(privateKey, password) {
  const cipher = create3();
  const encryptedKey = await cipher.encrypt(privateKey, password);
  return base642.encode(encryptedKey);
}

// node_modules/protons-runtime/dist/src/utils/float.js
var f32 = new Float32Array([-0]);
var f8b = new Uint8Array(f32.buffer);
function writeFloatLE(val, buf, pos) {
  f32[0] = val;
  buf[pos] = f8b[0];
  buf[pos + 1] = f8b[1];
  buf[pos + 2] = f8b[2];
  buf[pos + 3] = f8b[3];
}
function readFloatLE(buf, pos) {
  f8b[0] = buf[pos];
  f8b[1] = buf[pos + 1];
  f8b[2] = buf[pos + 2];
  f8b[3] = buf[pos + 3];
  return f32[0];
}
var f64 = new Float64Array([-0]);
var d8b = new Uint8Array(f64.buffer);
function writeDoubleLE(val, buf, pos) {
  f64[0] = val;
  buf[pos] = d8b[0];
  buf[pos + 1] = d8b[1];
  buf[pos + 2] = d8b[2];
  buf[pos + 3] = d8b[3];
  buf[pos + 4] = d8b[4];
  buf[pos + 5] = d8b[5];
  buf[pos + 6] = d8b[6];
  buf[pos + 7] = d8b[7];
}
function readDoubleLE(buf, pos) {
  d8b[0] = buf[pos];
  d8b[1] = buf[pos + 1];
  d8b[2] = buf[pos + 2];
  d8b[3] = buf[pos + 3];
  d8b[4] = buf[pos + 4];
  d8b[5] = buf[pos + 5];
  d8b[6] = buf[pos + 6];
  d8b[7] = buf[pos + 7];
  return f64[0];
}

// node_modules/protons-runtime/dist/src/utils/longbits.js
var MAX_SAFE_NUMBER_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
var MIN_SAFE_NUMBER_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
var LongBits2 = class _LongBits {
  lo;
  hi;
  constructor(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
  }
  /**
   * Converts this long bits to a possibly unsafe JavaScript number
   */
  toNumber(unsigned2 = false) {
    if (!unsigned2 && this.hi >>> 31 > 0) {
      const lo = ~this.lo + 1 >>> 0;
      let hi = ~this.hi >>> 0;
      if (lo === 0) {
        hi = hi + 1 >>> 0;
      }
      return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
  }
  /**
   * Converts this long bits to a bigint
   */
  toBigInt(unsigned2 = false) {
    if (unsigned2) {
      return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n);
    }
    if (this.hi >>> 31 !== 0) {
      const lo = ~this.lo + 1 >>> 0;
      let hi = ~this.hi >>> 0;
      if (lo === 0) {
        hi = hi + 1 >>> 0;
      }
      return -(BigInt(lo) + (BigInt(hi) << 32n));
    }
    return BigInt(this.lo >>> 0) + (BigInt(this.hi >>> 0) << 32n);
  }
  /**
   * Converts this long bits to a string
   */
  toString(unsigned2 = false) {
    return this.toBigInt(unsigned2).toString();
  }
  /**
   * Zig-zag encodes this long bits
   */
  zzEncode() {
    const mask = this.hi >> 31;
    this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo = (this.lo << 1 ^ mask) >>> 0;
    return this;
  }
  /**
   * Zig-zag decodes this long bits
   */
  zzDecode() {
    const mask = -(this.lo & 1);
    this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi = (this.hi >>> 1 ^ mask) >>> 0;
    return this;
  }
  /**
   * Calculates the length of this longbits when encoded as a varint.
   */
  length() {
    const part0 = this.lo;
    const part1 = (this.lo >>> 28 | this.hi << 4) >>> 0;
    const part2 = this.hi >>> 24;
    return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
  }
  /**
   * Constructs new long bits from the specified number
   */
  static fromBigInt(value) {
    if (value === 0n) {
      return zero;
    }
    if (value < MAX_SAFE_NUMBER_INTEGER && value > MIN_SAFE_NUMBER_INTEGER) {
      return this.fromNumber(Number(value));
    }
    const negative = value < 0n;
    if (negative) {
      value = -value;
    }
    let hi = value >> 32n;
    let lo = value - (hi << 32n);
    if (negative) {
      hi = ~hi | 0n;
      lo = ~lo | 0n;
      if (++lo > TWO_322) {
        lo = 0n;
        if (++hi > TWO_322) {
          hi = 0n;
        }
      }
    }
    return new _LongBits(Number(lo), Number(hi));
  }
  /**
   * Constructs new long bits from the specified number
   */
  static fromNumber(value) {
    if (value === 0) {
      return zero;
    }
    const sign3 = value < 0;
    if (sign3) {
      value = -value;
    }
    let lo = value >>> 0;
    let hi = (value - lo) / 4294967296 >>> 0;
    if (sign3) {
      hi = ~hi >>> 0;
      lo = ~lo >>> 0;
      if (++lo > 4294967295) {
        lo = 0;
        if (++hi > 4294967295) {
          hi = 0;
        }
      }
    }
    return new _LongBits(lo, hi);
  }
  /**
   * Constructs new long bits from a number, long or string
   */
  static from(value) {
    if (typeof value === "number") {
      return _LongBits.fromNumber(value);
    }
    if (typeof value === "bigint") {
      return _LongBits.fromBigInt(value);
    }
    if (typeof value === "string") {
      return _LongBits.fromBigInt(BigInt(value));
    }
    return value.low != null || value.high != null ? new _LongBits(value.low >>> 0, value.high >>> 0) : zero;
  }
};
var zero = new LongBits2(0, 0);
zero.toBigInt = function() {
  return 0n;
};
zero.zzEncode = zero.zzDecode = function() {
  return this;
};
zero.length = function() {
  return 1;
};
var TWO_322 = 4294967296n;

// node_modules/protons-runtime/dist/src/utils/utf8.js
function length3(string4) {
  let len = 0;
  let c = 0;
  for (let i = 0; i < string4.length; ++i) {
    c = string4.charCodeAt(i);
    if (c < 128) {
      len += 1;
    } else if (c < 2048) {
      len += 2;
    } else if ((c & 64512) === 55296 && (string4.charCodeAt(i + 1) & 64512) === 56320) {
      ++i;
      len += 4;
    } else {
      len += 3;
    }
  }
  return len;
}
function read3(buffer, start, end) {
  const len = end - start;
  if (len < 1) {
    return "";
  }
  let parts;
  const chunk = [];
  let i = 0;
  let t;
  while (start < end) {
    t = buffer[start++];
    if (t < 128) {
      chunk[i++] = t;
    } else if (t > 191 && t < 224) {
      chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
    } else if (t > 239 && t < 365) {
      t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
      chunk[i++] = 55296 + (t >> 10);
      chunk[i++] = 56320 + (t & 1023);
    } else {
      chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
    }
    if (i > 8191) {
      (parts ?? (parts = [])).push(String.fromCharCode.apply(String, chunk));
      i = 0;
    }
  }
  if (parts != null) {
    if (i > 0) {
      parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
    }
    return parts.join("");
  }
  return String.fromCharCode.apply(String, chunk.slice(0, i));
}
function write(string4, buffer, offset) {
  const start = offset;
  let c1;
  let c2;
  for (let i = 0; i < string4.length; ++i) {
    c1 = string4.charCodeAt(i);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192;
      buffer[offset++] = c1 & 63 | 128;
    } else if ((c1 & 64512) === 55296 && ((c2 = string4.charCodeAt(i + 1)) & 64512) === 56320) {
      c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
      ++i;
      buffer[offset++] = c1 >> 18 | 240;
      buffer[offset++] = c1 >> 12 & 63 | 128;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    } else {
      buffer[offset++] = c1 >> 12 | 224;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    }
  }
  return offset - start;
}

// node_modules/protons-runtime/dist/src/utils/reader.js
function indexOutOfRange(reader, writeLength) {
  return RangeError(`index out of range: ${reader.pos} + ${writeLength ?? 1} > ${reader.len}`);
}
function readFixed32End(buf, end) {
  return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
}
var Uint8ArrayReader = class {
  buf;
  pos;
  len;
  _slice = Uint8Array.prototype.subarray;
  constructor(buffer) {
    this.buf = buffer;
    this.pos = 0;
    this.len = buffer.length;
  }
  /**
   * Reads a varint as an unsigned 32 bit value
   */
  uint32() {
    let value = 4294967295;
    value = (this.buf[this.pos] & 127) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
    if (this.buf[this.pos++] < 128)
      return value;
    if ((this.pos += 5) > this.len) {
      this.pos = this.len;
      throw indexOutOfRange(this, 10);
    }
    return value;
  }
  /**
   * Reads a varint as a signed 32 bit value
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Reads a zig-zag encoded varint as a signed 32 bit value
   */
  sint32() {
    const value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
  }
  /**
   * Reads a varint as a boolean
   */
  bool() {
    return this.uint32() !== 0;
  }
  /**
   * Reads fixed 32 bits as an unsigned 32 bit integer
   */
  fixed32() {
    if (this.pos + 4 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const res = readFixed32End(this.buf, this.pos += 4);
    return res;
  }
  /**
   * Reads fixed 32 bits as a signed 32 bit integer
   */
  sfixed32() {
    if (this.pos + 4 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const res = readFixed32End(this.buf, this.pos += 4) | 0;
    return res;
  }
  /**
   * Reads a float (32 bit) as a number
   */
  float() {
    if (this.pos + 4 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const value = readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
  }
  /**
   * Reads a double (64 bit float) as a number
   */
  double() {
    if (this.pos + 8 > this.len) {
      throw indexOutOfRange(this, 4);
    }
    const value = readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
  }
  /**
   * Reads a sequence of bytes preceded by its length as a varint
   */
  bytes() {
    const length8 = this.uint32();
    const start = this.pos;
    const end = this.pos + length8;
    if (end > this.len) {
      throw indexOutOfRange(this, length8);
    }
    this.pos += length8;
    return start === end ? new Uint8Array(0) : this.buf.subarray(start, end);
  }
  /**
   * Reads a string preceded by its byte length as a varint
   */
  string() {
    const bytes3 = this.bytes();
    return read3(bytes3, 0, bytes3.length);
  }
  /**
   * Skips the specified number of bytes if specified, otherwise skips a varint
   */
  skip(length8) {
    if (typeof length8 === "number") {
      if (this.pos + length8 > this.len) {
        throw indexOutOfRange(this, length8);
      }
      this.pos += length8;
    } else {
      do {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
      } while ((this.buf[this.pos++] & 128) !== 0);
    }
    return this;
  }
  /**
   * Skips the next element of the specified wire type
   */
  skipType(wireType) {
    switch (wireType) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        while ((wireType = this.uint32() & 7) !== 4) {
          this.skipType(wireType);
        }
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error(`invalid wire type ${wireType} at offset ${this.pos}`);
    }
    return this;
  }
  readLongVarint() {
    const bits2 = new LongBits2(0, 0);
    let i = 0;
    if (this.len - this.pos > 4) {
      for (; i < 4; ++i) {
        bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits2;
        }
      }
      bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
      bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
      if (this.buf[this.pos++] < 128) {
        return bits2;
      }
      i = 0;
    } else {
      for (; i < 3; ++i) {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
        bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits2;
        }
      }
      bits2.lo = (bits2.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
      return bits2;
    }
    if (this.len - this.pos > 4) {
      for (; i < 5; ++i) {
        bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits2;
        }
      }
    } else {
      for (; i < 5; ++i) {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
        bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits2;
        }
      }
    }
    throw Error("invalid varint encoding");
  }
  readFixed64() {
    if (this.pos + 8 > this.len) {
      throw indexOutOfRange(this, 8);
    }
    const lo = readFixed32End(this.buf, this.pos += 4);
    const hi = readFixed32End(this.buf, this.pos += 4);
    return new LongBits2(lo, hi);
  }
  /**
   * Reads a varint as a signed 64 bit value
   */
  int64() {
    return this.readLongVarint().toBigInt();
  }
  /**
   * Reads a varint as a signed 64 bit value returned as a possibly unsafe
   * JavaScript number
   */
  int64Number() {
    return this.readLongVarint().toNumber();
  }
  /**
   * Reads a varint as a signed 64 bit value returned as a string
   */
  int64String() {
    return this.readLongVarint().toString();
  }
  /**
   * Reads a varint as an unsigned 64 bit value
   */
  uint64() {
    return this.readLongVarint().toBigInt(true);
  }
  /**
   * Reads a varint as an unsigned 64 bit value returned as a possibly unsafe
   * JavaScript number
   */
  uint64Number() {
    const value = decodeUint8Array(this.buf, this.pos);
    this.pos += encodingLength(value);
    return value;
  }
  /**
   * Reads a varint as an unsigned 64 bit value returned as a string
   */
  uint64String() {
    return this.readLongVarint().toString(true);
  }
  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value
   */
  sint64() {
    return this.readLongVarint().zzDecode().toBigInt();
  }
  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value returned as a
   * possibly unsafe JavaScript number
   */
  sint64Number() {
    return this.readLongVarint().zzDecode().toNumber();
  }
  /**
   * Reads a zig-zag encoded varint as a signed 64 bit value returned as a
   * string
   */
  sint64String() {
    return this.readLongVarint().zzDecode().toString();
  }
  /**
   * Reads fixed 64 bits
   */
  fixed64() {
    return this.readFixed64().toBigInt();
  }
  /**
   * Reads fixed 64 bits returned as a possibly unsafe JavaScript number
   */
  fixed64Number() {
    return this.readFixed64().toNumber();
  }
  /**
   * Reads fixed 64 bits returned as a string
   */
  fixed64String() {
    return this.readFixed64().toString();
  }
  /**
   * Reads zig-zag encoded fixed 64 bits
   */
  sfixed64() {
    return this.readFixed64().toBigInt();
  }
  /**
   * Reads zig-zag encoded fixed 64 bits returned as a possibly unsafe
   * JavaScript number
   */
  sfixed64Number() {
    return this.readFixed64().toNumber();
  }
  /**
   * Reads zig-zag encoded fixed 64 bits returned as a string
   */
  sfixed64String() {
    return this.readFixed64().toString();
  }
};
function createReader(buf) {
  return new Uint8ArrayReader(buf instanceof Uint8Array ? buf : buf.subarray());
}

// node_modules/protons-runtime/dist/src/decode.js
function decodeMessage(buf, codec, opts) {
  const reader = createReader(buf);
  return codec.decode(reader, void 0, opts);
}

// node_modules/protons-runtime/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe6(size = 0) {
  return new Uint8Array(size);
}

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports2 = {};
__export(base10_exports2, {
  base10: () => base102
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bytes.js
var empty3 = new Uint8Array(0);
function equals6(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce3(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString3(str) {
  return new TextEncoder().encode(str);
}
function toString2(b) {
  return new TextDecoder().decode(b);
}

// node_modules/protons-runtime/node_modules/multiformats/dist/src/vendor/base-x.js
function base4(ALPHABET, name7) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode28(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length8 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length8) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      pbegin++;
    }
    var it2 = size - length8;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length8 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length8) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length8;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode33(string4) {
    var buffer = decodeUnsafe(string4);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name7} character`);
  }
  return {
    encode: encode28,
    decodeUnsafe,
    decode: decode33
  };
}
var src3 = base4;
var _brrp__multiformats_scope_baseX3 = src3;
var base_x_default3 = _brrp__multiformats_scope_baseX3;

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base.js
var Encoder3 = class {
  name;
  prefix;
  baseEncode;
  constructor(name7, prefix, baseEncode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes3) {
    if (bytes3 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes3)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder3 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name7, prefix, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or3(this, decoder);
  }
};
var ComposedDecoder3 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or3(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or3(left, right) {
  return new ComposedDecoder3({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec3 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name7, prefix, baseEncode, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder3(name7, prefix, baseEncode);
    this.decoder = new Decoder3(name7, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from5({ name: name7, prefix, encode: encode28, decode: decode33 }) {
  return new Codec3(name7, prefix, encode28, decode33);
}
function baseX3({ name: name7, prefix, alphabet: alphabet6 }) {
  const { encode: encode28, decode: decode33 } = base_x_default3(alphabet6, name7);
  return from5({
    prefix,
    name: name7,
    encode: encode28,
    decode: (text) => coerce3(decode33(text))
  });
}
function decode11(string4, alphabet6, bitsPerChar, name7) {
  const codes2 = {};
  for (let i = 0; i < alphabet6.length; ++i) {
    codes2[alphabet6[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name7} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || (255 & buffer << 8 - bits2) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode10(data, alphabet6, bitsPerChar) {
  const pad = alphabet6[alphabet6.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet6[mask & buffer >> bits2];
    }
  }
  if (bits2 !== 0) {
    out += alphabet6[mask & buffer << bitsPerChar - bits2];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46483({ name: name7, prefix, bitsPerChar, alphabet: alphabet6 }) {
  return from5({
    prefix,
    name: name7,
    encode(input) {
      return encode10(input, alphabet6, bitsPerChar);
    },
    decode(input) {
      return decode11(input, alphabet6, bitsPerChar, name7);
    }
  });
}

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base10.js
var base102 = baseX3({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base16.js
var base16_exports2 = {};
__export(base16_exports2, {
  base16: () => base162,
  base16upper: () => base16upper2
});
var base162 = rfc46483({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper2 = rfc46483({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base2.js
var base2_exports2 = {};
__export(base2_exports2, {
  base2: () => base22
});
var base22 = rfc46483({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports2 = {};
__export(base256emoji_exports2, {
  base256emoji: () => base256emoji2
});
var alphabet2 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars2 = alphabet2.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes2 = alphabet2.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode11(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars2[c];
    return p;
  }, "");
}
function decode12(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes2[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji2 = from5({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode11,
  decode: decode12
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base32.js
var base32_exports2 = {};
__export(base32_exports2, {
  base32: () => base322,
  base32hex: () => base32hex2,
  base32hexpad: () => base32hexpad2,
  base32hexpadupper: () => base32hexpadupper2,
  base32hexupper: () => base32hexupper2,
  base32pad: () => base32pad2,
  base32padupper: () => base32padupper2,
  base32upper: () => base32upper2,
  base32z: () => base32z2
});
var base322 = rfc46483({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper2 = rfc46483({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad2 = rfc46483({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper2 = rfc46483({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex2 = rfc46483({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper2 = rfc46483({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad2 = rfc46483({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper2 = rfc46483({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z2 = rfc46483({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base36.js
var base36_exports2 = {};
__export(base36_exports2, {
  base36: () => base362,
  base36upper: () => base36upper2
});
var base362 = baseX3({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper2 = baseX3({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports2 = {};
__export(base58_exports2, {
  base58btc: () => base58btc3,
  base58flickr: () => base58flickr3
});
var base58btc3 = baseX3({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr3 = baseX3({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base64.js
var base64_exports2 = {};
__export(base64_exports2, {
  base64: () => base643,
  base64pad: () => base64pad3,
  base64url: () => base64url3,
  base64urlpad: () => base64urlpad3
});
var base643 = rfc46483({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad3 = rfc46483({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url3 = rfc46483({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad3 = rfc46483({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/base8.js
var base8_exports2 = {};
__export(base8_exports2, {
  base8: () => base82
});
var base82 = rfc46483({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports3 = {};
__export(identity_exports3, {
  identity: () => identity4
});
var identity4 = from5({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString2(buf),
  decode: (str) => fromString3(str)
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/codecs/json.js
var textEncoder2 = new TextEncoder();
var textDecoder2 = new TextDecoder();

// node_modules/protons-runtime/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports4 = {};
__export(identity_exports4, {
  identity: () => identity5
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/vendor/varint.js
var encode_13 = encode12;
var MSB4 = 128;
var REST4 = 127;
var MSBALL3 = ~REST4;
var INT3 = Math.pow(2, 31);
function encode12(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT3) {
    out[offset++] = num & 255 | MSB4;
    num /= 128;
  }
  while (num & MSBALL3) {
    out[offset++] = num & 255 | MSB4;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode12.bytes = offset - oldOffset + 1;
  return out;
}
var decode13 = read4;
var MSB$13 = 128;
var REST$13 = 127;
function read4(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read4.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$13) << shift : (b & REST$13) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$13);
  read4.bytes = counter - offset;
  return res;
}
var N15 = Math.pow(2, 7);
var N25 = Math.pow(2, 14);
var N35 = Math.pow(2, 21);
var N45 = Math.pow(2, 28);
var N55 = Math.pow(2, 35);
var N65 = Math.pow(2, 42);
var N75 = Math.pow(2, 49);
var N84 = Math.pow(2, 56);
var N94 = Math.pow(2, 63);
var length4 = function(value) {
  return value < N15 ? 1 : value < N25 ? 2 : value < N35 ? 3 : value < N45 ? 4 : value < N55 ? 5 : value < N65 ? 6 : value < N75 ? 7 : value < N84 ? 8 : value < N94 ? 9 : 10;
};
var varint3 = {
  encode: encode_13,
  decode: decode13,
  encodingLength: length4
};
var _brrp_varint3 = varint3;
var varint_default3 = _brrp_varint3;

// node_modules/protons-runtime/node_modules/multiformats/dist/src/varint.js
function decode14(data, offset = 0) {
  const code7 = varint_default3.decode(data, offset);
  return [code7, varint_default3.decode.bytes];
}
function encodeTo3(int, target, offset = 0) {
  varint_default3.encode(int, target, offset);
  return target;
}
function encodingLength4(int) {
  return varint_default3.encodingLength(int);
}

// node_modules/protons-runtime/node_modules/multiformats/dist/src/hashes/digest.js
function create4(code7, digest7) {
  const size = digest7.byteLength;
  const sizeOffset = encodingLength4(code7);
  const digestOffset = sizeOffset + encodingLength4(size);
  const bytes3 = new Uint8Array(digestOffset + size);
  encodeTo3(code7, bytes3, 0);
  encodeTo3(size, bytes3, sizeOffset);
  bytes3.set(digest7, digestOffset);
  return new Digest3(code7, size, digest7, bytes3);
}
function decode15(multihash) {
  const bytes3 = coerce3(multihash);
  const [code7, sizeOffset] = decode14(bytes3);
  const [size, digestOffset] = decode14(bytes3.subarray(sizeOffset));
  const digest7 = bytes3.subarray(sizeOffset + digestOffset);
  if (digest7.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest3(code7, size, digest7, bytes3);
}
function equals7(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals6(a.bytes, data.bytes);
  }
}
var Digest3 = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code7, size, digest7, bytes3) {
    this.code = code7;
    this.size = size;
    this.digest = digest7;
    this.bytes = bytes3;
  }
};

// node_modules/protons-runtime/node_modules/multiformats/dist/src/hashes/identity.js
var code3 = 0;
var name3 = "identity";
var encode13 = coerce3;
function digest3(input) {
  return create4(code3, encode13(input));
}
var identity5 = { code: code3, name: name3, encode: encode13, digest: digest3 };

// node_modules/protons-runtime/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports2 = {};
__export(sha2_browser_exports2, {
  sha256: () => sha2564,
  sha512: () => sha5123
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/hashes/hasher.js
function from6({ name: name7, code: code7, encode: encode28 }) {
  return new Hasher3(name7, code7, encode28);
}
var Hasher3 = class {
  name;
  code;
  encode;
  constructor(name7, code7, encode28) {
    this.name = name7;
    this.code = code7;
    this.encode = encode28;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create4(this.code, result) : result.then((digest7) => create4(this.code, digest7));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/protons-runtime/node_modules/multiformats/dist/src/hashes/sha2-browser.js
function sha3(name7) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name7, data));
}
var sha2564 = from6({
  name: "sha2-256",
  code: 18,
  encode: sha3("SHA-256")
});
var sha5123 = from6({
  name: "sha2-512",
  code: 19,
  encode: sha3("SHA-512")
});

// node_modules/protons-runtime/node_modules/multiformats/dist/src/cid.js
function format2(link, base11) {
  const { bytes: bytes3, version } = link;
  switch (version) {
    case 0:
      return toStringV02(bytes3, baseCache2(link), base11 ?? base58btc3.encoder);
    default:
      return toStringV12(bytes3, baseCache2(link), base11 ?? base322.encoder);
  }
}
var cache2 = /* @__PURE__ */ new WeakMap();
function baseCache2(cid) {
  const baseCache6 = cache2.get(cid);
  if (baseCache6 == null) {
    const baseCache7 = /* @__PURE__ */ new Map();
    cache2.set(cid, baseCache7);
    return baseCache7;
  }
  return baseCache6;
}
var CID2 = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code7, multihash, bytes3) {
    this.code = code7;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes3;
    this["/"] = bytes3;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code7, multihash } = this;
        if (code7 !== DAG_PB_CODE2) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE2) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code7, digest: digest7 } = this.multihash;
        const multihash = create4(code7, digest7);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals7(self2.multihash, unknown.multihash);
  }
  toString(base11) {
    return format2(this, base11);
  }
  toJSON() {
    return { "/": format2(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code7, multihash, bytes: bytes3 } = value;
      return new _CID(version, code7, multihash, bytes3 ?? encodeCID2(version, code7, multihash.bytes));
    } else if (value[cidSymbol2] === true) {
      const { version, multihash, code: code7 } = value;
      const digest7 = decode15(multihash);
      return _CID.create(version, code7, digest7);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code7, digest7) {
    if (typeof code7 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest7.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code7 !== DAG_PB_CODE2) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE2}) block encoding`);
        } else {
          return new _CID(version, code7, digest7, digest7.bytes);
        }
      }
      case 1: {
        const bytes3 = encodeCID2(version, code7, digest7.bytes);
        return new _CID(version, code7, digest7, bytes3);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest7) {
    return _CID.create(0, DAG_PB_CODE2, digest7);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code7, digest7) {
    return _CID.create(1, code7, digest7);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes3) {
    const [cid, remainder] = _CID.decodeFirst(bytes3);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes3) {
    const specs = _CID.inspectBytes(bytes3);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce3(bytes3.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest7 = new Digest3(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest7) : _CID.createV1(specs.codec, digest7);
    return [cid, bytes3.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length8] = decode14(initialBytes.subarray(offset));
      offset += length8;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE2;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source, base11) {
    const [prefix, bytes3] = parseCIDtoBytes2(source, base11);
    const cid = _CID.decode(bytes3);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache2(cid).set(prefix, source);
    return cid;
  }
};
function parseCIDtoBytes2(source, base11) {
  switch (source[0]) {
    case "Q": {
      const decoder = base11 ?? base58btc3;
      return [
        base58btc3.prefix,
        decoder.decode(`${base58btc3.prefix}${source}`)
      ];
    }
    case base58btc3.prefix: {
      const decoder = base11 ?? base58btc3;
      return [base58btc3.prefix, decoder.decode(source)];
    }
    case base322.prefix: {
      const decoder = base11 ?? base322;
      return [base322.prefix, decoder.decode(source)];
    }
    default: {
      if (base11 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base11.decode(source)];
    }
  }
}
function toStringV02(bytes3, cache6, base11) {
  const { prefix } = base11;
  if (prefix !== base58btc3.prefix) {
    throw Error(`Cannot string encode V0 in ${base11.name} encoding`);
  }
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3).slice(1);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV12(bytes3, cache6, base11) {
  const { prefix } = base11;
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE2 = 112;
var SHA_256_CODE2 = 18;
function encodeCID2(version, code7, multihash) {
  const codeOffset = encodingLength4(version);
  const hashOffset = codeOffset + encodingLength4(code7);
  const bytes3 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo3(version, bytes3, 0);
  encodeTo3(code7, bytes3, codeOffset);
  bytes3.set(multihash, hashOffset);
  return bytes3;
}
var cidSymbol2 = Symbol.for("@ipld/js-cid/CID");

// node_modules/protons-runtime/node_modules/multiformats/dist/src/basics.js
var bases2 = { ...identity_exports3, ...base2_exports2, ...base8_exports2, ...base10_exports2, ...base16_exports2, ...base32_exports2, ...base36_exports2, ...base58_exports2, ...base64_exports2, ...base256emoji_exports2 };
var hashes2 = { ...sha2_browser_exports2, ...identity_exports4 };

// node_modules/protons-runtime/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec2(name7, prefix, encode28, decode33) {
  return {
    name: name7,
    prefix,
    encoder: {
      name: name7,
      prefix,
      encode: encode28
    },
    decoder: {
      decode: decode33
    }
  };
}
var string2 = createCodec2("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii2 = createCodec2("ascii", "a", (buf) => {
  let string4 = "a";
  for (let i = 0; i < buf.length; i++) {
    string4 += String.fromCharCode(buf[i]);
  }
  return string4;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe6(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES2 = {
  utf8: string2,
  "utf-8": string2,
  hex: bases2.base16,
  latin1: ascii2,
  ascii: ascii2,
  binary: ascii2,
  ...bases2
};
var bases_default2 = BASES2;

// node_modules/protons-runtime/node_modules/uint8arrays/dist/src/from-string.js
function fromString4(string4, encoding = "utf8") {
  const base11 = bases_default2[encoding];
  if (base11 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base11.decoder.decode(`${base11.prefix}${string4}`);
}

// node_modules/protons-runtime/dist/src/utils/pool.js
function pool(size) {
  const SIZE = size ?? 8192;
  const MAX = SIZE >>> 1;
  let slab;
  let offset = SIZE;
  return function poolAlloc(size2) {
    if (size2 < 1 || size2 > MAX) {
      return allocUnsafe6(size2);
    }
    if (offset + size2 > SIZE) {
      slab = allocUnsafe6(SIZE);
      offset = 0;
    }
    const buf = slab.subarray(offset, offset += size2);
    if ((offset & 7) !== 0) {
      offset = (offset | 7) + 1;
    }
    return buf;
  };
}

// node_modules/protons-runtime/dist/src/utils/writer.js
var Op = class {
  /**
   * Function to call
   */
  fn;
  /**
   * Value byte length
   */
  len;
  /**
   * Next operation
   */
  next;
  /**
   * Value to write
   */
  val;
  constructor(fn, len, val) {
    this.fn = fn;
    this.len = len;
    this.next = void 0;
    this.val = val;
  }
};
function noop() {
}
var State = class {
  /**
   * Current head
   */
  head;
  /**
   * Current tail
   */
  tail;
  /**
   * Current buffer length
   */
  len;
  /**
   * Next state
   */
  next;
  constructor(writer) {
    this.head = writer.head;
    this.tail = writer.tail;
    this.len = writer.len;
    this.next = writer.states;
  }
};
var bufferPool = pool();
function alloc2(size) {
  if (globalThis.Buffer != null) {
    return allocUnsafe6(size);
  }
  return bufferPool(size);
}
var Uint8ArrayWriter = class {
  /**
   * Current length
   */
  len;
  /**
   * Operations head
   */
  head;
  /**
   * Operations tail
   */
  tail;
  /**
   * Linked forked states
   */
  states;
  constructor() {
    this.len = 0;
    this.head = new Op(noop, 0, 0);
    this.tail = this.head;
    this.states = null;
  }
  /**
   * Pushes a new operation to the queue
   */
  _push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
  }
  /**
   * Writes an unsigned 32 bit value as a varint
   */
  uint32(value) {
    this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
    return this;
  }
  /**
   * Writes a signed 32 bit value as a varint`
   */
  int32(value) {
    return value < 0 ? this._push(writeVarint64, 10, LongBits2.fromNumber(value)) : this.uint32(value);
  }
  /**
   * Writes a 32 bit value as a varint, zig-zag encoded
   */
  sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
  }
  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64(value) {
    const bits2 = LongBits2.fromBigInt(value);
    return this._push(writeVarint64, bits2.length(), bits2);
  }
  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64Number(value) {
    return this._push(encodeUint8Array, encodingLength(value), value);
  }
  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64String(value) {
    return this.uint64(BigInt(value));
  }
  /**
   * Writes a signed 64 bit value as a varint
   */
  int64(value) {
    return this.uint64(value);
  }
  /**
   * Writes a signed 64 bit value as a varint
   */
  int64Number(value) {
    return this.uint64Number(value);
  }
  /**
   * Writes a signed 64 bit value as a varint
   */
  int64String(value) {
    return this.uint64String(value);
  }
  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64(value) {
    const bits2 = LongBits2.fromBigInt(value).zzEncode();
    return this._push(writeVarint64, bits2.length(), bits2);
  }
  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64Number(value) {
    const bits2 = LongBits2.fromNumber(value).zzEncode();
    return this._push(writeVarint64, bits2.length(), bits2);
  }
  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64String(value) {
    return this.sint64(BigInt(value));
  }
  /**
   * Writes a boolish value as a varint
   */
  bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
  }
  /**
   * Writes an unsigned 32 bit value as fixed 32 bits
   */
  fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
  }
  /**
   * Writes a signed 32 bit value as fixed 32 bits
   */
  sfixed32(value) {
    return this.fixed32(value);
  }
  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64(value) {
    const bits2 = LongBits2.fromBigInt(value);
    return this._push(writeFixed32, 4, bits2.lo)._push(writeFixed32, 4, bits2.hi);
  }
  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64Number(value) {
    const bits2 = LongBits2.fromNumber(value);
    return this._push(writeFixed32, 4, bits2.lo)._push(writeFixed32, 4, bits2.hi);
  }
  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64String(value) {
    return this.fixed64(BigInt(value));
  }
  /**
   * Writes a signed 64 bit value as fixed 64 bits
   */
  sfixed64(value) {
    return this.fixed64(value);
  }
  /**
   * Writes a signed 64 bit value as fixed 64 bits
   */
  sfixed64Number(value) {
    return this.fixed64Number(value);
  }
  /**
   * Writes a signed 64 bit value as fixed 64 bits
   */
  sfixed64String(value) {
    return this.fixed64String(value);
  }
  /**
   * Writes a float (32 bit)
   */
  float(value) {
    return this._push(writeFloatLE, 4, value);
  }
  /**
   * Writes a double (64 bit float).
   *
   * @function
   * @param {number} value - Value to write
   * @returns {Writer} `this`
   */
  double(value) {
    return this._push(writeDoubleLE, 8, value);
  }
  /**
   * Writes a sequence of bytes
   */
  bytes(value) {
    const len = value.length >>> 0;
    if (len === 0) {
      return this._push(writeByte, 1, 0);
    }
    return this.uint32(len)._push(writeBytes, len, value);
  }
  /**
   * Writes a string
   */
  string(value) {
    const len = length3(value);
    return len !== 0 ? this.uint32(len)._push(write, len, value) : this._push(writeByte, 1, 0);
  }
  /**
   * Forks this writer's state by pushing it to a stack.
   * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
   */
  fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
  }
  /**
   * Resets this instance to the last state
   */
  reset() {
    if (this.states != null) {
      this.head = this.states.head;
      this.tail = this.states.tail;
      this.len = this.states.len;
      this.states = this.states.next;
    } else {
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
    }
    return this;
  }
  /**
   * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
   */
  ldelim() {
    const head = this.head;
    const tail = this.tail;
    const len = this.len;
    this.reset().uint32(len);
    if (len !== 0) {
      this.tail.next = head.next;
      this.tail = tail;
      this.len += len;
    }
    return this;
  }
  /**
   * Finishes the write operation
   */
  finish() {
    let head = this.head.next;
    const buf = alloc2(this.len);
    let pos = 0;
    while (head != null) {
      head.fn(head.val, buf, pos);
      pos += head.len;
      head = head.next;
    }
    return buf;
  }
};
function writeByte(val, buf, pos) {
  buf[pos] = val & 255;
}
function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
}
var VarintOp = class extends Op {
  next;
  constructor(len, val) {
    super(writeVarint32, len, val);
    this.next = void 0;
  }
};
function writeVarint64(val, buf, pos) {
  while (val.hi !== 0) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf[pos++] = val.lo;
}
function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
function writeBytes(val, buf, pos) {
  buf.set(val, pos);
}
if (globalThis.Buffer != null) {
  Uint8ArrayWriter.prototype.bytes = function(value) {
    const len = value.length >>> 0;
    this.uint32(len);
    if (len > 0) {
      this._push(writeBytesBuffer, len, value);
    }
    return this;
  };
  Uint8ArrayWriter.prototype.string = function(value) {
    const len = globalThis.Buffer.byteLength(value);
    this.uint32(len);
    if (len > 0) {
      this._push(writeStringBuffer, len, value);
    }
    return this;
  };
}
function writeBytesBuffer(val, buf, pos) {
  buf.set(val, pos);
}
function writeStringBuffer(val, buf, pos) {
  if (val.length < 40) {
    write(val, buf, pos);
  } else if (buf.utf8Write != null) {
    buf.utf8Write(val, pos);
  } else {
    buf.set(fromString4(val), pos);
  }
}
function createWriter() {
  return new Uint8ArrayWriter();
}

// node_modules/protons-runtime/dist/src/encode.js
function encodeMessage(message2, codec) {
  const w = createWriter();
  codec.encode(message2, w, {
    lengthDelimited: false
  });
  return w.finish();
}

// node_modules/protons-runtime/dist/src/codec.js
var CODEC_TYPES;
(function(CODEC_TYPES2) {
  CODEC_TYPES2[CODEC_TYPES2["VARINT"] = 0] = "VARINT";
  CODEC_TYPES2[CODEC_TYPES2["BIT64"] = 1] = "BIT64";
  CODEC_TYPES2[CODEC_TYPES2["LENGTH_DELIMITED"] = 2] = "LENGTH_DELIMITED";
  CODEC_TYPES2[CODEC_TYPES2["START_GROUP"] = 3] = "START_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["END_GROUP"] = 4] = "END_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["BIT32"] = 5] = "BIT32";
})(CODEC_TYPES || (CODEC_TYPES = {}));
function createCodec3(name7, type, encode28, decode33) {
  return {
    name: name7,
    type,
    encode: encode28,
    decode: decode33
  };
}

// node_modules/protons-runtime/dist/src/codecs/enum.js
function enumeration(v) {
  function findValue(val) {
    if (v[val.toString()] == null) {
      throw new Error("Invalid enum value");
    }
    return v[val];
  }
  const encode28 = function enumEncode(val, writer) {
    const enumValue = findValue(val);
    writer.int32(enumValue);
  };
  const decode33 = function enumDecode(reader) {
    const val = reader.int32();
    return findValue(val);
  };
  return createCodec3("enum", CODEC_TYPES.VARINT, encode28, decode33);
}

// node_modules/protons-runtime/dist/src/codecs/message.js
function message(encode28, decode33) {
  return createCodec3("message", CODEC_TYPES.LENGTH_DELIMITED, encode28, decode33);
}

// node_modules/@libp2p/crypto/dist/src/keys/keys.js
var KeyType;
(function(KeyType2) {
  KeyType2["RSA"] = "RSA";
  KeyType2["Ed25519"] = "Ed25519";
  KeyType2["Secp256k1"] = "Secp256k1";
})(KeyType || (KeyType = {}));
var __KeyTypeValues;
(function(__KeyTypeValues2) {
  __KeyTypeValues2[__KeyTypeValues2["RSA"] = 0] = "RSA";
  __KeyTypeValues2[__KeyTypeValues2["Ed25519"] = 1] = "Ed25519";
  __KeyTypeValues2[__KeyTypeValues2["Secp256k1"] = 2] = "Secp256k1";
})(__KeyTypeValues || (__KeyTypeValues = {}));
(function(KeyType2) {
  KeyType2.codec = () => {
    return enumeration(__KeyTypeValues);
  };
})(KeyType || (KeyType = {}));
var PublicKey;
(function(PublicKey2) {
  let _codec;
  PublicKey2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.Type != null) {
          w.uint32(8);
          KeyType.codec().encode(obj.Type, w);
        }
        if (obj.Data != null) {
          w.uint32(18);
          w.bytes(obj.Data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length8) => {
        const obj = {};
        const end = length8 == null ? reader.len : reader.pos + length8;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              obj.Type = KeyType.codec().decode(reader);
              break;
            case 2:
              obj.Data = reader.bytes();
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  PublicKey2.encode = (obj) => {
    return encodeMessage(obj, PublicKey2.codec());
  };
  PublicKey2.decode = (buf) => {
    return decodeMessage(buf, PublicKey2.codec());
  };
})(PublicKey || (PublicKey = {}));
var PrivateKey;
(function(PrivateKey2) {
  let _codec;
  PrivateKey2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.Type != null) {
          w.uint32(8);
          KeyType.codec().encode(obj.Type, w);
        }
        if (obj.Data != null) {
          w.uint32(18);
          w.bytes(obj.Data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length8) => {
        const obj = {};
        const end = length8 == null ? reader.len : reader.pos + length8;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              obj.Type = KeyType.codec().decode(reader);
              break;
            case 2:
              obj.Data = reader.bytes();
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  PrivateKey2.encode = (obj) => {
    return encodeMessage(obj, PrivateKey2.codec());
  };
  PrivateKey2.decode = (buf) => {
    return decodeMessage(buf, PrivateKey2.codec());
  };
})(PrivateKey || (PrivateKey = {}));

// node_modules/@libp2p/crypto/dist/src/keys/ed25519-class.js
var Ed25519PublicKey = class {
  _key;
  constructor(key) {
    this._key = ensureKey(key, PUBLIC_KEY_BYTE_LENGTH);
  }
  async verify(data, sig) {
    return hashAndVerify(this._key, sig, data);
  }
  marshal() {
    return this._key;
  }
  get bytes() {
    return PublicKey.encode({
      Type: KeyType.Ed25519,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes3 } = await sha2563.digest(this.bytes);
    return bytes3;
  }
};
var Ed25519PrivateKey = class {
  _key;
  _publicKey;
  // key       - 64 byte Uint8Array containing private key
  // publicKey - 32 byte Uint8Array containing public key
  constructor(key, publicKey) {
    this._key = ensureKey(key, PRIVATE_KEY_BYTE_LENGTH);
    this._publicKey = ensureKey(publicKey, PUBLIC_KEY_BYTE_LENGTH);
  }
  async sign(message2) {
    return hashAndSign(this._key, message2);
  }
  get public() {
    return new Ed25519PublicKey(this._publicKey);
  }
  marshal() {
    return this._key;
  }
  get bytes() {
    return PrivateKey.encode({
      Type: KeyType.Ed25519,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes3 } = await sha2563.digest(this.bytes);
    return bytes3;
  }
  /**
   * Gets the ID of the key.
   *
   * The key id is the base58 encoding of the identity multihash containing its public key.
   * The public key is a protobuf encoding containing a type and the DER encoding
   * of the PKCS SubjectPublicKeyInfo.
   *
   * @returns {Promise<string>}
   */
  async id() {
    const encoding = identity3.digest(this.public.bytes);
    return base58btc2.encode(encoding.bytes).substring(1);
  }
  /**
   * Exports the key into a password protected `format`
   */
  async export(password, format6 = "libp2p-key") {
    if (format6 === "libp2p-key") {
      return exporter(this.bytes, password);
    } else {
      throw new CodeError(`export format '${format6}' is not supported`, "ERR_INVALID_EXPORT_FORMAT");
    }
  }
};
function unmarshalEd25519PrivateKey(bytes3) {
  if (bytes3.length > PRIVATE_KEY_BYTE_LENGTH) {
    bytes3 = ensureKey(bytes3, PRIVATE_KEY_BYTE_LENGTH + PUBLIC_KEY_BYTE_LENGTH);
    const privateKeyBytes2 = bytes3.subarray(0, PRIVATE_KEY_BYTE_LENGTH);
    const publicKeyBytes2 = bytes3.subarray(PRIVATE_KEY_BYTE_LENGTH, bytes3.length);
    return new Ed25519PrivateKey(privateKeyBytes2, publicKeyBytes2);
  }
  bytes3 = ensureKey(bytes3, PRIVATE_KEY_BYTE_LENGTH);
  const privateKeyBytes = bytes3.subarray(0, PRIVATE_KEY_BYTE_LENGTH);
  const publicKeyBytes = bytes3.subarray(PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PrivateKey(privateKeyBytes, publicKeyBytes);
}
function unmarshalEd25519PublicKey(bytes3) {
  bytes3 = ensureKey(bytes3, PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PublicKey(bytes3);
}
async function generateKeyPair() {
  const { privateKey, publicKey } = await generateKey();
  return new Ed25519PrivateKey(privateKey, publicKey);
}
async function generateKeyPairFromSeed(seed) {
  const { privateKey, publicKey } = await generateKeyFromSeed(seed);
  return new Ed25519PrivateKey(privateKey, publicKey);
}
function ensureKey(key, length8) {
  key = Uint8Array.from(key ?? []);
  if (key.length !== length8) {
    throw new CodeError(`Key must be a Uint8Array of length ${length8}, got ${key.length}`, "ERR_INVALID_KEY_TYPE");
  }
  return key;
}

// node_modules/uint8arrays/dist/src/to-string.js
function toString3(array, encoding = "utf8") {
  const base11 = bases_default[encoding];
  if (base11 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base11.encoder.encode(array).substring(1);
}

// node_modules/@libp2p/crypto/dist/src/util.js
var import_util = __toESM(require_util(), 1);
var import_jsbn = __toESM(require_jsbn(), 1);
var import_forge = __toESM(require_forge(), 1);
function bigIntegerToUintBase64url(num, len) {
  let buf = Uint8Array.from(num.abs().toByteArray());
  buf = buf[0] === 0 ? buf.subarray(1) : buf;
  if (len != null) {
    if (buf.length > len)
      throw new Error("byte array longer than desired length");
    buf = concat2([new Uint8Array(len - buf.length), buf]);
  }
  return toString3(buf, "base64url");
}
function base64urlToBigInteger(str) {
  const buf = base64urlToBuffer(str);
  return new import_forge.default.jsbn.BigInteger(toString3(buf, "base16"), 16);
}
function base64urlToBuffer(str, len) {
  let buf = fromString2(str, "base64urlpad");
  if (len != null) {
    if (buf.length > len)
      throw new Error("byte array longer than desired length");
    buf = concat2([new Uint8Array(len - buf.length), buf]);
  }
  return buf;
}

// node_modules/@libp2p/crypto/dist/src/keys/ecdh-browser.js
var bits = {
  "P-256": 256,
  "P-384": 384,
  "P-521": 521
};
var curveTypes = Object.keys(bits);
var names = curveTypes.join(" / ");

// node_modules/@libp2p/crypto/dist/src/keys/rsa-class.js
var rsa_class_exports = {};
__export(rsa_class_exports, {
  RsaPrivateKey: () => RsaPrivateKey,
  RsaPublicKey: () => RsaPublicKey,
  fromJwk: () => fromJwk,
  generateKeyPair: () => generateKeyPair2,
  unmarshalRsaPrivateKey: () => unmarshalRsaPrivateKey,
  unmarshalRsaPublicKey: () => unmarshalRsaPublicKey
});
var import_forge4 = __toESM(require_forge(), 1);
var import_sha512 = __toESM(require_sha512(), 1);

// node_modules/@noble/secp256k1/lib/esm/index.js
var nodeCrypto2 = __toESM(require_crypto(), 1);
var _0n6 = BigInt(0);
var _1n5 = BigInt(1);
var _2n4 = BigInt(2);
var _3n3 = BigInt(3);
var _8n4 = BigInt(8);
var CURVE2 = Object.freeze({
  a: _0n6,
  b: BigInt(7),
  P: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
  n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
  h: _1n5,
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")
});
var divNearest = (a, b) => (a + b / _2n4) / b;
var endo = {
  beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
  splitScalar(k) {
    const { n } = CURVE2;
    const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
    const b1 = -_1n5 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
    const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
    const b2 = a1;
    const POW_2_128 = BigInt("0x100000000000000000000000000000000");
    const c1 = divNearest(b2 * k, n);
    const c2 = divNearest(-b1 * k, n);
    let k1 = mod3(k - c1 * a1 - c2 * a2, n);
    let k2 = mod3(-c1 * b1 - c2 * b2, n);
    const k1neg = k1 > POW_2_128;
    const k2neg = k2 > POW_2_128;
    if (k1neg)
      k1 = n - k1;
    if (k2neg)
      k2 = n - k2;
    if (k1 > POW_2_128 || k2 > POW_2_128) {
      throw new Error("splitScalarEndo: Endomorphism failed, k=" + k);
    }
    return { k1neg, k1, k2neg, k2 };
  }
};
var fieldLen = 32;
var groupLen = 32;
var hashLen = 32;
var compressedLen = fieldLen + 1;
var uncompressedLen = 2 * fieldLen + 1;
function weierstrass(x) {
  const { a, b } = CURVE2;
  const x2 = mod3(x * x);
  const x3 = mod3(x2 * x);
  return mod3(x3 + a * x + b);
}
var USE_ENDOMORPHISM = CURVE2.a === _0n6;
var ShaError = class extends Error {
  constructor(message2) {
    super(message2);
  }
};
function assertJacPoint(other) {
  if (!(other instanceof JacobianPoint))
    throw new TypeError("JacobianPoint expected");
}
var JacobianPoint = class _JacobianPoint {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  static fromAffine(p) {
    if (!(p instanceof Point2)) {
      throw new TypeError("JacobianPoint#fromAffine: expected Point");
    }
    if (p.equals(Point2.ZERO))
      return _JacobianPoint.ZERO;
    return new _JacobianPoint(p.x, p.y, _1n5);
  }
  static toAffineBatch(points) {
    const toInv = invertBatch2(points.map((p) => p.z));
    return points.map((p, i) => p.toAffine(toInv[i]));
  }
  static normalizeZ(points) {
    return _JacobianPoint.toAffineBatch(points).map(_JacobianPoint.fromAffine);
  }
  equals(other) {
    assertJacPoint(other);
    const { x: X1, y: Y1, z: Z1 } = this;
    const { x: X2, y: Y2, z: Z2 } = other;
    const Z1Z1 = mod3(Z1 * Z1);
    const Z2Z2 = mod3(Z2 * Z2);
    const U1 = mod3(X1 * Z2Z2);
    const U2 = mod3(X2 * Z1Z1);
    const S1 = mod3(mod3(Y1 * Z2) * Z2Z2);
    const S2 = mod3(mod3(Y2 * Z1) * Z1Z1);
    return U1 === U2 && S1 === S2;
  }
  negate() {
    return new _JacobianPoint(this.x, mod3(-this.y), this.z);
  }
  double() {
    const { x: X1, y: Y1, z: Z1 } = this;
    const A = mod3(X1 * X1);
    const B = mod3(Y1 * Y1);
    const C = mod3(B * B);
    const x1b = X1 + B;
    const D = mod3(_2n4 * (mod3(x1b * x1b) - A - C));
    const E = mod3(_3n3 * A);
    const F = mod3(E * E);
    const X3 = mod3(F - _2n4 * D);
    const Y3 = mod3(E * (D - X3) - _8n4 * C);
    const Z3 = mod3(_2n4 * Y1 * Z1);
    return new _JacobianPoint(X3, Y3, Z3);
  }
  add(other) {
    assertJacPoint(other);
    const { x: X1, y: Y1, z: Z1 } = this;
    const { x: X2, y: Y2, z: Z2 } = other;
    if (X2 === _0n6 || Y2 === _0n6)
      return this;
    if (X1 === _0n6 || Y1 === _0n6)
      return other;
    const Z1Z1 = mod3(Z1 * Z1);
    const Z2Z2 = mod3(Z2 * Z2);
    const U1 = mod3(X1 * Z2Z2);
    const U2 = mod3(X2 * Z1Z1);
    const S1 = mod3(mod3(Y1 * Z2) * Z2Z2);
    const S2 = mod3(mod3(Y2 * Z1) * Z1Z1);
    const H = mod3(U2 - U1);
    const r = mod3(S2 - S1);
    if (H === _0n6) {
      if (r === _0n6) {
        return this.double();
      } else {
        return _JacobianPoint.ZERO;
      }
    }
    const HH = mod3(H * H);
    const HHH = mod3(H * HH);
    const V2 = mod3(U1 * HH);
    const X3 = mod3(r * r - HHH - _2n4 * V2);
    const Y3 = mod3(r * (V2 - X3) - S1 * HHH);
    const Z3 = mod3(Z1 * Z2 * H);
    return new _JacobianPoint(X3, Y3, Z3);
  }
  subtract(other) {
    return this.add(other.negate());
  }
  multiplyUnsafe(scalar) {
    const P0 = _JacobianPoint.ZERO;
    if (typeof scalar === "bigint" && scalar === _0n6)
      return P0;
    let n = normalizeScalar2(scalar);
    if (n === _1n5)
      return this;
    if (!USE_ENDOMORPHISM) {
      let p = P0;
      let d2 = this;
      while (n > _0n6) {
        if (n & _1n5)
          p = p.add(d2);
        d2 = d2.double();
        n >>= _1n5;
      }
      return p;
    }
    let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
    let k1p = P0;
    let k2p = P0;
    let d = this;
    while (k1 > _0n6 || k2 > _0n6) {
      if (k1 & _1n5)
        k1p = k1p.add(d);
      if (k2 & _1n5)
        k2p = k2p.add(d);
      d = d.double();
      k1 >>= _1n5;
      k2 >>= _1n5;
    }
    if (k1neg)
      k1p = k1p.negate();
    if (k2neg)
      k2p = k2p.negate();
    k2p = new _JacobianPoint(mod3(k2p.x * endo.beta), k2p.y, k2p.z);
    return k1p.add(k2p);
  }
  precomputeWindow(W) {
    const windows = USE_ENDOMORPHISM ? 128 / W + 1 : 256 / W + 1;
    const points = [];
    let p = this;
    let base11 = p;
    for (let window2 = 0; window2 < windows; window2++) {
      base11 = p;
      points.push(base11);
      for (let i = 1; i < 2 ** (W - 1); i++) {
        base11 = base11.add(p);
        points.push(base11);
      }
      p = base11.double();
    }
    return points;
  }
  wNAF(n, affinePoint) {
    if (!affinePoint && this.equals(_JacobianPoint.BASE))
      affinePoint = Point2.BASE;
    const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
    if (256 % W) {
      throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
    }
    let precomputes = affinePoint && pointPrecomputes2.get(affinePoint);
    if (!precomputes) {
      precomputes = this.precomputeWindow(W);
      if (affinePoint && W !== 1) {
        precomputes = _JacobianPoint.normalizeZ(precomputes);
        pointPrecomputes2.set(affinePoint, precomputes);
      }
    }
    let p = _JacobianPoint.ZERO;
    let f = _JacobianPoint.BASE;
    const windows = 1 + (USE_ENDOMORPHISM ? 128 / W : 256 / W);
    const windowSize = 2 ** (W - 1);
    const mask = BigInt(2 ** W - 1);
    const maxNumber = 2 ** W;
    const shiftBy = BigInt(W);
    for (let window2 = 0; window2 < windows; window2++) {
      const offset = window2 * windowSize;
      let wbits = Number(n & mask);
      n >>= shiftBy;
      if (wbits > windowSize) {
        wbits -= maxNumber;
        n += _1n5;
      }
      const offset1 = offset;
      const offset2 = offset + Math.abs(wbits) - 1;
      const cond1 = window2 % 2 !== 0;
      const cond2 = wbits < 0;
      if (wbits === 0) {
        f = f.add(constTimeNegate2(cond1, precomputes[offset1]));
      } else {
        p = p.add(constTimeNegate2(cond2, precomputes[offset2]));
      }
    }
    return { p, f };
  }
  multiply(scalar, affinePoint) {
    let n = normalizeScalar2(scalar);
    let point;
    let fake;
    if (USE_ENDOMORPHISM) {
      const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
      let { p: k1p, f: f1p } = this.wNAF(k1, affinePoint);
      let { p: k2p, f: f2p } = this.wNAF(k2, affinePoint);
      k1p = constTimeNegate2(k1neg, k1p);
      k2p = constTimeNegate2(k2neg, k2p);
      k2p = new _JacobianPoint(mod3(k2p.x * endo.beta), k2p.y, k2p.z);
      point = k1p.add(k2p);
      fake = f1p.add(f2p);
    } else {
      const { p, f } = this.wNAF(n, affinePoint);
      point = p;
      fake = f;
    }
    return _JacobianPoint.normalizeZ([point, fake])[0];
  }
  toAffine(invZ) {
    const { x, y, z } = this;
    const is0 = this.equals(_JacobianPoint.ZERO);
    if (invZ == null)
      invZ = is0 ? _8n4 : invert2(z);
    const iz1 = invZ;
    const iz2 = mod3(iz1 * iz1);
    const iz3 = mod3(iz2 * iz1);
    const ax = mod3(x * iz2);
    const ay = mod3(y * iz3);
    const zz = mod3(z * iz1);
    if (is0)
      return Point2.ZERO;
    if (zz !== _1n5)
      throw new Error("invZ was invalid");
    return new Point2(ax, ay);
  }
};
JacobianPoint.BASE = new JacobianPoint(CURVE2.Gx, CURVE2.Gy, _1n5);
JacobianPoint.ZERO = new JacobianPoint(_0n6, _1n5, _0n6);
function constTimeNegate2(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
var pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
var Point2 = class _Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  _setWindowSize(windowSize) {
    this._WINDOW_SIZE = windowSize;
    pointPrecomputes2.delete(this);
  }
  hasEvenY() {
    return this.y % _2n4 === _0n6;
  }
  static fromCompressedHex(bytes3) {
    const isShort = bytes3.length === 32;
    const x = bytesToNumber(isShort ? bytes3 : bytes3.subarray(1));
    if (!isValidFieldElement(x))
      throw new Error("Point is not on curve");
    const y2 = weierstrass(x);
    let y = sqrtMod(y2);
    const isYOdd = (y & _1n5) === _1n5;
    if (isShort) {
      if (isYOdd)
        y = mod3(-y);
    } else {
      const isFirstByteOdd = (bytes3[0] & 1) === 1;
      if (isFirstByteOdd !== isYOdd)
        y = mod3(-y);
    }
    const point = new _Point(x, y);
    point.assertValidity();
    return point;
  }
  static fromUncompressedHex(bytes3) {
    const x = bytesToNumber(bytes3.subarray(1, fieldLen + 1));
    const y = bytesToNumber(bytes3.subarray(fieldLen + 1, fieldLen * 2 + 1));
    const point = new _Point(x, y);
    point.assertValidity();
    return point;
  }
  static fromHex(hex) {
    const bytes3 = ensureBytes4(hex);
    const len = bytes3.length;
    const header = bytes3[0];
    if (len === fieldLen)
      return this.fromCompressedHex(bytes3);
    if (len === compressedLen && (header === 2 || header === 3)) {
      return this.fromCompressedHex(bytes3);
    }
    if (len === uncompressedLen && header === 4)
      return this.fromUncompressedHex(bytes3);
    throw new Error(`Point.fromHex: received invalid point. Expected 32-${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes, not ${len}`);
  }
  static fromPrivateKey(privateKey) {
    return _Point.BASE.multiply(normalizePrivateKey(privateKey));
  }
  static fromSignature(msgHash, signature, recovery) {
    const { r, s } = normalizeSignature(signature);
    if (![0, 1, 2, 3].includes(recovery))
      throw new Error("Cannot recover: invalid recovery bit");
    const h = truncateHash(ensureBytes4(msgHash));
    const { n } = CURVE2;
    const radj = recovery === 2 || recovery === 3 ? r + n : r;
    const rinv = invert2(radj, n);
    const u1 = mod3(-h * rinv, n);
    const u2 = mod3(s * rinv, n);
    const prefix = recovery & 1 ? "03" : "02";
    const R = _Point.fromHex(prefix + numTo32bStr(radj));
    const Q = _Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
    if (!Q)
      throw new Error("Cannot recover signature: point at infinify");
    Q.assertValidity();
    return Q;
  }
  toRawBytes(isCompressed = false) {
    return hexToBytes3(this.toHex(isCompressed));
  }
  toHex(isCompressed = false) {
    const x = numTo32bStr(this.x);
    if (isCompressed) {
      const prefix = this.hasEvenY() ? "02" : "03";
      return `${prefix}${x}`;
    } else {
      return `04${x}${numTo32bStr(this.y)}`;
    }
  }
  toHexX() {
    return this.toHex(true).slice(2);
  }
  toRawX() {
    return this.toRawBytes(true).slice(1);
  }
  assertValidity() {
    const msg = "Point is not on elliptic curve";
    const { x, y } = this;
    if (!isValidFieldElement(x) || !isValidFieldElement(y))
      throw new Error(msg);
    const left = mod3(y * y);
    const right = weierstrass(x);
    if (mod3(left - right) !== _0n6)
      throw new Error(msg);
  }
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
  negate() {
    return new _Point(this.x, mod3(-this.y));
  }
  double() {
    return JacobianPoint.fromAffine(this).double().toAffine();
  }
  add(other) {
    return JacobianPoint.fromAffine(this).add(JacobianPoint.fromAffine(other)).toAffine();
  }
  subtract(other) {
    return this.add(other.negate());
  }
  multiply(scalar) {
    return JacobianPoint.fromAffine(this).multiply(scalar, this).toAffine();
  }
  multiplyAndAddUnsafe(Q, a, b) {
    const P = JacobianPoint.fromAffine(this);
    const aP = a === _0n6 || a === _1n5 || this !== _Point.BASE ? P.multiplyUnsafe(a) : P.multiply(a);
    const bQ = JacobianPoint.fromAffine(Q).multiplyUnsafe(b);
    const sum = aP.add(bQ);
    return sum.equals(JacobianPoint.ZERO) ? void 0 : sum.toAffine();
  }
};
Point2.BASE = new Point2(CURVE2.Gx, CURVE2.Gy);
Point2.ZERO = new Point2(_0n6, _0n6);
function sliceDER(s) {
  return Number.parseInt(s[0], 16) >= 8 ? "00" + s : s;
}
function parseDERInt(data) {
  if (data.length < 2 || data[0] !== 2) {
    throw new Error(`Invalid signature integer tag: ${bytesToHex3(data)}`);
  }
  const len = data[1];
  const res = data.subarray(2, len + 2);
  if (!len || res.length !== len) {
    throw new Error(`Invalid signature integer: wrong length`);
  }
  if (res[0] === 0 && res[1] <= 127) {
    throw new Error("Invalid signature integer: trailing length");
  }
  return { data: bytesToNumber(res), left: data.subarray(len + 2) };
}
function parseDERSignature(data) {
  if (data.length < 2 || data[0] != 48) {
    throw new Error(`Invalid signature tag: ${bytesToHex3(data)}`);
  }
  if (data[1] !== data.length - 2) {
    throw new Error("Invalid signature: incorrect length");
  }
  const { data: r, left: sBytes } = parseDERInt(data.subarray(2));
  const { data: s, left: rBytesLeft } = parseDERInt(sBytes);
  if (rBytesLeft.length) {
    throw new Error(`Invalid signature: left bytes after parsing: ${bytesToHex3(rBytesLeft)}`);
  }
  return { r, s };
}
var Signature2 = class _Signature {
  constructor(r, s) {
    this.r = r;
    this.s = s;
    this.assertValidity();
  }
  static fromCompact(hex) {
    const arr = hex instanceof Uint8Array;
    const name7 = "Signature.fromCompact";
    if (typeof hex !== "string" && !arr)
      throw new TypeError(`${name7}: Expected string or Uint8Array`);
    const str = arr ? bytesToHex3(hex) : hex;
    if (str.length !== 128)
      throw new Error(`${name7}: Expected 64-byte hex`);
    return new _Signature(hexToNumber2(str.slice(0, 64)), hexToNumber2(str.slice(64, 128)));
  }
  static fromDER(hex) {
    const arr = hex instanceof Uint8Array;
    if (typeof hex !== "string" && !arr)
      throw new TypeError(`Signature.fromDER: Expected string or Uint8Array`);
    const { r, s } = parseDERSignature(arr ? hex : hexToBytes3(hex));
    return new _Signature(r, s);
  }
  static fromHex(hex) {
    return this.fromDER(hex);
  }
  assertValidity() {
    const { r, s } = this;
    if (!isWithinCurveOrder(r))
      throw new Error("Invalid Signature: r must be 0 < r < n");
    if (!isWithinCurveOrder(s))
      throw new Error("Invalid Signature: s must be 0 < s < n");
  }
  hasHighS() {
    const HALF = CURVE2.n >> _1n5;
    return this.s > HALF;
  }
  normalizeS() {
    return this.hasHighS() ? new _Signature(this.r, mod3(-this.s, CURVE2.n)) : this;
  }
  toDERRawBytes() {
    return hexToBytes3(this.toDERHex());
  }
  toDERHex() {
    const sHex = sliceDER(numberToHexUnpadded(this.s));
    const rHex = sliceDER(numberToHexUnpadded(this.r));
    const sHexL = sHex.length / 2;
    const rHexL = rHex.length / 2;
    const sLen = numberToHexUnpadded(sHexL);
    const rLen = numberToHexUnpadded(rHexL);
    const length8 = numberToHexUnpadded(rHexL + sHexL + 4);
    return `30${length8}02${rLen}${rHex}02${sLen}${sHex}`;
  }
  toRawBytes() {
    return this.toDERRawBytes();
  }
  toHex() {
    return this.toDERHex();
  }
  toCompactRawBytes() {
    return hexToBytes3(this.toCompactHex());
  }
  toCompactHex() {
    return numTo32bStr(this.r) + numTo32bStr(this.s);
  }
};
function concatBytes3(...arrays) {
  if (!arrays.every((b) => b instanceof Uint8Array))
    throw new Error("Uint8Array list expected");
  if (arrays.length === 1)
    return arrays[0];
  const length8 = arrays.reduce((a, arr) => a + arr.length, 0);
  const result = new Uint8Array(length8);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, pad);
    pad += arr.length;
  }
  return result;
}
var hexes3 = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
function bytesToHex3(uint8a) {
  if (!(uint8a instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  let hex = "";
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes3[uint8a[i]];
  }
  return hex;
}
var POW_2_2562 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
function numTo32bStr(num) {
  if (typeof num !== "bigint")
    throw new Error("Expected bigint");
  if (!(_0n6 <= num && num < POW_2_2562))
    throw new Error("Expected number 0 <= n < 2^256");
  return num.toString(16).padStart(64, "0");
}
function numTo32b(num) {
  const b = hexToBytes3(numTo32bStr(num));
  if (b.length !== 32)
    throw new Error("Error: expected 32 bytes");
  return b;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber2(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToNumber: expected string, got " + typeof hex);
  }
  return BigInt(`0x${hex}`);
}
function hexToBytes3(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToBytes: expected string, got " + typeof hex);
  }
  if (hex.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex" + hex.length);
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}
function bytesToNumber(bytes3) {
  return hexToNumber2(bytesToHex3(bytes3));
}
function ensureBytes4(hex) {
  return hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes3(hex);
}
function normalizeScalar2(num) {
  if (typeof num === "number" && Number.isSafeInteger(num) && num > 0)
    return BigInt(num);
  if (typeof num === "bigint" && isWithinCurveOrder(num))
    return num;
  throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n");
}
function mod3(a, b = CURVE2.P) {
  const result = a % b;
  return result >= _0n6 ? result : b + result;
}
function pow23(x, power) {
  const { P } = CURVE2;
  let res = x;
  while (power-- > _0n6) {
    res *= res;
    res %= P;
  }
  return res;
}
function sqrtMod(x) {
  const { P } = CURVE2;
  const _6n = BigInt(6);
  const _11n = BigInt(11);
  const _22n = BigInt(22);
  const _23n = BigInt(23);
  const _44n = BigInt(44);
  const _88n = BigInt(88);
  const b2 = x * x * x % P;
  const b3 = b2 * b2 * x % P;
  const b6 = pow23(b3, _3n3) * b3 % P;
  const b9 = pow23(b6, _3n3) * b3 % P;
  const b11 = pow23(b9, _2n4) * b2 % P;
  const b22 = pow23(b11, _11n) * b11 % P;
  const b44 = pow23(b22, _22n) * b22 % P;
  const b88 = pow23(b44, _44n) * b44 % P;
  const b176 = pow23(b88, _88n) * b88 % P;
  const b220 = pow23(b176, _44n) * b44 % P;
  const b223 = pow23(b220, _3n3) * b3 % P;
  const t1 = pow23(b223, _23n) * b22 % P;
  const t2 = pow23(t1, _6n) * b2 % P;
  const rt = pow23(t2, _2n4);
  const xc = rt * rt % P;
  if (xc !== x)
    throw new Error("Cannot find square root");
  return rt;
}
function invert2(number3, modulo = CURVE2.P) {
  if (number3 === _0n6 || modulo <= _0n6) {
    throw new Error(`invert: expected positive integers, got n=${number3} mod=${modulo}`);
  }
  let a = mod3(number3, modulo);
  let b = modulo;
  let x = _0n6, y = _1n5, u = _1n5, v = _0n6;
  while (a !== _0n6) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n5)
    throw new Error("invert: does not exist");
  return mod3(x, modulo);
}
function invertBatch2(nums, p = CURVE2.P) {
  const scratch = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (num === _0n6)
      return acc;
    scratch[i] = acc;
    return mod3(acc * num, p);
  }, _1n5);
  const inverted = invert2(lastMultiplied, p);
  nums.reduceRight((acc, num, i) => {
    if (num === _0n6)
      return acc;
    scratch[i] = mod3(acc * scratch[i], p);
    return mod3(acc * num, p);
  }, inverted);
  return scratch;
}
function bits2int_2(bytes3) {
  const delta = bytes3.length * 8 - groupLen * 8;
  const num = bytesToNumber(bytes3);
  return delta > 0 ? num >> BigInt(delta) : num;
}
function truncateHash(hash3, truncateOnly = false) {
  const h = bits2int_2(hash3);
  if (truncateOnly)
    return h;
  const { n } = CURVE2;
  return h >= n ? h - n : h;
}
var _sha256Sync;
var _hmacSha256Sync;
var HmacDrbg = class {
  constructor(hashLen2, qByteLen) {
    this.hashLen = hashLen2;
    this.qByteLen = qByteLen;
    if (typeof hashLen2 !== "number" || hashLen2 < 2)
      throw new Error("hashLen must be a number");
    if (typeof qByteLen !== "number" || qByteLen < 2)
      throw new Error("qByteLen must be a number");
    this.v = new Uint8Array(hashLen2).fill(1);
    this.k = new Uint8Array(hashLen2).fill(0);
    this.counter = 0;
  }
  hmac(...values) {
    return utils2.hmacSha256(this.k, ...values);
  }
  hmacSync(...values) {
    return _hmacSha256Sync(this.k, ...values);
  }
  checkSync() {
    if (typeof _hmacSha256Sync !== "function")
      throw new ShaError("hmacSha256Sync needs to be set");
  }
  incr() {
    if (this.counter >= 1e3)
      throw new Error("Tried 1,000 k values for sign(), all were invalid");
    this.counter += 1;
  }
  async reseed(seed = new Uint8Array()) {
    this.k = await this.hmac(this.v, Uint8Array.from([0]), seed);
    this.v = await this.hmac(this.v);
    if (seed.length === 0)
      return;
    this.k = await this.hmac(this.v, Uint8Array.from([1]), seed);
    this.v = await this.hmac(this.v);
  }
  reseedSync(seed = new Uint8Array()) {
    this.checkSync();
    this.k = this.hmacSync(this.v, Uint8Array.from([0]), seed);
    this.v = this.hmacSync(this.v);
    if (seed.length === 0)
      return;
    this.k = this.hmacSync(this.v, Uint8Array.from([1]), seed);
    this.v = this.hmacSync(this.v);
  }
  async generate() {
    this.incr();
    let len = 0;
    const out = [];
    while (len < this.qByteLen) {
      this.v = await this.hmac(this.v);
      const sl = this.v.slice();
      out.push(sl);
      len += this.v.length;
    }
    return concatBytes3(...out);
  }
  generateSync() {
    this.checkSync();
    this.incr();
    let len = 0;
    const out = [];
    while (len < this.qByteLen) {
      this.v = this.hmacSync(this.v);
      const sl = this.v.slice();
      out.push(sl);
      len += this.v.length;
    }
    return concatBytes3(...out);
  }
};
function isWithinCurveOrder(num) {
  return _0n6 < num && num < CURVE2.n;
}
function isValidFieldElement(num) {
  return _0n6 < num && num < CURVE2.P;
}
function kmdToSig(kBytes, m, d, lowS = true) {
  const { n } = CURVE2;
  const k = truncateHash(kBytes, true);
  if (!isWithinCurveOrder(k))
    return;
  const kinv = invert2(k, n);
  const q = Point2.BASE.multiply(k);
  const r = mod3(q.x, n);
  if (r === _0n6)
    return;
  const s = mod3(kinv * mod3(m + d * r, n), n);
  if (s === _0n6)
    return;
  let sig = new Signature2(r, s);
  let recovery = (q.x === sig.r ? 0 : 2) | Number(q.y & _1n5);
  if (lowS && sig.hasHighS()) {
    sig = sig.normalizeS();
    recovery ^= 1;
  }
  return { sig, recovery };
}
function normalizePrivateKey(key) {
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else if (typeof key === "number" && Number.isSafeInteger(key) && key > 0) {
    num = BigInt(key);
  } else if (typeof key === "string") {
    if (key.length !== 2 * groupLen)
      throw new Error("Expected 32 bytes of private key");
    num = hexToNumber2(key);
  } else if (key instanceof Uint8Array) {
    if (key.length !== groupLen)
      throw new Error("Expected 32 bytes of private key");
    num = bytesToNumber(key);
  } else {
    throw new TypeError("Expected valid private key");
  }
  if (!isWithinCurveOrder(num))
    throw new Error("Expected private key: 0 < key < n");
  return num;
}
function normalizePublicKey(publicKey) {
  if (publicKey instanceof Point2) {
    publicKey.assertValidity();
    return publicKey;
  } else {
    return Point2.fromHex(publicKey);
  }
}
function normalizeSignature(signature) {
  if (signature instanceof Signature2) {
    signature.assertValidity();
    return signature;
  }
  try {
    return Signature2.fromDER(signature);
  } catch (error) {
    return Signature2.fromCompact(signature);
  }
}
function getPublicKey2(privateKey, isCompressed = false) {
  return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
}
function bits2int(bytes3) {
  const slice = bytes3.length > fieldLen ? bytes3.slice(0, fieldLen) : bytes3;
  return bytesToNumber(slice);
}
function bits2octets(bytes3) {
  const z1 = bits2int(bytes3);
  const z2 = mod3(z1, CURVE2.n);
  return int2octets(z2 < _0n6 ? z1 : z2);
}
function int2octets(num) {
  return numTo32b(num);
}
function initSigArgs(msgHash, privateKey, extraEntropy) {
  if (msgHash == null)
    throw new Error(`sign: expected valid message hash, not "${msgHash}"`);
  const h1 = ensureBytes4(msgHash);
  const d = normalizePrivateKey(privateKey);
  const seedArgs = [int2octets(d), bits2octets(h1)];
  if (extraEntropy != null) {
    if (extraEntropy === true)
      extraEntropy = utils2.randomBytes(fieldLen);
    const e = ensureBytes4(extraEntropy);
    if (e.length !== fieldLen)
      throw new Error(`sign: Expected ${fieldLen} bytes of extra data`);
    seedArgs.push(e);
  }
  const seed = concatBytes3(...seedArgs);
  const m = bits2int(h1);
  return { seed, m, d };
}
function finalizeSig(recSig, opts) {
  const { sig, recovery } = recSig;
  const { der, recovered } = Object.assign({ canonical: true, der: true }, opts);
  const hashed = der ? sig.toDERRawBytes() : sig.toCompactRawBytes();
  return recovered ? [hashed, recovery] : hashed;
}
async function sign2(msgHash, privKey, opts = {}) {
  const { seed, m, d } = initSigArgs(msgHash, privKey, opts.extraEntropy);
  const drbg = new HmacDrbg(hashLen, groupLen);
  await drbg.reseed(seed);
  let sig;
  while (!(sig = kmdToSig(await drbg.generate(), m, d, opts.canonical)))
    await drbg.reseed();
  return finalizeSig(sig, opts);
}
var vopts = { strict: true };
function verify2(signature, msgHash, publicKey, opts = vopts) {
  let sig;
  try {
    sig = normalizeSignature(signature);
    msgHash = ensureBytes4(msgHash);
  } catch (error) {
    return false;
  }
  const { r, s } = sig;
  if (opts.strict && sig.hasHighS())
    return false;
  const h = truncateHash(msgHash);
  let P;
  try {
    P = normalizePublicKey(publicKey);
  } catch (error) {
    return false;
  }
  const { n } = CURVE2;
  const sinv = invert2(s, n);
  const u1 = mod3(h * sinv, n);
  const u2 = mod3(r * sinv, n);
  const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2);
  if (!R)
    return false;
  const v = mod3(R.x, n);
  return v === r;
}
Point2.BASE._setWindowSize(8);
var crypto4 = {
  node: nodeCrypto2,
  web: typeof self === "object" && "crypto" in self ? self.crypto : void 0
};
var TAGGED_HASH_PREFIXES = {};
var utils2 = {
  bytesToHex: bytesToHex3,
  hexToBytes: hexToBytes3,
  concatBytes: concatBytes3,
  mod: mod3,
  invert: invert2,
  isValidPrivateKey(privateKey) {
    try {
      normalizePrivateKey(privateKey);
      return true;
    } catch (error) {
      return false;
    }
  },
  _bigintTo32Bytes: numTo32b,
  _normalizePrivateKey: normalizePrivateKey,
  hashToPrivateKey: (hash3) => {
    hash3 = ensureBytes4(hash3);
    const minLen = groupLen + 8;
    if (hash3.length < minLen || hash3.length > 1024) {
      throw new Error(`Expected valid bytes of private key as per FIPS 186`);
    }
    const num = mod3(bytesToNumber(hash3), CURVE2.n - _1n5) + _1n5;
    return numTo32b(num);
  },
  randomBytes: (bytesLength = 32) => {
    if (crypto4.web) {
      return crypto4.web.getRandomValues(new Uint8Array(bytesLength));
    } else if (crypto4.node) {
      const { randomBytes: randomBytes3 } = crypto4.node;
      return Uint8Array.from(randomBytes3(bytesLength));
    } else {
      throw new Error("The environment doesn't have randomBytes function");
    }
  },
  randomPrivateKey: () => utils2.hashToPrivateKey(utils2.randomBytes(groupLen + 8)),
  precompute(windowSize = 8, point = Point2.BASE) {
    const cached = point === Point2.BASE ? point : new Point2(point.x, point.y);
    cached._setWindowSize(windowSize);
    cached.multiply(_3n3);
    return cached;
  },
  sha256: async (...messages) => {
    if (crypto4.web) {
      const buffer = await crypto4.web.subtle.digest("SHA-256", concatBytes3(...messages));
      return new Uint8Array(buffer);
    } else if (crypto4.node) {
      const { createHash } = crypto4.node;
      const hash3 = createHash("sha256");
      messages.forEach((m) => hash3.update(m));
      return Uint8Array.from(hash3.digest());
    } else {
      throw new Error("The environment doesn't have sha256 function");
    }
  },
  hmacSha256: async (key, ...messages) => {
    if (crypto4.web) {
      const ckey = await crypto4.web.subtle.importKey("raw", key, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
      const message2 = concatBytes3(...messages);
      const buffer = await crypto4.web.subtle.sign("HMAC", ckey, message2);
      return new Uint8Array(buffer);
    } else if (crypto4.node) {
      const { createHmac } = crypto4.node;
      const hash3 = createHmac("sha256", key);
      messages.forEach((m) => hash3.update(m));
      return Uint8Array.from(hash3.digest());
    } else {
      throw new Error("The environment doesn't have hmac-sha256 function");
    }
  },
  sha256Sync: void 0,
  hmacSha256Sync: void 0,
  taggedHash: async (tag, ...messages) => {
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = await utils2.sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes3(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return utils2.sha256(tagP, ...messages);
  },
  taggedHashSync: (tag, ...messages) => {
    if (typeof _sha256Sync !== "function")
      throw new ShaError("sha256Sync is undefined, you need to set it");
    let tagP = TAGGED_HASH_PREFIXES[tag];
    if (tagP === void 0) {
      const tagH = _sha256Sync(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
      tagP = concatBytes3(tagH, tagH);
      TAGGED_HASH_PREFIXES[tag] = tagP;
    }
    return _sha256Sync(tagP, ...messages);
  },
  _JacobianPoint: JacobianPoint
};
Object.defineProperties(utils2, {
  sha256Sync: {
    configurable: false,
    get() {
      return _sha256Sync;
    },
    set(val) {
      if (!_sha256Sync)
        _sha256Sync = val;
    }
  },
  hmacSha256Sync: {
    configurable: false,
    get() {
      return _hmacSha256Sync;
    },
    set(val) {
      if (!_hmacSha256Sync)
        _hmacSha256Sync = val;
    }
  }
});

// node_modules/@libp2p/crypto/dist/src/random-bytes.js
function randomBytes2(length8) {
  if (isNaN(length8) || length8 <= 0) {
    throw new CodeError("random bytes length must be a Number bigger than 0", "ERR_INVALID_LENGTH");
  }
  return utils2.randomBytes(length8);
}

// node_modules/@libp2p/crypto/dist/src/keys/jwk2pem.js
var import_rsa = __toESM(require_rsa(), 1);
var import_forge2 = __toESM(require_forge(), 1);
function convert(key, types) {
  return types.map((t) => base64urlToBigInteger(key[t]));
}
function jwk2priv(key) {
  return import_forge2.default.pki.setRsaPrivateKey(...convert(key, ["n", "e", "d", "p", "q", "dp", "dq", "qi"]));
}
function jwk2pub(key) {
  return import_forge2.default.pki.setRsaPublicKey(...convert(key, ["n", "e"]));
}

// node_modules/@libp2p/crypto/dist/src/keys/rsa-utils.js
var rsa_utils_exports = {};
__export(rsa_utils_exports, {
  jwkToPkcs1: () => jwkToPkcs1,
  jwkToPkix: () => jwkToPkix,
  pkcs1ToJwk: () => pkcs1ToJwk,
  pkixToJwk: () => pkixToJwk
});
var import_asn1 = __toESM(require_asn1(), 1);
var import_rsa2 = __toESM(require_rsa(), 1);
var import_forge3 = __toESM(require_forge(), 1);
function pkcs1ToJwk(bytes3) {
  const asn1 = import_forge3.default.asn1.fromDer(toString3(bytes3, "ascii"));
  const privateKey = import_forge3.default.pki.privateKeyFromAsn1(asn1);
  return {
    kty: "RSA",
    n: bigIntegerToUintBase64url(privateKey.n),
    e: bigIntegerToUintBase64url(privateKey.e),
    d: bigIntegerToUintBase64url(privateKey.d),
    p: bigIntegerToUintBase64url(privateKey.p),
    q: bigIntegerToUintBase64url(privateKey.q),
    dp: bigIntegerToUintBase64url(privateKey.dP),
    dq: bigIntegerToUintBase64url(privateKey.dQ),
    qi: bigIntegerToUintBase64url(privateKey.qInv),
    alg: "RS256"
  };
}
function jwkToPkcs1(jwk) {
  if (jwk.n == null || jwk.e == null || jwk.d == null || jwk.p == null || jwk.q == null || jwk.dp == null || jwk.dq == null || jwk.qi == null) {
    throw new CodeError("JWK was missing components", "ERR_INVALID_PARAMETERS");
  }
  const asn1 = import_forge3.default.pki.privateKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e),
    d: base64urlToBigInteger(jwk.d),
    p: base64urlToBigInteger(jwk.p),
    q: base64urlToBigInteger(jwk.q),
    dP: base64urlToBigInteger(jwk.dp),
    dQ: base64urlToBigInteger(jwk.dq),
    qInv: base64urlToBigInteger(jwk.qi)
  });
  return fromString2(import_forge3.default.asn1.toDer(asn1).getBytes(), "ascii");
}
function pkixToJwk(bytes3) {
  const asn1 = import_forge3.default.asn1.fromDer(toString3(bytes3, "ascii"));
  const publicKey = import_forge3.default.pki.publicKeyFromAsn1(asn1);
  return {
    kty: "RSA",
    n: bigIntegerToUintBase64url(publicKey.n),
    e: bigIntegerToUintBase64url(publicKey.e)
  };
}
function jwkToPkix(jwk) {
  if (jwk.n == null || jwk.e == null) {
    throw new CodeError("JWK was missing components", "ERR_INVALID_PARAMETERS");
  }
  const asn1 = import_forge3.default.pki.publicKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e)
  });
  return fromString2(import_forge3.default.asn1.toDer(asn1).getBytes(), "ascii");
}

// node_modules/@libp2p/crypto/dist/src/keys/rsa-browser.js
async function generateKey2(bits2) {
  const pair2 = await webcrypto_default.get().subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: bits2,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: { name: "SHA-256" }
  }, true, ["sign", "verify"]);
  const keys = await exportKey(pair2);
  return {
    privateKey: keys[0],
    publicKey: keys[1]
  };
}
async function unmarshalPrivateKey(key) {
  const privateKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, true, ["sign"]);
  const pair2 = [
    privateKey,
    await derivePublicFromPrivate(key)
  ];
  const keys = await exportKey({
    privateKey: pair2[0],
    publicKey: pair2[1]
  });
  return {
    privateKey: keys[0],
    publicKey: keys[1]
  };
}
async function hashAndSign2(key, msg) {
  const privateKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, false, ["sign"]);
  const sig = await webcrypto_default.get().subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, privateKey, Uint8Array.from(msg));
  return new Uint8Array(sig, 0, sig.byteLength);
}
async function hashAndVerify2(key, sig, msg) {
  const publicKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, false, ["verify"]);
  return webcrypto_default.get().subtle.verify({ name: "RSASSA-PKCS1-v1_5" }, publicKey, sig, msg);
}
async function exportKey(pair2) {
  if (pair2.privateKey == null || pair2.publicKey == null) {
    throw new CodeError("Private and public key are required", "ERR_INVALID_PARAMETERS");
  }
  return Promise.all([
    webcrypto_default.get().subtle.exportKey("jwk", pair2.privateKey),
    webcrypto_default.get().subtle.exportKey("jwk", pair2.publicKey)
  ]);
}
async function derivePublicFromPrivate(jwKey) {
  return webcrypto_default.get().subtle.importKey("jwk", {
    kty: jwKey.kty,
    n: jwKey.n,
    e: jwKey.e
  }, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, true, ["verify"]);
}
function convertKey(key, pub, msg, handle) {
  const fkey = pub ? jwk2pub(key) : jwk2priv(key);
  const fmsg = toString3(Uint8Array.from(msg), "ascii");
  const fomsg = handle(fmsg, fkey);
  return fromString2(fomsg, "ascii");
}
function encrypt(key, msg) {
  return convertKey(key, true, msg, (msg2, key2) => key2.encrypt(msg2));
}
function decrypt(key, msg) {
  return convertKey(key, false, msg, (msg2, key2) => key2.decrypt(msg2));
}

// node_modules/@libp2p/crypto/dist/src/keys/rsa-class.js
var RsaPublicKey = class {
  _key;
  constructor(key) {
    this._key = key;
  }
  async verify(data, sig) {
    return hashAndVerify2(this._key, sig, data);
  }
  marshal() {
    return rsa_utils_exports.jwkToPkix(this._key);
  }
  get bytes() {
    return PublicKey.encode({
      Type: KeyType.RSA,
      Data: this.marshal()
    }).subarray();
  }
  encrypt(bytes3) {
    return encrypt(this._key, bytes3);
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes3 } = await sha2563.digest(this.bytes);
    return bytes3;
  }
};
var RsaPrivateKey = class {
  _key;
  _publicKey;
  constructor(key, publicKey) {
    this._key = key;
    this._publicKey = publicKey;
  }
  genSecret() {
    return randomBytes2(16);
  }
  async sign(message2) {
    return hashAndSign2(this._key, message2);
  }
  get public() {
    if (this._publicKey == null) {
      throw new CodeError("public key not provided", "ERR_PUBKEY_NOT_PROVIDED");
    }
    return new RsaPublicKey(this._publicKey);
  }
  decrypt(bytes3) {
    return decrypt(this._key, bytes3);
  }
  marshal() {
    return rsa_utils_exports.jwkToPkcs1(this._key);
  }
  get bytes() {
    return PrivateKey.encode({
      Type: KeyType.RSA,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes3 } = await sha2563.digest(this.bytes);
    return bytes3;
  }
  /**
   * Gets the ID of the key.
   *
   * The key id is the base58 encoding of the SHA-256 multihash of its public key.
   * The public key is a protobuf encoding containing a type and the DER encoding
   * of the PKCS SubjectPublicKeyInfo.
   */
  async id() {
    const hash3 = await this.public.hash();
    return toString3(hash3, "base58btc");
  }
  /**
   * Exports the key into a password protected PEM format
   */
  async export(password, format6 = "pkcs-8") {
    if (format6 === "pkcs-8") {
      const buffer = new import_forge4.default.util.ByteBuffer(this.marshal());
      const asn1 = import_forge4.default.asn1.fromDer(buffer);
      const privateKey = import_forge4.default.pki.privateKeyFromAsn1(asn1);
      const options = {
        algorithm: "aes256",
        count: 1e4,
        saltSize: 128 / 8,
        prfAlgorithm: "sha512"
      };
      return import_forge4.default.pki.encryptRsaPrivateKey(privateKey, password, options);
    } else if (format6 === "libp2p-key") {
      return exporter(this.bytes, password);
    } else {
      throw new CodeError(`export format '${format6}' is not supported`, "ERR_INVALID_EXPORT_FORMAT");
    }
  }
};
async function unmarshalRsaPrivateKey(bytes3) {
  const jwk = rsa_utils_exports.pkcs1ToJwk(bytes3);
  const keys = await unmarshalPrivateKey(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}
function unmarshalRsaPublicKey(bytes3) {
  const jwk = rsa_utils_exports.pkixToJwk(bytes3);
  return new RsaPublicKey(jwk);
}
async function fromJwk(jwk) {
  const keys = await unmarshalPrivateKey(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}
async function generateKeyPair2(bits2) {
  const keys = await generateKey2(bits2);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1-class.js
var secp256k1_class_exports = {};
__export(secp256k1_class_exports, {
  Secp256k1PrivateKey: () => Secp256k1PrivateKey,
  Secp256k1PublicKey: () => Secp256k1PublicKey,
  generateKeyPair: () => generateKeyPair3,
  unmarshalSecp256k1PrivateKey: () => unmarshalSecp256k1PrivateKey,
  unmarshalSecp256k1PublicKey: () => unmarshalSecp256k1PublicKey
});

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1.js
function generateKey3() {
  return utils2.randomPrivateKey();
}
async function hashAndSign3(key, msg) {
  const { digest: digest7 } = await sha2563.digest(msg);
  try {
    return await sign2(digest7, key);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_INPUT");
  }
}
async function hashAndVerify3(key, sig, msg) {
  try {
    const { digest: digest7 } = await sha2563.digest(msg);
    return verify2(sig, digest7, key);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_INPUT");
  }
}
function compressPublicKey(key) {
  const point = Point2.fromHex(key).toRawBytes(true);
  return point;
}
function validatePrivateKey(key) {
  try {
    getPublicKey2(key, true);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_PRIVATE_KEY");
  }
}
function validatePublicKey(key) {
  try {
    Point2.fromHex(key);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_PUBLIC_KEY");
  }
}
function computePublicKey(privateKey) {
  try {
    return getPublicKey2(privateKey, true);
  } catch (err) {
    throw new CodeError(String(err), "ERR_INVALID_PRIVATE_KEY");
  }
}

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1-class.js
var Secp256k1PublicKey = class {
  _key;
  constructor(key) {
    validatePublicKey(key);
    this._key = key;
  }
  async verify(data, sig) {
    return hashAndVerify3(this._key, sig, data);
  }
  marshal() {
    return compressPublicKey(this._key);
  }
  get bytes() {
    return PublicKey.encode({
      Type: KeyType.Secp256k1,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes3 } = await sha2563.digest(this.bytes);
    return bytes3;
  }
};
var Secp256k1PrivateKey = class {
  _key;
  _publicKey;
  constructor(key, publicKey) {
    this._key = key;
    this._publicKey = publicKey ?? computePublicKey(key);
    validatePrivateKey(this._key);
    validatePublicKey(this._publicKey);
  }
  async sign(message2) {
    return hashAndSign3(this._key, message2);
  }
  get public() {
    return new Secp256k1PublicKey(this._publicKey);
  }
  marshal() {
    return this._key;
  }
  get bytes() {
    return PrivateKey.encode({
      Type: KeyType.Secp256k1,
      Data: this.marshal()
    }).subarray();
  }
  equals(key) {
    return equals5(this.bytes, key.bytes);
  }
  async hash() {
    const { bytes: bytes3 } = await sha2563.digest(this.bytes);
    return bytes3;
  }
  /**
   * Gets the ID of the key.
   *
   * The key id is the base58 encoding of the SHA-256 multihash of its public key.
   * The public key is a protobuf encoding containing a type and the DER encoding
   * of the PKCS SubjectPublicKeyInfo.
   */
  async id() {
    const hash3 = await this.public.hash();
    return toString3(hash3, "base58btc");
  }
  /**
   * Exports the key into a password protected `format`
   */
  async export(password, format6 = "libp2p-key") {
    if (format6 === "libp2p-key") {
      return exporter(this.bytes, password);
    } else {
      throw new CodeError(`export format '${format6}' is not supported`, "ERR_INVALID_EXPORT_FORMAT");
    }
  }
};
function unmarshalSecp256k1PrivateKey(bytes3) {
  return new Secp256k1PrivateKey(bytes3);
}
function unmarshalSecp256k1PublicKey(bytes3) {
  return new Secp256k1PublicKey(bytes3);
}
async function generateKeyPair3() {
  const privateKeyBytes = generateKey3();
  return new Secp256k1PrivateKey(privateKeyBytes);
}

// node_modules/@libp2p/crypto/dist/src/keys/index.js
var supportedKeys = {
  rsa: rsa_class_exports,
  ed25519: ed25519_class_exports,
  secp256k1: secp256k1_class_exports
};
function unsupportedKey(type) {
  const supported = Object.keys(supportedKeys).join(" / ");
  return new CodeError(`invalid or unsupported key type ${type}. Must be ${supported}`, "ERR_UNSUPPORTED_KEY_TYPE");
}
function unmarshalPublicKey(buf) {
  const decoded = PublicKey.decode(buf);
  const data = decoded.Data ?? new Uint8Array();
  switch (decoded.Type) {
    case KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPublicKey(data);
    case KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PublicKey(data);
    case KeyType.Secp256k1:
      return supportedKeys.secp256k1.unmarshalSecp256k1PublicKey(data);
    default:
      throw unsupportedKey(decoded.Type ?? "RSA");
  }
}
async function unmarshalPrivateKey2(buf) {
  const decoded = PrivateKey.decode(buf);
  const data = decoded.Data ?? new Uint8Array();
  switch (decoded.Type) {
    case KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPrivateKey(data);
    case KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PrivateKey(data);
    case KeyType.Secp256k1:
      return supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey(data);
    default:
      throw unsupportedKey(decoded.Type ?? "RSA");
  }
}

// node_modules/@libp2p/interface-peer-id/dist/src/index.js
var symbol2 = Symbol.for("@libp2p/peer-id");

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base58.js
var base58_exports3 = {};
__export(base58_exports3, {
  base58btc: () => base58btc4,
  base58flickr: () => base58flickr4
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/vendor/base-x.js
function base5(ALPHABET, name7) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode28(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length8 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length8) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      pbegin++;
    }
    var it2 = size - length8;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length8 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length8) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length8;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode33(string4) {
    var buffer = decodeUnsafe(string4);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name7} character`);
  }
  return {
    encode: encode28,
    decodeUnsafe,
    decode: decode33
  };
}
var src4 = base5;
var _brrp__multiformats_scope_baseX4 = src4;
var base_x_default4 = _brrp__multiformats_scope_baseX4;

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bytes.js
var empty4 = new Uint8Array(0);
var equals8 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce4 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString5 = (str) => new TextEncoder().encode(str);
var toString4 = (b) => new TextDecoder().decode(b);

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base.js
var Encoder4 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name7, prefix, baseEncode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes3) {
    if (bytes3 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes3)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder4 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or4(this, decoder);
  }
};
var ComposedDecoder4 = class {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or4(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or4 = (left, right) => new ComposedDecoder4(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
var Codec4 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseEncode, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder4(name7, prefix, baseEncode);
    this.decoder = new Decoder4(name7, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from7 = ({ name: name7, prefix, encode: encode28, decode: decode33 }) => new Codec4(name7, prefix, encode28, decode33);
var baseX4 = ({ prefix, name: name7, alphabet: alphabet6 }) => {
  const { encode: encode28, decode: decode33 } = base_x_default4(alphabet6, name7);
  return from7({
    prefix,
    name: name7,
    encode: encode28,
    /**
     * @param {string} text
     */
    decode: (text) => coerce4(decode33(text))
  });
};
var decode16 = (string4, alphabet6, bitsPerChar, name7) => {
  const codes2 = {};
  for (let i = 0; i < alphabet6.length; ++i) {
    codes2[alphabet6[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name7} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || 255 & buffer << 8 - bits2) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode14 = (data, alphabet6, bitsPerChar) => {
  const pad = alphabet6[alphabet6.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet6[mask & buffer >> bits2];
    }
  }
  if (bits2) {
    out += alphabet6[mask & buffer << bitsPerChar - bits2];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc46484 = ({ name: name7, prefix, bitsPerChar, alphabet: alphabet6 }) => {
  return from7({
    prefix,
    name: name7,
    encode(input) {
      return encode14(input, alphabet6, bitsPerChar);
    },
    decode(input) {
      return decode16(input, alphabet6, bitsPerChar, name7);
    }
  });
};

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base58.js
var base58btc4 = baseX4({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr4 = baseX4({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/identity.js
var identity_exports5 = {};
__export(identity_exports5, {
  identity: () => identity6
});
var identity6 = from7({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString4(buf),
  decode: (str) => fromString5(str)
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base2.js
var base2_exports3 = {};
__export(base2_exports3, {
  base2: () => base23
});
var base23 = rfc46484({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base8.js
var base8_exports3 = {};
__export(base8_exports3, {
  base8: () => base83
});
var base83 = rfc46484({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base10.js
var base10_exports3 = {};
__export(base10_exports3, {
  base10: () => base103
});
var base103 = baseX4({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base16.js
var base16_exports3 = {};
__export(base16_exports3, {
  base16: () => base163,
  base16upper: () => base16upper3
});
var base163 = rfc46484({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper3 = rfc46484({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base32.js
var base32_exports3 = {};
__export(base32_exports3, {
  base32: () => base323,
  base32hex: () => base32hex3,
  base32hexpad: () => base32hexpad3,
  base32hexpadupper: () => base32hexpadupper3,
  base32hexupper: () => base32hexupper3,
  base32pad: () => base32pad3,
  base32padupper: () => base32padupper3,
  base32upper: () => base32upper3,
  base32z: () => base32z3
});
var base323 = rfc46484({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper3 = rfc46484({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad3 = rfc46484({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper3 = rfc46484({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex3 = rfc46484({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper3 = rfc46484({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad3 = rfc46484({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper3 = rfc46484({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z3 = rfc46484({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base36.js
var base36_exports3 = {};
__export(base36_exports3, {
  base36: () => base363,
  base36upper: () => base36upper3
});
var base363 = baseX4({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper3 = baseX4({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base64.js
var base64_exports3 = {};
__export(base64_exports3, {
  base64: () => base644,
  base64pad: () => base64pad4,
  base64url: () => base64url4,
  base64urlpad: () => base64urlpad4
});
var base644 = rfc46484({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad4 = rfc46484({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url4 = rfc46484({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad4 = rfc46484({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/bases/base256emoji.js
var base256emoji_exports3 = {};
__export(base256emoji_exports3, {
  base256emoji: () => base256emoji3
});
var alphabet3 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars3 = (
  /** @type {string[]} */
  alphabet3.reduce(
    (p, c, i) => {
      p[i] = c;
      return p;
    },
    /** @type {string[]} */
    []
  )
);
var alphabetCharsToBytes3 = (
  /** @type {number[]} */
  alphabet3.reduce(
    (p, c, i) => {
      p[
        /** @type {number} */
        c.codePointAt(0)
      ] = i;
      return p;
    },
    /** @type {number[]} */
    []
  )
);
function encode15(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars3[c];
    return p;
  }, "");
}
function decode17(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes3[
      /** @type {number} */
      char.codePointAt(0)
    ];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji3 = from7({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode15,
  decode: decode17
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/hashes/sha2-browser.js
var sha2_browser_exports3 = {};
__export(sha2_browser_exports3, {
  sha256: () => sha2565,
  sha512: () => sha5124
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/vendor/varint.js
var encode_14 = encode16;
var MSB5 = 128;
var REST5 = 127;
var MSBALL4 = ~REST5;
var INT4 = Math.pow(2, 31);
function encode16(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT4) {
    out[offset++] = num & 255 | MSB5;
    num /= 128;
  }
  while (num & MSBALL4) {
    out[offset++] = num & 255 | MSB5;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode16.bytes = offset - oldOffset + 1;
  return out;
}
var decode18 = read5;
var MSB$14 = 128;
var REST$14 = 127;
function read5(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read5.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$14) << shift : (b & REST$14) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$14);
  read5.bytes = counter - offset;
  return res;
}
var N16 = Math.pow(2, 7);
var N26 = Math.pow(2, 14);
var N36 = Math.pow(2, 21);
var N46 = Math.pow(2, 28);
var N56 = Math.pow(2, 35);
var N66 = Math.pow(2, 42);
var N76 = Math.pow(2, 49);
var N85 = Math.pow(2, 56);
var N95 = Math.pow(2, 63);
var length5 = function(value) {
  return value < N16 ? 1 : value < N26 ? 2 : value < N36 ? 3 : value < N46 ? 4 : value < N56 ? 5 : value < N66 ? 6 : value < N76 ? 7 : value < N85 ? 8 : value < N95 ? 9 : 10;
};
var varint4 = {
  encode: encode_14,
  decode: decode18,
  encodingLength: length5
};
var _brrp_varint4 = varint4;
var varint_default4 = _brrp_varint4;

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/varint.js
var decode19 = (data, offset = 0) => {
  const code7 = varint_default4.decode(data, offset);
  return [code7, varint_default4.decode.bytes];
};
var encodeTo4 = (int, target, offset = 0) => {
  varint_default4.encode(int, target, offset);
  return target;
};
var encodingLength5 = (int) => {
  return varint_default4.encodingLength(int);
};

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/hashes/digest.js
var create6 = (code7, digest7) => {
  const size = digest7.byteLength;
  const sizeOffset = encodingLength5(code7);
  const digestOffset = sizeOffset + encodingLength5(size);
  const bytes3 = new Uint8Array(digestOffset + size);
  encodeTo4(code7, bytes3, 0);
  encodeTo4(size, bytes3, sizeOffset);
  bytes3.set(digest7, digestOffset);
  return new Digest4(code7, size, digest7, bytes3);
};
var decode20 = (multihash) => {
  const bytes3 = coerce4(multihash);
  const [code7, sizeOffset] = decode19(bytes3);
  const [size, digestOffset] = decode19(bytes3.subarray(sizeOffset));
  const digest7 = bytes3.subarray(sizeOffset + digestOffset);
  if (digest7.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest4(code7, size, digest7, bytes3);
};
var equals9 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    const data = (
      /** @type {{code?:unknown, size?:unknown, bytes?:unknown}} */
      b
    );
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals8(a.bytes, data.bytes);
  }
};
var Digest4 = class {
  /**
   * Creates a multihash digest.
   *
   * @param {Code} code
   * @param {Size} size
   * @param {Uint8Array} digest
   * @param {Uint8Array} bytes
   */
  constructor(code7, size, digest7, bytes3) {
    this.code = code7;
    this.size = size;
    this.digest = digest7;
    this.bytes = bytes3;
  }
};

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/hashes/hasher.js
var from8 = ({ name: name7, code: code7, encode: encode28 }) => new Hasher4(name7, code7, encode28);
var Hasher4 = class {
  /**
   *
   * @param {Name} name
   * @param {Code} code
   * @param {(input: Uint8Array) => Await<Uint8Array>} encode
   */
  constructor(name7, code7, encode28) {
    this.name = name7;
    this.code = code7;
    this.encode = encode28;
  }
  /**
   * @param {Uint8Array} input
   * @returns {Await<Digest.Digest<Code, number>>}
   */
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create6(this.code, result) : result.then((digest7) => create6(this.code, digest7));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/hashes/sha2-browser.js
var sha4 = (name7) => (
  /**
   * @param {Uint8Array} data
   */
  async (data) => new Uint8Array(await crypto.subtle.digest(name7, data))
);
var sha2565 = from8({
  name: "sha2-256",
  code: 18,
  encode: sha4("SHA-256")
});
var sha5124 = from8({
  name: "sha2-512",
  code: 19,
  encode: sha4("SHA-512")
});

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/hashes/identity.js
var identity_exports6 = {};
__export(identity_exports6, {
  identity: () => identity7
});
var code4 = 0;
var name4 = "identity";
var encode17 = coerce4;
var digest4 = (input) => create6(code4, encode17(input));
var identity7 = { code: code4, name: name4, encode: encode17, digest: digest4 };

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/codecs/json.js
var textEncoder3 = new TextEncoder();
var textDecoder3 = new TextDecoder();

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/cid.js
var format3 = (link, base11) => {
  const { bytes: bytes3, version } = link;
  switch (version) {
    case 0:
      return toStringV03(
        bytes3,
        baseCache3(link),
        /** @type {API.MultibaseEncoder<"z">} */
        base11 || base58btc4.encoder
      );
    default:
      return toStringV13(
        bytes3,
        baseCache3(link),
        /** @type {API.MultibaseEncoder<Prefix>} */
        base11 || base323.encoder
      );
  }
};
var cache3 = /* @__PURE__ */ new WeakMap();
var baseCache3 = (cid) => {
  const baseCache6 = cache3.get(cid);
  if (baseCache6 == null) {
    const baseCache7 = /* @__PURE__ */ new Map();
    cache3.set(cid, baseCache7);
    return baseCache7;
  }
  return baseCache6;
};
var CID3 = class _CID {
  /**
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} multihash - (Multi)hash of the of the content.
   * @param {Uint8Array} bytes
   *
   */
  constructor(version, code7, multihash, bytes3) {
    this.code = code7;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes3;
    this["/"] = bytes3;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  /**
   * @returns {CID<Data, API.DAG_PB, API.SHA_256, 0>}
   */
  toV0() {
    switch (this.version) {
      case 0: {
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          this
        );
      }
      case 1: {
        const { code: code7, multihash } = this;
        if (code7 !== DAG_PB_CODE3) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE3) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          _CID.createV0(
            /** @type {API.MultihashDigest<API.SHA_256>} */
            multihash
          )
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 0. This is a bug please report`
        );
      }
    }
  }
  /**
   * @returns {CID<Data, Format, Alg, 1>}
   */
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code7, digest: digest7 } = this.multihash;
        const multihash = create6(code7, digest7);
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          _CID.createV1(this.code, multihash)
        );
      }
      case 1: {
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          this
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 1. This is a bug please report`
        );
      }
    }
  }
  /**
   * @param {unknown} other
   * @returns {other is CID<Data, Format, Alg, Version>}
   */
  equals(other) {
    return _CID.equals(this, other);
  }
  /**
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {API.Link<Data, Format, Alg, Version>} self
   * @param {unknown} other
   * @returns {other is CID}
   */
  static equals(self2, other) {
    const unknown = (
      /** @type {{code?:unknown, version?:unknown, multihash?:unknown}} */
      other
    );
    return unknown && self2.code === unknown.code && self2.version === unknown.version && equals9(self2.multihash, unknown.multihash);
  }
  /**
   * @param {API.MultibaseEncoder<string>} [base]
   * @returns {string}
   */
  toString(base11) {
    return format3(this, base11);
  }
  toJSON() {
    return { "/": format3(this) };
  }
  link() {
    return this;
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @template {unknown} U
   * @param {API.Link<Data, Format, Alg, Version>|U} input
   * @returns {CID<Data, Format, Alg, Version>|null}
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = (
      /** @type {any} */
      input
    );
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code7, multihash, bytes: bytes3 } = value;
      return new _CID(
        version,
        code7,
        /** @type {API.MultihashDigest<Alg>} */
        multihash,
        bytes3 || encodeCID3(version, code7, multihash.bytes)
      );
    } else if (value[cidSymbol3] === true) {
      const { version, multihash, code: code7 } = value;
      const digest7 = (
        /** @type {API.MultihashDigest<Alg>} */
        decode20(multihash)
      );
      return _CID.create(version, code7, digest7);
    } else {
      return null;
    }
  }
  /**
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} digest - (Multi)hash of the of the content.
   * @returns {CID<Data, Format, Alg, Version>}
   */
  static create(version, code7, digest7) {
    if (typeof code7 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest7.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code7 !== DAG_PB_CODE3) {
          throw new Error(
            `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE3}) block encoding`
          );
        } else {
          return new _CID(version, code7, digest7, digest7.bytes);
        }
      }
      case 1: {
        const bytes3 = encodeCID3(version, code7, digest7.bytes);
        return new _CID(version, code7, digest7, bytes3);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   *
   * @template {unknown} [T=unknown]
   * @param {API.MultihashDigest<typeof SHA_256_CODE>} digest - Multihash.
   * @returns {CID<T, typeof DAG_PB_CODE, typeof SHA_256_CODE, 0>}
   */
  static createV0(digest7) {
    return _CID.create(0, DAG_PB_CODE3, digest7);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @param {Code} code - Content encoding format code.
   * @param {API.MultihashDigest<Alg>} digest - Miltihash of the content.
   * @returns {CID<Data, Code, Alg, 1>}
   */
  static createV1(code7, digest7) {
    return _CID.create(1, code7, digest7);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ByteView<API.Link<Data, Code, Alg, Ver>>} bytes
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static decode(bytes3) {
    const [cid, remainder] = _CID.decodeFirst(bytes3);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} bytes
   * @returns {[CID<T, C, A, V>, Uint8Array]}
   */
  static decodeFirst(bytes3) {
    const specs = _CID.inspectBytes(bytes3);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce4(
      bytes3.subarray(prefixSize, prefixSize + specs.multihashSize)
    );
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(
      specs.multihashSize - specs.digestSize
    );
    const digest7 = new Digest4(
      specs.multihashCode,
      specs.digestSize,
      digestBytes,
      multihashBytes
    );
    const cid = specs.version === 0 ? _CID.createV0(
      /** @type {API.MultihashDigest<API.SHA_256>} */
      digest7
    ) : _CID.createV1(specs.codec, digest7);
    return [
      /** @type {CID<T, C, A, V>} */
      cid,
      bytes3.subarray(specs.size)
    ];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} initialBytes
   * @returns {{ version:V, codec:C, multihashCode:A, digestSize:number, multihashSize:number, size:number }}
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length8] = decode19(initialBytes.subarray(offset));
      offset += length8;
      return i;
    };
    let version = (
      /** @type {V} */
      next()
    );
    let codec = (
      /** @type {C} */
      DAG_PB_CODE3
    );
    if (
      /** @type {number} */
      version === 18
    ) {
      version = /** @type {V} */
      0;
      offset = 0;
    } else {
      codec = /** @type {C} */
      next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = (
      /** @type {A} */
      next()
    );
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   *
   * @template {string} Prefix
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ToString<API.Link<Data, Code, Alg, Ver>, Prefix>} source
   * @param {API.MultibaseDecoder<Prefix>} [base]
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static parse(source, base11) {
    const [prefix, bytes3] = parseCIDtoBytes3(source, base11);
    const cid = _CID.decode(bytes3);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache3(cid).set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes3 = (source, base11) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base11 || base58btc4;
      return [
        /** @type {Prefix} */
        base58btc4.prefix,
        decoder.decode(`${base58btc4.prefix}${source}`)
      ];
    }
    case base58btc4.prefix: {
      const decoder = base11 || base58btc4;
      return [
        /** @type {Prefix} */
        base58btc4.prefix,
        decoder.decode(source)
      ];
    }
    case base323.prefix: {
      const decoder = base11 || base323;
      return [
        /** @type {Prefix} */
        base323.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base11 == null) {
        throw Error(
          "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
        );
      }
      return [
        /** @type {Prefix} */
        source[0],
        base11.decode(source)
      ];
    }
  }
};
var toStringV03 = (bytes3, cache6, base11) => {
  const { prefix } = base11;
  if (prefix !== base58btc4.prefix) {
    throw Error(`Cannot string encode V0 in ${base11.name} encoding`);
  }
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3).slice(1);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV13 = (bytes3, cache6, base11) => {
  const { prefix } = base11;
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE3 = 112;
var SHA_256_CODE3 = 18;
var encodeCID3 = (version, code7, multihash) => {
  const codeOffset = encodingLength5(version);
  const hashOffset = codeOffset + encodingLength5(code7);
  const bytes3 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo4(version, bytes3, 0);
  encodeTo4(code7, bytes3, codeOffset);
  bytes3.set(multihash, hashOffset);
  return bytes3;
};
var cidSymbol3 = Symbol.for("@ipld/js-cid/CID");

// node_modules/@libp2p/peer-id/node_modules/multiformats/src/basics.js
var bases3 = { ...identity_exports5, ...base2_exports3, ...base8_exports3, ...base10_exports3, ...base16_exports3, ...base32_exports3, ...base36_exports3, ...base58_exports3, ...base64_exports3, ...base256emoji_exports3 };
var hashes3 = { ...sha2_browser_exports3, ...identity_exports6 };

// node_modules/@libp2p/peer-id/dist/src/index.js
var inspect = Symbol.for("nodejs.util.inspect.custom");
var baseDecoder = Object.values(bases3).map((codec) => codec.decoder).reduce((acc, curr) => acc.or(curr), bases3.identity.decoder);
var LIBP2P_KEY_CODE = 114;
var MARSHALLED_ED225519_PUBLIC_KEY_LENGTH = 36;
var MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH = 37;
var PeerIdImpl = class {
  type;
  multihash;
  privateKey;
  publicKey;
  string;
  constructor(init) {
    this.type = init.type;
    this.multihash = init.multihash;
    this.privateKey = init.privateKey;
    Object.defineProperty(this, "string", {
      enumerable: false,
      writable: true
    });
  }
  get [Symbol.toStringTag]() {
    return `PeerId(${this.toString()})`;
  }
  [symbol2] = true;
  toString() {
    if (this.string == null) {
      this.string = base58btc4.encode(this.multihash.bytes).slice(1);
    }
    return this.string;
  }
  // return self-describing String representation
  // in default format from RFC 0001: https://github.com/libp2p/specs/pull/209
  toCID() {
    return CID3.createV1(LIBP2P_KEY_CODE, this.multihash);
  }
  toBytes() {
    return this.multihash.bytes;
  }
  /**
   * Returns Multiaddr as a JSON string
   */
  toJSON() {
    return this.toString();
  }
  /**
   * Checks the equality of `this` peer against a given PeerId
   */
  equals(id) {
    if (id instanceof Uint8Array) {
      return equals5(this.multihash.bytes, id);
    } else if (typeof id === "string") {
      return peerIdFromString(id).equals(this);
    } else if (id?.multihash?.bytes != null) {
      return equals5(this.multihash.bytes, id.multihash.bytes);
    } else {
      throw new Error("not valid Id");
    }
  }
  /**
   * Returns PeerId as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```js
   * import { peerIdFromString } from '@libp2p/peer-id'
   *
   * console.info(peerIdFromString('QmFoo'))
   * // 'PeerId(QmFoo)'
   * ```
   */
  [inspect]() {
    return `PeerId(${this.toString()})`;
  }
};
var RSAPeerIdImpl = class extends PeerIdImpl {
  type = "RSA";
  publicKey;
  constructor(init) {
    super({ ...init, type: "RSA" });
    this.publicKey = init.publicKey;
  }
};
var Ed25519PeerIdImpl = class extends PeerIdImpl {
  type = "Ed25519";
  publicKey;
  constructor(init) {
    super({ ...init, type: "Ed25519" });
    this.publicKey = init.multihash.digest;
  }
};
var Secp256k1PeerIdImpl = class extends PeerIdImpl {
  type = "secp256k1";
  publicKey;
  constructor(init) {
    super({ ...init, type: "secp256k1" });
    this.publicKey = init.multihash.digest;
  }
};
function peerIdFromString(str, decoder) {
  decoder = decoder ?? baseDecoder;
  if (str.charAt(0) === "1" || str.charAt(0) === "Q") {
    const multihash = decode20(base58btc4.decode(`z${str}`));
    if (str.startsWith("12D")) {
      return new Ed25519PeerIdImpl({ multihash });
    } else if (str.startsWith("16U")) {
      return new Secp256k1PeerIdImpl({ multihash });
    } else {
      return new RSAPeerIdImpl({ multihash });
    }
  }
  return peerIdFromBytes(baseDecoder.decode(str));
}
function peerIdFromBytes(buf) {
  try {
    const multihash = decode20(buf);
    if (multihash.code === identity7.code) {
      if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
        return new Ed25519PeerIdImpl({ multihash });
      } else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
        return new Secp256k1PeerIdImpl({ multihash });
      }
    }
    if (multihash.code === sha2565.code) {
      return new RSAPeerIdImpl({ multihash });
    }
  } catch {
    return peerIdFromCID(CID3.decode(buf));
  }
  throw new Error("Supplied PeerID CID is invalid");
}
function peerIdFromCID(cid) {
  if (cid == null || cid.multihash == null || cid.version == null || cid.version === 1 && cid.code !== LIBP2P_KEY_CODE) {
    throw new Error("Supplied PeerID CID is invalid");
  }
  const multihash = cid.multihash;
  if (multihash.code === sha2565.code) {
    return new RSAPeerIdImpl({ multihash: cid.multihash });
  } else if (multihash.code === identity7.code) {
    if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
      return new Ed25519PeerIdImpl({ multihash: cid.multihash });
    } else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
      return new Secp256k1PeerIdImpl({ multihash: cid.multihash });
    }
  }
  throw new Error("Supplied PeerID CID is invalid");
}
async function peerIdFromKeys(publicKey, privateKey) {
  if (publicKey.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
    return new Ed25519PeerIdImpl({ multihash: create6(identity7.code, publicKey), privateKey });
  }
  if (publicKey.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
    return new Secp256k1PeerIdImpl({ multihash: create6(identity7.code, publicKey), privateKey });
  }
  return new RSAPeerIdImpl({ multihash: await sha2565.digest(publicKey), publicKey, privateKey });
}

// node_modules/@chainsafe/libp2p-noise/dist/src/proto/payload.js
var NoiseExtensions;
(function(NoiseExtensions2) {
  let _codec;
  NoiseExtensions2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.webtransportCerthashes != null) {
          for (const value of obj.webtransportCerthashes) {
            w.uint32(10);
            w.bytes(value);
          }
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length8) => {
        const obj = {
          webtransportCerthashes: []
        };
        const end = length8 == null ? reader.len : reader.pos + length8;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              obj.webtransportCerthashes.push(reader.bytes());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  NoiseExtensions2.encode = (obj) => {
    return encodeMessage(obj, NoiseExtensions2.codec());
  };
  NoiseExtensions2.decode = (buf) => {
    return decodeMessage(buf, NoiseExtensions2.codec());
  };
})(NoiseExtensions || (NoiseExtensions = {}));
var NoiseHandshakePayload;
(function(NoiseHandshakePayload2) {
  let _codec;
  NoiseHandshakePayload2.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (opts.writeDefaults === true || obj.identityKey != null && obj.identityKey.byteLength > 0) {
          w.uint32(10);
          w.bytes(obj.identityKey ?? new Uint8Array(0));
        }
        if (opts.writeDefaults === true || obj.identitySig != null && obj.identitySig.byteLength > 0) {
          w.uint32(18);
          w.bytes(obj.identitySig ?? new Uint8Array(0));
        }
        if (obj.extensions != null) {
          w.uint32(34);
          NoiseExtensions.codec().encode(obj.extensions, w, {
            writeDefaults: false
          });
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length8) => {
        const obj = {
          identityKey: new Uint8Array(0),
          identitySig: new Uint8Array(0)
        };
        const end = length8 == null ? reader.len : reader.pos + length8;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              obj.identityKey = reader.bytes();
              break;
            case 2:
              obj.identitySig = reader.bytes();
              break;
            case 4:
              obj.extensions = NoiseExtensions.codec().decode(reader, reader.uint32());
              break;
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  NoiseHandshakePayload2.encode = (obj) => {
    return encodeMessage(obj, NoiseHandshakePayload2.codec());
  };
  NoiseHandshakePayload2.decode = (buf) => {
    return decodeMessage(buf, NoiseHandshakePayload2.codec());
  };
})(NoiseHandshakePayload || (NoiseHandshakePayload = {}));

// node_modules/@chainsafe/libp2p-noise/dist/src/utils.js
async function getPayload(localPeer, staticPublicKey, extensions) {
  const signedPayload = await signPayload(localPeer, getHandshakePayload(staticPublicKey));
  if (localPeer.publicKey == null) {
    throw new Error("PublicKey was missing from local PeerId");
  }
  return createHandshakePayload(localPeer.publicKey, signedPayload, extensions);
}
function createHandshakePayload(libp2pPublicKey, signedPayload, extensions) {
  return NoiseHandshakePayload.encode({
    identityKey: libp2pPublicKey,
    identitySig: signedPayload,
    extensions: extensions ?? { webtransportCerthashes: [] }
  }).subarray();
}
async function signPayload(peerId, payload) {
  if (peerId.privateKey == null) {
    throw new Error("PrivateKey was missing from PeerId");
  }
  const privateKey = await unmarshalPrivateKey2(peerId.privateKey);
  return privateKey.sign(payload);
}
async function getPeerIdFromPayload(payload) {
  return peerIdFromKeys(payload.identityKey);
}
function decodePayload(payload) {
  return NoiseHandshakePayload.decode(payload);
}
function getHandshakePayload(publicKey) {
  const prefix = fromString2("noise-libp2p-static-key:");
  return concat2([prefix, publicKey], prefix.length + publicKey.length);
}
async function verifySignedPayload(noiseStaticKey, payload, remotePeer) {
  const payloadPeerId = await peerIdFromKeys(payload.identityKey);
  if (!payloadPeerId.equals(remotePeer)) {
    throw new Error(`Payload identity key ${payloadPeerId.toString()} does not match expected remote peer ${remotePeer.toString()}`);
  }
  const generatedPayload = getHandshakePayload(noiseStaticKey);
  if (payloadPeerId.publicKey == null) {
    throw new Error("PublicKey was missing from PeerId");
  }
  if (payload.identitySig == null) {
    throw new Error("Signature was missing from message");
  }
  const publicKey = unmarshalPublicKey(payloadPeerId.publicKey);
  const valid = await publicKey.verify(generatedPayload, payload.identitySig);
  if (!valid) {
    throw new Error("Static key doesn't match to peer that signed payload!");
  }
  return payloadPeerId;
}
function isValidPublicKey(pk) {
  if (!(pk instanceof Uint8Array)) {
    return false;
  }
  if (pk.length !== 32) {
    return false;
  }
  return true;
}

// node_modules/@chainsafe/libp2p-noise/node_modules/@libp2p/logger/dist/src/index.js
var import_debug = __toESM(require_browser(), 1);

// node_modules/@chainsafe/libp2p-noise/node_modules/multiformats/vendor/base-x.js
function base6(ALPHABET, name7) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode28(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length8 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length8) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      pbegin++;
    }
    var it2 = size - length8;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length8 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length8) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length8;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode33(string4) {
    var buffer = decodeUnsafe(string4);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name7} character`);
  }
  return {
    encode: encode28,
    decodeUnsafe,
    decode: decode33
  };
}
var src5 = base6;
var _brrp__multiformats_scope_baseX5 = src5;
var base_x_default5 = _brrp__multiformats_scope_baseX5;

// node_modules/@chainsafe/libp2p-noise/node_modules/multiformats/src/bytes.js
var empty5 = new Uint8Array(0);
var coerce5 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};

// node_modules/@chainsafe/libp2p-noise/node_modules/multiformats/src/bases/base.js
var Encoder5 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name7, prefix, baseEncode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes3) {
    if (bytes3 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes3)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder5 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or5(this, decoder);
  }
};
var ComposedDecoder5 = class {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or5(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or5 = (left, right) => new ComposedDecoder5(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
var Codec5 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseEncode, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder5(name7, prefix, baseEncode);
    this.decoder = new Decoder5(name7, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from9 = ({ name: name7, prefix, encode: encode28, decode: decode33 }) => new Codec5(name7, prefix, encode28, decode33);
var baseX5 = ({ prefix, name: name7, alphabet: alphabet6 }) => {
  const { encode: encode28, decode: decode33 } = base_x_default5(alphabet6, name7);
  return from9({
    prefix,
    name: name7,
    encode: encode28,
    /**
     * @param {string} text
     */
    decode: (text) => coerce5(decode33(text))
  });
};
var decode21 = (string4, alphabet6, bitsPerChar, name7) => {
  const codes2 = {};
  for (let i = 0; i < alphabet6.length; ++i) {
    codes2[alphabet6[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name7} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || 255 & buffer << 8 - bits2) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode18 = (data, alphabet6, bitsPerChar) => {
  const pad = alphabet6[alphabet6.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet6[mask & buffer >> bits2];
    }
  }
  if (bits2) {
    out += alphabet6[mask & buffer << bitsPerChar - bits2];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc46485 = ({ name: name7, prefix, bitsPerChar, alphabet: alphabet6 }) => {
  return from9({
    prefix,
    name: name7,
    encode(input) {
      return encode18(input, alphabet6, bitsPerChar);
    },
    decode(input) {
      return decode21(input, alphabet6, bitsPerChar, name7);
    }
  });
};

// node_modules/@chainsafe/libp2p-noise/node_modules/multiformats/src/bases/base58.js
var base58btc5 = baseX5({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr5 = baseX5({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@chainsafe/libp2p-noise/node_modules/multiformats/src/bases/base32.js
var base324 = rfc46485({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper4 = rfc46485({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad4 = rfc46485({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper4 = rfc46485({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex4 = rfc46485({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper4 = rfc46485({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad4 = rfc46485({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper4 = rfc46485({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z4 = rfc46485({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@chainsafe/libp2p-noise/node_modules/multiformats/src/bases/base64.js
var base645 = rfc46485({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad5 = rfc46485({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url5 = rfc46485({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad5 = rfc46485({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@chainsafe/libp2p-noise/node_modules/@libp2p/logger/dist/src/index.js
import_debug.default.formatters.b = (v) => {
  return v == null ? "undefined" : base58btc5.baseEncode(v);
};
import_debug.default.formatters.t = (v) => {
  return v == null ? "undefined" : base324.baseEncode(v);
};
import_debug.default.formatters.m = (v) => {
  return v == null ? "undefined" : base645.baseEncode(v);
};
import_debug.default.formatters.p = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug.default.formatters.c = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug.default.formatters.k = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug.default.formatters.a = (v) => {
  return v == null ? "undefined" : v.toString();
};
function createDisabledLogger(namespace) {
  const logger3 = () => {
  };
  logger3.enabled = false;
  logger3.color = "";
  logger3.diff = 0;
  logger3.log = () => {
  };
  logger3.namespace = namespace;
  logger3.destroy = () => true;
  logger3.extend = () => logger3;
  return logger3;
}
function logger(name7) {
  let trace = createDisabledLogger(`${name7}:trace`);
  if (import_debug.default.enabled(`${name7}:trace`) && import_debug.default.names.map((r) => r.toString()).find((n) => n.includes(":trace")) != null) {
    trace = (0, import_debug.default)(`${name7}:trace`);
  }
  return Object.assign((0, import_debug.default)(name7), {
    error: (0, import_debug.default)(`${name7}:error`),
    trace
  });
}

// node_modules/@chainsafe/libp2p-noise/dist/src/logger.js
var log = logger("libp2p:noise");
var keyLogger;
if (DUMP_SESSION_KEYS) {
  keyLogger = log;
} else {
  keyLogger = Object.assign(() => {
  }, {
    enabled: false,
    trace: () => {
    },
    error: () => {
    }
  });
}
function logLocalStaticKeys(s) {
  keyLogger(`LOCAL_STATIC_PUBLIC_KEY ${toString3(s.publicKey, "hex")}`);
  keyLogger(`LOCAL_STATIC_PRIVATE_KEY ${toString3(s.privateKey, "hex")}`);
}
function logLocalEphemeralKeys(e) {
  if (e) {
    keyLogger(`LOCAL_PUBLIC_EPHEMERAL_KEY ${toString3(e.publicKey, "hex")}`);
    keyLogger(`LOCAL_PRIVATE_EPHEMERAL_KEY ${toString3(e.privateKey, "hex")}`);
  } else {
    keyLogger("Missing local ephemeral keys.");
  }
}
function logRemoteStaticKey(rs) {
  keyLogger(`REMOTE_STATIC_PUBLIC_KEY ${toString3(rs, "hex")}`);
}
function logRemoteEphemeralKey(re) {
  keyLogger(`REMOTE_EPHEMERAL_PUBLIC_KEY ${toString3(re, "hex")}`);
}
function logCipherState(session) {
  if (session.cs1 && session.cs2) {
    keyLogger(`CIPHER_STATE_1 ${session.cs1.n.getUint64()} ${toString3(session.cs1.k, "hex")}`);
    keyLogger(`CIPHER_STATE_2 ${session.cs2.n.getUint64()} ${toString3(session.cs2.k, "hex")}`);
  } else {
    keyLogger("Missing cipher state.");
  }
}

// node_modules/@chainsafe/libp2p-noise/dist/src/nonce.js
var MIN_NONCE = 0;
var MAX_NONCE = 4294967295;
var ERR_MAX_NONCE = "Cipherstate has reached maximum n, a new handshake must be performed";
var Nonce = class {
  n;
  bytes;
  view;
  constructor(n = MIN_NONCE) {
    this.n = n;
    this.bytes = new Uint8Array(12);
    this.view = new DataView(this.bytes.buffer, this.bytes.byteOffset, this.bytes.byteLength);
    this.view.setUint32(4, n, true);
  }
  increment() {
    this.n++;
    this.view.setUint32(4, this.n, true);
  }
  getBytes() {
    return this.bytes;
  }
  getUint64() {
    return this.n;
  }
  assertValue() {
    if (this.n > MAX_NONCE) {
      throw new Error(ERR_MAX_NONCE);
    }
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/handshakes/abstract-handshake.js
var AbstractHandshake = class {
  crypto;
  constructor(crypto5) {
    this.crypto = crypto5;
  }
  encryptWithAd(cs, ad, plaintext) {
    const e = this.encrypt(cs.k, cs.n, ad, plaintext);
    cs.n.increment();
    return e;
  }
  decryptWithAd(cs, ad, ciphertext, dst) {
    const { plaintext, valid } = this.decrypt(cs.k, cs.n, ad, ciphertext, dst);
    if (valid)
      cs.n.increment();
    return { plaintext, valid };
  }
  // Cipher state related
  hasKey(cs) {
    return !this.isEmptyKey(cs.k);
  }
  createEmptyKey() {
    return new Uint8Array(32);
  }
  isEmptyKey(k) {
    const emptyKey = this.createEmptyKey();
    return equals5(emptyKey, k);
  }
  encrypt(k, n, ad, plaintext) {
    n.assertValue();
    return this.crypto.chaCha20Poly1305Encrypt(plaintext, n.getBytes(), ad, k);
  }
  encryptAndHash(ss, plaintext) {
    let ciphertext;
    if (this.hasKey(ss.cs)) {
      ciphertext = this.encryptWithAd(ss.cs, ss.h, plaintext);
    } else {
      ciphertext = plaintext;
    }
    this.mixHash(ss, ciphertext);
    return ciphertext;
  }
  decrypt(k, n, ad, ciphertext, dst) {
    n.assertValue();
    const encryptedMessage = this.crypto.chaCha20Poly1305Decrypt(ciphertext, n.getBytes(), ad, k, dst);
    if (encryptedMessage) {
      return {
        plaintext: encryptedMessage,
        valid: true
      };
    } else {
      return {
        plaintext: new Uint8Array(0),
        valid: false
      };
    }
  }
  decryptAndHash(ss, ciphertext) {
    let plaintext;
    let valid = true;
    if (this.hasKey(ss.cs)) {
      ({ plaintext, valid } = this.decryptWithAd(ss.cs, ss.h, ciphertext));
    } else {
      plaintext = ciphertext;
    }
    this.mixHash(ss, ciphertext);
    return { plaintext, valid };
  }
  dh(privateKey, publicKey) {
    try {
      const derivedU8 = this.crypto.generateX25519SharedKey(privateKey, publicKey);
      if (derivedU8.length === 32) {
        return derivedU8;
      }
      return derivedU8.subarray(0, 32);
    } catch (e) {
      const err = e;
      log.error(err);
      return new Uint8Array(32);
    }
  }
  mixHash(ss, data) {
    ss.h = this.getHash(ss.h, data);
  }
  getHash(a, b) {
    const u = this.crypto.hashSHA256(concat2([a, b], a.length + b.length));
    return u;
  }
  mixKey(ss, ikm) {
    const [ck, tempK] = this.crypto.getHKDF(ss.ck, ikm);
    ss.cs = this.initializeKey(tempK);
    ss.ck = ck;
  }
  initializeKey(k) {
    return { k, n: new Nonce() };
  }
  // Symmetric state related
  initializeSymmetric(protocolName) {
    const protocolNameBytes = fromString2(protocolName, "utf-8");
    const h = this.hashProtocolName(protocolNameBytes);
    const ck = h;
    const key = this.createEmptyKey();
    const cs = this.initializeKey(key);
    return { cs, ck, h };
  }
  hashProtocolName(protocolName) {
    if (protocolName.length <= 32) {
      const h = new Uint8Array(32);
      h.set(protocolName);
      return h;
    } else {
      return this.getHash(protocolName, new Uint8Array(0));
    }
  }
  split(ss) {
    const [tempk1, tempk2] = this.crypto.getHKDF(ss.ck, new Uint8Array(0));
    const cs1 = this.initializeKey(tempk1);
    const cs2 = this.initializeKey(tempk2);
    return { cs1, cs2 };
  }
  writeMessageRegular(cs, payload) {
    const ciphertext = this.encryptWithAd(cs, new Uint8Array(0), payload);
    const ne = this.createEmptyKey();
    const ns = new Uint8Array(0);
    return { ne, ns, ciphertext };
  }
  readMessageRegular(cs, message2) {
    return this.decryptWithAd(cs, new Uint8Array(0), message2.ciphertext);
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/handshakes/xx.js
var XX = class extends AbstractHandshake {
  initializeInitiator(prologue, s, rs, psk) {
    const name7 = "Noise_XX_25519_ChaChaPoly_SHA256";
    const ss = this.initializeSymmetric(name7);
    this.mixHash(ss, prologue);
    const re = new Uint8Array(32);
    return { ss, s, rs, psk, re };
  }
  initializeResponder(prologue, s, rs, psk) {
    const name7 = "Noise_XX_25519_ChaChaPoly_SHA256";
    const ss = this.initializeSymmetric(name7);
    this.mixHash(ss, prologue);
    const re = new Uint8Array(32);
    return { ss, s, rs, psk, re };
  }
  writeMessageA(hs, payload, e) {
    const ns = new Uint8Array(0);
    if (e !== void 0) {
      hs.e = e;
    } else {
      hs.e = this.crypto.generateX25519KeyPair();
    }
    const ne = hs.e.publicKey;
    this.mixHash(hs.ss, ne);
    const ciphertext = this.encryptAndHash(hs.ss, payload);
    return { ne, ns, ciphertext };
  }
  writeMessageB(hs, payload) {
    hs.e = this.crypto.generateX25519KeyPair();
    const ne = hs.e.publicKey;
    this.mixHash(hs.ss, ne);
    this.mixKey(hs.ss, this.dh(hs.e.privateKey, hs.re));
    const spk = hs.s.publicKey;
    const ns = this.encryptAndHash(hs.ss, spk);
    this.mixKey(hs.ss, this.dh(hs.s.privateKey, hs.re));
    const ciphertext = this.encryptAndHash(hs.ss, payload);
    return { ne, ns, ciphertext };
  }
  writeMessageC(hs, payload) {
    const spk = hs.s.publicKey;
    const ns = this.encryptAndHash(hs.ss, spk);
    this.mixKey(hs.ss, this.dh(hs.s.privateKey, hs.re));
    const ciphertext = this.encryptAndHash(hs.ss, payload);
    const ne = this.createEmptyKey();
    const messageBuffer = { ne, ns, ciphertext };
    const { cs1, cs2 } = this.split(hs.ss);
    return { h: hs.ss.h, messageBuffer, cs1, cs2 };
  }
  readMessageA(hs, message2) {
    if (isValidPublicKey(message2.ne)) {
      hs.re = message2.ne;
    }
    this.mixHash(hs.ss, hs.re);
    return this.decryptAndHash(hs.ss, message2.ciphertext);
  }
  readMessageB(hs, message2) {
    if (isValidPublicKey(message2.ne)) {
      hs.re = message2.ne;
    }
    this.mixHash(hs.ss, hs.re);
    if (!hs.e) {
      throw new Error("Handshake state `e` param is missing.");
    }
    this.mixKey(hs.ss, this.dh(hs.e.privateKey, hs.re));
    const { plaintext: ns, valid: valid1 } = this.decryptAndHash(hs.ss, message2.ns);
    if (valid1 && isValidPublicKey(ns)) {
      hs.rs = ns;
    }
    this.mixKey(hs.ss, this.dh(hs.e.privateKey, hs.rs));
    const { plaintext, valid: valid2 } = this.decryptAndHash(hs.ss, message2.ciphertext);
    return { plaintext, valid: valid1 && valid2 };
  }
  readMessageC(hs, message2) {
    const { plaintext: ns, valid: valid1 } = this.decryptAndHash(hs.ss, message2.ns);
    if (valid1 && isValidPublicKey(ns)) {
      hs.rs = ns;
    }
    if (!hs.e) {
      throw new Error("Handshake state `e` param is missing.");
    }
    this.mixKey(hs.ss, this.dh(hs.e.privateKey, hs.rs));
    const { plaintext, valid: valid2 } = this.decryptAndHash(hs.ss, message2.ciphertext);
    const { cs1, cs2 } = this.split(hs.ss);
    return { h: hs.ss.h, plaintext, valid: valid1 && valid2, cs1, cs2 };
  }
  initSession(initiator, prologue, s) {
    const psk = this.createEmptyKey();
    const rs = new Uint8Array(32);
    let hs;
    if (initiator) {
      hs = this.initializeInitiator(prologue, s, rs, psk);
    } else {
      hs = this.initializeResponder(prologue, s, rs, psk);
    }
    return {
      hs,
      i: initiator,
      mc: 0
    };
  }
  sendMessage(session, message2, ephemeral) {
    let messageBuffer;
    if (session.mc === 0) {
      messageBuffer = this.writeMessageA(session.hs, message2, ephemeral);
    } else if (session.mc === 1) {
      messageBuffer = this.writeMessageB(session.hs, message2);
    } else if (session.mc === 2) {
      const { h, messageBuffer: resultingBuffer, cs1, cs2 } = this.writeMessageC(session.hs, message2);
      messageBuffer = resultingBuffer;
      session.h = h;
      session.cs1 = cs1;
      session.cs2 = cs2;
    } else if (session.mc > 2) {
      if (session.i) {
        if (!session.cs1) {
          throw new Error("CS1 (cipher state) is not defined");
        }
        messageBuffer = this.writeMessageRegular(session.cs1, message2);
      } else {
        if (!session.cs2) {
          throw new Error("CS2 (cipher state) is not defined");
        }
        messageBuffer = this.writeMessageRegular(session.cs2, message2);
      }
    } else {
      throw new Error("Session invalid.");
    }
    session.mc++;
    return messageBuffer;
  }
  recvMessage(session, message2) {
    let plaintext = new Uint8Array(0);
    let valid = false;
    if (session.mc === 0) {
      ({ plaintext, valid } = this.readMessageA(session.hs, message2));
    } else if (session.mc === 1) {
      ({ plaintext, valid } = this.readMessageB(session.hs, message2));
    } else if (session.mc === 2) {
      const { h, plaintext: resultingPlaintext, valid: resultingValid, cs1, cs2 } = this.readMessageC(session.hs, message2);
      plaintext = resultingPlaintext;
      valid = resultingValid;
      session.h = h;
      session.cs1 = cs1;
      session.cs2 = cs2;
    }
    session.mc++;
    return { plaintext, valid };
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/handshake-xx.js
var XXHandshake = class {
  isInitiator;
  session;
  remotePeer;
  remoteExtensions = { webtransportCerthashes: [] };
  payload;
  connection;
  xx;
  staticKeypair;
  prologue;
  constructor(isInitiator, payload, prologue, crypto5, staticKeypair, connection, remotePeer, handshake) {
    this.isInitiator = isInitiator;
    this.payload = payload;
    this.prologue = prologue;
    this.staticKeypair = staticKeypair;
    this.connection = connection;
    if (remotePeer) {
      this.remotePeer = remotePeer;
    }
    this.xx = handshake ?? new XX(crypto5);
    this.session = this.xx.initSession(this.isInitiator, this.prologue, this.staticKeypair);
  }
  // stage 0
  async propose() {
    logLocalStaticKeys(this.session.hs.s);
    if (this.isInitiator) {
      log.trace("Stage 0 - Initiator starting to send first message.");
      const messageBuffer = this.xx.sendMessage(this.session, new Uint8Array(0));
      this.connection.writeLP(encode0(messageBuffer));
      log.trace("Stage 0 - Initiator finished sending first message.");
      logLocalEphemeralKeys(this.session.hs.e);
    } else {
      log.trace("Stage 0 - Responder waiting to receive first message...");
      const receivedMessageBuffer = decode0((await this.connection.readLP()).subarray());
      const { valid } = this.xx.recvMessage(this.session, receivedMessageBuffer);
      if (!valid) {
        throw new InvalidCryptoExchangeError("xx handshake stage 0 validation fail");
      }
      log.trace("Stage 0 - Responder received first message.");
      logRemoteEphemeralKey(this.session.hs.re);
    }
  }
  // stage 1
  async exchange() {
    if (this.isInitiator) {
      log.trace("Stage 1 - Initiator waiting to receive first message from responder...");
      const receivedMessageBuffer = decode1((await this.connection.readLP()).subarray());
      const { plaintext, valid } = this.xx.recvMessage(this.session, receivedMessageBuffer);
      if (!valid) {
        throw new InvalidCryptoExchangeError("xx handshake stage 1 validation fail");
      }
      log.trace("Stage 1 - Initiator received the message.");
      logRemoteEphemeralKey(this.session.hs.re);
      logRemoteStaticKey(this.session.hs.rs);
      log.trace("Initiator going to check remote's signature...");
      try {
        const decodedPayload = decodePayload(plaintext);
        this.remotePeer = this.remotePeer || await getPeerIdFromPayload(decodedPayload);
        await verifySignedPayload(this.session.hs.rs, decodedPayload, this.remotePeer);
        this.setRemoteNoiseExtension(decodedPayload.extensions);
      } catch (e) {
        const err = e;
        throw new UnexpectedPeerError(`Error occurred while verifying signed payload: ${err.message}`);
      }
      log.trace("All good with the signature!");
    } else {
      log.trace("Stage 1 - Responder sending out first message with signed payload and static key.");
      const messageBuffer = this.xx.sendMessage(this.session, this.payload);
      this.connection.writeLP(encode1(messageBuffer));
      log.trace("Stage 1 - Responder sent the second handshake message with signed payload.");
      logLocalEphemeralKeys(this.session.hs.e);
    }
  }
  // stage 2
  async finish() {
    if (this.isInitiator) {
      log.trace("Stage 2 - Initiator sending third handshake message.");
      const messageBuffer = this.xx.sendMessage(this.session, this.payload);
      this.connection.writeLP(encode22(messageBuffer));
      log.trace("Stage 2 - Initiator sent message with signed payload.");
    } else {
      log.trace("Stage 2 - Responder waiting for third handshake message...");
      const receivedMessageBuffer = decode22((await this.connection.readLP()).subarray());
      const { plaintext, valid } = this.xx.recvMessage(this.session, receivedMessageBuffer);
      if (!valid) {
        throw new InvalidCryptoExchangeError("xx handshake stage 2 validation fail");
      }
      log.trace("Stage 2 - Responder received the message, finished handshake.");
      try {
        const decodedPayload = decodePayload(plaintext);
        this.remotePeer = this.remotePeer || await getPeerIdFromPayload(decodedPayload);
        await verifySignedPayload(this.session.hs.rs, decodedPayload, this.remotePeer);
        this.setRemoteNoiseExtension(decodedPayload.extensions);
      } catch (e) {
        const err = e;
        throw new UnexpectedPeerError(`Error occurred while verifying signed payload: ${err.message}`);
      }
    }
    logCipherState(this.session);
  }
  encrypt(plaintext, session) {
    const cs = this.getCS(session);
    return this.xx.encryptWithAd(cs, new Uint8Array(0), plaintext);
  }
  decrypt(ciphertext, session, dst) {
    const cs = this.getCS(session, false);
    return this.xx.decryptWithAd(cs, new Uint8Array(0), ciphertext, dst);
  }
  getRemoteStaticKey() {
    return this.session.hs.rs;
  }
  getCS(session, encryption = true) {
    if (!session.cs1 || !session.cs2) {
      throw new InvalidCryptoExchangeError("Handshake not completed properly, cipher state does not exist.");
    }
    if (this.isInitiator) {
      return encryption ? session.cs1 : session.cs2;
    } else {
      return encryption ? session.cs2 : session.cs1;
    }
  }
  setRemoteNoiseExtension(e) {
    if (e) {
      this.remoteExtensions = e;
    }
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/metrics.js
function registerMetrics(metrics) {
  return {
    xxHandshakeSuccesses: metrics.registerCounter("libp2p_noise_xxhandshake_successes_total", {
      help: "Total count of noise xxHandshakes successes_"
    }),
    xxHandshakeErrors: metrics.registerCounter("libp2p_noise_xxhandshake_error_total", {
      help: "Total count of noise xxHandshakes errors"
    }),
    encryptedPackets: metrics.registerCounter("libp2p_noise_encrypted_packets_total", {
      help: "Total count of noise encrypted packets successfully"
    }),
    decryptedPackets: metrics.registerCounter("libp2p_noise_decrypted_packets_total", {
      help: "Total count of noise decrypted packets"
    }),
    decryptErrors: metrics.registerCounter("libp2p_noise_decrypt_errors_total", {
      help: "Total count of noise decrypt errors"
    })
  };
}

// node_modules/@chainsafe/libp2p-noise/dist/src/noise.js
var Noise = class {
  protocol = "/noise";
  crypto;
  prologue;
  staticKeys;
  extensions;
  metrics;
  constructor(init = {}) {
    const { staticNoiseKey, extensions, crypto: crypto5, prologueBytes, metrics } = init;
    this.crypto = crypto5 ?? pureJsCrypto;
    this.extensions = extensions;
    this.metrics = metrics ? registerMetrics(metrics) : void 0;
    if (staticNoiseKey) {
      this.staticKeys = this.crypto.generateX25519KeyPairFromSeed(staticNoiseKey);
    } else {
      this.staticKeys = this.crypto.generateX25519KeyPair();
    }
    this.prologue = prologueBytes ?? new Uint8Array(0);
  }
  /**
   * Encrypt outgoing data to the remote party (handshake as initiator)
   *
   * @param {PeerId} localPeer - PeerId of the receiving peer
   * @param {Duplex<AsyncGenerator<Uint8Array>, AsyncIterable<Uint8Array>, Promise<void>>} connection - streaming iterable duplex that will be encrypted
   * @param {PeerId} remotePeer - PeerId of the remote peer. Used to validate the integrity of the remote peer.
   * @returns {Promise<SecuredConnection>}
   */
  async secureOutbound(localPeer, connection, remotePeer) {
    const wrappedConnection = pbStream(connection, {
      lengthEncoder: uint16BEEncode,
      lengthDecoder: uint16BEDecode,
      maxDataLength: NOISE_MSG_MAX_LENGTH_BYTES
    });
    const handshake = await this.performHandshake({
      connection: wrappedConnection,
      isInitiator: true,
      localPeer,
      remotePeer
    });
    const conn = await this.createSecureConnection(wrappedConnection, handshake);
    return {
      conn,
      remoteExtensions: handshake.remoteExtensions,
      remotePeer: handshake.remotePeer
    };
  }
  /**
   * Decrypt incoming data (handshake as responder).
   *
   * @param {PeerId} localPeer - PeerId of the receiving peer.
   * @param {Duplex<AsyncGenerator<Uint8Array>, AsyncIterable<Uint8Array>, Promise<void>>} connection - streaming iterable duplex that will be encryption.
   * @param {PeerId} remotePeer - optional PeerId of the initiating peer, if known. This may only exist during transport upgrades.
   * @returns {Promise<SecuredConnection>}
   */
  async secureInbound(localPeer, connection, remotePeer) {
    const wrappedConnection = pbStream(connection, {
      lengthEncoder: uint16BEEncode,
      lengthDecoder: uint16BEDecode,
      maxDataLength: NOISE_MSG_MAX_LENGTH_BYTES
    });
    const handshake = await this.performHandshake({
      connection: wrappedConnection,
      isInitiator: false,
      localPeer,
      remotePeer
    });
    const conn = await this.createSecureConnection(wrappedConnection, handshake);
    return {
      conn,
      remotePeer: handshake.remotePeer,
      remoteExtensions: handshake.remoteExtensions
    };
  }
  /**
   * If Noise pipes supported, tries IK handshake first with XX as fallback if it fails.
   * If noise pipes disabled or remote peer static key is unknown, use XX.
   *
   * @param {HandshakeParams} params
   */
  async performHandshake(params) {
    const payload = await getPayload(params.localPeer, this.staticKeys.publicKey, this.extensions);
    return this.performXXHandshake(params, payload);
  }
  async performXXHandshake(params, payload) {
    const { isInitiator, remotePeer, connection } = params;
    const handshake = new XXHandshake(isInitiator, payload, this.prologue, this.crypto, this.staticKeys, connection, remotePeer);
    try {
      await handshake.propose();
      await handshake.exchange();
      await handshake.finish();
      this.metrics?.xxHandshakeSuccesses.increment();
    } catch (e) {
      this.metrics?.xxHandshakeErrors.increment();
      if (e instanceof Error) {
        e.message = `Error occurred during XX handshake: ${e.message}`;
        throw e;
      }
    }
    return handshake;
  }
  async createSecureConnection(connection, handshake) {
    const [secure, user] = duplexPair();
    const network = connection.unwrap();
    await pipe(
      secure,
      // write to wrapper
      encryptStream(handshake, this.metrics),
      // encrypt data + prefix with message length
      network,
      // send to the remote peer
      (source) => decode2(source, { lengthDecoder: uint16BEDecode }),
      // read message length prefix
      decryptStream(handshake, this.metrics),
      // decrypt the incoming data
      secure
      // pipe to the wrapper
    );
    return user;
  }
};

// node_modules/@chainsafe/libp2p-noise/dist/src/index.js
function noise(init = {}) {
  return () => new Noise(init);
}

// node_modules/@libp2p/interface-transport/dist/src/index.js
var symbol3 = Symbol.for("@libp2p/transport");
var FaultTolerance;
(function(FaultTolerance2) {
  FaultTolerance2[FaultTolerance2["FATAL_ALL"] = 0] = "FATAL_ALL";
  FaultTolerance2[FaultTolerance2["NO_FATAL"] = 1] = "NO_FATAL";
})(FaultTolerance || (FaultTolerance = {}));

// node_modules/@libp2p/webtransport/node_modules/@libp2p/logger/dist/src/index.js
var import_debug2 = __toESM(require_browser(), 1);

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base58.js
var base58_exports4 = {};
__export(base58_exports4, {
  base58btc: () => base58btc6,
  base58flickr: () => base58flickr6
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/vendor/base-x.js
function base7(ALPHABET, name7) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode28(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length8 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length8) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      pbegin++;
    }
    var it2 = size - length8;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length8 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length8) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length8;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode33(string4) {
    var buffer = decodeUnsafe(string4);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name7} character`);
  }
  return {
    encode: encode28,
    decodeUnsafe,
    decode: decode33
  };
}
var src6 = base7;
var _brrp__multiformats_scope_baseX6 = src6;
var base_x_default6 = _brrp__multiformats_scope_baseX6;

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bytes.js
var empty6 = new Uint8Array(0);
var equals10 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce6 = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var fromString6 = (str) => new TextEncoder().encode(str);
var toString5 = (b) => new TextDecoder().decode(b);

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base.js
var Encoder6 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name7, prefix, baseEncode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes3) {
    if (bytes3 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes3)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder6 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or6(this, decoder);
  }
};
var ComposedDecoder6 = class {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or6(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or6 = (left, right) => new ComposedDecoder6(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
var Codec6 = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name7, prefix, baseEncode, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder6(name7, prefix, baseEncode);
    this.decoder = new Decoder6(name7, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from10 = ({ name: name7, prefix, encode: encode28, decode: decode33 }) => new Codec6(name7, prefix, encode28, decode33);
var baseX6 = ({ prefix, name: name7, alphabet: alphabet6 }) => {
  const { encode: encode28, decode: decode33 } = base_x_default6(alphabet6, name7);
  return from10({
    prefix,
    name: name7,
    encode: encode28,
    /**
     * @param {string} text
     */
    decode: (text) => coerce6(decode33(text))
  });
};
var decode23 = (string4, alphabet6, bitsPerChar, name7) => {
  const codes2 = {};
  for (let i = 0; i < alphabet6.length; ++i) {
    codes2[alphabet6[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name7} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || 255 & buffer << 8 - bits2) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode19 = (data, alphabet6, bitsPerChar) => {
  const pad = alphabet6[alphabet6.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet6[mask & buffer >> bits2];
    }
  }
  if (bits2) {
    out += alphabet6[mask & buffer << bitsPerChar - bits2];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc46486 = ({ name: name7, prefix, bitsPerChar, alphabet: alphabet6 }) => {
  return from10({
    prefix,
    name: name7,
    encode(input) {
      return encode19(input, alphabet6, bitsPerChar);
    },
    decode(input) {
      return decode23(input, alphabet6, bitsPerChar, name7);
    }
  });
};

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base58.js
var base58btc6 = baseX6({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr6 = baseX6({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base32.js
var base32_exports4 = {};
__export(base32_exports4, {
  base32: () => base325,
  base32hex: () => base32hex5,
  base32hexpad: () => base32hexpad5,
  base32hexpadupper: () => base32hexpadupper5,
  base32hexupper: () => base32hexupper5,
  base32pad: () => base32pad5,
  base32padupper: () => base32padupper5,
  base32upper: () => base32upper5,
  base32z: () => base32z5
});
var base325 = rfc46486({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper5 = rfc46486({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad5 = rfc46486({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper5 = rfc46486({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex5 = rfc46486({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper5 = rfc46486({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad5 = rfc46486({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper5 = rfc46486({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z5 = rfc46486({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base64.js
var base64_exports4 = {};
__export(base64_exports4, {
  base64: () => base646,
  base64pad: () => base64pad6,
  base64url: () => base64url6,
  base64urlpad: () => base64urlpad6
});
var base646 = rfc46486({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad6 = rfc46486({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url6 = rfc46486({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad6 = rfc46486({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@libp2p/webtransport/node_modules/@libp2p/logger/dist/src/index.js
import_debug2.default.formatters.b = (v) => {
  return v == null ? "undefined" : base58btc6.baseEncode(v);
};
import_debug2.default.formatters.t = (v) => {
  return v == null ? "undefined" : base325.baseEncode(v);
};
import_debug2.default.formatters.m = (v) => {
  return v == null ? "undefined" : base646.baseEncode(v);
};
import_debug2.default.formatters.p = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug2.default.formatters.c = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug2.default.formatters.k = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug2.default.formatters.a = (v) => {
  return v == null ? "undefined" : v.toString();
};
function createDisabledLogger2(namespace) {
  const logger3 = () => {
  };
  logger3.enabled = false;
  logger3.color = "";
  logger3.diff = 0;
  logger3.log = () => {
  };
  logger3.namespace = namespace;
  logger3.destroy = () => true;
  logger3.extend = () => logger3;
  return logger3;
}
function logger2(name7) {
  let trace = createDisabledLogger2(`${name7}:trace`);
  if (import_debug2.default.enabled(`${name7}:trace`) && import_debug2.default.names.map((r) => r.toString()).find((n) => n.includes(":trace")) != null) {
    trace = (0, import_debug2.default)(`${name7}:trace`);
  }
  return Object.assign((0, import_debug2.default)(name7), {
    error: (0, import_debug2.default)(`${name7}:error`),
    trace
  });
}

// node_modules/@multiformats/multiaddr/node_modules/@libp2p/interface/dist/src/errors.js
var CodeError2 = class extends Error {
  code;
  props;
  constructor(message2, code7, props) {
    super(message2);
    this.code = code7;
    this.name = props?.name ?? "CodeError";
    this.props = props ?? {};
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports5 = {};
__export(base58_exports5, {
  base58btc: () => base58btc7,
  base58flickr: () => base58flickr7
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bytes.js
var empty7 = new Uint8Array(0);
function equals11(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce7(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString7(str) {
  return new TextEncoder().encode(str);
}
function toString6(b) {
  return new TextDecoder().decode(b);
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/vendor/base-x.js
function base9(ALPHABET, name7) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode28(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length8 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length8) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      pbegin++;
    }
    var it2 = size - length8;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length8 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length8) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length8 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length8;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode33(string4) {
    var buffer = decodeUnsafe(string4);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name7} character`);
  }
  return {
    encode: encode28,
    decodeUnsafe,
    decode: decode33
  };
}
var src7 = base9;
var _brrp__multiformats_scope_baseX7 = src7;
var base_x_default7 = _brrp__multiformats_scope_baseX7;

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base.js
var Encoder7 = class {
  name;
  prefix;
  baseEncode;
  constructor(name7, prefix, baseEncode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes3) {
    if (bytes3 instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes3)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder7 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name7, prefix, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or7(this, decoder);
  }
};
var ComposedDecoder7 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or7(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or7(left, right) {
  return new ComposedDecoder7({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec7 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name7, prefix, baseEncode, baseDecode) {
    this.name = name7;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder7(name7, prefix, baseEncode);
    this.decoder = new Decoder7(name7, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from11({ name: name7, prefix, encode: encode28, decode: decode33 }) {
  return new Codec7(name7, prefix, encode28, decode33);
}
function baseX7({ name: name7, prefix, alphabet: alphabet6 }) {
  const { encode: encode28, decode: decode33 } = base_x_default7(alphabet6, name7);
  return from11({
    prefix,
    name: name7,
    encode: encode28,
    decode: (text) => coerce7(decode33(text))
  });
}
function decode24(string4, alphabet6, bitsPerChar, name7) {
  const codes2 = {};
  for (let i = 0; i < alphabet6.length; ++i) {
    codes2[alphabet6[i]] = i;
  }
  let end = string4.length;
  while (string4[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits2 = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string4[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name7} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits2 += bitsPerChar;
    if (bits2 >= 8) {
      bits2 -= 8;
      out[written++] = 255 & buffer >> bits2;
    }
  }
  if (bits2 >= bitsPerChar || (255 & buffer << 8 - bits2) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode20(data, alphabet6, bitsPerChar) {
  const pad = alphabet6[alphabet6.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits2 = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits2 += 8;
    while (bits2 > bitsPerChar) {
      bits2 -= bitsPerChar;
      out += alphabet6[mask & buffer >> bits2];
    }
  }
  if (bits2 !== 0) {
    out += alphabet6[mask & buffer << bitsPerChar - bits2];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46487({ name: name7, prefix, bitsPerChar, alphabet: alphabet6 }) {
  return from11({
    prefix,
    name: name7,
    encode(input) {
      return encode20(input, alphabet6, bitsPerChar);
    },
    decode(input) {
      return decode24(input, alphabet6, bitsPerChar, name7);
    }
  });
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base58.js
var base58btc7 = baseX7({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr7 = baseX7({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base32.js
var base32_exports5 = {};
__export(base32_exports5, {
  base32: () => base326,
  base32hex: () => base32hex6,
  base32hexpad: () => base32hexpad6,
  base32hexpadupper: () => base32hexpadupper6,
  base32hexupper: () => base32hexupper6,
  base32pad: () => base32pad6,
  base32padupper: () => base32padupper6,
  base32upper: () => base32upper6,
  base32z: () => base32z6
});
var base326 = rfc46487({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper6 = rfc46487({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad6 = rfc46487({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper6 = rfc46487({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex6 = rfc46487({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper6 = rfc46487({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad6 = rfc46487({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper6 = rfc46487({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z6 = rfc46487({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/vendor/varint.js
var encode_15 = encode21;
var MSB6 = 128;
var REST6 = 127;
var MSBALL5 = ~REST6;
var INT5 = Math.pow(2, 31);
function encode21(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT5) {
    out[offset++] = num & 255 | MSB6;
    num /= 128;
  }
  while (num & MSBALL5) {
    out[offset++] = num & 255 | MSB6;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode21.bytes = offset - oldOffset + 1;
  return out;
}
var decode25 = read6;
var MSB$15 = 128;
var REST$15 = 127;
function read6(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read6.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$15) << shift : (b & REST$15) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$15);
  read6.bytes = counter - offset;
  return res;
}
var N17 = Math.pow(2, 7);
var N27 = Math.pow(2, 14);
var N37 = Math.pow(2, 21);
var N47 = Math.pow(2, 28);
var N57 = Math.pow(2, 35);
var N67 = Math.pow(2, 42);
var N77 = Math.pow(2, 49);
var N86 = Math.pow(2, 56);
var N96 = Math.pow(2, 63);
var length6 = function(value) {
  return value < N17 ? 1 : value < N27 ? 2 : value < N37 ? 3 : value < N47 ? 4 : value < N57 ? 5 : value < N67 ? 6 : value < N77 ? 7 : value < N86 ? 8 : value < N96 ? 9 : 10;
};
var varint5 = {
  encode: encode_15,
  decode: decode25,
  encodingLength: length6
};
var _brrp_varint5 = varint5;
var varint_default5 = _brrp_varint5;

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/varint.js
function decode26(data, offset = 0) {
  const code7 = varint_default5.decode(data, offset);
  return [code7, varint_default5.decode.bytes];
}
function encodeTo5(int, target, offset = 0) {
  varint_default5.encode(int, target, offset);
  return target;
}
function encodingLength6(int) {
  return varint_default5.encodingLength(int);
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/digest.js
function create7(code7, digest7) {
  const size = digest7.byteLength;
  const sizeOffset = encodingLength6(code7);
  const digestOffset = sizeOffset + encodingLength6(size);
  const bytes3 = new Uint8Array(digestOffset + size);
  encodeTo5(code7, bytes3, 0);
  encodeTo5(size, bytes3, sizeOffset);
  bytes3.set(digest7, digestOffset);
  return new Digest5(code7, size, digest7, bytes3);
}
function decode27(multihash) {
  const bytes3 = coerce7(multihash);
  const [code7, sizeOffset] = decode26(bytes3);
  const [size, digestOffset] = decode26(bytes3.subarray(sizeOffset));
  const digest7 = bytes3.subarray(sizeOffset + digestOffset);
  if (digest7.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest5(code7, size, digest7, bytes3);
}
function equals12(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals11(a.bytes, data.bytes);
  }
}
var Digest5 = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code7, size, digest7, bytes3) {
    this.code = code7;
    this.size = size;
    this.digest = digest7;
    this.bytes = bytes3;
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/cid.js
function format4(link, base11) {
  const { bytes: bytes3, version } = link;
  switch (version) {
    case 0:
      return toStringV04(bytes3, baseCache4(link), base11 ?? base58btc7.encoder);
    default:
      return toStringV14(bytes3, baseCache4(link), base11 ?? base326.encoder);
  }
}
var cache4 = /* @__PURE__ */ new WeakMap();
function baseCache4(cid) {
  const baseCache6 = cache4.get(cid);
  if (baseCache6 == null) {
    const baseCache7 = /* @__PURE__ */ new Map();
    cache4.set(cid, baseCache7);
    return baseCache7;
  }
  return baseCache6;
}
var CID4 = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code7, multihash, bytes3) {
    this.code = code7;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes3;
    this["/"] = bytes3;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code7, multihash } = this;
        if (code7 !== DAG_PB_CODE4) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE4) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code7, digest: digest7 } = this.multihash;
        const multihash = create7(code7, digest7);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals12(self2.multihash, unknown.multihash);
  }
  toString(base11) {
    return format4(this, base11);
  }
  toJSON() {
    return { "/": format4(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code7, multihash, bytes: bytes3 } = value;
      return new _CID(version, code7, multihash, bytes3 ?? encodeCID4(version, code7, multihash.bytes));
    } else if (value[cidSymbol4] === true) {
      const { version, multihash, code: code7 } = value;
      const digest7 = decode27(multihash);
      return _CID.create(version, code7, digest7);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code7, digest7) {
    if (typeof code7 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest7.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code7 !== DAG_PB_CODE4) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE4}) block encoding`);
        } else {
          return new _CID(version, code7, digest7, digest7.bytes);
        }
      }
      case 1: {
        const bytes3 = encodeCID4(version, code7, digest7.bytes);
        return new _CID(version, code7, digest7, bytes3);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest7) {
    return _CID.create(0, DAG_PB_CODE4, digest7);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code7, digest7) {
    return _CID.create(1, code7, digest7);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes3) {
    const [cid, remainder] = _CID.decodeFirst(bytes3);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes3) {
    const specs = _CID.inspectBytes(bytes3);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce7(bytes3.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest7 = new Digest5(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest7) : _CID.createV1(specs.codec, digest7);
    return [cid, bytes3.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length8] = decode26(initialBytes.subarray(offset));
      offset += length8;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE4;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source, base11) {
    const [prefix, bytes3] = parseCIDtoBytes4(source, base11);
    const cid = _CID.decode(bytes3);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache4(cid).set(prefix, source);
    return cid;
  }
};
function parseCIDtoBytes4(source, base11) {
  switch (source[0]) {
    case "Q": {
      const decoder = base11 ?? base58btc7;
      return [
        base58btc7.prefix,
        decoder.decode(`${base58btc7.prefix}${source}`)
      ];
    }
    case base58btc7.prefix: {
      const decoder = base11 ?? base58btc7;
      return [base58btc7.prefix, decoder.decode(source)];
    }
    case base326.prefix: {
      const decoder = base11 ?? base326;
      return [base326.prefix, decoder.decode(source)];
    }
    default: {
      if (base11 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base11.decode(source)];
    }
  }
}
function toStringV04(bytes3, cache6, base11) {
  const { prefix } = base11;
  if (prefix !== base58btc7.prefix) {
    throw Error(`Cannot string encode V0 in ${base11.name} encoding`);
  }
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3).slice(1);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV14(bytes3, cache6, base11) {
  const { prefix } = base11;
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE4 = 112;
var SHA_256_CODE4 = 18;
function encodeCID4(version, code7, multihash) {
  const codeOffset = encodingLength6(version);
  const hashOffset = codeOffset + encodingLength6(code7);
  const bytes3 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo5(version, bytes3, 0);
  encodeTo5(code7, bytes3, codeOffset);
  bytes3.set(multihash, hashOffset);
  return bytes3;
}
var cidSymbol4 = Symbol.for("@ipld/js-cid/CID");

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/equals.js
function equals13(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports4 = {};
__export(base10_exports4, {
  base10: () => base104
});
var base104 = baseX7({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base16.js
var base16_exports4 = {};
__export(base16_exports4, {
  base16: () => base164,
  base16upper: () => base16upper4
});
var base164 = rfc46487({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper4 = rfc46487({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base2.js
var base2_exports4 = {};
__export(base2_exports4, {
  base2: () => base24
});
var base24 = rfc46487({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports4 = {};
__export(base256emoji_exports4, {
  base256emoji: () => base256emoji4
});
var alphabet4 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars4 = alphabet4.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes4 = alphabet4.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode23(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars4[c];
    return p;
  }, "");
}
function decode28(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes4[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji4 = from11({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode23,
  decode: decode28
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base36.js
var base36_exports4 = {};
__export(base36_exports4, {
  base36: () => base364,
  base36upper: () => base36upper4
});
var base364 = baseX7({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper4 = baseX7({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base64.js
var base64_exports5 = {};
__export(base64_exports5, {
  base64: () => base647,
  base64pad: () => base64pad7,
  base64url: () => base64url7,
  base64urlpad: () => base64urlpad7
});
var base647 = rfc46487({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad7 = rfc46487({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url7 = rfc46487({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad7 = rfc46487({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base8.js
var base8_exports4 = {};
__export(base8_exports4, {
  base8: () => base84
});
var base84 = rfc46487({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports7 = {};
__export(identity_exports7, {
  identity: () => identity8
});
var identity8 = from11({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString6(buf),
  decode: (str) => fromString7(str)
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/codecs/json.js
var textEncoder4 = new TextEncoder();
var textDecoder4 = new TextDecoder();

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports8 = {};
__export(identity_exports8, {
  identity: () => identity9
});
var code5 = 0;
var name5 = "identity";
var encode24 = coerce7;
function digest5(input) {
  return create7(code5, encode24(input));
}
var identity9 = { code: code5, name: name5, encode: encode24, digest: digest5 };

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports4 = {};
__export(sha2_browser_exports4, {
  sha256: () => sha2566,
  sha512: () => sha5125
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/hasher.js
function from12({ name: name7, code: code7, encode: encode28 }) {
  return new Hasher5(name7, code7, encode28);
}
var Hasher5 = class {
  name;
  code;
  encode;
  constructor(name7, code7, encode28) {
    this.name = name7;
    this.code = code7;
    this.encode = encode28;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create7(this.code, result) : result.then((digest7) => create7(this.code, digest7));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/sha2-browser.js
function sha5(name7) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name7, data));
}
var sha2566 = from12({
  name: "sha2-256",
  code: 18,
  encode: sha5("SHA-256")
});
var sha5125 = from12({
  name: "sha2-512",
  code: 19,
  encode: sha5("SHA-512")
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/basics.js
var bases4 = { ...identity_exports7, ...base2_exports4, ...base8_exports4, ...base10_exports4, ...base16_exports4, ...base32_exports5, ...base36_exports4, ...base58_exports5, ...base64_exports5, ...base256emoji_exports4 };
var hashes4 = { ...sha2_browser_exports4, ...identity_exports8 };

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe7(size = 0) {
  return new Uint8Array(size);
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec4(name7, prefix, encode28, decode33) {
  return {
    name: name7,
    prefix,
    encoder: {
      name: name7,
      prefix,
      encode: encode28
    },
    decoder: {
      decode: decode33
    }
  };
}
var string3 = createCodec4("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii3 = createCodec4("ascii", "a", (buf) => {
  let string4 = "a";
  for (let i = 0; i < buf.length; i++) {
    string4 += String.fromCharCode(buf[i]);
  }
  return string4;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe7(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES3 = {
  utf8: string3,
  "utf-8": string3,
  hex: bases4.base16,
  latin1: ascii3,
  ascii: ascii3,
  binary: ascii3,
  ...bases4
};
var bases_default3 = BASES3;

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/to-string.js
function toString7(array, encoding = "utf8") {
  const base11 = bases_default3[encoding];
  if (base11 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base11.encoder.encode(array).substring(1);
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/util/as-uint8array.js
function asUint8Array3(buf) {
  return buf;
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/concat.js
function concat3(arrays, length8) {
  if (length8 == null) {
    length8 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output3 = allocUnsafe7(length8);
  let offset = 0;
  for (const arr of arrays) {
    output3.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array3(output3);
}

// node_modules/@chainsafe/is-ip/lib/parser.js
var Parser = class {
  index = 0;
  input = "";
  new(input) {
    this.index = 0;
    this.input = input;
    return this;
  }
  /** Run a parser, and restore the pre-parse state if it fails. */
  readAtomically(fn) {
    const index = this.index;
    const result = fn();
    if (result === void 0) {
      this.index = index;
    }
    return result;
  }
  /** Run a parser, but fail if the entire input wasn't consumed. Doesn't run atomically. */
  parseWith(fn) {
    const result = fn();
    if (this.index !== this.input.length) {
      return void 0;
    }
    return result;
  }
  /** Peek the next character from the input */
  peekChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index];
  }
  /** Read the next character from the input */
  readChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index++];
  }
  /** Read the next character from the input if it matches the target. */
  readGivenChar(target) {
    return this.readAtomically(() => {
      const char = this.readChar();
      if (char !== target) {
        return void 0;
      }
      return char;
    });
  }
  /**
   * Helper for reading separators in an indexed loop. Reads the separator
   * character iff index > 0, then runs the parser. When used in a loop,
   * the separator character will only be read on index > 0 (see
   * readIPv4Addr for an example)
   */
  readSeparator(sep, index, inner) {
    return this.readAtomically(() => {
      if (index > 0) {
        if (this.readGivenChar(sep) === void 0) {
          return void 0;
        }
      }
      return inner();
    });
  }
  /**
   * Read a number off the front of the input in the given radix, stopping
   * at the first non-digit character or eof. Fails if the number has more
   * digits than max_digits or if there is no number.
   */
  readNumber(radix, maxDigits, allowZeroPrefix, maxBytes) {
    return this.readAtomically(() => {
      let result = 0;
      let digitCount = 0;
      const leadingChar = this.peekChar();
      if (leadingChar === void 0) {
        return void 0;
      }
      const hasLeadingZero = leadingChar === "0";
      const maxValue = 2 ** (8 * maxBytes) - 1;
      while (true) {
        const digit = this.readAtomically(() => {
          const char = this.readChar();
          if (char === void 0) {
            return void 0;
          }
          const num = Number.parseInt(char, radix);
          if (Number.isNaN(num)) {
            return void 0;
          }
          return num;
        });
        if (digit === void 0) {
          break;
        }
        result *= radix;
        result += digit;
        if (result > maxValue) {
          return void 0;
        }
        digitCount += 1;
        if (maxDigits !== void 0) {
          if (digitCount > maxDigits) {
            return void 0;
          }
        }
      }
      if (digitCount === 0) {
        return void 0;
      } else if (!allowZeroPrefix && hasLeadingZero && digitCount > 1) {
        return void 0;
      } else {
        return result;
      }
    });
  }
  /** Read an IPv4 address. */
  readIPv4Addr() {
    return this.readAtomically(() => {
      const out = new Uint8Array(4);
      for (let i = 0; i < out.length; i++) {
        const ix = this.readSeparator(".", i, () => this.readNumber(10, 3, false, 1));
        if (ix === void 0) {
          return void 0;
        }
        out[i] = ix;
      }
      return out;
    });
  }
  /** Read an IPv6 Address. */
  readIPv6Addr() {
    const readGroups = (groups) => {
      for (let i = 0; i < groups.length / 2; i++) {
        const ix = i * 2;
        if (i < groups.length - 3) {
          const ipv4 = this.readSeparator(":", i, () => this.readIPv4Addr());
          if (ipv4 !== void 0) {
            groups[ix] = ipv4[0];
            groups[ix + 1] = ipv4[1];
            groups[ix + 2] = ipv4[2];
            groups[ix + 3] = ipv4[3];
            return [ix + 4, true];
          }
        }
        const group = this.readSeparator(":", i, () => this.readNumber(16, 4, true, 2));
        if (group === void 0) {
          return [ix, false];
        }
        groups[ix] = group >> 8;
        groups[ix + 1] = group & 255;
      }
      return [groups.length, false];
    };
    return this.readAtomically(() => {
      const head = new Uint8Array(16);
      const [headSize, headIp4] = readGroups(head);
      if (headSize === 16) {
        return head;
      }
      if (headIp4) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      const tail = new Uint8Array(14);
      const limit = 16 - (headSize + 2);
      const [tailSize] = readGroups(tail.subarray(0, limit));
      head.set(tail.subarray(0, tailSize), 16 - tailSize);
      return head;
    });
  }
  /** Read an IP Address, either IPv4 or IPv6. */
  readIPAddr() {
    return this.readIPv4Addr() ?? this.readIPv6Addr();
  }
};

// node_modules/@chainsafe/is-ip/lib/parse.js
var MAX_IPV6_LENGTH = 45;
var MAX_IPV4_LENGTH = 15;
var parser = new Parser();
function parseIPv4(input) {
  if (input.length > MAX_IPV4_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv4Addr());
}
function parseIPv6(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv6Addr());
}
function parseIP(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPAddr());
}

// node_modules/@chainsafe/netmask/dist/src/ip.js
var maxIPv6Octet = parseInt("0xFFFF", 16);
var ipv4Prefix = new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  255,
  255
]);

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/from-string.js
function fromString8(string4, encoding = "utf8") {
  const base11 = bases_default3[encoding];
  if (base11 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base11.decoder.decode(`${base11.prefix}${string4}`);
}

// node_modules/@chainsafe/is-ip/lib/is-ip.js
function isIPv4(input) {
  return Boolean(parseIPv4(input));
}
function isIPv6(input) {
  return Boolean(parseIPv6(input));
}
function isIP(input) {
  return Boolean(parseIP(input));
}

// node_modules/@multiformats/multiaddr/dist/src/ip.js
var isV4 = isIPv4;
var isV6 = isIPv6;
var toBytes3 = function(ip) {
  let offset = 0;
  ip = ip.toString().trim();
  if (isV4(ip)) {
    const bytes3 = new Uint8Array(offset + 4);
    ip.split(/\./g).forEach((byte) => {
      bytes3[offset++] = parseInt(byte, 10) & 255;
    });
    return bytes3;
  }
  if (isV6(ip)) {
    const sections = ip.split(":", 8);
    let i;
    for (i = 0; i < sections.length; i++) {
      const isv4 = isV4(sections[i]);
      let v4Buffer;
      if (isv4) {
        v4Buffer = toBytes3(sections[i]);
        sections[i] = toString7(v4Buffer.slice(0, 2), "base16");
      }
      if (v4Buffer != null && ++i < 8) {
        sections.splice(i, 0, toString7(v4Buffer.slice(2, 4), "base16"));
      }
    }
    if (sections[0] === "") {
      while (sections.length < 8)
        sections.unshift("0");
    } else if (sections[sections.length - 1] === "") {
      while (sections.length < 8)
        sections.push("0");
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ""; i++)
        ;
      const argv = [i, 1];
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push("0");
      }
      sections.splice.apply(sections, argv);
    }
    const bytes3 = new Uint8Array(offset + 16);
    for (i = 0; i < sections.length; i++) {
      const word = parseInt(sections[i], 16);
      bytes3[offset++] = word >> 8 & 255;
      bytes3[offset++] = word & 255;
    }
    return bytes3;
  }
  throw new Error("invalid ip address");
};
var toString8 = function(buf, offset = 0, length8) {
  offset = ~~offset;
  length8 = length8 ?? buf.length - offset;
  const view = new DataView(buf.buffer);
  if (length8 === 4) {
    const result = [];
    for (let i = 0; i < length8; i++) {
      result.push(buf[offset + i]);
    }
    return result.join(".");
  }
  if (length8 === 16) {
    const result = [];
    for (let i = 0; i < length8; i += 2) {
      result.push(view.getUint16(offset + i).toString(16));
    }
    return result.join(":").replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3").replace(/:{3,4}/, "::");
  }
  return "";
};

// node_modules/@multiformats/multiaddr/dist/src/protocols-table.js
var V = -1;
var names2 = {};
var codes = {};
var table = [
  [4, 32, "ip4"],
  [6, 16, "tcp"],
  [33, 16, "dccp"],
  [41, 128, "ip6"],
  [42, V, "ip6zone"],
  [43, 8, "ipcidr"],
  [53, V, "dns", true],
  [54, V, "dns4", true],
  [55, V, "dns6", true],
  [56, V, "dnsaddr", true],
  [132, 16, "sctp"],
  [273, 16, "udp"],
  [275, 0, "p2p-webrtc-star"],
  [276, 0, "p2p-webrtc-direct"],
  [277, 0, "p2p-stardust"],
  [280, 0, "webrtc-direct"],
  [281, 0, "webrtc"],
  [290, 0, "p2p-circuit"],
  [301, 0, "udt"],
  [302, 0, "utp"],
  [400, V, "unix", false, true],
  // `ipfs` is added before `p2p` for legacy support.
  // All text representations will default to `p2p`, but `ipfs` will
  // still be supported
  [421, V, "ipfs"],
  // `p2p` is the preferred name for 421, and is now the default
  [421, V, "p2p"],
  [443, 0, "https"],
  [444, 96, "onion"],
  [445, 296, "onion3"],
  [446, V, "garlic64"],
  [448, 0, "tls"],
  [449, V, "sni"],
  [460, 0, "quic"],
  [461, 0, "quic-v1"],
  [465, 0, "webtransport"],
  [466, V, "certhash"],
  [477, 0, "ws"],
  [478, 0, "wss"],
  [479, 0, "p2p-websocket-star"],
  [480, 0, "http"],
  [481, V, "http-path"],
  [777, V, "memory"]
];
table.forEach((row) => {
  const proto = createProtocol(...row);
  codes[proto.code] = proto;
  names2[proto.name] = proto;
});
function createProtocol(code7, size, name7, resolvable, path) {
  return {
    code: code7,
    size,
    name: name7,
    resolvable: Boolean(resolvable),
    path: Boolean(path)
  };
}
function getProtocol(proto) {
  if (typeof proto === "number") {
    if (codes[proto] != null) {
      return codes[proto];
    }
    throw new Error(`no protocol with code: ${proto}`);
  } else if (typeof proto === "string") {
    if (names2[proto] != null) {
      return names2[proto];
    }
    throw new Error(`no protocol with name: ${proto}`);
  }
  throw new Error(`invalid protocol id type: ${typeof proto}`);
}

// node_modules/@multiformats/multiaddr/dist/src/convert.js
var ip4Protocol = getProtocol("ip4");
var ip6Protocol = getProtocol("ip6");
var ipcidrProtocol = getProtocol("ipcidr");
function convertToString(proto, buf) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
    case 41:
      return bytes2ip(buf);
    case 42:
      return bytes2str(buf);
    case 6:
    case 273:
    case 33:
    case 132:
      return bytes2port(buf).toString();
    case 53:
    case 54:
    case 55:
    case 56:
    case 400:
    case 449:
    case 777:
      return bytes2str(buf);
    case 421:
      return bytes2mh(buf);
    case 444:
      return bytes2onion(buf);
    case 445:
      return bytes2onion(buf);
    case 466:
      return bytes2mb(buf);
    case 481:
      return globalThis.encodeURIComponent(bytes2str(buf));
    default:
      return toString7(buf, "base16");
  }
}
function convertToBytes(proto, str) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
      return ip2bytes(str);
    case 41:
      return ip2bytes(str);
    case 42:
      return str2bytes(str);
    case 6:
    case 273:
    case 33:
    case 132:
      return port2bytes(parseInt(str, 10));
    case 53:
    case 54:
    case 55:
    case 56:
    case 400:
    case 449:
    case 777:
      return str2bytes(str);
    case 421:
      return mh2bytes(str);
    case 444:
      return onion2bytes(str);
    case 445:
      return onion32bytes(str);
    case 466:
      return mb2bytes(str);
    case 481:
      return str2bytes(globalThis.decodeURIComponent(str));
    default:
      return fromString8(str, "base16");
  }
}
var decoders = Object.values(bases4).map((c) => c.decoder);
var anybaseDecoder = function() {
  let acc = decoders[0].or(decoders[1]);
  decoders.slice(2).forEach((d) => acc = acc.or(d));
  return acc;
}();
function ip2bytes(ipString) {
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return toBytes3(ipString);
}
function bytes2ip(ipBuff) {
  const ipString = toString8(ipBuff, 0, ipBuff.length);
  if (ipString == null) {
    throw new Error("ipBuff is required");
  }
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return ipString;
}
function port2bytes(port) {
  const buf = new ArrayBuffer(2);
  const view = new DataView(buf);
  view.setUint16(0, port);
  return new Uint8Array(buf);
}
function bytes2port(buf) {
  const view = new DataView(buf.buffer);
  return view.getUint16(buf.byteOffset);
}
function str2bytes(str) {
  const buf = fromString8(str);
  const size = Uint8Array.from(encode(buf.length));
  return concat3([size, buf], size.length + buf.length);
}
function bytes2str(buf) {
  const size = decode(buf);
  buf = buf.slice(encodingLength(size));
  if (buf.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString7(buf);
}
function mh2bytes(hash3) {
  let mh;
  if (hash3[0] === "Q" || hash3[0] === "1") {
    mh = decode27(base58btc7.decode(`z${hash3}`)).bytes;
  } else {
    mh = CID4.parse(hash3).multihash.bytes;
  }
  const size = Uint8Array.from(encode(mh.length));
  return concat3([size, mh], size.length + mh.length);
}
function mb2bytes(mbstr) {
  const mb = anybaseDecoder.decode(mbstr);
  const size = Uint8Array.from(encode(mb.length));
  return concat3([size, mb], size.length + mb.length);
}
function bytes2mb(buf) {
  const size = decode(buf);
  const hash3 = buf.slice(encodingLength(size));
  if (hash3.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return "u" + toString7(hash3, "base64url");
}
function bytes2mh(buf) {
  const size = decode(buf);
  const address = buf.slice(encodingLength(size));
  if (address.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString7(address, "base58btc");
}
function onion2bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 16) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion address.`);
  }
  const buf = base326.decode("b" + addr[0]);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat3([buf, portBuf], buf.length + portBuf.length);
}
function onion32bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 56) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`);
  }
  const buf = base326.decode(`b${addr[0]}`);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat3([buf, portBuf], buf.length + portBuf.length);
}
function bytes2onion(buf) {
  const addrBytes = buf.slice(0, buf.length - 2);
  const portBytes = buf.slice(buf.length - 2);
  const addr = toString7(addrBytes, "base32");
  const port = bytes2port(portBytes);
  return `${addr}:${port}`;
}

// node_modules/@multiformats/multiaddr/dist/src/codec.js
function stringToMultiaddrParts(str) {
  str = cleanPath(str);
  const tuples = [];
  const stringTuples = [];
  let path = null;
  const parts = str.split("/").slice(1);
  if (parts.length === 1 && parts[0] === "") {
    return {
      bytes: new Uint8Array(),
      string: "/",
      tuples: [],
      stringTuples: [],
      path: null
    };
  }
  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];
    const proto = getProtocol(part);
    if (proto.size === 0) {
      tuples.push([proto.code]);
      stringTuples.push([proto.code]);
      continue;
    }
    p++;
    if (p >= parts.length) {
      throw ParseError("invalid address: " + str);
    }
    if (proto.path === true) {
      path = cleanPath(parts.slice(p).join("/"));
      tuples.push([proto.code, convertToBytes(proto.code, path)]);
      stringTuples.push([proto.code, path]);
      break;
    }
    const bytes3 = convertToBytes(proto.code, parts[p]);
    tuples.push([proto.code, bytes3]);
    stringTuples.push([proto.code, convertToString(proto.code, bytes3)]);
  }
  return {
    string: stringTuplesToString(stringTuples),
    bytes: tuplesToBytes(tuples),
    tuples,
    stringTuples,
    path
  };
}
function bytesToMultiaddrParts(bytes3) {
  const tuples = [];
  const stringTuples = [];
  let path = null;
  let i = 0;
  while (i < bytes3.length) {
    const code7 = decode(bytes3, i);
    const n = encodingLength(code7);
    const p = getProtocol(code7);
    const size = sizeForAddr(p, bytes3.slice(i + n));
    if (size === 0) {
      tuples.push([code7]);
      stringTuples.push([code7]);
      i += n;
      continue;
    }
    const addr = bytes3.slice(i + n, i + n + size);
    i += size + n;
    if (i > bytes3.length) {
      throw ParseError("Invalid address Uint8Array: " + toString7(bytes3, "base16"));
    }
    tuples.push([code7, addr]);
    const stringAddr = convertToString(code7, addr);
    stringTuples.push([code7, stringAddr]);
    if (p.path === true) {
      path = stringAddr;
      break;
    }
  }
  return {
    bytes: Uint8Array.from(bytes3),
    string: stringTuplesToString(stringTuples),
    tuples,
    stringTuples,
    path
  };
}
function stringTuplesToString(tuples) {
  const parts = [];
  tuples.map((tup) => {
    const proto = getProtocol(tup[0]);
    parts.push(proto.name);
    if (tup.length > 1 && tup[1] != null) {
      parts.push(tup[1]);
    }
    return null;
  });
  return cleanPath(parts.join("/"));
}
function tuplesToBytes(tuples) {
  return concat3(tuples.map((tup) => {
    const proto = getProtocol(tup[0]);
    let buf = Uint8Array.from(encode(proto.code));
    if (tup.length > 1 && tup[1] != null) {
      buf = concat3([buf, tup[1]]);
    }
    return buf;
  }));
}
function sizeForAddr(p, addr) {
  if (p.size > 0) {
    return p.size / 8;
  } else if (p.size === 0) {
    return 0;
  } else {
    const size = decode(addr instanceof Uint8Array ? addr : Uint8Array.from(addr));
    return size + encodingLength(size);
  }
}
function cleanPath(str) {
  return "/" + str.trim().split("/").filter((a) => a).join("/");
}
function ParseError(str) {
  return new Error("Error parsing address: " + str);
}

// node_modules/@multiformats/multiaddr/dist/src/multiaddr.js
var inspect2 = Symbol.for("nodejs.util.inspect.custom");
var symbol4 = Symbol.for("@multiformats/js-multiaddr/multiaddr");
var DNS_CODES = [
  getProtocol("dns").code,
  getProtocol("dns4").code,
  getProtocol("dns6").code,
  getProtocol("dnsaddr").code
];
var Multiaddr = class _Multiaddr {
  bytes;
  #string;
  #tuples;
  #stringTuples;
  #path;
  [symbol4] = true;
  constructor(addr) {
    if (addr == null) {
      addr = "";
    }
    let parts;
    if (addr instanceof Uint8Array) {
      parts = bytesToMultiaddrParts(addr);
    } else if (typeof addr === "string") {
      if (addr.length > 0 && addr.charAt(0) !== "/") {
        throw new Error(`multiaddr "${addr}" must start with a "/"`);
      }
      parts = stringToMultiaddrParts(addr);
    } else if (isMultiaddr(addr)) {
      parts = bytesToMultiaddrParts(addr.bytes);
    } else {
      throw new Error("addr must be a string, Buffer, or another Multiaddr");
    }
    this.bytes = parts.bytes;
    this.#string = parts.string;
    this.#tuples = parts.tuples;
    this.#stringTuples = parts.stringTuples;
    this.#path = parts.path;
  }
  toString() {
    return this.#string;
  }
  toJSON() {
    return this.toString();
  }
  toOptions() {
    let family;
    let transport;
    let host;
    let port;
    let zone = "";
    const tcp = getProtocol("tcp");
    const udp = getProtocol("udp");
    const ip4 = getProtocol("ip4");
    const ip6 = getProtocol("ip6");
    const dns6 = getProtocol("dns6");
    const ip6zone = getProtocol("ip6zone");
    for (const [code7, value] of this.stringTuples()) {
      if (code7 === ip6zone.code) {
        zone = `%${value ?? ""}`;
      }
      if (DNS_CODES.includes(code7)) {
        transport = tcp.name;
        port = 443;
        host = `${value ?? ""}${zone}`;
        family = code7 === dns6.code ? 6 : 4;
      }
      if (code7 === tcp.code || code7 === udp.code) {
        transport = getProtocol(code7).name;
        port = parseInt(value ?? "");
      }
      if (code7 === ip4.code || code7 === ip6.code) {
        transport = getProtocol(code7).name;
        host = `${value ?? ""}${zone}`;
        family = code7 === ip6.code ? 6 : 4;
      }
    }
    if (family == null || transport == null || host == null || port == null) {
      throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6, dnsaddr}/{address}/{tcp, udp}/{port}".');
    }
    const opts = {
      family,
      host,
      transport,
      port
    };
    return opts;
  }
  protos() {
    return this.#tuples.map(([code7]) => Object.assign({}, getProtocol(code7)));
  }
  protoCodes() {
    return this.#tuples.map(([code7]) => code7);
  }
  protoNames() {
    return this.#tuples.map(([code7]) => getProtocol(code7).name);
  }
  tuples() {
    return this.#tuples;
  }
  stringTuples() {
    return this.#stringTuples;
  }
  encapsulate(addr) {
    addr = new _Multiaddr(addr);
    return new _Multiaddr(this.toString() + addr.toString());
  }
  decapsulate(addr) {
    const addrString = addr.toString();
    const s = this.toString();
    const i = s.lastIndexOf(addrString);
    if (i < 0) {
      throw new Error(`Address ${this.toString()} does not contain subaddress: ${addr.toString()}`);
    }
    return new _Multiaddr(s.slice(0, i));
  }
  decapsulateCode(code7) {
    const tuples = this.tuples();
    for (let i = tuples.length - 1; i >= 0; i--) {
      if (tuples[i][0] === code7) {
        return new _Multiaddr(tuplesToBytes(tuples.slice(0, i)));
      }
    }
    return this;
  }
  getPeerId() {
    try {
      let tuples = [];
      this.stringTuples().forEach(([code7, name7]) => {
        if (code7 === names2.p2p.code) {
          tuples.push([code7, name7]);
        }
        if (code7 === names2["p2p-circuit"].code) {
          tuples = [];
        }
      });
      const tuple = tuples.pop();
      if (tuple?.[1] != null) {
        const peerIdStr = tuple[1];
        if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
          return toString7(base58btc7.decode(`z${peerIdStr}`), "base58btc");
        }
        return toString7(CID4.parse(peerIdStr).multihash.bytes, "base58btc");
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  getPath() {
    return this.#path;
  }
  equals(addr) {
    return equals13(this.bytes, addr.bytes);
  }
  async resolve(options) {
    const resolvableProto = this.protos().find((p) => p.resolvable);
    if (resolvableProto == null) {
      return [this];
    }
    const resolver = resolvers.get(resolvableProto.name);
    if (resolver == null) {
      throw new CodeError2(`no available resolver for ${resolvableProto.name}`, "ERR_NO_AVAILABLE_RESOLVER");
    }
    const result = await resolver(this, options);
    return result.map((str) => multiaddr(str));
  }
  nodeAddress() {
    const options = this.toOptions();
    if (options.transport !== "tcp" && options.transport !== "udp") {
      throw new Error(`multiaddr must have a valid format - no protocol with name: "${options.transport}". Must have a valid transport protocol: "{tcp, udp}"`);
    }
    return {
      family: options.family,
      address: options.host,
      port: options.port
    };
  }
  isThinWaistAddress(addr) {
    const protos = (addr ?? this).protos();
    if (protos.length !== 2) {
      return false;
    }
    if (protos[0].code !== 4 && protos[0].code !== 41) {
      return false;
    }
    if (protos[1].code !== 6 && protos[1].code !== 273) {
      return false;
    }
    return true;
  }
  /**
   * Returns Multiaddr as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```js
   * import { multiaddr } from '@multiformats/multiaddr'
   *
   * console.info(multiaddr('/ip4/127.0.0.1/tcp/4001'))
   * // 'Multiaddr(/ip4/127.0.0.1/tcp/4001)'
   * ```
   */
  [inspect2]() {
    return `Multiaddr(${this.#string})`;
  }
};

// node_modules/@multiformats/multiaddr/dist/src/index.js
var resolvers = /* @__PURE__ */ new Map();
function isMultiaddr(value) {
  return Boolean(value?.[symbol4]);
}
function multiaddr(addr) {
  return new Multiaddr(addr);
}

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/identity.js
var identity_exports9 = {};
__export(identity_exports9, {
  identity: () => identity10
});
var identity10 = from10({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString5(buf),
  decode: (str) => fromString6(str)
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base2.js
var base2_exports5 = {};
__export(base2_exports5, {
  base2: () => base25
});
var base25 = rfc46486({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base8.js
var base8_exports5 = {};
__export(base8_exports5, {
  base8: () => base85
});
var base85 = rfc46486({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base10.js
var base10_exports5 = {};
__export(base10_exports5, {
  base10: () => base105
});
var base105 = baseX6({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base16.js
var base16_exports5 = {};
__export(base16_exports5, {
  base16: () => base165,
  base16upper: () => base16upper5
});
var base165 = rfc46486({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper5 = rfc46486({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base36.js
var base36_exports5 = {};
__export(base36_exports5, {
  base36: () => base365,
  base36upper: () => base36upper5
});
var base365 = baseX6({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper5 = baseX6({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/bases/base256emoji.js
var base256emoji_exports5 = {};
__export(base256emoji_exports5, {
  base256emoji: () => base256emoji5
});
var alphabet5 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars5 = (
  /** @type {string[]} */
  alphabet5.reduce(
    (p, c, i) => {
      p[i] = c;
      return p;
    },
    /** @type {string[]} */
    []
  )
);
var alphabetCharsToBytes5 = (
  /** @type {number[]} */
  alphabet5.reduce(
    (p, c, i) => {
      p[
        /** @type {number} */
        c.codePointAt(0)
      ] = i;
      return p;
    },
    /** @type {number[]} */
    []
  )
);
function encode25(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars5[c];
    return p;
  }, "");
}
function decode29(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes5[
      /** @type {number} */
      char.codePointAt(0)
    ];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji5 = from10({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode25,
  decode: decode29
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/hashes/sha2-browser.js
var sha2_browser_exports5 = {};
__export(sha2_browser_exports5, {
  sha256: () => sha2567,
  sha512: () => sha5126
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/hashes/digest.js
var digest_exports6 = {};
__export(digest_exports6, {
  Digest: () => Digest6,
  create: () => create8,
  decode: () => decode32,
  equals: () => equals14
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/vendor/varint.js
var encode_16 = encode26;
var MSB7 = 128;
var REST7 = 127;
var MSBALL6 = ~REST7;
var INT6 = Math.pow(2, 31);
function encode26(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT6) {
    out[offset++] = num & 255 | MSB7;
    num /= 128;
  }
  while (num & MSBALL6) {
    out[offset++] = num & 255 | MSB7;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode26.bytes = offset - oldOffset + 1;
  return out;
}
var decode30 = read7;
var MSB$16 = 128;
var REST$16 = 127;
function read7(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read7.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$16) << shift : (b & REST$16) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$16);
  read7.bytes = counter - offset;
  return res;
}
var N18 = Math.pow(2, 7);
var N28 = Math.pow(2, 14);
var N38 = Math.pow(2, 21);
var N48 = Math.pow(2, 28);
var N58 = Math.pow(2, 35);
var N68 = Math.pow(2, 42);
var N78 = Math.pow(2, 49);
var N87 = Math.pow(2, 56);
var N97 = Math.pow(2, 63);
var length7 = function(value) {
  return value < N18 ? 1 : value < N28 ? 2 : value < N38 ? 3 : value < N48 ? 4 : value < N58 ? 5 : value < N68 ? 6 : value < N78 ? 7 : value < N87 ? 8 : value < N97 ? 9 : 10;
};
var varint6 = {
  encode: encode_16,
  decode: decode30,
  encodingLength: length7
};
var _brrp_varint6 = varint6;
var varint_default6 = _brrp_varint6;

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/varint.js
var decode31 = (data, offset = 0) => {
  const code7 = varint_default6.decode(data, offset);
  return [code7, varint_default6.decode.bytes];
};
var encodeTo6 = (int, target, offset = 0) => {
  varint_default6.encode(int, target, offset);
  return target;
};
var encodingLength7 = (int) => {
  return varint_default6.encodingLength(int);
};

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/hashes/digest.js
var create8 = (code7, digest7) => {
  const size = digest7.byteLength;
  const sizeOffset = encodingLength7(code7);
  const digestOffset = sizeOffset + encodingLength7(size);
  const bytes3 = new Uint8Array(digestOffset + size);
  encodeTo6(code7, bytes3, 0);
  encodeTo6(size, bytes3, sizeOffset);
  bytes3.set(digest7, digestOffset);
  return new Digest6(code7, size, digest7, bytes3);
};
var decode32 = (multihash) => {
  const bytes3 = coerce6(multihash);
  const [code7, sizeOffset] = decode31(bytes3);
  const [size, digestOffset] = decode31(bytes3.subarray(sizeOffset));
  const digest7 = bytes3.subarray(sizeOffset + digestOffset);
  if (digest7.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest6(code7, size, digest7, bytes3);
};
var equals14 = (a, b) => {
  if (a === b) {
    return true;
  } else {
    const data = (
      /** @type {{code?:unknown, size?:unknown, bytes?:unknown}} */
      b
    );
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals10(a.bytes, data.bytes);
  }
};
var Digest6 = class {
  /**
   * Creates a multihash digest.
   *
   * @param {Code} code
   * @param {Size} size
   * @param {Uint8Array} digest
   * @param {Uint8Array} bytes
   */
  constructor(code7, size, digest7, bytes3) {
    this.code = code7;
    this.size = size;
    this.digest = digest7;
    this.bytes = bytes3;
  }
};

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/hashes/hasher.js
var from13 = ({ name: name7, code: code7, encode: encode28 }) => new Hasher6(name7, code7, encode28);
var Hasher6 = class {
  /**
   *
   * @param {Name} name
   * @param {Code} code
   * @param {(input: Uint8Array) => Await<Uint8Array>} encode
   */
  constructor(name7, code7, encode28) {
    this.name = name7;
    this.code = code7;
    this.encode = encode28;
  }
  /**
   * @param {Uint8Array} input
   * @returns {Await<Digest.Digest<Code, number>>}
   */
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create8(this.code, result) : result.then((digest7) => create8(this.code, digest7));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/hashes/sha2-browser.js
var sha6 = (name7) => (
  /**
   * @param {Uint8Array} data
   */
  async (data) => new Uint8Array(await crypto.subtle.digest(name7, data))
);
var sha2567 = from13({
  name: "sha2-256",
  code: 18,
  encode: sha6("SHA-256")
});
var sha5126 = from13({
  name: "sha2-512",
  code: 19,
  encode: sha6("SHA-512")
});

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/hashes/identity.js
var identity_exports10 = {};
__export(identity_exports10, {
  identity: () => identity11
});
var code6 = 0;
var name6 = "identity";
var encode27 = coerce6;
var digest6 = (input) => create8(code6, encode27(input));
var identity11 = { code: code6, name: name6, encode: encode27, digest: digest6 };

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/codecs/json.js
var textEncoder5 = new TextEncoder();
var textDecoder5 = new TextDecoder();

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/cid.js
var format5 = (link, base11) => {
  const { bytes: bytes3, version } = link;
  switch (version) {
    case 0:
      return toStringV05(
        bytes3,
        baseCache5(link),
        /** @type {API.MultibaseEncoder<"z">} */
        base11 || base58btc6.encoder
      );
    default:
      return toStringV15(
        bytes3,
        baseCache5(link),
        /** @type {API.MultibaseEncoder<Prefix>} */
        base11 || base325.encoder
      );
  }
};
var cache5 = /* @__PURE__ */ new WeakMap();
var baseCache5 = (cid) => {
  const baseCache6 = cache5.get(cid);
  if (baseCache6 == null) {
    const baseCache7 = /* @__PURE__ */ new Map();
    cache5.set(cid, baseCache7);
    return baseCache7;
  }
  return baseCache6;
};
var CID5 = class _CID {
  /**
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} multihash - (Multi)hash of the of the content.
   * @param {Uint8Array} bytes
   *
   */
  constructor(version, code7, multihash, bytes3) {
    this.code = code7;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes3;
    this["/"] = bytes3;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  /**
   * @returns {CID<Data, API.DAG_PB, API.SHA_256, 0>}
   */
  toV0() {
    switch (this.version) {
      case 0: {
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          this
        );
      }
      case 1: {
        const { code: code7, multihash } = this;
        if (code7 !== DAG_PB_CODE5) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE5) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return (
          /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
          _CID.createV0(
            /** @type {API.MultihashDigest<API.SHA_256>} */
            multihash
          )
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 0. This is a bug please report`
        );
      }
    }
  }
  /**
   * @returns {CID<Data, Format, Alg, 1>}
   */
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code7, digest: digest7 } = this.multihash;
        const multihash = create8(code7, digest7);
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          _CID.createV1(this.code, multihash)
        );
      }
      case 1: {
        return (
          /** @type {CID<Data, Format, Alg, 1>} */
          this
        );
      }
      default: {
        throw Error(
          `Can not convert CID version ${this.version} to version 1. This is a bug please report`
        );
      }
    }
  }
  /**
   * @param {unknown} other
   * @returns {other is CID<Data, Format, Alg, Version>}
   */
  equals(other) {
    return _CID.equals(this, other);
  }
  /**
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {API.Link<Data, Format, Alg, Version>} self
   * @param {unknown} other
   * @returns {other is CID}
   */
  static equals(self2, other) {
    const unknown = (
      /** @type {{code?:unknown, version?:unknown, multihash?:unknown}} */
      other
    );
    return unknown && self2.code === unknown.code && self2.version === unknown.version && equals14(self2.multihash, unknown.multihash);
  }
  /**
   * @param {API.MultibaseEncoder<string>} [base]
   * @returns {string}
   */
  toString(base11) {
    return format5(this, base11);
  }
  toJSON() {
    return { "/": format5(this) };
  }
  link() {
    return this;
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @template {unknown} U
   * @param {API.Link<Data, Format, Alg, Version>|U} input
   * @returns {CID<Data, Format, Alg, Version>|null}
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = (
      /** @type {any} */
      input
    );
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code7, multihash, bytes: bytes3 } = value;
      return new _CID(
        version,
        code7,
        /** @type {API.MultihashDigest<Alg>} */
        multihash,
        bytes3 || encodeCID5(version, code7, multihash.bytes)
      );
    } else if (value[cidSymbol5] === true) {
      const { version, multihash, code: code7 } = value;
      const digest7 = (
        /** @type {API.MultihashDigest<Alg>} */
        decode32(multihash)
      );
      return _CID.create(version, code7, digest7);
    } else {
      return null;
    }
  }
  /**
   *
   * @template {unknown} Data
   * @template {number} Format
   * @template {number} Alg
   * @template {API.Version} Version
   * @param {Version} version - Version of the CID
   * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param {API.MultihashDigest<Alg>} digest - (Multi)hash of the of the content.
   * @returns {CID<Data, Format, Alg, Version>}
   */
  static create(version, code7, digest7) {
    if (typeof code7 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest7.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code7 !== DAG_PB_CODE5) {
          throw new Error(
            `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE5}) block encoding`
          );
        } else {
          return new _CID(version, code7, digest7, digest7.bytes);
        }
      }
      case 1: {
        const bytes3 = encodeCID5(version, code7, digest7.bytes);
        return new _CID(version, code7, digest7, bytes3);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   *
   * @template {unknown} [T=unknown]
   * @param {API.MultihashDigest<typeof SHA_256_CODE>} digest - Multihash.
   * @returns {CID<T, typeof DAG_PB_CODE, typeof SHA_256_CODE, 0>}
   */
  static createV0(digest7) {
    return _CID.create(0, DAG_PB_CODE5, digest7);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @param {Code} code - Content encoding format code.
   * @param {API.MultihashDigest<Alg>} digest - Miltihash of the content.
   * @returns {CID<Data, Code, Alg, 1>}
   */
  static createV1(code7, digest7) {
    return _CID.create(1, code7, digest7);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   *
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ByteView<API.Link<Data, Code, Alg, Ver>>} bytes
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static decode(bytes3) {
    const [cid, remainder] = _CID.decodeFirst(bytes3);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} bytes
   * @returns {[CID<T, C, A, V>, Uint8Array]}
   */
  static decodeFirst(bytes3) {
    const specs = _CID.inspectBytes(bytes3);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce6(
      bytes3.subarray(prefixSize, prefixSize + specs.multihashSize)
    );
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(
      specs.multihashSize - specs.digestSize
    );
    const digest7 = new Digest6(
      specs.multihashCode,
      specs.digestSize,
      digestBytes,
      multihashBytes
    );
    const cid = specs.version === 0 ? _CID.createV0(
      /** @type {API.MultihashDigest<API.SHA_256>} */
      digest7
    ) : _CID.createV1(specs.codec, digest7);
    return [
      /** @type {CID<T, C, A, V>} */
      cid,
      bytes3.subarray(specs.size)
    ];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   *
   * @template {unknown} T
   * @template {number} C
   * @template {number} A
   * @template {API.Version} V
   * @param {API.ByteView<API.Link<T, C, A, V>>} initialBytes
   * @returns {{ version:V, codec:C, multihashCode:A, digestSize:number, multihashSize:number, size:number }}
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length8] = decode31(initialBytes.subarray(offset));
      offset += length8;
      return i;
    };
    let version = (
      /** @type {V} */
      next()
    );
    let codec = (
      /** @type {C} */
      DAG_PB_CODE5
    );
    if (
      /** @type {number} */
      version === 18
    ) {
      version = /** @type {V} */
      0;
      offset = 0;
    } else {
      codec = /** @type {C} */
      next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = (
      /** @type {A} */
      next()
    );
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   *
   * @template {string} Prefix
   * @template {unknown} Data
   * @template {number} Code
   * @template {number} Alg
   * @template {API.Version} Ver
   * @param {API.ToString<API.Link<Data, Code, Alg, Ver>, Prefix>} source
   * @param {API.MultibaseDecoder<Prefix>} [base]
   * @returns {CID<Data, Code, Alg, Ver>}
   */
  static parse(source, base11) {
    const [prefix, bytes3] = parseCIDtoBytes5(source, base11);
    const cid = _CID.decode(bytes3);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache5(cid).set(prefix, source);
    return cid;
  }
};
var parseCIDtoBytes5 = (source, base11) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base11 || base58btc6;
      return [
        /** @type {Prefix} */
        base58btc6.prefix,
        decoder.decode(`${base58btc6.prefix}${source}`)
      ];
    }
    case base58btc6.prefix: {
      const decoder = base11 || base58btc6;
      return [
        /** @type {Prefix} */
        base58btc6.prefix,
        decoder.decode(source)
      ];
    }
    case base325.prefix: {
      const decoder = base11 || base325;
      return [
        /** @type {Prefix} */
        base325.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base11 == null) {
        throw Error(
          "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
        );
      }
      return [
        /** @type {Prefix} */
        source[0],
        base11.decode(source)
      ];
    }
  }
};
var toStringV05 = (bytes3, cache6, base11) => {
  const { prefix } = base11;
  if (prefix !== base58btc6.prefix) {
    throw Error(`Cannot string encode V0 in ${base11.name} encoding`);
  }
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3).slice(1);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var toStringV15 = (bytes3, cache6, base11) => {
  const { prefix } = base11;
  const cid = cache6.get(prefix);
  if (cid == null) {
    const cid2 = base11.encode(bytes3);
    cache6.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
var DAG_PB_CODE5 = 112;
var SHA_256_CODE5 = 18;
var encodeCID5 = (version, code7, multihash) => {
  const codeOffset = encodingLength7(version);
  const hashOffset = codeOffset + encodingLength7(code7);
  const bytes3 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo6(version, bytes3, 0);
  encodeTo6(code7, bytes3, codeOffset);
  bytes3.set(multihash, hashOffset);
  return bytes3;
};
var cidSymbol5 = Symbol.for("@ipld/js-cid/CID");

// node_modules/@libp2p/webtransport/node_modules/multiformats/src/basics.js
var bases5 = { ...identity_exports9, ...base2_exports5, ...base8_exports5, ...base10_exports5, ...base16_exports5, ...base32_exports4, ...base36_exports5, ...base58_exports4, ...base64_exports4, ...base256emoji_exports5 };
var hashes5 = { ...sha2_browser_exports5, ...identity_exports10 };

// node_modules/@libp2p/webtransport/dist/src/index.js
var log2 = logger2("libp2p:webtransport");
var multibaseDecoder = Object.values(bases5).map((b) => b.decoder).reduce((d, b) => d.or(b));
function decodeCerthashStr(s) {
  return digest_exports6.decode(multibaseDecoder.decode(s));
}
function inertDuplex() {
  return {
    source: {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            return new Promise(() => {
            });
          }
        };
      }
    },
    sink: async (source) => {
      return new Promise(() => {
      });
    }
  };
}
async function webtransportBiDiStreamToStream(bidiStream, streamId, direction, activeStreams, onStreamEnd) {
  const writer = bidiStream.writable.getWriter();
  const reader = bidiStream.readable.getReader();
  await writer.ready;
  function cleanupStreamFromActiveStreams() {
    const index = activeStreams.findIndex((s) => s === stream);
    if (index !== -1) {
      activeStreams.splice(index, 1);
      stream.stat.timeline.close = Date.now();
      onStreamEnd?.(stream);
    }
  }
  let writerClosed = false;
  let readerClosed = false;
  (async function() {
    const err = await writer.closed.catch((err2) => err2);
    if (err != null) {
      const msg = err.message;
      if (!(msg.includes("aborted by the remote server") || msg.includes("STOP_SENDING"))) {
        log2.error(`WebTransport writer closed unexpectedly: streamId=${streamId} err=${err.message}`);
      }
    }
    writerClosed = true;
    if (writerClosed && readerClosed) {
      cleanupStreamFromActiveStreams();
    }
  })().catch(() => {
    log2.error("WebTransport failed to cleanup closed stream");
  });
  (async function() {
    const err = await reader.closed.catch((err2) => err2);
    if (err != null) {
      log2.error(`WebTransport reader closed unexpectedly: streamId=${streamId} err=${err.message}`);
    }
    readerClosed = true;
    if (writerClosed && readerClosed) {
      cleanupStreamFromActiveStreams();
    }
  })().catch(() => {
    log2.error("WebTransport failed to cleanup closed stream");
  });
  let sinkSunk = false;
  const stream = {
    id: streamId,
    abort(_err) {
      if (!writerClosed) {
        writer.abort();
        writerClosed = true;
      }
      stream.closeRead();
      readerClosed = true;
      cleanupStreamFromActiveStreams();
    },
    close() {
      stream.closeRead();
      stream.closeWrite();
      cleanupStreamFromActiveStreams();
    },
    closeRead() {
      if (!readerClosed) {
        reader.cancel().catch((err) => {
          if (err.toString().includes("RESET_STREAM") === true) {
            writerClosed = true;
          }
        });
        readerClosed = true;
      }
      if (writerClosed) {
        cleanupStreamFromActiveStreams();
      }
    },
    closeWrite() {
      if (!writerClosed) {
        writerClosed = true;
        writer.close().catch((err) => {
          if (err.toString().includes("RESET_STREAM") === true) {
            readerClosed = true;
          }
        });
      }
      if (readerClosed) {
        cleanupStreamFromActiveStreams();
      }
    },
    reset() {
      stream.close();
    },
    stat: {
      direction,
      timeline: { open: Date.now() }
    },
    metadata: {},
    source: async function* () {
      while (true) {
        const val = await reader.read();
        if (val.done === true) {
          readerClosed = true;
          if (writerClosed) {
            cleanupStreamFromActiveStreams();
          }
          return;
        }
        yield new Uint8ArrayList(val.value);
      }
    }(),
    sink: async function(source) {
      if (sinkSunk) {
        throw new Error("sink already called on stream");
      }
      sinkSunk = true;
      try {
        for await (const chunks of source) {
          if (chunks instanceof Uint8Array) {
            await writer.write(chunks);
          } else {
            for (const buf of chunks) {
              await writer.write(buf);
            }
          }
        }
      } finally {
        stream.closeWrite();
      }
    }
  };
  return stream;
}
function parseMultiaddr(ma) {
  const parts = ma.stringTuples();
  const { url, certhashes, remotePeer } = parts.reduce(
    (state, [proto, value]) => {
      switch (proto) {
        case getProtocol("ip6").code:
        case getProtocol("dns6").code:
          if (value?.includes(":") === true) {
            value = `[${value}]`;
          }
        case getProtocol("ip4").code:
        case getProtocol("dns4").code:
          if (state.seenHost || state.seenPort) {
            throw new Error("Invalid multiaddr, saw host and already saw the host or port");
          }
          return {
            ...state,
            url: `${state.url}${value ?? ""}`,
            seenHost: true
          };
        case getProtocol("quic").code:
        case getProtocol("quic-v1").code:
        case getProtocol("webtransport").code:
          if (!state.seenHost || !state.seenPort) {
            throw new Error("Invalid multiaddr, Didn't see host and port, but saw quic/webtransport");
          }
          return state;
        case getProtocol("udp").code:
          if (state.seenPort) {
            throw new Error("Invalid multiaddr, saw port but already saw the port");
          }
          return {
            ...state,
            url: `${state.url}:${value ?? ""}`,
            seenPort: true
          };
        case getProtocol("certhash").code:
          if (!state.seenHost || !state.seenPort) {
            throw new Error("Invalid multiaddr, saw the certhash before seeing the host and port");
          }
          return {
            ...state,
            certhashes: state.certhashes.concat([decodeCerthashStr(value ?? "")])
          };
        case getProtocol("p2p").code:
          return {
            ...state,
            remotePeer: peerIdFromString(value ?? "")
          };
        default:
          throw new Error(`unexpected component in multiaddr: ${proto} ${getProtocol(proto).name} ${value ?? ""} `);
      }
    },
    // All webtransport urls are https
    { url: "https://", seenHost: false, seenPort: false, certhashes: [] }
  );
  return { url, certhashes, remotePeer };
}
function isSubset(set, maybeSubset) {
  const intersection = maybeSubset.filter((byteArray) => {
    return Boolean(set.find((otherByteArray) => {
      if (byteArray.length !== otherByteArray.length) {
        return false;
      }
      for (let index = 0; index < byteArray.length; index++) {
        if (otherByteArray[index] !== byteArray[index]) {
          return false;
        }
      }
      return true;
    }));
  });
  return intersection.length === maybeSubset.length;
}
var WebTransportTransport = class {
  components;
  config;
  constructor(components, init = {}) {
    this.components = components;
    this.config = {
      maxInboundStreams: init.maxInboundStreams ?? 1e3
    };
  }
  [Symbol.toStringTag] = "@libp2p/webtransport";
  [symbol3] = true;
  async dial(ma, options) {
    log2("dialing %s", ma);
    const localPeer = this.components.peerId;
    if (localPeer === void 0) {
      throw new Error("Need a local peerid");
    }
    options = options ?? {};
    const { url, certhashes, remotePeer } = parseMultiaddr(ma);
    if (certhashes.length === 0) {
      throw new Error("Expected multiaddr to contain certhashes");
    }
    const wt = new WebTransport(`${url}/.well-known/libp2p-webtransport?type=noise`, {
      serverCertificateHashes: certhashes.map((certhash) => ({
        algorithm: "sha-256",
        value: certhash.digest
      }))
    });
    wt.closed.catch((error) => {
      log2.error("WebTransport transport closed due to:", error);
    });
    await wt.ready;
    if (remotePeer == null) {
      throw new Error("Need a target peerid");
    }
    if (!await this.authenticateWebTransport(wt, localPeer, remotePeer, certhashes)) {
      throw new Error("Failed to authenticate webtransport");
    }
    const maConn = {
      close: async (err) => {
        if (err != null) {
          log2("Closing webtransport with err:", err);
        }
        wt.close();
      },
      remoteAddr: ma,
      timeline: {
        open: Date.now()
      },
      // This connection is never used directly since webtransport supports native streams.
      ...inertDuplex()
    };
    wt.closed.catch((err) => {
      log2.error("WebTransport connection closed:", err);
      maConn.timeline.close = Date.now();
    });
    try {
      options?.signal?.throwIfAborted();
    } catch (e) {
      wt.close();
      throw e;
    }
    return options.upgrader.upgradeOutbound(maConn, { skipEncryption: true, muxerFactory: this.webtransportMuxer(wt), skipProtection: true });
  }
  async authenticateWebTransport(wt, localPeer, remotePeer, certhashes) {
    const stream = await wt.createBidirectionalStream();
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();
    await writer.ready;
    const duplex = {
      source: async function* () {
        while (true) {
          const val = await reader.read();
          if (val.value != null) {
            yield val.value;
          }
          if (val.done === true) {
            break;
          }
        }
      }(),
      sink: async function(source) {
        for await (const chunk of source) {
          await writer.write(chunk);
        }
      }
    };
    const n = noise()();
    const { remoteExtensions } = await n.secureOutbound(localPeer, duplex, remotePeer);
    writer.close().catch((err) => {
      log2.error(`Failed to close authentication stream writer: ${err.message}`);
    });
    reader.cancel().catch((err) => {
      log2.error(`Failed to close authentication stream reader: ${err.message}`);
    });
    if (!isSubset(remoteExtensions?.webtransportCerthashes ?? [], certhashes.map((ch) => ch.bytes))) {
      throw new Error("Our certhashes are not a subset of the remote's reported certhashes");
    }
    return true;
  }
  webtransportMuxer(wt) {
    let streamIDCounter = 0;
    const config = this.config;
    return {
      protocol: "webtransport",
      createStreamMuxer: (init) => {
        if (typeof init === "function") {
          init = { onIncomingStream: init };
        }
        const activeStreams = [];
        (async function() {
          const reader = wt.incomingBidirectionalStreams.getReader();
          while (true) {
            const { done, value: wtStream } = await reader.read();
            if (done === true) {
              break;
            }
            if (activeStreams.length >= config.maxInboundStreams) {
              wtStream.writable.close().catch((err) => {
                log2.error(`Failed to close inbound stream that crossed our maxInboundStream limit: ${err.message}`);
              });
              wtStream.readable.cancel().catch((err) => {
                log2.error(`Failed to close inbound stream that crossed our maxInboundStream limit: ${err.message}`);
              });
            } else {
              const stream = await webtransportBiDiStreamToStream(wtStream, String(streamIDCounter++), "inbound", activeStreams, init?.onStreamEnd);
              activeStreams.push(stream);
              init?.onIncomingStream?.(stream);
            }
          }
        })().catch(() => {
          log2.error("WebTransport failed to receive incoming stream");
        });
        const muxer = {
          protocol: "webtransport",
          streams: activeStreams,
          newStream: async (name7) => {
            const wtStream = await wt.createBidirectionalStream();
            const stream = await webtransportBiDiStreamToStream(wtStream, String(streamIDCounter++), init?.direction ?? "outbound", activeStreams, init?.onStreamEnd);
            activeStreams.push(stream);
            return stream;
          },
          /**
           * Close or abort all tracked streams and stop the muxer
           */
          close: (err) => {
            if (err != null) {
              log2("Closing webtransport muxer with err:", err);
            }
            wt.close();
          },
          // This stream muxer is webtransport native. Therefore it doesn't plug in with any other duplex.
          ...inertDuplex()
        };
        try {
          init?.signal?.throwIfAborted();
        } catch (e) {
          wt.close();
          throw e;
        }
        return muxer;
      }
    };
  }
  createListener(options) {
    throw new Error("Webtransport servers are not supported in Node or the browser");
  }
  /**
   * Takes a list of `Multiaddr`s and returns only valid webtransport addresses.
   */
  filter(multiaddrs) {
    return multiaddrs.filter((ma) => ma.protoNames().includes("webtransport"));
  }
};
function webTransport(init = {}) {
  return (components) => new WebTransportTransport(components, init);
}
export {
  isSubset,
  webTransport
};
/*! Bundled license information:

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/montgomery.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ed25519/lib/esm/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)

@noble/secp256k1/lib/esm/index.js:
  (*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)

@libp2p/webtransport/dist/src/index.js:
  (*! TODO unclear how to add backpressure here? *)
*/