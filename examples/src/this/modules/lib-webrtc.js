var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from3, except, desc) => {
  if (from3 && typeof from3 === "object" || typeof from3 === "function") {
    for (let key of __getOwnPropNames(from3))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/@libp2p/webrtc/node_modules/pvtsutils/build/index.js
var require_build = __commonJS({
  "node_modules/@libp2p/webrtc/node_modules/pvtsutils/build/index.js"(exports) {
    "use strict";
    var ARRAY_BUFFER_NAME = "[object ArrayBuffer]";
    var BufferSourceConverter2 = class _BufferSourceConverter {
      static {
        __name(this, "BufferSourceConverter");
      }
      static isArrayBuffer(data) {
        return Object.prototype.toString.call(data) === ARRAY_BUFFER_NAME;
      }
      static toArrayBuffer(data) {
        if (this.isArrayBuffer(data)) {
          return data;
        }
        if (data.byteLength === data.buffer.byteLength) {
          return data.buffer;
        }
        if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) {
          return data.buffer;
        }
        return this.toUint8Array(data.buffer).slice(data.byteOffset, data.byteOffset + data.byteLength).buffer;
      }
      static toUint8Array(data) {
        return this.toView(data, Uint8Array);
      }
      static toView(data, type) {
        if (data.constructor === type) {
          return data;
        }
        if (this.isArrayBuffer(data)) {
          return new type(data);
        }
        if (this.isArrayBufferView(data)) {
          return new type(data.buffer, data.byteOffset, data.byteLength);
        }
        throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
      }
      static isBufferSource(data) {
        return this.isArrayBufferView(data) || this.isArrayBuffer(data);
      }
      static isArrayBufferView(data) {
        return ArrayBuffer.isView(data) || data && this.isArrayBuffer(data.buffer);
      }
      static isEqual(a, b) {
        const aView = _BufferSourceConverter.toUint8Array(a);
        const bView = _BufferSourceConverter.toUint8Array(b);
        if (aView.length !== bView.byteLength) {
          return false;
        }
        for (let i = 0; i < aView.length; i++) {
          if (aView[i] !== bView[i]) {
            return false;
          }
        }
        return true;
      }
      static concat(...args) {
        let buffers;
        if (Array.isArray(args[0]) && !(args[1] instanceof Function)) {
          buffers = args[0];
        } else if (Array.isArray(args[0]) && args[1] instanceof Function) {
          buffers = args[0];
        } else {
          if (args[args.length - 1] instanceof Function) {
            buffers = args.slice(0, args.length - 1);
          } else {
            buffers = args;
          }
        }
        let size = 0;
        for (const buffer of buffers) {
          size += buffer.byteLength;
        }
        const res = new Uint8Array(size);
        let offset = 0;
        for (const buffer of buffers) {
          const view = this.toUint8Array(buffer);
          res.set(view, offset);
          offset += view.length;
        }
        if (args[args.length - 1] instanceof Function) {
          return this.toView(res, args[args.length - 1]);
        }
        return res.buffer;
      }
    };
    var STRING_TYPE = "string";
    var HEX_REGEX = /^[0-9a-f]+$/i;
    var BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    var BASE64URL_REGEX = /^[a-zA-Z0-9-_]+$/;
    var Utf8Converter = class {
      static {
        __name(this, "Utf8Converter");
      }
      static fromString(text) {
        const s = unescape(encodeURIComponent(text));
        const uintArray = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) {
          uintArray[i] = s.charCodeAt(i);
        }
        return uintArray.buffer;
      }
      static toString(buffer) {
        const buf = BufferSourceConverter2.toUint8Array(buffer);
        let encodedString = "";
        for (let i = 0; i < buf.length; i++) {
          encodedString += String.fromCharCode(buf[i]);
        }
        const decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
      }
    };
    var Utf16Converter = class {
      static {
        __name(this, "Utf16Converter");
      }
      static toString(buffer, littleEndian = false) {
        const arrayBuffer = BufferSourceConverter2.toArrayBuffer(buffer);
        const dataView = new DataView(arrayBuffer);
        let res = "";
        for (let i = 0; i < arrayBuffer.byteLength; i += 2) {
          const code2 = dataView.getUint16(i, littleEndian);
          res += String.fromCharCode(code2);
        }
        return res;
      }
      static fromString(text, littleEndian = false) {
        const res = new ArrayBuffer(text.length * 2);
        const dataView = new DataView(res);
        for (let i = 0; i < text.length; i++) {
          dataView.setUint16(i * 2, text.charCodeAt(i), littleEndian);
        }
        return res;
      }
    };
    var Convert2 = class _Convert {
      static {
        __name(this, "Convert");
      }
      static isHex(data) {
        return typeof data === STRING_TYPE && HEX_REGEX.test(data);
      }
      static isBase64(data) {
        return typeof data === STRING_TYPE && BASE64_REGEX.test(data);
      }
      static isBase64Url(data) {
        return typeof data === STRING_TYPE && BASE64URL_REGEX.test(data);
      }
      static ToString(buffer, enc = "utf8") {
        const buf = BufferSourceConverter2.toUint8Array(buffer);
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.ToUtf8String(buf);
          case "binary":
            return this.ToBinary(buf);
          case "hex":
            return this.ToHex(buf);
          case "base64":
            return this.ToBase64(buf);
          case "base64url":
            return this.ToBase64Url(buf);
          case "utf16le":
            return Utf16Converter.toString(buf, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buf);
          default:
            throw new Error(`Unknown type of encoding '${enc}'`);
        }
      }
      static FromString(str, enc = "utf8") {
        if (!str) {
          return new ArrayBuffer(0);
        }
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.FromUtf8String(str);
          case "binary":
            return this.FromBinary(str);
          case "hex":
            return this.FromHex(str);
          case "base64":
            return this.FromBase64(str);
          case "base64url":
            return this.FromBase64Url(str);
          case "utf16le":
            return Utf16Converter.fromString(str, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(str);
          default:
            throw new Error(`Unknown type of encoding '${enc}'`);
        }
      }
      static ToBase64(buffer) {
        const buf = BufferSourceConverter2.toUint8Array(buffer);
        if (typeof btoa !== "undefined") {
          const binary = this.ToString(buf, "binary");
          return btoa(binary);
        } else {
          return Buffer.from(buf).toString("base64");
        }
      }
      static FromBase64(base642) {
        const formatted = this.formatString(base642);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isBase64(formatted)) {
          throw new TypeError("Argument 'base64Text' is not Base64 encoded");
        }
        if (typeof atob !== "undefined") {
          return this.FromBinary(atob(formatted));
        } else {
          return new Uint8Array(Buffer.from(formatted, "base64")).buffer;
        }
      }
      static FromBase64Url(base64url2) {
        const formatted = this.formatString(base64url2);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isBase64Url(formatted)) {
          throw new TypeError("Argument 'base64url' is not Base64Url encoded");
        }
        return this.FromBase64(this.Base64Padding(formatted.replace(/\-/g, "+").replace(/\_/g, "/")));
      }
      static ToBase64Url(data) {
        return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
      }
      static FromUtf8String(text, encoding = _Convert.DEFAULT_UTF8_ENCODING) {
        switch (encoding) {
          case "ascii":
            return this.FromBinary(text);
          case "utf8":
            return Utf8Converter.fromString(text);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(text);
          case "utf16le":
          case "usc2":
            return Utf16Converter.fromString(text, true);
          default:
            throw new Error(`Unknown type of encoding '${encoding}'`);
        }
      }
      static ToUtf8String(buffer, encoding = _Convert.DEFAULT_UTF8_ENCODING) {
        switch (encoding) {
          case "ascii":
            return this.ToBinary(buffer);
          case "utf8":
            return Utf8Converter.toString(buffer);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buffer);
          case "utf16le":
          case "usc2":
            return Utf16Converter.toString(buffer, true);
          default:
            throw new Error(`Unknown type of encoding '${encoding}'`);
        }
      }
      static FromBinary(text) {
        const stringLength = text.length;
        const resultView = new Uint8Array(stringLength);
        for (let i = 0; i < stringLength; i++) {
          resultView[i] = text.charCodeAt(i);
        }
        return resultView.buffer;
      }
      static ToBinary(buffer) {
        const buf = BufferSourceConverter2.toUint8Array(buffer);
        let res = "";
        for (let i = 0; i < buf.length; i++) {
          res += String.fromCharCode(buf[i]);
        }
        return res;
      }
      static ToHex(buffer) {
        const buf = BufferSourceConverter2.toUint8Array(buffer);
        let result = "";
        const len = buf.length;
        for (let i = 0; i < len; i++) {
          const byte = buf[i];
          if (byte < 16) {
            result += "0";
          }
          result += byte.toString(16);
        }
        return result;
      }
      static FromHex(hexString) {
        let formatted = this.formatString(hexString);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isHex(formatted)) {
          throw new TypeError("Argument 'hexString' is not HEX encoded");
        }
        if (formatted.length % 2) {
          formatted = `0${formatted}`;
        }
        const res = new Uint8Array(formatted.length / 2);
        for (let i = 0; i < formatted.length; i = i + 2) {
          const c = formatted.slice(i, i + 2);
          res[i / 2] = parseInt(c, 16);
        }
        return res.buffer;
      }
      static ToUtf16String(buffer, littleEndian = false) {
        return Utf16Converter.toString(buffer, littleEndian);
      }
      static FromUtf16String(text, littleEndian = false) {
        return Utf16Converter.fromString(text, littleEndian);
      }
      static Base64Padding(base642) {
        const padCount = 4 - base642.length % 4;
        if (padCount < 4) {
          for (let i = 0; i < padCount; i++) {
            base642 += "=";
          }
        }
        return base642;
      }
      static formatString(data) {
        return (data === null || data === void 0 ? void 0 : data.replace(/[\n\r\t ]/g, "")) || "";
      }
    };
    Convert2.DEFAULT_UTF8_ENCODING = "utf8";
    function assign(target, ...sources) {
      const res = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        const obj = arguments[i];
        for (const prop in obj) {
          res[prop] = obj[prop];
        }
      }
      return res;
    }
    __name(assign, "assign");
    function combine(...buf) {
      const totalByteLength = buf.map((item) => item.byteLength).reduce((prev, cur) => prev + cur);
      const res = new Uint8Array(totalByteLength);
      let currentPos = 0;
      buf.map((item) => new Uint8Array(item)).forEach((arr) => {
        for (const item2 of arr) {
          res[currentPos++] = item2;
        }
      });
      return res.buffer;
    }
    __name(combine, "combine");
    function isEqual(bytes1, bytes22) {
      if (!(bytes1 && bytes22)) {
        return false;
      }
      if (bytes1.byteLength !== bytes22.byteLength) {
        return false;
      }
      const b1 = new Uint8Array(bytes1);
      const b2 = new Uint8Array(bytes22);
      for (let i = 0; i < bytes1.byteLength; i++) {
        if (b1[i] !== b2[i]) {
          return false;
        }
      }
      return true;
    }
    __name(isEqual, "isEqual");
    exports.BufferSourceConverter = BufferSourceConverter2;
    exports.Convert = Convert2;
    exports.assign = assign;
    exports.combine = combine;
    exports.isEqual = isEqual;
  }
});

// node_modules/@libp2p/webrtc/node_modules/@libp2p/interface/dist/src/peer-id/index.js
var peerIdSymbol = Symbol.for("@libp2p/peer-id");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/interface/dist/src/transport/index.js
var transportSymbol = Symbol.for("@libp2p/transport");
var FaultTolerance;
(function(FaultTolerance2) {
  FaultTolerance2[FaultTolerance2["FATAL_ALL"] = 0] = "FATAL_ALL";
  FaultTolerance2[FaultTolerance2["NO_FATAL"] = 1] = "NO_FATAL";
})(FaultTolerance || (FaultTolerance = {}));

// node_modules/@libp2p/webrtc/node_modules/@libp2p/interface/dist/src/errors.js
var UnexpectedPeerError = class extends Error {
  static name = "UnexpectedPeerError";
  constructor(message2 = "Unexpected Peer") {
    super(message2);
    this.name = "UnexpectedPeerError";
  }
};
var InvalidParametersError = class extends Error {
  static name = "InvalidParametersError";
  constructor(message2 = "Invalid parameters") {
    super(message2);
    this.name = "InvalidParametersError";
  }
};
var InvalidPublicKeyError = class extends Error {
  static name = "InvalidPublicKeyError";
  constructor(message2 = "Invalid public key") {
    super(message2);
    this.name = "InvalidPublicKeyError";
  }
};
var ConnectionFailedError = class extends Error {
  static name = "ConnectionFailedError";
  constructor(message2 = "Connection failed") {
    super(message2);
    this.name = "ConnectionFailedError";
  }
};
var StreamResetError = class extends Error {
  static name = "StreamResetError";
  constructor(message2 = "The stream has been reset") {
    super(message2);
    this.name = "StreamResetError";
  }
};
var StreamStateError = class extends Error {
  static name = "StreamStateError";
  constructor(message2 = "The stream is in an invalid state") {
    super(message2);
    this.name = "StreamStateError";
  }
};
var InvalidMultihashError = class extends Error {
  static name = "InvalidMultihashError";
  constructor(message2 = "Invalid Multihash") {
    super(message2);
    this.name = "InvalidMultihashError";
  }
};
var InvalidMessageError = class extends Error {
  static name = "InvalidMessageError";
  constructor(message2 = "Invalid message") {
    super(message2);
    this.name = "InvalidMessageError";
  }
};
var TimeoutError = class extends Error {
  static name = "TimeoutError";
  constructor(message2 = "Timed out") {
    super(message2);
    this.name = "TimeoutError";
  }
};
var UnsupportedKeyTypeError = class extends Error {
  static name = "UnsupportedKeyTypeError";
  constructor(message2 = "Unsupported key type") {
    super(message2);
    this.name = "UnsupportedKeyTypeError";
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/interface/dist/src/events.browser.js
function setMaxListeners() {
}
__name(setMaxListeners, "setMaxListeners");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/interface/dist/src/events.js
var setMaxListeners2 = /* @__PURE__ */ __name((n, ...eventTargets) => {
  try {
    setMaxListeners(n, ...eventTargets);
  } catch {
  }
}, "setMaxListeners");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/interface/dist/src/event-target.js
var TypedEventEmitter = class extends EventTarget {
  static {
    __name(this, "TypedEventEmitter");
  }
  #listeners = /* @__PURE__ */ new Map();
  constructor() {
    super();
    setMaxListeners2(Infinity, this);
  }
  listenerCount(type) {
    const listeners = this.#listeners.get(type);
    if (listeners == null) {
      return 0;
    }
    return listeners.length;
  }
  addEventListener(type, listener, options) {
    super.addEventListener(type, listener, options);
    let list = this.#listeners.get(type);
    if (list == null) {
      list = [];
      this.#listeners.set(type, list);
    }
    list.push({
      callback: listener,
      once: (options !== true && options !== false && options?.once) ?? false
    });
  }
  removeEventListener(type, listener, options) {
    super.removeEventListener(type.toString(), listener ?? null, options);
    let list = this.#listeners.get(type);
    if (list == null) {
      return;
    }
    list = list.filter(({ callback }) => callback !== listener);
    this.#listeners.set(type, list);
  }
  dispatchEvent(event) {
    const result = super.dispatchEvent(event);
    let list = this.#listeners.get(event.type);
    if (list == null) {
      return result;
    }
    list = list.filter(({ once }) => !once);
    this.#listeners.set(event.type, list);
    return result;
  }
  safeDispatchEvent(type, detail = {}) {
    return this.dispatchEvent(new CustomEvent(type, detail));
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/interface/dist/src/index.js
var serviceCapabilities = Symbol.for("@libp2p/service-capabilities");
var serviceDependencies = Symbol.for("@libp2p/service-dependencies");

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bytes.js
var empty = new Uint8Array(0);
function equals(aa, bb) {
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
__name(equals, "equals");
function coerce(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
__name(coerce, "coerce");
function fromString(str) {
  return new TextEncoder().encode(str);
}
__name(fromString, "fromString");
function toString(b) {
  return new TextDecoder().decode(b);
}
__name(toString, "toString");

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/vendor/base-x.js
function base(ALPHABET, name2) {
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
  function encode7(source) {
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
    var length3 = 0;
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
      for (var it1 = size - 1; (carry !== 0 || i2 < length3) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      pbegin++;
    }
    var it2 = size - length3;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  __name(encode7, "encode");
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
    var length3 = 0;
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
      for (var it3 = size - 1; (carry !== 0 || i2 < length3) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length3;
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
  __name(decodeUnsafe, "decodeUnsafe");
  function decode8(string3) {
    var buffer = decodeUnsafe(string3);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  __name(decode8, "decode");
  return {
    encode: encode7,
    decodeUnsafe,
    decode: decode8
  };
}
__name(base, "base");
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base.js
var Encoder = class {
  static {
    __name(this, "Encoder");
  }
  name;
  prefix;
  baseEncode;
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
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
var Decoder = class {
  static {
    __name(this, "Decoder");
  }
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    const prefixCodePoint = prefix.codePointAt(0);
    if (prefixCodePoint === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefixCodePoint;
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
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  static {
    __name(this, "ComposedDecoder");
  }
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or(this, decoder);
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
function or(left, right) {
  return new ComposedDecoder({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
__name(or, "or");
var Codec = class {
  static {
    __name(this, "Codec");
  }
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from({ name: name2, prefix, encode: encode7, decode: decode8 }) {
  return new Codec(name2, prefix, encode7, decode8);
}
__name(from, "from");
function baseX({ name: name2, prefix, alphabet: alphabet2 }) {
  const { encode: encode7, decode: decode8 } = base_x_default(alphabet2, name2);
  return from({
    prefix,
    name: name2,
    encode: encode7,
    decode: /* @__PURE__ */ __name((text) => coerce(decode8(text)), "decode")
  });
}
__name(baseX, "baseX");
function decode(string3, alphabet2, bitsPerChar, name2) {
  const codes2 = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes2[alphabet2[i]] = i;
  }
  let end = string3.length;
  while (string3[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string3[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
__name(decode, "decode");
function encode(data, alphabet2, bitsPerChar) {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
__name(encode, "encode");
function rfc4648({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) {
  return from({
    prefix,
    name: name2,
    encode(input) {
      return encode(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet2, bitsPerChar, name2);
    }
  });
}
__name(rfc4648, "rfc4648");

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base58.js
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

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base32.js
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

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base36.js
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

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/hashes/digest.js
var digest_exports = {};
__export(digest_exports, {
  Digest: () => Digest,
  create: () => create,
  decode: () => decode4,
  equals: () => equals2,
  hasCode: () => hasCode
});

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/vendor/varint.js
var encode_1 = encode2;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode2(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode2.bytes = offset - oldOffset + 1;
  return out;
}
__name(encode2, "encode");
var decode2 = read;
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
__name(read, "read");
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = /* @__PURE__ */ __name(function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
}, "length");
var varint = {
  encode: encode_1,
  decode: decode2,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/varint.js
function decode3(data, offset = 0) {
  const code2 = varint_default.decode(data, offset);
  return [code2, varint_default.decode.bytes];
}
__name(decode3, "decode");
function encodeTo(int, target, offset = 0) {
  varint_default.encode(int, target, offset);
  return target;
}
__name(encodeTo, "encodeTo");
function encodingLength(int) {
  return varint_default.encodingLength(int);
}
__name(encodingLength, "encodingLength");

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/hashes/digest.js
function create(code2, digest2) {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes3 = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes3, 0);
  encodeTo(size, bytes3, sizeOffset);
  bytes3.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes3);
}
__name(create, "create");
function decode4(multihash) {
  const bytes3 = coerce(multihash);
  const [code2, sizeOffset] = decode3(bytes3);
  const [size, digestOffset] = decode3(bytes3.subarray(sizeOffset));
  const digest2 = bytes3.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes3);
}
__name(decode4, "decode");
function equals2(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals(a.bytes, data.bytes);
  }
}
__name(equals2, "equals");
var Digest = class {
  static {
    __name(this, "Digest");
  }
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code2, size, digest2, bytes3) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes3;
  }
};
function hasCode(digest2, code2) {
  return digest2.code === code2;
}
__name(hasCode, "hasCode");

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/cid.js
function format(link, base4) {
  const { bytes: bytes3, version } = link;
  switch (version) {
    case 0:
      return toStringV0(bytes3, baseCache(link), base4 ?? base58btc.encoder);
    default:
      return toStringV1(bytes3, baseCache(link), base4 ?? base32.encoder);
  }
}
__name(format, "format");
var cache = /* @__PURE__ */ new WeakMap();
function baseCache(cid) {
  const baseCache2 = cache.get(cid);
  if (baseCache2 == null) {
    const baseCache3 = /* @__PURE__ */ new Map();
    cache.set(cid, baseCache3);
    return baseCache3;
  }
  return baseCache2;
}
__name(baseCache, "baseCache");
var CID = class _CID {
  static {
    __name(this, "CID");
  }
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
  constructor(version, code2, multihash, bytes3) {
    this.code = code2;
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
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
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
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create(code2, digest2);
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
  static equals(self, other) {
    const unknown = other;
    return unknown != null && self.code === unknown.code && self.version === unknown.version && equals2(self.multihash, unknown.multihash);
  }
  toString(base4) {
    return format(this, base4);
  }
  toJSON() {
    return { "/": format(this) };
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
      const { version, code: code2, multihash, bytes: bytes3 } = value;
      return new _CID(version, code2, multihash, bytes3 ?? encodeCID(version, code2, multihash.bytes));
    } else if (value[cidSymbol] === true) {
      const { version, multihash, code: code2 } = value;
      const digest2 = decode4(multihash);
      return _CID.create(version, code2, digest2);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest2.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes3 = encodeCID(version, code2, digest2.bytes);
        return new _CID(version, code2, digest2, bytes3);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest2) {
    return _CID.create(0, DAG_PB_CODE, digest2);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code2, digest2) {
    return _CID.create(1, code2, digest2);
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
    const multihashBytes = coerce(bytes3.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
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
    const next = /* @__PURE__ */ __name(() => {
      const [i, length3] = decode3(initialBytes.subarray(offset));
      offset += length3;
      return i;
    }, "next");
    let version = next();
    let codec = DAG_PB_CODE;
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
  static parse(source, base4) {
    const [prefix, bytes3] = parseCIDtoBytes(source, base4);
    const cid = _CID.decode(bytes3);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache(cid).set(prefix, source);
    return cid;
  }
};
function parseCIDtoBytes(source, base4) {
  switch (source[0]) {
    // CIDv0 is parsed differently
    case "Q": {
      const decoder = base4 ?? base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base4 ?? base58btc;
      return [base58btc.prefix, decoder.decode(source)];
    }
    case base32.prefix: {
      const decoder = base4 ?? base32;
      return [base32.prefix, decoder.decode(source)];
    }
    case base36.prefix: {
      const decoder = base4 ?? base36;
      return [base36.prefix, decoder.decode(source)];
    }
    default: {
      if (base4 == null) {
        throw Error("To parse non base32, base36 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base4.decode(source)];
    }
  }
}
__name(parseCIDtoBytes, "parseCIDtoBytes");
function toStringV0(bytes3, cache2, base4) {
  const { prefix } = base4;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base4.name} encoding`);
  }
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base4.encode(bytes3).slice(1);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
__name(toStringV0, "toStringV0");
function toStringV1(bytes3, cache2, base4) {
  const { prefix } = base4;
  const cid = cache2.get(prefix);
  if (cid == null) {
    const cid2 = base4.encode(bytes3);
    cache2.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
__name(toStringV1, "toStringV1");
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
function encodeCID(version, code2, multihash) {
  const codeOffset = encodingLength(version);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes3 = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version, bytes3, 0);
  encodeTo(code2, bytes3, codeOffset);
  bytes3.set(multihash, hashOffset);
  return bytes3;
}
__name(encodeCID, "encodeCID");
var cidSymbol = Symbol.for("@ipld/js-cid/CID");

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var code = 0;
var name = "identity";
var encode3 = coerce;
function digest(input) {
  return create(code, encode3(input));
}
__name(digest, "digest");
var identity = { code, name, encode: encode3, digest };

// node_modules/@libp2p/webrtc/node_modules/uint8arrays/dist/src/equals.js
function equals3(a, b) {
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
__name(equals3, "equals");

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/_assert.js
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
__name(number, "number");
function isBytes(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
__name(isBytes, "isBytes");
function bytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
__name(bytes, "bytes");
function hash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(h.outputLen);
  number(h.blockLen);
}
__name(hash, "hash");
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
__name(exists, "exists");
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
__name(output, "output");

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/utils.js
var createView = /* @__PURE__ */ __name((arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength), "createView");
var rotr = /* @__PURE__ */ __name((word, shift) => word << 32 - shift | word >>> shift, "rotr");
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
__name(utf8ToBytes, "utf8ToBytes");
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  bytes(data);
  return data;
}
__name(toBytes, "toBytes");
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    bytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
__name(concatBytes, "concatBytes");
var Hash = class {
  static {
    __name(this, "Hash");
  }
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function wrapConstructor(hashCons) {
  const hashC = /* @__PURE__ */ __name((msg) => hashCons().update(toBytes(msg)).digest(), "hashC");
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
__name(wrapConstructor, "wrapConstructor");
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto2 && typeof crypto2.randomBytes === "function") {
    return crypto2.randomBytes(bytesLength);
  }
  throw new Error("crypto.getRandomValues must be defined");
}
__name(randomBytes, "randomBytes");

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE3 ? 4 : 0;
  const l = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE3);
  view.setUint32(byteOffset + l, wl, isLE3);
}
__name(setBigUint64, "setBigUint64");
var Chi = /* @__PURE__ */ __name((a, b, c) => a & b ^ ~a & c, "Chi");
var Maj = /* @__PURE__ */ __name((a, b, c) => a & b ^ a & c ^ b & c, "Maj");
var HashMD = class extends Hash {
  static {
    __name(this, "HashMD");
  }
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
    this.view = createView(this.buffer);
  }
  update(data) {
    exists(this);
    const { view, buffer, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
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
    exists(this);
    output(out, this);
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
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE3);
    this.process(view, 0);
    const oview = createView(out);
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
    const { blockLen, buffer, length: length3, finished, destroyed, pos } = this;
    to.length = length3;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length3 % blockLen)
      to.buffer.set(buffer);
    return to;
  }
};

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
__name(fromBig, "fromBig");
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
__name(split, "split");
var toBig = /* @__PURE__ */ __name((h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0), "toBig");
var shrSH = /* @__PURE__ */ __name((h, _l, s) => h >>> s, "shrSH");
var shrSL = /* @__PURE__ */ __name((h, l, s) => h << 32 - s | l >>> s, "shrSL");
var rotrSH = /* @__PURE__ */ __name((h, l, s) => h >>> s | l << 32 - s, "rotrSH");
var rotrSL = /* @__PURE__ */ __name((h, l, s) => h << 32 - s | l >>> s, "rotrSL");
var rotrBH = /* @__PURE__ */ __name((h, l, s) => h << 64 - s | l >>> s - 32, "rotrBH");
var rotrBL = /* @__PURE__ */ __name((h, l, s) => h >>> s - 32 | l << 64 - s, "rotrBL");
var rotr32H = /* @__PURE__ */ __name((_h, l) => l, "rotr32H");
var rotr32L = /* @__PURE__ */ __name((h, _l) => h, "rotr32L");
var rotlSH = /* @__PURE__ */ __name((h, l, s) => h << s | l >>> 32 - s, "rotlSH");
var rotlSL = /* @__PURE__ */ __name((h, l, s) => l << s | h >>> 32 - s, "rotlSL");
var rotlBH = /* @__PURE__ */ __name((h, l, s) => l << s - 32 | h >>> 64 - s, "rotlBH");
var rotlBL = /* @__PURE__ */ __name((h, l, s) => h << s - 32 | l >>> 64 - s, "rotlBL");
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
__name(add, "add");
var add3L = /* @__PURE__ */ __name((Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0), "add3L");
var add3H = /* @__PURE__ */ __name((low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0, "add3H");
var add4L = /* @__PURE__ */ __name((Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0), "add4L");
var add4H = /* @__PURE__ */ __name((low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0, "add4H");
var add5L = /* @__PURE__ */ __name((Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0), "add5L");
var add5H = /* @__PURE__ */ __name((low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0, "add5H");
var u64 = {
  fromBig,
  split,
  toBig,
  shrSH,
  shrSL,
  rotrSH,
  rotrSL,
  rotrBH,
  rotrBL,
  rotr32H,
  rotr32L,
  rotlSH,
  rotlSL,
  rotlBH,
  rotlBL,
  add,
  add3L,
  add3H,
  add4L,
  add4H,
  add5H,
  add5L
};
var u64_default = u64;

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/sha512.js
var [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64_default.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends HashMD {
  static {
    __name(this, "SHA512");
  }
  constructor() {
    super(128, 64, 16, false);
    this.Ah = 1779033703 | 0;
    this.Al = 4089235720 | 0;
    this.Bh = 3144134277 | 0;
    this.Bl = 2227873595 | 0;
    this.Ch = 1013904242 | 0;
    this.Cl = 4271175723 | 0;
    this.Dh = 2773480762 | 0;
    this.Dl = 1595750129 | 0;
    this.Eh = 1359893119 | 0;
    this.El = 2917565137 | 0;
    this.Fh = 2600822924 | 0;
    this.Fl = 725511199 | 0;
    this.Gh = 528734635 | 0;
    this.Gl = 4215389547 | 0;
    this.Hh = 1541459225 | 0;
    this.Hl = 327033209 | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4) {
      SHA512_W_H[i] = view.getUint32(offset);
      SHA512_W_L[i] = view.getUint32(offset += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = u64_default.rotrSH(W15h, W15l, 1) ^ u64_default.rotrSH(W15h, W15l, 8) ^ u64_default.shrSH(W15h, W15l, 7);
      const s0l = u64_default.rotrSL(W15h, W15l, 1) ^ u64_default.rotrSL(W15h, W15l, 8) ^ u64_default.shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = u64_default.rotrSH(W2h, W2l, 19) ^ u64_default.rotrBH(W2h, W2l, 61) ^ u64_default.shrSH(W2h, W2l, 6);
      const s1l = u64_default.rotrSL(W2h, W2l, 19) ^ u64_default.rotrBL(W2h, W2l, 61) ^ u64_default.shrSL(W2h, W2l, 6);
      const SUMl = u64_default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = u64_default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = u64_default.rotrSH(Eh, El, 14) ^ u64_default.rotrSH(Eh, El, 18) ^ u64_default.rotrBH(Eh, El, 41);
      const sigma1l = u64_default.rotrSL(Eh, El, 14) ^ u64_default.rotrSL(Eh, El, 18) ^ u64_default.rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = u64_default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = u64_default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = u64_default.rotrSH(Ah, Al, 28) ^ u64_default.rotrBH(Ah, Al, 34) ^ u64_default.rotrBH(Ah, Al, 39);
      const sigma0l = u64_default.rotrSL(Ah, Al, 28) ^ u64_default.rotrBL(Ah, Al, 34) ^ u64_default.rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = u64_default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = u64_default.add3L(T1l, sigma0l, MAJl);
      Ah = u64_default.add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = u64_default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = u64_default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = u64_default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = u64_default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = u64_default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = u64_default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = u64_default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = u64_default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    SHA512_W_H.fill(0);
    SHA512_W_L.fill(0);
  }
  destroy() {
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var sha512 = /* @__PURE__ */ wrapConstructor(() => new SHA512());

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/abstract/utils.js
var utils_exports = {};
__export(utils_exports, {
  aInRange: () => aInRange,
  abool: () => abool,
  abytes: () => abytes,
  bitGet: () => bitGet,
  bitLen: () => bitLen,
  bitMask: () => bitMask,
  bitSet: () => bitSet,
  bytesToHex: () => bytesToHex,
  bytesToNumberBE: () => bytesToNumberBE,
  bytesToNumberLE: () => bytesToNumberLE,
  concatBytes: () => concatBytes2,
  createHmacDrbg: () => createHmacDrbg,
  ensureBytes: () => ensureBytes,
  equalBytes: () => equalBytes,
  hexToBytes: () => hexToBytes,
  hexToNumber: () => hexToNumber,
  inRange: () => inRange,
  isBytes: () => isBytes2,
  memoized: () => memoized,
  notImplemented: () => notImplemented,
  numberToBytesBE: () => numberToBytesBE,
  numberToBytesLE: () => numberToBytesLE,
  numberToHexUnpadded: () => numberToHexUnpadded,
  numberToVarBytesBE: () => numberToVarBytesBE,
  utf8ToBytes: () => utf8ToBytes2,
  validateObject: () => validateObject
});
var _0n = /* @__PURE__ */ BigInt(0);
var _1n = /* @__PURE__ */ BigInt(1);
var _2n = /* @__PURE__ */ BigInt(2);
function isBytes2(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
__name(isBytes2, "isBytes");
function abytes(item) {
  if (!isBytes2(item))
    throw new Error("Uint8Array expected");
}
__name(abytes, "abytes");
function abool(title, value) {
  if (typeof value !== "boolean")
    throw new Error(`${title} must be valid boolean, got "${value}".`);
}
__name(abool, "abool");
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes3) {
  abytes(bytes3);
  let hex = "";
  for (let i = 0; i < bytes3.length; i++) {
    hex += hexes[bytes3[i]];
  }
  return hex;
}
__name(bytesToHex, "bytesToHex");
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
__name(numberToHexUnpadded, "numberToHexUnpadded");
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return BigInt(hex === "" ? "0" : `0x${hex}`);
}
__name(hexToNumber, "hexToNumber");
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
__name(asciiToBase16, "asciiToBase16");
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
__name(hexToBytes, "hexToBytes");
function bytesToNumberBE(bytes3) {
  return hexToNumber(bytesToHex(bytes3));
}
__name(bytesToNumberBE, "bytesToNumberBE");
function bytesToNumberLE(bytes3) {
  abytes(bytes3);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes3).reverse()));
}
__name(bytesToNumberLE, "bytesToNumberLE");
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
__name(numberToBytesBE, "numberToBytesBE");
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
__name(numberToBytesLE, "numberToBytesLE");
function numberToVarBytesBE(n) {
  return hexToBytes(numberToHexUnpadded(n));
}
__name(numberToVarBytesBE, "numberToVarBytesBE");
function ensureBytes(title, hex, expectedLength) {
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
__name(ensureBytes, "ensureBytes");
function concatBytes2(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
__name(concatBytes2, "concatBytes");
function equalBytes(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
__name(equalBytes, "equalBytes");
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
__name(utf8ToBytes2, "utf8ToBytes");
var isPosBig = /* @__PURE__ */ __name((n) => typeof n === "bigint" && _0n <= n, "isPosBig");
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
__name(inRange, "inRange");
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error(`expected valid ${title}: ${min} <= n < ${max}, got ${typeof n} ${n}`);
}
__name(aInRange, "aInRange");
function bitLen(n) {
  let len;
  for (len = 0; n > _0n; n >>= _1n, len += 1)
    ;
  return len;
}
__name(bitLen, "bitLen");
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n;
}
__name(bitGet, "bitGet");
function bitSet(n, pos, value) {
  return n | (value ? _1n : _0n) << BigInt(pos);
}
__name(bitSet, "bitSet");
var bitMask = /* @__PURE__ */ __name((n) => (_2n << BigInt(n - 1)) - _1n, "bitMask");
var u8n = /* @__PURE__ */ __name((data) => new Uint8Array(data), "u8n");
var u8fr = /* @__PURE__ */ __name((arr) => Uint8Array.from(arr), "u8fr");
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = /* @__PURE__ */ __name(() => {
    v.fill(1);
    k.fill(0);
    i = 0;
  }, "reset");
  const h = /* @__PURE__ */ __name((...b) => hmacFn(k, v, ...b), "h");
  const reseed = /* @__PURE__ */ __name((seed = u8n()) => {
    k = h(u8fr([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr([1]), seed);
    v = h();
  }, "reseed");
  const gen = /* @__PURE__ */ __name(() => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes2(...out);
  }, "gen");
  const genUntil = /* @__PURE__ */ __name((seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  }, "genUntil");
  return genUntil;
}
__name(createHmacDrbg, "createHmacDrbg");
var validatorFns = {
  bigint: /* @__PURE__ */ __name((val) => typeof val === "bigint", "bigint"),
  function: /* @__PURE__ */ __name((val) => typeof val === "function", "function"),
  boolean: /* @__PURE__ */ __name((val) => typeof val === "boolean", "boolean"),
  string: /* @__PURE__ */ __name((val) => typeof val === "string", "string"),
  stringOrUint8Array: /* @__PURE__ */ __name((val) => typeof val === "string" || isBytes2(val), "stringOrUint8Array"),
  isSafeInteger: /* @__PURE__ */ __name((val) => Number.isSafeInteger(val), "isSafeInteger"),
  array: /* @__PURE__ */ __name((val) => Array.isArray(val), "array"),
  field: /* @__PURE__ */ __name((val, object) => object.Fp.isValid(val), "field"),
  hash: /* @__PURE__ */ __name((val) => typeof val === "function" && Number.isSafeInteger(val.outputLen), "hash")
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = /* @__PURE__ */ __name((fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error(`Invalid validator "${type}", expected function`);
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
    }
  }, "checkField");
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
__name(validateObject, "validateObject");
var notImplemented = /* @__PURE__ */ __name(() => {
  throw new Error("not implemented");
}, "notImplemented");
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
__name(memoized, "memoized");

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/abstract/modular.js
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n2 = BigInt(2);
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
__name(mod, "mod");
function pow(num, power, modulo) {
  if (modulo <= _0n2 || power < _0n2)
    throw new Error("Expected power/modulo > 0");
  if (modulo === _1n2)
    return _0n2;
  let res = _1n2;
  while (power > _0n2) {
    if (power & _1n2)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n2;
  }
  return res;
}
__name(pow, "pow");
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
__name(pow2, "pow2");
function invert(number4, modulo) {
  if (number4 === _0n2 || modulo <= _0n2) {
    throw new Error(`invert: expected positive integers, got n=${number4} mod=${modulo}`);
  }
  let a = mod(number4, modulo);
  let b = modulo;
  let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
  while (a !== _0n2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
__name(invert, "invert");
function tonelliShanks(P) {
  const legendreC = (P - _1n2) / _2n2;
  let Q, S, Z;
  for (Q = P - _1n2, S = 0; Q % _2n2 === _0n2; Q /= _2n2, S++)
    ;
  for (Z = _2n2; Z < P && pow(Z, legendreC, P) !== P - _1n2; Z++)
    ;
  if (S === 1) {
    const p1div4 = (P + _1n2) / _4n;
    return /* @__PURE__ */ __name(function tonelliFast(Fp3, n) {
      const root = Fp3.pow(n, p1div4);
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    }, "tonelliFast");
  }
  const Q1div2 = (Q + _1n2) / _2n2;
  return /* @__PURE__ */ __name(function tonelliSlow(Fp3, n) {
    if (Fp3.pow(n, legendreC) === Fp3.neg(Fp3.ONE))
      throw new Error("Cannot find square root");
    let r = S;
    let g = Fp3.pow(Fp3.mul(Fp3.ONE, Z), Q);
    let x = Fp3.pow(n, Q1div2);
    let b = Fp3.pow(n, Q);
    while (!Fp3.eql(b, Fp3.ONE)) {
      if (Fp3.eql(b, Fp3.ZERO))
        return Fp3.ZERO;
      let m = 1;
      for (let t2 = Fp3.sqr(b); m < r; m++) {
        if (Fp3.eql(t2, Fp3.ONE))
          break;
        t2 = Fp3.sqr(t2);
      }
      const ge = Fp3.pow(g, _1n2 << BigInt(r - m - 1));
      g = Fp3.sqr(ge);
      x = Fp3.mul(x, ge);
      b = Fp3.mul(b, g);
      r = m;
    }
    return x;
  }, "tonelliSlow");
}
__name(tonelliShanks, "tonelliShanks");
function FpSqrt(P) {
  if (P % _4n === _3n) {
    const p1div4 = (P + _1n2) / _4n;
    return /* @__PURE__ */ __name(function sqrt3mod4(Fp3, n) {
      const root = Fp3.pow(n, p1div4);
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    }, "sqrt3mod4");
  }
  if (P % _8n === _5n) {
    const c1 = (P - _5n) / _8n;
    return /* @__PURE__ */ __name(function sqrt5mod8(Fp3, n) {
      const n2 = Fp3.mul(n, _2n2);
      const v = Fp3.pow(n2, c1);
      const nv = Fp3.mul(n, v);
      const i = Fp3.mul(Fp3.mul(nv, _2n2), v);
      const root = Fp3.mul(nv, Fp3.sub(i, Fp3.ONE));
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    }, "sqrt5mod8");
  }
  if (P % _16n === _9n) {
  }
  return tonelliShanks(P);
}
__name(FpSqrt, "FpSqrt");
var isNegativeLE = /* @__PURE__ */ __name((num, modulo) => (mod(num, modulo) & _1n2) === _1n2, "isNegativeLE");
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
__name(validateField, "validateField");
function FpPow(f, num, power) {
  if (power < _0n2)
    throw new Error("Expected power > 0");
  if (power === _0n2)
    return f.ONE;
  if (power === _1n2)
    return num;
  let p = f.ONE;
  let d = num;
  while (power > _0n2) {
    if (power & _1n2)
      p = f.mul(p, d);
    d = f.sqr(d);
    power >>= _1n2;
  }
  return p;
}
__name(FpPow, "FpPow");
function FpInvertBatch(f, nums) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = acc;
    return f.mul(acc, num);
  }, f.ONE);
  const inverted = f.inv(lastMultiplied);
  nums.reduceRight((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = f.mul(acc, tmp[i]);
    return f.mul(acc, num);
  }, inverted);
  return tmp;
}
__name(FpInvertBatch, "FpInvertBatch");
function nLength(n, nBitLength) {
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
__name(nLength, "nLength");
function Field(ORDER, bitLen2, isLE3 = false, redef = {}) {
  if (ORDER <= _0n2)
    throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const sqrtP = FpSqrt(ORDER);
  const f = Object.freeze({
    ORDER,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n2,
    ONE: _1n2,
    create: /* @__PURE__ */ __name((num) => mod(num, ORDER), "create"),
    isValid: /* @__PURE__ */ __name((num) => {
      if (typeof num !== "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
      return _0n2 <= num && num < ORDER;
    }, "isValid"),
    is0: /* @__PURE__ */ __name((num) => num === _0n2, "is0"),
    isOdd: /* @__PURE__ */ __name((num) => (num & _1n2) === _1n2, "isOdd"),
    neg: /* @__PURE__ */ __name((num) => mod(-num, ORDER), "neg"),
    eql: /* @__PURE__ */ __name((lhs, rhs) => lhs === rhs, "eql"),
    sqr: /* @__PURE__ */ __name((num) => mod(num * num, ORDER), "sqr"),
    add: /* @__PURE__ */ __name((lhs, rhs) => mod(lhs + rhs, ORDER), "add"),
    sub: /* @__PURE__ */ __name((lhs, rhs) => mod(lhs - rhs, ORDER), "sub"),
    mul: /* @__PURE__ */ __name((lhs, rhs) => mod(lhs * rhs, ORDER), "mul"),
    pow: /* @__PURE__ */ __name((num, power) => FpPow(f, num, power), "pow"),
    div: /* @__PURE__ */ __name((lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER), "div"),
    // Same as above, but doesn't normalize
    sqrN: /* @__PURE__ */ __name((num) => num * num, "sqrN"),
    addN: /* @__PURE__ */ __name((lhs, rhs) => lhs + rhs, "addN"),
    subN: /* @__PURE__ */ __name((lhs, rhs) => lhs - rhs, "subN"),
    mulN: /* @__PURE__ */ __name((lhs, rhs) => lhs * rhs, "mulN"),
    inv: /* @__PURE__ */ __name((num) => invert(num, ORDER), "inv"),
    sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
    invertBatch: /* @__PURE__ */ __name((lst) => FpInvertBatch(f, lst), "invertBatch"),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: /* @__PURE__ */ __name((a, b, c) => c ? b : a, "cmov"),
    toBytes: /* @__PURE__ */ __name((num) => isLE3 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES), "toBytes"),
    fromBytes: /* @__PURE__ */ __name((bytes3) => {
      if (bytes3.length !== BYTES)
        throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes3.length}`);
      return isLE3 ? bytesToNumberLE(bytes3) : bytesToNumberBE(bytes3);
    }, "fromBytes")
  });
  return Object.freeze(f);
}
__name(Field, "Field");
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
__name(getFieldBytesLength, "getFieldBytesLength");
function getMinHashLength(fieldOrder) {
  const length3 = getFieldBytesLength(fieldOrder);
  return length3 + Math.ceil(length3 / 2);
}
__name(getMinHashLength, "getMinHashLength");
function mapHashToField(key, fieldOrder, isLE3 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
  const num = isLE3 ? bytesToNumberBE(key) : bytesToNumberLE(key);
  const reduced = mod(num, fieldOrder - _1n2) + _1n2;
  return isLE3 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
__name(mapHashToField, "mapHashToField");

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/abstract/curve.js
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
var pointPrecomputes = /* @__PURE__ */ new WeakMap();
var pointWindowSizes = /* @__PURE__ */ new WeakMap();
function wNAF(c, bits) {
  const constTimeNegate = /* @__PURE__ */ __name((condition, item) => {
    const neg = item.negate();
    return condition ? neg : item;
  }, "constTimeNegate");
  const validateW = /* @__PURE__ */ __name((W) => {
    if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
      throw new Error(`Wrong window size=${W}, should be [1..${bits}]`);
  }, "validateW");
  const opts = /* @__PURE__ */ __name((W) => {
    validateW(W);
    const windows = Math.ceil(bits / W) + 1;
    const windowSize = 2 ** (W - 1);
    return { windows, windowSize };
  }, "opts");
  return {
    constTimeNegate,
    // non-const time multiplication ladder
    unsafeLadder(elm, n) {
      let p = c.ZERO;
      let d = elm;
      while (n > _0n3) {
        if (n & _1n3)
          p = p.add(d);
        d = d.double();
        n >>= _1n3;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = opts(W);
      const points = [];
      let p = elm;
      let base4 = p;
      for (let window = 0; window < windows; window++) {
        base4 = p;
        points.push(base4);
        for (let i = 1; i < windowSize; i++) {
          base4 = base4.add(p);
          points.push(base4);
        }
        p = base4.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      const { windows, windowSize } = opts(W);
      let p = c.ZERO;
      let f = c.BASE;
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window = 0; window < windows; window++) {
        const offset = window * windowSize;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n3;
        }
        const offset1 = offset;
        const offset2 = offset + Math.abs(wbits) - 1;
        const cond1 = window % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f = f.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p = p.add(constTimeNegate(cond2, precomputes[offset2]));
        }
      }
      return { p, f };
    },
    wNAFCached(P, n, transform) {
      const W = pointWindowSizes.get(P) || 1;
      let comp = pointPrecomputes.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1)
          pointPrecomputes.set(P, transform(comp));
      }
      return this.wNAF(W, comp, n);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P, W) {
      validateW(W);
      pointWindowSizes.set(P, W);
      pointPrecomputes.delete(P);
    }
  };
}
__name(wNAF, "wNAF");
function pippenger(c, field, points, scalars) {
  if (!Array.isArray(points) || !Array.isArray(scalars) || scalars.length !== points.length)
    throw new Error("arrays of points and scalars must have equal length");
  scalars.forEach((s, i) => {
    if (!field.isValid(s))
      throw new Error(`wrong scalar at index ${i}`);
  });
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error(`wrong point at index ${i}`);
  });
  const wbits = bitLen(BigInt(points.length));
  const windowSize = wbits > 12 ? wbits - 3 : wbits > 4 ? wbits - 2 : wbits ? 2 : 1;
  const MASK = (1 << windowSize) - 1;
  const buckets = new Array(MASK + 1).fill(c.ZERO);
  const lastBits = Math.floor((field.BITS - 1) / windowSize) * windowSize;
  let sum = c.ZERO;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(c.ZERO);
    for (let j = 0; j < scalars.length; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & BigInt(MASK));
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = c.ZERO;
    for (let j = buckets.length - 1, sumI = c.ZERO; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
__name(pippenger, "pippenger");
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}
__name(validateBasic, "validateBasic");

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/abstract/edwards.js
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n3 = BigInt(2);
var _8n2 = BigInt(8);
var VERIFY_DEFAULT = { zip215: true };
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(curve, {
    hash: "function",
    a: "bigint",
    d: "bigint",
    randomBytes: "function"
  }, {
    adjustScalarBytes: "function",
    domain: "function",
    uvRatio: "function",
    mapToCurve: "function"
  });
  return Object.freeze({ ...opts });
}
__name(validateOpts, "validateOpts");
function twistedEdwards(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp: Fp3, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE;
  const MASK = _2n3 << BigInt(nByteLength * 8) - _1n4;
  const modP = Fp3.create;
  const Fn = Field(CURVE.n, CURVE.nBitLength);
  const uvRatio2 = CURVE.uvRatio || ((u, v) => {
    try {
      return { isValid: true, value: Fp3.sqrt(u * Fp3.inv(v)) };
    } catch (e) {
      return { isValid: false, value: _0n4 };
    }
  });
  const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes3) => bytes3);
  const domain = CURVE.domain || ((data, ctx, phflag) => {
    abool("phflag", phflag);
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function aCoordinate(title, n) {
    aInRange("coordinate " + title, n, _0n4, MASK);
  }
  __name(aCoordinate, "aCoordinate");
  function assertPoint(other) {
    if (!(other instanceof Point2))
      throw new Error("ExtendedPoint expected");
  }
  __name(assertPoint, "assertPoint");
  const toAffineMemo = memoized((p, iz) => {
    const { ex: x, ey: y, ez: z } = p;
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? _8n2 : Fp3.inv(z);
    const ax = modP(x * iz);
    const ay = modP(y * iz);
    const zz = modP(z * iz);
    if (is0)
      return { x: _0n4, y: _1n4 };
    if (zz !== _1n4)
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    const { a, d } = CURVE;
    if (p.is0())
      throw new Error("bad point: ZERO");
    const { ex: X, ey: Y, ez: Z, et: T } = p;
    const X2 = modP(X * X);
    const Y2 = modP(Y * Y);
    const Z2 = modP(Z * Z);
    const Z4 = modP(Z2 * Z2);
    const aX2 = modP(X2 * a);
    const left = modP(Z2 * modP(aX2 + Y2));
    const right = modP(Z4 + modP(d * modP(X2 * Y2)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X * Y);
    const ZT = modP(Z * T);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point2 {
    static {
      __name(this, "Point");
    }
    constructor(ex, ey, ez, et) {
      this.ex = ex;
      this.ey = ey;
      this.ez = ez;
      this.et = et;
      aCoordinate("x", ex);
      aCoordinate("y", ey);
      aCoordinate("z", ez);
      aCoordinate("t", et);
      Object.freeze(this);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(p) {
      if (p instanceof Point2)
        throw new Error("extended point not allowed");
      const { x, y } = p || {};
      aCoordinate("x", x);
      aCoordinate("y", y);
      return new Point2(x, y, _1n4, modP(x * y));
    }
    static normalizeZ(points) {
      const toInv = Fp3.invertBatch(points.map((p) => p.ez));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point2, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // Not required for fromHex(), which always creates valid points.
    // Could be useful for fromAffine().
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      assertPoint(other);
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const { ex: X2, ey: Y2, ez: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point2.ZERO);
    }
    negate() {
      return new Point2(modP(-this.ex), this.ey, this.ez, modP(-this.et));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const A = modP(X1 * X1);
      const B = modP(Y1 * Y1);
      const C = modP(_2n3 * modP(Z1 * Z1));
      const D = modP(a * A);
      const x1y1 = X1 + Y1;
      const E = modP(modP(x1y1 * x1y1) - A - B);
      const G2 = D + B;
      const F = G2 - C;
      const H = D - B;
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point2(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      assertPoint(other);
      const { a, d } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
      const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
      if (a === BigInt(-1)) {
        const A2 = modP((Y1 - X1) * (Y2 + X2));
        const B2 = modP((Y1 + X1) * (Y2 - X2));
        const F2 = modP(B2 - A2);
        if (F2 === _0n4)
          return this.double();
        const C2 = modP(Z1 * _2n3 * T2);
        const D2 = modP(T1 * _2n3 * Z2);
        const E2 = D2 + C2;
        const G3 = B2 + A2;
        const H2 = D2 - C2;
        const X32 = modP(E2 * F2);
        const Y32 = modP(G3 * H2);
        const T32 = modP(E2 * H2);
        const Z32 = modP(F2 * G3);
        return new Point2(X32, Y32, Z32, T32);
      }
      const A = modP(X1 * X2);
      const B = modP(Y1 * Y2);
      const C = modP(T1 * d * T2);
      const D = modP(Z1 * Z2);
      const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
      const F = D - C;
      const G2 = D + C;
      const H = modP(B - a * A);
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point2(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, n, Point2.normalizeZ);
    }
    // Constant-time multiplication.
    multiply(scalar) {
      const n = scalar;
      aInRange("scalar", n, _1n4, CURVE_ORDER);
      const { p, f } = this.wNAF(n);
      return Point2.normalizeZ([p, f])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    multiplyUnsafe(scalar) {
      const n = scalar;
      aInRange("scalar", n, _0n4, CURVE_ORDER);
      if (n === _0n4)
        return I;
      if (this.equals(I) || n === _1n4)
        return this;
      if (this.equals(G))
        return this.wNAF(n).p;
      return wnaf.unsafeLadder(this, n);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    clearCofactor() {
      const { h: cofactor2 } = CURVE;
      if (cofactor2 === _1n4)
        return this;
      return this.multiplyUnsafe(cofactor2);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(hex, zip215 = false) {
      const { d, a } = CURVE;
      const len = Fp3.BYTES;
      hex = ensureBytes("pointHex", hex, len);
      abool("zip215", zip215);
      const normed = hex.slice();
      const lastByte = hex[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y = bytesToNumberLE(normed);
      const max = zip215 ? MASK : Fp3.ORDER;
      aInRange("pointHex.y", y, _0n4, max);
      const y2 = modP(y * y);
      const u = modP(y2 - _1n4);
      const v = modP(d * y2 - a);
      let { isValid, value: x } = uvRatio2(u, v);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x & _1n4) === _1n4;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x === _0n4 && isLastByteOdd)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x = modP(-x);
      return Point2.fromAffine({ x, y });
    }
    static fromPrivateKey(privKey) {
      return getExtendedPublicKey(privKey).point;
    }
    toRawBytes() {
      const { x, y } = this.toAffine();
      const bytes3 = numberToBytesLE(y, Fp3.BYTES);
      bytes3[bytes3.length - 1] |= x & _1n4 ? 128 : 0;
      return bytes3;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
  }
  Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, _1n4, modP(CURVE.Gx * CURVE.Gy));
  Point2.ZERO = new Point2(_0n4, _1n4, _1n4, _0n4);
  const { BASE: G, ZERO: I } = Point2;
  const wnaf = wNAF(Point2, nByteLength * 8);
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  __name(modN, "modN");
  function modN_LE(hash2) {
    return modN(bytesToNumberLE(hash2));
  }
  __name(modN_LE, "modN_LE");
  function getExtendedPublicKey(key) {
    const len = nByteLength;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    const point = G.multiply(scalar);
    const pointBytes = point.toRawBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  __name(getExtendedPublicKey, "getExtendedPublicKey");
  function getPublicKey(privKey) {
    return getExtendedPublicKey(privKey).pointBytes;
  }
  __name(getPublicKey, "getPublicKey");
  function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
    const msg = concatBytes2(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  __name(hashDomainToScalar, "hashDomainToScalar");
  function sign(msg, privKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
    const r = hashDomainToScalar(options.context, prefix, msg);
    const R = G.multiply(r).toRawBytes();
    const k = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s = modN(r + k * scalar);
    aInRange("signature.s", s, _0n4, CURVE_ORDER);
    const res = concatBytes2(R, numberToBytesLE(s, Fp3.BYTES));
    return ensureBytes("result", res, nByteLength * 2);
  }
  __name(sign, "sign");
  const verifyOpts = VERIFY_DEFAULT;
  function verify(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = Fp3.BYTES;
    sig = ensureBytes("signature", sig, 2 * len);
    msg = ensureBytes("message", msg);
    if (zip215 !== void 0)
      abool("zip215", zip215);
    if (prehash)
      msg = prehash(msg);
    const s = bytesToNumberLE(sig.slice(len, 2 * len));
    let A, R, SB;
    try {
      A = Point2.fromHex(publicKey, zip215);
      R = Point2.fromHex(sig.slice(0, len), zip215);
      SB = G.multiplyUnsafe(s);
    } catch (error) {
      return false;
    }
    if (!zip215 && A.isSmallOrder())
      return false;
    const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
    const RkA = R.add(A.multiplyUnsafe(k));
    return RkA.subtract(SB).clearCofactor().equals(Point2.ZERO);
  }
  __name(verify, "verify");
  G._setWindowSize(8);
  const utils = {
    getExtendedPublicKey,
    // ed25519 private keys are uniform 32b. No need to check for modulo bias, like in secp256k1.
    randomPrivateKey: /* @__PURE__ */ __name(() => randomBytes2(Fp3.BYTES), "randomPrivateKey"),
    /**
     * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
     * values. This slows down first getPublicKey() by milliseconds (see Speed section),
     * but allows to speed-up subsequent getPublicKey() calls up to 20x.
     * @param windowSize 2, 4, 8, 16
     */
    precompute(windowSize = 8, point = Point2.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  return {
    CURVE,
    getPublicKey,
    sign,
    verify,
    ExtendedPoint: Point2,
    utils
  };
}
__name(twistedEdwards, "twistedEdwards");

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/abstract/montgomery.js
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
function validateOpts2(curve) {
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
__name(validateOpts2, "validateOpts");
function montgomery(curveDef) {
  const CURVE = validateOpts2(curveDef);
  const { P } = CURVE;
  const modP = /* @__PURE__ */ __name((n) => mod(n, P), "modP");
  const montgomeryBits = CURVE.montgomeryBits;
  const montgomeryBytes = Math.ceil(montgomeryBits / 8);
  const fieldLen = CURVE.nByteLength;
  const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes3) => bytes3);
  const powPminus2 = CURVE.powPminus2 || ((x) => pow(x, P - BigInt(2), P));
  function cswap(swap, x_2, x_3) {
    const dummy = modP(swap * (x_2 - x_3));
    x_2 = modP(x_2 - dummy);
    x_3 = modP(x_3 + dummy);
    return [x_2, x_3];
  }
  __name(cswap, "cswap");
  const a24 = (CURVE.a - BigInt(2)) / BigInt(4);
  function montgomeryLadder(u, scalar) {
    aInRange("u", u, _0n5, P);
    aInRange("scalar", scalar, _0n5, P);
    const k = scalar;
    const x_1 = u;
    let x_2 = _1n5;
    let z_2 = _0n5;
    let x_3 = u;
    let z_3 = _1n5;
    let swap = _0n5;
    let sw;
    for (let t = BigInt(montgomeryBits - 1); t >= _0n5; t--) {
      const k_t = k >> t & _1n5;
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
  __name(montgomeryLadder, "montgomeryLadder");
  function encodeUCoordinate(u) {
    return numberToBytesLE(modP(u), montgomeryBytes);
  }
  __name(encodeUCoordinate, "encodeUCoordinate");
  function decodeUCoordinate(uEnc) {
    const u = ensureBytes("u coordinate", uEnc, montgomeryBytes);
    if (fieldLen === 32)
      u[31] &= 127;
    return bytesToNumberLE(u);
  }
  __name(decodeUCoordinate, "decodeUCoordinate");
  function decodeScalar(n) {
    const bytes3 = ensureBytes("scalar", n);
    const len = bytes3.length;
    if (len !== montgomeryBytes && len !== fieldLen)
      throw new Error(`Expected ${montgomeryBytes} or ${fieldLen} bytes, got ${len}`);
    return bytesToNumberLE(adjustScalarBytes2(bytes3));
  }
  __name(decodeScalar, "decodeScalar");
  function scalarMult(scalar, u) {
    const pointU = decodeUCoordinate(u);
    const _scalar = decodeScalar(scalar);
    const pu = montgomeryLadder(pointU, _scalar);
    if (pu === _0n5)
      throw new Error("Invalid private or public key received");
    return encodeUCoordinate(pu);
  }
  __name(scalarMult, "scalarMult");
  const GuBytes = encodeUCoordinate(CURVE.Gu);
  function scalarMultBase(scalar) {
    return scalarMult(scalar, GuBytes);
  }
  __name(scalarMultBase, "scalarMultBase");
  return {
    scalarMult,
    scalarMultBase,
    getSharedSecret: /* @__PURE__ */ __name((privateKey, publicKey) => scalarMult(privateKey, publicKey), "getSharedSecret"),
    getPublicKey: /* @__PURE__ */ __name((privateKey) => scalarMultBase(privateKey), "getPublicKey"),
    utils: { randomPrivateKey: /* @__PURE__ */ __name(() => CURVE.randomBytes(CURVE.nByteLength), "randomPrivateKey") },
    GuBytes
  };
}
__name(montgomery, "montgomery");

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/ed25519.js
var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
var _0n6 = BigInt(0);
var _1n6 = BigInt(1);
var _2n4 = BigInt(2);
var _3n2 = BigInt(3);
var _5n2 = BigInt(5);
var _8n3 = BigInt(8);
function ed25519_pow_2_252_3(x) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P = ED25519_P;
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow2(b2, _2n4, P) * b2 % P;
  const b5 = pow2(b4, _1n6, P) * x % P;
  const b10 = pow2(b5, _5n2, P) * b5 % P;
  const b20 = pow2(b10, _10n, P) * b10 % P;
  const b40 = pow2(b20, _20n, P) * b20 % P;
  const b80 = pow2(b40, _40n, P) * b40 % P;
  const b160 = pow2(b80, _80n, P) * b80 % P;
  const b240 = pow2(b160, _80n, P) * b80 % P;
  const b250 = pow2(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow2(b250, _2n4, P) * x % P;
  return { pow_p_5_8, b2 };
}
__name(ed25519_pow_2_252_3, "ed25519_pow_2_252_3");
function adjustScalarBytes(bytes3) {
  bytes3[0] &= 248;
  bytes3[31] &= 127;
  bytes3[31] |= 64;
  return bytes3;
}
__name(adjustScalarBytes, "adjustScalarBytes");
function uvRatio(u, v) {
  const P = ED25519_P;
  const v3 = mod(v * v * v, P);
  const v7 = mod(v3 * v3 * v, P);
  const pow3 = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod(u * v3 * pow3, P);
  const vx2 = mod(v * x * x, P);
  const root1 = x;
  const root2 = mod(x * ED25519_SQRT_M1, P);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (isNegativeLE(x, P))
    x = mod(-x, P);
  return { isValid: useRoot1 || useRoot2, value: x };
}
__name(uvRatio, "uvRatio");
var Fp = /* @__PURE__ */ (() => Field(ED25519_P, void 0, true))();
var ed25519Defaults = /* @__PURE__ */ (() => ({
  // Param: a
  a: BigInt(-1),
  // Fp.create(-1) is proper; our way still works and is faster
  // d is equal to -121665/121666 over finite field.
  // Negative number is P - number, and division is invert(number, P)
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  // Finite field 𝔽p over which we'll do calculations; 2n**255n - 19n
  Fp,
  // Subgroup order: how many points curve has
  // 2n**252n + 27742317777372353535851937790883648493n;
  n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
  // Cofactor
  h: _8n3,
  // Base point (x, y) aka generator point
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
  hash: sha512,
  randomBytes,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
}))();
var ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
var x25519 = /* @__PURE__ */ (() => montgomery({
  P: ED25519_P,
  a: BigInt(486662),
  montgomeryBits: 255,
  // n is 253 bits
  nByteLength: 32,
  Gu: BigInt(9),
  powPminus2: /* @__PURE__ */ __name((x) => {
    const P = ED25519_P;
    const { pow_p_5_8, b2 } = ed25519_pow_2_252_3(x);
    return mod(pow2(pow_p_5_8, _3n2, P) * b2, P);
  }, "powPminus2"),
  adjustScalarBytes,
  randomBytes
}))();

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/ed25519/index.browser.js
var PUBLIC_KEY_BYTE_LENGTH = 32;
function hashAndVerify(publicKey, sig, msg) {
  return ed25519.verify(sig, msg instanceof Uint8Array ? msg : msg.subarray(), publicKey);
}
__name(hashAndVerify, "hashAndVerify");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/ed25519/ed25519.js
var Ed25519PublicKey = class {
  static {
    __name(this, "Ed25519PublicKey");
  }
  type = "Ed25519";
  raw;
  constructor(key) {
    this.raw = ensureEd25519Key(key, PUBLIC_KEY_BYTE_LENGTH);
  }
  toMultihash() {
    return identity.digest(publicKeyToProtobuf(this));
  }
  toCID() {
    return CID.createV1(114, this.toMultihash());
  }
  toString() {
    return base58btc.encode(this.toMultihash().bytes).substring(1);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  verify(data, sig) {
    return hashAndVerify(this.raw, sig, data);
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/ed25519/utils.js
function unmarshalEd25519PublicKey(bytes3) {
  bytes3 = ensureEd25519Key(bytes3, PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PublicKey(bytes3);
}
__name(unmarshalEd25519PublicKey, "unmarshalEd25519PublicKey");
function ensureEd25519Key(key, length3) {
  key = Uint8Array.from(key ?? []);
  if (key.length !== length3) {
    throw new InvalidParametersError(`Key must be a Uint8Array of length ${length3}, got ${key.length}`);
  }
  return key;
}
__name(ensureEd25519Key, "ensureEd25519Key");

// node_modules/@libp2p/webrtc/node_modules/uint8arrays/dist/src/alloc.js
function alloc(size = 0) {
  return new Uint8Array(size);
}
__name(alloc, "alloc");
function allocUnsafe(size = 0) {
  return new Uint8Array(size);
}
__name(allocUnsafe, "allocUnsafe");

// node_modules/@libp2p/webrtc/node_modules/uint8-varint/dist/src/index.js
var N12 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N42 = Math.pow(2, 28);
var N52 = Math.pow(2, 35);
var N62 = Math.pow(2, 42);
var N72 = Math.pow(2, 49);
var MSB2 = 128;
var REST2 = 127;
function encodingLength2(value) {
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
  if (Number.MAX_SAFE_INTEGER != null && value > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("Could not encode varint");
  }
  return 8;
}
__name(encodingLength2, "encodingLength");
function encodeUint8Array(value, buf, offset = 0) {
  switch (encodingLength2(value)) {
    case 8: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 7: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 6: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 5: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 4: {
      buf[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 3: {
      buf[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 2: {
      buf[offset++] = value & 255 | MSB2;
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
__name(encodeUint8Array, "encodeUint8Array");
function encodeUint8ArrayList(value, buf, offset = 0) {
  switch (encodingLength2(value)) {
    case 8: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 7: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 6: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 5: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 4: {
      buf.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 3: {
      buf.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 2: {
      buf.set(offset++, value & 255 | MSB2);
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
__name(encodeUint8ArrayList, "encodeUint8ArrayList");
function decodeUint8Array(buf, offset) {
  let b = buf[offset];
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 1];
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 2];
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 3];
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 4];
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 5];
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 6];
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 7];
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
__name(decodeUint8Array, "decodeUint8Array");
function decodeUint8ArrayList(buf, offset) {
  let b = buf.get(offset);
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 1);
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 2);
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 3);
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 4);
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 5);
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 6);
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 7);
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
__name(decodeUint8ArrayList, "decodeUint8ArrayList");
function encode4(value, buf, offset = 0) {
  if (buf == null) {
    buf = allocUnsafe(encodingLength2(value));
  }
  if (buf instanceof Uint8Array) {
    return encodeUint8Array(value, buf, offset);
  } else {
    return encodeUint8ArrayList(value, buf, offset);
  }
}
__name(encode4, "encode");
function decode5(buf, offset = 0) {
  if (buf instanceof Uint8Array) {
    return decodeUint8Array(buf, offset);
  } else {
    return decodeUint8ArrayList(buf, offset);
  }
}
__name(decode5, "decode");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/utils/float.js
var f32 = new Float32Array([-0]);
var f8b = new Uint8Array(f32.buffer);
function writeFloatLE(val, buf, pos) {
  f32[0] = val;
  buf[pos] = f8b[0];
  buf[pos + 1] = f8b[1];
  buf[pos + 2] = f8b[2];
  buf[pos + 3] = f8b[3];
}
__name(writeFloatLE, "writeFloatLE");
function readFloatLE(buf, pos) {
  f8b[0] = buf[pos];
  f8b[1] = buf[pos + 1];
  f8b[2] = buf[pos + 2];
  f8b[3] = buf[pos + 3];
  return f32[0];
}
__name(readFloatLE, "readFloatLE");
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
__name(writeDoubleLE, "writeDoubleLE");
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
__name(readDoubleLE, "readDoubleLE");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/utils/longbits.js
var MAX_SAFE_NUMBER_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
var MIN_SAFE_NUMBER_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
var LongBits = class _LongBits {
  static {
    __name(this, "LongBits");
  }
  lo;
  hi;
  constructor(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
  }
  /**
   * Converts this long bits to a possibly unsafe JavaScript number
   */
  toNumber(unsigned = false) {
    if (!unsigned && this.hi >>> 31 > 0) {
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
  toBigInt(unsigned = false) {
    if (unsigned) {
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
  toString(unsigned = false) {
    return this.toBigInt(unsigned).toString();
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
      if (++lo > TWO_32) {
        lo = 0n;
        if (++hi > TWO_32) {
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
    const sign = value < 0;
    if (sign) {
      value = -value;
    }
    let lo = value >>> 0;
    let hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
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
var zero = new LongBits(0, 0);
zero.toBigInt = function() {
  return 0n;
};
zero.zzEncode = zero.zzDecode = function() {
  return this;
};
zero.length = function() {
  return 1;
};
var TWO_32 = 4294967296n;

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/utils/utf8.js
function length2(string3) {
  let len = 0;
  let c = 0;
  for (let i = 0; i < string3.length; ++i) {
    c = string3.charCodeAt(i);
    if (c < 128) {
      len += 1;
    } else if (c < 2048) {
      len += 2;
    } else if ((c & 64512) === 55296 && (string3.charCodeAt(i + 1) & 64512) === 56320) {
      ++i;
      len += 4;
    } else {
      len += 3;
    }
  }
  return len;
}
__name(length2, "length");
function read2(buffer, start, end) {
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
__name(read2, "read");
function write(string3, buffer, offset) {
  const start = offset;
  let c1;
  let c2;
  for (let i = 0; i < string3.length; ++i) {
    c1 = string3.charCodeAt(i);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192;
      buffer[offset++] = c1 & 63 | 128;
    } else if ((c1 & 64512) === 55296 && ((c2 = string3.charCodeAt(i + 1)) & 64512) === 56320) {
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
__name(write, "write");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/utils/reader.js
function indexOutOfRange(reader, writeLength) {
  return RangeError(`index out of range: ${reader.pos} + ${writeLength ?? 1} > ${reader.len}`);
}
__name(indexOutOfRange, "indexOutOfRange");
function readFixed32End(buf, end) {
  return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
}
__name(readFixed32End, "readFixed32End");
var Uint8ArrayReader = class {
  static {
    __name(this, "Uint8ArrayReader");
  }
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
    const length3 = this.uint32();
    const start = this.pos;
    const end = this.pos + length3;
    if (end > this.len) {
      throw indexOutOfRange(this, length3);
    }
    this.pos += length3;
    return start === end ? new Uint8Array(0) : this.buf.subarray(start, end);
  }
  /**
   * Reads a string preceded by its byte length as a varint
   */
  string() {
    const bytes3 = this.bytes();
    return read2(bytes3, 0, bytes3.length);
  }
  /**
   * Skips the specified number of bytes if specified, otherwise skips a varint
   */
  skip(length3) {
    if (typeof length3 === "number") {
      if (this.pos + length3 > this.len) {
        throw indexOutOfRange(this, length3);
      }
      this.pos += length3;
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
      /* istanbul ignore next */
      default:
        throw Error(`invalid wire type ${wireType} at offset ${this.pos}`);
    }
    return this;
  }
  readLongVarint() {
    const bits = new LongBits(0, 0);
    let i = 0;
    if (this.len - this.pos > 4) {
      for (; i < 4; ++i) {
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
        }
      }
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
      if (this.buf[this.pos++] < 128) {
        return bits;
      }
      i = 0;
    } else {
      for (; i < 3; ++i) {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
        }
      }
      bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
      return bits;
    }
    if (this.len - this.pos > 4) {
      for (; i < 5; ++i) {
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
        }
      }
    } else {
      for (; i < 5; ++i) {
        if (this.pos >= this.len) {
          throw indexOutOfRange(this);
        }
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
        if (this.buf[this.pos++] < 128) {
          return bits;
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
    return new LongBits(lo, hi);
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
    this.pos += encodingLength2(value);
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
__name(createReader, "createReader");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/decode.js
function decodeMessage(buf, codec, opts) {
  const reader = createReader(buf);
  return codec.decode(reader, void 0, opts);
}
__name(decodeMessage, "decodeMessage");

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base16.js
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

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base2.js
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

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  const codePoint = c.codePointAt(0);
  if (codePoint == null) {
    throw new Error(`Invalid character: ${c}`);
  }
  p[codePoint] = i;
  return p;
}, []);
function encode5(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
__name(encode5, "encode");
function decode6(str) {
  const byts = [];
  for (const char of str) {
    const codePoint = char.codePointAt(0);
    if (codePoint == null) {
      throw new Error(`Invalid character: ${char}`);
    }
    const byt = alphabetCharsToBytes[codePoint];
    if (byt == null) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
__name(decode6, "decode");
var base256emoji = from({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode5,
  decode: decode6
});

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base64.js
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

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/base8.js
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

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var identity2 = from({
  prefix: "\0",
  name: "identity",
  encode: /* @__PURE__ */ __name((buf) => toString(buf), "encode"),
  decode: /* @__PURE__ */ __name((str) => fromString(str), "decode")
});

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha5122
});

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/hashes/hasher.js
function from2({ name: name2, code: code2, encode: encode7 }) {
  return new Hasher(name2, code2, encode7);
}
__name(from2, "from");
var Hasher = class {
  static {
    __name(this, "Hasher");
  }
  name;
  code;
  encode;
  constructor(name2, code2, encode7) {
    this.name = name2;
    this.code = code2;
    this.encode = encode7;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/hashes/sha2-browser.js
function sha(name2) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
}
__name(sha, "sha");
var sha256 = from2({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha5122 = from2({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/@libp2p/webrtc/node_modules/multiformats/dist/src/basics.js
var bases = { ...identity_exports2, ...base2_exports, ...base8_exports, ...base10_exports, ...base16_exports, ...base32_exports, ...base36_exports, ...base58_exports, ...base64_exports, ...base256emoji_exports };
var hashes = { ...sha2_browser_exports, ...identity_exports };

// node_modules/@libp2p/webrtc/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec(name2, prefix, encode7, decode8) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode7
    },
    decoder: {
      decode: decode8
    }
  };
}
__name(createCodec, "createCodec");
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string3 = "a";
  for (let i = 0; i < buf.length; i++) {
    string3 += String.fromCharCode(buf[i]);
  }
  return string3;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
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

// node_modules/@libp2p/webrtc/node_modules/uint8arrays/dist/src/from-string.js
function fromString2(string3, encoding = "utf8") {
  const base4 = bases_default[encoding];
  if (base4 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base4.decoder.decode(`${base4.prefix}${string3}`);
}
__name(fromString2, "fromString");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/utils/pool.js
function pool(size) {
  const SIZE = size ?? 8192;
  const MAX = SIZE >>> 1;
  let slab;
  let offset = SIZE;
  return /* @__PURE__ */ __name(function poolAlloc(size2) {
    if (size2 < 1 || size2 > MAX) {
      return allocUnsafe(size2);
    }
    if (offset + size2 > SIZE) {
      slab = allocUnsafe(SIZE);
      offset = 0;
    }
    const buf = slab.subarray(offset, offset += size2);
    if ((offset & 7) !== 0) {
      offset = (offset | 7) + 1;
    }
    return buf;
  }, "poolAlloc");
}
__name(pool, "pool");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/utils/writer.js
var Op = class {
  static {
    __name(this, "Op");
  }
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
__name(noop, "noop");
var State = class {
  static {
    __name(this, "State");
  }
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
    return allocUnsafe(size);
  }
  return bufferPool(size);
}
__name(alloc2, "alloc");
var Uint8ArrayWriter = class {
  static {
    __name(this, "Uint8ArrayWriter");
  }
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
    return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
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
    const bits = LongBits.fromBigInt(value);
    return this._push(writeVarint64, bits.length(), bits);
  }
  /**
   * Writes an unsigned 64 bit value as a varint
   */
  uint64Number(value) {
    return this._push(encodeUint8Array, encodingLength2(value), value);
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
    const bits = LongBits.fromBigInt(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
  }
  /**
   * Writes a signed 64 bit value as a varint, zig-zag encoded
   */
  sint64Number(value) {
    const bits = LongBits.fromNumber(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
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
    const bits = LongBits.fromBigInt(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
  }
  /**
   * Writes an unsigned 64 bit value as fixed 64 bits
   */
  fixed64Number(value) {
    const bits = LongBits.fromNumber(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
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
    const len = length2(value);
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
__name(writeByte, "writeByte");
function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
}
__name(writeVarint32, "writeVarint32");
var VarintOp = class extends Op {
  static {
    __name(this, "VarintOp");
  }
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
__name(writeVarint64, "writeVarint64");
function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}
__name(writeFixed32, "writeFixed32");
function writeBytes(val, buf, pos) {
  buf.set(val, pos);
}
__name(writeBytes, "writeBytes");
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
__name(writeBytesBuffer, "writeBytesBuffer");
function writeStringBuffer(val, buf, pos) {
  if (val.length < 40) {
    write(val, buf, pos);
  } else if (buf.utf8Write != null) {
    buf.utf8Write(val, pos);
  } else {
    buf.set(fromString2(val), pos);
  }
}
__name(writeStringBuffer, "writeStringBuffer");
function createWriter() {
  return new Uint8ArrayWriter();
}
__name(createWriter, "createWriter");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/encode.js
function encodeMessage(message2, codec) {
  const w = createWriter();
  codec.encode(message2, w, {
    lengthDelimited: false
  });
  return w.finish();
}
__name(encodeMessage, "encodeMessage");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/codec.js
var CODEC_TYPES;
(function(CODEC_TYPES2) {
  CODEC_TYPES2[CODEC_TYPES2["VARINT"] = 0] = "VARINT";
  CODEC_TYPES2[CODEC_TYPES2["BIT64"] = 1] = "BIT64";
  CODEC_TYPES2[CODEC_TYPES2["LENGTH_DELIMITED"] = 2] = "LENGTH_DELIMITED";
  CODEC_TYPES2[CODEC_TYPES2["START_GROUP"] = 3] = "START_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["END_GROUP"] = 4] = "END_GROUP";
  CODEC_TYPES2[CODEC_TYPES2["BIT32"] = 5] = "BIT32";
})(CODEC_TYPES || (CODEC_TYPES = {}));
function createCodec2(name2, type, encode7, decode8) {
  return {
    name: name2,
    type,
    encode: encode7,
    decode: decode8
  };
}
__name(createCodec2, "createCodec");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/codecs/enum.js
function enumeration(v) {
  function findValue(val) {
    if (v[val.toString()] == null) {
      throw new Error("Invalid enum value");
    }
    return v[val];
  }
  __name(findValue, "findValue");
  const encode7 = /* @__PURE__ */ __name(function enumEncode(val, writer) {
    const enumValue = findValue(val);
    writer.int32(enumValue);
  }, "enumEncode");
  const decode8 = /* @__PURE__ */ __name(function enumDecode(reader) {
    const val = reader.int32();
    return findValue(val);
  }, "enumDecode");
  return createCodec2("enum", CODEC_TYPES.VARINT, encode7, decode8);
}
__name(enumeration, "enumeration");

// node_modules/@libp2p/webrtc/node_modules/protons-runtime/dist/src/codecs/message.js
function message(encode7, decode8) {
  return createCodec2("message", CODEC_TYPES.LENGTH_DELIMITED, encode7, decode8);
}
__name(message, "message");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/keys.js
var KeyType;
(function(KeyType2) {
  KeyType2["RSA"] = "RSA";
  KeyType2["Ed25519"] = "Ed25519";
  KeyType2["secp256k1"] = "secp256k1";
})(KeyType || (KeyType = {}));
var __KeyTypeValues;
(function(__KeyTypeValues2) {
  __KeyTypeValues2[__KeyTypeValues2["RSA"] = 0] = "RSA";
  __KeyTypeValues2[__KeyTypeValues2["Ed25519"] = 1] = "Ed25519";
  __KeyTypeValues2[__KeyTypeValues2["secp256k1"] = 2] = "secp256k1";
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
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.Type = KeyType.codec().decode(reader);
              break;
            }
            case 2: {
              obj.Data = reader.bytes();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
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
  PublicKey2.decode = (buf, opts) => {
    return decodeMessage(buf, PublicKey2.codec(), opts);
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
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.Type = KeyType.codec().decode(reader);
              break;
            }
            case 2: {
              obj.Data = reader.bytes();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
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
  PrivateKey2.decode = (buf, opts) => {
    return decodeMessage(buf, PrivateKey2.codec(), opts);
  };
})(PrivateKey || (PrivateKey = {}));

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/rsa/utils.js
var utils_exports2 = {};
__export(utils_exports2, {
  MAX_RSA_KEY_SIZE: () => MAX_RSA_KEY_SIZE,
  generateRSAKeyPair: () => generateRSAKeyPair,
  jwkToJWKKeyPair: () => jwkToJWKKeyPair,
  jwkToPkcs1: () => jwkToPkcs1,
  jwkToPkix: () => jwkToPkix,
  jwkToRSAPrivateKey: () => jwkToRSAPrivateKey,
  pkcs1ToJwk: () => pkcs1ToJwk,
  pkcs1ToRSAPrivateKey: () => pkcs1ToRSAPrivateKey,
  pkixToJwk: () => pkixToJwk,
  pkixToRSAPublicKey: () => pkixToRSAPublicKey
});

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/sha256.js
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
  static {
    __name(this, "SHA256");
  }
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
var sha2562 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

// node_modules/@libp2p/webrtc/node_modules/asn1js/build/index.es.js
var pvtsutils = __toESM(require_build());

// node_modules/@libp2p/webrtc/node_modules/pvutils/build/utils.es.js
function utilFromBase(inputBuffer, inputBase) {
  let result = 0;
  if (inputBuffer.length === 1) {
    return inputBuffer[0];
  }
  for (let i = inputBuffer.length - 1; i >= 0; i--) {
    result += inputBuffer[inputBuffer.length - 1 - i] * Math.pow(2, inputBase * i);
  }
  return result;
}
__name(utilFromBase, "utilFromBase");
function utilToBase(value, base4, reserved = -1) {
  const internalReserved = reserved;
  let internalValue = value;
  let result = 0;
  let biggest = Math.pow(2, base4);
  for (let i = 1; i < 8; i++) {
    if (value < biggest) {
      let retBuf;
      if (internalReserved < 0) {
        retBuf = new ArrayBuffer(i);
        result = i;
      } else {
        if (internalReserved < i) {
          return new ArrayBuffer(0);
        }
        retBuf = new ArrayBuffer(internalReserved);
        result = internalReserved;
      }
      const retView = new Uint8Array(retBuf);
      for (let j = i - 1; j >= 0; j--) {
        const basis = Math.pow(2, j * base4);
        retView[result - j - 1] = Math.floor(internalValue / basis);
        internalValue -= retView[result - j - 1] * basis;
      }
      return retBuf;
    }
    biggest *= Math.pow(2, base4);
  }
  return new ArrayBuffer(0);
}
__name(utilToBase, "utilToBase");
function utilConcatView(...views) {
  let outputLength = 0;
  let prevLength = 0;
  for (const view of views) {
    outputLength += view.length;
  }
  const retBuf = new ArrayBuffer(outputLength);
  const retView = new Uint8Array(retBuf);
  for (const view of views) {
    retView.set(view, prevLength);
    prevLength += view.length;
  }
  return retView;
}
__name(utilConcatView, "utilConcatView");
function utilDecodeTC() {
  const buf = new Uint8Array(this.valueHex);
  if (this.valueHex.byteLength >= 2) {
    const condition1 = buf[0] === 255 && buf[1] & 128;
    const condition2 = buf[0] === 0 && (buf[1] & 128) === 0;
    if (condition1 || condition2) {
      this.warnings.push("Needlessly long format");
    }
  }
  const bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
  const bigIntView = new Uint8Array(bigIntBuffer);
  for (let i = 0; i < this.valueHex.byteLength; i++) {
    bigIntView[i] = 0;
  }
  bigIntView[0] = buf[0] & 128;
  const bigInt = utilFromBase(bigIntView, 8);
  const smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
  const smallIntView = new Uint8Array(smallIntBuffer);
  for (let j = 0; j < this.valueHex.byteLength; j++) {
    smallIntView[j] = buf[j];
  }
  smallIntView[0] &= 127;
  const smallInt = utilFromBase(smallIntView, 8);
  return smallInt - bigInt;
}
__name(utilDecodeTC, "utilDecodeTC");
function utilEncodeTC(value) {
  const modValue = value < 0 ? value * -1 : value;
  let bigInt = 128;
  for (let i = 1; i < 8; i++) {
    if (modValue <= bigInt) {
      if (value < 0) {
        const smallInt = bigInt - modValue;
        const retBuf2 = utilToBase(smallInt, 8, i);
        const retView2 = new Uint8Array(retBuf2);
        retView2[0] |= 128;
        return retBuf2;
      }
      let retBuf = utilToBase(modValue, 8, i);
      let retView = new Uint8Array(retBuf);
      if (retView[0] & 128) {
        const tempBuf = retBuf.slice(0);
        const tempView = new Uint8Array(tempBuf);
        retBuf = new ArrayBuffer(retBuf.byteLength + 1);
        retView = new Uint8Array(retBuf);
        for (let k = 0; k < tempBuf.byteLength; k++) {
          retView[k + 1] = tempView[k];
        }
        retView[0] = 0;
      }
      return retBuf;
    }
    bigInt *= Math.pow(2, 8);
  }
  return new ArrayBuffer(0);
}
__name(utilEncodeTC, "utilEncodeTC");
function isEqualBuffer(inputBuffer1, inputBuffer2) {
  if (inputBuffer1.byteLength !== inputBuffer2.byteLength) {
    return false;
  }
  const view1 = new Uint8Array(inputBuffer1);
  const view2 = new Uint8Array(inputBuffer2);
  for (let i = 0; i < view1.length; i++) {
    if (view1[i] !== view2[i]) {
      return false;
    }
  }
  return true;
}
__name(isEqualBuffer, "isEqualBuffer");
function padNumber(inputNumber, fullLength) {
  const str = inputNumber.toString(10);
  if (fullLength < str.length) {
    return "";
  }
  const dif = fullLength - str.length;
  const padding = new Array(dif);
  for (let i = 0; i < dif; i++) {
    padding[i] = "0";
  }
  const paddingString = padding.join("");
  return paddingString.concat(str);
}
__name(padNumber, "padNumber");
var log2 = Math.log(2);

// node_modules/@libp2p/webrtc/node_modules/asn1js/build/index.es.js
function assertBigInt() {
  if (typeof BigInt === "undefined") {
    throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
  }
}
__name(assertBigInt, "assertBigInt");
function concat(buffers) {
  let outputLength = 0;
  let prevLength = 0;
  for (let i = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    outputLength += buffer.byteLength;
  }
  const retView = new Uint8Array(outputLength);
  for (let i = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    retView.set(new Uint8Array(buffer), prevLength);
    prevLength += buffer.byteLength;
  }
  return retView.buffer;
}
__name(concat, "concat");
function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
  if (!(inputBuffer instanceof Uint8Array)) {
    baseBlock.error = "Wrong parameter: inputBuffer must be 'Uint8Array'";
    return false;
  }
  if (!inputBuffer.byteLength) {
    baseBlock.error = "Wrong parameter: inputBuffer has zero length";
    return false;
  }
  if (inputOffset < 0) {
    baseBlock.error = "Wrong parameter: inputOffset less than zero";
    return false;
  }
  if (inputLength < 0) {
    baseBlock.error = "Wrong parameter: inputLength less than zero";
    return false;
  }
  if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
    baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
    return false;
  }
  return true;
}
__name(checkBufferParams, "checkBufferParams");
var ViewWriter = class {
  static {
    __name(this, "ViewWriter");
  }
  constructor() {
    this.items = [];
  }
  write(buf) {
    this.items.push(buf);
  }
  final() {
    return concat(this.items);
  }
};
var powers2 = [new Uint8Array([1])];
var digitsString = "0123456789";
var EMPTY_STRING = "";
var EMPTY_BUFFER = new ArrayBuffer(0);
var EMPTY_VIEW = new Uint8Array(0);
var END_OF_CONTENT_NAME = "EndOfContent";
var OCTET_STRING_NAME = "OCTET STRING";
var BIT_STRING_NAME = "BIT STRING";
function HexBlock(BaseClass) {
  var _a2;
  return _a2 = class Some extends BaseClass {
    static {
      __name(this, "Some");
    }
    constructor(...args) {
      var _a3;
      super(...args);
      const params = args[0] || {};
      this.isHexOnly = (_a3 = params.isHexOnly) !== null && _a3 !== void 0 ? _a3 : false;
      this.valueHexView = params.valueHex ? pvtsutils.BufferSourceConverter.toUint8Array(params.valueHex) : EMPTY_VIEW;
    }
    get valueHex() {
      return this.valueHexView.slice().buffer;
    }
    set valueHex(value) {
      this.valueHexView = new Uint8Array(value);
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
      const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
      if (!checkBufferParams(this, view, inputOffset, inputLength)) {
        return -1;
      }
      const endLength = inputOffset + inputLength;
      this.valueHexView = view.subarray(inputOffset, endLength);
      if (!this.valueHexView.length) {
        this.warnings.push("Zero buffer length");
        return inputOffset;
      }
      this.blockLength = inputLength;
      return endLength;
    }
    toBER(sizeOnly = false) {
      if (!this.isHexOnly) {
        this.error = "Flag 'isHexOnly' is not set, abort";
        return EMPTY_BUFFER;
      }
      if (sizeOnly) {
        return new ArrayBuffer(this.valueHexView.byteLength);
      }
      return this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer;
    }
    toJSON() {
      return {
        ...super.toJSON(),
        isHexOnly: this.isHexOnly,
        valueHex: pvtsutils.Convert.ToHex(this.valueHexView)
      };
    }
  }, _a2.NAME = "hexBlock", _a2;
}
__name(HexBlock, "HexBlock");
var LocalBaseBlock = class {
  static {
    __name(this, "LocalBaseBlock");
  }
  constructor({ blockLength = 0, error = EMPTY_STRING, warnings = [], valueBeforeDecode = EMPTY_VIEW } = {}) {
    this.blockLength = blockLength;
    this.error = error;
    this.warnings = warnings;
    this.valueBeforeDecodeView = pvtsutils.BufferSourceConverter.toUint8Array(valueBeforeDecode);
  }
  static blockName() {
    return this.NAME;
  }
  get valueBeforeDecode() {
    return this.valueBeforeDecodeView.slice().buffer;
  }
  set valueBeforeDecode(value) {
    this.valueBeforeDecodeView = new Uint8Array(value);
  }
  toJSON() {
    return {
      blockName: this.constructor.NAME,
      blockLength: this.blockLength,
      error: this.error,
      warnings: this.warnings,
      valueBeforeDecode: pvtsutils.Convert.ToHex(this.valueBeforeDecodeView)
    };
  }
};
LocalBaseBlock.NAME = "baseBlock";
var ValueBlock = class extends LocalBaseBlock {
  static {
    __name(this, "ValueBlock");
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
  toBER(sizeOnly, writer) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
};
ValueBlock.NAME = "valueBlock";
var LocalIdentificationBlock = class extends HexBlock(LocalBaseBlock) {
  static {
    __name(this, "LocalIdentificationBlock");
  }
  constructor({ idBlock = {} } = {}) {
    var _a2, _b, _c, _d;
    super();
    if (idBlock) {
      this.isHexOnly = (_a2 = idBlock.isHexOnly) !== null && _a2 !== void 0 ? _a2 : false;
      this.valueHexView = idBlock.valueHex ? pvtsutils.BufferSourceConverter.toUint8Array(idBlock.valueHex) : EMPTY_VIEW;
      this.tagClass = (_b = idBlock.tagClass) !== null && _b !== void 0 ? _b : -1;
      this.tagNumber = (_c = idBlock.tagNumber) !== null && _c !== void 0 ? _c : -1;
      this.isConstructed = (_d = idBlock.isConstructed) !== null && _d !== void 0 ? _d : false;
    } else {
      this.tagClass = -1;
      this.tagNumber = -1;
      this.isConstructed = false;
    }
  }
  toBER(sizeOnly = false) {
    let firstOctet = 0;
    switch (this.tagClass) {
      case 1:
        firstOctet |= 0;
        break;
      case 2:
        firstOctet |= 64;
        break;
      case 3:
        firstOctet |= 128;
        break;
      case 4:
        firstOctet |= 192;
        break;
      default:
        this.error = "Unknown tag class";
        return EMPTY_BUFFER;
    }
    if (this.isConstructed)
      firstOctet |= 32;
    if (this.tagNumber < 31 && !this.isHexOnly) {
      const retView2 = new Uint8Array(1);
      if (!sizeOnly) {
        let number4 = this.tagNumber;
        number4 &= 31;
        firstOctet |= number4;
        retView2[0] = firstOctet;
      }
      return retView2.buffer;
    }
    if (!this.isHexOnly) {
      const encodedBuf = utilToBase(this.tagNumber, 7);
      const encodedView = new Uint8Array(encodedBuf);
      const size = encodedBuf.byteLength;
      const retView2 = new Uint8Array(size + 1);
      retView2[0] = firstOctet | 31;
      if (!sizeOnly) {
        for (let i = 0; i < size - 1; i++)
          retView2[i + 1] = encodedView[i] | 128;
        retView2[size] = encodedView[size - 1];
      }
      return retView2.buffer;
    }
    const retView = new Uint8Array(this.valueHexView.byteLength + 1);
    retView[0] = firstOctet | 31;
    if (!sizeOnly) {
      const curView = this.valueHexView;
      for (let i = 0; i < curView.length - 1; i++)
        retView[i + 1] = curView[i] | 128;
      retView[this.valueHexView.byteLength] = curView[curView.length - 1];
    }
    return retView.buffer;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    if (intBuffer.length === 0) {
      this.error = "Zero buffer length";
      return -1;
    }
    const tagClassMask = intBuffer[0] & 192;
    switch (tagClassMask) {
      case 0:
        this.tagClass = 1;
        break;
      case 64:
        this.tagClass = 2;
        break;
      case 128:
        this.tagClass = 3;
        break;
      case 192:
        this.tagClass = 4;
        break;
      default:
        this.error = "Unknown tag class";
        return -1;
    }
    this.isConstructed = (intBuffer[0] & 32) === 32;
    this.isHexOnly = false;
    const tagNumberMask = intBuffer[0] & 31;
    if (tagNumberMask !== 31) {
      this.tagNumber = tagNumberMask;
      this.blockLength = 1;
    } else {
      let count = 1;
      let intTagNumberBuffer = this.valueHexView = new Uint8Array(255);
      let tagNumberBufferMaxLength = 255;
      while (intBuffer[count] & 128) {
        intTagNumberBuffer[count - 1] = intBuffer[count] & 127;
        count++;
        if (count >= intBuffer.length) {
          this.error = "End of input reached before message was fully decoded";
          return -1;
        }
        if (count === tagNumberBufferMaxLength) {
          tagNumberBufferMaxLength += 255;
          const tempBufferView2 = new Uint8Array(tagNumberBufferMaxLength);
          for (let i = 0; i < intTagNumberBuffer.length; i++)
            tempBufferView2[i] = intTagNumberBuffer[i];
          intTagNumberBuffer = this.valueHexView = new Uint8Array(tagNumberBufferMaxLength);
        }
      }
      this.blockLength = count + 1;
      intTagNumberBuffer[count - 1] = intBuffer[count] & 127;
      const tempBufferView = new Uint8Array(count);
      for (let i = 0; i < count; i++)
        tempBufferView[i] = intTagNumberBuffer[i];
      intTagNumberBuffer = this.valueHexView = new Uint8Array(count);
      intTagNumberBuffer.set(tempBufferView);
      if (this.blockLength <= 9)
        this.tagNumber = utilFromBase(intTagNumberBuffer, 7);
      else {
        this.isHexOnly = true;
        this.warnings.push("Tag too long, represented as hex-coded");
      }
    }
    if (this.tagClass === 1 && this.isConstructed) {
      switch (this.tagNumber) {
        case 1:
        case 2:
        case 5:
        case 6:
        case 9:
        case 13:
        case 14:
        case 23:
        case 24:
        case 31:
        case 32:
        case 33:
        case 34:
          this.error = "Constructed encoding used for primitive type";
          return -1;
      }
    }
    return inputOffset + this.blockLength;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      tagClass: this.tagClass,
      tagNumber: this.tagNumber,
      isConstructed: this.isConstructed
    };
  }
};
LocalIdentificationBlock.NAME = "identificationBlock";
var LocalLengthBlock = class extends LocalBaseBlock {
  static {
    __name(this, "LocalLengthBlock");
  }
  constructor({ lenBlock = {} } = {}) {
    var _a2, _b, _c;
    super();
    this.isIndefiniteForm = (_a2 = lenBlock.isIndefiniteForm) !== null && _a2 !== void 0 ? _a2 : false;
    this.longFormUsed = (_b = lenBlock.longFormUsed) !== null && _b !== void 0 ? _b : false;
    this.length = (_c = lenBlock.length) !== null && _c !== void 0 ? _c : 0;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const view = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, view, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = view.subarray(inputOffset, inputOffset + inputLength);
    if (intBuffer.length === 0) {
      this.error = "Zero buffer length";
      return -1;
    }
    if (intBuffer[0] === 255) {
      this.error = "Length block 0xFF is reserved by standard";
      return -1;
    }
    this.isIndefiniteForm = intBuffer[0] === 128;
    if (this.isIndefiniteForm) {
      this.blockLength = 1;
      return inputOffset + this.blockLength;
    }
    this.longFormUsed = !!(intBuffer[0] & 128);
    if (this.longFormUsed === false) {
      this.length = intBuffer[0];
      this.blockLength = 1;
      return inputOffset + this.blockLength;
    }
    const count = intBuffer[0] & 127;
    if (count > 8) {
      this.error = "Too big integer";
      return -1;
    }
    if (count + 1 > intBuffer.length) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    const lenOffset = inputOffset + 1;
    const lengthBufferView = view.subarray(lenOffset, lenOffset + count);
    if (lengthBufferView[count - 1] === 0)
      this.warnings.push("Needlessly long encoded length");
    this.length = utilFromBase(lengthBufferView, 8);
    if (this.longFormUsed && this.length <= 127)
      this.warnings.push("Unnecessary usage of long length form");
    this.blockLength = count + 1;
    return inputOffset + this.blockLength;
  }
  toBER(sizeOnly = false) {
    let retBuf;
    let retView;
    if (this.length > 127)
      this.longFormUsed = true;
    if (this.isIndefiniteForm) {
      retBuf = new ArrayBuffer(1);
      if (sizeOnly === false) {
        retView = new Uint8Array(retBuf);
        retView[0] = 128;
      }
      return retBuf;
    }
    if (this.longFormUsed) {
      const encodedBuf = utilToBase(this.length, 8);
      if (encodedBuf.byteLength > 127) {
        this.error = "Too big length";
        return EMPTY_BUFFER;
      }
      retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);
      if (sizeOnly)
        return retBuf;
      const encodedView = new Uint8Array(encodedBuf);
      retView = new Uint8Array(retBuf);
      retView[0] = encodedBuf.byteLength | 128;
      for (let i = 0; i < encodedBuf.byteLength; i++)
        retView[i + 1] = encodedView[i];
      return retBuf;
    }
    retBuf = new ArrayBuffer(1);
    if (sizeOnly === false) {
      retView = new Uint8Array(retBuf);
      retView[0] = this.length;
    }
    return retBuf;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      longFormUsed: this.longFormUsed,
      length: this.length
    };
  }
};
LocalLengthBlock.NAME = "lengthBlock";
var typeStore = {};
var BaseBlock = class extends LocalBaseBlock {
  static {
    __name(this, "BaseBlock");
  }
  constructor({ name: name2 = EMPTY_STRING, optional: optional2 = false, primitiveSchema, ...parameters } = {}, valueBlockType) {
    super(parameters);
    this.name = name2;
    this.optional = optional2;
    if (primitiveSchema) {
      this.primitiveSchema = primitiveSchema;
    }
    this.idBlock = new LocalIdentificationBlock(parameters);
    this.lenBlock = new LocalLengthBlock(parameters);
    this.valueBlock = valueBlockType ? new valueBlockType(parameters) : new ValueBlock(parameters);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    const _writer = writer || new ViewWriter();
    if (!writer) {
      prepareIndefiniteForm(this);
    }
    const idBlockBuf = this.idBlock.toBER(sizeOnly);
    _writer.write(idBlockBuf);
    if (this.lenBlock.isIndefiniteForm) {
      _writer.write(new Uint8Array([128]).buffer);
      this.valueBlock.toBER(sizeOnly, _writer);
      _writer.write(new ArrayBuffer(2));
    } else {
      const valueBlockBuf = this.valueBlock.toBER(sizeOnly);
      this.lenBlock.length = valueBlockBuf.byteLength;
      const lenBlockBuf = this.lenBlock.toBER(sizeOnly);
      _writer.write(lenBlockBuf);
      _writer.write(valueBlockBuf);
    }
    if (!writer) {
      return _writer.final();
    }
    return EMPTY_BUFFER;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      idBlock: this.idBlock.toJSON(),
      lenBlock: this.lenBlock.toJSON(),
      valueBlock: this.valueBlock.toJSON(),
      name: this.name,
      optional: this.optional
    };
    if (this.primitiveSchema)
      object.primitiveSchema = this.primitiveSchema.toJSON();
    return object;
  }
  toString(encoding = "ascii") {
    if (encoding === "ascii") {
      return this.onAsciiEncoding();
    }
    return pvtsutils.Convert.ToHex(this.toBER());
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${pvtsutils.Convert.ToHex(this.valueBlock.valueBeforeDecodeView)}`;
  }
  isEqual(other) {
    if (this === other) {
      return true;
    }
    if (!(other instanceof this.constructor)) {
      return false;
    }
    const thisRaw = this.toBER();
    const otherRaw = other.toBER();
    return isEqualBuffer(thisRaw, otherRaw);
  }
};
BaseBlock.NAME = "BaseBlock";
function prepareIndefiniteForm(baseBlock) {
  if (baseBlock instanceof typeStore.Constructed) {
    for (const value of baseBlock.valueBlock.value) {
      if (prepareIndefiniteForm(value)) {
        baseBlock.lenBlock.isIndefiniteForm = true;
      }
    }
  }
  return !!baseBlock.lenBlock.isIndefiniteForm;
}
__name(prepareIndefiniteForm, "prepareIndefiniteForm");
var BaseStringBlock = class extends BaseBlock {
  static {
    __name(this, "BaseStringBlock");
  }
  constructor({ value = EMPTY_STRING, ...parameters } = {}, stringValueBlockType) {
    super(parameters, stringValueBlockType);
    if (value) {
      this.fromString(value);
    }
  }
  getValue() {
    return this.valueBlock.value;
  }
  setValue(value) {
    this.valueBlock.value = value;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    this.fromBuffer(this.valueBlock.valueHexView);
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
  }
};
BaseStringBlock.NAME = "BaseStringBlock";
var LocalPrimitiveValueBlock = class extends HexBlock(ValueBlock) {
  static {
    __name(this, "LocalPrimitiveValueBlock");
  }
  constructor({ isHexOnly = true, ...parameters } = {}) {
    super(parameters);
    this.isHexOnly = isHexOnly;
  }
};
LocalPrimitiveValueBlock.NAME = "PrimitiveValueBlock";
var _a$w;
var Primitive = class extends BaseBlock {
  static {
    __name(this, "Primitive");
  }
  constructor(parameters = {}) {
    super(parameters, LocalPrimitiveValueBlock);
    this.idBlock.isConstructed = false;
  }
};
_a$w = Primitive;
(() => {
  typeStore.Primitive = _a$w;
})();
Primitive.NAME = "PRIMITIVE";
function localChangeType(inputObject, newType) {
  if (inputObject instanceof newType) {
    return inputObject;
  }
  const newObject = new newType();
  newObject.idBlock = inputObject.idBlock;
  newObject.lenBlock = inputObject.lenBlock;
  newObject.warnings = inputObject.warnings;
  newObject.valueBeforeDecodeView = inputObject.valueBeforeDecodeView;
  return newObject;
}
__name(localChangeType, "localChangeType");
function localFromBER(inputBuffer, inputOffset = 0, inputLength = inputBuffer.length) {
  const incomingOffset = inputOffset;
  let returnObject = new BaseBlock({}, ValueBlock);
  const baseBlock = new LocalBaseBlock();
  if (!checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength)) {
    returnObject.error = baseBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  const intBuffer = inputBuffer.subarray(inputOffset, inputOffset + inputLength);
  if (!intBuffer.length) {
    returnObject.error = "Zero buffer length";
    return {
      offset: -1,
      result: returnObject
    };
  }
  let resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
  if (returnObject.idBlock.warnings.length) {
    returnObject.warnings.concat(returnObject.idBlock.warnings);
  }
  if (resultOffset === -1) {
    returnObject.error = returnObject.idBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  inputOffset = resultOffset;
  inputLength -= returnObject.idBlock.blockLength;
  resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
  if (returnObject.lenBlock.warnings.length) {
    returnObject.warnings.concat(returnObject.lenBlock.warnings);
  }
  if (resultOffset === -1) {
    returnObject.error = returnObject.lenBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  inputOffset = resultOffset;
  inputLength -= returnObject.lenBlock.blockLength;
  if (!returnObject.idBlock.isConstructed && returnObject.lenBlock.isIndefiniteForm) {
    returnObject.error = "Indefinite length form used for primitive encoding form";
    return {
      offset: -1,
      result: returnObject
    };
  }
  let newASN1Type = BaseBlock;
  switch (returnObject.idBlock.tagClass) {
    case 1:
      if (returnObject.idBlock.tagNumber >= 37 && returnObject.idBlock.isHexOnly === false) {
        returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
        return {
          offset: -1,
          result: returnObject
        };
      }
      switch (returnObject.idBlock.tagNumber) {
        case 0:
          if (returnObject.idBlock.isConstructed && returnObject.lenBlock.length > 0) {
            returnObject.error = "Type [UNIVERSAL 0] is reserved";
            return {
              offset: -1,
              result: returnObject
            };
          }
          newASN1Type = typeStore.EndOfContent;
          break;
        case 1:
          newASN1Type = typeStore.Boolean;
          break;
        case 2:
          newASN1Type = typeStore.Integer;
          break;
        case 3:
          newASN1Type = typeStore.BitString;
          break;
        case 4:
          newASN1Type = typeStore.OctetString;
          break;
        case 5:
          newASN1Type = typeStore.Null;
          break;
        case 6:
          newASN1Type = typeStore.ObjectIdentifier;
          break;
        case 10:
          newASN1Type = typeStore.Enumerated;
          break;
        case 12:
          newASN1Type = typeStore.Utf8String;
          break;
        case 13:
          newASN1Type = typeStore.RelativeObjectIdentifier;
          break;
        case 14:
          newASN1Type = typeStore.TIME;
          break;
        case 15:
          returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
          return {
            offset: -1,
            result: returnObject
          };
        case 16:
          newASN1Type = typeStore.Sequence;
          break;
        case 17:
          newASN1Type = typeStore.Set;
          break;
        case 18:
          newASN1Type = typeStore.NumericString;
          break;
        case 19:
          newASN1Type = typeStore.PrintableString;
          break;
        case 20:
          newASN1Type = typeStore.TeletexString;
          break;
        case 21:
          newASN1Type = typeStore.VideotexString;
          break;
        case 22:
          newASN1Type = typeStore.IA5String;
          break;
        case 23:
          newASN1Type = typeStore.UTCTime;
          break;
        case 24:
          newASN1Type = typeStore.GeneralizedTime;
          break;
        case 25:
          newASN1Type = typeStore.GraphicString;
          break;
        case 26:
          newASN1Type = typeStore.VisibleString;
          break;
        case 27:
          newASN1Type = typeStore.GeneralString;
          break;
        case 28:
          newASN1Type = typeStore.UniversalString;
          break;
        case 29:
          newASN1Type = typeStore.CharacterString;
          break;
        case 30:
          newASN1Type = typeStore.BmpString;
          break;
        case 31:
          newASN1Type = typeStore.DATE;
          break;
        case 32:
          newASN1Type = typeStore.TimeOfDay;
          break;
        case 33:
          newASN1Type = typeStore.DateTime;
          break;
        case 34:
          newASN1Type = typeStore.Duration;
          break;
        default: {
          const newObject = returnObject.idBlock.isConstructed ? new typeStore.Constructed() : new typeStore.Primitive();
          newObject.idBlock = returnObject.idBlock;
          newObject.lenBlock = returnObject.lenBlock;
          newObject.warnings = returnObject.warnings;
          returnObject = newObject;
        }
      }
      break;
    case 2:
    case 3:
    case 4:
    default: {
      newASN1Type = returnObject.idBlock.isConstructed ? typeStore.Constructed : typeStore.Primitive;
    }
  }
  returnObject = localChangeType(returnObject, newASN1Type);
  resultOffset = returnObject.fromBER(inputBuffer, inputOffset, returnObject.lenBlock.isIndefiniteForm ? inputLength : returnObject.lenBlock.length);
  returnObject.valueBeforeDecodeView = inputBuffer.subarray(incomingOffset, incomingOffset + returnObject.blockLength);
  return {
    offset: resultOffset,
    result: returnObject
  };
}
__name(localFromBER, "localFromBER");
function fromBER(inputBuffer) {
  if (!inputBuffer.byteLength) {
    const result = new BaseBlock({}, ValueBlock);
    result.error = "Input buffer has zero length";
    return {
      offset: -1,
      result
    };
  }
  return localFromBER(pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer).slice(), 0, inputBuffer.byteLength);
}
__name(fromBER, "fromBER");
function checkLen(indefiniteLength, length3) {
  if (indefiniteLength) {
    return 1;
  }
  return length3;
}
__name(checkLen, "checkLen");
var LocalConstructedValueBlock = class extends ValueBlock {
  static {
    __name(this, "LocalConstructedValueBlock");
  }
  constructor({ value = [], isIndefiniteForm = false, ...parameters } = {}) {
    super(parameters);
    this.value = value;
    this.isIndefiniteForm = isIndefiniteForm;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const view = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, view, inputOffset, inputLength)) {
      return -1;
    }
    this.valueBeforeDecodeView = view.subarray(inputOffset, inputOffset + inputLength);
    if (this.valueBeforeDecodeView.length === 0) {
      this.warnings.push("Zero buffer length");
      return inputOffset;
    }
    let currentOffset = inputOffset;
    while (checkLen(this.isIndefiniteForm, inputLength) > 0) {
      const returnObject = localFromBER(view, currentOffset, inputLength);
      if (returnObject.offset === -1) {
        this.error = returnObject.result.error;
        this.warnings.concat(returnObject.result.warnings);
        return -1;
      }
      currentOffset = returnObject.offset;
      this.blockLength += returnObject.result.blockLength;
      inputLength -= returnObject.result.blockLength;
      this.value.push(returnObject.result);
      if (this.isIndefiniteForm && returnObject.result.constructor.NAME === END_OF_CONTENT_NAME) {
        break;
      }
    }
    if (this.isIndefiniteForm) {
      if (this.value[this.value.length - 1].constructor.NAME === END_OF_CONTENT_NAME) {
        this.value.pop();
      } else {
        this.warnings.push("No EndOfContent block encoded");
      }
    }
    return currentOffset;
  }
  toBER(sizeOnly, writer) {
    const _writer = writer || new ViewWriter();
    for (let i = 0; i < this.value.length; i++) {
      this.value[i].toBER(sizeOnly, _writer);
    }
    if (!writer) {
      return _writer.final();
    }
    return EMPTY_BUFFER;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      value: []
    };
    for (const value of this.value) {
      object.value.push(value.toJSON());
    }
    return object;
  }
};
LocalConstructedValueBlock.NAME = "ConstructedValueBlock";
var _a$v;
var Constructed = class extends BaseBlock {
  static {
    __name(this, "Constructed");
  }
  constructor(parameters = {}) {
    super(parameters, LocalConstructedValueBlock);
    this.idBlock.isConstructed = true;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  onAsciiEncoding() {
    const values = [];
    for (const value of this.valueBlock.value) {
      values.push(value.toString("ascii").split("\n").map((o) => `  ${o}`).join("\n"));
    }
    const blockName = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
    return values.length ? `${blockName} :
${values.join("\n")}` : `${blockName} :`;
  }
};
_a$v = Constructed;
(() => {
  typeStore.Constructed = _a$v;
})();
Constructed.NAME = "CONSTRUCTED";
var LocalEndOfContentValueBlock = class extends ValueBlock {
  static {
    __name(this, "LocalEndOfContentValueBlock");
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    return inputOffset;
  }
  toBER(sizeOnly) {
    return EMPTY_BUFFER;
  }
};
LocalEndOfContentValueBlock.override = "EndOfContentValueBlock";
var _a$u;
var EndOfContent = class extends BaseBlock {
  static {
    __name(this, "EndOfContent");
  }
  constructor(parameters = {}) {
    super(parameters, LocalEndOfContentValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 0;
  }
};
_a$u = EndOfContent;
(() => {
  typeStore.EndOfContent = _a$u;
})();
EndOfContent.NAME = END_OF_CONTENT_NAME;
var _a$t;
var Null = class extends BaseBlock {
  static {
    __name(this, "Null");
  }
  constructor(parameters = {}) {
    super(parameters, ValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 5;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (this.lenBlock.length > 0)
      this.warnings.push("Non-zero length of value block for Null type");
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    this.blockLength += inputLength;
    if (inputOffset + inputLength > inputBuffer.byteLength) {
      this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
      return -1;
    }
    return inputOffset + inputLength;
  }
  toBER(sizeOnly, writer) {
    const retBuf = new ArrayBuffer(2);
    if (!sizeOnly) {
      const retView = new Uint8Array(retBuf);
      retView[0] = 5;
      retView[1] = 0;
    }
    if (writer) {
      writer.write(retBuf);
    }
    return retBuf;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME}`;
  }
};
_a$t = Null;
(() => {
  typeStore.Null = _a$t;
})();
Null.NAME = "NULL";
var LocalBooleanValueBlock = class extends HexBlock(ValueBlock) {
  static {
    __name(this, "LocalBooleanValueBlock");
  }
  constructor({ value, ...parameters } = {}) {
    super(parameters);
    if (parameters.valueHex) {
      this.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(parameters.valueHex);
    } else {
      this.valueHexView = new Uint8Array(1);
    }
    if (value) {
      this.value = value;
    }
  }
  get value() {
    for (const octet of this.valueHexView) {
      if (octet > 0) {
        return true;
      }
    }
    return false;
  }
  set value(value) {
    this.valueHexView[0] = value ? 255 : 0;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    this.valueHexView = inputView.subarray(inputOffset, inputOffset + inputLength);
    if (inputLength > 1)
      this.warnings.push("Boolean value encoded in more then 1 octet");
    this.isHexOnly = true;
    utilDecodeTC.call(this);
    this.blockLength = inputLength;
    return inputOffset + inputLength;
  }
  toBER() {
    return this.valueHexView.slice();
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
};
LocalBooleanValueBlock.NAME = "BooleanValueBlock";
var _a$s;
var Boolean2 = class extends BaseBlock {
  static {
    __name(this, "Boolean");
  }
  constructor(parameters = {}) {
    super(parameters, LocalBooleanValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 1;
  }
  getValue() {
    return this.valueBlock.value;
  }
  setValue(value) {
    this.valueBlock.value = value;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.getValue}`;
  }
};
_a$s = Boolean2;
(() => {
  typeStore.Boolean = _a$s;
})();
Boolean2.NAME = "BOOLEAN";
var LocalOctetStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
  static {
    __name(this, "LocalOctetStringValueBlock");
  }
  constructor({ isConstructed = false, ...parameters } = {}) {
    super(parameters);
    this.isConstructed = isConstructed;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = 0;
    if (this.isConstructed) {
      this.isHexOnly = false;
      resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
      if (resultOffset === -1)
        return resultOffset;
      for (let i = 0; i < this.value.length; i++) {
        const currentBlockName = this.value[i].constructor.NAME;
        if (currentBlockName === END_OF_CONTENT_NAME) {
          if (this.isIndefiniteForm)
            break;
          else {
            this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
            return -1;
          }
        }
        if (currentBlockName !== OCTET_STRING_NAME) {
          this.error = "OCTET STRING may consists of OCTET STRINGs only";
          return -1;
        }
      }
    } else {
      this.isHexOnly = true;
      resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
      this.blockLength = inputLength;
    }
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    if (this.isConstructed)
      return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
    return sizeOnly ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isConstructed: this.isConstructed
    };
  }
};
LocalOctetStringValueBlock.NAME = "OctetStringValueBlock";
var _a$r;
var OctetString = class _OctetString extends BaseBlock {
  static {
    __name(this, "OctetString");
  }
  constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
    var _b, _c;
    (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
    super({
      idBlock: {
        isConstructed: parameters.isConstructed,
        ...idBlock
      },
      lenBlock: {
        ...lenBlock,
        isIndefiniteForm: !!parameters.isIndefiniteForm
      },
      ...parameters
    }, LocalOctetStringValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 4;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isConstructed = this.idBlock.isConstructed;
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    if (inputLength === 0) {
      if (this.idBlock.error.length === 0)
        this.blockLength += this.idBlock.blockLength;
      if (this.lenBlock.error.length === 0)
        this.blockLength += this.lenBlock.blockLength;
      return inputOffset;
    }
    if (!this.valueBlock.isConstructed) {
      const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
      const buf = view.subarray(inputOffset, inputOffset + inputLength);
      try {
        if (buf.byteLength) {
          const asn = localFromBER(buf, 0, buf.byteLength);
          if (asn.offset !== -1 && asn.offset === inputLength) {
            this.valueBlock.value = [asn.result];
          }
        }
      } catch (e) {
      }
    }
    return super.fromBER(inputBuffer, inputOffset, inputLength);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
      return Constructed.prototype.onAsciiEncoding.call(this);
    }
    return `${this.constructor.NAME} : ${pvtsutils.Convert.ToHex(this.valueBlock.valueHexView)}`;
  }
  getValue() {
    if (!this.idBlock.isConstructed) {
      return this.valueBlock.valueHexView.slice().buffer;
    }
    const array = [];
    for (const content of this.valueBlock.value) {
      if (content instanceof _OctetString) {
        array.push(content.valueBlock.valueHexView);
      }
    }
    return pvtsutils.BufferSourceConverter.concat(array);
  }
};
_a$r = OctetString;
(() => {
  typeStore.OctetString = _a$r;
})();
OctetString.NAME = OCTET_STRING_NAME;
var LocalBitStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
  static {
    __name(this, "LocalBitStringValueBlock");
  }
  constructor({ unusedBits = 0, isConstructed = false, ...parameters } = {}) {
    super(parameters);
    this.unusedBits = unusedBits;
    this.isConstructed = isConstructed;
    this.blockLength = this.valueHexView.byteLength;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (!inputLength) {
      return inputOffset;
    }
    let resultOffset = -1;
    if (this.isConstructed) {
      resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
      if (resultOffset === -1)
        return resultOffset;
      for (const value of this.value) {
        const currentBlockName = value.constructor.NAME;
        if (currentBlockName === END_OF_CONTENT_NAME) {
          if (this.isIndefiniteForm)
            break;
          else {
            this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
            return -1;
          }
        }
        if (currentBlockName !== BIT_STRING_NAME) {
          this.error = "BIT STRING may consists of BIT STRINGs only";
          return -1;
        }
        const valueBlock = value.valueBlock;
        if (this.unusedBits > 0 && valueBlock.unusedBits > 0) {
          this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only';
          return -1;
        }
        this.unusedBits = valueBlock.unusedBits;
      }
      return resultOffset;
    }
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.unusedBits = intBuffer[0];
    if (this.unusedBits > 7) {
      this.error = "Unused bits for BitString must be in range 0-7";
      return -1;
    }
    if (!this.unusedBits) {
      const buf = intBuffer.subarray(1);
      try {
        if (buf.byteLength) {
          const asn = localFromBER(buf, 0, buf.byteLength);
          if (asn.offset !== -1 && asn.offset === inputLength - 1) {
            this.value = [asn.result];
          }
        }
      } catch (e) {
      }
    }
    this.valueHexView = intBuffer.subarray(1);
    this.blockLength = intBuffer.length;
    return inputOffset + inputLength;
  }
  toBER(sizeOnly, writer) {
    if (this.isConstructed) {
      return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
    }
    if (sizeOnly) {
      return new ArrayBuffer(this.valueHexView.byteLength + 1);
    }
    if (!this.valueHexView.byteLength) {
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(this.valueHexView.length + 1);
    retView[0] = this.unusedBits;
    retView.set(this.valueHexView, 1);
    return retView.buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      unusedBits: this.unusedBits,
      isConstructed: this.isConstructed
    };
  }
};
LocalBitStringValueBlock.NAME = "BitStringValueBlock";
var _a$q;
var BitString = class extends BaseBlock {
  static {
    __name(this, "BitString");
  }
  constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
    var _b, _c;
    (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
    super({
      idBlock: {
        isConstructed: parameters.isConstructed,
        ...idBlock
      },
      lenBlock: {
        ...lenBlock,
        isIndefiniteForm: !!parameters.isIndefiniteForm
      },
      ...parameters
    }, LocalBitStringValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 3;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isConstructed = this.idBlock.isConstructed;
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    return super.fromBER(inputBuffer, inputOffset, inputLength);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
      return Constructed.prototype.onAsciiEncoding.call(this);
    } else {
      const bits = [];
      const valueHex = this.valueBlock.valueHexView;
      for (const byte of valueHex) {
        bits.push(byte.toString(2).padStart(8, "0"));
      }
      const bitsStr = bits.join("");
      return `${this.constructor.NAME} : ${bitsStr.substring(0, bitsStr.length - this.valueBlock.unusedBits)}`;
    }
  }
};
_a$q = BitString;
(() => {
  typeStore.BitString = _a$q;
})();
BitString.NAME = BIT_STRING_NAME;
var _a$p;
function viewAdd(first, second) {
  const c = new Uint8Array([0]);
  const firstView = new Uint8Array(first);
  const secondView = new Uint8Array(second);
  let firstViewCopy = firstView.slice(0);
  const firstViewCopyLength = firstViewCopy.length - 1;
  const secondViewCopy = secondView.slice(0);
  const secondViewCopyLength = secondViewCopy.length - 1;
  let value = 0;
  const max = secondViewCopyLength < firstViewCopyLength ? firstViewCopyLength : secondViewCopyLength;
  let counter = 0;
  for (let i = max; i >= 0; i--, counter++) {
    switch (true) {
      case counter < secondViewCopy.length:
        value = firstViewCopy[firstViewCopyLength - counter] + secondViewCopy[secondViewCopyLength - counter] + c[0];
        break;
      default:
        value = firstViewCopy[firstViewCopyLength - counter] + c[0];
    }
    c[0] = value / 10;
    switch (true) {
      case counter >= firstViewCopy.length:
        firstViewCopy = utilConcatView(new Uint8Array([value % 10]), firstViewCopy);
        break;
      default:
        firstViewCopy[firstViewCopyLength - counter] = value % 10;
    }
  }
  if (c[0] > 0)
    firstViewCopy = utilConcatView(c, firstViewCopy);
  return firstViewCopy;
}
__name(viewAdd, "viewAdd");
function power2(n) {
  if (n >= powers2.length) {
    for (let p = powers2.length; p <= n; p++) {
      const c = new Uint8Array([0]);
      let digits = powers2[p - 1].slice(0);
      for (let i = digits.length - 1; i >= 0; i--) {
        const newValue = new Uint8Array([(digits[i] << 1) + c[0]]);
        c[0] = newValue[0] / 10;
        digits[i] = newValue[0] % 10;
      }
      if (c[0] > 0)
        digits = utilConcatView(c, digits);
      powers2.push(digits);
    }
  }
  return powers2[n];
}
__name(power2, "power2");
function viewSub(first, second) {
  let b = 0;
  const firstView = new Uint8Array(first);
  const secondView = new Uint8Array(second);
  const firstViewCopy = firstView.slice(0);
  const firstViewCopyLength = firstViewCopy.length - 1;
  const secondViewCopy = secondView.slice(0);
  const secondViewCopyLength = secondViewCopy.length - 1;
  let value;
  let counter = 0;
  for (let i = secondViewCopyLength; i >= 0; i--, counter++) {
    value = firstViewCopy[firstViewCopyLength - counter] - secondViewCopy[secondViewCopyLength - counter] - b;
    switch (true) {
      case value < 0:
        b = 1;
        firstViewCopy[firstViewCopyLength - counter] = value + 10;
        break;
      default:
        b = 0;
        firstViewCopy[firstViewCopyLength - counter] = value;
    }
  }
  if (b > 0) {
    for (let i = firstViewCopyLength - secondViewCopyLength + 1; i >= 0; i--, counter++) {
      value = firstViewCopy[firstViewCopyLength - counter] - b;
      if (value < 0) {
        b = 1;
        firstViewCopy[firstViewCopyLength - counter] = value + 10;
      } else {
        b = 0;
        firstViewCopy[firstViewCopyLength - counter] = value;
        break;
      }
    }
  }
  return firstViewCopy.slice();
}
__name(viewSub, "viewSub");
var LocalIntegerValueBlock = class extends HexBlock(ValueBlock) {
  static {
    __name(this, "LocalIntegerValueBlock");
  }
  constructor({ value, ...parameters } = {}) {
    super(parameters);
    this._valueDec = 0;
    if (parameters.valueHex) {
      this.setValueHex();
    }
    if (value !== void 0) {
      this.valueDec = value;
    }
  }
  setValueHex() {
    if (this.valueHexView.length >= 4) {
      this.warnings.push("Too big Integer for decoding, hex only");
      this.isHexOnly = true;
      this._valueDec = 0;
    } else {
      this.isHexOnly = false;
      if (this.valueHexView.length > 0) {
        this._valueDec = utilDecodeTC.call(this);
      }
    }
  }
  set valueDec(v) {
    this._valueDec = v;
    this.isHexOnly = false;
    this.valueHexView = new Uint8Array(utilEncodeTC(v));
  }
  get valueDec() {
    return this._valueDec;
  }
  fromDER(inputBuffer, inputOffset, inputLength, expectedLength = 0) {
    const offset = this.fromBER(inputBuffer, inputOffset, inputLength);
    if (offset === -1)
      return offset;
    const view = this.valueHexView;
    if (view[0] === 0 && (view[1] & 128) !== 0) {
      this.valueHexView = view.subarray(1);
    } else {
      if (expectedLength !== 0) {
        if (view.length < expectedLength) {
          if (expectedLength - view.length > 1)
            expectedLength = view.length + 1;
          this.valueHexView = view.subarray(expectedLength - view.length);
        }
      }
    }
    return offset;
  }
  toDER(sizeOnly = false) {
    const view = this.valueHexView;
    switch (true) {
      case (view[0] & 128) !== 0:
        {
          const updatedView = new Uint8Array(this.valueHexView.length + 1);
          updatedView[0] = 0;
          updatedView.set(view, 1);
          this.valueHexView = updatedView;
        }
        break;
      case (view[0] === 0 && (view[1] & 128) === 0):
        {
          this.valueHexView = this.valueHexView.subarray(1);
        }
        break;
    }
    return this.toBER(sizeOnly);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
    if (resultOffset === -1) {
      return resultOffset;
    }
    this.setValueHex();
    return resultOffset;
  }
  toBER(sizeOnly) {
    return sizeOnly ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
  toString() {
    const firstBit = this.valueHexView.length * 8 - 1;
    let digits = new Uint8Array(this.valueHexView.length * 8 / 3);
    let bitNumber = 0;
    let currentByte;
    const asn1View = this.valueHexView;
    let result = "";
    let flag = false;
    for (let byteNumber = asn1View.byteLength - 1; byteNumber >= 0; byteNumber--) {
      currentByte = asn1View[byteNumber];
      for (let i = 0; i < 8; i++) {
        if ((currentByte & 1) === 1) {
          switch (bitNumber) {
            case firstBit:
              digits = viewSub(power2(bitNumber), digits);
              result = "-";
              break;
            default:
              digits = viewAdd(digits, power2(bitNumber));
          }
        }
        bitNumber++;
        currentByte >>= 1;
      }
    }
    for (let i = 0; i < digits.length; i++) {
      if (digits[i])
        flag = true;
      if (flag)
        result += digitsString.charAt(digits[i]);
    }
    if (flag === false)
      result += digitsString.charAt(0);
    return result;
  }
};
_a$p = LocalIntegerValueBlock;
LocalIntegerValueBlock.NAME = "IntegerValueBlock";
(() => {
  Object.defineProperty(_a$p.prototype, "valueHex", {
    set: /* @__PURE__ */ __name(function(v) {
      this.valueHexView = new Uint8Array(v);
      this.setValueHex();
    }, "set"),
    get: /* @__PURE__ */ __name(function() {
      return this.valueHexView.slice().buffer;
    }, "get")
  });
})();
var _a$o;
var Integer = class _Integer extends BaseBlock {
  static {
    __name(this, "Integer");
  }
  constructor(parameters = {}) {
    super(parameters, LocalIntegerValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 2;
  }
  toBigInt() {
    assertBigInt();
    return BigInt(this.valueBlock.toString());
  }
  static fromBigInt(value) {
    assertBigInt();
    const bigIntValue = BigInt(value);
    const writer = new ViewWriter();
    const hex = bigIntValue.toString(16).replace(/^-/, "");
    const view = new Uint8Array(pvtsutils.Convert.FromHex(hex));
    if (bigIntValue < 0) {
      const first = new Uint8Array(view.length + (view[0] & 128 ? 1 : 0));
      first[0] |= 128;
      const firstInt = BigInt(`0x${pvtsutils.Convert.ToHex(first)}`);
      const secondInt = firstInt + bigIntValue;
      const second = pvtsutils.BufferSourceConverter.toUint8Array(pvtsutils.Convert.FromHex(secondInt.toString(16)));
      second[0] |= 128;
      writer.write(second);
    } else {
      if (view[0] & 128) {
        writer.write(new Uint8Array([0]));
      }
      writer.write(view);
    }
    const res = new _Integer({
      valueHex: writer.final()
    });
    return res;
  }
  convertToDER() {
    const integer = new _Integer({ valueHex: this.valueBlock.valueHexView });
    integer.valueBlock.toDER();
    return integer;
  }
  convertFromDER() {
    return new _Integer({
      valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView
    });
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
  }
};
_a$o = Integer;
(() => {
  typeStore.Integer = _a$o;
})();
Integer.NAME = "INTEGER";
var _a$n;
var Enumerated = class extends Integer {
  static {
    __name(this, "Enumerated");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 10;
  }
};
_a$n = Enumerated;
(() => {
  typeStore.Enumerated = _a$n;
})();
Enumerated.NAME = "ENUMERATED";
var LocalSidValueBlock = class extends HexBlock(ValueBlock) {
  static {
    __name(this, "LocalSidValueBlock");
  }
  constructor({ valueDec = -1, isFirstSid = false, ...parameters } = {}) {
    super(parameters);
    this.valueDec = valueDec;
    this.isFirstSid = isFirstSid;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (!inputLength) {
      return inputOffset;
    }
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.valueHexView = new Uint8Array(inputLength);
    for (let i = 0; i < inputLength; i++) {
      this.valueHexView[i] = intBuffer[i] & 127;
      this.blockLength++;
      if ((intBuffer[i] & 128) === 0)
        break;
    }
    const tempView = new Uint8Array(this.blockLength);
    for (let i = 0; i < this.blockLength; i++) {
      tempView[i] = this.valueHexView[i];
    }
    this.valueHexView = tempView;
    if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    if (this.valueHexView[0] === 0)
      this.warnings.push("Needlessly long format of SID encoding");
    if (this.blockLength <= 8)
      this.valueDec = utilFromBase(this.valueHexView, 7);
    else {
      this.isHexOnly = true;
      this.warnings.push("Too big SID for decoding, hex only");
    }
    return inputOffset + this.blockLength;
  }
  set valueBigInt(value) {
    assertBigInt();
    let bits = BigInt(value).toString(2);
    while (bits.length % 7) {
      bits = "0" + bits;
    }
    const bytes3 = new Uint8Array(bits.length / 7);
    for (let i = 0; i < bytes3.length; i++) {
      bytes3[i] = parseInt(bits.slice(i * 7, i * 7 + 7), 2) + (i + 1 < bytes3.length ? 128 : 0);
    }
    this.fromBER(bytes3.buffer, 0, bytes3.length);
  }
  toBER(sizeOnly) {
    if (this.isHexOnly) {
      if (sizeOnly)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const curView = this.valueHexView;
      const retView2 = new Uint8Array(this.blockLength);
      for (let i = 0; i < this.blockLength - 1; i++)
        retView2[i] = curView[i] | 128;
      retView2[this.blockLength - 1] = curView[this.blockLength - 1];
      return retView2.buffer;
    }
    const encodedBuf = utilToBase(this.valueDec, 7);
    if (encodedBuf.byteLength === 0) {
      this.error = "Error during encoding SID value";
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(encodedBuf.byteLength);
    if (!sizeOnly) {
      const encodedView = new Uint8Array(encodedBuf);
      const len = encodedBuf.byteLength - 1;
      for (let i = 0; i < len; i++)
        retView[i] = encodedView[i] | 128;
      retView[len] = encodedView[len];
    }
    return retView;
  }
  toString() {
    let result = "";
    if (this.isHexOnly)
      result = pvtsutils.Convert.ToHex(this.valueHexView);
    else {
      if (this.isFirstSid) {
        let sidValue = this.valueDec;
        if (this.valueDec <= 39)
          result = "0.";
        else {
          if (this.valueDec <= 79) {
            result = "1.";
            sidValue -= 40;
          } else {
            result = "2.";
            sidValue -= 80;
          }
        }
        result += sidValue.toString();
      } else
        result = this.valueDec.toString();
    }
    return result;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec,
      isFirstSid: this.isFirstSid
    };
  }
};
LocalSidValueBlock.NAME = "sidBlock";
var LocalObjectIdentifierValueBlock = class extends ValueBlock {
  static {
    __name(this, "LocalObjectIdentifierValueBlock");
  }
  constructor({ value = EMPTY_STRING, ...parameters } = {}) {
    super(parameters);
    this.value = [];
    if (value) {
      this.fromString(value);
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = inputOffset;
    while (inputLength > 0) {
      const sidBlock = new LocalSidValueBlock();
      resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
      if (resultOffset === -1) {
        this.blockLength = 0;
        this.error = sidBlock.error;
        return resultOffset;
      }
      if (this.value.length === 0)
        sidBlock.isFirstSid = true;
      this.blockLength += sidBlock.blockLength;
      inputLength -= sidBlock.blockLength;
      this.value.push(sidBlock);
    }
    return resultOffset;
  }
  toBER(sizeOnly) {
    const retBuffers = [];
    for (let i = 0; i < this.value.length; i++) {
      const valueBuf = this.value[i].toBER(sizeOnly);
      if (valueBuf.byteLength === 0) {
        this.error = this.value[i].error;
        return EMPTY_BUFFER;
      }
      retBuffers.push(valueBuf);
    }
    return concat(retBuffers);
  }
  fromString(string3) {
    this.value = [];
    let pos1 = 0;
    let pos2 = 0;
    let sid = "";
    let flag = false;
    do {
      pos2 = string3.indexOf(".", pos1);
      if (pos2 === -1)
        sid = string3.substring(pos1);
      else
        sid = string3.substring(pos1, pos2);
      pos1 = pos2 + 1;
      if (flag) {
        const sidBlock = this.value[0];
        let plus = 0;
        switch (sidBlock.valueDec) {
          case 0:
            break;
          case 1:
            plus = 40;
            break;
          case 2:
            plus = 80;
            break;
          default:
            this.value = [];
            return;
        }
        const parsedSID = parseInt(sid, 10);
        if (isNaN(parsedSID))
          return;
        sidBlock.valueDec = parsedSID + plus;
        flag = false;
      } else {
        const sidBlock = new LocalSidValueBlock();
        if (sid > Number.MAX_SAFE_INTEGER) {
          assertBigInt();
          const sidValue = BigInt(sid);
          sidBlock.valueBigInt = sidValue;
        } else {
          sidBlock.valueDec = parseInt(sid, 10);
          if (isNaN(sidBlock.valueDec))
            return;
        }
        if (!this.value.length) {
          sidBlock.isFirstSid = true;
          flag = true;
        }
        this.value.push(sidBlock);
      }
    } while (pos2 !== -1);
  }
  toString() {
    let result = "";
    let isHexOnly = false;
    for (let i = 0; i < this.value.length; i++) {
      isHexOnly = this.value[i].isHexOnly;
      let sidStr = this.value[i].toString();
      if (i !== 0)
        result = `${result}.`;
      if (isHexOnly) {
        sidStr = `{${sidStr}}`;
        if (this.value[i].isFirstSid)
          result = `2.{${sidStr} - 80}`;
        else
          result += sidStr;
      } else
        result += sidStr;
    }
    return result;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let i = 0; i < this.value.length; i++) {
      object.sidArray.push(this.value[i].toJSON());
    }
    return object;
  }
};
LocalObjectIdentifierValueBlock.NAME = "ObjectIdentifierValueBlock";
var _a$m;
var ObjectIdentifier = class extends BaseBlock {
  static {
    __name(this, "ObjectIdentifier");
  }
  constructor(parameters = {}) {
    super(parameters, LocalObjectIdentifierValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 6;
  }
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(value) {
    this.valueBlock.fromString(value);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
};
_a$m = ObjectIdentifier;
(() => {
  typeStore.ObjectIdentifier = _a$m;
})();
ObjectIdentifier.NAME = "OBJECT IDENTIFIER";
var LocalRelativeSidValueBlock = class extends HexBlock(LocalBaseBlock) {
  static {
    __name(this, "LocalRelativeSidValueBlock");
  }
  constructor({ valueDec = 0, ...parameters } = {}) {
    super(parameters);
    this.valueDec = valueDec;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (inputLength === 0)
      return inputOffset;
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength))
      return -1;
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.valueHexView = new Uint8Array(inputLength);
    for (let i = 0; i < inputLength; i++) {
      this.valueHexView[i] = intBuffer[i] & 127;
      this.blockLength++;
      if ((intBuffer[i] & 128) === 0)
        break;
    }
    const tempView = new Uint8Array(this.blockLength);
    for (let i = 0; i < this.blockLength; i++)
      tempView[i] = this.valueHexView[i];
    this.valueHexView = tempView;
    if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    if (this.valueHexView[0] === 0)
      this.warnings.push("Needlessly long format of SID encoding");
    if (this.blockLength <= 8)
      this.valueDec = utilFromBase(this.valueHexView, 7);
    else {
      this.isHexOnly = true;
      this.warnings.push("Too big SID for decoding, hex only");
    }
    return inputOffset + this.blockLength;
  }
  toBER(sizeOnly) {
    if (this.isHexOnly) {
      if (sizeOnly)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const curView = this.valueHexView;
      const retView2 = new Uint8Array(this.blockLength);
      for (let i = 0; i < this.blockLength - 1; i++)
        retView2[i] = curView[i] | 128;
      retView2[this.blockLength - 1] = curView[this.blockLength - 1];
      return retView2.buffer;
    }
    const encodedBuf = utilToBase(this.valueDec, 7);
    if (encodedBuf.byteLength === 0) {
      this.error = "Error during encoding SID value";
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(encodedBuf.byteLength);
    if (!sizeOnly) {
      const encodedView = new Uint8Array(encodedBuf);
      const len = encodedBuf.byteLength - 1;
      for (let i = 0; i < len; i++)
        retView[i] = encodedView[i] | 128;
      retView[len] = encodedView[len];
    }
    return retView.buffer;
  }
  toString() {
    let result = "";
    if (this.isHexOnly)
      result = pvtsutils.Convert.ToHex(this.valueHexView);
    else {
      result = this.valueDec.toString();
    }
    return result;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
};
LocalRelativeSidValueBlock.NAME = "relativeSidBlock";
var LocalRelativeObjectIdentifierValueBlock = class extends ValueBlock {
  static {
    __name(this, "LocalRelativeObjectIdentifierValueBlock");
  }
  constructor({ value = EMPTY_STRING, ...parameters } = {}) {
    super(parameters);
    this.value = [];
    if (value) {
      this.fromString(value);
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = inputOffset;
    while (inputLength > 0) {
      const sidBlock = new LocalRelativeSidValueBlock();
      resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
      if (resultOffset === -1) {
        this.blockLength = 0;
        this.error = sidBlock.error;
        return resultOffset;
      }
      this.blockLength += sidBlock.blockLength;
      inputLength -= sidBlock.blockLength;
      this.value.push(sidBlock);
    }
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    const retBuffers = [];
    for (let i = 0; i < this.value.length; i++) {
      const valueBuf = this.value[i].toBER(sizeOnly);
      if (valueBuf.byteLength === 0) {
        this.error = this.value[i].error;
        return EMPTY_BUFFER;
      }
      retBuffers.push(valueBuf);
    }
    return concat(retBuffers);
  }
  fromString(string3) {
    this.value = [];
    let pos1 = 0;
    let pos2 = 0;
    let sid = "";
    do {
      pos2 = string3.indexOf(".", pos1);
      if (pos2 === -1)
        sid = string3.substring(pos1);
      else
        sid = string3.substring(pos1, pos2);
      pos1 = pos2 + 1;
      const sidBlock = new LocalRelativeSidValueBlock();
      sidBlock.valueDec = parseInt(sid, 10);
      if (isNaN(sidBlock.valueDec))
        return true;
      this.value.push(sidBlock);
    } while (pos2 !== -1);
    return true;
  }
  toString() {
    let result = "";
    let isHexOnly = false;
    for (let i = 0; i < this.value.length; i++) {
      isHexOnly = this.value[i].isHexOnly;
      let sidStr = this.value[i].toString();
      if (i !== 0)
        result = `${result}.`;
      if (isHexOnly) {
        sidStr = `{${sidStr}}`;
        result += sidStr;
      } else
        result += sidStr;
    }
    return result;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let i = 0; i < this.value.length; i++)
      object.sidArray.push(this.value[i].toJSON());
    return object;
  }
};
LocalRelativeObjectIdentifierValueBlock.NAME = "RelativeObjectIdentifierValueBlock";
var _a$l;
var RelativeObjectIdentifier = class extends BaseBlock {
  static {
    __name(this, "RelativeObjectIdentifier");
  }
  constructor(parameters = {}) {
    super(parameters, LocalRelativeObjectIdentifierValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 13;
  }
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(value) {
    this.valueBlock.fromString(value);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
};
_a$l = RelativeObjectIdentifier;
(() => {
  typeStore.RelativeObjectIdentifier = _a$l;
})();
RelativeObjectIdentifier.NAME = "RelativeObjectIdentifier";
var _a$k;
var Sequence = class extends Constructed {
  static {
    __name(this, "Sequence");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 16;
  }
};
_a$k = Sequence;
(() => {
  typeStore.Sequence = _a$k;
})();
Sequence.NAME = "SEQUENCE";
var _a$j;
var Set = class extends Constructed {
  static {
    __name(this, "Set");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 17;
  }
};
_a$j = Set;
(() => {
  typeStore.Set = _a$j;
})();
Set.NAME = "SET";
var LocalStringValueBlock = class extends HexBlock(ValueBlock) {
  static {
    __name(this, "LocalStringValueBlock");
  }
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.isHexOnly = true;
    this.value = EMPTY_STRING;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
};
LocalStringValueBlock.NAME = "StringValueBlock";
var LocalSimpleStringValueBlock = class extends LocalStringValueBlock {
  static {
    __name(this, "LocalSimpleStringValueBlock");
  }
};
LocalSimpleStringValueBlock.NAME = "SimpleStringValueBlock";
var LocalSimpleStringBlock = class extends BaseStringBlock {
  static {
    __name(this, "LocalSimpleStringBlock");
  }
  constructor({ ...parameters } = {}) {
    super(parameters, LocalSimpleStringValueBlock);
  }
  fromBuffer(inputBuffer) {
    this.valueBlock.value = String.fromCharCode.apply(null, pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer));
  }
  fromString(inputString) {
    const strLen = inputString.length;
    const view = this.valueBlock.valueHexView = new Uint8Array(strLen);
    for (let i = 0; i < strLen; i++)
      view[i] = inputString.charCodeAt(i);
    this.valueBlock.value = inputString;
  }
};
LocalSimpleStringBlock.NAME = "SIMPLE STRING";
var LocalUtf8StringValueBlock = class extends LocalSimpleStringBlock {
  static {
    __name(this, "LocalUtf8StringValueBlock");
  }
  fromBuffer(inputBuffer) {
    this.valueBlock.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    try {
      this.valueBlock.value = pvtsutils.Convert.ToUtf8String(inputBuffer);
    } catch (ex) {
      this.warnings.push(`Error during "decodeURIComponent": ${ex}, using raw string`);
      this.valueBlock.value = pvtsutils.Convert.ToBinary(inputBuffer);
    }
  }
  fromString(inputString) {
    this.valueBlock.valueHexView = new Uint8Array(pvtsutils.Convert.FromUtf8String(inputString));
    this.valueBlock.value = inputString;
  }
};
LocalUtf8StringValueBlock.NAME = "Utf8StringValueBlock";
var _a$i;
var Utf8String = class extends LocalUtf8StringValueBlock {
  static {
    __name(this, "Utf8String");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 12;
  }
};
_a$i = Utf8String;
(() => {
  typeStore.Utf8String = _a$i;
})();
Utf8String.NAME = "UTF8String";
var LocalBmpStringValueBlock = class extends LocalSimpleStringBlock {
  static {
    __name(this, "LocalBmpStringValueBlock");
  }
  fromBuffer(inputBuffer) {
    this.valueBlock.value = pvtsutils.Convert.ToUtf16String(inputBuffer);
    this.valueBlock.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
  }
  fromString(inputString) {
    this.valueBlock.value = inputString;
    this.valueBlock.valueHexView = new Uint8Array(pvtsutils.Convert.FromUtf16String(inputString));
  }
};
LocalBmpStringValueBlock.NAME = "BmpStringValueBlock";
var _a$h;
var BmpString = class extends LocalBmpStringValueBlock {
  static {
    __name(this, "BmpString");
  }
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 30;
  }
};
_a$h = BmpString;
(() => {
  typeStore.BmpString = _a$h;
})();
BmpString.NAME = "BMPString";
var LocalUniversalStringValueBlock = class extends LocalSimpleStringBlock {
  static {
    __name(this, "LocalUniversalStringValueBlock");
  }
  fromBuffer(inputBuffer) {
    const copyBuffer = ArrayBuffer.isView(inputBuffer) ? inputBuffer.slice().buffer : inputBuffer.slice(0);
    const valueView = new Uint8Array(copyBuffer);
    for (let i = 0; i < valueView.length; i += 4) {
      valueView[i] = valueView[i + 3];
      valueView[i + 1] = valueView[i + 2];
      valueView[i + 2] = 0;
      valueView[i + 3] = 0;
    }
    this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
  }
  fromString(inputString) {
    const strLength = inputString.length;
    const valueHexView = this.valueBlock.valueHexView = new Uint8Array(strLength * 4);
    for (let i = 0; i < strLength; i++) {
      const codeBuf = utilToBase(inputString.charCodeAt(i), 8);
      const codeView = new Uint8Array(codeBuf);
      if (codeView.length > 4)
        continue;
      const dif = 4 - codeView.length;
      for (let j = codeView.length - 1; j >= 0; j--)
        valueHexView[i * 4 + j + dif] = codeView[j];
    }
    this.valueBlock.value = inputString;
  }
};
LocalUniversalStringValueBlock.NAME = "UniversalStringValueBlock";
var _a$g;
var UniversalString = class extends LocalUniversalStringValueBlock {
  static {
    __name(this, "UniversalString");
  }
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 28;
  }
};
_a$g = UniversalString;
(() => {
  typeStore.UniversalString = _a$g;
})();
UniversalString.NAME = "UniversalString";
var _a$f;
var NumericString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "NumericString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 18;
  }
};
_a$f = NumericString;
(() => {
  typeStore.NumericString = _a$f;
})();
NumericString.NAME = "NumericString";
var _a$e;
var PrintableString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "PrintableString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 19;
  }
};
_a$e = PrintableString;
(() => {
  typeStore.PrintableString = _a$e;
})();
PrintableString.NAME = "PrintableString";
var _a$d;
var TeletexString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "TeletexString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 20;
  }
};
_a$d = TeletexString;
(() => {
  typeStore.TeletexString = _a$d;
})();
TeletexString.NAME = "TeletexString";
var _a$c;
var VideotexString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "VideotexString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 21;
  }
};
_a$c = VideotexString;
(() => {
  typeStore.VideotexString = _a$c;
})();
VideotexString.NAME = "VideotexString";
var _a$b;
var IA5String = class extends LocalSimpleStringBlock {
  static {
    __name(this, "IA5String");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 22;
  }
};
_a$b = IA5String;
(() => {
  typeStore.IA5String = _a$b;
})();
IA5String.NAME = "IA5String";
var _a$a;
var GraphicString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "GraphicString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 25;
  }
};
_a$a = GraphicString;
(() => {
  typeStore.GraphicString = _a$a;
})();
GraphicString.NAME = "GraphicString";
var _a$9;
var VisibleString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "VisibleString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 26;
  }
};
_a$9 = VisibleString;
(() => {
  typeStore.VisibleString = _a$9;
})();
VisibleString.NAME = "VisibleString";
var _a$8;
var GeneralString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "GeneralString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 27;
  }
};
_a$8 = GeneralString;
(() => {
  typeStore.GeneralString = _a$8;
})();
GeneralString.NAME = "GeneralString";
var _a$7;
var CharacterString = class extends LocalSimpleStringBlock {
  static {
    __name(this, "CharacterString");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 29;
  }
};
_a$7 = CharacterString;
(() => {
  typeStore.CharacterString = _a$7;
})();
CharacterString.NAME = "CharacterString";
var _a$6;
var UTCTime = class extends VisibleString {
  static {
    __name(this, "UTCTime");
  }
  constructor({ value, valueDate, ...parameters } = {}) {
    super(parameters);
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    if (value) {
      this.fromString(value);
      this.valueBlock.valueHexView = new Uint8Array(value.length);
      for (let i = 0; i < value.length; i++)
        this.valueBlock.valueHexView[i] = value.charCodeAt(i);
    }
    if (valueDate) {
      this.fromDate(valueDate);
      this.valueBlock.valueHexView = new Uint8Array(this.toBuffer());
    }
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 23;
  }
  fromBuffer(inputBuffer) {
    this.fromString(String.fromCharCode.apply(null, pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer)));
  }
  toBuffer() {
    const str = this.toString();
    const buffer = new ArrayBuffer(str.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++)
      view[i] = str.charCodeAt(i);
    return buffer;
  }
  fromDate(inputDate) {
    this.year = inputDate.getUTCFullYear();
    this.month = inputDate.getUTCMonth() + 1;
    this.day = inputDate.getUTCDate();
    this.hour = inputDate.getUTCHours();
    this.minute = inputDate.getUTCMinutes();
    this.second = inputDate.getUTCSeconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
  }
  fromString(inputString) {
    const parser2 = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig;
    const parserArray = parser2.exec(inputString);
    if (parserArray === null) {
      this.error = "Wrong input string for conversion";
      return;
    }
    const year = parseInt(parserArray[1], 10);
    if (year >= 50)
      this.year = 1900 + year;
    else
      this.year = 2e3 + year;
    this.month = parseInt(parserArray[2], 10);
    this.day = parseInt(parserArray[3], 10);
    this.hour = parseInt(parserArray[4], 10);
    this.minute = parseInt(parserArray[5], 10);
    this.second = parseInt(parserArray[6], 10);
  }
  toString(encoding = "iso") {
    if (encoding === "iso") {
      const outputArray = new Array(7);
      outputArray[0] = padNumber(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2);
      outputArray[1] = padNumber(this.month, 2);
      outputArray[2] = padNumber(this.day, 2);
      outputArray[3] = padNumber(this.hour, 2);
      outputArray[4] = padNumber(this.minute, 2);
      outputArray[5] = padNumber(this.second, 2);
      outputArray[6] = "Z";
      return outputArray.join("");
    }
    return super.toString(encoding);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }
};
_a$6 = UTCTime;
(() => {
  typeStore.UTCTime = _a$6;
})();
UTCTime.NAME = "UTCTime";
var _a$5;
var GeneralizedTime = class extends UTCTime {
  static {
    __name(this, "GeneralizedTime");
  }
  constructor(parameters = {}) {
    var _b;
    super(parameters);
    (_b = this.millisecond) !== null && _b !== void 0 ? _b : this.millisecond = 0;
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 24;
  }
  fromDate(inputDate) {
    super.fromDate(inputDate);
    this.millisecond = inputDate.getUTCMilliseconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond));
  }
  fromString(inputString) {
    let isUTC = false;
    let timeString = "";
    let dateTimeString = "";
    let fractionPart = 0;
    let parser2;
    let hourDifference = 0;
    let minuteDifference = 0;
    if (inputString[inputString.length - 1] === "Z") {
      timeString = inputString.substring(0, inputString.length - 1);
      isUTC = true;
    } else {
      const number4 = new Number(inputString[inputString.length - 1]);
      if (isNaN(number4.valueOf()))
        throw new Error("Wrong input string for conversion");
      timeString = inputString;
    }
    if (isUTC) {
      if (timeString.indexOf("+") !== -1)
        throw new Error("Wrong input string for conversion");
      if (timeString.indexOf("-") !== -1)
        throw new Error("Wrong input string for conversion");
    } else {
      let multiplier = 1;
      let differencePosition = timeString.indexOf("+");
      let differenceString = "";
      if (differencePosition === -1) {
        differencePosition = timeString.indexOf("-");
        multiplier = -1;
      }
      if (differencePosition !== -1) {
        differenceString = timeString.substring(differencePosition + 1);
        timeString = timeString.substring(0, differencePosition);
        if (differenceString.length !== 2 && differenceString.length !== 4)
          throw new Error("Wrong input string for conversion");
        let number4 = parseInt(differenceString.substring(0, 2), 10);
        if (isNaN(number4.valueOf()))
          throw new Error("Wrong input string for conversion");
        hourDifference = multiplier * number4;
        if (differenceString.length === 4) {
          number4 = parseInt(differenceString.substring(2, 4), 10);
          if (isNaN(number4.valueOf()))
            throw new Error("Wrong input string for conversion");
          minuteDifference = multiplier * number4;
        }
      }
    }
    let fractionPointPosition = timeString.indexOf(".");
    if (fractionPointPosition === -1)
      fractionPointPosition = timeString.indexOf(",");
    if (fractionPointPosition !== -1) {
      const fractionPartCheck = new Number(`0${timeString.substring(fractionPointPosition)}`);
      if (isNaN(fractionPartCheck.valueOf()))
        throw new Error("Wrong input string for conversion");
      fractionPart = fractionPartCheck.valueOf();
      dateTimeString = timeString.substring(0, fractionPointPosition);
    } else
      dateTimeString = timeString;
    switch (true) {
      case dateTimeString.length === 8:
        parser2 = /(\d{4})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1)
          throw new Error("Wrong input string for conversion");
        break;
      case dateTimeString.length === 10:
        parser2 = /(\d{4})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          let fractionResult = 60 * fractionPart;
          this.minute = Math.floor(fractionResult);
          fractionResult = 60 * (fractionResult - this.minute);
          this.second = Math.floor(fractionResult);
          fractionResult = 1e3 * (fractionResult - this.second);
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      case dateTimeString.length === 12:
        parser2 = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          let fractionResult = 60 * fractionPart;
          this.second = Math.floor(fractionResult);
          fractionResult = 1e3 * (fractionResult - this.second);
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      case dateTimeString.length === 14:
        parser2 = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          const fractionResult = 1e3 * fractionPart;
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      default:
        throw new Error("Wrong input string for conversion");
    }
    const parserArray = parser2.exec(dateTimeString);
    if (parserArray === null)
      throw new Error("Wrong input string for conversion");
    for (let j = 1; j < parserArray.length; j++) {
      switch (j) {
        case 1:
          this.year = parseInt(parserArray[j], 10);
          break;
        case 2:
          this.month = parseInt(parserArray[j], 10);
          break;
        case 3:
          this.day = parseInt(parserArray[j], 10);
          break;
        case 4:
          this.hour = parseInt(parserArray[j], 10) + hourDifference;
          break;
        case 5:
          this.minute = parseInt(parserArray[j], 10) + minuteDifference;
          break;
        case 6:
          this.second = parseInt(parserArray[j], 10);
          break;
        default:
          throw new Error("Wrong input string for conversion");
      }
    }
    if (isUTC === false) {
      const tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
      this.year = tempDate.getUTCFullYear();
      this.month = tempDate.getUTCMonth();
      this.day = tempDate.getUTCDay();
      this.hour = tempDate.getUTCHours();
      this.minute = tempDate.getUTCMinutes();
      this.second = tempDate.getUTCSeconds();
      this.millisecond = tempDate.getUTCMilliseconds();
    }
  }
  toString(encoding = "iso") {
    if (encoding === "iso") {
      const outputArray = [];
      outputArray.push(padNumber(this.year, 4));
      outputArray.push(padNumber(this.month, 2));
      outputArray.push(padNumber(this.day, 2));
      outputArray.push(padNumber(this.hour, 2));
      outputArray.push(padNumber(this.minute, 2));
      outputArray.push(padNumber(this.second, 2));
      if (this.millisecond !== 0) {
        outputArray.push(".");
        outputArray.push(padNumber(this.millisecond, 3));
      }
      outputArray.push("Z");
      return outputArray.join("");
    }
    return super.toString(encoding);
  }
  toJSON() {
    return {
      ...super.toJSON(),
      millisecond: this.millisecond
    };
  }
};
_a$5 = GeneralizedTime;
(() => {
  typeStore.GeneralizedTime = _a$5;
})();
GeneralizedTime.NAME = "GeneralizedTime";
var _a$4;
var DATE = class extends Utf8String {
  static {
    __name(this, "DATE");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 31;
  }
};
_a$4 = DATE;
(() => {
  typeStore.DATE = _a$4;
})();
DATE.NAME = "DATE";
var _a$3;
var TimeOfDay = class extends Utf8String {
  static {
    __name(this, "TimeOfDay");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 32;
  }
};
_a$3 = TimeOfDay;
(() => {
  typeStore.TimeOfDay = _a$3;
})();
TimeOfDay.NAME = "TimeOfDay";
var _a$2;
var DateTime = class extends Utf8String {
  static {
    __name(this, "DateTime");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 33;
  }
};
_a$2 = DateTime;
(() => {
  typeStore.DateTime = _a$2;
})();
DateTime.NAME = "DateTime";
var _a$1;
var Duration = class extends Utf8String {
  static {
    __name(this, "Duration");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 34;
  }
};
_a$1 = Duration;
(() => {
  typeStore.Duration = _a$1;
})();
Duration.NAME = "Duration";
var _a;
var TIME = class extends Utf8String {
  static {
    __name(this, "TIME");
  }
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 14;
  }
};
_a = TIME;
(() => {
  typeStore.TIME = _a;
})();
TIME.NAME = "TIME";

// node_modules/@libp2p/webrtc/node_modules/uint8arrays/dist/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base4 = bases_default[encoding];
  if (base4 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base4.encoder.encode(array).substring(1);
}
__name(toString2, "toString");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/errors.js
var VerificationError = class extends Error {
  static {
    __name(this, "VerificationError");
  }
  constructor(message2 = "An error occurred while verifying a message") {
    super(message2);
    this.name = "VerificationError";
  }
};
var WebCryptoMissingError = class extends Error {
  static {
    __name(this, "WebCryptoMissingError");
  }
  constructor(message2 = "Missing Web Crypto API") {
    super(message2);
    this.name = "WebCryptoMissingError";
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/webcrypto/webcrypto.browser.js
var webcrypto_browser_default = {
  get(win = globalThis) {
    const nativeCrypto = win.crypto;
    if (nativeCrypto?.subtle == null) {
      throw new WebCryptoMissingError("Missing Web Crypto API. The most likely cause of this error is that this page is being accessed from an insecure context (i.e. not HTTPS). For more information and possible resolutions see https://github.com/libp2p/js-libp2p/blob/main/packages/crypto/README.md#web-crypto-api");
    }
    return nativeCrypto;
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/webcrypto/index.js
var webcrypto_default = webcrypto_browser_default;

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/rsa/index.browser.js
async function generateRSAKey(bits) {
  const pair2 = await webcrypto_default.get().subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: bits,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: { name: "SHA-256" }
  }, true, ["sign", "verify"]);
  const keys = await exportKey(pair2);
  return {
    privateKey: keys[0],
    publicKey: keys[1]
  };
}
__name(generateRSAKey, "generateRSAKey");
async function hashAndSign2(key, msg) {
  const privateKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, false, ["sign"]);
  const sig = await webcrypto_default.get().subtle.sign({ name: "RSASSA-PKCS1-v1_5" }, privateKey, msg instanceof Uint8Array ? msg : msg.subarray());
  return new Uint8Array(sig, 0, sig.byteLength);
}
__name(hashAndSign2, "hashAndSign");
async function hashAndVerify2(key, sig, msg) {
  const publicKey = await webcrypto_default.get().subtle.importKey("jwk", key, {
    name: "RSASSA-PKCS1-v1_5",
    hash: { name: "SHA-256" }
  }, false, ["verify"]);
  return webcrypto_default.get().subtle.verify({ name: "RSASSA-PKCS1-v1_5" }, publicKey, sig, msg instanceof Uint8Array ? msg : msg.subarray());
}
__name(hashAndVerify2, "hashAndVerify");
async function exportKey(pair2) {
  if (pair2.privateKey == null || pair2.publicKey == null) {
    throw new InvalidParametersError("Private and public key are required");
  }
  return Promise.all([
    webcrypto_default.get().subtle.exportKey("jwk", pair2.privateKey),
    webcrypto_default.get().subtle.exportKey("jwk", pair2.publicKey)
  ]);
}
__name(exportKey, "exportKey");
function rsaKeySize(jwk) {
  if (jwk.kty !== "RSA") {
    throw new InvalidParametersError("invalid key type");
  } else if (jwk.n == null) {
    throw new InvalidParametersError("invalid key modulus");
  }
  const bytes3 = fromString2(jwk.n, "base64url");
  return bytes3.length * 8;
}
__name(rsaKeySize, "rsaKeySize");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/rsa/rsa.js
var RSAPublicKey = class {
  static {
    __name(this, "RSAPublicKey");
  }
  type = "RSA";
  _key;
  _raw;
  _multihash;
  constructor(key, digest2) {
    this._key = key;
    this._multihash = digest2;
  }
  get raw() {
    if (this._raw == null) {
      this._raw = utils_exports2.jwkToPkix(this._key);
    }
    return this._raw;
  }
  toMultihash() {
    return this._multihash;
  }
  toCID() {
    return CID.createV1(114, this._multihash);
  }
  toString() {
    return base58btc.encode(this.toMultihash().bytes).substring(1);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  verify(data, sig) {
    return hashAndVerify2(this._key, sig, data);
  }
};
var RSAPrivateKey = class {
  static {
    __name(this, "RSAPrivateKey");
  }
  type = "RSA";
  _key;
  _raw;
  publicKey;
  constructor(key, publicKey) {
    this._key = key;
    this.publicKey = publicKey;
  }
  get raw() {
    if (this._raw == null) {
      this._raw = utils_exports2.jwkToPkcs1(this._key);
    }
    return this._raw;
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  sign(message2) {
    return hashAndSign2(this._key, message2);
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/rsa/utils.js
var MAX_RSA_KEY_SIZE = 8192;
var SHA2_256_CODE = 18;
function pkcs1ToJwk(bytes3) {
  const { result } = fromBER(bytes3);
  const values = result.valueBlock.value;
  const key = {
    n: toString2(bnToBuf(values[1].toBigInt()), "base64url"),
    e: toString2(bnToBuf(values[2].toBigInt()), "base64url"),
    d: toString2(bnToBuf(values[3].toBigInt()), "base64url"),
    p: toString2(bnToBuf(values[4].toBigInt()), "base64url"),
    q: toString2(bnToBuf(values[5].toBigInt()), "base64url"),
    dp: toString2(bnToBuf(values[6].toBigInt()), "base64url"),
    dq: toString2(bnToBuf(values[7].toBigInt()), "base64url"),
    qi: toString2(bnToBuf(values[8].toBigInt()), "base64url"),
    kty: "RSA",
    alg: "RS256"
  };
  return key;
}
__name(pkcs1ToJwk, "pkcs1ToJwk");
function jwkToPkcs1(jwk) {
  if (jwk.n == null || jwk.e == null || jwk.d == null || jwk.p == null || jwk.q == null || jwk.dp == null || jwk.dq == null || jwk.qi == null) {
    throw new InvalidParametersError("JWK was missing components");
  }
  const root = new Sequence({
    value: [
      new Integer({ value: 0 }),
      Integer.fromBigInt(bufToBn(fromString2(jwk.n, "base64url"))),
      Integer.fromBigInt(bufToBn(fromString2(jwk.e, "base64url"))),
      Integer.fromBigInt(bufToBn(fromString2(jwk.d, "base64url"))),
      Integer.fromBigInt(bufToBn(fromString2(jwk.p, "base64url"))),
      Integer.fromBigInt(bufToBn(fromString2(jwk.q, "base64url"))),
      Integer.fromBigInt(bufToBn(fromString2(jwk.dp, "base64url"))),
      Integer.fromBigInt(bufToBn(fromString2(jwk.dq, "base64url"))),
      Integer.fromBigInt(bufToBn(fromString2(jwk.qi, "base64url")))
    ]
  });
  const der = root.toBER();
  return new Uint8Array(der, 0, der.byteLength);
}
__name(jwkToPkcs1, "jwkToPkcs1");
function pkixToJwk(bytes3) {
  const { result } = fromBER(bytes3);
  const values = result.valueBlock.value[1].valueBlock.value[0].valueBlock.value;
  return {
    kty: "RSA",
    n: toString2(bnToBuf(values[0].toBigInt()), "base64url"),
    e: toString2(bnToBuf(values[1].toBigInt()), "base64url")
  };
}
__name(pkixToJwk, "pkixToJwk");
function jwkToPkix(jwk) {
  if (jwk.n == null || jwk.e == null) {
    throw new InvalidParametersError("JWK was missing components");
  }
  const root = new Sequence({
    value: [
      new Sequence({
        value: [
          // rsaEncryption
          new ObjectIdentifier({
            value: "1.2.840.113549.1.1.1"
          }),
          new Null()
        ]
      }),
      // this appears to be a bug in asn1js.js - this should really be a Sequence
      // and not a BitString but it generates the same bytes as node-forge so 🤷‍♂️
      new BitString({
        valueHex: new Sequence({
          value: [
            Integer.fromBigInt(bufToBn(fromString2(jwk.n, "base64url"))),
            Integer.fromBigInt(bufToBn(fromString2(jwk.e, "base64url")))
          ]
        }).toBER()
      })
    ]
  });
  const der = root.toBER();
  return new Uint8Array(der, 0, der.byteLength);
}
__name(jwkToPkix, "jwkToPkix");
function bnToBuf(bn) {
  let hex = bn.toString(16);
  if (hex.length % 2 > 0) {
    hex = `0${hex}`;
  }
  const len = hex.length / 2;
  const u8 = new Uint8Array(len);
  let i = 0;
  let j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }
  return u8;
}
__name(bnToBuf, "bnToBuf");
function bufToBn(u8) {
  const hex = [];
  u8.forEach(function(i) {
    let h = i.toString(16);
    if (h.length % 2 > 0) {
      h = `0${h}`;
    }
    hex.push(h);
  });
  return BigInt("0x" + hex.join(""));
}
__name(bufToBn, "bufToBn");
function pkcs1ToRSAPrivateKey(bytes3) {
  const jwk = pkcs1ToJwk(bytes3);
  return jwkToRSAPrivateKey(jwk);
}
__name(pkcs1ToRSAPrivateKey, "pkcs1ToRSAPrivateKey");
function pkixToRSAPublicKey(bytes3) {
  const jwk = pkixToJwk(bytes3);
  if (rsaKeySize(jwk) > MAX_RSA_KEY_SIZE) {
    throw new InvalidPublicKeyError("Key size is too large");
  }
  const hash2 = sha2562(PublicKey.encode({
    Type: KeyType.RSA,
    Data: bytes3
  }));
  const digest2 = create(SHA2_256_CODE, hash2);
  return new RSAPublicKey(jwk, digest2);
}
__name(pkixToRSAPublicKey, "pkixToRSAPublicKey");
function jwkToRSAPrivateKey(jwk) {
  if (rsaKeySize(jwk) > MAX_RSA_KEY_SIZE) {
    throw new InvalidParametersError("Key size is too large");
  }
  const keys = jwkToJWKKeyPair(jwk);
  const hash2 = sha2562(PublicKey.encode({
    Type: KeyType.RSA,
    Data: jwkToPkix(keys.publicKey)
  }));
  const digest2 = create(SHA2_256_CODE, hash2);
  return new RSAPrivateKey(keys.privateKey, new RSAPublicKey(keys.publicKey, digest2));
}
__name(jwkToRSAPrivateKey, "jwkToRSAPrivateKey");
async function generateRSAKeyPair(bits) {
  if (bits > MAX_RSA_KEY_SIZE) {
    throw new InvalidParametersError("Key size is too large");
  }
  const keys = await generateRSAKey(bits);
  const hash2 = sha2562(PublicKey.encode({
    Type: KeyType.RSA,
    Data: jwkToPkix(keys.publicKey)
  }));
  const digest2 = create(SHA2_256_CODE, hash2);
  return new RSAPrivateKey(keys.privateKey, new RSAPublicKey(keys.publicKey, digest2));
}
__name(generateRSAKeyPair, "generateRSAKeyPair");
function jwkToJWKKeyPair(key) {
  if (key == null) {
    throw new InvalidParametersError("Missing key parameter");
  }
  return {
    privateKey: key,
    publicKey: {
      kty: key.kty,
      n: key.n,
      e: key.e
    }
  };
}
__name(jwkToJWKKeyPair, "jwkToJWKKeyPair");

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  static {
    __name(this, "HMAC");
  }
  constructor(hash2, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    hash(hash2);
    const key = toBytes(_key);
    this.iHash = hash2.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash2.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf) {
    exists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    exists(this);
    bytes(out, this.outputLen);
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
var hmac = /* @__PURE__ */ __name((hash2, key, message2) => new HMAC(hash2, key).update(message2).digest(), "hmac");
hmac.create = (hash2, key) => new HMAC(hash2, key);

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/abstract/weierstrass.js
function validateSigVerOpts(opts) {
  if (opts.lowS !== void 0)
    abool("lowS", opts.lowS);
  if (opts.prehash !== void 0)
    abool("prehash", opts.prehash);
}
__name(validateSigVerOpts, "validateSigVerOpts");
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo, Fp: Fp3, a } = opts;
  if (endo) {
    if (!Fp3.eql(a, Fp3.ZERO)) {
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
    }
  }
  return Object.freeze({ ...opts });
}
__name(validatePointOpts, "validatePointOpts");
var { bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports;
var DER = {
  // asn.1 DER encoding utils
  Err: class DERErr extends Error {
    static {
      __name(this, "DERErr");
    }
    constructor(m = "") {
      super(m);
    }
  },
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: /* @__PURE__ */ __name((tag, data) => {
      const { Err: E } = DER;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded(dataLen);
      if (len.length / 2 & 128)
        throw new E("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
      return `${numberToHexUnpadded(tag)}${lenLen}${len}${data}`;
    }, "encode"),
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length3 = 0;
      if (!isLong)
        length3 = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E("tlv.decode(long): zero leftmost byte");
        for (const b of lengthBytes)
          length3 = length3 << 8 | b;
        pos += lenLen;
        if (length3 < 128)
          throw new E("tlv.decode(long): not minimal encoding");
      }
      const v = data.subarray(pos, pos + length3);
      if (v.length !== length3)
        throw new E("tlv.decode: wrong value length");
      return { v, l: data.subarray(pos + length3) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E } = DER;
      if (num < _0n7)
        throw new E("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E("unexpected assertion");
      return hex;
    },
    decode(data) {
      const { Err: E } = DER;
      if (data[0] & 128)
        throw new E("Invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E("Invalid signature integer: unnecessary leading zero");
      return b2n(data);
    }
  },
  toSig(hex) {
    const { Err: E, _int: int, _tlv: tlv } = DER;
    const data = typeof hex === "string" ? h2b(hex) : hex;
    abytes(data);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E("Invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E("Invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const seq = `${tlv.encode(2, int.encode(sig.r))}${tlv.encode(2, int.encode(sig.s))}`;
    return tlv.encode(48, seq);
  }
};
var _0n7 = BigInt(0);
var _1n7 = BigInt(1);
var _2n5 = BigInt(2);
var _3n3 = BigInt(3);
var _4n2 = BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp: Fp3 } = CURVE;
  const Fn = Field(CURVE.n, CURVE.nBitLength);
  const toBytes4 = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a = point.toAffine();
    return concatBytes2(Uint8Array.from([4]), Fp3.toBytes(a.x), Fp3.toBytes(a.y));
  });
  const fromBytes = CURVE.fromBytes || ((bytes3) => {
    const tail = bytes3.subarray(1);
    const x = Fp3.fromBytes(tail.subarray(0, Fp3.BYTES));
    const y = Fp3.fromBytes(tail.subarray(Fp3.BYTES, 2 * Fp3.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp3.sqr(x);
    const x3 = Fp3.mul(x2, x);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x, a)), b);
  }
  __name(weierstrassEquation, "weierstrassEquation");
  if (!Fp3.eql(Fp3.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
    throw new Error("bad generator point: equation left != right");
  function isWithinCurveOrder(num) {
    return inRange(num, _1n7, CURVE.n);
  }
  __name(isWithinCurveOrder, "isWithinCurveOrder");
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (isBytes2(key))
        key = bytesToHex(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("Invalid key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
    }
    if (wrapPrivateKey)
      num = mod(num, N);
    aInRange("private key", num, _1n7, N);
    return num;
  }
  __name(normPrivateKeyToScalar, "normPrivateKeyToScalar");
  function assertPrjPoint(other) {
    if (!(other instanceof Point2))
      throw new Error("ProjectivePoint expected");
  }
  __name(assertPrjPoint, "assertPrjPoint");
  const toAffineMemo = memoized((p, iz) => {
    const { px: x, py: y, pz: z } = p;
    if (Fp3.eql(z, Fp3.ONE))
      return { x, y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp3.ONE : Fp3.inv(z);
    const ax = Fp3.mul(x, iz);
    const ay = Fp3.mul(y, iz);
    const zz = Fp3.mul(z, iz);
    if (is0)
      return { x: Fp3.ZERO, y: Fp3.ZERO };
    if (!Fp3.eql(zz, Fp3.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (CURVE.allowInfinityPoint && !Fp3.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp3.isValid(x) || !Fp3.isValid(y))
      throw new Error("bad point: x or y not FE");
    const left = Fp3.sqr(y);
    const right = weierstrassEquation(x);
    if (!Fp3.eql(left, right))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class Point2 {
    static {
      __name(this, "Point");
    }
    constructor(px, py, pz) {
      this.px = px;
      this.py = py;
      this.pz = pz;
      if (px == null || !Fp3.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp3.isValid(py))
        throw new Error("y required");
      if (pz == null || !Fp3.isValid(pz))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp3.isValid(x) || !Fp3.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point2)
        throw new Error("projective point not allowed");
      const is0 = /* @__PURE__ */ __name((i) => Fp3.eql(i, Fp3.ZERO), "is0");
      if (is0(x) && is0(y))
        return Point2.ZERO;
      return new Point2(x, y, Fp3.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = Fp3.invertBatch(points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P = Point2.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point2, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp3.isOdd)
        return !Fp3.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp3.eql(Fp3.mul(X1, Z2), Fp3.mul(X2, Z1));
      const U2 = Fp3.eql(Fp3.mul(Y1, Z2), Fp3.mul(Y2, Z1));
      return U1 && U2;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point2(this.px, Fp3.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp3.mul(b, _3n3);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      let t0 = Fp3.mul(X1, X1);
      let t1 = Fp3.mul(Y1, Y1);
      let t2 = Fp3.mul(Z1, Z1);
      let t3 = Fp3.mul(X1, Y1);
      t3 = Fp3.add(t3, t3);
      Z3 = Fp3.mul(X1, Z1);
      Z3 = Fp3.add(Z3, Z3);
      X3 = Fp3.mul(a, Z3);
      Y3 = Fp3.mul(b3, t2);
      Y3 = Fp3.add(X3, Y3);
      X3 = Fp3.sub(t1, Y3);
      Y3 = Fp3.add(t1, Y3);
      Y3 = Fp3.mul(X3, Y3);
      X3 = Fp3.mul(t3, X3);
      Z3 = Fp3.mul(b3, Z3);
      t2 = Fp3.mul(a, t2);
      t3 = Fp3.sub(t0, t2);
      t3 = Fp3.mul(a, t3);
      t3 = Fp3.add(t3, Z3);
      Z3 = Fp3.add(t0, t0);
      t0 = Fp3.add(Z3, t0);
      t0 = Fp3.add(t0, t2);
      t0 = Fp3.mul(t0, t3);
      Y3 = Fp3.add(Y3, t0);
      t2 = Fp3.mul(Y1, Z1);
      t2 = Fp3.add(t2, t2);
      t0 = Fp3.mul(t2, t3);
      X3 = Fp3.sub(X3, t0);
      Z3 = Fp3.mul(t2, t1);
      Z3 = Fp3.add(Z3, Z3);
      Z3 = Fp3.add(Z3, Z3);
      return new Point2(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      const a = CURVE.a;
      const b3 = Fp3.mul(CURVE.b, _3n3);
      let t0 = Fp3.mul(X1, X2);
      let t1 = Fp3.mul(Y1, Y2);
      let t2 = Fp3.mul(Z1, Z2);
      let t3 = Fp3.add(X1, Y1);
      let t4 = Fp3.add(X2, Y2);
      t3 = Fp3.mul(t3, t4);
      t4 = Fp3.add(t0, t1);
      t3 = Fp3.sub(t3, t4);
      t4 = Fp3.add(X1, Z1);
      let t5 = Fp3.add(X2, Z2);
      t4 = Fp3.mul(t4, t5);
      t5 = Fp3.add(t0, t2);
      t4 = Fp3.sub(t4, t5);
      t5 = Fp3.add(Y1, Z1);
      X3 = Fp3.add(Y2, Z2);
      t5 = Fp3.mul(t5, X3);
      X3 = Fp3.add(t1, t2);
      t5 = Fp3.sub(t5, X3);
      Z3 = Fp3.mul(a, t4);
      X3 = Fp3.mul(b3, t2);
      Z3 = Fp3.add(X3, Z3);
      X3 = Fp3.sub(t1, Z3);
      Z3 = Fp3.add(t1, Z3);
      Y3 = Fp3.mul(X3, Z3);
      t1 = Fp3.add(t0, t0);
      t1 = Fp3.add(t1, t0);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.mul(b3, t4);
      t1 = Fp3.add(t1, t2);
      t2 = Fp3.sub(t0, t2);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.add(t4, t2);
      t0 = Fp3.mul(t1, t4);
      Y3 = Fp3.add(Y3, t0);
      t0 = Fp3.mul(t5, t4);
      X3 = Fp3.mul(t3, X3);
      X3 = Fp3.sub(X3, t0);
      t0 = Fp3.mul(t3, t1);
      Z3 = Fp3.mul(t5, Z3);
      Z3 = Fp3.add(Z3, t0);
      return new Point2(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point2.ZERO);
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, n, Point2.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      aInRange("scalar", sc, _0n7, CURVE.n);
      const I = Point2.ZERO;
      if (sc === _0n7)
        return I;
      if (sc === _1n7)
        return this;
      const { endo } = CURVE;
      if (!endo)
        return wnaf.unsafeLadder(this, sc);
      let { k1neg, k1, k2neg, k2 } = endo.splitScalar(sc);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n7 || k2 > _0n7) {
        if (k1 & _1n7)
          k1p = k1p.add(d);
        if (k2 & _1n7)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n7;
        k2 >>= _1n7;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point2(Fp3.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo, n: N } = CURVE;
      aInRange("scalar", scalar, _1n7, N);
      let point, fake;
      if (endo) {
        const { k1neg, k1, k2neg, k2 } = endo.splitScalar(scalar);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point2(Fp3.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f } = this.wNAF(scalar);
        point = p;
        fake = f;
      }
      return Point2.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point2.BASE;
      const mul = /* @__PURE__ */ __name((P, a2) => a2 === _0n7 || a2 === _1n7 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2), "mul");
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n7)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point2, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n7)
        return this;
      if (clearCofactor)
        return clearCofactor(Point2, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      abool("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes4(Point2, this, isCompressed);
    }
    toHex(isCompressed = true) {
      abool("isCompressed", isCompressed);
      return bytesToHex(this.toRawBytes(isCompressed));
    }
  }
  Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp3.ONE);
  Point2.ZERO = new Point2(Fp3.ZERO, Fp3.ONE, Fp3.ZERO);
  const _bits = CURVE.nBitLength;
  const wnaf = wNAF(Point2, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
  return {
    CURVE,
    ProjectivePoint: Point2,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
__name(weierstrassPoints, "weierstrassPoints");
function validateOpts3(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
__name(validateOpts3, "validateOpts");
function weierstrass(curveDef) {
  const CURVE = validateOpts3(curveDef);
  const { Fp: Fp3, n: CURVE_ORDER } = CURVE;
  const compressedLen = Fp3.BYTES + 1;
  const uncompressedLen = 2 * Fp3.BYTES + 1;
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  __name(modN, "modN");
  function invN(a) {
    return invert(a, CURVE_ORDER);
  }
  __name(invN, "invN");
  const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a = point.toAffine();
      const x = Fp3.toBytes(a.x);
      const cat = concatBytes2;
      abool("isCompressed", isCompressed);
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp3.toBytes(a.y));
      }
    },
    fromBytes(bytes3) {
      const len = bytes3.length;
      const head = bytes3[0];
      const tail = bytes3.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE(tail);
        if (!inRange(x, _1n7, Fp3.ORDER))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y;
        try {
          y = Fp3.sqrt(y2);
        } catch (sqrtError) {
          const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
          throw new Error("Point is not on curve" + suffix);
        }
        const isYOdd = (y & _1n7) === _1n7;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp3.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp3.fromBytes(tail.subarray(0, Fp3.BYTES));
        const y = Fp3.fromBytes(tail.subarray(Fp3.BYTES, 2 * Fp3.BYTES));
        return { x, y };
      } else {
        throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
      }
    }
  });
  const numToNByteStr = /* @__PURE__ */ __name((num) => bytesToHex(numberToBytesBE(num, CURVE.nByteLength)), "numToNByteStr");
  function isBiggerThanHalfOrder(number4) {
    const HALF = CURVE_ORDER >> _1n7;
    return number4 > HALF;
  }
  __name(isBiggerThanHalfOrder, "isBiggerThanHalfOrder");
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN(-s) : s;
  }
  __name(normalizeS, "normalizeS");
  const slcNum = /* @__PURE__ */ __name((b, from3, to) => bytesToNumberBE(b.slice(from3, to)), "slcNum");
  class Signature {
    static {
      __name(this, "Signature");
    }
    constructor(r, s, recovery) {
      this.r = r;
      this.s = s;
      this.recovery = recovery;
      this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l = CURVE.nByteLength;
      hex = ensureBytes("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r, s } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r, s);
    }
    assertValidity() {
      aInRange("r", this.r, _1n7, CURVE_ORDER);
      aInRange("s", this.s, _1n7, CURVE_ORDER);
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp3.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point2.fromHex(prefix + numToNByteStr(radj));
      const ir = invN(radj);
      const u1 = modN(-h * ir);
      const u2 = modN(s * ir);
      const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes(this.toCompactHex());
    }
    toCompactHex() {
      return numToNByteStr(this.r) + numToNByteStr(this.s);
    }
  }
  const utils = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: /* @__PURE__ */ __name(() => {
      const length3 = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length3), CURVE.n);
    }, "randomPrivateKey"),
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point2.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey(privateKey, isCompressed = true) {
    return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  __name(getPublicKey, "getPublicKey");
  function isProbPub(item) {
    const arr = isBytes2(item);
    const str = typeof item === "string";
    const len = (arr || str) && item.length;
    if (arr)
      return len === compressedLen || len === uncompressedLen;
    if (str)
      return len === 2 * compressedLen || len === 2 * uncompressedLen;
    if (item instanceof Point2)
      return true;
    return false;
  }
  __name(isProbPub, "isProbPub");
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA))
      throw new Error("first arg must be private key");
    if (!isProbPub(publicB))
      throw new Error("second arg must be public key");
    const b = Point2.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  __name(getSharedSecret, "getSharedSecret");
  const bits2int = CURVE.bits2int || function(bytes3) {
    const num = bytesToNumberBE(bytes3);
    const delta = bytes3.length * 8 - CURVE.nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes3) {
    return modN(bits2int(bytes3));
  };
  const ORDER_MASK = bitMask(CURVE.nBitLength);
  function int2octets(num) {
    aInRange(`num < 2^${CURVE.nBitLength}`, num, _0n7, ORDER_MASK);
    return numberToBytesBE(num, CURVE.nByteLength);
  }
  __name(int2octets, "int2octets");
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { hash: hash2, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    validateSigVerOpts(opts);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash2(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null && ent !== false) {
      const e = ent === true ? randomBytes2(Fp3.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes2(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point2.BASE.multiply(k).toAffine();
      const r = modN(q.x);
      if (r === _0n7)
        return;
      const s = modN(ik * modN(m + r * d));
      if (s === _0n7)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n7);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    __name(k2sig, "k2sig");
    return { seed, k2sig };
  }
  __name(prepSig, "prepSig");
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  __name(sign, "sign");
  Point2.BASE._setWindowSize(8);
  function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    validateSigVerOpts(opts);
    const { lowS, prehash } = opts;
    let _sig = void 0;
    let P;
    try {
      if (typeof sg === "string" || isBytes2(sg)) {
        try {
          _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
          _sig = Signature.fromCompact(sg);
        }
      } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
        const { r: r2, s: s2 } = sg;
        _sig = new Signature(r2, s2);
      } else {
        throw new Error("PARSE");
      }
      P = Point2.fromHex(publicKey);
    } catch (error) {
      if (error.message === "PARSE")
        throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
      return false;
    }
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is = invN(s);
    const u1 = modN(h * is);
    const u2 = modN(r * is);
    const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN(R.x);
    return v === r;
  }
  __name(verify, "verify");
  return {
    CURVE,
    getPublicKey,
    getSharedSecret,
    sign,
    verify,
    ProjectivePoint: Point2,
    Signature,
    utils
  };
}
__name(weierstrass, "weierstrass");

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash2) {
  return {
    hash: hash2,
    hmac: /* @__PURE__ */ __name((key, ...msgs) => hmac(hash2, key, concatBytes(...msgs)), "hmac"),
    randomBytes
  };
}
__name(getHash, "getHash");
function createCurve(curveDef, defHash) {
  const create2 = /* @__PURE__ */ __name((hash2) => weierstrass({ ...curveDef, ...getHash(hash2) }), "create");
  return Object.freeze({ ...create2(defHash), create: create2 });
}
__name(createCurve, "createCurve");

// node_modules/@libp2p/webrtc/node_modules/@noble/curves/esm/secp256k1.js
var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var _1n8 = BigInt(1);
var _2n6 = BigInt(2);
var divNearest = /* @__PURE__ */ __name((a, b) => (a + b / _2n6) / b, "divNearest");
function sqrtMod(y) {
  const P = secp256k1P;
  const _3n4 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n4, P) * b3 % P;
  const b9 = pow2(b6, _3n4, P) * b3 % P;
  const b11 = pow2(b9, _2n6, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n4, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n6, P);
  if (!Fp2.eql(Fp2.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
__name(sqrtMod, "sqrtMod");
var Fp2 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
var secp256k1 = createCurve({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  // Seem to be rigid: bitcointalk.org/index.php?topic=289795.msg3183975#msg3183975
  Fp: Fp2,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: secp256k1N,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: true,
  // Allow only low-S signatures by default in sign() and verify()
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: /* @__PURE__ */ __name((k) => {
      const n = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n8 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b2 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b2 * k, n);
      const c2 = divNearest(-b1 * k, n);
      let k1 = mod(k - c1 * a1 - c2 * a2, n);
      let k2 = mod(-c1 * b1 - c2 * b2, n);
      const k1neg = k1 > POW_2_128;
      const k2neg = k2 > POW_2_128;
      if (k1neg)
        k1 = n - k1;
      if (k2neg)
        k2 = n - k2;
      if (k1 > POW_2_128 || k2 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k);
      }
      return { k1neg, k1, k2neg, k2 };
    }, "splitScalar")
  }
}, sha2562);
var _0n8 = BigInt(0);
var Point = secp256k1.ProjectivePoint;

// node_modules/@libp2p/webrtc/node_modules/uint8arrays/dist/src/util/as-uint8array.js
function asUint8Array(buf) {
  return buf;
}
__name(asUint8Array, "asUint8Array");

// node_modules/@libp2p/webrtc/node_modules/uint8arrays/dist/src/concat.js
function concat2(arrays, length3) {
  if (length3 == null) {
    length3 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output3 = allocUnsafe(length3);
  let offset = 0;
  for (const arr of arrays) {
    output3.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output3);
}
__name(concat2, "concat");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/util.js
function isPromise(thing) {
  if (thing == null) {
    return false;
  }
  return typeof thing.then === "function" && typeof thing.catch === "function" && typeof thing.finally === "function";
}
__name(isPromise, "isPromise");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/secp256k1/index.browser.js
function hashAndVerify3(key, sig, msg) {
  const p = sha256.digest(msg instanceof Uint8Array ? msg : msg.subarray());
  if (isPromise(p)) {
    return p.then(({ digest: digest2 }) => secp256k1.verify(sig, digest2, key)).catch((err) => {
      throw new VerificationError(String(err));
    });
  }
  try {
    return secp256k1.verify(sig, p.digest, key);
  } catch (err) {
    throw new VerificationError(String(err));
  }
}
__name(hashAndVerify3, "hashAndVerify");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/secp256k1/secp256k1.js
var Secp256k1PublicKey = class {
  static {
    __name(this, "Secp256k1PublicKey");
  }
  type = "secp256k1";
  raw;
  _key;
  constructor(key) {
    this._key = validateSecp256k1PublicKey(key);
    this.raw = compressSecp256k1PublicKey(this._key);
  }
  toMultihash() {
    return identity.digest(publicKeyToProtobuf(this));
  }
  toCID() {
    return CID.createV1(114, this.toMultihash());
  }
  toString() {
    return base58btc.encode(this.toMultihash().bytes).substring(1);
  }
  equals(key) {
    if (key == null || !(key.raw instanceof Uint8Array)) {
      return false;
    }
    return equals3(this.raw, key.raw);
  }
  verify(data, sig) {
    return hashAndVerify3(this._key, sig, data);
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/secp256k1/utils.js
function unmarshalSecp256k1PublicKey(bytes3) {
  return new Secp256k1PublicKey(bytes3);
}
__name(unmarshalSecp256k1PublicKey, "unmarshalSecp256k1PublicKey");
function compressSecp256k1PublicKey(key) {
  const point = secp256k1.ProjectivePoint.fromHex(key).toRawBytes(true);
  return point;
}
__name(compressSecp256k1PublicKey, "compressSecp256k1PublicKey");
function validateSecp256k1PublicKey(key) {
  try {
    secp256k1.ProjectivePoint.fromHex(key);
    return key;
  } catch (err) {
    throw new InvalidPublicKeyError(String(err));
  }
}
__name(validateSecp256k1PublicKey, "validateSecp256k1PublicKey");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/crypto/dist/src/keys/index.js
function publicKeyFromProtobuf(buf) {
  const { Type, Data } = PublicKey.decode(buf);
  const data = Data ?? new Uint8Array();
  switch (Type) {
    case KeyType.RSA:
      return pkixToRSAPublicKey(data);
    case KeyType.Ed25519:
      return unmarshalEd25519PublicKey(data);
    case KeyType.secp256k1:
      return unmarshalSecp256k1PublicKey(data);
    default:
      throw new UnsupportedKeyTypeError();
  }
}
__name(publicKeyFromProtobuf, "publicKeyFromProtobuf");
function publicKeyFromMultihash(digest2) {
  const { Type, Data } = PublicKey.decode(digest2.digest);
  const data = Data ?? new Uint8Array();
  switch (Type) {
    case KeyType.Ed25519:
      return unmarshalEd25519PublicKey(data);
    case KeyType.secp256k1:
      return unmarshalSecp256k1PublicKey(data);
    default:
      throw new UnsupportedKeyTypeError();
  }
}
__name(publicKeyFromMultihash, "publicKeyFromMultihash");
function publicKeyToProtobuf(key) {
  return PublicKey.encode({
    Type: KeyType[key.type],
    Data: key.raw
  });
}
__name(publicKeyToProtobuf, "publicKeyToProtobuf");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/peer-id/dist/src/peer-id.js
var inspect = Symbol.for("nodejs.util.inspect.custom");
var LIBP2P_KEY_CODE = 114;
var PeerIdImpl = class {
  static {
    __name(this, "PeerIdImpl");
  }
  type;
  multihash;
  publicKey;
  string;
  constructor(init) {
    this.type = init.type;
    this.multihash = init.multihash;
    Object.defineProperty(this, "string", {
      enumerable: false,
      writable: true
    });
  }
  get [Symbol.toStringTag]() {
    return `PeerId(${this.toString()})`;
  }
  [peerIdSymbol] = true;
  toString() {
    if (this.string == null) {
      this.string = base58btc.encode(this.multihash.bytes).slice(1);
    }
    return this.string;
  }
  toMultihash() {
    return this.multihash;
  }
  // return self-describing String representation
  // in default format from RFC 0001: https://github.com/libp2p/specs/pull/209
  toCID() {
    return CID.createV1(LIBP2P_KEY_CODE, this.multihash);
  }
  toJSON() {
    return this.toString();
  }
  /**
   * Checks the equality of `this` peer against a given PeerId
   */
  equals(id) {
    if (id == null) {
      return false;
    }
    if (id instanceof Uint8Array) {
      return equals3(this.multihash.bytes, id);
    } else if (typeof id === "string") {
      return this.toString() === id;
    } else if (id?.toMultihash()?.bytes != null) {
      return equals3(this.multihash.bytes, id.toMultihash().bytes);
    } else {
      throw new Error("not valid Id");
    }
  }
  /**
   * Returns PeerId as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```TypeScript
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
var RSAPeerId = class extends PeerIdImpl {
  static {
    __name(this, "RSAPeerId");
  }
  type = "RSA";
  publicKey;
  constructor(init) {
    super({ ...init, type: "RSA" });
    this.publicKey = init.publicKey;
  }
};
var Ed25519PeerId = class extends PeerIdImpl {
  static {
    __name(this, "Ed25519PeerId");
  }
  type = "Ed25519";
  publicKey;
  constructor(init) {
    super({ ...init, type: "Ed25519" });
    this.publicKey = init.publicKey;
  }
};
var Secp256k1PeerId = class extends PeerIdImpl {
  static {
    __name(this, "Secp256k1PeerId");
  }
  type = "secp256k1";
  publicKey;
  constructor(init) {
    super({ ...init, type: "secp256k1" });
    this.publicKey = init.publicKey;
  }
};
var TRANSPORT_IPFS_GATEWAY_HTTP_CODE = 2336;
var URLPeerId = class {
  static {
    __name(this, "URLPeerId");
  }
  type = "url";
  multihash;
  publicKey;
  url;
  constructor(url) {
    this.url = url.toString();
    this.multihash = identity.digest(fromString2(this.url));
  }
  [inspect]() {
    return `PeerId(${this.url})`;
  }
  [peerIdSymbol] = true;
  toString() {
    return this.toCID().toString();
  }
  toMultihash() {
    return this.multihash;
  }
  toCID() {
    return CID.createV1(TRANSPORT_IPFS_GATEWAY_HTTP_CODE, this.toMultihash());
  }
  toJSON() {
    return this.toString();
  }
  equals(other) {
    if (other == null) {
      return false;
    }
    if (other instanceof Uint8Array) {
      other = toString2(other);
    }
    return other.toString() === this.toString();
  }
};

// node_modules/@libp2p/webrtc/node_modules/@libp2p/peer-id/dist/src/index.js
function peerIdFromString(str, decoder) {
  let multihash;
  if (str.charAt(0) === "1" || str.charAt(0) === "Q") {
    multihash = decode4(base58btc.decode(`z${str}`));
  } else {
    if (decoder == null) {
      throw new InvalidParametersError('Please pass a multibase decoder for strings that do not start with "1" or "Q"');
    }
    multihash = decode4(decoder.decode(str));
  }
  return peerIdFromMultihash(multihash);
}
__name(peerIdFromString, "peerIdFromString");
function peerIdFromPublicKey(publicKey) {
  if (publicKey.type === "Ed25519") {
    return new Ed25519PeerId({
      multihash: publicKey.toCID().multihash,
      publicKey
    });
  } else if (publicKey.type === "secp256k1") {
    return new Secp256k1PeerId({
      multihash: publicKey.toCID().multihash,
      publicKey
    });
  } else if (publicKey.type === "RSA") {
    return new RSAPeerId({
      multihash: publicKey.toCID().multihash,
      publicKey
    });
  }
  throw new UnsupportedKeyTypeError();
}
__name(peerIdFromPublicKey, "peerIdFromPublicKey");
function peerIdFromMultihash(multihash) {
  if (isSha256Multihash(multihash)) {
    return new RSAPeerId({ multihash });
  } else if (isIdentityMultihash(multihash)) {
    try {
      const publicKey = publicKeyFromMultihash(multihash);
      if (publicKey.type === "Ed25519") {
        return new Ed25519PeerId({ multihash, publicKey });
      } else if (publicKey.type === "secp256k1") {
        return new Secp256k1PeerId({ multihash, publicKey });
      }
    } catch (err) {
      const url = toString2(multihash.digest);
      return new URLPeerId(new URL(url));
    }
  }
  throw new InvalidMultihashError("Supplied PeerID Multihash is invalid");
}
__name(peerIdFromMultihash, "peerIdFromMultihash");
function isIdentityMultihash(multihash) {
  return multihash.code === identity.code;
}
__name(isIdentityMultihash, "isIdentityMultihash");
function isSha256Multihash(multihash) {
  return multihash.code === sha256.code;
}
__name(isSha256Multihash, "isSha256Multihash");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/is-ip/lib/parser.js
var Parser = class {
  static {
    __name(this, "Parser");
  }
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
    const readGroups = /* @__PURE__ */ __name((groups) => {
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
    }, "readGroups");
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

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/is-ip/lib/parse.js
var MAX_IPV6_LENGTH = 45;
var MAX_IPV4_LENGTH = 15;
var parser = new Parser();
function parseIPv4(input) {
  if (input.length > MAX_IPV4_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv4Addr());
}
__name(parseIPv4, "parseIPv4");
function parseIPv6(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv6Addr());
}
__name(parseIPv6, "parseIPv6");
function parseIP(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPAddr());
}
__name(parseIP, "parseIP");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/netmask/dist/src/ip.js
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

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/is-ip/lib/is-ip.js
function isIPv4(input) {
  return Boolean(parseIPv4(input));
}
__name(isIPv4, "isIPv4");
function isIPv6(input) {
  return Boolean(parseIPv6(input));
}
__name(isIPv6, "isIPv6");
function isIP(input) {
  return Boolean(parseIP(input));
}
__name(isIP, "isIP");

// node_modules/@libp2p/webrtc/node_modules/@multiformats/multiaddr/dist/src/ip.js
var isV4 = isIPv4;
var isV6 = isIPv6;
var toBytes2 = /* @__PURE__ */ __name(function(ip) {
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
        v4Buffer = toBytes2(sections[i]);
        sections[i] = toString2(v4Buffer.slice(0, 2), "base16");
      }
      if (v4Buffer != null && ++i < 8) {
        sections.splice(i, 0, toString2(v4Buffer.slice(2, 4), "base16"));
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
}, "toBytes");
var toString3 = /* @__PURE__ */ __name(function(buf, offset = 0, length3) {
  offset = ~~offset;
  length3 = length3 ?? buf.length - offset;
  const view = new DataView(buf.buffer);
  if (length3 === 4) {
    const result = [];
    for (let i = 0; i < length3; i++) {
      result.push(buf[offset + i]);
    }
    return result.join(".");
  }
  if (length3 === 16) {
    const result = [];
    for (let i = 0; i < length3; i += 2) {
      result.push(view.getUint16(offset + i).toString(16));
    }
    return result.join(":").replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3").replace(/:{3,4}/, "::");
  }
  return "";
}, "toString");

// node_modules/@libp2p/webrtc/node_modules/@multiformats/multiaddr/dist/src/protocols-table.js
var V = -1;
var names = {};
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
  names[proto.name] = proto;
});
function createProtocol(code2, size, name2, resolvable, path) {
  return {
    code: code2,
    size,
    name: name2,
    resolvable: Boolean(resolvable),
    path: Boolean(path)
  };
}
__name(createProtocol, "createProtocol");
function getProtocol(proto) {
  if (typeof proto === "number") {
    if (codes[proto] != null) {
      return codes[proto];
    }
    throw new Error(`no protocol with code: ${proto}`);
  } else if (typeof proto === "string") {
    if (names[proto] != null) {
      return names[proto];
    }
    throw new Error(`no protocol with name: ${proto}`);
  }
  throw new Error(`invalid protocol id type: ${typeof proto}`);
}
__name(getProtocol, "getProtocol");

// node_modules/@libp2p/webrtc/node_modules/@multiformats/multiaddr/dist/src/convert.js
var ip4Protocol = getProtocol("ip4");
var ip6Protocol = getProtocol("ip6");
var ipcidrProtocol = getProtocol("ipcidr");
function convertToString(proto, buf) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
    // ipv4
    case 41:
      return bytes2ip(buf);
    case 42:
      return bytes2str(buf);
    case 6:
    // tcp
    case 273:
    // udp
    case 33:
    // dccp
    case 132:
      return bytes2port(buf).toString();
    case 53:
    // dns
    case 54:
    // dns4
    case 55:
    // dns6
    case 56:
    // dnsaddr
    case 400:
    // unix
    case 449:
    // sni
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
      return toString2(buf, "base16");
  }
}
__name(convertToString, "convertToString");
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
    // tcp
    case 273:
    // udp
    case 33:
    // dccp
    case 132:
      return port2bytes(parseInt(str, 10));
    case 53:
    // dns
    case 54:
    // dns4
    case 55:
    // dns6
    case 56:
    // dnsaddr
    case 400:
    // unix
    case 449:
    // sni
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
      return fromString2(str, "base16");
  }
}
__name(convertToBytes, "convertToBytes");
var decoders = Object.values(bases).map((c) => c.decoder);
var anybaseDecoder = function() {
  let acc = decoders[0].or(decoders[1]);
  decoders.slice(2).forEach((d) => acc = acc.or(d));
  return acc;
}();
function ip2bytes(ipString) {
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return toBytes2(ipString);
}
__name(ip2bytes, "ip2bytes");
function bytes2ip(ipBuff) {
  const ipString = toString3(ipBuff, 0, ipBuff.length);
  if (ipString == null) {
    throw new Error("ipBuff is required");
  }
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return ipString;
}
__name(bytes2ip, "bytes2ip");
function port2bytes(port) {
  const buf = new ArrayBuffer(2);
  const view = new DataView(buf);
  view.setUint16(0, port);
  return new Uint8Array(buf);
}
__name(port2bytes, "port2bytes");
function bytes2port(buf) {
  const view = new DataView(buf.buffer);
  return view.getUint16(buf.byteOffset);
}
__name(bytes2port, "bytes2port");
function str2bytes(str) {
  const buf = fromString2(str);
  const size = Uint8Array.from(encode4(buf.length));
  return concat2([size, buf], size.length + buf.length);
}
__name(str2bytes, "str2bytes");
function bytes2str(buf) {
  const size = decode5(buf);
  buf = buf.slice(encodingLength2(size));
  if (buf.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString2(buf);
}
__name(bytes2str, "bytes2str");
function mh2bytes(hash2) {
  let mh;
  if (hash2[0] === "Q" || hash2[0] === "1") {
    mh = decode4(base58btc.decode(`z${hash2}`)).bytes;
  } else {
    mh = CID.parse(hash2).multihash.bytes;
  }
  const size = Uint8Array.from(encode4(mh.length));
  return concat2([size, mh], size.length + mh.length);
}
__name(mh2bytes, "mh2bytes");
function mb2bytes(mbstr) {
  const mb = anybaseDecoder.decode(mbstr);
  const size = Uint8Array.from(encode4(mb.length));
  return concat2([size, mb], size.length + mb.length);
}
__name(mb2bytes, "mb2bytes");
function bytes2mb(buf) {
  const size = decode5(buf);
  const hash2 = buf.slice(encodingLength2(size));
  if (hash2.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return "u" + toString2(hash2, "base64url");
}
__name(bytes2mb, "bytes2mb");
function bytes2mh(buf) {
  const size = decode5(buf);
  const address = buf.slice(encodingLength2(size));
  if (address.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString2(address, "base58btc");
}
__name(bytes2mh, "bytes2mh");
function onion2bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 16) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion address.`);
  }
  const buf = base32.decode("b" + addr[0]);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat2([buf, portBuf], buf.length + portBuf.length);
}
__name(onion2bytes, "onion2bytes");
function onion32bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 56) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`);
  }
  const buf = base32.decode(`b${addr[0]}`);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat2([buf, portBuf], buf.length + portBuf.length);
}
__name(onion32bytes, "onion32bytes");
function bytes2onion(buf) {
  const addrBytes = buf.slice(0, buf.length - 2);
  const portBytes = buf.slice(buf.length - 2);
  const addr = toString2(addrBytes, "base32");
  const port = bytes2port(portBytes);
  return `${addr}:${port}`;
}
__name(bytes2onion, "bytes2onion");

// node_modules/@libp2p/webrtc/node_modules/@multiformats/multiaddr/dist/src/codec.js
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
__name(stringToMultiaddrParts, "stringToMultiaddrParts");
function bytesToMultiaddrParts(bytes3) {
  const tuples = [];
  const stringTuples = [];
  let path = null;
  let i = 0;
  while (i < bytes3.length) {
    const code2 = decode5(bytes3, i);
    const n = encodingLength2(code2);
    const p = getProtocol(code2);
    const size = sizeForAddr(p, bytes3.slice(i + n));
    if (size === 0) {
      tuples.push([code2]);
      stringTuples.push([code2]);
      i += n;
      continue;
    }
    const addr = bytes3.slice(i + n, i + n + size);
    i += size + n;
    if (i > bytes3.length) {
      throw ParseError("Invalid address Uint8Array: " + toString2(bytes3, "base16"));
    }
    tuples.push([code2, addr]);
    const stringAddr = convertToString(code2, addr);
    stringTuples.push([code2, stringAddr]);
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
__name(bytesToMultiaddrParts, "bytesToMultiaddrParts");
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
__name(stringTuplesToString, "stringTuplesToString");
function tuplesToBytes(tuples) {
  return concat2(tuples.map((tup) => {
    const proto = getProtocol(tup[0]);
    let buf = Uint8Array.from(encode4(proto.code));
    if (tup.length > 1 && tup[1] != null) {
      buf = concat2([buf, tup[1]]);
    }
    return buf;
  }));
}
__name(tuplesToBytes, "tuplesToBytes");
function sizeForAddr(p, addr) {
  if (p.size > 0) {
    return p.size / 8;
  } else if (p.size === 0) {
    return 0;
  } else {
    const size = decode5(addr instanceof Uint8Array ? addr : Uint8Array.from(addr));
    return size + encodingLength2(size);
  }
}
__name(sizeForAddr, "sizeForAddr");
function cleanPath(str) {
  return "/" + str.trim().split("/").filter((a) => a).join("/");
}
__name(cleanPath, "cleanPath");
function ParseError(str) {
  return new Error("Error parsing address: " + str);
}
__name(ParseError, "ParseError");

// node_modules/@libp2p/webrtc/node_modules/@multiformats/multiaddr/dist/src/multiaddr.js
var inspect2 = Symbol.for("nodejs.util.inspect.custom");
var symbol = Symbol.for("@multiformats/js-multiaddr/multiaddr");
var DNS_CODES = [
  getProtocol("dns").code,
  getProtocol("dns4").code,
  getProtocol("dns6").code,
  getProtocol("dnsaddr").code
];
var NoAvailableResolverError = class extends Error {
  static {
    __name(this, "NoAvailableResolverError");
  }
  constructor(message2 = "No available resolver") {
    super(message2);
    this.name = "NoAvailableResolverError";
  }
};
var Multiaddr = class _Multiaddr {
  static {
    __name(this, "Multiaddr");
  }
  bytes;
  #string;
  #tuples;
  #stringTuples;
  #path;
  [symbol] = true;
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
    for (const [code2, value] of this.stringTuples()) {
      if (code2 === ip6zone.code) {
        zone = `%${value ?? ""}`;
      }
      if (DNS_CODES.includes(code2)) {
        transport = tcp.name;
        port = 443;
        host = `${value ?? ""}${zone}`;
        family = code2 === dns6.code ? 6 : 4;
      }
      if (code2 === tcp.code || code2 === udp.code) {
        transport = getProtocol(code2).name;
        port = parseInt(value ?? "");
      }
      if (code2 === ip4.code || code2 === ip6.code) {
        transport = getProtocol(code2).name;
        host = `${value ?? ""}${zone}`;
        family = code2 === ip6.code ? 6 : 4;
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
    return this.#tuples.map(([code2]) => Object.assign({}, getProtocol(code2)));
  }
  protoCodes() {
    return this.#tuples.map(([code2]) => code2);
  }
  protoNames() {
    return this.#tuples.map(([code2]) => getProtocol(code2).name);
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
  decapsulateCode(code2) {
    const tuples = this.tuples();
    for (let i = tuples.length - 1; i >= 0; i--) {
      if (tuples[i][0] === code2) {
        return new _Multiaddr(tuplesToBytes(tuples.slice(0, i)));
      }
    }
    return this;
  }
  getPeerId() {
    try {
      let tuples = [];
      this.stringTuples().forEach(([code2, name2]) => {
        if (code2 === names.p2p.code) {
          tuples.push([code2, name2]);
        }
        if (code2 === names["p2p-circuit"].code) {
          tuples = [];
        }
      });
      const tuple = tuples.pop();
      if (tuple?.[1] != null) {
        const peerIdStr = tuple[1];
        if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
          return toString2(base58btc.decode(`z${peerIdStr}`), "base58btc");
        }
        return toString2(CID.parse(peerIdStr).multihash.bytes, "base58btc");
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
    return equals3(this.bytes, addr.bytes);
  }
  async resolve(options) {
    const resolvableProto = this.protos().find((p) => p.resolvable);
    if (resolvableProto == null) {
      return [this];
    }
    const resolver = resolvers.get(resolvableProto.name);
    if (resolver == null) {
      throw new NoAvailableResolverError(`no available resolver for ${resolvableProto.name}`);
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

// node_modules/@libp2p/webrtc/node_modules/@multiformats/multiaddr/dist/src/index.js
var resolvers = /* @__PURE__ */ new Map();
function isMultiaddr(value) {
  return Boolean(value?.[symbol]);
}
__name(isMultiaddr, "isMultiaddr");
function multiaddr(addr) {
  return new Multiaddr(addr);
}
__name(multiaddr, "multiaddr");

// node_modules/@libp2p/webrtc/node_modules/@multiformats/multiaddr-matcher/dist/src/index.js
var toParts = /* @__PURE__ */ __name((ma) => {
  return ma.toString().split("/").slice(1);
}, "toParts");
var func = /* @__PURE__ */ __name((fn) => {
  return {
    match: /* @__PURE__ */ __name((vals) => {
      if (vals.length < 1) {
        return false;
      }
      if (fn(vals[0])) {
        return vals.slice(1);
      }
      return false;
    }, "match"),
    pattern: "fn"
  };
}, "func");
var literal = /* @__PURE__ */ __name((str) => {
  return {
    match: /* @__PURE__ */ __name((vals) => func((val) => val === str).match(vals), "match"),
    pattern: str
  };
}, "literal");
var string2 = /* @__PURE__ */ __name(() => {
  return {
    match: /* @__PURE__ */ __name((vals) => func((val) => typeof val === "string").match(vals), "match"),
    pattern: "{string}"
  };
}, "string");
var number2 = /* @__PURE__ */ __name(() => {
  return {
    match: /* @__PURE__ */ __name((vals) => func((val) => !isNaN(parseInt(val))).match(vals), "match"),
    pattern: "{number}"
  };
}, "number");
var peerId = /* @__PURE__ */ __name(() => {
  return {
    match: /* @__PURE__ */ __name((vals) => {
      if (vals.length < 2) {
        return false;
      }
      if (vals[0] !== "p2p" && vals[0] !== "ipfs") {
        return false;
      }
      if (vals[1].startsWith("Q") || vals[1].startsWith("1")) {
        try {
          base58btc.decode(`z${vals[1]}`);
        } catch (err) {
          return false;
        }
      } else {
        return false;
      }
      return vals.slice(2);
    }, "match"),
    pattern: "/p2p/{peerid}"
  };
}, "peerId");
var certhash = /* @__PURE__ */ __name(() => {
  return {
    match: /* @__PURE__ */ __name((vals) => {
      if (vals.length < 2) {
        return false;
      }
      if (vals[0] !== "certhash") {
        return false;
      }
      try {
        base64url.decode(vals[1]);
      } catch {
        return false;
      }
      return vals.slice(2);
    }, "match"),
    pattern: "/certhash/{certhash}"
  };
}, "certhash");
var optional = /* @__PURE__ */ __name((matcher) => {
  return {
    match: /* @__PURE__ */ __name((vals) => {
      const result = matcher.match(vals);
      if (result === false) {
        return vals;
      }
      return result;
    }, "match"),
    pattern: `optional(${matcher.pattern})`
  };
}, "optional");
var or2 = /* @__PURE__ */ __name((...matchers) => {
  return {
    match: /* @__PURE__ */ __name((vals) => {
      let matches;
      for (const matcher of matchers) {
        const result = matcher.match(vals);
        if (result === false) {
          continue;
        }
        if (matches == null || result.length < matches.length) {
          matches = result;
        }
      }
      if (matches == null) {
        return false;
      }
      return matches;
    }, "match"),
    pattern: `or(${matchers.map((m) => m.pattern).join(", ")})`
  };
}, "or");
var and = /* @__PURE__ */ __name((...matchers) => {
  return {
    match: /* @__PURE__ */ __name((vals) => {
      for (const matcher of matchers) {
        const result = matcher.match(vals);
        if (result === false) {
          return false;
        }
        vals = result;
      }
      return vals;
    }, "match"),
    pattern: `and(${matchers.map((m) => m.pattern).join(", ")})`
  };
}, "and");
function fmt(...matchers) {
  function match(ma) {
    let parts = toParts(ma);
    for (const matcher of matchers) {
      const result = matcher.match(parts);
      if (result === false) {
        return false;
      }
      parts = result;
    }
    return parts;
  }
  __name(match, "match");
  function matches(ma) {
    const result = match(ma);
    return result !== false;
  }
  __name(matches, "matches");
  function exactMatch(ma) {
    const result = match(ma);
    if (result === false) {
      return false;
    }
    return result.length === 0;
  }
  __name(exactMatch, "exactMatch");
  return {
    matches,
    exactMatch
  };
}
__name(fmt, "fmt");
var _DNS4 = and(literal("dns4"), string2());
var _DNS6 = and(literal("dns6"), string2());
var _DNSADDR = and(literal("dnsaddr"), string2());
var _DNS = and(literal("dns"), string2());
var DNS4 = fmt(_DNS4, optional(peerId()));
var DNS6 = fmt(_DNS6, optional(peerId()));
var DNSADDR = fmt(_DNSADDR, optional(peerId()));
var DNS = fmt(or2(_DNS, _DNSADDR, _DNS4, _DNS6), optional(peerId()));
var _IP4 = and(literal("ip4"), func(isIPv4));
var _IP6 = and(literal("ip6"), func(isIPv6));
var _IP = or2(_IP4, _IP6);
var _IP_OR_DOMAIN = or2(_IP, _DNS, _DNS4, _DNS6, _DNSADDR);
var IP_OR_DOMAIN = fmt(or2(_IP, and(or2(_DNS, _DNSADDR, _DNS4, _DNS6), optional(peerId()))));
var IP4 = fmt(_IP4);
var IP6 = fmt(_IP6);
var IP = fmt(_IP);
var _TCP = and(_IP_OR_DOMAIN, literal("tcp"), number2());
var _UDP = and(_IP_OR_DOMAIN, literal("udp"), number2());
var TCP = fmt(and(_TCP, optional(peerId())));
var UDP = fmt(_UDP);
var _QUIC = and(_UDP, literal("quic"));
var _QUICV1 = and(_UDP, literal("quic-v1"));
var QUIC_V0_OR_V1 = or2(_QUIC, _QUICV1);
var QUIC = fmt(_QUIC);
var QUICV1 = fmt(_QUICV1);
var _WEB = or2(_IP_OR_DOMAIN, _TCP, _UDP, _QUIC, _QUICV1);
var _WebSockets = or2(and(_WEB, literal("ws"), optional(peerId())));
var WebSockets = fmt(_WebSockets);
var _WebSocketsSecure = or2(and(_WEB, literal("wss"), optional(peerId())), and(_WEB, literal("tls"), literal("ws"), optional(peerId())));
var WebSocketsSecure = fmt(_WebSocketsSecure);
var _WebRTCDirect = and(_UDP, literal("webrtc-direct"), optional(certhash()), optional(certhash()), optional(peerId()));
var WebRTCDirect = fmt(_WebRTCDirect);
var _WebTransport = and(_QUICV1, literal("webtransport"), optional(certhash()), optional(certhash()), optional(peerId()));
var WebTransport = fmt(_WebTransport);
var _P2P = or2(_WebSockets, _WebSocketsSecure, and(_TCP, optional(peerId())), and(QUIC_V0_OR_V1, optional(peerId())), and(_IP_OR_DOMAIN, optional(peerId())), _WebRTCDirect, _WebTransport, peerId());
var P2P = fmt(_P2P);
var _Circuit = and(_P2P, literal("p2p-circuit"), peerId());
var Circuit = fmt(_Circuit);
var _WebRTC = or2(and(_P2P, literal("p2p-circuit"), literal("webrtc"), optional(peerId())), and(_P2P, literal("webrtc"), optional(peerId())), literal("webrtc"));
var WebRTC = fmt(_WebRTC);
var _HTTP = or2(and(_IP_OR_DOMAIN, literal("tcp"), number2(), literal("http"), optional(peerId())), and(_IP_OR_DOMAIN, literal("http"), optional(peerId())));
var HTTP = fmt(_HTTP);
var _HTTPS = or2(and(_IP_OR_DOMAIN, literal("tcp"), or2(and(literal("443"), literal("http")), and(number2(), literal("https"))), optional(peerId())), and(_IP_OR_DOMAIN, literal("tls"), literal("http"), optional(peerId())), and(_IP_OR_DOMAIN, literal("https"), optional(peerId())));
var HTTPS = fmt(_HTTPS);

// node_modules/@libp2p/webrtc/node_modules/detect-browser/es/index.js
var __spreadArray = function(to, from3, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from3.length, ar; i < l; i++) {
    if (ar || !(i in from3)) {
      if (!ar) ar = Array.prototype.slice.call(from3, 0, i);
      ar[i] = from3[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from3));
};
var BrowserInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BrowserInfo2(name2, version, os) {
      this.name = name2;
      this.version = version;
      this.os = os;
      this.type = "browser";
    }
    __name(BrowserInfo2, "BrowserInfo");
    return BrowserInfo2;
  }()
);
var NodeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function NodeInfo2(version) {
      this.version = version;
      this.type = "node";
      this.name = "node";
      this.os = process.platform;
    }
    __name(NodeInfo2, "NodeInfo");
    return NodeInfo2;
  }()
);
var SearchBotDeviceInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function SearchBotDeviceInfo2(name2, version, os, bot) {
      this.name = name2;
      this.version = version;
      this.os = os;
      this.bot = bot;
      this.type = "bot-device";
    }
    __name(SearchBotDeviceInfo2, "SearchBotDeviceInfo");
    return SearchBotDeviceInfo2;
  }()
);
var BotInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function BotInfo2() {
      this.type = "bot";
      this.bot = true;
      this.name = "bot";
      this.version = null;
      this.os = null;
    }
    __name(BotInfo2, "BotInfo");
    return BotInfo2;
  }()
);
var ReactNativeInfo = (
  /** @class */
  /* @__PURE__ */ function() {
    function ReactNativeInfo2() {
      this.type = "react-native";
      this.name = "react-native";
      this.version = null;
      this.os = null;
    }
    __name(ReactNativeInfo2, "ReactNativeInfo");
    return ReactNativeInfo2;
  }()
);
var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
var SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/;
var REQUIRED_VERSION_PARTS = 3;
var userAgentRules = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", SEARCHBOX_UA_REGEX]
];
var operatingSystemRules = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function detect(userAgent) {
  if (!!userAgent) {
    return parseUserAgent(userAgent);
  }
  if (typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return new ReactNativeInfo();
  }
  if (typeof navigator !== "undefined") {
    return parseUserAgent(navigator.userAgent);
  }
  return getNodeVersion();
}
__name(detect, "detect");
function matchUserAgent(ua) {
  return ua !== "" && userAgentRules.reduce(function(matched, _a2) {
    var browser2 = _a2[0], regex = _a2[1];
    if (matched) {
      return matched;
    }
    var uaMatch = regex.exec(ua);
    return !!uaMatch && [browser2, uaMatch];
  }, false);
}
__name(matchUserAgent, "matchUserAgent");
function parseUserAgent(ua) {
  var matchedRule = matchUserAgent(ua);
  if (!matchedRule) {
    return null;
  }
  var name2 = matchedRule[0], match = matchedRule[1];
  if (name2 === "searchbot") {
    return new BotInfo();
  }
  var versionParts = match[1] && match[1].split(".").join("_").split("_").slice(0, 3);
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = __spreadArray(__spreadArray([], versionParts, true), createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length), true);
    }
  } else {
    versionParts = [];
  }
  var version = versionParts.join(".");
  var os = detectOS(ua);
  var searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua);
  if (searchBotMatch && searchBotMatch[1]) {
    return new SearchBotDeviceInfo(name2, version, os, searchBotMatch[1]);
  }
  return new BrowserInfo(name2, version, os);
}
__name(parseUserAgent, "parseUserAgent");
function detectOS(ua) {
  for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    var _a2 = operatingSystemRules[ii], os = _a2[0], regex = _a2[1];
    var match = regex.exec(ua);
    if (match) {
      return os;
    }
  }
  return null;
}
__name(detectOS, "detectOS");
function getNodeVersion() {
  var isNode = typeof process !== "undefined" && process.version;
  return isNode ? new NodeInfo(process.version.slice(1)) : null;
}
__name(getNodeVersion, "getNodeVersion");
function createVersionParts(count) {
  var output3 = [];
  for (var ii = 0; ii < count; ii++) {
    output3.push("0");
  }
  return output3;
}
__name(createVersionParts, "createVersionParts");

// node_modules/@libp2p/webrtc/node_modules/p-defer/index.js
function pDefer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
__name(pDefer, "pDefer");

// node_modules/@libp2p/webrtc/node_modules/p-timeout/index.js
var TimeoutError2 = class extends Error {
  static {
    __name(this, "TimeoutError");
  }
  constructor(message2) {
    super(message2);
    this.name = "TimeoutError";
  }
};
var AbortError = class extends Error {
  static {
    __name(this, "AbortError");
  }
  constructor(message2) {
    super();
    this.name = "AbortError";
    this.message = message2;
  }
};
var getDOMException = /* @__PURE__ */ __name((errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage), "getDOMException");
var getAbortedReason = /* @__PURE__ */ __name((signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
}, "getAbortedReason");
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message: message2,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }
    const timeoutError = new TimeoutError2();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message2 === false) {
        resolve();
      } else if (message2 instanceof Error) {
        reject(message2);
      } else {
        timeoutError.message = message2 ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}
__name(pTimeout, "pTimeout");

// node_modules/@libp2p/webrtc/dist/src/constants.js
var DEFAULT_ICE_SERVERS = [
  "stun:stun.l.google.com:19302",
  "stun:global.stun.twilio.com:3478",
  "stun:stun.cloudflare.com:3478",
  "stun:stun.services.mozilla.com:3478"
];

// node_modules/@libp2p/webrtc/dist/src/util.js
var browser = detect();
var isFirefox = browser != null && browser.name === "firefox";
var nopSource = /* @__PURE__ */ __name(async function* nop() {
}, "nop");
var nopSink = /* @__PURE__ */ __name(async (_) => {
}, "nopSink");
var DATA_CHANNEL_DRAIN_TIMEOUT = 30 * 1e3;
function drainAndClose(channel, direction, drainTimeout = DATA_CHANNEL_DRAIN_TIMEOUT, options) {
  if (channel.readyState !== "open") {
    return;
  }
  void Promise.resolve().then(async () => {
    if (channel.bufferedAmount > 0) {
      options.log("%s drain channel with %d buffered bytes", direction, channel.bufferedAmount);
      const deferred = pDefer();
      let drained = false;
      channel.bufferedAmountLowThreshold = 0;
      const closeListener = /* @__PURE__ */ __name(() => {
        if (!drained) {
          options.log("%s drain channel closed before drain", direction);
          deferred.resolve();
        }
      }, "closeListener");
      channel.addEventListener("close", closeListener, {
        once: true
      });
      channel.addEventListener("bufferedamountlow", () => {
        drained = true;
        channel.removeEventListener("close", closeListener);
        deferred.resolve();
      });
      await pTimeout(deferred.promise, {
        milliseconds: drainTimeout
      });
    }
  }).then(async () => {
    if (channel.readyState === "open") {
      channel.close();
    }
  }).catch((err) => {
    options.log.error("error closing outbound stream", err);
  });
}
__name(drainAndClose, "drainAndClose");
async function getRtcConfiguration(config) {
  config = config ?? {};
  if (typeof config === "function") {
    config = await config();
  }
  config.iceServers = config.iceServers ?? DEFAULT_ICE_SERVERS.map((url) => ({
    urls: [
      url
    ]
  }));
  return config;
}
__name(getRtcConfiguration, "getRtcConfiguration");

// node_modules/@libp2p/webrtc/dist/src/maconn.js
var WebRTCMultiaddrConnection = class {
  static {
    __name(this, "WebRTCMultiaddrConnection");
  }
  log;
  /**
   * WebRTC Peer Connection
   */
  peerConnection;
  /**
   * The multiaddr address used to communicate with the remote peer
   */
  remoteAddr;
  /**
   * Holds the lifecycle times of the connection
   */
  timeline;
  /**
   * Optional metrics counter group for this connection
   */
  metrics;
  /**
   * The stream source, a no-op as the transport natively supports multiplexing
   */
  source = nopSource();
  /**
   * The stream destination, a no-op as the transport natively supports multiplexing
   */
  sink = nopSink;
  constructor(components, init) {
    this.log = components.logger.forComponent("libp2p:webrtc:maconn");
    this.remoteAddr = init.remoteAddr;
    this.timeline = init.timeline;
    this.peerConnection = init.peerConnection;
    const initialState = this.peerConnection.connectionState;
    this.peerConnection.onconnectionstatechange = () => {
      this.log.trace("peer connection state change", this.peerConnection.connectionState, "initial state", initialState);
      if (this.peerConnection.connectionState === "disconnected" || this.peerConnection.connectionState === "failed" || this.peerConnection.connectionState === "closed") {
        this.timeline.close = Date.now();
      }
    };
  }
  async close(options) {
    this.log.trace("closing connection");
    this.peerConnection.close();
    this.timeline.close = Date.now();
    this.metrics?.increment({ close: true });
  }
  abort(err) {
    this.log.error("closing connection due to error", err);
    this.peerConnection.close();
    this.timeline.close = Date.now();
    this.metrics?.increment({ abort: true });
  }
};

// node_modules/@libp2p/webrtc/node_modules/it-pushable/dist/src/fifo.js
var FixedFIFO = class {
  static {
    __name(this, "FixedFIFO");
  }
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
  static {
    __name(this, "FIFO");
  }
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

// node_modules/@libp2p/webrtc/node_modules/it-pushable/dist/src/index.js
var AbortError2 = class extends Error {
  static {
    __name(this, "AbortError");
  }
  type;
  code;
  constructor(message2, code2) {
    super(message2 ?? "The operation was aborted");
    this.type = "aborted";
    this.code = code2 ?? "ABORT_ERR";
  }
};
function pushable(options = {}) {
  const getNext = /* @__PURE__ */ __name((buffer) => {
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
  }, "getNext");
  return _pushable(getNext, options);
}
__name(pushable, "pushable");
function _pushable(getNext, options) {
  options = options ?? {};
  let onEnd = options.onEnd;
  let buffer = new FIFO();
  let pushable2;
  let onNext;
  let ended;
  let drain = pDefer();
  const waitNext = /* @__PURE__ */ __name(async () => {
    try {
      if (!buffer.isEmpty()) {
        return getNext(buffer);
      }
      if (ended) {
        return { done: true };
      }
      return await new Promise((resolve, reject) => {
        onNext = /* @__PURE__ */ __name((next) => {
          onNext = null;
          buffer.push(next);
          try {
            resolve(getNext(buffer));
          } catch (err) {
            reject(err);
          }
          return pushable2;
        }, "onNext");
      });
    } finally {
      if (buffer.isEmpty()) {
        queueMicrotask(() => {
          drain.resolve();
          drain = pDefer();
        });
      }
    }
  }, "waitNext");
  const bufferNext = /* @__PURE__ */ __name((next) => {
    if (onNext != null) {
      return onNext(next);
    }
    buffer.push(next);
    return pushable2;
  }, "bufferNext");
  const bufferError = /* @__PURE__ */ __name((err) => {
    buffer = new FIFO();
    if (onNext != null) {
      return onNext({ error: err });
    }
    buffer.push({ error: err });
    return pushable2;
  }, "bufferError");
  const push = /* @__PURE__ */ __name((value) => {
    if (ended) {
      return pushable2;
    }
    if (options?.objectMode !== true && value?.byteLength == null) {
      throw new Error("objectMode was not true but tried to push non-Uint8Array value");
    }
    return bufferNext({ done: false, value });
  }, "push");
  const end = /* @__PURE__ */ __name((err) => {
    if (ended)
      return pushable2;
    ended = true;
    return err != null ? bufferError(err) : bufferNext({ done: true });
  }, "end");
  const _return = /* @__PURE__ */ __name(() => {
    buffer = new FIFO();
    end();
    return { done: true };
  }, "_return");
  const _throw = /* @__PURE__ */ __name((err) => {
    end(err);
    return { done: true };
  }, "_throw");
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
    onEmpty: /* @__PURE__ */ __name(async (options2) => {
      const signal = options2?.signal;
      signal?.throwIfAborted();
      if (buffer.isEmpty()) {
        return;
      }
      let cancel;
      let listener;
      if (signal != null) {
        cancel = new Promise((resolve, reject) => {
          listener = /* @__PURE__ */ __name(() => {
            reject(new AbortError2());
          }, "listener");
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
    }, "onEmpty")
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
    onEmpty: /* @__PURE__ */ __name((opts) => {
      return _pushable2.onEmpty(opts);
    }, "onEmpty")
  };
  return pushable2;
}
__name(_pushable, "_pushable");

// node_modules/@libp2p/webrtc/node_modules/race-signal/dist/src/index.js
var AbortError3 = class extends Error {
  static {
    __name(this, "AbortError");
  }
  type;
  code;
  constructor(message2, code2, name2) {
    super(message2 ?? "The operation was aborted");
    this.type = "aborted";
    this.name = name2 ?? "AbortError";
    this.code = code2 ?? "ABORT_ERR";
  }
};
async function raceSignal(promise, signal, opts) {
  if (signal == null) {
    return promise;
  }
  if (signal.aborted) {
    return Promise.reject(new AbortError3(opts?.errorMessage, opts?.errorCode, opts?.errorName));
  }
  let listener;
  const error = new AbortError3(opts?.errorMessage, opts?.errorCode, opts?.errorName);
  try {
    return await Promise.race([
      promise,
      new Promise((resolve, reject) => {
        listener = /* @__PURE__ */ __name(() => {
          reject(error);
        }, "listener");
        signal.addEventListener("abort", listener);
      })
    ]);
  } finally {
    if (listener != null) {
      signal.removeEventListener("abort", listener);
    }
  }
}
__name(raceSignal, "raceSignal");

// node_modules/@libp2p/webrtc/node_modules/uint8arraylist/dist/src/index.js
var symbol2 = Symbol.for("@achingbrain/uint8arraylist");
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
__name(findBufAndOffset, "findBufAndOffset");
function isUint8ArrayList(value) {
  return Boolean(value?.[symbol2]);
}
__name(isUint8ArrayList, "isUint8ArrayList");
var Uint8ArrayList = class _Uint8ArrayList {
  static {
    __name(this, "Uint8ArrayList");
  }
  bufs;
  length;
  [symbol2] = true;
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
    let length3 = 0;
    for (const buf of bufs) {
      if (buf instanceof Uint8Array) {
        length3 += buf.byteLength;
        this.bufs.push(buf);
      } else if (isUint8ArrayList(buf)) {
        length3 += buf.byteLength;
        this.bufs.push(...buf.bufs);
      } else {
        throw new Error("Could not append value, must be an Uint8Array or a Uint8ArrayList");
      }
    }
    this.length += length3;
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
    let length3 = 0;
    for (const buf of bufs.reverse()) {
      if (buf instanceof Uint8Array) {
        length3 += buf.byteLength;
        this.bufs.unshift(buf);
      } else if (isUint8ArrayList(buf)) {
        length3 += buf.byteLength;
        this.bufs.unshift(...buf.bufs);
      } else {
        throw new Error("Could not prepend value, must be an Uint8Array or a Uint8ArrayList");
      }
    }
    this.length += length3;
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
    const { bufs, length: length3 } = this._subList(beginInclusive, endExclusive);
    return concat2(bufs, length3);
  }
  /**
   * Returns a alloc from the given start and end element index.
   *
   * In the best case where the data extracted comes from a single Uint8Array
   * internally this is a no-copy operation otherwise it is a copy operation.
   */
  subarray(beginInclusive, endExclusive) {
    const { bufs, length: length3 } = this._subList(beginInclusive, endExclusive);
    if (bufs.length === 1) {
      return bufs[0];
    }
    return concat2(bufs, length3);
  }
  /**
   * Returns a allocList from the given start and end element index.
   *
   * This is a no-copy operation.
   */
  sublist(beginInclusive, endExclusive) {
    const { bufs, length: length3 } = this._subList(beginInclusive, endExclusive);
    const list = new _Uint8ArrayList();
    list.length = length3;
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
    const buf = allocUnsafe(1);
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
    const buf = allocUnsafe(1);
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
      if (!equals3(this.bufs[i], other.bufs[i])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Create a Uint8ArrayList from a pre-existing list of Uint8Arrays.  Use this
   * method if you know the total size of all the Uint8Arrays ahead of time.
   */
  static fromUint8Arrays(bufs, length3) {
    const list = new _Uint8ArrayList();
    list.bufs = bufs;
    if (length3 == null) {
      length3 = bufs.reduce((acc, curr) => acc + curr.byteLength, 0);
    }
    list.length = length3;
    return list;
  }
};

// node_modules/@libp2p/webrtc/node_modules/get-iterator/dist/src/index.js
function getIterator(obj) {
  if (obj != null) {
    if (typeof obj[Symbol.iterator] === "function") {
      return obj[Symbol.iterator]();
    }
    if (typeof obj[Symbol.asyncIterator] === "function") {
      return obj[Symbol.asyncIterator]();
    }
    if (typeof obj.next === "function") {
      return obj;
    }
  }
  throw new Error("argument is not an iterator or iterable");
}
__name(getIterator, "getIterator");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/utils/dist/src/is-promise.js
function isPromise2(thing) {
  if (thing == null) {
    return false;
  }
  return typeof thing.then === "function" && typeof thing.catch === "function" && typeof thing.finally === "function";
}
__name(isPromise2, "isPromise");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/utils/dist/src/close-source.js
function closeSource(source, log) {
  const res = getIterator(source).return?.();
  if (isPromise2(res)) {
    res.catch((err) => {
      log.error("could not cause iterator to return", err);
    });
  }
}
__name(closeSource, "closeSource");

// node_modules/@libp2p/webrtc/node_modules/@libp2p/utils/dist/src/abstract-stream.js
var DEFAULT_SEND_CLOSE_WRITE_TIMEOUT = 5e3;
function isPromise3(thing) {
  if (thing == null) {
    return false;
  }
  return typeof thing.then === "function" && typeof thing.catch === "function" && typeof thing.finally === "function";
}
__name(isPromise3, "isPromise");
var AbstractStream = class {
  static {
    __name(this, "AbstractStream");
  }
  id;
  direction;
  timeline;
  protocol;
  metadata;
  source;
  status;
  readStatus;
  writeStatus;
  log;
  sinkController;
  sinkEnd;
  closed;
  endErr;
  streamSource;
  onEnd;
  onCloseRead;
  onCloseWrite;
  onReset;
  onAbort;
  sendCloseWriteTimeout;
  sendingData;
  constructor(init) {
    this.sinkController = new AbortController();
    this.sinkEnd = pDefer();
    this.closed = pDefer();
    this.log = init.log;
    this.status = "open";
    this.readStatus = "ready";
    this.writeStatus = "ready";
    this.id = init.id;
    this.metadata = init.metadata ?? {};
    this.direction = init.direction;
    this.timeline = {
      open: Date.now()
    };
    this.sendCloseWriteTimeout = init.sendCloseWriteTimeout ?? DEFAULT_SEND_CLOSE_WRITE_TIMEOUT;
    this.onEnd = init.onEnd;
    this.onCloseRead = init?.onCloseRead;
    this.onCloseWrite = init?.onCloseWrite;
    this.onReset = init?.onReset;
    this.onAbort = init?.onAbort;
    this.source = this.streamSource = pushable({
      onEnd: /* @__PURE__ */ __name((err) => {
        if (err != null) {
          this.log.trace("source ended with error", err);
        } else {
          this.log.trace("source ended");
        }
        this.onSourceEnd(err);
      }, "onEnd")
    });
    this.sink = this.sink.bind(this);
  }
  async sink(source) {
    if (this.writeStatus !== "ready") {
      throw new StreamStateError(`writable end state is "${this.writeStatus}" not "ready"`);
    }
    try {
      this.writeStatus = "writing";
      const options = {
        signal: this.sinkController.signal
      };
      if (this.direction === "outbound") {
        const res = this.sendNewStream(options);
        if (isPromise3(res)) {
          await res;
        }
      }
      const abortListener = /* @__PURE__ */ __name(() => {
        closeSource(source, this.log);
      }, "abortListener");
      try {
        this.sinkController.signal.addEventListener("abort", abortListener);
        this.log.trace("sink reading from source");
        for await (let data of source) {
          data = data instanceof Uint8Array ? new Uint8ArrayList(data) : data;
          const res = this.sendData(data, options);
          if (isPromise3(res)) {
            this.sendingData = pDefer();
            await res;
            this.sendingData.resolve();
            this.sendingData = void 0;
          }
        }
      } finally {
        this.sinkController.signal.removeEventListener("abort", abortListener);
      }
      this.log.trace('sink finished reading from source, write status is "%s"', this.writeStatus);
      if (this.writeStatus === "writing") {
        this.writeStatus = "closing";
        this.log.trace("send close write to remote");
        await this.sendCloseWrite({
          signal: AbortSignal.timeout(this.sendCloseWriteTimeout)
        });
        this.writeStatus = "closed";
      }
      this.onSinkEnd();
    } catch (err) {
      this.log.trace("sink ended with error, calling abort with error", err);
      this.abort(err);
      throw err;
    } finally {
      this.log.trace("resolve sink end");
      this.sinkEnd.resolve();
    }
  }
  onSourceEnd(err) {
    if (this.timeline.closeRead != null) {
      return;
    }
    this.timeline.closeRead = Date.now();
    this.readStatus = "closed";
    if (err != null && this.endErr == null) {
      this.endErr = err;
    }
    this.onCloseRead?.();
    if (this.timeline.closeWrite != null) {
      this.log.trace("source and sink ended");
      this.timeline.close = Date.now();
      if (this.status !== "aborted" && this.status !== "reset") {
        this.status = "closed";
      }
      if (this.onEnd != null) {
        this.onEnd(this.endErr);
      }
      this.closed.resolve();
    } else {
      this.log.trace("source ended, waiting for sink to end");
    }
  }
  onSinkEnd(err) {
    if (this.timeline.closeWrite != null) {
      return;
    }
    this.timeline.closeWrite = Date.now();
    this.writeStatus = "closed";
    if (err != null && this.endErr == null) {
      this.endErr = err;
    }
    this.onCloseWrite?.();
    if (this.timeline.closeRead != null) {
      this.log.trace("sink and source ended");
      this.timeline.close = Date.now();
      if (this.status !== "aborted" && this.status !== "reset") {
        this.status = "closed";
      }
      if (this.onEnd != null) {
        this.onEnd(this.endErr);
      }
      this.closed.resolve();
    } else {
      this.log.trace("sink ended, waiting for source to end");
    }
  }
  // Close for both Reading and Writing
  async close(options) {
    this.log.trace("closing gracefully");
    this.status = "closing";
    await raceSignal(Promise.all([
      this.closeWrite(options),
      this.closeRead(options),
      this.closed.promise
    ]), options?.signal);
    this.status = "closed";
    this.log.trace("closed gracefully");
  }
  async closeRead(options = {}) {
    if (this.readStatus === "closing" || this.readStatus === "closed") {
      return;
    }
    this.log.trace('closing readable end of stream with starting read status "%s"', this.readStatus);
    const readStatus = this.readStatus;
    this.readStatus = "closing";
    if (this.status !== "reset" && this.status !== "aborted" && this.timeline.closeRead == null) {
      this.log.trace("send close read to remote");
      await this.sendCloseRead(options);
    }
    if (readStatus === "ready") {
      this.log.trace("ending internal source queue with %d queued bytes", this.streamSource.readableLength);
      this.streamSource.end();
    }
    this.log.trace("closed readable end of stream");
  }
  async closeWrite(options = {}) {
    if (this.writeStatus === "closing" || this.writeStatus === "closed") {
      return;
    }
    this.log.trace('closing writable end of stream with starting write status "%s"', this.writeStatus);
    if (this.writeStatus === "ready") {
      this.log.trace("sink was never sunk, sink an empty array");
      await raceSignal(this.sink([]), options.signal);
    }
    if (this.writeStatus === "writing") {
      if (this.sendingData != null) {
        await raceSignal(this.sendingData.promise, options.signal);
      }
      this.log.trace("aborting source passed to .sink");
      this.sinkController.abort();
      await raceSignal(this.sinkEnd.promise, options.signal);
    }
    this.writeStatus = "closed";
    this.log.trace("closed writable end of stream");
  }
  /**
   * Close immediately for reading and writing and send a reset message (local
   * error)
   */
  abort(err) {
    if (this.status === "closed" || this.status === "aborted" || this.status === "reset") {
      return;
    }
    this.log("abort with error", err);
    this.log("try to send reset to remote");
    const res = this.sendReset();
    if (isPromise3(res)) {
      res.catch((err2) => {
        this.log.error("error sending reset message", err2);
      });
    }
    this.status = "aborted";
    this.timeline.abort = Date.now();
    this._closeSinkAndSource(err);
    this.onAbort?.(err);
  }
  /**
   * Receive a reset message - close immediately for reading and writing (remote
   * error)
   */
  reset() {
    if (this.status === "closed" || this.status === "aborted" || this.status === "reset") {
      return;
    }
    const err = new StreamResetError("stream reset");
    this.status = "reset";
    this.timeline.reset = Date.now();
    this._closeSinkAndSource(err);
    this.onReset?.();
  }
  _closeSinkAndSource(err) {
    this._closeSink(err);
    this._closeSource(err);
  }
  _closeSink(err) {
    if (this.writeStatus === "writing") {
      this.log.trace("end sink source");
      this.sinkController.abort();
    }
    this.onSinkEnd(err);
  }
  _closeSource(err) {
    if (this.readStatus !== "closing" && this.readStatus !== "closed") {
      this.log.trace("ending source with %d bytes to be read by consumer", this.streamSource.readableLength);
      this.readStatus = "closing";
      this.streamSource.end(err);
    }
  }
  /**
   * The remote closed for writing so we should expect to receive no more
   * messages
   */
  remoteCloseWrite() {
    if (this.readStatus === "closing" || this.readStatus === "closed") {
      this.log("received remote close write but local source is already closed");
      return;
    }
    this.log.trace("remote close write");
    this._closeSource();
  }
  /**
   * The remote closed for reading so we should not send any more
   * messages
   */
  remoteCloseRead() {
    if (this.writeStatus === "closing" || this.writeStatus === "closed") {
      this.log("received remote close read but local sink is already closed");
      return;
    }
    this.log.trace("remote close read");
    this._closeSink();
  }
  /**
   * The underlying muxer has closed, no more messages can be sent or will
   * be received, close immediately to free up resources
   */
  destroy() {
    if (this.status === "closed" || this.status === "aborted" || this.status === "reset") {
      this.log("received destroy but we are already closed");
      return;
    }
    this.log.trace("stream destroyed");
    this._closeSinkAndSource();
  }
  /**
   * When an extending class reads data from it's implementation-specific source,
   * call this method to allow the stream consumer to read the data.
   */
  sourcePush(data) {
    this.streamSource.push(data);
  }
  /**
   * Returns the amount of unread data - can be used to prevent large amounts of
   * data building up when the stream consumer is too slow.
   */
  sourceReadableLength() {
    return this.streamSource.readableLength;
  }
};

// node_modules/@libp2p/webrtc/node_modules/it-length-prefixed/dist/src/utils.js
function isAsyncIterable(thing) {
  return thing[Symbol.asyncIterator] != null;
}
__name(isAsyncIterable, "isAsyncIterable");

// node_modules/@libp2p/webrtc/node_modules/it-length-prefixed/dist/src/encode.js
var defaultEncoder = /* @__PURE__ */ __name((length3) => {
  const lengthLength = encodingLength2(length3);
  const lengthBuf = allocUnsafe(lengthLength);
  encode4(length3, lengthBuf);
  defaultEncoder.bytes = lengthLength;
  return lengthBuf;
}, "defaultEncoder");
defaultEncoder.bytes = 0;
function encode6(source, options) {
  options = options ?? {};
  const encodeLength = options.lengthEncoder ?? defaultEncoder;
  function* maybeYield(chunk) {
    const length3 = encodeLength(chunk.byteLength);
    if (length3 instanceof Uint8Array) {
      yield length3;
    } else {
      yield* length3;
    }
    if (chunk instanceof Uint8Array) {
      yield chunk;
    } else {
      yield* chunk;
    }
  }
  __name(maybeYield, "maybeYield");
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
__name(encode6, "encode");
encode6.single = (chunk, options) => {
  options = options ?? {};
  const encodeLength = options.lengthEncoder ?? defaultEncoder;
  return new Uint8ArrayList(encodeLength(chunk.byteLength), chunk);
};

// node_modules/@libp2p/webrtc/node_modules/it-length-prefixed/dist/src/errors.js
var InvalidMessageLengthError = class extends Error {
  static {
    __name(this, "InvalidMessageLengthError");
  }
  name = "InvalidMessageLengthError";
  code = "ERR_INVALID_MSG_LENGTH";
};
var InvalidDataLengthError = class extends Error {
  static {
    __name(this, "InvalidDataLengthError");
  }
  name = "InvalidDataLengthError";
  code = "ERR_MSG_DATA_TOO_LONG";
};
var InvalidDataLengthLengthError = class extends Error {
  static {
    __name(this, "InvalidDataLengthLengthError");
  }
  name = "InvalidDataLengthLengthError";
  code = "ERR_MSG_LENGTH_TOO_LONG";
};
var UnexpectedEOFError = class extends Error {
  static {
    __name(this, "UnexpectedEOFError");
  }
  name = "UnexpectedEOFError";
  code = "ERR_UNEXPECTED_EOF";
};

// node_modules/@libp2p/webrtc/node_modules/it-length-prefixed/dist/src/decode.js
var MAX_LENGTH_LENGTH = 8;
var MAX_DATA_LENGTH = 1024 * 1024 * 4;
var ReadMode;
(function(ReadMode2) {
  ReadMode2[ReadMode2["LENGTH"] = 0] = "LENGTH";
  ReadMode2[ReadMode2["DATA"] = 1] = "DATA";
})(ReadMode || (ReadMode = {}));
var defaultDecoder = /* @__PURE__ */ __name((buf) => {
  const length3 = decode5(buf);
  defaultDecoder.bytes = encodingLength2(length3);
  return length3;
}, "defaultDecoder");
defaultDecoder.bytes = 0;
function decode7(source, options) {
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
  __name(maybeYield, "maybeYield");
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
__name(decode7, "decode");
decode7.fromReader = (reader, options) => {
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
  const onLength = /* @__PURE__ */ __name((l) => {
    byteLength = l;
  }, "onLength");
  return decode7(varByteSource, {
    ...options ?? {},
    onLength
  });
};

// node_modules/@libp2p/webrtc/node_modules/p-event/index.js
var normalizeEmitter = /* @__PURE__ */ __name((emitter) => {
  const addListener = emitter.addEventListener || emitter.on || emitter.addListener;
  const removeListener = emitter.removeEventListener || emitter.off || emitter.removeListener;
  if (!addListener || !removeListener) {
    throw new TypeError("Emitter is not compatible");
  }
  return {
    addListener: addListener.bind(emitter),
    removeListener: removeListener.bind(emitter)
  };
}, "normalizeEmitter");
function pEventMultiple(emitter, event, options) {
  let cancel;
  const returnValue = new Promise((resolve, reject) => {
    options = {
      rejectionEvents: ["error"],
      multiArgs: false,
      resolveImmediately: false,
      ...options
    };
    if (!(options.count >= 0 && (options.count === Number.POSITIVE_INFINITY || Number.isInteger(options.count)))) {
      throw new TypeError("The `count` option should be at least 0 or more");
    }
    options.signal?.throwIfAborted();
    const events = [event].flat();
    const items = [];
    const { addListener, removeListener } = normalizeEmitter(emitter);
    const onItem = /* @__PURE__ */ __name((...arguments_) => {
      const value = options.multiArgs ? arguments_ : arguments_[0];
      if (options.filter && !options.filter(value)) {
        return;
      }
      items.push(value);
      if (options.count === items.length) {
        cancel();
        resolve(items);
      }
    }, "onItem");
    const rejectHandler = /* @__PURE__ */ __name((error) => {
      cancel();
      reject(error);
    }, "rejectHandler");
    cancel = /* @__PURE__ */ __name(() => {
      for (const event2 of events) {
        removeListener(event2, onItem);
      }
      for (const rejectionEvent of options.rejectionEvents) {
        removeListener(rejectionEvent, rejectHandler);
      }
    }, "cancel");
    for (const event2 of events) {
      addListener(event2, onItem);
    }
    for (const rejectionEvent of options.rejectionEvents) {
      addListener(rejectionEvent, rejectHandler);
    }
    if (options.signal) {
      options.signal.addEventListener("abort", () => {
        rejectHandler(options.signal.reason);
      }, { once: true });
    }
    if (options.resolveImmediately) {
      resolve(items);
    }
  });
  returnValue.cancel = cancel;
  if (typeof options.timeout === "number") {
    const timeout = pTimeout(returnValue, { milliseconds: options.timeout });
    timeout.cancel = cancel;
    return timeout;
  }
  return returnValue;
}
__name(pEventMultiple, "pEventMultiple");
function pEvent(emitter, event, options) {
  if (typeof options === "function") {
    options = { filter: options };
  }
  options = {
    ...options,
    count: 1,
    resolveImmediately: false
  };
  const arrayPromise = pEventMultiple(emitter, event, options);
  const promise = arrayPromise.then((array) => array[0]);
  promise.cancel = arrayPromise.cancel;
  return promise;
}
__name(pEvent, "pEvent");

// node_modules/@libp2p/webrtc/dist/src/pb/message.js
var Message;
(function(Message3) {
  let Flag;
  (function(Flag2) {
    Flag2["FIN"] = "FIN";
    Flag2["STOP_SENDING"] = "STOP_SENDING";
    Flag2["RESET"] = "RESET";
    Flag2["FIN_ACK"] = "FIN_ACK";
  })(Flag = Message3.Flag || (Message3.Flag = {}));
  let __FlagValues;
  (function(__FlagValues2) {
    __FlagValues2[__FlagValues2["FIN"] = 0] = "FIN";
    __FlagValues2[__FlagValues2["STOP_SENDING"] = 1] = "STOP_SENDING";
    __FlagValues2[__FlagValues2["RESET"] = 2] = "RESET";
    __FlagValues2[__FlagValues2["FIN_ACK"] = 3] = "FIN_ACK";
  })(__FlagValues || (__FlagValues = {}));
  (function(Flag2) {
    Flag2.codec = () => {
      return enumeration(__FlagValues);
    };
  })(Flag = Message3.Flag || (Message3.Flag = {}));
  let _codec;
  Message3.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.flag != null) {
          w.uint32(8);
          Message3.Flag.codec().encode(obj.flag, w);
        }
        if (obj.message != null) {
          w.uint32(18);
          w.bytes(obj.message);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.flag = Message3.Flag.codec().decode(reader);
              break;
            }
            case 2: {
              obj.message = reader.bytes();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Message3.encode = (obj) => {
    return encodeMessage(obj, Message3.codec());
  };
  Message3.decode = (buf, opts) => {
    return decodeMessage(buf, Message3.codec(), opts);
  };
})(Message || (Message = {}));

// node_modules/@libp2p/webrtc/dist/src/stream.js
var MAX_BUFFERED_AMOUNT = 2 * 1024 * 1024;
var BUFFERED_AMOUNT_LOW_TIMEOUT = 30 * 1e3;
var MAX_MESSAGE_SIZE = 16 * 1024;
function calculateProtobufOverhead(maxMessageSize = MAX_MESSAGE_SIZE) {
  const messageLength = encodingLength2(maxMessageSize - encodingLength2(maxMessageSize));
  const flagField = 1 + encodingLength2(Object.keys(Message.Flag).length - 1);
  const messageFieldIdType = 1;
  const available = maxMessageSize - messageLength - flagField - messageFieldIdType;
  const messageFieldLengthLength = encodingLength2(available);
  return messageLength + flagField + messageFieldIdType + messageFieldLengthLength;
}
__name(calculateProtobufOverhead, "calculateProtobufOverhead");
var PROTOBUF_OVERHEAD = calculateProtobufOverhead();
var FIN_ACK_TIMEOUT = 5e3;
var OPEN_TIMEOUT = 5e3;
var WebRTCStream = class extends AbstractStream {
  static {
    __name(this, "WebRTCStream");
  }
  /**
   * The data channel used to send and receive data
   */
  channel;
  /**
   * push data from the underlying datachannel to the length prefix decoder
   * and then the protobuf decoder.
   */
  incomingData;
  maxBufferedAmount;
  bufferedAmountLowEventTimeout;
  /**
   * The maximum size of a message in bytes
   */
  maxMessageSize;
  /**
   * When this promise is resolved, the remote has sent us a FIN flag
   */
  receiveFinAck;
  finAckTimeout;
  openTimeout;
  constructor(init) {
    const originalOnEnd = init.onEnd;
    init.onEnd = (err) => {
      this.log.trace("readable and writeable ends closed", this.status);
      void Promise.resolve(async () => {
        if (this.timeline.abort != null || this.timeline.reset !== null) {
          return;
        }
        try {
          await pTimeout(this.receiveFinAck.promise, {
            milliseconds: this.finAckTimeout
          });
        } catch (err2) {
          this.log.error("error receiving FIN_ACK", err2);
        }
      }).then(() => {
        this.incomingData.end();
        originalOnEnd?.(err);
      }).catch((err2) => {
        this.log.error("error ending stream", err2);
      });
    };
    super(init);
    this.channel = init.channel;
    this.channel.binaryType = "arraybuffer";
    this.incomingData = pushable();
    this.bufferedAmountLowEventTimeout = init.bufferedAmountLowEventTimeout ?? BUFFERED_AMOUNT_LOW_TIMEOUT;
    this.maxBufferedAmount = init.maxBufferedAmount ?? MAX_BUFFERED_AMOUNT;
    this.maxMessageSize = (init.maxMessageSize ?? MAX_MESSAGE_SIZE) - PROTOBUF_OVERHEAD;
    this.receiveFinAck = pDefer();
    this.finAckTimeout = init.closeTimeout ?? FIN_ACK_TIMEOUT;
    this.openTimeout = init.openTimeout ?? OPEN_TIMEOUT;
    switch (this.channel.readyState) {
      case "open":
        this.timeline.open = (/* @__PURE__ */ new Date()).getTime();
        break;
      case "closed":
      case "closing":
        if (this.timeline.close === void 0 || this.timeline.close === 0) {
          this.timeline.close = Date.now();
        }
        break;
      case "connecting":
        break;
      default:
        this.log.error("unknown datachannel state %s", this.channel.readyState);
        throw new StreamStateError("Unknown datachannel state");
    }
    this.channel.onopen = (_evt) => {
      this.timeline.open = (/* @__PURE__ */ new Date()).getTime();
    };
    this.channel.onclose = (_evt) => {
      this.receiveFinAck.resolve();
      void this.close().catch((err) => {
        this.log.error("error closing stream after channel closed", err);
      });
    };
    this.channel.onerror = (evt) => {
      const err = evt.error;
      this.abort(err);
    };
    this.channel.onmessage = async (event) => {
      const { data } = event;
      if (data === null || data.byteLength === 0) {
        return;
      }
      this.incomingData.push(new Uint8Array(data, 0, data.byteLength));
    };
    const self = this;
    Promise.resolve().then(async () => {
      for await (const buf of decode7(this.incomingData)) {
        const message2 = self.processIncomingProtobuf(buf);
        if (message2 != null) {
          self.sourcePush(new Uint8ArrayList(message2));
        }
      }
    }).catch((err) => {
      this.log.error("error processing incoming data channel messages", err);
    });
  }
  sendNewStream() {
  }
  async _sendMessage(data, checkBuffer = true) {
    if (checkBuffer && this.channel.bufferedAmount > this.maxBufferedAmount) {
      try {
        this.log('channel buffer is %d, wait for "bufferedamountlow" event', this.channel.bufferedAmount);
        await pEvent(this.channel, "bufferedamountlow", { timeout: this.bufferedAmountLowEventTimeout });
      } catch (err) {
        if (err instanceof TimeoutError) {
          throw new TimeoutError(`Timed out waiting for DataChannel buffer to clear after ${this.bufferedAmountLowEventTimeout}ms`);
        }
        throw err;
      }
    }
    if (this.channel.readyState === "closed" || this.channel.readyState === "closing") {
      throw new StreamStateError(`Invalid datachannel state - ${this.channel.readyState}`);
    }
    if (this.channel.readyState !== "open") {
      this.log('channel state is "%s" and not "open", waiting for "open" event before sending data', this.channel.readyState);
      await pEvent(this.channel, "open", { timeout: this.openTimeout });
      this.log('channel state is now "%s", sending data', this.channel.readyState);
    }
    this.channel.send(data.subarray());
  }
  async sendData(data) {
    data = data.sublist();
    while (data.byteLength > 0) {
      const toSend = Math.min(data.byteLength, this.maxMessageSize);
      const buf = data.subarray(0, toSend);
      const msgbuf = Message.encode({ message: buf });
      const sendbuf = encode6.single(msgbuf);
      await this._sendMessage(sendbuf);
      data.consume(toSend);
    }
  }
  async sendReset() {
    await this._sendFlag(Message.Flag.RESET);
  }
  async sendCloseWrite(options) {
    const sent = await this._sendFlag(Message.Flag.FIN);
    if (sent) {
      this.log.trace("awaiting FIN_ACK");
      try {
        await raceSignal(this.receiveFinAck.promise, options?.signal, {
          errorMessage: "sending close-write was aborted before FIN_ACK was received",
          errorName: "FinAckNotReceivedError"
        });
      } catch (err) {
        this.log.error("failed to await FIN_ACK", err);
      }
    } else {
      this.log.trace("sending FIN failed, not awaiting FIN_ACK");
    }
    this.receiveFinAck.resolve();
  }
  async sendCloseRead() {
    await this._sendFlag(Message.Flag.STOP_SENDING);
  }
  /**
   * Handle incoming
   */
  processIncomingProtobuf(buffer) {
    const message2 = Message.decode(buffer);
    if (message2.flag !== void 0) {
      this.log.trace('incoming flag %s, write status "%s", read status "%s"', message2.flag, this.writeStatus, this.readStatus);
      if (message2.flag === Message.Flag.FIN) {
        this.remoteCloseWrite();
        this.log.trace("sending FIN_ACK");
        void this._sendFlag(Message.Flag.FIN_ACK).catch((err) => {
          this.log.error("error sending FIN_ACK immediately", err);
        });
      }
      if (message2.flag === Message.Flag.RESET) {
        this.reset();
      }
      if (message2.flag === Message.Flag.STOP_SENDING) {
        this.remoteCloseRead();
      }
      if (message2.flag === Message.Flag.FIN_ACK) {
        this.log.trace("received FIN_ACK");
        this.receiveFinAck.resolve();
      }
    }
    if (this.readStatus === "ready") {
      return message2.message;
    }
  }
  async _sendFlag(flag) {
    if (this.channel.readyState !== "open") {
      this.log.trace('not sending flag %s because channel is "%s" and not "open"', this.channel.readyState, flag.toString());
      return false;
    }
    this.log.trace("sending flag %s", flag.toString());
    const msgbuf = Message.encode({ flag });
    const prefixedBuf = encode6.single(msgbuf);
    try {
      await this._sendMessage(prefixedBuf, false);
      return true;
    } catch (err) {
      this.log.error("could not send flag %s", flag.toString(), err);
    }
    return false;
  }
};
function createStream(options) {
  const { channel, direction } = options;
  return new WebRTCStream({
    id: direction === "inbound" ? `i${channel.id}` : `r${channel.id}`,
    log: options.logger.forComponent(`libp2p:webrtc:stream:${direction}:${channel.id}`),
    ...options
  });
}
__name(createStream, "createStream");

// node_modules/@libp2p/webrtc/dist/src/muxer.js
var PROTOCOL = "/webrtc";
var DataChannelMuxerFactory = class {
  static {
    __name(this, "DataChannelMuxerFactory");
  }
  protocol;
  /**
   * WebRTC Peer Connection
   */
  peerConnection;
  bufferedStreams = [];
  metrics;
  dataChannelOptions;
  components;
  log;
  constructor(components, init) {
    this.components = components;
    this.peerConnection = init.peerConnection;
    this.metrics = init.metrics;
    this.protocol = init.protocol ?? PROTOCOL;
    this.dataChannelOptions = init.dataChannelOptions ?? {};
    this.log = components.logger.forComponent("libp2p:webrtc:datachannelmuxerfactory");
    this.peerConnection.ondatachannel = ({ channel }) => {
      this.log.trace('incoming early datachannel with channel id %d and label "%s"', channel.id);
      if (channel.label === "init") {
        this.log.trace("closing early init channel");
        channel.close();
        return;
      }
      const bufferedStream = {};
      const stream = createStream({
        channel,
        direction: "inbound",
        onEnd: /* @__PURE__ */ __name((err) => {
          bufferedStream.onEnd(err);
        }, "onEnd"),
        logger: components.logger,
        ...this.dataChannelOptions
      });
      bufferedStream.stream = stream;
      bufferedStream.channel = channel;
      bufferedStream.onEnd = () => {
        this.bufferedStreams = this.bufferedStreams.filter((s) => s.stream.id !== stream.id);
      };
      this.bufferedStreams.push(bufferedStream);
    };
  }
  createStreamMuxer(init) {
    return new DataChannelMuxer(this.components, {
      ...init,
      peerConnection: this.peerConnection,
      dataChannelOptions: this.dataChannelOptions,
      metrics: this.metrics,
      streams: this.bufferedStreams,
      protocol: this.protocol
    });
  }
};
var DataChannelMuxer = class {
  static {
    __name(this, "DataChannelMuxer");
  }
  init;
  /**
   * Array of streams in the data channel
   */
  streams;
  protocol;
  log;
  peerConnection;
  dataChannelOptions;
  metrics;
  logger;
  constructor(components, init) {
    this.init = init;
    this.log = components.logger.forComponent("libp2p:webrtc:muxer");
    this.logger = components.logger;
    this.streams = init.streams.map((s) => s.stream);
    this.peerConnection = init.peerConnection;
    this.protocol = init.protocol ?? PROTOCOL;
    this.metrics = init.metrics;
    this.dataChannelOptions = init.dataChannelOptions ?? {};
    this.peerConnection.ondatachannel = ({ channel }) => {
      this.log.trace("incoming datachannel with channel id %d", channel.id);
      if (channel.label === "init") {
        this.log.trace("closing init channel");
        channel.close();
        return;
      }
      const stream = createStream({
        channel,
        direction: "inbound",
        onEnd: /* @__PURE__ */ __name(() => {
          this.log("incoming channel %s ended with state %s", channel.id, channel.readyState);
          this.#onStreamEnd(stream, channel);
        }, "onEnd"),
        logger: this.logger,
        ...this.dataChannelOptions
      });
      this.streams.push(stream);
      this.metrics?.increment({ incoming_stream: true });
      init?.onIncomingStream?.(stream);
    };
    if (this.init.streams.length > 0) {
      queueMicrotask(() => {
        this.init.streams.forEach((bufferedStream) => {
          bufferedStream.onEnd = () => {
            this.log("incoming early channel %s ended with state %s", bufferedStream.channel.id, bufferedStream.channel.readyState);
            this.#onStreamEnd(bufferedStream.stream, bufferedStream.channel);
          };
          this.metrics?.increment({ incoming_stream: true });
          this.init?.onIncomingStream?.(bufferedStream.stream);
        });
      });
    }
  }
  #onStreamEnd(stream, channel) {
    this.log.trace("stream %s %s %s onEnd", stream.direction, stream.id, stream.protocol);
    drainAndClose(channel, `${stream.direction} ${stream.id} ${stream.protocol}`, this.dataChannelOptions.drainTimeout, {
      log: this.log
    });
    this.streams = this.streams.filter((s) => s.id !== stream.id);
    this.metrics?.increment({ stream_end: true });
    this.init?.onStreamEnd?.(stream);
  }
  /**
   * Gracefully close all tracked streams and stop the muxer
   */
  async close(options) {
    try {
      await Promise.all(this.streams.map(async (stream) => stream.close(options)));
    } catch (err) {
      this.abort(err);
    }
  }
  /**
   * Abort all tracked streams and stop the muxer
   */
  abort(err) {
    for (const stream of this.streams) {
      stream.abort(err);
    }
  }
  /**
   * The stream source, a no-op as the transport natively supports multiplexing
   */
  source = nopSource();
  /**
   * The stream destination, a no-op as the transport natively supports multiplexing
   */
  sink = nopSink;
  newStream() {
    const channel = this.peerConnection.createDataChannel("");
    this.log.trace("opened outgoing datachannel with channel id %s", channel.id);
    const stream = createStream({
      channel,
      direction: "outbound",
      onEnd: /* @__PURE__ */ __name(() => {
        this.log("outgoing channel %s ended with state %s", channel.id, channel.readyState);
        this.#onStreamEnd(stream, channel);
      }, "onEnd"),
      logger: this.logger,
      ...this.dataChannelOptions
    });
    this.streams.push(stream);
    this.metrics?.increment({ outgoing_stream: true });
    return stream;
  }
};

// node_modules/@libp2p/webrtc/dist/src/webrtc/index.browser.js
var RTCPeerConnection = globalThis.RTCPeerConnection;
var RTCSessionDescription = globalThis.RTCSessionDescription;
var RTCIceCandidate = globalThis.RTCIceCandidate;

// node_modules/@libp2p/webrtc/node_modules/it-queueless-pushable/dist/src/index.js
var QueuelessPushable = class {
  static {
    __name(this, "QueuelessPushable");
  }
  readNext;
  haveNext;
  ended;
  nextResult;
  constructor() {
    this.ended = false;
    this.readNext = pDefer();
    this.haveNext = pDefer();
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  async next() {
    if (this.nextResult == null) {
      await this.haveNext.promise;
    }
    if (this.nextResult == null) {
      throw new Error("HaveNext promise resolved but nextResult was undefined");
    }
    const nextResult = this.nextResult;
    this.nextResult = void 0;
    this.readNext.resolve();
    this.readNext = pDefer();
    return nextResult;
  }
  async throw(err) {
    this.ended = true;
    if (err != null) {
      this.haveNext.promise.catch(() => {
      });
      this.haveNext.reject(err);
    }
    const result = {
      done: true,
      value: void 0
    };
    return result;
  }
  async return() {
    const result = {
      done: true,
      value: void 0
    };
    await this._push(void 0);
    return result;
  }
  async push(value, options) {
    await this._push(value, options);
  }
  async end(err, options) {
    if (err != null) {
      await this.throw(err);
    } else {
      await this._push(void 0, options);
    }
  }
  async _push(value, options) {
    if (value != null && this.ended) {
      throw new Error("Cannot push value onto an ended pushable");
    }
    while (this.nextResult != null) {
      await this.readNext.promise;
    }
    if (value != null) {
      this.nextResult = { done: false, value };
    } else {
      this.ended = true;
      this.nextResult = { done: true, value: void 0 };
    }
    this.haveNext.resolve();
    this.haveNext = pDefer();
    await raceSignal(this.readNext.promise, options?.signal, options);
  }
};
function queuelessPushable() {
  return new QueuelessPushable();
}
__name(queuelessPushable, "queuelessPushable");

// node_modules/@libp2p/webrtc/node_modules/it-byte-stream/dist/src/errors.js
var UnexpectedEOFError2 = class extends Error {
  static {
    __name(this, "UnexpectedEOFError");
  }
  name = "UnexpectedEOFError";
  code = "ERR_UNEXPECTED_EOF";
};

// node_modules/@libp2p/webrtc/node_modules/it-byte-stream/dist/src/index.js
var CodeError = class extends Error {
  static {
    __name(this, "CodeError");
  }
  code;
  constructor(message2, code2) {
    super(message2);
    this.code = code2;
  }
};
var AbortError4 = class extends CodeError {
  static {
    __name(this, "AbortError");
  }
  type;
  constructor(message2) {
    super(message2, "ABORT_ERR");
    this.type = "aborted";
    this.name = "AbortError";
  }
};
function byteStream(duplex, opts) {
  const write2 = queuelessPushable();
  duplex.sink(write2).catch(async (err) => {
    await write2.end(err);
  });
  duplex.sink = async (source2) => {
    for await (const buf of source2) {
      await write2.push(buf);
    }
    await write2.end();
  };
  let source = duplex.source;
  if (duplex.source[Symbol.iterator] != null) {
    source = duplex.source[Symbol.iterator]();
  } else if (duplex.source[Symbol.asyncIterator] != null) {
    source = duplex.source[Symbol.asyncIterator]();
  }
  const readBuffer = new Uint8ArrayList();
  const W = {
    read: /* @__PURE__ */ __name(async (bytes3, options) => {
      options?.signal?.throwIfAborted();
      let listener;
      const abortPromise = new Promise((resolve, reject) => {
        listener = /* @__PURE__ */ __name(() => {
          reject(new AbortError4("Read aborted"));
        }, "listener");
        options?.signal?.addEventListener("abort", listener);
      });
      try {
        if (bytes3 == null) {
          const { done, value } = await Promise.race([
            source.next(),
            abortPromise
          ]);
          if (done === true) {
            return new Uint8ArrayList();
          }
          return value;
        }
        while (readBuffer.byteLength < bytes3) {
          const { value, done } = await Promise.race([
            source.next(),
            abortPromise
          ]);
          if (done === true) {
            throw new UnexpectedEOFError2("unexpected end of input");
          }
          readBuffer.append(value);
        }
        const buf = readBuffer.sublist(0, bytes3);
        readBuffer.consume(bytes3);
        return buf;
      } finally {
        if (listener != null) {
          options?.signal?.removeEventListener("abort", listener);
        }
      }
    }, "read"),
    write: /* @__PURE__ */ __name(async (data, options) => {
      options?.signal?.throwIfAborted();
      if (data instanceof Uint8Array) {
        await write2.push(data, options);
      } else {
        await write2.push(data.subarray(), options);
      }
    }, "write"),
    unwrap: /* @__PURE__ */ __name(() => {
      if (readBuffer.byteLength > 0) {
        const originalStream = duplex.source;
        duplex.source = async function* () {
          if (opts?.yieldBytes === false) {
            yield readBuffer;
          } else {
            yield* readBuffer;
          }
          yield* originalStream;
        }();
      }
      return duplex;
    }, "unwrap")
  };
  return W;
}
__name(byteStream, "byteStream");

// node_modules/@libp2p/webrtc/node_modules/it-length-prefixed-stream/dist/src/errors.js
var InvalidMessageLengthError2 = class extends Error {
  static {
    __name(this, "InvalidMessageLengthError");
  }
  name = "InvalidMessageLengthError";
  code = "ERR_INVALID_MSG_LENGTH";
};
var InvalidDataLengthError2 = class extends Error {
  static {
    __name(this, "InvalidDataLengthError");
  }
  name = "InvalidDataLengthError";
  code = "ERR_MSG_DATA_TOO_LONG";
};
var InvalidDataLengthLengthError2 = class extends Error {
  static {
    __name(this, "InvalidDataLengthLengthError");
  }
  name = "InvalidDataLengthLengthError";
  code = "ERR_MSG_LENGTH_TOO_LONG";
};

// node_modules/@libp2p/webrtc/node_modules/it-length-prefixed-stream/dist/src/index.js
function lpStream(duplex, opts = {}) {
  const bytes3 = byteStream(duplex, opts);
  if (opts.maxDataLength != null && opts.maxLengthLength == null) {
    opts.maxLengthLength = encodingLength2(opts.maxDataLength);
  }
  const decodeLength = opts?.lengthDecoder ?? decode5;
  const encodeLength = opts?.lengthEncoder ?? encode4;
  const W = {
    read: /* @__PURE__ */ __name(async (options) => {
      let dataLength = -1;
      const lengthBuffer = new Uint8ArrayList();
      while (true) {
        lengthBuffer.append(await bytes3.read(1, options));
        try {
          dataLength = decodeLength(lengthBuffer);
        } catch (err) {
          if (err instanceof RangeError) {
            continue;
          }
          throw err;
        }
        if (dataLength < 0) {
          throw new InvalidMessageLengthError2("Invalid message length");
        }
        if (opts?.maxLengthLength != null && lengthBuffer.byteLength > opts.maxLengthLength) {
          throw new InvalidDataLengthLengthError2("message length length too long");
        }
        if (dataLength > -1) {
          break;
        }
      }
      if (opts?.maxDataLength != null && dataLength > opts.maxDataLength) {
        throw new InvalidDataLengthError2("message length too long");
      }
      return bytes3.read(dataLength, options);
    }, "read"),
    write: /* @__PURE__ */ __name(async (data, options) => {
      await bytes3.write(new Uint8ArrayList(encodeLength(data.byteLength), data), options);
    }, "write"),
    writeV: /* @__PURE__ */ __name(async (data, options) => {
      const list = new Uint8ArrayList(...data.flatMap((buf) => [encodeLength(buf.byteLength), buf]));
      await bytes3.write(list, options);
    }, "writeV"),
    unwrap: /* @__PURE__ */ __name(() => {
      return bytes3.unwrap();
    }, "unwrap")
  };
  return W;
}
__name(lpStream, "lpStream");

// node_modules/@libp2p/webrtc/node_modules/it-protobuf-stream/dist/src/index.js
function pbStream(duplex, opts) {
  const lp = lpStream(duplex, opts);
  const W = {
    read: /* @__PURE__ */ __name(async (proto, options) => {
      const value = await lp.read(options);
      return proto.decode(value);
    }, "read"),
    write: /* @__PURE__ */ __name(async (message2, proto, options) => {
      await lp.write(proto.encode(message2), options);
    }, "write"),
    writeV: /* @__PURE__ */ __name(async (messages, proto, options) => {
      await lp.writeV(messages.map((message2) => proto.encode(message2)), options);
    }, "writeV"),
    pb: /* @__PURE__ */ __name((proto) => {
      return {
        read: /* @__PURE__ */ __name(async (options) => W.read(proto, options), "read"),
        write: /* @__PURE__ */ __name(async (d, options) => W.write(d, proto, options), "write"),
        writeV: /* @__PURE__ */ __name(async (d, options) => W.writeV(d, proto, options), "writeV"),
        unwrap: /* @__PURE__ */ __name(() => W, "unwrap")
      };
    }, "pb"),
    unwrap: /* @__PURE__ */ __name(() => {
      return lp.unwrap();
    }, "unwrap")
  };
  return W;
}
__name(pbStream, "pbStream");

// node_modules/@libp2p/webrtc/node_modules/progress-events/dist/src/index.js
var CustomProgressEvent = class extends Event {
  static {
    __name(this, "CustomProgressEvent");
  }
  type;
  detail;
  constructor(type, detail) {
    super(type);
    this.type = type;
    this.detail = detail;
  }
};

// node_modules/@libp2p/webrtc/dist/src/error.js
var WebRTCTransportError = class extends Error {
  static {
    __name(this, "WebRTCTransportError");
  }
  constructor(msg) {
    super(`WebRTC transport error: ${msg}`);
    this.name = "WebRTCTransportError";
  }
};
var SDPHandshakeFailedError = class extends WebRTCTransportError {
  static {
    __name(this, "SDPHandshakeFailedError");
  }
  constructor(message2 = "SDP handshake failed") {
    super(message2);
    this.name = "SDPHandshakeFailedError";
  }
};
var DataChannelError = class extends WebRTCTransportError {
  static {
    __name(this, "DataChannelError");
  }
  constructor(streamLabel, msg) {
    super(`[stream: ${streamLabel}] data channel error: ${msg}`);
    this.name = "WebRTC/DataChannelError";
  }
};
var InappropriateMultiaddrError = class extends WebRTCTransportError {
  static {
    __name(this, "InappropriateMultiaddrError");
  }
  constructor(msg) {
    super(`There was a problem with the Multiaddr which was passed in: ${msg}`);
    this.name = "WebRTC/InappropriateMultiaddrError";
  }
};
var InvalidFingerprintError = class extends WebRTCTransportError {
  static {
    __name(this, "InvalidFingerprintError");
  }
  constructor(fingerprint, source) {
    super(`Invalid fingerprint "${fingerprint}" within ${source}`);
    this.name = "WebRTC/InvalidFingerprintError";
  }
};
var UnimplementedError = class extends WebRTCTransportError {
  static {
    __name(this, "UnimplementedError");
  }
  constructor(methodName) {
    super(`A method (${methodName}) was called though it has been intentionally left unimplemented.`);
    this.name = "WebRTC/UnimplementedError";
  }
};
var UnsupportedHashAlgorithmError = class extends WebRTCTransportError {
  static {
    __name(this, "UnsupportedHashAlgorithmError");
  }
  constructor(algo) {
    super(`unsupported hash algorithm code: ${algo} please see the codes at https://github.com/multiformats/multicodec/blob/master/table.csv `);
    this.name = "WebRTC/UnsupportedHashAlgorithmError";
  }
};

// node_modules/@libp2p/webrtc/dist/src/private-to-private/pb/message.js
var Message2;
(function(Message3) {
  let Type;
  (function(Type2) {
    Type2["SDP_OFFER"] = "SDP_OFFER";
    Type2["SDP_ANSWER"] = "SDP_ANSWER";
    Type2["ICE_CANDIDATE"] = "ICE_CANDIDATE";
  })(Type = Message3.Type || (Message3.Type = {}));
  let __TypeValues;
  (function(__TypeValues2) {
    __TypeValues2[__TypeValues2["SDP_OFFER"] = 0] = "SDP_OFFER";
    __TypeValues2[__TypeValues2["SDP_ANSWER"] = 1] = "SDP_ANSWER";
    __TypeValues2[__TypeValues2["ICE_CANDIDATE"] = 2] = "ICE_CANDIDATE";
  })(__TypeValues || (__TypeValues = {}));
  (function(Type2) {
    Type2.codec = () => {
      return enumeration(__TypeValues);
    };
  })(Type = Message3.Type || (Message3.Type = {}));
  let _codec;
  Message3.codec = () => {
    if (_codec == null) {
      _codec = message((obj, w, opts = {}) => {
        if (opts.lengthDelimited !== false) {
          w.fork();
        }
        if (obj.type != null) {
          w.uint32(8);
          Message3.Type.codec().encode(obj.type, w);
        }
        if (obj.data != null) {
          w.uint32(18);
          w.string(obj.data);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3, opts = {}) => {
        const obj = {};
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.type = Message3.Type.codec().decode(reader);
              break;
            }
            case 2: {
              obj.data = reader.string();
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
          }
        }
        return obj;
      });
    }
    return _codec;
  };
  Message3.encode = (obj) => {
    return encodeMessage(obj, Message3.codec());
  };
  Message3.decode = (buf, opts) => {
    return decodeMessage(buf, Message3.codec(), opts);
  };
})(Message2 || (Message2 = {}));

// node_modules/@libp2p/webrtc/dist/src/private-to-private/util.js
var readCandidatesUntilConnected = /* @__PURE__ */ __name(async (pc, stream, options) => {
  try {
    const connectedPromise = pDefer();
    resolveOnConnected(pc, connectedPromise);
    while (true) {
      const message2 = await Promise.race([
        connectedPromise.promise,
        stream.read({
          signal: options.signal
        }).catch(() => {
        })
      ]);
      if (message2 == null) {
        options.signal?.throwIfAborted();
        break;
      }
      if (message2.type !== Message2.Type.ICE_CANDIDATE) {
        throw new InvalidMessageError("ICE candidate message expected");
      }
      const candidateInit = JSON.parse(message2.data ?? "null");
      if (candidateInit === "" || candidateInit === null) {
        options.onProgress?.(new CustomProgressEvent("webrtc:end-of-ice-candidates"));
        options.log.trace("end-of-candidates received");
        continue;
      }
      const candidate = new RTCIceCandidate(candidateInit);
      options.log.trace("%s received new ICE candidate %o", options.direction, candidateInit);
      try {
        options.onProgress?.(new CustomProgressEvent("webrtc:add-ice-candidate", candidate.candidate));
        await pc.addIceCandidate(candidate);
      } catch (err) {
        options.log.error("%s bad candidate received", options.direction, candidateInit, err);
      }
    }
  } catch (err) {
    options.log.error("%s error parsing ICE candidate", options.direction, err);
    if (options.signal?.aborted === true && getConnectionState(pc) !== "connected") {
      throw err;
    }
  }
}, "readCandidatesUntilConnected");
function getConnectionState(pc) {
  return isFirefox ? pc.iceConnectionState : pc.connectionState;
}
__name(getConnectionState, "getConnectionState");
function resolveOnConnected(pc, promise) {
  pc[isFirefox ? "oniceconnectionstatechange" : "onconnectionstatechange"] = (_) => {
    switch (getConnectionState(pc)) {
      case "connected":
        promise.resolve();
        break;
      case "failed":
      case "disconnected":
      case "closed":
        promise.reject(new ConnectionFailedError("RTCPeerConnection was closed"));
        break;
      default:
        break;
    }
  };
}
__name(resolveOnConnected, "resolveOnConnected");

// node_modules/@libp2p/webrtc/dist/src/private-to-private/initiate-connection.js
async function initiateConnection({ rtcConfiguration, dataChannel, signal, metrics, multiaddr: ma, connectionManager, transportManager, log, logger, onProgress }) {
  const { baseAddr } = splitAddr(ma);
  metrics?.dialerEvents.increment({ open: true });
  log.trace("dialing base address: %a", baseAddr);
  const relayPeer = baseAddr.getPeerId();
  if (relayPeer == null) {
    throw new InvalidParametersError("Relay peer was missing");
  }
  const connections = connectionManager.getConnections(peerIdFromString(relayPeer));
  let connection;
  let shouldCloseConnection = false;
  if (connections.length === 0) {
    onProgress?.(new CustomProgressEvent("webrtc:dial-relay"));
    connection = await transportManager.dial(baseAddr, {
      signal,
      onProgress
    });
    shouldCloseConnection = true;
  } else {
    onProgress?.(new CustomProgressEvent("webrtc:reuse-relay-connection"));
    connection = connections[0];
  }
  try {
    onProgress?.(new CustomProgressEvent("webrtc:open-signaling-stream"));
    const stream = await connection.newStream(SIGNALING_PROTO_ID, {
      signal,
      runOnLimitedConnection: true
    });
    const messageStream = pbStream(stream).pb(Message2);
    const peerConnection = new RTCPeerConnection(rtcConfiguration);
    const muxerFactory = new DataChannelMuxerFactory({
      logger
    }, {
      peerConnection,
      dataChannelOptions: dataChannel
    });
    try {
      const channel = peerConnection.createDataChannel("init");
      peerConnection.onicecandidate = ({ candidate }) => {
        const data = JSON.stringify(candidate?.toJSON() ?? null);
        log.trace("initiator sending ICE candidate %o", candidate);
        void messageStream.write({
          type: Message2.Type.ICE_CANDIDATE,
          data
        }, {
          signal
        }).catch((err) => {
          log.error("error sending ICE candidate", err);
        });
      };
      peerConnection.onicecandidateerror = (event) => {
        log.error("initiator ICE candidate error", event);
      };
      const offerSdp = await peerConnection.createOffer().catch((err) => {
        log.error("could not execute createOffer", err);
        throw new SDPHandshakeFailedError("Failed to set createOffer");
      });
      log.trace("initiator send SDP offer %s", offerSdp.sdp);
      onProgress?.(new CustomProgressEvent("webrtc:send-sdp-offer"));
      await messageStream.write({ type: Message2.Type.SDP_OFFER, data: offerSdp.sdp }, {
        signal
      });
      await peerConnection.setLocalDescription(offerSdp).catch((err) => {
        log.error("could not execute setLocalDescription", err);
        throw new SDPHandshakeFailedError("Failed to set localDescription");
      });
      onProgress?.(new CustomProgressEvent("webrtc:read-sdp-answer"));
      log.trace("initiator read SDP answer");
      const answerMessage = await messageStream.read({
        signal
      });
      if (answerMessage.type !== Message2.Type.SDP_ANSWER) {
        throw new SDPHandshakeFailedError("Remote should send an SDP answer");
      }
      log.trace("initiator received SDP answer %s", answerMessage.data);
      const answerSdp = new RTCSessionDescription({ type: "answer", sdp: answerMessage.data });
      await peerConnection.setRemoteDescription(answerSdp).catch((err) => {
        log.error("could not execute setRemoteDescription", err);
        throw new SDPHandshakeFailedError("Failed to set remoteDescription");
      });
      log.trace("initiator read candidates until connected");
      onProgress?.(new CustomProgressEvent("webrtc:read-ice-candidates"));
      await readCandidatesUntilConnected(peerConnection, messageStream, {
        direction: "initiator",
        signal,
        log,
        onProgress
      });
      log.trace("initiator connected, closing init channel");
      channel.close();
      onProgress?.(new CustomProgressEvent("webrtc:close-signaling-stream"));
      log.trace("closing signaling channel");
      await stream.close({
        signal
      });
      log.trace("initiator connected to remote address %s", ma);
      return {
        remoteAddress: ma,
        peerConnection,
        muxerFactory
      };
    } catch (err) {
      log.error("outgoing signaling error", err);
      peerConnection.close();
      stream.abort(err);
      throw err;
    } finally {
      peerConnection.onicecandidate = null;
      peerConnection.onicecandidateerror = null;
    }
  } finally {
    if (shouldCloseConnection) {
      try {
        await connection.close({
          signal
        });
      } catch (err) {
        connection.abort(err);
      }
    }
  }
}
__name(initiateConnection, "initiateConnection");

// node_modules/@libp2p/webrtc/node_modules/@multiformats/mafmt/dist/src/index.js
var DNS42 = base3("dns4");
var DNS62 = base3("dns6");
var DNSADDR2 = base3("dnsaddr");
var DNS2 = or3(base3("dns"), DNSADDR2, DNS42, DNS62);
var IP2 = or3(base3("ip4"), base3("ip6"));
var TCP2 = or3(and2(IP2, base3("tcp")), and2(DNS2, base3("tcp")));
var UDP2 = and2(IP2, base3("udp"));
var UTP = and2(UDP2, base3("utp"));
var QUIC2 = and2(UDP2, base3("quic"));
var QUICV12 = and2(UDP2, base3("quic-v1"));
var _WebSockets2 = or3(and2(TCP2, base3("ws")), and2(DNS2, base3("ws")));
var WebSockets2 = or3(and2(_WebSockets2, base3("p2p")), _WebSockets2);
var _WebSocketsSecure2 = or3(and2(TCP2, base3("wss")), and2(DNS2, base3("wss")), and2(TCP2, base3("tls"), base3("ws")), and2(DNS2, base3("tls"), base3("ws")));
var WebSocketsSecure2 = or3(and2(_WebSocketsSecure2, base3("p2p")), _WebSocketsSecure2);
var HTTP2 = or3(and2(TCP2, base3("http")), and2(IP2, base3("http")), and2(DNS2, base3("http")));
var HTTPS2 = or3(and2(TCP2, base3("https")), and2(IP2, base3("https")), and2(DNS2, base3("https")));
var _WebRTCDirect2 = and2(UDP2, base3("webrtc-direct"), base3("certhash"));
var WebRTCDirect2 = or3(and2(_WebRTCDirect2, base3("p2p")), _WebRTCDirect2);
var _WebTransport2 = and2(QUICV12, base3("webtransport"), base3("certhash"), base3("certhash"));
var WebTransport2 = or3(and2(_WebTransport2, base3("p2p")), _WebTransport2);
var P2PWebRTCStar = or3(and2(WebSockets2, base3("p2p-webrtc-star"), base3("p2p")), and2(WebSocketsSecure2, base3("p2p-webrtc-star"), base3("p2p")), and2(WebSockets2, base3("p2p-webrtc-star")), and2(WebSocketsSecure2, base3("p2p-webrtc-star")));
var WebSocketStar = or3(and2(WebSockets2, base3("p2p-websocket-star"), base3("p2p")), and2(WebSocketsSecure2, base3("p2p-websocket-star"), base3("p2p")), and2(WebSockets2, base3("p2p-websocket-star")), and2(WebSocketsSecure2, base3("p2p-websocket-star")));
var P2PWebRTCDirect = or3(and2(HTTP2, base3("p2p-webrtc-direct"), base3("p2p")), and2(HTTPS2, base3("p2p-webrtc-direct"), base3("p2p")), and2(HTTP2, base3("p2p-webrtc-direct")), and2(HTTPS2, base3("p2p-webrtc-direct")));
var Reliable = or3(_WebSockets2, _WebSocketsSecure2, HTTP2, HTTPS2, P2PWebRTCStar, P2PWebRTCDirect, TCP2, UTP, QUIC2, DNS2, WebRTCDirect2, WebTransport2);
var Stardust = or3(and2(Reliable, base3("p2p-stardust"), base3("p2p")), and2(Reliable, base3("p2p-stardust")));
var _P2P2 = or3(and2(Reliable, base3("p2p")), P2PWebRTCStar, P2PWebRTCDirect, WebRTCDirect2, WebTransport2, base3("p2p"));
var _Circuit2 = or3(and2(_P2P2, base3("p2p-circuit"), _P2P2), and2(_P2P2, base3("p2p-circuit")), and2(base3("p2p-circuit"), _P2P2), and2(Reliable, base3("p2p-circuit")), and2(base3("p2p-circuit"), Reliable), base3("p2p-circuit"));
var CircuitRecursive = /* @__PURE__ */ __name(() => or3(and2(_Circuit2, CircuitRecursive), _Circuit2), "CircuitRecursive");
var Circuit2 = CircuitRecursive();
var P2P2 = or3(and2(Circuit2, _P2P2, Circuit2), and2(_P2P2, Circuit2), and2(Circuit2, _P2P2), Circuit2, _P2P2);
var WebRTC2 = or3(and2(Circuit2, base3("webrtc"), base3("p2p")), and2(Circuit2, base3("webrtc")), and2(Reliable, base3("webrtc"), base3("p2p")), and2(Reliable, base3("webrtc")), base3("webrtc"));
function makeMatchesFunction(partialMatch) {
  function matches(a) {
    let ma;
    try {
      ma = multiaddr(a);
    } catch (err) {
      return false;
    }
    const out = partialMatch(ma.protoNames());
    if (out === null) {
      return false;
    }
    if (out === true || out === false) {
      return out;
    }
    return out.length === 0;
  }
  __name(matches, "matches");
  return matches;
}
__name(makeMatchesFunction, "makeMatchesFunction");
function and2(...args) {
  function partialMatch(a) {
    if (a.length < args.length) {
      return null;
    }
    let out = a;
    args.some((arg) => {
      out = typeof arg === "function" ? arg().partialMatch(a) : arg.partialMatch(a);
      if (Array.isArray(out)) {
        a = out;
      }
      if (out === null) {
        return true;
      }
      return false;
    });
    return out;
  }
  __name(partialMatch, "partialMatch");
  return {
    toString: /* @__PURE__ */ __name(function() {
      return "{ " + args.join(" ") + " }";
    }, "toString"),
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch
  };
}
__name(and2, "and");
function or3(...args) {
  function partialMatch(a) {
    let out = null;
    args.some((arg) => {
      const res = typeof arg === "function" ? arg().partialMatch(a) : arg.partialMatch(a);
      if (res != null) {
        out = res;
        return true;
      }
      return false;
    });
    return out;
  }
  __name(partialMatch, "partialMatch");
  const result = {
    toString: /* @__PURE__ */ __name(function() {
      return "{ " + args.join(" ") + " }";
    }, "toString"),
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch
  };
  return result;
}
__name(or3, "or");
function base3(n) {
  const name2 = n;
  function matches(a) {
    let ma;
    try {
      ma = multiaddr(a);
    } catch (err) {
      return false;
    }
    const pnames = ma.protoNames();
    if (pnames.length === 1 && pnames[0] === name2) {
      return true;
    }
    return false;
  }
  __name(matches, "matches");
  function partialMatch(protos) {
    if (protos.length === 0) {
      return null;
    }
    if (protos[0] === name2) {
      return protos.slice(1);
    }
    return null;
  }
  __name(partialMatch, "partialMatch");
  return {
    toString: /* @__PURE__ */ __name(function() {
      return name2;
    }, "toString"),
    matches,
    partialMatch
  };
}
__name(base3, "base");

// node_modules/@libp2p/webrtc/dist/src/private-to-private/listener.js
var WebRTCPeerListener = class extends TypedEventEmitter {
  static {
    __name(this, "WebRTCPeerListener");
  }
  peerId;
  transportManager;
  shutdownController;
  constructor(components, init) {
    super();
    this.peerId = components.peerId;
    this.transportManager = components.transportManager;
    this.shutdownController = init.shutdownController;
  }
  async listen() {
    this.safeDispatchEvent("listening", {});
  }
  getAddrs() {
    return this.transportManager.getListeners().filter((l) => l !== this).map((l) => l.getAddrs().filter((ma) => Circuit2.matches(ma)).map((ma) => {
      return ma.encapsulate(`/webrtc/p2p/${this.peerId}`);
    })).flat();
  }
  async close() {
    this.shutdownController.abort();
    this.safeDispatchEvent("close", {});
  }
};

// node_modules/@libp2p/webrtc/dist/src/private-to-private/signaling-stream-handler.js
async function handleIncomingStream({ peerConnection, stream, signal, connection, log }) {
  log.trace("new inbound signaling stream");
  const messageStream = pbStream(stream).pb(Message2);
  try {
    peerConnection.onicecandidate = ({ candidate }) => {
      const data = JSON.stringify(candidate?.toJSON() ?? null);
      log.trace("recipient sending ICE candidate %s", data);
      messageStream.write({
        type: Message2.Type.ICE_CANDIDATE,
        data
      }, {
        signal
      }).catch((err) => {
        log.error("error sending ICE candidate", err);
      });
    };
    log.trace("recipient read SDP offer");
    const pbOffer = await messageStream.read({
      signal
    });
    if (pbOffer.type !== Message2.Type.SDP_OFFER) {
      throw new SDPHandshakeFailedError(`expected message type SDP_OFFER, received: ${pbOffer.type ?? "undefined"} `);
    }
    log.trace("recipient received SDP offer %s", pbOffer.data);
    const offer = new RTCSessionDescription({
      type: "offer",
      sdp: pbOffer.data
    });
    await peerConnection.setRemoteDescription(offer).catch((err) => {
      log.error("could not execute setRemoteDescription", err);
      throw new SDPHandshakeFailedError("Failed to set remoteDescription");
    });
    const answer = await peerConnection.createAnswer().catch((err) => {
      log.error("could not execute createAnswer", err);
      throw new SDPHandshakeFailedError("Failed to create answer");
    });
    log.trace("recipient send SDP answer %s", answer.sdp);
    await messageStream.write({ type: Message2.Type.SDP_ANSWER, data: answer.sdp }, {
      signal
    });
    await peerConnection.setLocalDescription(answer).catch((err) => {
      log.error("could not execute setLocalDescription", err);
      throw new SDPHandshakeFailedError("Failed to set localDescription");
    });
    log.trace("recipient read candidates until connected");
    await readCandidatesUntilConnected(peerConnection, messageStream, {
      direction: "recipient",
      signal,
      log
    });
  } catch (err) {
    if (getConnectionState(peerConnection) !== "connected") {
      log.error("error while handling signaling stream from peer %a", connection.remoteAddr, err);
      peerConnection.close();
      throw err;
    } else {
      log("error while handling signaling stream from peer %a, ignoring as the RTCPeerConnection is already connected", connection.remoteAddr, err);
    }
  }
  const remoteAddress = multiaddr(`/webrtc/p2p/${connection.remoteAddr.getPeerId()}`);
  log.trace("recipient connected to remote address %s", remoteAddress);
  return { remoteAddress };
}
__name(handleIncomingStream, "handleIncomingStream");

// node_modules/@libp2p/webrtc/dist/src/private-to-private/transport.js
var WEBRTC_TRANSPORT = "/webrtc";
var CIRCUIT_RELAY_TRANSPORT = "/p2p-circuit";
var SIGNALING_PROTO_ID = "/webrtc-signaling/0.0.1";
var INBOUND_CONNECTION_TIMEOUT = 30 * 1e3;
var WebRTCTransport = class {
  static {
    __name(this, "WebRTCTransport");
  }
  components;
  init;
  log;
  _started = false;
  metrics;
  shutdownController;
  constructor(components, init = {}) {
    this.components = components;
    this.init = init;
    this.log = components.logger.forComponent("libp2p:webrtc");
    this.shutdownController = new AbortController();
    setMaxListeners2(Infinity, this.shutdownController.signal);
    if (components.metrics != null) {
      this.metrics = {
        dialerEvents: components.metrics.registerCounterGroup("libp2p_webrtc_dialer_events_total", {
          label: "event",
          help: "Total count of WebRTC dialer events by type"
        }),
        listenerEvents: components.metrics.registerCounterGroup("libp2p_webrtc_listener_events_total", {
          label: "event",
          help: "Total count of WebRTC listener events by type"
        })
      };
    }
  }
  [transportSymbol] = true;
  [Symbol.toStringTag] = "@libp2p/webrtc";
  [serviceCapabilities] = [
    "@libp2p/transport"
  ];
  [serviceDependencies] = [
    "@libp2p/identify",
    "@libp2p/circuit-relay-v2-transport"
  ];
  isStarted() {
    return this._started;
  }
  async start() {
    await this.components.registrar.handle(SIGNALING_PROTO_ID, (data) => {
      this._onProtocol(data).catch((err) => {
        this.log.error("failed to handle incoming connect from %p", data.connection.remotePeer, err);
      });
    }, {
      runOnLimitedConnection: true
    });
    this._started = true;
  }
  async stop() {
    await this.components.registrar.unhandle(SIGNALING_PROTO_ID);
    this._started = false;
  }
  createListener(options) {
    return new WebRTCPeerListener(this.components, {
      shutdownController: this.shutdownController
    });
  }
  /**
   * Filter check for all Multiaddrs that this transport can listen on
   */
  listenFilter(multiaddrs) {
    return multiaddrs.filter(WebRTC.exactMatch);
  }
  /**
   * Filter check for all Multiaddrs that this transport can dial
   */
  dialFilter(multiaddrs) {
    return this.listenFilter(multiaddrs);
  }
  /*
   * dial connects to a remote via the circuit relay or any other protocol
   * and proceeds to upgrade to a webrtc connection.
   * multiaddr of the form: <multiaddr>/webrtc/p2p/<destination-peer>
   * For a circuit relay, this will be of the form
   * <relay address>/p2p/<relay-peer>/p2p-circuit/webrtc/p2p/<destination-peer>
  */
  async dial(ma, options) {
    this.log.trace("dialing address: %a", ma);
    const { remoteAddress, peerConnection, muxerFactory } = await initiateConnection({
      rtcConfiguration: await getRtcConfiguration(this.init.rtcConfiguration),
      dataChannel: this.init.dataChannel,
      multiaddr: ma,
      dataChannelOptions: this.init.dataChannel,
      signal: options.signal,
      connectionManager: this.components.connectionManager,
      transportManager: this.components.transportManager,
      log: this.log,
      logger: this.components.logger,
      onProgress: options.onProgress
    });
    const webRTCConn = new WebRTCMultiaddrConnection(this.components, {
      peerConnection,
      timeline: { open: Date.now() },
      remoteAddr: remoteAddress,
      metrics: this.metrics?.dialerEvents
    });
    const connection = await options.upgrader.upgradeOutbound(webRTCConn, {
      skipProtection: true,
      skipEncryption: true,
      muxerFactory,
      onProgress: options.onProgress
    });
    this._closeOnShutdown(peerConnection, webRTCConn);
    return connection;
  }
  async _onProtocol({ connection, stream }) {
    const signal = AbortSignal.timeout(this.init.inboundConnectionTimeout ?? INBOUND_CONNECTION_TIMEOUT);
    const peerConnection = new RTCPeerConnection(await getRtcConfiguration(this.init.rtcConfiguration));
    const muxerFactory = new DataChannelMuxerFactory(this.components, {
      peerConnection,
      dataChannelOptions: this.init.dataChannel
    });
    try {
      const { remoteAddress } = await handleIncomingStream({
        peerConnection,
        connection,
        stream,
        signal,
        log: this.log
      });
      await stream.close({
        signal
      });
      const webRTCConn = new WebRTCMultiaddrConnection(this.components, {
        peerConnection,
        timeline: { open: (/* @__PURE__ */ new Date()).getTime() },
        remoteAddr: remoteAddress,
        metrics: this.metrics?.listenerEvents
      });
      await this.components.upgrader.upgradeInbound(webRTCConn, {
        skipEncryption: true,
        skipProtection: true,
        muxerFactory
      });
      this._closeOnShutdown(peerConnection, webRTCConn);
    } catch (err) {
      this.log.error("incoming signaling error", err);
      peerConnection.close();
      stream.abort(err);
      throw err;
    }
  }
  _closeOnShutdown(pc, webRTCConn) {
    const shutDownListener = /* @__PURE__ */ __name(() => {
      webRTCConn.close().catch((err) => {
        this.log.error("could not close WebRTCMultiaddrConnection", err);
      });
    }, "shutDownListener");
    this.shutdownController.signal.addEventListener("abort", shutDownListener);
    pc.addEventListener("close", () => {
      this.shutdownController.signal.removeEventListener("abort", shutDownListener);
    });
  }
};
function splitAddr(ma) {
  const addrs = ma.toString().split(WEBRTC_TRANSPORT + "/");
  if (addrs.length !== 2) {
    throw new InvalidParametersError("webrtc protocol was not present in multiaddr");
  }
  if (!addrs[0].includes(CIRCUIT_RELAY_TRANSPORT)) {
    throw new InvalidParametersError("p2p-circuit protocol was not present in multiaddr");
  }
  let remoteAddr = multiaddr(addrs[0]);
  const destination = multiaddr("/" + addrs[1]);
  const destinationIdString = destination.getPeerId();
  if (destinationIdString == null) {
    throw new InvalidParametersError("destination peer id was missing");
  }
  const lastProtoInRemote = remoteAddr.protos().pop();
  if (lastProtoInRemote === void 0) {
    throw new InvalidParametersError("invalid multiaddr");
  }
  if (lastProtoInRemote.name !== "p2p") {
    remoteAddr = remoteAddr.encapsulate(`/p2p/${destinationIdString}`);
  }
  return { baseAddr: remoteAddr, peerId: peerIdFromString(destinationIdString) };
}
__name(splitAddr, "splitAddr");

// node_modules/@libp2p/webrtc/node_modules/it-pair/dist/src/index.js
function pair() {
  const deferred = pDefer();
  let piped = false;
  return {
    sink: /* @__PURE__ */ __name(async (source) => {
      if (piped) {
        throw new Error("already piped");
      }
      piped = true;
      deferred.resolve(source);
    }, "sink"),
    source: async function* () {
      const source = await deferred.promise;
      yield* source;
    }()
  };
}
__name(pair, "pair");

// node_modules/@libp2p/webrtc/node_modules/it-pair/dist/src/duplex.js
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
__name(duplexPair, "duplexPair");

// node_modules/@libp2p/webrtc/node_modules/it-merge/dist/src/index.js
function isAsyncIterable2(thing) {
  return thing[Symbol.asyncIterator] != null;
}
__name(isAsyncIterable2, "isAsyncIterable");
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
__name(merge, "merge");
var src_default = merge;

// node_modules/@libp2p/webrtc/node_modules/it-pipe/dist/src/index.js
function pipe(first, ...rest) {
  if (first == null) {
    throw new Error("Empty pipeline");
  }
  if (isDuplex(first)) {
    const duplex = first;
    first = /* @__PURE__ */ __name(() => duplex.source, "first");
  } else if (isIterable(first) || isAsyncIterable3(first)) {
    const source = first;
    first = /* @__PURE__ */ __name(() => source, "first");
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
__name(pipe, "pipe");
var rawPipe = /* @__PURE__ */ __name((...fns) => {
  let res;
  while (fns.length > 0) {
    res = fns.shift()(res);
  }
  return res;
}, "rawPipe");
var isAsyncIterable3 = /* @__PURE__ */ __name((obj) => {
  return obj?.[Symbol.asyncIterator] != null;
}, "isAsyncIterable");
var isIterable = /* @__PURE__ */ __name((obj) => {
  return obj?.[Symbol.iterator] != null;
}, "isIterable");
var isDuplex = /* @__PURE__ */ __name((obj) => {
  if (obj == null) {
    return false;
  }
  return obj.sink != null && obj.source != null;
}, "isDuplex");
var duplexPipelineFn = /* @__PURE__ */ __name((duplex) => {
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
        sourceWrap = /* @__PURE__ */ __name(async function* () {
          yield* source2;
          stream.end();
        }, "sourceWrap");
      } else if (isIterable(source2)) {
        sourceWrap = /* @__PURE__ */ __name(function* () {
          yield* source2;
          stream.end();
        }, "sourceWrap");
      } else {
        throw new Error("Unknown duplex source type - must be Iterable or AsyncIterable");
      }
      return src_default(stream, sourceWrap());
    }
    return duplex.source;
  };
}, "duplexPipelineFn");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/constants.js
var NOISE_MSG_MAX_LENGTH_BYTES = 65535;
var NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG = NOISE_MSG_MAX_LENGTH_BYTES - 16;
var DUMP_SESSION_KEYS = Boolean(globalThis.process?.env?.DUMP_SESSION_KEYS);

// node_modules/@libp2p/webrtc/node_modules/@noble/ciphers/esm/_assert.js
function number3(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
__name(number3, "number");
function bool(b) {
  if (typeof b !== "boolean")
    throw new Error(`boolean expected, not ${b}`);
}
__name(bool, "bool");
function isBytes3(a) {
  return a instanceof Uint8Array || a != null && typeof a === "object" && a.constructor.name === "Uint8Array";
}
__name(isBytes3, "isBytes");
function bytes2(b, ...lengths) {
  if (!isBytes3(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
__name(bytes2, "bytes");
function exists2(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
__name(exists2, "exists");
function output2(out, instance) {
  bytes2(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
__name(output2, "output");

// node_modules/@libp2p/webrtc/node_modules/@noble/ciphers/esm/utils.js
var u32 = /* @__PURE__ */ __name((arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4)), "u32");
var createView2 = /* @__PURE__ */ __name((arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength), "createView");
var isLE2 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE2)
  throw new Error("Non little-endian hardware is not supported");
function utf8ToBytes3(str) {
  if (typeof str !== "string")
    throw new Error(`string expected, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
__name(utf8ToBytes3, "utf8ToBytes");
function toBytes3(data) {
  if (typeof data === "string")
    data = utf8ToBytes3(data);
  else if (isBytes3(data))
    data = copyBytes(data);
  else
    throw new Error(`Uint8Array expected, got ${typeof data}`);
  return data;
}
__name(toBytes3, "toBytes");
function checkOpts(defaults, opts) {
  if (opts == null || typeof opts !== "object")
    throw new Error("options must be defined");
  const merged = Object.assign(defaults, opts);
  return merged;
}
__name(checkOpts, "checkOpts");
function equalBytes2(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++)
    diff |= a[i] ^ b[i];
  return diff === 0;
}
__name(equalBytes2, "equalBytes");
var wrapCipher = /* @__PURE__ */ __name(/* @__NO_SIDE_EFFECTS__ */ (params, c) => {
  Object.assign(c, params);
  return c;
}, "wrapCipher");
function setBigUint642(view, byteOffset, value, isLE3) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE3);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE3 ? 4 : 0;
  const l = isLE3 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE3);
  view.setUint32(byteOffset + l, wl, isLE3);
}
__name(setBigUint642, "setBigUint64");
function copyBytes(bytes3) {
  return Uint8Array.from(bytes3);
}
__name(copyBytes, "copyBytes");
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
__name(clean, "clean");

// node_modules/@libp2p/webrtc/node_modules/@noble/ciphers/esm/_arx.js
var _utf8ToBytes = /* @__PURE__ */ __name((str) => Uint8Array.from(str.split("").map((c) => c.charCodeAt(0))), "_utf8ToBytes");
var sigma16 = _utf8ToBytes("expand 16-byte k");
var sigma32 = _utf8ToBytes("expand 32-byte k");
var sigma16_32 = u32(sigma16);
var sigma32_32 = u32(sigma32);
var sigma = sigma32_32.slice();
function rotl(a, b) {
  return a << b | a >>> 32 - b;
}
__name(rotl, "rotl");
function isAligned32(b) {
  return b.byteOffset % 4 === 0;
}
__name(isAligned32, "isAligned32");
var BLOCK_LEN = 64;
var BLOCK_LEN32 = 16;
var MAX_COUNTER = 2 ** 32 - 1;
var U32_EMPTY = new Uint32Array();
function runCipher(core, sigma2, key, nonce, data, output3, counter, rounds) {
  const len = data.length;
  const block = new Uint8Array(BLOCK_LEN);
  const b32 = u32(block);
  const isAligned = isAligned32(data) && isAligned32(output3);
  const d32 = isAligned ? u32(data) : U32_EMPTY;
  const o32 = isAligned ? u32(output3) : U32_EMPTY;
  for (let pos = 0; pos < len; counter++) {
    core(sigma2, key, nonce, b32, counter, rounds);
    if (counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    const take = Math.min(BLOCK_LEN, len - pos);
    if (isAligned && take === BLOCK_LEN) {
      const pos32 = pos / 4;
      if (pos % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let j = 0, posj; j < BLOCK_LEN32; j++) {
        posj = pos32 + j;
        o32[posj] = d32[posj] ^ b32[j];
      }
      pos += BLOCK_LEN;
      continue;
    }
    for (let j = 0, posj; j < take; j++) {
      posj = pos + j;
      output3[posj] = data[posj] ^ block[j];
    }
    pos += take;
  }
}
__name(runCipher, "runCipher");
function createCipher(core, opts) {
  const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = checkOpts({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, opts);
  if (typeof core !== "function")
    throw new Error("core must be a function");
  number3(counterLength);
  number3(rounds);
  bool(counterRight);
  bool(allowShortKeys);
  return (key, nonce, data, output3, counter = 0) => {
    bytes2(key);
    bytes2(nonce);
    bytes2(data);
    const len = data.length;
    if (output3 === void 0)
      output3 = new Uint8Array(len);
    bytes2(output3);
    number3(counter);
    if (counter < 0 || counter >= MAX_COUNTER)
      throw new Error("arx: counter overflow");
    if (output3.length < len)
      throw new Error(`arx: output (${output3.length}) is shorter than data (${len})`);
    const toClean = [];
    let l = key.length, k, sigma2;
    if (l === 32) {
      toClean.push(k = copyBytes(key));
      sigma2 = sigma32_32;
    } else if (l === 16 && allowShortKeys) {
      k = new Uint8Array(32);
      k.set(key);
      k.set(key, 16);
      sigma2 = sigma16_32;
      toClean.push(k);
    } else {
      throw new Error(`arx: invalid 32-byte key, got length=${l}`);
    }
    if (!isAligned32(nonce))
      toClean.push(nonce = copyBytes(nonce));
    const k32 = u32(k);
    if (extendNonceFn) {
      if (nonce.length !== 24)
        throw new Error(`arx: extended nonce must be 24 bytes`);
      extendNonceFn(sigma2, k32, u32(nonce.subarray(0, 16)), k32);
      nonce = nonce.subarray(16);
    }
    const nonceNcLen = 16 - counterLength;
    if (nonceNcLen !== nonce.length)
      throw new Error(`arx: nonce must be ${nonceNcLen} or 16 bytes`);
    if (nonceNcLen !== 12) {
      const nc = new Uint8Array(12);
      nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
      nonce = nc;
      toClean.push(nonce);
    }
    const n32 = u32(nonce);
    runCipher(core, sigma2, k32, n32, data, output3, counter, rounds);
    clean(...toClean);
    return output3;
  };
}
__name(createCipher, "createCipher");

// node_modules/@libp2p/webrtc/node_modules/@noble/ciphers/esm/_poly1305.js
var u8to16 = /* @__PURE__ */ __name((a, i) => a[i++] & 255 | (a[i++] & 255) << 8, "u8to16");
var Poly1305 = class {
  static {
    __name(this, "Poly1305");
  }
  constructor(key) {
    this.blockLen = 16;
    this.outputLen = 16;
    this.buffer = new Uint8Array(16);
    this.r = new Uint16Array(10);
    this.h = new Uint16Array(10);
    this.pad = new Uint16Array(8);
    this.pos = 0;
    this.finished = false;
    key = toBytes3(key);
    bytes2(key, 32);
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
    clean(g);
  }
  update(data) {
    exists2(this);
    const { buffer, blockLen } = this;
    data = toBytes3(data);
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
    clean(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(out) {
    exists2(this);
    output2(out, this);
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
  const hashC = /* @__PURE__ */ __name((msg, key) => hashCons(key).update(toBytes3(msg)).digest(), "hashC");
  const tmp = hashCons(new Uint8Array(32));
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key) => hashCons(key);
  return hashC;
}
__name(wrapConstructorWithKey, "wrapConstructorWithKey");
var poly1305 = wrapConstructorWithKey((key) => new Poly1305(key));

// node_modules/@libp2p/webrtc/node_modules/@noble/ciphers/esm/chacha.js
function chachaCore(s, k, n, out, cnt, rounds = 20) {
  let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2];
  let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
  for (let r = 0; r < rounds; r += 2) {
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
__name(chachaCore, "chachaCore");
function hchacha(s, k, i, o32) {
  let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
  for (let r = 0; r < 20; r += 2) {
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
  o32[oi++] = x00;
  o32[oi++] = x01;
  o32[oi++] = x02;
  o32[oi++] = x03;
  o32[oi++] = x12;
  o32[oi++] = x13;
  o32[oi++] = x14;
  o32[oi++] = x15;
}
__name(hchacha, "hchacha");
var chacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 4,
  allowShortKeys: false
});
var xchacha20 = /* @__PURE__ */ createCipher(chachaCore, {
  counterRight: false,
  counterLength: 8,
  extendNonceFn: hchacha,
  allowShortKeys: false
});
var ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
var updatePadded = /* @__PURE__ */ __name((h, msg) => {
  h.update(msg);
  const left = msg.length % 16;
  if (left)
    h.update(ZEROS16.subarray(left));
}, "updatePadded");
var ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, data, AAD) {
  const authKey = fn(key, nonce, ZEROS32);
  const h = poly1305.create(authKey);
  if (AAD)
    updatePadded(h, AAD);
  updatePadded(h, data);
  const num = new Uint8Array(16);
  const view = createView2(num);
  setBigUint642(view, 0, BigInt(AAD ? AAD.length : 0), true);
  setBigUint642(view, 8, BigInt(data.length), true);
  h.update(num);
  const res = h.digest();
  clean(authKey, num);
  return res;
}
__name(computeTag, "computeTag");
var _poly1305_aead = /* @__PURE__ */ __name((xorStream) => (key, nonce, AAD) => {
  const tagLength = 16;
  bytes2(key, 32);
  bytes2(nonce);
  return {
    encrypt(plaintext, output3) {
      const plength = plaintext.length;
      const clength = plength + tagLength;
      if (output3) {
        bytes2(output3, clength);
      } else {
        output3 = new Uint8Array(clength);
      }
      xorStream(key, nonce, plaintext, output3, 1);
      const tag = computeTag(xorStream, key, nonce, output3.subarray(0, -tagLength), AAD);
      output3.set(tag, plength);
      clean(tag);
      return output3;
    },
    decrypt(ciphertext, output3) {
      const clength = ciphertext.length;
      const plength = clength - tagLength;
      if (clength < tagLength)
        throw new Error(`encrypted data must be at least ${tagLength} bytes`);
      if (output3) {
        bytes2(output3, plength);
      } else {
        output3 = new Uint8Array(plength);
      }
      const data = ciphertext.subarray(0, -tagLength);
      const passedTag = ciphertext.subarray(-tagLength);
      const tag = computeTag(xorStream, key, nonce, data, AAD);
      if (!equalBytes2(passedTag, tag))
        throw new Error("invalid tag");
      xorStream(key, nonce, data, output3, 1);
      clean(tag);
      return output3;
    }
  };
}, "_poly1305_aead");
var chacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 12, tagLength: 16 }, _poly1305_aead(chacha20));
var xchacha20poly1305 = /* @__PURE__ */ wrapCipher({ blockSize: 64, nonceLength: 24, tagLength: 16 }, _poly1305_aead(xchacha20));

// node_modules/@libp2p/webrtc/node_modules/@noble/hashes/esm/hkdf.js
function extract(hash2, ikm, salt) {
  hash(hash2);
  if (salt === void 0)
    salt = new Uint8Array(hash2.outputLen);
  return hmac(hash2, toBytes(salt), toBytes(ikm));
}
__name(extract, "extract");
var HKDF_COUNTER = /* @__PURE__ */ new Uint8Array([0]);
var EMPTY_BUFFER2 = /* @__PURE__ */ new Uint8Array();
function expand(hash2, prk, info, length3 = 32) {
  hash(hash2);
  number(length3);
  if (length3 > 255 * hash2.outputLen)
    throw new Error("Length should be <= 255*HashLen");
  const blocks = Math.ceil(length3 / hash2.outputLen);
  if (info === void 0)
    info = EMPTY_BUFFER2;
  const okm = new Uint8Array(blocks * hash2.outputLen);
  const HMAC2 = hmac.create(hash2, prk);
  const HMACTmp = HMAC2._cloneInto();
  const T = new Uint8Array(HMAC2.outputLen);
  for (let counter = 0; counter < blocks; counter++) {
    HKDF_COUNTER[0] = counter + 1;
    HMACTmp.update(counter === 0 ? EMPTY_BUFFER2 : T).update(info).update(HKDF_COUNTER).digestInto(T);
    okm.set(T, hash2.outputLen * counter);
    HMAC2._cloneInto(HMACTmp);
  }
  HMAC2.destroy();
  HMACTmp.destroy();
  T.fill(0);
  HKDF_COUNTER.fill(0);
  return okm.slice(0, length3);
}
__name(expand, "expand");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/crypto/js.js
var pureJsCrypto = {
  hashSHA256(data) {
    return sha2562(data.subarray());
  },
  getHKDF(ck, ikm) {
    const prk = extract(sha2562, ikm, ck);
    const okmU8Array = expand(sha2562, prk, void 0, 96);
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
    return x25519.getSharedSecret(privateKey.subarray(), publicKey.subarray());
  },
  chaCha20Poly1305Encrypt(plaintext, nonce, ad, k) {
    return chacha20poly1305(k, nonce, ad).encrypt(plaintext.subarray());
  },
  chaCha20Poly1305Decrypt(ciphertext, nonce, ad, k, dst) {
    return chacha20poly1305(k, nonce, ad).decrypt(ciphertext.subarray(), dst);
  }
};

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/crypto/index.browser.js
var defaultCrypto = pureJsCrypto;

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/crypto.js
function wrapCrypto(crypto3) {
  return {
    generateKeypair: crypto3.generateX25519KeyPair,
    dh: /* @__PURE__ */ __name((keypair, publicKey) => crypto3.generateX25519SharedKey(keypair.privateKey, publicKey).subarray(0, 32), "dh"),
    encrypt: crypto3.chaCha20Poly1305Encrypt,
    decrypt: crypto3.chaCha20Poly1305Decrypt,
    hash: crypto3.hashSHA256,
    hkdf: crypto3.getHKDF
  };
}
__name(wrapCrypto, "wrapCrypto");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/encoder.js
var uint16BEEncode = /* @__PURE__ */ __name((value) => {
  const target = allocUnsafe(2);
  target[0] = value >> 8;
  target[1] = value;
  return target;
}, "uint16BEEncode");
uint16BEEncode.bytes = 2;
var uint16BEDecode = /* @__PURE__ */ __name((data) => {
  if (data.length < 2)
    throw RangeError("Could not decode int16BE");
  if (data instanceof Uint8Array) {
    let value = 0;
    value += data[0] << 8;
    value += data[1];
    return value;
  }
  return data.getUint16(0);
}, "uint16BEDecode");
uint16BEDecode.bytes = 2;

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/metrics.js
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
__name(registerMetrics, "registerMetrics");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/logger.js
function logLocalStaticKeys(s, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (s) {
    keyLogger(`LOCAL_STATIC_PUBLIC_KEY ${toString2(s.publicKey, "hex")}`);
    keyLogger(`LOCAL_STATIC_PRIVATE_KEY ${toString2(s.privateKey, "hex")}`);
  } else {
    keyLogger("Missing local static keys.");
  }
}
__name(logLocalStaticKeys, "logLocalStaticKeys");
function logLocalEphemeralKeys(e, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (e) {
    keyLogger(`LOCAL_PUBLIC_EPHEMERAL_KEY ${toString2(e.publicKey, "hex")}`);
    keyLogger(`LOCAL_PRIVATE_EPHEMERAL_KEY ${toString2(e.privateKey, "hex")}`);
  } else {
    keyLogger("Missing local ephemeral keys.");
  }
}
__name(logLocalEphemeralKeys, "logLocalEphemeralKeys");
function logRemoteStaticKey(rs, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (rs) {
    keyLogger(`REMOTE_STATIC_PUBLIC_KEY ${toString2(rs.subarray(), "hex")}`);
  } else {
    keyLogger("Missing remote static public key.");
  }
}
__name(logRemoteStaticKey, "logRemoteStaticKey");
function logRemoteEphemeralKey(re, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  if (re) {
    keyLogger(`REMOTE_EPHEMERAL_PUBLIC_KEY ${toString2(re.subarray(), "hex")}`);
  } else {
    keyLogger("Missing remote ephemeral keys.");
  }
}
__name(logRemoteEphemeralKey, "logRemoteEphemeralKey");
function logCipherState(cs1, cs2, keyLogger) {
  if (!keyLogger.enabled || !DUMP_SESSION_KEYS) {
    return;
  }
  keyLogger(`CIPHER_STATE_1 ${cs1.n.getUint64()} ${cs1.k && toString2(cs1.k, "hex")}`);
  keyLogger(`CIPHER_STATE_2 ${cs2.n.getUint64()} ${cs2.k && toString2(cs2.k, "hex")}`);
}
__name(logCipherState, "logCipherState");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/errors.js
var InvalidCryptoExchangeError = class _InvalidCryptoExchangeError extends Error {
  static {
    __name(this, "InvalidCryptoExchangeError");
  }
  code;
  constructor(message2 = "Invalid crypto exchange") {
    super(message2);
    this.code = _InvalidCryptoExchangeError.code;
  }
  static code = "ERR_INVALID_CRYPTO_EXCHANGE";
};

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/nonce.js
var MIN_NONCE = 0;
var MAX_NONCE = 4294967295;
var ERR_MAX_NONCE = "Cipherstate has reached maximum n, a new handshake must be performed";
var Nonce = class {
  static {
    __name(this, "Nonce");
  }
  n;
  bytes;
  view;
  constructor(n = MIN_NONCE) {
    this.n = n;
    this.bytes = alloc(12);
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

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/protocol.js
var ZEROLEN = alloc(0);
var CipherState = class {
  static {
    __name(this, "CipherState");
  }
  k;
  n;
  crypto;
  constructor(crypto3, k = void 0, n = 0) {
    this.crypto = crypto3;
    this.k = k;
    this.n = new Nonce(n);
  }
  hasKey() {
    return Boolean(this.k);
  }
  encryptWithAd(ad, plaintext) {
    if (!this.hasKey()) {
      return plaintext;
    }
    this.n.assertValue();
    const e = this.crypto.encrypt(plaintext, this.n.getBytes(), ad, this.k);
    this.n.increment();
    return e;
  }
  decryptWithAd(ad, ciphertext, dst) {
    if (!this.hasKey()) {
      return ciphertext;
    }
    this.n.assertValue();
    const plaintext = this.crypto.decrypt(ciphertext, this.n.getBytes(), ad, this.k, dst);
    this.n.increment();
    return plaintext;
  }
};
var SymmetricState = class {
  static {
    __name(this, "SymmetricState");
  }
  cs;
  ck;
  h;
  crypto;
  constructor(crypto3, protocolName) {
    this.crypto = crypto3;
    const protocolNameBytes = fromString2(protocolName, "utf-8");
    this.h = hashProtocolName(crypto3, protocolNameBytes);
    this.ck = this.h;
    this.cs = new CipherState(crypto3);
  }
  mixKey(ikm) {
    const [ck, tempK] = this.crypto.hkdf(this.ck, ikm);
    this.ck = ck;
    this.cs = new CipherState(this.crypto, tempK);
  }
  mixHash(data) {
    this.h = this.crypto.hash(new Uint8ArrayList(this.h, data));
  }
  encryptAndHash(plaintext) {
    const ciphertext = this.cs.encryptWithAd(this.h, plaintext);
    this.mixHash(ciphertext);
    return ciphertext;
  }
  decryptAndHash(ciphertext) {
    const plaintext = this.cs.decryptWithAd(this.h, ciphertext);
    this.mixHash(ciphertext);
    return plaintext;
  }
  split() {
    const [tempK1, tempK2] = this.crypto.hkdf(this.ck, ZEROLEN);
    return [new CipherState(this.crypto, tempK1), new CipherState(this.crypto, tempK2)];
  }
};
var AbstractHandshakeState = class {
  static {
    __name(this, "AbstractHandshakeState");
  }
  ss;
  s;
  e;
  rs;
  re;
  initiator;
  crypto;
  constructor(init) {
    const { crypto: crypto3, protocolName, prologue, initiator, s, e, rs, re } = init;
    this.crypto = crypto3;
    this.ss = new SymmetricState(crypto3, protocolName);
    this.ss.mixHash(prologue);
    this.initiator = initiator;
    this.s = s;
    this.e = e;
    this.rs = rs;
    this.re = re;
  }
  writeE() {
    if (this.e) {
      throw new Error("ephemeral keypair is already set");
    }
    const e = this.crypto.generateKeypair();
    this.ss.mixHash(e.publicKey);
    this.e = e;
    return e.publicKey;
  }
  writeS() {
    if (!this.s) {
      throw new Error("static keypair is not set");
    }
    return this.ss.encryptAndHash(this.s.publicKey);
  }
  writeEE() {
    if (!this.e) {
      throw new Error("ephemeral keypair is not set");
    }
    if (!this.re) {
      throw new Error("remote ephemeral public key is not set");
    }
    this.ss.mixKey(this.crypto.dh(this.e, this.re));
  }
  writeES() {
    if (this.initiator) {
      if (!this.e) {
        throw new Error("ephemeral keypair is not set");
      }
      if (!this.rs) {
        throw new Error("remote static public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.e, this.rs));
    } else {
      if (!this.s) {
        throw new Error("static keypair is not set");
      }
      if (!this.re) {
        throw new Error("remote ephemeral public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.s, this.re));
    }
  }
  writeSE() {
    if (this.initiator) {
      if (!this.s) {
        throw new Error("static keypair is not set");
      }
      if (!this.re) {
        throw new Error("remote ephemeral public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.s, this.re));
    } else {
      if (!this.e) {
        throw new Error("ephemeral keypair is not set");
      }
      if (!this.rs) {
        throw new Error("remote static public key is not set");
      }
      this.ss.mixKey(this.crypto.dh(this.e, this.rs));
    }
  }
  readE(message2, offset = 0) {
    if (this.re) {
      throw new Error("remote ephemeral public key is already set");
    }
    if (message2.byteLength < offset + 32) {
      throw new Error("message is not long enough");
    }
    this.re = message2.sublist(offset, offset + 32);
    this.ss.mixHash(this.re);
  }
  readS(message2, offset = 0) {
    if (this.rs) {
      throw new Error("remote static public key is already set");
    }
    const cipherLength = 32 + (this.ss.cs.hasKey() ? 16 : 0);
    if (message2.byteLength < offset + cipherLength) {
      throw new Error("message is not long enough");
    }
    const temp = message2.sublist(offset, offset + cipherLength);
    this.rs = this.ss.decryptAndHash(temp);
    return cipherLength;
  }
  readEE() {
    this.writeEE();
  }
  readES() {
    this.writeES();
  }
  readSE() {
    this.writeSE();
  }
};
var XXHandshakeState = class extends AbstractHandshakeState {
  static {
    __name(this, "XXHandshakeState");
  }
  // e
  writeMessageA(payload) {
    return new Uint8ArrayList(this.writeE(), this.ss.encryptAndHash(payload));
  }
  // e, ee, s, es
  writeMessageB(payload) {
    const e = this.writeE();
    this.writeEE();
    const encS = this.writeS();
    this.writeES();
    return new Uint8ArrayList(e, encS, this.ss.encryptAndHash(payload));
  }
  // s, se
  writeMessageC(payload) {
    const encS = this.writeS();
    this.writeSE();
    return new Uint8ArrayList(encS, this.ss.encryptAndHash(payload));
  }
  // e
  readMessageA(message2) {
    try {
      this.readE(message2);
      return this.ss.decryptAndHash(message2.sublist(32));
    } catch (e) {
      throw new InvalidCryptoExchangeError(`handshake stage 0 validation fail: ${e.message}`);
    }
  }
  // e, ee, s, es
  readMessageB(message2) {
    try {
      this.readE(message2);
      this.readEE();
      const consumed = this.readS(message2, 32);
      this.readES();
      return this.ss.decryptAndHash(message2.sublist(32 + consumed));
    } catch (e) {
      throw new InvalidCryptoExchangeError(`handshake stage 1 validation fail: ${e.message}`);
    }
  }
  // s, se
  readMessageC(message2) {
    try {
      const consumed = this.readS(message2);
      this.readSE();
      return this.ss.decryptAndHash(message2.sublist(consumed));
    } catch (e) {
      throw new InvalidCryptoExchangeError(`handshake stage 2 validation fail: ${e.message}`);
    }
  }
};
function hashProtocolName(crypto3, protocolName) {
  if (protocolName.length <= 32) {
    const h = alloc(32);
    h.set(protocolName);
    return h;
  } else {
    return crypto3.hash(protocolName);
  }
}
__name(hashProtocolName, "hashProtocolName");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/proto/payload.js
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
      }, (reader, length3) => {
        const obj = {
          webtransportCerthashes: []
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.webtransportCerthashes.push(reader.bytes());
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
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
        if (obj.identityKey != null && obj.identityKey.byteLength > 0) {
          w.uint32(10);
          w.bytes(obj.identityKey);
        }
        if (obj.identitySig != null && obj.identitySig.byteLength > 0) {
          w.uint32(18);
          w.bytes(obj.identitySig);
        }
        if (obj.extensions != null) {
          w.uint32(34);
          NoiseExtensions.codec().encode(obj.extensions, w);
        }
        if (opts.lengthDelimited !== false) {
          w.ldelim();
        }
      }, (reader, length3) => {
        const obj = {
          identityKey: alloc(0),
          identitySig: alloc(0)
        };
        const end = length3 == null ? reader.len : reader.pos + length3;
        while (reader.pos < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              obj.identityKey = reader.bytes();
              break;
            }
            case 2: {
              obj.identitySig = reader.bytes();
              break;
            }
            case 4: {
              obj.extensions = NoiseExtensions.codec().decode(reader, reader.uint32());
              break;
            }
            default: {
              reader.skipType(tag & 7);
              break;
            }
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

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/utils.js
async function createHandshakePayload(privateKey, staticPublicKey, extensions) {
  const identitySig = await privateKey.sign(getSignaturePayload(staticPublicKey));
  return NoiseHandshakePayload.encode({
    identityKey: publicKeyToProtobuf(privateKey.publicKey),
    identitySig,
    extensions
  });
}
__name(createHandshakePayload, "createHandshakePayload");
async function decodeHandshakePayload(payloadBytes, remoteStaticKey, remoteIdentityKey) {
  try {
    const payload = NoiseHandshakePayload.decode(payloadBytes);
    const publicKey = publicKeyFromProtobuf(payload.identityKey);
    if (remoteIdentityKey?.equals(publicKey) === false) {
      throw new Error(`Payload identity key ${publicKey} does not match expected remote identity key ${remoteIdentityKey}`);
    }
    if (!remoteStaticKey) {
      throw new Error("Remote static does not exist");
    }
    const signaturePayload = getSignaturePayload(remoteStaticKey);
    if (!await publicKey.verify(signaturePayload, payload.identitySig)) {
      throw new Error("Invalid payload signature");
    }
    return payload;
  } catch (e) {
    throw new UnexpectedPeerError(e.message);
  }
}
__name(decodeHandshakePayload, "decodeHandshakePayload");
function getSignaturePayload(publicKey) {
  const prefix = fromString2("noise-libp2p-static-key:");
  if (publicKey instanceof Uint8Array) {
    return concat2([prefix, publicKey], prefix.length + publicKey.length);
  }
  publicKey.prepend(prefix);
  return publicKey;
}
__name(getSignaturePayload, "getSignaturePayload");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/performHandshake.js
async function performHandshakeInitiator(init, options) {
  const { log, connection, crypto: crypto3, privateKey, prologue, s, remoteIdentityKey, extensions } = init;
  const payload = await createHandshakePayload(privateKey, s.publicKey, extensions);
  const xx = new XXHandshakeState({
    crypto: crypto3,
    protocolName: "Noise_XX_25519_ChaChaPoly_SHA256",
    initiator: true,
    prologue,
    s
  });
  logLocalStaticKeys(xx.s, log);
  log.trace("Stage 0 - Initiator starting to send first message.");
  await connection.write(xx.writeMessageA(ZEROLEN), options);
  log.trace("Stage 0 - Initiator finished sending first message.");
  logLocalEphemeralKeys(xx.e, log);
  log.trace("Stage 1 - Initiator waiting to receive first message from responder...");
  const plaintext = xx.readMessageB(await connection.read(options));
  log.trace("Stage 1 - Initiator received the message.");
  logRemoteEphemeralKey(xx.re, log);
  logRemoteStaticKey(xx.rs, log);
  log.trace("Initiator going to check remote's signature...");
  const receivedPayload = await decodeHandshakePayload(plaintext, xx.rs, remoteIdentityKey);
  log.trace("All good with the signature!");
  log.trace("Stage 2 - Initiator sending third handshake message.");
  await connection.write(xx.writeMessageC(payload), options);
  log.trace("Stage 2 - Initiator sent message with signed payload.");
  const [cs1, cs2] = xx.ss.split();
  logCipherState(cs1, cs2, log);
  return {
    payload: receivedPayload,
    encrypt: /* @__PURE__ */ __name((plaintext2) => cs1.encryptWithAd(ZEROLEN, plaintext2), "encrypt"),
    decrypt: /* @__PURE__ */ __name((ciphertext, dst) => cs2.decryptWithAd(ZEROLEN, ciphertext, dst), "decrypt")
  };
}
__name(performHandshakeInitiator, "performHandshakeInitiator");
async function performHandshakeResponder(init, options) {
  const { log, connection, crypto: crypto3, privateKey, prologue, s, remoteIdentityKey, extensions } = init;
  const payload = await createHandshakePayload(privateKey, s.publicKey, extensions);
  const xx = new XXHandshakeState({
    crypto: crypto3,
    protocolName: "Noise_XX_25519_ChaChaPoly_SHA256",
    initiator: false,
    prologue,
    s
  });
  logLocalStaticKeys(xx.s, log);
  log.trace("Stage 0 - Responder waiting to receive first message.");
  xx.readMessageA(await connection.read(options));
  log.trace("Stage 0 - Responder received first message.");
  logRemoteEphemeralKey(xx.re, log);
  log.trace("Stage 1 - Responder sending out first message with signed payload and static key.");
  await connection.write(xx.writeMessageB(payload), options);
  log.trace("Stage 1 - Responder sent the second handshake message with signed payload.");
  logLocalEphemeralKeys(xx.e, log);
  log.trace("Stage 2 - Responder waiting for third handshake message...");
  const plaintext = xx.readMessageC(await connection.read(options));
  log.trace("Stage 2 - Responder received the message, finished handshake.");
  const receivedPayload = await decodeHandshakePayload(plaintext, xx.rs, remoteIdentityKey);
  const [cs1, cs2] = xx.ss.split();
  logCipherState(cs1, cs2, log);
  return {
    payload: receivedPayload,
    encrypt: /* @__PURE__ */ __name((plaintext2) => cs2.encryptWithAd(ZEROLEN, plaintext2), "encrypt"),
    decrypt: /* @__PURE__ */ __name((ciphertext, dst) => cs1.decryptWithAd(ZEROLEN, ciphertext, dst), "decrypt")
  };
}
__name(performHandshakeResponder, "performHandshakeResponder");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/streaming.js
var CHACHA_TAG_LENGTH = 16;
function encryptStream(handshake, metrics) {
  return async function* (source) {
    for await (const chunk of source) {
      for (let i = 0; i < chunk.length; i += NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG) {
        let end = i + NOISE_MSG_MAX_LENGTH_BYTES_WITHOUT_TAG;
        if (end > chunk.length) {
          end = chunk.length;
        }
        let data;
        if (chunk instanceof Uint8Array) {
          data = handshake.encrypt(chunk.subarray(i, end));
        } else {
          data = handshake.encrypt(chunk.sublist(i, end));
        }
        metrics?.encryptedPackets.increment();
        yield new Uint8ArrayList(uint16BEEncode(data.byteLength), data);
      }
    }
  };
}
__name(encryptStream, "encryptStream");
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
        const encrypted = chunk.sublist(i, end);
        const dst = chunk.subarray(i, end - CHACHA_TAG_LENGTH);
        try {
          const plaintext = handshake.decrypt(encrypted, dst);
          metrics?.decryptedPackets.increment();
          yield plaintext;
        } catch (e) {
          metrics?.decryptErrors.increment();
          throw e;
        }
      }
    }
  };
}
__name(decryptStream, "decryptStream");

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/noise.js
var Noise = class {
  static {
    __name(this, "Noise");
  }
  protocol = "/noise";
  crypto;
  prologue;
  staticKey;
  extensions;
  metrics;
  components;
  constructor(components, init = {}) {
    const { staticNoiseKey, extensions, crypto: crypto3, prologueBytes } = init;
    const { metrics } = components;
    this.components = components;
    const _crypto = crypto3 ?? defaultCrypto;
    this.crypto = wrapCrypto(_crypto);
    this.extensions = extensions;
    this.metrics = metrics ? registerMetrics(metrics) : void 0;
    if (staticNoiseKey) {
      this.staticKey = _crypto.generateX25519KeyPairFromSeed(staticNoiseKey);
    } else {
      this.staticKey = _crypto.generateX25519KeyPair();
    }
    this.prologue = prologueBytes ?? alloc(0);
  }
  [Symbol.toStringTag] = "@chainsafe/libp2p-noise";
  [serviceCapabilities] = [
    "@libp2p/connection-encryption",
    "@chainsafe/libp2p-noise"
  ];
  /**
   * Encrypt outgoing data to the remote party (handshake as initiator)
   *
   * @param connection - streaming iterable duplex that will be encrypted
   * @param options
   * @param options.remotePeer - PeerId of the remote peer. Used to validate the integrity of the remote peer
   * @param options.signal - Used to abort the operation
   */
  async secureOutbound(connection, options) {
    const wrappedConnection = lpStream(connection, {
      lengthEncoder: uint16BEEncode,
      lengthDecoder: uint16BEDecode,
      maxDataLength: NOISE_MSG_MAX_LENGTH_BYTES
    });
    const handshake = await this.performHandshakeInitiator(wrappedConnection, this.components.privateKey, options?.remotePeer?.publicKey, options);
    const conn = await this.createSecureConnection(wrappedConnection, handshake);
    connection.source = conn.source;
    connection.sink = conn.sink;
    const publicKey = publicKeyFromProtobuf(handshake.payload.identityKey);
    return {
      conn: connection,
      remoteExtensions: handshake.payload.extensions,
      remotePeer: peerIdFromPublicKey(publicKey)
    };
  }
  /**
   * Decrypt incoming data (handshake as responder).
   *
   * @param connection - streaming iterable duplex that will be encrypted
   * @param options
   * @param options.remotePeer - PeerId of the remote peer. Used to validate the integrity of the remote peer
   * @param options.signal - Used to abort the operation
   */
  async secureInbound(connection, options) {
    const wrappedConnection = lpStream(connection, {
      lengthEncoder: uint16BEEncode,
      lengthDecoder: uint16BEDecode,
      maxDataLength: NOISE_MSG_MAX_LENGTH_BYTES
    });
    const handshake = await this.performHandshakeResponder(wrappedConnection, this.components.privateKey, options?.remotePeer?.publicKey, options);
    const conn = await this.createSecureConnection(wrappedConnection, handshake);
    connection.source = conn.source;
    connection.sink = conn.sink;
    const publicKey = publicKeyFromProtobuf(handshake.payload.identityKey);
    return {
      conn: connection,
      remoteExtensions: handshake.payload.extensions,
      remotePeer: peerIdFromPublicKey(publicKey)
    };
  }
  /**
   * Perform XX handshake as initiator.
   */
  async performHandshakeInitiator(connection, privateKey, remoteIdentityKey, options) {
    let result;
    try {
      result = await performHandshakeInitiator({
        connection,
        privateKey,
        remoteIdentityKey,
        log: this.components.logger.forComponent("libp2p:noise:xxhandshake"),
        crypto: this.crypto,
        prologue: this.prologue,
        s: this.staticKey,
        extensions: this.extensions
      }, options);
      this.metrics?.xxHandshakeSuccesses.increment();
    } catch (e) {
      this.metrics?.xxHandshakeErrors.increment();
      throw e;
    }
    return result;
  }
  /**
   * Perform XX handshake as responder.
   */
  async performHandshakeResponder(connection, privateKey, remoteIdentityKey, options) {
    let result;
    try {
      result = await performHandshakeResponder({
        connection,
        privateKey,
        remoteIdentityKey,
        log: this.components.logger.forComponent("libp2p:noise:xxhandshake"),
        crypto: this.crypto,
        prologue: this.prologue,
        s: this.staticKey,
        extensions: this.extensions
      }, options);
      this.metrics?.xxHandshakeSuccesses.increment();
    } catch (e) {
      this.metrics?.xxHandshakeErrors.increment();
      throw e;
    }
    return result;
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
      (source) => decode7(source, { lengthDecoder: uint16BEDecode }),
      // read message length prefix
      decryptStream(handshake, this.metrics),
      // decrypt the incoming data
      secure
      // pipe to the wrapper
    );
    return user;
  }
};

// node_modules/@libp2p/webrtc/node_modules/@chainsafe/libp2p-noise/dist/src/index.js
function noise(init = {}) {
  return (components) => new Noise(components, init);
}
__name(noise, "noise");

// node_modules/@libp2p/webrtc/dist/src/private-to-public/sdp.js
var mbdecoder = Object.values(bases).map((b) => b.decoder).reduce((d, b) => d.or(b));
function getLocalFingerprint(pc, options) {
  const localCert = pc.getConfiguration().certificates?.at(0);
  if (localCert?.getFingerprints == null) {
    options.log.trace("fetching fingerprint from local SDP");
    const localDescription = pc.localDescription;
    if (localDescription == null) {
      return void 0;
    }
    return getFingerprintFromSdp(localDescription.sdp);
  }
  options.log.trace("fetching fingerprint from local certificate");
  if (localCert.getFingerprints().length === 0) {
    return void 0;
  }
  const fingerprint = localCert.getFingerprints()[0].value;
  if (fingerprint == null) {
    throw new InvalidFingerprintError("", "no fingerprint on local certificate");
  }
  return fingerprint;
}
__name(getLocalFingerprint, "getLocalFingerprint");
var fingerprintRegex = /^a=fingerprint:(?:\w+-[0-9]+)\s(?<fingerprint>(:?[0-9a-fA-F]{2})+)$/m;
function getFingerprintFromSdp(sdp) {
  const searchResult = sdp.match(fingerprintRegex);
  return searchResult?.groups?.fingerprint;
}
__name(getFingerprintFromSdp, "getFingerprintFromSdp");
function ipv(ma) {
  for (const proto of ma.protoNames()) {
    if (proto.startsWith("ip")) {
      return proto.toUpperCase();
    }
  }
  return "IP6";
}
__name(ipv, "ipv");
function certhash2(ma) {
  const tups = ma.stringTuples();
  const certhash3 = tups.filter((tup) => tup[0] === CERTHASH_CODE).map((tup) => tup[1])[0];
  if (certhash3 === void 0 || certhash3 === "") {
    throw new InvalidParametersError(`Couldn't find a certhash component of multiaddr: ${ma.toString()}`);
  }
  return certhash3;
}
__name(certhash2, "certhash");
function decodeCerthash(certhash3) {
  return digest_exports.decode(mbdecoder.decode(certhash3));
}
__name(decodeCerthash, "decodeCerthash");
function ma2Fingerprint(ma) {
  const mhdecoded = decodeCerthash(certhash2(ma));
  const prefix = toSupportedHashFunction(mhdecoded.code);
  const fingerprint = mhdecoded.digest.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
  const sdp = fingerprint.match(/.{1,2}/g);
  if (sdp == null) {
    throw new InvalidFingerprintError(fingerprint, ma.toString());
  }
  return [`${prefix} ${sdp.join(":").toUpperCase()}`, fingerprint];
}
__name(ma2Fingerprint, "ma2Fingerprint");
function toSupportedHashFunction(code2) {
  switch (code2) {
    case 17:
      return "SHA-1";
    case 18:
      return "SHA-256";
    case 19:
      return "SHA-512";
    default:
      throw new UnsupportedHashAlgorithmError(code2);
  }
}
__name(toSupportedHashFunction, "toSupportedHashFunction");
function ma2sdp(ma, ufrag) {
  const { host, port } = ma.toOptions();
  const ipVersion = ipv(ma);
  const [CERTFP] = ma2Fingerprint(ma);
  return `v=0
o=- 0 0 IN ${ipVersion} ${host}
s=-
c=IN ${ipVersion} ${host}
t=0 0
a=ice-lite
m=application ${port} UDP/DTLS/SCTP webrtc-datachannel
a=mid:0
a=setup:passive
a=ice-ufrag:${ufrag}
a=ice-pwd:${ufrag}
a=fingerprint:${CERTFP}
a=sctp-port:5000
a=max-message-size:${MAX_MESSAGE_SIZE}
a=candidate:1467250027 1 UDP 1467250027 ${host} ${port} typ host\r
`;
}
__name(ma2sdp, "ma2sdp");
function fromMultiAddr(ma, ufrag) {
  return {
    type: "answer",
    sdp: ma2sdp(ma, ufrag)
  };
}
__name(fromMultiAddr, "fromMultiAddr");
function munge(desc, ufrag) {
  if (desc.sdp === void 0) {
    throw new InvalidParametersError("Can't munge a missing SDP");
  }
  desc.sdp = desc.sdp.replace(/\na=ice-ufrag:[^\n]*\n/, "\na=ice-ufrag:" + ufrag + "\n").replace(/\na=ice-pwd:[^\n]*\n/, "\na=ice-pwd:" + ufrag + "\n");
  return desc;
}
__name(munge, "munge");

// node_modules/@libp2p/webrtc/dist/src/private-to-public/util.js
var charset = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
var genUfrag = /* @__PURE__ */ __name((len) => [...Array(len)].map(() => charset.at(Math.floor(Math.random() * charset.length))).join(""), "genUfrag");

// node_modules/@libp2p/webrtc/dist/src/private-to-public/transport.js
var HANDSHAKE_TIMEOUT_MS = 1e4;
var WEBRTC_CODE = getProtocol("webrtc-direct").code;
var CERTHASH_CODE = getProtocol("certhash").code;
var WebRTCDirectTransport = class {
  static {
    __name(this, "WebRTCDirectTransport");
  }
  log;
  metrics;
  components;
  init;
  constructor(components, init = {}) {
    this.log = components.logger.forComponent("libp2p:webrtc-direct");
    this.components = components;
    this.init = init;
    if (components.metrics != null) {
      this.metrics = {
        dialerEvents: components.metrics.registerCounterGroup("libp2p_webrtc-direct_dialer_events_total", {
          label: "event",
          help: "Total count of WebRTC-direct dial events by type"
        })
      };
    }
  }
  [transportSymbol] = true;
  [Symbol.toStringTag] = "@libp2p/webrtc-direct";
  [serviceCapabilities] = [
    "@libp2p/transport"
  ];
  /**
   * Dial a given multiaddr
   */
  async dial(ma, options) {
    const rawConn = await this._connect(ma, options);
    this.log("dialing address: %a", ma);
    return rawConn;
  }
  /**
   * Create transport listeners no supported by browsers
   */
  createListener(options) {
    throw new UnimplementedError("WebRTCTransport.createListener");
  }
  /**
   * Filter check for all Multiaddrs that this transport can listen on
   */
  listenFilter(multiaddrs) {
    return multiaddrs.filter(WebRTCDirect.exactMatch);
  }
  /**
   * Filter check for all Multiaddrs that this transport can dial
   */
  dialFilter(multiaddrs) {
    return this.listenFilter(multiaddrs);
  }
  /**
   * Connect to a peer using a multiaddr
   */
  async _connect(ma, options) {
    const controller = new AbortController();
    const signal = controller.signal;
    const remotePeerString = ma.getPeerId();
    if (remotePeerString === null) {
      throw new InappropriateMultiaddrError("we need to have the remote's PeerId");
    }
    const theirPeerId = peerIdFromString(remotePeerString);
    const remoteCerthash = decodeCerthash(certhash2(ma));
    const certificate = await RTCPeerConnection.generateCertificate({
      name: "ECDSA",
      namedCurve: "P-256",
      hash: toSupportedHashFunction(remoteCerthash.code)
    });
    const peerConnection = new RTCPeerConnection({
      ...await getRtcConfiguration(this.init.rtcConfiguration),
      certificates: [certificate]
    });
    try {
      const dataChannelOpenPromise = new Promise((resolve, reject) => {
        const handshakeDataChannel2 = peerConnection.createDataChannel("", { negotiated: true, id: 0 });
        const handshakeTimeout = setTimeout(() => {
          const error = `Data channel was never opened: state: ${handshakeDataChannel2.readyState}`;
          this.log.error(error);
          this.metrics?.dialerEvents.increment({ open_error: true });
          reject(new DataChannelError("data", error));
        }, HANDSHAKE_TIMEOUT_MS);
        handshakeDataChannel2.onopen = (_) => {
          clearTimeout(handshakeTimeout);
          resolve(handshakeDataChannel2);
        };
        handshakeDataChannel2.onerror = (event) => {
          clearTimeout(handshakeTimeout);
          const errorTarget = event.target?.toString() ?? "not specified";
          const error = `Error opening a data channel for handshaking: ${errorTarget}`;
          this.log.error(error);
          this.metrics?.dialerEvents.increment({ unknown_error: true });
          reject(new DataChannelError("data", error));
        };
      });
      const ufrag = "libp2p+webrtc+v1/" + genUfrag(32);
      const offerSdp = await peerConnection.createOffer();
      const mungedOfferSdp = munge(offerSdp, ufrag);
      await peerConnection.setLocalDescription(mungedOfferSdp);
      const answerSdp = fromMultiAddr(ma, ufrag);
      await peerConnection.setRemoteDescription(answerSdp);
      const handshakeDataChannel = await dataChannelOpenPromise;
      const fingerprintsPrologue = this.generateNoisePrologue(peerConnection, remoteCerthash.code, ma);
      const connectionEncrypter = noise({ prologueBytes: fingerprintsPrologue })(this.components);
      const wrappedChannel = createStream({
        channel: handshakeDataChannel,
        direction: "inbound",
        logger: this.components.logger,
        ...this.init.dataChannel ?? {}
      });
      const wrappedDuplex = {
        ...wrappedChannel,
        sink: wrappedChannel.sink.bind(wrappedChannel),
        source: async function* () {
          for await (const list of wrappedChannel.source) {
            for (const buf of list) {
              yield buf;
            }
          }
        }()
      };
      const maConn = new WebRTCMultiaddrConnection(this.components, {
        peerConnection,
        remoteAddr: ma,
        timeline: {
          open: Date.now()
        },
        metrics: this.metrics?.dialerEvents
      });
      const eventListeningName = isFirefox ? "iceconnectionstatechange" : "connectionstatechange";
      peerConnection.addEventListener(eventListeningName, () => {
        switch (peerConnection.connectionState) {
          case "failed":
          case "disconnected":
          case "closed":
            maConn.close().catch((err) => {
              this.log.error("error closing connection", err);
            }).finally(() => {
              controller.abort();
            });
            break;
          default:
            break;
        }
      }, { signal });
      this.metrics?.dialerEvents.increment({ peer_connection: true });
      const muxerFactory = new DataChannelMuxerFactory(this.components, {
        peerConnection,
        metrics: this.metrics?.dialerEvents,
        dataChannelOptions: this.init.dataChannel
      });
      await connectionEncrypter.secureInbound(wrappedDuplex, {
        signal,
        remotePeer: theirPeerId
      });
      return await options.upgrader.upgradeOutbound(maConn, { skipProtection: true, skipEncryption: true, muxerFactory });
    } catch (err) {
      peerConnection.close();
      throw err;
    }
  }
  /**
   * Generate a noise prologue from the peer connection's certificate.
   * noise prologue = bytes('libp2p-webrtc-noise:') + noise-responder fingerprint + noise-initiator fingerprint
   */
  generateNoisePrologue(pc, hashCode, ma) {
    if (pc.getConfiguration().certificates?.length === 0) {
      throw new InvalidParametersError("no local certificate");
    }
    const localFingerprint = getLocalFingerprint(pc, {
      log: this.log
    });
    if (localFingerprint == null) {
      throw new InvalidParametersError("no local fingerprint found");
    }
    const localFpString = localFingerprint.trim().toLowerCase().replaceAll(":", "");
    const localFpArray = fromString2(localFpString, "hex");
    const local = create(hashCode, localFpArray);
    const remote = mbdecoder.decode(certhash2(ma));
    const prefix = fromString2("libp2p-webrtc-noise:");
    return concat2([prefix, local.bytes, remote]);
  }
};

// node_modules/@libp2p/webrtc/dist/src/index.js
function webRTCDirect(init) {
  return (components) => new WebRTCDirectTransport(components, init);
}
__name(webRTCDirect, "webRTCDirect");
function webRTC(init) {
  return (components) => new WebRTCTransport(components, init);
}
__name(webRTC, "webRTC");
export {
  webRTC,
  webRTCDirect
};
/*! Bundled license information:

pvtsutils/build/index.js:
  (*!
   * MIT License
   * 
   * Copyright (c) 2017-2022 Peculiar Ventures, LLC
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/montgomery.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

pvutils/build/utils.es.js:
  (*!
   Copyright (c) Peculiar Ventures, LLC
  *)

asn1js/build/index.es.js:
  (*!
   * Copyright (c) 2014, GMO GlobalSign
   * Copyright (c) 2015-2022, Peculiar Ventures
   * All rights reserved.
   * 
   * Author 2014-2019, Yury Strozhevsky
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * * Redistributions of source code must retain the above copyright notice, this
   *   list of conditions and the following disclaimer.
   * 
   * * Redistributions in binary form must reproduce the above copyright notice, this
   *   list of conditions and the following disclaimer in the documentation and/or
   *   other materials provided with the distribution.
   * 
   * * Neither the name of the copyright holder nor the names of its
   *   contributors may be used to endorse or promote products derived from
   *   this software without specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
   * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/ciphers/esm/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=lib-webrtc.js.map
