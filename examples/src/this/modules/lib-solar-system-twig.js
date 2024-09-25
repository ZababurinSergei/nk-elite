var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../node_modules/twig/src/twig.core.js
var require_twig_core = __commonJS({
  "../node_modules/twig/src/twig.core.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.trace = false;
      Twig.debug = false;
      Twig.cache = true;
      Twig.noop = function() {
      };
      Twig.merge = function(target, source, onlyChanged) {
        Object.keys(source).forEach((key) => {
          if (onlyChanged && !(key in target)) {
            return;
          }
          target[key] = source[key];
        });
        return target;
      };
      Twig.Error = function(message, file) {
        this.message = message;
        this.name = "TwigException";
        this.type = "TwigException";
        this.file = file;
      };
      Twig.Error.prototype.toString = function() {
        const output = this.name + ": " + this.message;
        return output;
      };
      Twig.log = {
        trace(...args) {
          if (Twig.trace && console) {
            console.log(Array.prototype.slice.call(args));
          }
        },
        debug(...args) {
          if (Twig.debug && console) {
            console.log(Array.prototype.slice.call(args));
          }
        }
      };
      if (typeof console === "undefined") {
        Twig.log.error = function() {
        };
      } else if (typeof console.error !== "undefined") {
        Twig.log.error = function(...args) {
          console.error(...args);
        };
      } else if (typeof console.log !== "undefined") {
        Twig.log.error = function(...args) {
          console.log(...args);
        };
      }
      Twig.token = {};
      Twig.token.type = {
        output: "output",
        logic: "logic",
        comment: "comment",
        raw: "raw",
        outputWhitespacePre: "output_whitespace_pre",
        outputWhitespacePost: "output_whitespace_post",
        outputWhitespaceBoth: "output_whitespace_both",
        logicWhitespacePre: "logic_whitespace_pre",
        logicWhitespacePost: "logic_whitespace_post",
        logicWhitespaceBoth: "logic_whitespace_both"
      };
      Twig.token.definitions = [
        {
          type: Twig.token.type.raw,
          open: "{% raw %}",
          close: "{% endraw %}"
        },
        {
          type: Twig.token.type.raw,
          open: "{% verbatim %}",
          close: "{% endverbatim %}"
        },
        // *Whitespace type tokens*
        //
        // These typically take the form `{{- expression -}}` or `{{- expression }}` or `{{ expression -}}`.
        {
          type: Twig.token.type.outputWhitespacePre,
          open: "{{-",
          close: "}}"
        },
        {
          type: Twig.token.type.outputWhitespacePost,
          open: "{{",
          close: "-}}"
        },
        {
          type: Twig.token.type.outputWhitespaceBoth,
          open: "{{-",
          close: "-}}"
        },
        {
          type: Twig.token.type.logicWhitespacePre,
          open: "{%-",
          close: "%}"
        },
        {
          type: Twig.token.type.logicWhitespacePost,
          open: "{%",
          close: "-%}"
        },
        {
          type: Twig.token.type.logicWhitespaceBoth,
          open: "{%-",
          close: "-%}"
        },
        // *Output type tokens*
        //
        // These typically take the form `{{ expression }}`.
        {
          type: Twig.token.type.output,
          open: "{{",
          close: "}}"
        },
        // *Logic type tokens*
        //
        // These typically take a form like `{% if expression %}` or `{% endif %}`
        {
          type: Twig.token.type.logic,
          open: "{%",
          close: "%}"
        },
        // *Comment type tokens*
        //
        // These take the form `{# anything #}`
        {
          type: Twig.token.type.comment,
          open: "{#",
          close: "#}"
        }
      ];
      Twig.token.strings = ['"', "'"];
      Twig.token.findStart = function(template) {
        const output = {
          position: null,
          def: null
        };
        let closePosition = null;
        const len = Twig.token.definitions.length;
        let i;
        let tokenTemplate;
        let firstKeyPosition;
        let closeKeyPosition;
        for (i = 0; i < len; i++) {
          tokenTemplate = Twig.token.definitions[i];
          firstKeyPosition = template.indexOf(tokenTemplate.open);
          closeKeyPosition = template.indexOf(tokenTemplate.close);
          Twig.log.trace("Twig.token.findStart: ", "Searching for ", tokenTemplate.open, " found at ", firstKeyPosition);
          if (firstKeyPosition >= 0) {
            if (tokenTemplate.open.length !== tokenTemplate.close.length) {
              if (closeKeyPosition < 0) {
                continue;
              }
            }
          }
          if (firstKeyPosition >= 0 && (output.position === null || firstKeyPosition < output.position)) {
            output.position = firstKeyPosition;
            output.def = tokenTemplate;
            closePosition = closeKeyPosition;
          } else if (firstKeyPosition >= 0 && output.position !== null && firstKeyPosition === output.position) {
            if (tokenTemplate.open.length > output.def.open.length) {
              output.position = firstKeyPosition;
              output.def = tokenTemplate;
              closePosition = closeKeyPosition;
            } else if (tokenTemplate.open.length === output.def.open.length) {
              if (tokenTemplate.close.length > output.def.close.length) {
                if (closeKeyPosition >= 0 && closeKeyPosition < closePosition) {
                  output.position = firstKeyPosition;
                  output.def = tokenTemplate;
                  closePosition = closeKeyPosition;
                }
              } else if (closeKeyPosition >= 0 && closeKeyPosition < closePosition) {
                output.position = firstKeyPosition;
                output.def = tokenTemplate;
                closePosition = closeKeyPosition;
              }
            }
          }
        }
        return output;
      };
      Twig.token.findEnd = function(template, tokenDef, start) {
        let end = null;
        let found = false;
        let offset = 0;
        let strPos = null;
        let strFound = null;
        let pos = null;
        let endOffset = null;
        let thisStrPos = null;
        let endStrPos = null;
        let i;
        let l;
        while (!found) {
          strPos = null;
          strFound = null;
          pos = template.indexOf(tokenDef.close, offset);
          if (pos >= 0) {
            end = pos;
            found = true;
          } else {
            throw new Twig.Error("Unable to find closing bracket '" + tokenDef.close + "' opened near template position " + start);
          }
          if (tokenDef.type === Twig.token.type.comment) {
            break;
          }
          if (tokenDef.type === Twig.token.type.raw) {
            break;
          }
          l = Twig.token.strings.length;
          for (i = 0; i < l; i += 1) {
            thisStrPos = template.indexOf(Twig.token.strings[i], offset);
            if (thisStrPos > 0 && thisStrPos < pos && (strPos === null || thisStrPos < strPos)) {
              strPos = thisStrPos;
              strFound = Twig.token.strings[i];
            }
          }
          if (strPos !== null) {
            endOffset = strPos + 1;
            end = null;
            found = false;
            for (; ; ) {
              endStrPos = template.indexOf(strFound, endOffset);
              if (endStrPos < 0) {
                throw Twig.Error("Unclosed string in template");
              }
              if (template.slice(endStrPos - 1, endStrPos) === "\\") {
                endOffset = endStrPos + 1;
              } else {
                offset = endStrPos + 1;
                break;
              }
            }
          }
        }
        return end;
      };
      Twig.tokenize = function(template) {
        const tokens = [];
        let currentPosition = 0;
        let foundToken = null;
        let end = null;
        while (template.length > 0) {
          foundToken = Twig.token.findStart(template);
          Twig.log.trace("Twig.tokenize: ", "Found token: ", foundToken);
          if (foundToken.position === null) {
            tokens.push({
              type: Twig.token.type.raw,
              value: template,
              position: {
                start: currentPosition,
                end: currentPosition + foundToken.position
              }
            });
            template = "";
          } else {
            if (foundToken.position > 0) {
              tokens.push({
                type: Twig.token.type.raw,
                value: template.slice(0, Math.max(0, foundToken.position)),
                position: {
                  start: currentPosition,
                  end: currentPosition + Math.max(0, foundToken.position)
                }
              });
            }
            template = template.slice(foundToken.position + foundToken.def.open.length);
            currentPosition += foundToken.position + foundToken.def.open.length;
            end = Twig.token.findEnd(template, foundToken.def, currentPosition);
            Twig.log.trace("Twig.tokenize: ", "Token ends at ", end);
            tokens.push({
              type: foundToken.def.type,
              value: template.slice(0, Math.max(0, end)).trim(),
              position: {
                start: currentPosition - foundToken.def.open.length,
                end: currentPosition + end + foundToken.def.close.length
              }
            });
            if (template.slice(end + foundToken.def.close.length, end + foundToken.def.close.length + 1) === "\n") {
              switch (foundToken.def.type) {
                case "logic_whitespace_pre":
                case "logic_whitespace_post":
                case "logic_whitespace_both":
                case "logic":
                  end += 1;
                  break;
                default:
                  break;
              }
            }
            template = template.slice(end + foundToken.def.close.length);
            currentPosition += end + foundToken.def.close.length;
          }
        }
        return tokens;
      };
      Twig.compile = function(tokens) {
        const self = this;
        try {
          const output = [];
          const stack = [];
          let intermediateOutput = [];
          let token = null;
          let logicToken = null;
          let unclosedToken = null;
          let prevToken = null;
          let prevOutput = null;
          let prevIntermediateOutput = null;
          let prevTemplate = null;
          let nextToken = null;
          let tokOutput = null;
          let type = null;
          let open = null;
          let next = null;
          const compileOutput = /* @__PURE__ */ __name(function(token2) {
            Twig.expression.compile.call(self, token2);
            if (stack.length > 0) {
              intermediateOutput.push(token2);
            } else {
              output.push(token2);
            }
          }, "compileOutput");
          const compileLogic = /* @__PURE__ */ __name(function(token2) {
            logicToken = Twig.logic.compile.call(self, token2);
            logicToken.position = token2.position;
            type = logicToken.type;
            open = Twig.logic.handler[type].open;
            next = Twig.logic.handler[type].next;
            Twig.log.trace(
              "Twig.compile: ",
              "Compiled logic token to ",
              logicToken,
              " next is: ",
              next,
              " open is : ",
              open
            );
            if (open !== void 0 && !open) {
              prevToken = stack.pop();
              prevTemplate = Twig.logic.handler[prevToken.type];
              if (!prevTemplate.next.includes(type)) {
                throw new Error(type + " not expected after a " + prevToken.type);
              }
              prevToken.output = prevToken.output || [];
              prevToken.output = prevToken.output.concat(intermediateOutput);
              intermediateOutput = [];
              tokOutput = {
                type: Twig.token.type.logic,
                token: prevToken,
                position: {
                  open: prevToken.position,
                  close: token2.position
                }
              };
              if (stack.length > 0) {
                intermediateOutput.push(tokOutput);
              } else {
                output.push(tokOutput);
              }
            }
            if (next !== void 0 && next.length > 0) {
              Twig.log.trace("Twig.compile: ", "Pushing ", logicToken, " to logic stack.");
              if (stack.length > 0) {
                prevToken = stack.pop();
                prevToken.output = prevToken.output || [];
                prevToken.output = prevToken.output.concat(intermediateOutput);
                stack.push(prevToken);
                intermediateOutput = [];
              }
              stack.push(logicToken);
            } else if (open !== void 0 && open) {
              tokOutput = {
                type: Twig.token.type.logic,
                token: logicToken,
                position: logicToken.position
              };
              if (stack.length > 0) {
                intermediateOutput.push(tokOutput);
              } else {
                output.push(tokOutput);
              }
            }
          }, "compileLogic");
          while (tokens.length > 0) {
            token = tokens.shift();
            prevOutput = output[output.length - 1];
            prevIntermediateOutput = intermediateOutput[intermediateOutput.length - 1];
            nextToken = tokens[0];
            Twig.log.trace("Compiling token ", token);
            switch (token.type) {
              case Twig.token.type.raw:
                if (stack.length > 0) {
                  intermediateOutput.push(token);
                } else {
                  output.push(token);
                }
                break;
              case Twig.token.type.logic:
                compileLogic.call(self, token);
                break;
              // Do nothing, comments should be ignored
              case Twig.token.type.comment:
                break;
              case Twig.token.type.output:
                compileOutput.call(self, token);
                break;
              // Kill whitespace ahead and behind this token
              case Twig.token.type.logicWhitespacePre:
              case Twig.token.type.logicWhitespacePost:
              case Twig.token.type.logicWhitespaceBoth:
              case Twig.token.type.outputWhitespacePre:
              case Twig.token.type.outputWhitespacePost:
              case Twig.token.type.outputWhitespaceBoth:
                if (token.type !== Twig.token.type.outputWhitespacePost && token.type !== Twig.token.type.logicWhitespacePost) {
                  if (prevOutput) {
                    if (prevOutput.type === Twig.token.type.raw) {
                      output.pop();
                      prevOutput.value = prevOutput.value.trimEnd();
                      output.push(prevOutput);
                    }
                  }
                  if (prevIntermediateOutput) {
                    if (prevIntermediateOutput.type === Twig.token.type.raw) {
                      intermediateOutput.pop();
                      prevIntermediateOutput.value = prevIntermediateOutput.value.trimEnd();
                      intermediateOutput.push(prevIntermediateOutput);
                    }
                  }
                }
                switch (token.type) {
                  case Twig.token.type.outputWhitespacePre:
                  case Twig.token.type.outputWhitespacePost:
                  case Twig.token.type.outputWhitespaceBoth:
                    compileOutput.call(self, token);
                    break;
                  case Twig.token.type.logicWhitespacePre:
                  case Twig.token.type.logicWhitespacePost:
                  case Twig.token.type.logicWhitespaceBoth:
                    compileLogic.call(self, token);
                    break;
                  default:
                    break;
                }
                if (token.type !== Twig.token.type.outputWhitespacePre && token.type !== Twig.token.type.logicWhitespacePre) {
                  if (nextToken) {
                    if (nextToken.type === Twig.token.type.raw) {
                      tokens.shift();
                      nextToken.value = nextToken.value.trimStart();
                      tokens.unshift(nextToken);
                    }
                  }
                }
                break;
              default:
                break;
            }
            Twig.log.trace(
              "Twig.compile: ",
              " Output: ",
              output,
              " Logic Stack: ",
              stack,
              " Pending Output: ",
              intermediateOutput
            );
          }
          if (stack.length > 0) {
            unclosedToken = stack.pop();
            throw new Error("Unable to find an end tag for " + unclosedToken.type + ", expecting one of " + unclosedToken.next);
          }
          return output;
        } catch (error) {
          if (self.options.rethrow) {
            if (error.type === "TwigException" && !error.file) {
              error.file = self.id;
            }
            throw error;
          } else {
            Twig.log.error("Error compiling twig template " + self.id + ": ");
            if (error.stack) {
              Twig.log.error(error.stack);
            } else {
              Twig.log.error(error.toString());
            }
          }
        }
      };
      function handleException(state, ex) {
        if (state.template.options.rethrow) {
          if (typeof ex === "string") {
            ex = new Twig.Error(ex);
          }
          if (ex.type === "TwigException" && !ex.file) {
            ex.file = state.template.id;
          }
          throw ex;
        } else {
          Twig.log.error("Error parsing twig template " + state.template.id + ": ");
          if (ex.stack) {
            Twig.log.error(ex.stack);
          } else {
            Twig.log.error(ex.toString());
          }
          if (Twig.debug) {
            return ex.toString();
          }
        }
      }
      __name(handleException, "handleException");
      Twig.prepare = function(data) {
        Twig.log.debug("Twig.prepare: ", "Tokenizing ", data);
        const rawTokens = Twig.tokenize.call(this, data);
        Twig.log.debug("Twig.prepare: ", "Compiling ", rawTokens);
        const tokens = Twig.compile.call(this, rawTokens);
        Twig.log.debug("Twig.prepare: ", "Compiled ", tokens);
        return tokens;
      };
      Twig.output = function(output) {
        const { autoescape } = this.options;
        if (!autoescape) {
          return output.join("");
        }
        const strategy = typeof autoescape === "string" ? autoescape : "html";
        const escapedOutput = output.map((str) => {
          if (str && (str.twigMarkup !== true && str.twigMarkup !== strategy) && !(strategy === "html" && str.twigMarkup === "html_attr")) {
            str = Twig.filters.escape(str, [strategy]);
          }
          return str;
        });
        if (escapedOutput.length === 0) {
          return "";
        }
        const joinedOutput = escapedOutput.join("");
        if (joinedOutput.length === 0) {
          return "";
        }
        return new Twig.Markup(joinedOutput, true);
      };
      Twig.Templates = {
        /**
         * Registered template loaders - use Twig.Templates.registerLoader to add supported loaders
         * @type {Object}
         */
        loaders: {},
        /**
         * Registered template parsers - use Twig.Templates.registerParser to add supported parsers
         * @type {Object}
         */
        parsers: {},
        /**
         * Cached / loaded templates
         * @type {Object}
         */
        registry: {}
      };
      Twig.validateId = function(id) {
        if (id === "prototype") {
          throw new Twig.Error(id + " is not a valid twig identifier");
        } else if (Twig.cache && Object.hasOwnProperty.call(Twig.Templates.registry, id)) {
          throw new Twig.Error("There is already a template with the ID " + id);
        }
        return true;
      };
      Twig.Templates.registerLoader = function(methodName, func, scope) {
        if (typeof func !== "function") {
          throw new Twig.Error("Unable to add loader for " + methodName + ": Invalid function reference given.");
        }
        if (scope) {
          func = func.bind(scope);
        }
        this.loaders[methodName] = func;
      };
      Twig.Templates.unRegisterLoader = function(methodName) {
        if (this.isRegisteredLoader(methodName)) {
          delete this.loaders[methodName];
        }
      };
      Twig.Templates.isRegisteredLoader = function(methodName) {
        return Object.hasOwnProperty.call(this.loaders, methodName);
      };
      Twig.Templates.registerParser = function(methodName, func, scope) {
        if (typeof func !== "function") {
          throw new Twig.Error("Unable to add parser for " + methodName + ": Invalid function regerence given.");
        }
        if (scope) {
          func = func.bind(scope);
        }
        this.parsers[methodName] = func;
      };
      Twig.Templates.unRegisterParser = function(methodName) {
        if (this.isRegisteredParser(methodName)) {
          delete this.parsers[methodName];
        }
      };
      Twig.Templates.isRegisteredParser = function(methodName) {
        return Object.hasOwnProperty.call(this.parsers, methodName);
      };
      Twig.Templates.save = function(template) {
        if (template.id === void 0) {
          throw new Twig.Error("Unable to save template with no id");
        }
        Twig.Templates.registry[template.id] = template;
      };
      Twig.Templates.load = function(id) {
        if (!Object.hasOwnProperty.call(Twig.Templates.registry, id)) {
          return null;
        }
        return Twig.Templates.registry[id];
      };
      Twig.Templates.loadRemote = function(location, params, callback, errorCallback) {
        const id = typeof params.id === "undefined" ? location : params.id;
        const cached = Twig.Templates.registry[id];
        if (Twig.cache && typeof cached !== "undefined") {
          if (typeof callback === "function") {
            callback(cached);
          }
          return cached;
        }
        params.parser = params.parser || "twig";
        params.id = id;
        if (typeof params.async === "undefined") {
          params.async = true;
        }
        const loader = this.loaders[params.method] || this.loaders.fs;
        return loader.call(this, location, params, callback, errorCallback);
      };
      function is(type, obj) {
        const clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== void 0 && obj !== null && clas === type;
      }
      __name(is, "is");
      Twig.Block = function(template, token) {
        this.template = template;
        this.token = token;
      };
      Twig.Block.prototype.render = function(parseState, context) {
        const originalTemplate = parseState.template;
        let promise;
        parseState.template = this.template;
        if (this.token.expression) {
          promise = Twig.expression.parseAsync.call(parseState, this.token.output, context);
        } else {
          promise = parseState.parseAsync(this.token.output, context);
        }
        return promise.then((value) => {
          return Twig.expression.parseAsync.call(
            parseState,
            {
              type: Twig.expression.type.string,
              value
            },
            context
          );
        }).then((output) => {
          parseState.template = originalTemplate;
          return output;
        });
      };
      Twig.ParseState = function(template, blockOverrides, context) {
        this.renderedBlocks = {};
        this.overrideBlocks = blockOverrides === void 0 ? {} : blockOverrides;
        this.context = context === void 0 ? {} : context;
        this.macros = {};
        this.nestingStack = [];
        this.template = template;
      };
      Twig.ParseState.prototype.getBlock = function(name, checkOnlyInheritedBlocks) {
        let block;
        if (checkOnlyInheritedBlocks !== true) {
          block = this.overrideBlocks[name];
        }
        if (block === void 0) {
          block = this.template.getBlock(name, checkOnlyInheritedBlocks);
        }
        if (block === void 0 && this.template.parentTemplate !== null) {
          block = this.template.parentTemplate.getBlock(name);
        }
        return block;
      };
      Twig.ParseState.prototype.getBlocks = function(includeParentBlocks) {
        let blocks = {};
        if (includeParentBlocks !== false && this.template.parentTemplate !== null && // Prevent infinite loop
        this.template.parentTemplate !== this.template) {
          blocks = this.template.parentTemplate.getBlocks();
        }
        blocks = {
          ...blocks,
          // Override with any blocks defined within the associated template
          ...this.template.getBlocks(),
          // Override with any blocks specified when initialized
          ...this.overrideBlocks
        };
        return blocks;
      };
      Twig.ParseState.prototype.getNestingStackToken = function(type) {
        let matchingToken;
        this.nestingStack.forEach((token) => {
          if (matchingToken === void 0 && token.type === type) {
            matchingToken = token;
          }
        });
        return matchingToken;
      };
      Twig.ParseState.prototype.parse = function(tokens, context, allowAsync) {
        const state = this;
        let output = [];
        let err = null;
        let isAsync = true;
        let promise = null;
        let chain = true;
        if (context) {
          state.context = context;
        }
        function outputPush(o) {
          output.push(o);
        }
        __name(outputPush, "outputPush");
        function parseTokenLogic(logic) {
          if (typeof logic.chain !== "undefined") {
            chain = logic.chain;
          }
          if (typeof logic.context !== "undefined") {
            state.context = logic.context;
          }
          if (typeof logic.output !== "undefined") {
            output.push(logic.output);
          }
        }
        __name(parseTokenLogic, "parseTokenLogic");
        promise = Twig.async.forEach(tokens, (token) => {
          Twig.log.debug("Twig.ParseState.parse: ", "Parsing token: ", token);
          switch (token.type) {
            case Twig.token.type.raw:
              output.push(Twig.filters.raw(token.value));
              break;
            case Twig.token.type.logic:
              return Twig.logic.parseAsync.call(state, token.token, state.context, chain).then(parseTokenLogic);
            case Twig.token.type.comment:
              break;
            // Fall through whitespace to output
            case Twig.token.type.outputWhitespacePre:
            case Twig.token.type.outputWhitespacePost:
            case Twig.token.type.outputWhitespaceBoth:
            case Twig.token.type.output:
              Twig.log.debug("Twig.ParseState.parse: ", "Output token: ", token.stack);
              return Twig.expression.parseAsync.call(state, token.stack, state.context).then(outputPush);
            default:
              break;
          }
        }).then(() => {
          output = Twig.output.call(state.template, output);
          isAsync = false;
          return output;
        }).catch((error) => {
          if (allowAsync) {
            handleException(state, error);
          }
          err = error;
        });
        if (allowAsync) {
          return promise;
        }
        if (err !== null) {
          return handleException(state, err);
        }
        if (isAsync) {
          throw new Twig.Error("You are using Twig.js in sync mode in combination with async extensions.");
        }
        return output;
      };
      Twig.Template = function(params) {
        const { data, id, base, path: path2, url, name, method, options } = params;
        this.base = base;
        this.blocks = {
          defined: {},
          imported: {}
        };
        this.id = id;
        this.method = method;
        this.name = name;
        this.options = options;
        this.parentTemplate = null;
        this.path = path2;
        this.url = url;
        if (is("String", data)) {
          this.tokens = Twig.prepare.call(this, data);
        } else {
          this.tokens = data;
        }
        if (id !== void 0) {
          Twig.Templates.save(this);
        }
      };
      Twig.Template.prototype.getBlock = function(name, checkOnlyInheritedBlocks, checkImports = true) {
        let block;
        if (checkOnlyInheritedBlocks !== true) {
          block = this.blocks.defined[name];
        }
        if (checkImports && block === void 0) {
          block = this.blocks.imported[name];
        }
        if (block === void 0 && this.parentTemplate !== null) {
          block = this.parentTemplate.getBlock(name, checkOnlyInheritedBlocks, checkImports = false);
        }
        return block;
      };
      Twig.Template.prototype.getBlocks = function() {
        let blocks = {};
        blocks = {
          ...blocks,
          // Get any blocks imported from other templates
          ...this.blocks.imported,
          // Override with any blocks defined within the template itself
          ...this.blocks.defined
        };
        return blocks;
      };
      Twig.Template.prototype.render = function(context, params, allowAsync) {
        const template = this;
        params = params || {};
        return Twig.async.potentiallyAsync(template, allowAsync, () => {
          const state = new Twig.ParseState(template, params.blocks, context);
          return state.parseAsync(template.tokens).then((output) => {
            let parentTemplate;
            let url;
            if (template.parentTemplate !== null) {
              if (template.options.allowInlineIncludes) {
                parentTemplate = Twig.Templates.load(template.parentTemplate);
                if (parentTemplate) {
                  parentTemplate.options = template.options;
                }
              }
              if (!parentTemplate) {
                url = Twig.path.parsePath(template, template.parentTemplate);
                parentTemplate = Twig.Templates.loadRemote(url, {
                  method: template.getLoaderMethod(),
                  base: template.base,
                  async: false,
                  id: url,
                  options: template.options
                });
              }
              template.parentTemplate = parentTemplate;
              return template.parentTemplate.renderAsync(
                state.context,
                {
                  blocks: state.getBlocks(false),
                  isInclude: true
                }
              );
            }
            if (params.isInclude === true) {
              return output;
            }
            return output.valueOf();
          });
        });
      };
      Twig.Template.prototype.importFile = function(file) {
        let url = null;
        let subTemplate;
        if (!this.url && this.options.allowInlineIncludes) {
          file = this.path ? Twig.path.parsePath(this, file) : file;
          subTemplate = Twig.Templates.load(file);
          if (!subTemplate) {
            subTemplate = Twig.Templates.loadRemote(url, {
              id: file,
              method: this.getLoaderMethod(),
              async: false,
              path: file,
              options: this.options
            });
            if (!subTemplate) {
              throw new Twig.Error("Unable to find the template " + file);
            }
          }
          subTemplate.options = this.options;
          return subTemplate;
        }
        url = Twig.path.parsePath(this, file);
        subTemplate = Twig.Templates.loadRemote(url, {
          method: this.getLoaderMethod(),
          base: this.base,
          async: false,
          options: this.options,
          id: url
        });
        return subTemplate;
      };
      Twig.Template.prototype.getLoaderMethod = function() {
        if (this.path) {
          return "fs";
        }
        if (this.url) {
          return "ajax";
        }
        return this.method || "fs";
      };
      Twig.Template.prototype.compile = function(options) {
        return Twig.compiler.compile(this, options);
      };
      Twig.Markup = function(content, strategy) {
        if (typeof content !== "string") {
          return content;
        }
        const output = new String(content);
        output.twigMarkup = typeof strategy === "undefined" ? true : strategy;
        return output;
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.compiler.js
var require_twig_compiler = __commonJS({
  "../node_modules/twig/src/twig.compiler.js"(exports, module) {
    module.exports = function(Twig) {
      Twig.compiler = {
        module: {}
      };
      Twig.compiler.compile = function(template, options) {
        const tokens = JSON.stringify(template.tokens);
        const { id } = template;
        let output = null;
        if (options.module) {
          if (Twig.compiler.module[options.module] === void 0) {
            throw new Twig.Error("Unable to find module type " + options.module);
          }
          output = Twig.compiler.module[options.module](id, tokens, options.twig);
        } else {
          output = Twig.compiler.wrap(id, tokens);
        }
        return output;
      };
      Twig.compiler.module = {
        amd(id, tokens, pathToTwig) {
          return 'define(["' + pathToTwig + '"], function (Twig) {\n	var twig, templates;\ntwig = Twig.twig;\ntemplates = ' + Twig.compiler.wrap(id, tokens) + "\n	return templates;\n});";
        },
        node(id, tokens) {
          return 'var twig = require("twig").twig;\nexports.template = ' + Twig.compiler.wrap(id, tokens);
        },
        cjs2(id, tokens, pathToTwig) {
          return 'module.declare([{ twig: "' + pathToTwig + '" }], function (require, exports, module) {\n	var twig = require("twig").twig;\n	exports.template = ' + Twig.compiler.wrap(id, tokens) + "\n});";
        }
      };
      Twig.compiler.wrap = function(id, tokens) {
        return 'twig({id:"' + id.replace('"', '\\"') + '", data:' + tokens + ", precompiled: true});\n";
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.expression.operator.js
var require_twig_expression_operator = __commonJS({
  "../node_modules/twig/src/twig.expression.operator.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.expression.operator = {
        leftToRight: "leftToRight",
        rightToLeft: "rightToLeft"
      };
      const containment = /* @__PURE__ */ __name(function(a, b) {
        if (b === void 0 || b === null) {
          return null;
        }
        if (b.indexOf !== void 0) {
          return (a === b || a !== "") && b.includes(a);
        }
        let el;
        for (el in b) {
          if (Object.hasOwnProperty.call(b, el) && b[el] === a) {
            return true;
          }
        }
        return false;
      }, "containment");
      Twig.expression.operator.lookup = function(operator, token) {
        switch (operator) {
          case "..":
            token.precidence = 20;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case ",":
            token.precidence = 18;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          // Ternary
          case "?:":
          case "?":
          case ":":
            token.precidence = 16;
            token.associativity = Twig.expression.operator.rightToLeft;
            break;
          // Null-coalescing operator
          case "??":
            token.precidence = 15;
            token.associativity = Twig.expression.operator.rightToLeft;
            break;
          case "or":
            token.precidence = 14;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "and":
            token.precidence = 13;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "b-or":
            token.precidence = 12;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "b-xor":
            token.precidence = 11;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "b-and":
            token.precidence = 10;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "==":
          case "!=":
            token.precidence = 9;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "<=>":
            token.precidence = 9;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "<":
          case "<=":
          case ">":
          case ">=":
          case "not in":
          case "in":
            token.precidence = 8;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "~":
          // String concatination
          case "+":
          case "-":
            token.precidence = 6;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "//":
          case "**":
          case "*":
          case "/":
          case "%":
            token.precidence = 5;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "not":
            token.precidence = 3;
            token.associativity = Twig.expression.operator.rightToLeft;
            break;
          case "matches":
            token.precidence = 8;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "starts with":
            token.precidence = 8;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          case "ends with":
            token.precidence = 8;
            token.associativity = Twig.expression.operator.leftToRight;
            break;
          default:
            throw new Twig.Error("Failed to lookup operator: " + operator + " is an unknown operator.");
        }
        token.operator = operator;
        return token;
      };
      Twig.expression.operator.parse = function(operator, stack) {
        Twig.log.trace("Twig.expression.operator.parse: ", "Handling ", operator);
        let a;
        let b;
        let c;
        if (operator === "?") {
          c = stack.pop();
        }
        b = stack.pop();
        if (operator !== "not") {
          a = stack.pop();
        }
        if (operator !== "in" && operator !== "not in" && operator !== "??") {
          if (a && Array.isArray(a)) {
            a = a.length;
          }
          if (operator !== "?" && (b && Array.isArray(b))) {
            b = b.length;
          }
        }
        if (operator === "matches") {
          if (b && typeof b === "string") {
            const reParts = b.match(/^\/(.*)\/([gims]?)$/);
            const reBody = reParts[1];
            const reFlags = reParts[2];
            b = new RegExp(reBody, reFlags);
          }
        }
        switch (operator) {
          case ":":
            break;
          case "??":
            if (a === void 0) {
              a = b;
              b = c;
              c = void 0;
            }
            if (a !== void 0 && a !== null) {
              stack.push(a);
            } else {
              stack.push(b);
            }
            break;
          case "?:":
            if (Twig.lib.boolval(a)) {
              stack.push(a);
            } else {
              stack.push(b);
            }
            break;
          case "?":
            if (a === void 0) {
              a = b;
              b = c;
              c = void 0;
            }
            if (Twig.lib.boolval(a)) {
              stack.push(b);
            } else {
              stack.push(c);
            }
            break;
          case "+":
            b = parseFloat(b);
            a = parseFloat(a);
            stack.push(a + b);
            break;
          case "-":
            b = parseFloat(b);
            a = parseFloat(a);
            stack.push(a - b);
            break;
          case "*":
            b = parseFloat(b);
            a = parseFloat(a);
            stack.push(a * b);
            break;
          case "/":
            b = parseFloat(b);
            a = parseFloat(a);
            stack.push(a / b);
            break;
          case "//":
            b = parseFloat(b);
            a = parseFloat(a);
            stack.push(Math.floor(a / b));
            break;
          case "%":
            b = parseFloat(b);
            a = parseFloat(a);
            stack.push(a % b);
            break;
          case "~":
            stack.push((typeof a !== "undefined" && a !== null ? a.toString() : "") + (typeof b !== "undefined" && b !== null ? b.toString() : ""));
            break;
          case "not":
          case "!":
            stack.push(!Twig.lib.boolval(b));
            break;
          case "<=>":
            stack.push(a === b ? 0 : a < b ? -1 : 1);
            break;
          case "<":
            stack.push(a < b);
            break;
          case "<=":
            stack.push(a <= b);
            break;
          case ">":
            stack.push(a > b);
            break;
          case ">=":
            stack.push(a >= b);
            break;
          case "===":
            stack.push(a === b);
            break;
          case "==":
            stack.push(a == b);
            break;
          case "!==":
            stack.push(a !== b);
            break;
          case "!=":
            stack.push(a != b);
            break;
          case "or":
            stack.push(Twig.lib.boolval(a) || Twig.lib.boolval(b));
            break;
          case "b-or":
            stack.push(a | b);
            break;
          case "b-xor":
            stack.push(a ^ b);
            break;
          case "and":
            stack.push(Twig.lib.boolval(a) && Twig.lib.boolval(b));
            break;
          case "b-and":
            stack.push(a & b);
            break;
          case "**":
            stack.push(a ** b);
            break;
          case "not in":
            stack.push(!containment(a, b));
            break;
          case "in":
            stack.push(containment(a, b));
            break;
          case "matches":
            stack.push(b.test(a));
            break;
          case "starts with":
            stack.push(typeof a === "string" && a.indexOf(b) === 0);
            break;
          case "ends with":
            stack.push(typeof a === "string" && a.includes(b, a.length - b.length));
            break;
          case "..":
            stack.push(Twig.functions.range(a, b));
            break;
          default:
            throw new Twig.Error("Failed to parse operator: " + operator + " is an unknown operator.");
        }
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.expression.js
var require_twig_expression = __commonJS({
  "../node_modules/twig/src/twig.expression.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      function parseParams(state, params, context) {
        if (params) {
          return Twig.expression.parseAsync.call(state, params, context);
        }
        return Twig.Promise.resolve(false);
      }
      __name(parseParams, "parseParams");
      Twig.expression = {};
      require_twig_expression_operator()(Twig);
      Twig.expression.reservedWords = [
        "true",
        "false",
        "null",
        "TRUE",
        "FALSE",
        "NULL",
        "_context",
        "and",
        "b-and",
        "or",
        "b-or",
        "b-xor",
        "in",
        "not in",
        "if",
        "matches",
        "starts",
        "ends",
        "with"
      ];
      Twig.expression.type = {
        comma: "Twig.expression.type.comma",
        operator: {
          unary: "Twig.expression.type.operator.unary",
          binary: "Twig.expression.type.operator.binary"
        },
        string: "Twig.expression.type.string",
        bool: "Twig.expression.type.bool",
        slice: "Twig.expression.type.slice",
        array: {
          start: "Twig.expression.type.array.start",
          end: "Twig.expression.type.array.end"
        },
        object: {
          start: "Twig.expression.type.object.start",
          end: "Twig.expression.type.object.end"
        },
        parameter: {
          start: "Twig.expression.type.parameter.start",
          end: "Twig.expression.type.parameter.end"
        },
        subexpression: {
          start: "Twig.expression.type.subexpression.start",
          end: "Twig.expression.type.subexpression.end"
        },
        key: {
          period: "Twig.expression.type.key.period",
          brackets: "Twig.expression.type.key.brackets"
        },
        filter: "Twig.expression.type.filter",
        _function: "Twig.expression.type._function",
        variable: "Twig.expression.type.variable",
        number: "Twig.expression.type.number",
        _null: "Twig.expression.type.null",
        context: "Twig.expression.type.context",
        test: "Twig.expression.type.test"
      };
      Twig.expression.set = {
        // What can follow an expression (in general)
        operations: [
          Twig.expression.type.filter,
          Twig.expression.type.operator.unary,
          Twig.expression.type.operator.binary,
          Twig.expression.type.array.end,
          Twig.expression.type.object.end,
          Twig.expression.type.parameter.end,
          Twig.expression.type.subexpression.end,
          Twig.expression.type.comma,
          Twig.expression.type.test
        ],
        expressions: [
          Twig.expression.type._function,
          Twig.expression.type.bool,
          Twig.expression.type.string,
          Twig.expression.type.variable,
          Twig.expression.type.number,
          Twig.expression.type._null,
          Twig.expression.type.context,
          Twig.expression.type.parameter.start,
          Twig.expression.type.array.start,
          Twig.expression.type.object.start,
          Twig.expression.type.subexpression.start,
          Twig.expression.type.operator.unary
        ]
      };
      Twig.expression.set.operationsExtended = Twig.expression.set.operations.concat([
        Twig.expression.type.key.period,
        Twig.expression.type.key.brackets,
        Twig.expression.type.slice
      ]);
      Twig.expression.fn = {
        compile: {
          push(token, stack, output) {
            output.push(token);
          },
          pushBoth(token, stack, output) {
            output.push(token);
            stack.push(token);
          }
        },
        parse: {
          push(token, stack) {
            stack.push(token);
          },
          pushValue(token, stack) {
            stack.push(token.value);
          }
        }
      };
      Twig.expression.definitions = [
        {
          type: Twig.expression.type.test,
          regex: /^is\s+(not)?\s*([a-zA-Z_]\w*(\s?(?:as|by))?)/,
          next: Twig.expression.set.operations.concat([Twig.expression.type.parameter.start]),
          compile(token, stack, output) {
            token.filter = token.match[2];
            token.modifier = token.match[1];
            delete token.match;
            delete token.value;
            output.push(token);
          },
          parse(token, stack, context) {
            const value = stack.pop();
            const state = this;
            return parseParams(state, token.params, context).then((params) => {
              const result = Twig.test(token.filter, value, params);
              if (token.modifier === "not") {
                stack.push(!result);
              } else {
                stack.push(result);
              }
            });
          }
        },
        {
          type: Twig.expression.type.comma,
          // Match a comma
          regex: /^,/,
          next: Twig.expression.set.expressions.concat([Twig.expression.type.array.end, Twig.expression.type.object.end]),
          compile(token, stack, output) {
            let i = stack.length - 1;
            let stackToken;
            delete token.match;
            delete token.value;
            for (; i >= 0; i--) {
              stackToken = stack.pop();
              if (stackToken.type === Twig.expression.type.object.start || stackToken.type === Twig.expression.type.parameter.start || stackToken.type === Twig.expression.type.array.start) {
                stack.push(stackToken);
                break;
              }
              output.push(stackToken);
            }
            output.push(token);
          }
        },
        {
          /**
           * Match a number (integer or decimal)
           */
          type: Twig.expression.type.number,
          // Match a number
          regex: /^-?\d+(\.\d+)?/,
          next: Twig.expression.set.operations,
          compile(token, stack, output) {
            token.value = Number(token.value);
            output.push(token);
          },
          parse: Twig.expression.fn.parse.pushValue
        },
        {
          type: Twig.expression.type.operator.binary,
          // Match any of ??, ?:, +, *, /, -, %, ~, <=>, <, <=, >, >=, !=, ==, **, ?, :, and, b-and, or, b-or, b-xor, in, not in
          // and, or, in, not in, matches, starts with, ends with can be followed by a space or parenthesis
          regex: /(^\?\?|^\?:|^(b-and)|^(b-or)|^(b-xor)|^[+\-~%?]|^(<=>)|^[:](?!\d\])|^[!=]==?|^[!<>]=?|^\*\*?|^\/\/?|^(and)[(|\s+]|^(or)[(|\s+]|^(in)[(|\s+]|^(not in)[(|\s+]|^(matches)|^(starts with)|^(ends with)|^\.\.)/,
          next: Twig.expression.set.expressions,
          transform(match, tokens) {
            switch (match[0]) {
              case "and(":
              case "or(":
              case "in(":
              case "not in(":
                tokens[tokens.length - 1].value = match[2];
                return match[0];
              default:
                return "";
            }
          },
          compile(token, stack, output) {
            delete token.match;
            token.value = token.value.trim();
            const { value } = token;
            const operator = Twig.expression.operator.lookup(value, token);
            Twig.log.trace("Twig.expression.compile: ", "Operator: ", operator, " from ", value);
            while (stack.length > 0 && (stack[stack.length - 1].type === Twig.expression.type.operator.unary || stack[stack.length - 1].type === Twig.expression.type.operator.binary) && (operator.associativity === Twig.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
              const temp = stack.pop();
              output.push(temp);
            }
            if (value === ":") {
              if (stack[stack.length - 1] && stack[stack.length - 1].value === "?") {
              } else {
                const keyToken = output.pop();
                if (keyToken.type === Twig.expression.type.string || keyToken.type === Twig.expression.type.variable) {
                  token.key = keyToken.value;
                } else if (keyToken.type === Twig.expression.type.number) {
                  token.key = keyToken.value.toString();
                } else if (keyToken.expression && (keyToken.type === Twig.expression.type.parameter.end || keyToken.type === Twig.expression.type.subexpression.end)) {
                  token.params = keyToken.params;
                } else {
                  throw new Twig.Error("Unexpected value before ':' of " + keyToken.type + " = " + keyToken.value);
                }
                output.push(token);
              }
            } else {
              stack.push(operator);
            }
          },
          parse(token, stack, context) {
            const state = this;
            if (token.key) {
              stack.push(token);
            } else if (token.params) {
              return Twig.expression.parseAsync.call(state, token.params, context).then((key) => {
                token.key = key;
                stack.push(token);
                if (!context.loop) {
                  delete token.params;
                }
              });
            } else {
              Twig.expression.operator.parse(token.value, stack);
            }
          }
        },
        {
          type: Twig.expression.type.operator.unary,
          // Match any of not
          regex: /(^not\s+)/,
          next: Twig.expression.set.expressions,
          compile(token, stack, output) {
            delete token.match;
            token.value = token.value.trim();
            const { value } = token;
            const operator = Twig.expression.operator.lookup(value, token);
            Twig.log.trace("Twig.expression.compile: ", "Operator: ", operator, " from ", value);
            while (stack.length > 0 && (stack[stack.length - 1].type === Twig.expression.type.operator.unary || stack[stack.length - 1].type === Twig.expression.type.operator.binary) && (operator.associativity === Twig.expression.operator.leftToRight && operator.precidence >= stack[stack.length - 1].precidence || operator.associativity === Twig.expression.operator.rightToLeft && operator.precidence > stack[stack.length - 1].precidence)) {
              const temp = stack.pop();
              output.push(temp);
            }
            stack.push(operator);
          },
          parse(token, stack) {
            Twig.expression.operator.parse(token.value, stack);
          }
        },
        {
          /**
           * Match a string. This is anything between a pair of single or double quotes.
           */
          type: Twig.expression.type.string,
          // See: http://blog.stevenlevithan.com/archives/match-quoted-string
          regex: /^(["'])(?:(?=(\\?))\2[\s\S])*?\1/,
          next: Twig.expression.set.operationsExtended,
          compile(token, stack, output) {
            let { value } = token;
            delete token.match;
            if (value.slice(0, 1) === '"') {
              value = value.replace('\\"', '"');
            } else {
              value = value.replace("\\'", "'");
            }
            token.value = value.slice(1, -1).replace(/\\n/g, "\n").replace(/\\r/g, "\r");
            Twig.log.trace("Twig.expression.compile: ", "String value: ", token.value);
            output.push(token);
          },
          parse: Twig.expression.fn.parse.pushValue
        },
        {
          /**
           * Match a subexpression set start.
           */
          type: Twig.expression.type.subexpression.start,
          regex: /^\(/,
          next: Twig.expression.set.expressions.concat([Twig.expression.type.subexpression.end]),
          compile(token, stack, output) {
            token.value = "(";
            output.push(token);
            stack.push(token);
          },
          parse: Twig.expression.fn.parse.push
        },
        {
          /**
           * Match a subexpression set end.
           */
          type: Twig.expression.type.subexpression.end,
          regex: /^\)/,
          next: Twig.expression.set.operationsExtended,
          validate(match, tokens) {
            let i = tokens.length - 1;
            let foundSubexpressionStart = false;
            let nextSubexpressionStartInvalid = false;
            let unclosedParameterCount = 0;
            while (!foundSubexpressionStart && i >= 0) {
              const token = tokens[i];
              foundSubexpressionStart = token.type === Twig.expression.type.subexpression.start;
              if (foundSubexpressionStart && nextSubexpressionStartInvalid) {
                nextSubexpressionStartInvalid = false;
                foundSubexpressionStart = false;
              }
              if (token.type === Twig.expression.type.parameter.start) {
                unclosedParameterCount++;
              } else if (token.type === Twig.expression.type.parameter.end) {
                unclosedParameterCount--;
              } else if (token.type === Twig.expression.type.subexpression.end) {
                nextSubexpressionStartInvalid = true;
              }
              i--;
            }
            return foundSubexpressionStart && unclosedParameterCount === 0;
          },
          compile(token, stack, output) {
            let stackToken;
            const endToken = token;
            stackToken = stack.pop();
            while (stack.length > 0 && stackToken.type !== Twig.expression.type.subexpression.start) {
              output.push(stackToken);
              stackToken = stack.pop();
            }
            const paramStack = [];
            while (token.type !== Twig.expression.type.subexpression.start) {
              paramStack.unshift(token);
              token = output.pop();
            }
            paramStack.unshift(token);
            stackToken = stack[stack.length - 1];
            if (stackToken === void 0 || stackToken.type !== Twig.expression.type._function && stackToken.type !== Twig.expression.type.filter && stackToken.type !== Twig.expression.type.test && stackToken.type !== Twig.expression.type.key.brackets) {
              endToken.expression = true;
              paramStack.pop();
              paramStack.shift();
              endToken.params = paramStack;
              output.push(endToken);
            } else {
              endToken.expression = false;
              stackToken.params = paramStack;
            }
          },
          parse(token, stack, context) {
            const state = this;
            if (token.expression) {
              return Twig.expression.parseAsync.call(state, token.params, context).then((value) => {
                stack.push(value);
              });
            }
            throw new Twig.Error("Unexpected subexpression end when token is not marked as an expression");
          }
        },
        {
          /**
           * Match a parameter set start.
           */
          type: Twig.expression.type.parameter.start,
          regex: /^\(/,
          next: Twig.expression.set.expressions.concat([Twig.expression.type.parameter.end]),
          validate(match, tokens) {
            const lastToken = tokens[tokens.length - 1];
            return lastToken && !Twig.expression.reservedWords.includes(lastToken.value.trim());
          },
          compile: Twig.expression.fn.compile.pushBoth,
          parse: Twig.expression.fn.parse.push
        },
        {
          /**
           * Match a parameter set end.
           */
          type: Twig.expression.type.parameter.end,
          regex: /^\)/,
          next: Twig.expression.set.operationsExtended,
          compile(token, stack, output) {
            let stackToken;
            const endToken = token;
            stackToken = stack.pop();
            while (stack.length > 0 && stackToken.type !== Twig.expression.type.parameter.start) {
              output.push(stackToken);
              stackToken = stack.pop();
            }
            const paramStack = [];
            while (token.type !== Twig.expression.type.parameter.start) {
              paramStack.unshift(token);
              token = output.pop();
            }
            paramStack.unshift(token);
            token = output[output.length - 1];
            if (token === void 0 || token.type !== Twig.expression.type._function && token.type !== Twig.expression.type.filter && token.type !== Twig.expression.type.test && token.type !== Twig.expression.type.key.brackets) {
              endToken.expression = true;
              paramStack.pop();
              paramStack.shift();
              endToken.params = paramStack;
              output.push(endToken);
            } else {
              endToken.expression = false;
              token.params = paramStack;
            }
          },
          parse(token, stack, context) {
            const newArray = [];
            let arrayEnded = false;
            let value = null;
            const state = this;
            if (token.expression) {
              return Twig.expression.parseAsync.call(state, token.params, context).then((value2) => {
                stack.push(value2);
              });
            }
            while (stack.length > 0) {
              value = stack.pop();
              if (value && value.type && value.type === Twig.expression.type.parameter.start) {
                arrayEnded = true;
                break;
              }
              newArray.unshift(value);
            }
            if (!arrayEnded) {
              throw new Twig.Error("Expected end of parameter set.");
            }
            stack.push(newArray);
          }
        },
        {
          type: Twig.expression.type.slice,
          regex: /^\[(-?\w*:-?\w*)\]/,
          next: Twig.expression.set.operationsExtended,
          compile(token, stack, output) {
            const sliceRange = token.match[1].split(":");
            const sliceStart = sliceRange[0];
            const sliceEnd = sliceRange[1];
            token.value = "slice";
            token.params = [sliceStart, sliceEnd];
            if (!sliceEnd) {
              token.params = [sliceStart];
            }
            output.push(token);
          },
          parse(token, stack, context) {
            const input = stack.pop();
            let { params } = token;
            const state = this;
            if (parseInt(params[0], 10).toString() === params[0]) {
              params[0] = parseInt(params[0], 10);
            } else {
              const value = context[params[0]];
              if (state.template.options.strictVariables && value === void 0) {
                throw new Twig.Error('Variable "' + params[0] + '" does not exist.');
              }
              params[0] = value;
            }
            if (params[1]) {
              if (parseInt(params[1], 10).toString() === params[1]) {
                params[1] = parseInt(params[1], 10);
              } else {
                const value = context[params[1]];
                if (state.template.options.strictVariables && value === void 0) {
                  throw new Twig.Error('Variable "' + params[1] + '" does not exist.');
                }
                if (value === void 0) {
                  params = [params[0]];
                } else {
                  params[1] = value;
                }
              }
            }
            stack.push(Twig.filter.call(state, token.value, input, params));
          }
        },
        {
          /**
           * Match an array start.
           */
          type: Twig.expression.type.array.start,
          regex: /^\[/,
          next: Twig.expression.set.expressions.concat([Twig.expression.type.array.end]),
          compile: Twig.expression.fn.compile.pushBoth,
          parse: Twig.expression.fn.parse.push
        },
        {
          /**
           * Match an array end.
           */
          type: Twig.expression.type.array.end,
          regex: /^\]/,
          next: Twig.expression.set.operationsExtended,
          compile(token, stack, output) {
            let i = stack.length - 1;
            let stackToken;
            for (; i >= 0; i--) {
              stackToken = stack.pop();
              if (stackToken.type === Twig.expression.type.array.start) {
                break;
              }
              output.push(stackToken);
            }
            output.push(token);
          },
          parse(token, stack) {
            const newArray = [];
            let arrayEnded = false;
            let value = null;
            while (stack.length > 0) {
              value = stack.pop();
              if (value && value.type && value.type === Twig.expression.type.array.start) {
                arrayEnded = true;
                break;
              }
              newArray.unshift(value);
            }
            if (!arrayEnded) {
              throw new Twig.Error("Expected end of array.");
            }
            stack.push(newArray);
          }
        },
        // Token that represents the start of a hash map '}'
        //
        // Hash maps take the form:
        //    { "key": 'value', "another_key": item }
        //
        // Keys must be quoted (either single or double) and values can be any expression.
        {
          type: Twig.expression.type.object.start,
          regex: /^\{/,
          next: Twig.expression.set.expressions.concat([Twig.expression.type.object.end]),
          compile: Twig.expression.fn.compile.pushBoth,
          parse: Twig.expression.fn.parse.push
        },
        // Token that represents the end of a Hash Map '}'
        //
        // This is where the logic for building the internal
        // representation of a hash map is defined.
        {
          type: Twig.expression.type.object.end,
          regex: /^\}/,
          next: Twig.expression.set.operationsExtended,
          compile(token, stack, output) {
            let i = stack.length - 1;
            let stackToken;
            for (; i >= 0; i--) {
              stackToken = stack.pop();
              if (stackToken && stackToken.type === Twig.expression.type.object.start) {
                break;
              }
              output.push(stackToken);
            }
            output.push(token);
          },
          parse(endToken, stack) {
            const newObject = {};
            let objectEnded = false;
            let token = null;
            let hasValue = false;
            let value = null;
            while (stack.length > 0) {
              token = stack.pop();
              if (token && token.type && token.type === Twig.expression.type.object.start) {
                objectEnded = true;
                break;
              }
              if (token && token.type && (token.type === Twig.expression.type.operator.binary || token.type === Twig.expression.type.operator.unary) && token.key) {
                if (!hasValue) {
                  throw new Twig.Error("Missing value for key '" + token.key + "' in object definition.");
                }
                newObject[token.key] = value;
                if (newObject._keys === void 0) {
                  newObject._keys = [];
                }
                newObject._keys.unshift(token.key);
                value = null;
                hasValue = false;
              } else {
                hasValue = true;
                value = token;
              }
            }
            if (!objectEnded) {
              throw new Twig.Error("Unexpected end of object.");
            }
            stack.push(newObject);
          }
        },
        // Token representing a filter
        //
        // Filters can follow any expression and take the form:
        //    expression|filter(optional, args)
        //
        // Filter parsing is done in the Twig.filters namespace.
        {
          type: Twig.expression.type.filter,
          // Match a | then a letter or _, then any number of letters, numbers, _ or -
          regex: /^\|\s?([a-zA-Z_][a-zA-Z0-9_-]*)/,
          next: Twig.expression.set.operationsExtended.concat([
            Twig.expression.type.parameter.start
          ]),
          compile(token, stack, output) {
            token.value = token.match[1];
            output.push(token);
          },
          parse(token, stack, context) {
            const input = stack.pop();
            const state = this;
            return parseParams(state, token.params, context).then((params) => {
              return Twig.filter.call(state, token.value, input, params);
            }).then((value) => {
              stack.push(value);
            });
          }
        },
        {
          type: Twig.expression.type._function,
          // Match any letter or _, then any number of letters, numbers, _ or - followed by (
          regex: /^([a-zA-Z_]\w*)\s*\(/,
          next: Twig.expression.type.parameter.start,
          validate(match) {
            return match[1] && !Twig.expression.reservedWords.includes(match[1]);
          },
          transform() {
            return "(";
          },
          compile(token, stack, output) {
            const fn = token.match[1];
            token.fn = fn;
            delete token.match;
            delete token.value;
            output.push(token);
          },
          parse(token, stack, context) {
            const state = this;
            const { fn } = token;
            let value;
            return parseParams(state, token.params, context).then((params) => {
              if (Twig.functions[fn]) {
                value = Twig.functions[fn].apply(state, params);
              } else if (typeof context[fn] === "function") {
                value = context[fn](...params);
              } else {
                throw new Twig.Error(fn + " function does not exist and is not defined in the context");
              }
              return value;
            }).then((result) => {
              stack.push(result);
            });
          }
        },
        // Token representing a variable.
        //
        // Variables can contain letters, numbers, underscores and
        // dashes, but must start with a letter or underscore.
        //
        // Variables are retrieved from the render context and take
        // the value of 'undefined' if the given variable doesn't
        // exist in the context.
        {
          type: Twig.expression.type.variable,
          // Match any letter or _, then any number of letters, numbers, _ or -
          regex: /^[a-zA-Z_]\w*/,
          next: Twig.expression.set.operationsExtended.concat([
            Twig.expression.type.parameter.start
          ]),
          compile: Twig.expression.fn.compile.push,
          validate(match) {
            return !Twig.expression.reservedWords.includes(match[0]);
          },
          parse(token, stack, context) {
            const state = this;
            return Twig.expression.resolveAsync.call(state, context[token.value], context).then((value) => {
              if (state.template.options.strictVariables && value === void 0) {
                throw new Twig.Error('Variable "' + token.value + '" does not exist.');
              }
              stack.push(value);
            });
          }
        },
        {
          type: Twig.expression.type.key.period,
          regex: /^\.(\w+)/,
          next: Twig.expression.set.operationsExtended.concat([
            Twig.expression.type.parameter.start
          ]),
          compile(token, stack, output) {
            token.key = token.match[1];
            delete token.match;
            delete token.value;
            output.push(token);
          },
          parse(token, stack, context, nextToken) {
            const state = this;
            const { key } = token;
            const object = stack.pop();
            let value;
            if (object && !Object.prototype.hasOwnProperty.call(object, key) && state.template.options.strictVariables) {
              const keys = Object.keys(object);
              if (keys.length > 0) {
                throw new Twig.Error('Key "' + key + '" for object with keys "' + Object.keys(object).join(", ") + '" does not exist.');
              } else {
                throw new Twig.Error('Key "' + key + '" does not exist as the object is empty.');
              }
            }
            return parseParams(state, token.params, context).then((params) => {
              if (object === null || object === void 0) {
                value = void 0;
              } else {
                const capitalize = /* @__PURE__ */ __name(function(value2) {
                  return value2.slice(0, 1).toUpperCase() + value2.slice(1);
                }, "capitalize");
                if (typeof object === "object" && key in object) {
                  value = object[key];
                } else if (object["get" + capitalize(key)]) {
                  value = object["get" + capitalize(key)];
                } else if (object["is" + capitalize(key)]) {
                  value = object["is" + capitalize(key)];
                } else {
                  value = void 0;
                }
              }
              return Twig.expression.resolveAsync.call(state, value, context, params, nextToken, object);
            }).then((result) => {
              stack.push(result);
            });
          }
        },
        {
          type: Twig.expression.type.key.brackets,
          regex: /^\[([^\]]*)\]/,
          next: Twig.expression.set.operationsExtended.concat([
            Twig.expression.type.parameter.start
          ]),
          compile(token, stack, output) {
            const match = token.match[1];
            delete token.value;
            delete token.match;
            token.stack = Twig.expression.compile({
              value: match
            }).stack;
            output.push(token);
          },
          parse(token, stack, context, nextToken) {
            const state = this;
            let params = null;
            let object;
            let value;
            return parseParams(state, token.params, context).then((parameters) => {
              params = parameters;
              return Twig.expression.parseAsync.call(state, token.stack, context);
            }).then((key) => {
              object = stack.pop();
              if (object && !Object.prototype.hasOwnProperty.call(object, key) && state.template.options.strictVariables) {
                const keys = Object.keys(object);
                if (keys.length > 0) {
                  throw new Twig.Error('Key "' + key + '" for array with keys "' + keys.join(", ") + '" does not exist.');
                } else {
                  throw new Twig.Error('Key "' + key + '" does not exist as the array is empty.');
                }
              } else if (object === null || object === void 0) {
                return null;
              }
              if (typeof object === "object" && key in object) {
                value = object[key];
              } else {
                value = null;
              }
              return Twig.expression.resolveAsync.call(state, value, object, params, nextToken);
            }).then((result) => {
              stack.push(result);
            });
          }
        },
        {
          /**
           * Match a null value.
           */
          type: Twig.expression.type._null,
          // Match a number
          regex: /^(null|NULL|none|NONE)/,
          next: Twig.expression.set.operations,
          compile(token, stack, output) {
            delete token.match;
            token.value = null;
            output.push(token);
          },
          parse: Twig.expression.fn.parse.pushValue
        },
        {
          /**
           * Match the context
           */
          type: Twig.expression.type.context,
          regex: /^_context/,
          next: Twig.expression.set.operationsExtended.concat([
            Twig.expression.type.parameter.start
          ]),
          compile: Twig.expression.fn.compile.push,
          parse(token, stack, context) {
            stack.push(context);
          }
        },
        {
          /**
           * Match a boolean
           */
          type: Twig.expression.type.bool,
          regex: /^(true|TRUE|false|FALSE)/,
          next: Twig.expression.set.operations,
          compile(token, stack, output) {
            token.value = token.match[0].toLowerCase() === "true";
            delete token.match;
            output.push(token);
          },
          parse: Twig.expression.fn.parse.pushValue
        }
      ];
      Twig.expression.resolveAsync = function(value, context, params, nextToken, object) {
        const state = this;
        if (typeof value !== "function") {
          return Twig.Promise.resolve(value);
        }
        let promise = Twig.Promise.resolve(params);
        if (nextToken && nextToken.type === Twig.expression.type.parameter.end) {
          const tokensAreParameters = true;
          promise = promise.then(() => {
            return nextToken.params && Twig.expression.parseAsync.call(state, nextToken.params, context, tokensAreParameters);
          }).then((p) => {
            nextToken.cleanup = true;
            return p;
          });
        }
        return promise.then((params2) => {
          return value.apply(object || context, params2 || []);
        });
      };
      Twig.expression.resolve = function(value, context, params, nextToken, object) {
        return Twig.async.potentiallyAsync(this, false, function() {
          return Twig.expression.resolveAsync.call(this, value, context, params, nextToken, object);
        });
      };
      Twig.expression.handler = {};
      Twig.expression.extendType = function(type) {
        Twig.expression.type[type] = "Twig.expression.type." + type;
      };
      Twig.expression.extend = function(definition) {
        if (!definition.type) {
          throw new Twig.Error("Unable to extend logic definition. No type provided for " + definition);
        }
        Twig.expression.handler[definition.type] = definition;
      };
      while (Twig.expression.definitions.length > 0) {
        Twig.expression.extend(Twig.expression.definitions.shift());
      }
      Twig.expression.tokenize = function(rawToken) {
        let expression = rawToken.value;
        const tokens = [];
        let expOffset = 0;
        let next = null;
        let type;
        let regex;
        let regexI;
        let tokenNext;
        let matchFound;
        let invalidMatches = [];
        const matchFunction = /* @__PURE__ */ __name(function(...args) {
          let matchI = arguments.length - 2;
          const match = new Array(matchI);
          while (matchI-- > 0) {
            match[matchI] = args[matchI];
          }
          Twig.log.trace(
            "Twig.expression.tokenize",
            "Matched a ",
            type,
            " regular expression of ",
            match
          );
          if (next && !next.includes(type)) {
            invalidMatches.push(
              type + " cannot follow a " + tokens[tokens.length - 1].type + " at template:" + expOffset + " near '" + match[0].slice(0, 20) + "...'"
            );
            return match[0];
          }
          const handler = Twig.expression.handler[type];
          if (handler.validate && !handler.validate(match, tokens)) {
            return match[0];
          }
          invalidMatches = [];
          const token = {
            type,
            value: match[0],
            match
          };
          if (rawToken.position) {
            token.position = rawToken.position;
          }
          tokens.push(token);
          matchFound = true;
          next = tokenNext;
          expOffset += match[0].length;
          if (handler.transform) {
            return handler.transform(match, tokens);
          }
          return "";
        }, "matchFunction");
        Twig.log.debug("Twig.expression.tokenize", "Tokenizing expression ", expression);
        while (expression.length > 0) {
          expression = expression.trim();
          for (type in Twig.expression.handler) {
            if (Object.hasOwnProperty.call(Twig.expression.handler, type)) {
              tokenNext = Twig.expression.handler[type].next;
              regex = Twig.expression.handler[type].regex;
              Twig.log.trace("Checking type ", type, " on ", expression);
              matchFound = false;
              if (Array.isArray(regex)) {
                regexI = regex.length;
                while (regexI-- > 0) {
                  expression = expression.replace(regex[regexI], matchFunction);
                }
              } else {
                expression = expression.replace(regex, matchFunction);
              }
              if (matchFound) {
                break;
              }
            }
          }
          if (!matchFound) {
            if (invalidMatches.length > 0) {
              throw new Twig.Error(invalidMatches.join(" OR "));
            } else {
              throw new Twig.Error("Unable to parse '" + expression + "' at template position" + expOffset);
            }
          }
        }
        Twig.log.trace("Twig.expression.tokenize", "Tokenized to ", tokens);
        return tokens;
      };
      Twig.expression.compile = function(rawToken) {
        const tokens = Twig.expression.tokenize(rawToken);
        let token = null;
        const output = [];
        const stack = [];
        let tokenTemplate = null;
        Twig.log.trace("Twig.expression.compile: ", "Compiling ", rawToken.value);
        while (tokens.length > 0) {
          token = tokens.shift();
          tokenTemplate = Twig.expression.handler[token.type];
          Twig.log.trace("Twig.expression.compile: ", "Compiling ", token);
          tokenTemplate.compile(token, stack, output);
          Twig.log.trace("Twig.expression.compile: ", "Stack is", stack);
          Twig.log.trace("Twig.expression.compile: ", "Output is", output);
        }
        while (stack.length > 0) {
          output.push(stack.pop());
        }
        Twig.log.trace("Twig.expression.compile: ", "Final output is", output);
        rawToken.stack = output;
        delete rawToken.value;
        return rawToken;
      };
      Twig.expression.parse = function(tokens, context, tokensAreParameters, allowAsync) {
        const state = this;
        if (!Array.isArray(tokens)) {
          tokens = [tokens];
        }
        const stack = [];
        const loopTokenFixups = [];
        const binaryOperator = Twig.expression.type.operator.binary;
        return Twig.async.potentiallyAsync(state, allowAsync, () => {
          return Twig.async.forEach(tokens, (token, index) => {
            let tokenTemplate = null;
            let nextToken = null;
            let result;
            if (token.cleanup) {
              return;
            }
            if (tokens.length > index + 1) {
              nextToken = tokens[index + 1];
            }
            tokenTemplate = Twig.expression.handler[token.type];
            if (tokenTemplate.parse) {
              result = tokenTemplate.parse.call(state, token, stack, context, nextToken);
            }
            if (token.type === binaryOperator && context.loop) {
              loopTokenFixups.push(token);
            }
            return result;
          }).then(() => {
            let len = loopTokenFixups.length;
            let loopTokenFixup = null;
            while (len-- > 0) {
              loopTokenFixup = loopTokenFixups[len];
              if (loopTokenFixup.params && loopTokenFixup.key) {
                delete loopTokenFixup.key;
              }
            }
            if (tokensAreParameters) {
              const params = stack.splice(0);
              stack.push(params);
            }
            return stack.pop();
          });
        });
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.filters.js
var require_twig_filters = __commonJS({
  "../node_modules/twig/src/twig.filters.js"(exports, module) {
    module.exports = function(Twig) {
      function is(type, obj) {
        const clas = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== void 0 && obj !== null && clas === type;
      }
      __name(is, "is");
      Twig.filters = {
        // String Filters
        upper(value) {
          if (typeof value !== "string") {
            return value;
          }
          return value.toUpperCase();
        },
        lower(value) {
          if (typeof value !== "string") {
            return value;
          }
          return value.toLowerCase();
        },
        capitalize(value) {
          if (typeof value !== "string") {
            return value;
          }
          return value.slice(0, 1).toUpperCase() + value.toLowerCase().slice(1);
        },
        title(value) {
          if (typeof value !== "string") {
            return value;
          }
          return value.toLowerCase().replace(/(^|\s)([a-z])/g, (m, p1, p2) => {
            return p1 + p2.toUpperCase();
          });
        },
        length(value) {
          if (Twig.lib.is("Array", value) || typeof value === "string") {
            return value.length;
          }
          if (Twig.lib.is("Object", value)) {
            if (value._keys === void 0) {
              return Object.keys(value).length;
            }
            return value._keys.length;
          }
          return 0;
        },
        // Array/Object Filters
        reverse(value) {
          if (is("Array", value)) {
            return value.reverse();
          }
          if (is("String", value)) {
            return value.split("").reverse().join("");
          }
          if (is("Object", value)) {
            const keys = value._keys || Object.keys(value).reverse();
            value._keys = keys;
            return value;
          }
        },
        sort(value) {
          if (is("Array", value)) {
            return value.sort();
          }
          if (is("Object", value)) {
            delete value._keys;
            const keys = Object.keys(value);
            const sortedKeys = keys.sort((a, b) => {
              let a1;
              let b1;
              if (value[a] > value[b] === !(value[a] <= value[b])) {
                return value[a] > value[b] ? 1 : value[a] < value[b] ? -1 : 0;
              }
              if (!isNaN(a1 = parseFloat(value[a])) && !isNaN(b1 = parseFloat(value[b]))) {
                return a1 > b1 ? 1 : a1 < b1 ? -1 : 0;
              }
              if (typeof value[a] === "string") {
                return value[a] > value[b].toString() ? 1 : value[a] < value[b].toString() ? -1 : 0;
              }
              if (typeof value[b] === "string") {
                return value[a].toString() > value[b] ? 1 : value[a].toString() < value[b] ? -1 : 0;
              }
              return null;
            });
            value._keys = sortedKeys;
            return value;
          }
        },
        keys(value) {
          if (value === void 0 || value === null) {
            return;
          }
          const keyset = value._keys || Object.keys(value);
          const output = [];
          keyset.forEach((key) => {
            if (key === "_keys") {
              return;
            }
            if (Object.hasOwnProperty.call(value, key)) {
              output.push(key);
            }
          });
          return output;
        },
        /* eslint-disable-next-line camelcase */
        url_encode(value) {
          if (value === void 0 || value === null) {
            return;
          }
          if (Twig.lib.is("Object", value)) {
            const serialize = /* @__PURE__ */ __name(function(obj, prefix) {
              const result2 = [];
              const keyset = obj._keys || Object.keys(obj);
              keyset.forEach((key) => {
                if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                  return;
                }
                const resultKey = prefix ? prefix + "[" + key + "]" : key;
                const resultValue = obj[key];
                result2.push(
                  Twig.lib.is("Object", resultValue) || Array.isArray(resultValue) ? serialize(resultValue, resultKey) : encodeURIComponent(resultKey) + "=" + encodeURIComponent(resultValue)
                );
              });
              return result2.join("&amp;");
            }, "serialize");
            return serialize(value);
          }
          let result = encodeURIComponent(value);
          result = result.replace("'", "%27");
          return result;
        },
        join(value, params) {
          if (value === void 0 || value === null) {
            return;
          }
          let joinStr = "";
          let output = [];
          let keyset = null;
          if (params && params[0]) {
            joinStr = params[0];
          }
          if (is("Array", value)) {
            output = value;
          } else {
            keyset = value._keys || Object.keys(value);
            keyset.forEach((key) => {
              if (key === "_keys") {
                return;
              }
              if (Object.hasOwnProperty.call(value, key)) {
                output.push(value[key]);
              }
            });
          }
          return output.join(joinStr);
        },
        default(value, params) {
          if (params !== void 0 && params.length > 1) {
            throw new Twig.Error("default filter expects one argument");
          }
          if (value === void 0 || value === null || value === "") {
            if (params === void 0) {
              return "";
            }
            return params[0];
          }
          return value;
        },
        /* eslint-disable-next-line camelcase */
        json_encode(value) {
          if (value === void 0 || value === null) {
            return "null";
          }
          if (typeof value === "object" && is("Array", value)) {
            const output = [];
            value.forEach((v) => {
              output.push(Twig.filters.json_encode(v));
            });
            return "[" + output.join(",") + "]";
          }
          if (typeof value === "object" && is("Date", value)) {
            return '"' + value.toISOString() + '"';
          }
          if (typeof value === "object") {
            const keyset = value._keys || Object.keys(value);
            const output = [];
            keyset.forEach((key) => {
              output.push(JSON.stringify(key) + ":" + Twig.filters.json_encode(value[key]));
            });
            return "{" + output.join(",") + "}";
          }
          return JSON.stringify(value);
        },
        merge(value, params) {
          let obj = [];
          let arrIndex = 0;
          let keyset = [];
          if (is("Array", value)) {
            params.forEach((param) => {
              if (!is("Array", param)) {
                obj = {};
              }
            });
          } else {
            obj = {};
          }
          if (!is("Array", obj)) {
            obj._keys = [];
          }
          if (is("Array", value)) {
            value.forEach((val) => {
              if (obj._keys) {
                obj._keys.push(arrIndex);
              }
              obj[arrIndex] = val;
              arrIndex++;
            });
          } else {
            keyset = value._keys || Object.keys(value);
            keyset.forEach((key) => {
              obj[key] = value[key];
              obj._keys.push(key);
              const intKey = parseInt(key, 10);
              if (!isNaN(intKey) && intKey >= arrIndex) {
                arrIndex = intKey + 1;
              }
            });
          }
          params.forEach((param) => {
            if (is("Array", param)) {
              param.forEach((val) => {
                if (obj._keys) {
                  obj._keys.push(arrIndex);
                }
                obj[arrIndex] = val;
                arrIndex++;
              });
            } else {
              keyset = param._keys || Object.keys(param);
              keyset.forEach((key) => {
                if (!obj[key]) {
                  obj._keys.push(key);
                }
                obj[key] = param[key];
                const intKey = parseInt(key, 10);
                if (!isNaN(intKey) && intKey >= arrIndex) {
                  arrIndex = intKey + 1;
                }
              });
            }
          });
          if (params.length === 0) {
            throw new Twig.Error("Filter merge expects at least one parameter");
          }
          return obj;
        },
        date(value, params) {
          const date = Twig.functions.date(value);
          const format = params && Boolean(params.length) ? params[0] : "F j, Y H:i";
          return Twig.lib.date(format.replace(/\\\\/g, "\\"), date);
        },
        /* eslint-disable-next-line camelcase */
        date_modify(value, params) {
          if (value === void 0 || value === null) {
            return;
          }
          if (params === void 0 || params.length !== 1) {
            throw new Twig.Error("date_modify filter expects 1 argument");
          }
          const modifyText = params[0];
          let time;
          if (Twig.lib.is("Date", value)) {
            time = Twig.lib.strtotime(modifyText, value.getTime() / 1e3);
          }
          if (Twig.lib.is("String", value)) {
            time = Twig.lib.strtotime(modifyText, Twig.lib.strtotime(value));
          }
          if (Twig.lib.is("Number", value)) {
            time = Twig.lib.strtotime(modifyText, value);
          }
          return new Date(time * 1e3);
        },
        replace(value, params) {
          if (value === void 0 || value === null) {
            return;
          }
          const pairs = params[0];
          let tag;
          for (tag in pairs) {
            if (Object.hasOwnProperty.call(pairs, tag) && tag !== "_keys") {
              value = Twig.lib.replaceAll(value, tag, pairs[tag]);
            }
          }
          return value;
        },
        format(value, params) {
          if (value === void 0 || value === null) {
            return;
          }
          return Twig.lib.vsprintf(value, params);
        },
        striptags(value, allowed) {
          if (value === void 0 || value === null) {
            return;
          }
          return Twig.lib.stripTags(value, allowed);
        },
        escape(value, params) {
          if (value === void 0 || value === null || value === "") {
            return;
          }
          let strategy = "html";
          if (params && Boolean(params.length) && params[0] !== true) {
            strategy = params[0];
          }
          if (strategy === "html") {
            const rawValue = value.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
            return new Twig.Markup(rawValue, "html");
          }
          if (strategy === "js") {
            const rawValue = value.toString();
            let result = "";
            for (let i = 0; i < rawValue.length; i++) {
              if (rawValue[i].match(/^[a-zA-Z0-9,._]$/)) {
                result += rawValue[i];
              } else {
                const char = rawValue.charAt(i);
                const charCode = rawValue.charCodeAt(i);
                const shortMap = {
                  "\\": "\\\\",
                  "/": "\\/",
                  "\b": "\\b",
                  "\f": "\\f",
                  "\n": "\\n",
                  "\r": "\\r",
                  "	": "\\t"
                };
                if (shortMap[char]) {
                  result += shortMap[char];
                } else {
                  result += Twig.lib.sprintf("\\u%04s", charCode.toString(16).toUpperCase());
                }
              }
            }
            return new Twig.Markup(result, "js");
          }
          if (strategy === "css") {
            const rawValue = value.toString();
            let result = "";
            for (let i = 0; i < rawValue.length; i++) {
              if (rawValue[i].match(/^[a-zA-Z0-9]$/)) {
                result += rawValue[i];
              } else {
                const charCode = rawValue.charCodeAt(i);
                result += "\\" + charCode.toString(16).toUpperCase() + " ";
              }
            }
            return new Twig.Markup(result, "css");
          }
          if (strategy === "url") {
            const result = Twig.filters.url_encode(value);
            return new Twig.Markup(result, "url");
          }
          if (strategy === "html_attr") {
            const rawValue = value.toString();
            let result = "";
            for (let i = 0; i < rawValue.length; i++) {
              if (rawValue[i].match(/^[a-zA-Z0-9,.\-_]$/)) {
                result += rawValue[i];
              } else if (rawValue[i].match(/^[&<>"]$/)) {
                result += rawValue[i].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
              } else {
                const charCode = rawValue.charCodeAt(i);
                if (charCode <= 31 && charCode !== 9 && charCode !== 10 && charCode !== 13) {
                  result += "&#xFFFD;";
                } else if (charCode < 128) {
                  result += Twig.lib.sprintf("&#x%02s;", charCode.toString(16).toUpperCase());
                } else {
                  result += Twig.lib.sprintf("&#x%04s;", charCode.toString(16).toUpperCase());
                }
              }
            }
            return new Twig.Markup(result, "html_attr");
          }
          throw new Twig.Error("escape strategy unsupported");
        },
        /* Alias of escape */
        e(value, params) {
          return Twig.filters.escape(value, params);
        },
        nl2br(value) {
          if (value === void 0 || value === null || value === "") {
            return;
          }
          const linebreakTag = "BACKSLASH_n_replace";
          const br = "<br />" + linebreakTag;
          value = Twig.filters.escape(value).replace(/\r\n/g, br).replace(/\r/g, br).replace(/\n/g, br);
          value = Twig.lib.replaceAll(value, linebreakTag, "\n");
          return new Twig.Markup(value);
        },
        /**
         * Adapted from: http://phpjs.org/functions/number_format:481
         */
        /* eslint-disable-next-line camelcase */
        number_format(value, params) {
          let number = value;
          const decimals = params && params[0] ? params[0] : void 0;
          const dec = params && params[1] !== void 0 ? params[1] : ".";
          const sep = params && params[2] !== void 0 ? params[2] : ",";
          number = String(number).replace(/[^0-9+\-Ee.]/g, "");
          const n = isFinite(Number(number)) ? Number(number) : 0;
          const prec = isFinite(Number(decimals)) ? Math.abs(decimals) : 0;
          let s = "";
          const toFixedFix = /* @__PURE__ */ __name(function(n2, prec2) {
            const k = 10 ** prec2;
            return String(Math.round(n2 * k) / k);
          }, "toFixedFix");
          s = (prec ? toFixedFix(n, prec) : String(Math.round(n))).split(".");
          if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
          }
          if ((s[1] || "").length < prec) {
            s[1] = s[1] || "";
            s[1] += new Array(prec - s[1].length + 1).join("0");
          }
          return s.join(dec);
        },
        trim(value, params) {
          if (value === void 0 || value === null) {
            return;
          }
          let str = String(value);
          let whitespace;
          if (params && params[0]) {
            whitespace = String(params[0]);
          } else {
            whitespace = " \n\r	\f\v\xA0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u2028\u2029\u3000";
          }
          for (let i = 0; i < str.length; i++) {
            if (!whitespace.includes(str.charAt(i))) {
              str = str.slice(Math.max(0, i));
              break;
            }
          }
          for (let i = str.length - 1; i >= 0; i--) {
            if (!whitespace.includes(str.charAt(i))) {
              str = str.slice(0, Math.max(0, i + 1));
              break;
            }
          }
          return whitespace.includes(str.charAt(0)) ? "" : str;
        },
        truncate(value, params) {
          let length = 30;
          let preserve = false;
          let separator = "...";
          value = String(value);
          if (params) {
            if (params[0]) {
              length = params[0];
            }
            if (params[1]) {
              preserve = params[1];
            }
            if (params[2]) {
              separator = params[2];
            }
          }
          if (value.length > length) {
            if (preserve) {
              length = value.indexOf(" ", length);
              if (length === -1) {
                return value;
              }
            }
            value = value.slice(0, length) + separator;
          }
          return value;
        },
        slice(value, params) {
          if (value === void 0 || value === null) {
            return;
          }
          if (params === void 0 || params.length === 0) {
            throw new Twig.Error("slice filter expects at least 1 argument");
          }
          const start = params[0] || 0;
          let length = params.length > 1 ? params[1] : value.length;
          const startIndex = start >= 0 ? start : Math.max(value.length + start, 0);
          if (length < 0) {
            length = value.length - startIndex + length;
          }
          if (Twig.lib.is("Array", value)) {
            const output = [];
            for (let i = startIndex; i < startIndex + length && i < value.length; i++) {
              output.push(value[i]);
            }
            return output;
          }
          if (Twig.lib.is("String", value)) {
            return value.slice(startIndex, startIndex + length);
          }
          throw new Twig.Error("slice filter expects value to be an array or string");
        },
        abs(value) {
          if (value === void 0 || value === null) {
            return;
          }
          return Math.abs(value);
        },
        first(value) {
          if (is("Array", value)) {
            return value[0];
          }
          if (is("Object", value)) {
            if ("_keys" in value) {
              return value[value._keys[0]];
            }
          } else if (typeof value === "string") {
            return value.slice(0, 1);
          }
        },
        split(value, params) {
          if (value === void 0 || value === null) {
            return;
          }
          if (params === void 0 || params.length === 0 || params.length > 2) {
            throw new Twig.Error("split filter expects 1 or 2 argument");
          }
          if (Twig.lib.is("String", value)) {
            const delimiter = params[0];
            const limit = params[1];
            const split = value.split(delimiter);
            if (limit === void 0) {
              return split;
            }
            if (limit < 0) {
              return value.split(delimiter, split.length + limit);
            }
            const limitedSplit = [];
            if (delimiter === "") {
              while (split.length > 0) {
                let temp = "";
                for (let i = 0; i < limit && split.length > 0; i++) {
                  temp += split.shift();
                }
                limitedSplit.push(temp);
              }
            } else {
              for (let i = 0; i < limit - 1 && split.length > 0; i++) {
                limitedSplit.push(split.shift());
              }
              if (split.length > 0) {
                limitedSplit.push(split.join(delimiter));
              }
            }
            return limitedSplit;
          }
          throw new Twig.Error("split filter expects value to be a string");
        },
        last(value) {
          if (Twig.lib.is("Object", value)) {
            let keys;
            if (value._keys === void 0) {
              keys = Object.keys(value);
            } else {
              keys = value._keys;
            }
            return value[keys[keys.length - 1]];
          }
          if (Twig.lib.is("Number", value)) {
            return value.toString().slice(-1);
          }
          return value[value.length - 1];
        },
        raw(value) {
          return new Twig.Markup(value || "");
        },
        batch(items, params) {
          let size = params.shift();
          const fill = params.shift();
          let last;
          let missing;
          if (!Twig.lib.is("Array", items)) {
            throw new Twig.Error("batch filter expects items to be an array");
          }
          if (!Twig.lib.is("Number", size)) {
            throw new Twig.Error("batch filter expects size to be a number");
          }
          size = Math.ceil(size);
          const result = Twig.lib.chunkArray(items, size);
          if (fill && items.length % size !== 0) {
            last = result.pop();
            missing = size - last.length;
            while (missing--) {
              last.push(fill);
            }
            result.push(last);
          }
          return result;
        },
        round(value, params) {
          params = params || [];
          const precision = params.length > 0 ? params[0] : 0;
          const method = params.length > 1 ? params[1] : "common";
          value = parseFloat(value);
          if (precision && !Twig.lib.is("Number", precision)) {
            throw new Twig.Error("round filter expects precision to be a number");
          }
          if (method === "common") {
            return Twig.lib.round(value, precision);
          }
          if (!Twig.lib.is("Function", Math[method])) {
            throw new Twig.Error("round filter expects method to be 'floor', 'ceil', or 'common'");
          }
          return Math[method](value * 10 ** precision) / 10 ** precision;
        },
        spaceless(value) {
          return value.replace(/>\s+</g, "><").trim();
        }
      };
      Twig.filter = function(filter, value, params) {
        const state = this;
        if (!Twig.filters[filter]) {
          throw new Twig.Error("Unable to find filter " + filter);
        }
        return Twig.filters[filter].call(state, value, params);
      };
      Twig.filter.extend = function(filter, definition) {
        Twig.filters[filter] = definition;
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.functions.js
var require_twig_functions = __commonJS({
  "../node_modules/twig/src/twig.functions.js"(exports, module) {
    module.exports = function(Twig) {
      const TEMPLATE_NOT_FOUND_MESSAGE = 'Template "{name}" is not defined.';
      Twig.functions = {
        //  Attribute, block, constant, date, dump, parent, random,.
        // Range function from http://phpjs.org/functions/range:499
        // Used under an MIT License
        range(low, high, step) {
          const matrix = [];
          let inival;
          let endval;
          const walker = step || 1;
          let chars = false;
          if (!isNaN(low) && !isNaN(high)) {
            inival = parseInt(low, 10);
            endval = parseInt(high, 10);
          } else if (isNaN(low) && isNaN(high)) {
            chars = true;
            inival = low.charCodeAt(0);
            endval = high.charCodeAt(0);
          } else {
            inival = isNaN(low) ? 0 : low;
            endval = isNaN(high) ? 0 : high;
          }
          const plus = !(inival > endval);
          if (plus) {
            while (inival <= endval) {
              matrix.push(chars ? String.fromCharCode(inival) : inival);
              inival += walker;
            }
          } else {
            while (inival >= endval) {
              matrix.push(chars ? String.fromCharCode(inival) : inival);
              inival -= walker;
            }
          }
          return matrix;
        },
        cycle(arr, i) {
          const pos = i % arr.length;
          return arr[pos];
        },
        dump(...args) {
          const argsCopy = [...args];
          const state = this;
          const EOL = "\n";
          const indentChar = "  ";
          let indentTimes = 0;
          let out = "";
          const indent = /* @__PURE__ */ __name(function(times) {
            let ind = "";
            while (times > 0) {
              times--;
              ind += indentChar;
            }
            return ind;
          }, "indent");
          const displayVar = /* @__PURE__ */ __name(function(variable) {
            out += indent(indentTimes);
            if (typeof variable === "object") {
              dumpVar(variable);
            } else if (typeof variable === "function") {
              out += "function()" + EOL;
            } else if (typeof variable === "string") {
              out += "string(" + variable.length + ') "' + variable + '"' + EOL;
            } else if (typeof variable === "number") {
              out += "number(" + variable + ")" + EOL;
            } else if (typeof variable === "boolean") {
              out += "bool(" + variable + ")" + EOL;
            }
          }, "displayVar");
          const dumpVar = /* @__PURE__ */ __name(function(variable) {
            let i;
            if (variable === null) {
              out += "NULL" + EOL;
            } else if (variable === void 0) {
              out += "undefined" + EOL;
            } else if (typeof variable === "object") {
              out += indent(indentTimes) + typeof variable;
              indentTimes++;
              out += "(" + function(obj) {
                let size = 0;
                let key;
                for (key in obj) {
                  if (Object.hasOwnProperty.call(obj, key)) {
                    size++;
                  }
                }
                return size;
              }(variable) + ") {" + EOL;
              for (i in variable) {
                if (Object.hasOwnProperty.call(variable, i)) {
                  out += indent(indentTimes) + "[" + i + "]=> " + EOL;
                  displayVar(variable[i]);
                }
              }
              indentTimes--;
              out += indent(indentTimes) + "}" + EOL;
            } else {
              displayVar(variable);
            }
          }, "dumpVar");
          if (argsCopy.length === 0) {
            argsCopy.push(state.context);
          }
          argsCopy.forEach((variable) => {
            dumpVar(variable);
          });
          return out;
        },
        date(date) {
          let dateObj;
          if (date === void 0 || date === null || date === "") {
            dateObj = /* @__PURE__ */ new Date();
          } else if (Twig.lib.is("Date", date)) {
            dateObj = date;
          } else if (Twig.lib.is("String", date)) {
            if (date.match(/^\d+$/)) {
              dateObj = new Date(date * 1e3);
            } else {
              dateObj = new Date(Twig.lib.strtotime(date) * 1e3);
            }
          } else if (Twig.lib.is("Number", date)) {
            dateObj = new Date(date * 1e3);
          } else {
            throw new Twig.Error("Unable to parse date " + date);
          }
          return dateObj;
        },
        block(blockName) {
          const state = this;
          const block = state.getBlock(blockName);
          if (block !== void 0) {
            return block.render(state, state.context);
          }
        },
        parent() {
          const state = this;
          return state.getBlock(state.getNestingStackToken(Twig.logic.type.block).blockName, true).render(state, state.context);
        },
        attribute(object, method, params) {
          if (Twig.lib.is("Object", object)) {
            if (Object.hasOwnProperty.call(object, method)) {
              if (typeof object[method] === "function") {
                return object[method].apply(void 0, params);
              }
              return object[method];
            }
          }
          return object ? object[method] || void 0 : void 0;
        },
        max(values, ...args) {
          if (Twig.lib.is("Object", values)) {
            delete values._keys;
            return Twig.lib.max(values);
          }
          return Reflect.apply(Twig.lib.max, null, [values, ...args]);
        },
        min(values, ...args) {
          if (Twig.lib.is("Object", values)) {
            delete values._keys;
            return Twig.lib.min(values);
          }
          return Reflect.apply(Twig.lib.min, null, [values, ...args]);
        },
        /* eslint-disable-next-line camelcase */
        template_from_string(template) {
          const state = this;
          if (template === void 0) {
            template = "";
          }
          return Twig.Templates.parsers.twig({
            options: state.template.options,
            data: template
          });
        },
        random(value) {
          const LIMIT_INT31 = 2147483648;
          function getRandomNumber(n) {
            const random = Math.floor(Math.random() * LIMIT_INT31);
            const min = Math.min.call(null, 0, n);
            const max = Math.max.call(null, 0, n);
            return min + Math.floor((max - min + 1) * random / LIMIT_INT31);
          }
          __name(getRandomNumber, "getRandomNumber");
          if (Twig.lib.is("Number", value)) {
            return getRandomNumber(value);
          }
          if (Twig.lib.is("String", value)) {
            return value.charAt(getRandomNumber(value.length - 1));
          }
          if (Twig.lib.is("Array", value)) {
            return value[getRandomNumber(value.length - 1)];
          }
          if (Twig.lib.is("Object", value)) {
            const keys = Object.keys(value);
            return value[keys[getRandomNumber(keys.length - 1)]];
          }
          return getRandomNumber(LIMIT_INT31 - 1);
        },
        /**
         * Returns the content of a template without rendering it
         * @param {string} name
         * @param {boolean} [ignoreMissing=false]
         * @returns {string}
         */
        source(name, ignoreMissing) {
          const state = this;
          const { namespaces } = state.template.options;
          let templateSource;
          let templateFound = false;
          const isNodeEnvironment = typeof module !== "undefined" && typeof module.exports !== "undefined" && typeof window === "undefined";
          let loader;
          let path2 = name;
          if (namespaces && typeof namespaces === "object") {
            path2 = Twig.path.expandNamespace(namespaces, path2);
          }
          if (isNodeEnvironment) {
            loader = "fs";
          } else {
            loader = "ajax";
          }
          const params = {
            id: name,
            path: path2,
            method: loader,
            parser: "source",
            async: false,
            fetchTemplateSource: true
          };
          if (typeof ignoreMissing === "undefined") {
            ignoreMissing = false;
          }
          try {
            templateSource = Twig.Templates.loadRemote(name, params);
            if (typeof templateSource === "undefined" || templateSource === null) {
              templateSource = "";
            } else {
              templateFound = true;
            }
          } catch (error) {
            Twig.log.debug("Twig.functions.source: ", "Problem loading template  ", error);
          }
          if (!templateFound && !ignoreMissing) {
            return TEMPLATE_NOT_FOUND_MESSAGE.replace("{name}", name);
          }
          return templateSource;
        }
      };
      Twig._function = function(_function, value, params) {
        if (!Twig.functions[_function]) {
          throw new Twig.Error("Unable to find function " + _function);
        }
        return Twig.functions[_function](value, params);
      };
      Twig._function.extend = function(_function, definition) {
        Twig.functions[_function] = definition;
      };
      return Twig;
    };
  }
});

// ../node_modules/locutus/php/strings/sprintf.js
var require_sprintf = __commonJS({
  "../node_modules/locutus/php/strings/sprintf.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ __name(function sprintf() {
      var regex = /%%|%(?:(\d+)\$)?((?:[-+#0 ]|'[\s\S])*)(\d+)?(?:\.(\d*))?([\s\S])/g;
      var args = arguments;
      var i = 0;
      var format = args[i++];
      var _pad = /* @__PURE__ */ __name(function _pad2(str, len, chr, leftJustify) {
        if (!chr) {
          chr = " ";
        }
        var padding = str.length >= len ? "" : new Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
      }, "_pad");
      var justify = /* @__PURE__ */ __name(function justify2(value, prefix, leftJustify, minWidth, padChar) {
        var diff = minWidth - value.length;
        if (diff > 0) {
          if (!leftJustify && padChar === "0") {
            value = [value.slice(0, prefix.length), _pad("", diff, "0", true), value.slice(prefix.length)].join("");
          } else {
            value = _pad(value, minWidth, padChar, leftJustify);
          }
        }
        return value;
      }, "justify");
      var _formatBaseX = /* @__PURE__ */ __name(function _formatBaseX2(value, base, leftJustify, minWidth, precision, padChar) {
        var number = value >>> 0;
        value = _pad(number.toString(base), precision || 0, "0", false);
        return justify(value, "", leftJustify, minWidth, padChar);
      }, "_formatBaseX");
      var _formatString = /* @__PURE__ */ __name(function _formatString2(value, leftJustify, minWidth, precision, customPadChar) {
        if (precision !== null && precision !== void 0) {
          value = value.slice(0, precision);
        }
        return justify(value, "", leftJustify, minWidth, customPadChar);
      }, "_formatString");
      var doFormat = /* @__PURE__ */ __name(function doFormat2(substring, argIndex, modifiers, minWidth, precision, specifier) {
        var number = void 0, prefix = void 0, method = void 0, textTransform = void 0, value = void 0;
        if (substring === "%%") {
          return "%";
        }
        var padChar = " ";
        var leftJustify = false;
        var positiveNumberPrefix = "";
        var j = void 0, l = void 0;
        for (j = 0, l = modifiers.length; j < l; j++) {
          switch (modifiers.charAt(j)) {
            case " ":
            case "0":
              padChar = modifiers.charAt(j);
              break;
            case "+":
              positiveNumberPrefix = "+";
              break;
            case "-":
              leftJustify = true;
              break;
            case "'":
              if (j + 1 < l) {
                padChar = modifiers.charAt(j + 1);
                j++;
              }
              break;
          }
        }
        if (!minWidth) {
          minWidth = 0;
        } else {
          minWidth = +minWidth;
        }
        if (!isFinite(minWidth)) {
          throw new Error("Width must be finite");
        }
        if (!precision) {
          precision = specifier === "d" ? 0 : "fFeE".indexOf(specifier) > -1 ? 6 : void 0;
        } else {
          precision = +precision;
        }
        if (argIndex && +argIndex === 0) {
          throw new Error("Argument number must be greater than zero");
        }
        if (argIndex && +argIndex >= args.length) {
          throw new Error("Too few arguments");
        }
        value = argIndex ? args[+argIndex] : args[i++];
        switch (specifier) {
          case "%":
            return "%";
          case "s":
            return _formatString(value + "", leftJustify, minWidth, precision, padChar);
          case "c":
            return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, padChar);
          case "b":
            return _formatBaseX(value, 2, leftJustify, minWidth, precision, padChar);
          case "o":
            return _formatBaseX(value, 8, leftJustify, minWidth, precision, padChar);
          case "x":
            return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar);
          case "X":
            return _formatBaseX(value, 16, leftJustify, minWidth, precision, padChar).toUpperCase();
          case "u":
            return _formatBaseX(value, 10, leftJustify, minWidth, precision, padChar);
          case "i":
          case "d":
            number = +value || 0;
            number = Math.round(number - number % 1);
            prefix = number < 0 ? "-" : positiveNumberPrefix;
            value = prefix + _pad(String(Math.abs(number)), precision, "0", false);
            if (leftJustify && padChar === "0") {
              padChar = " ";
            }
            return justify(value, prefix, leftJustify, minWidth, padChar);
          case "e":
          case "E":
          case "f":
          // @todo: Should handle locales (as per setlocale)
          case "F":
          case "g":
          case "G":
            number = +value;
            prefix = number < 0 ? "-" : positiveNumberPrefix;
            method = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(specifier.toLowerCase())];
            textTransform = ["toString", "toUpperCase"]["eEfFgG".indexOf(specifier) % 2];
            value = prefix + Math.abs(number)[method](precision);
            return justify(value, prefix, leftJustify, minWidth, padChar)[textTransform]();
          default:
            return "";
        }
      }, "doFormat");
      try {
        return format.replace(regex, doFormat);
      } catch (err) {
        return false;
      }
    }, "sprintf");
  }
});

// ../node_modules/locutus/php/strings/vsprintf.js
var require_vsprintf = __commonJS({
  "../node_modules/locutus/php/strings/vsprintf.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ __name(function vsprintf(format, args) {
      var sprintf = require_sprintf();
      return sprintf.apply(this, [format].concat(args));
    }, "vsprintf");
  }
});

// ../node_modules/locutus/php/_helpers/_php_cast_int.js
var require_php_cast_int = __commonJS({
  "../node_modules/locutus/php/_helpers/_php_cast_int.js"(exports, module) {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    module.exports = /* @__PURE__ */ __name(function _php_cast_int(value) {
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);
      switch (type) {
        case "number":
          if (isNaN(value) || !isFinite(value)) {
            return 0;
          }
          return value < 0 ? Math.ceil(value) : Math.floor(value);
        case "string":
          return parseInt(value, 10) || 0;
        case "boolean":
        // fall through
        default:
          return +!!value;
      }
    }, "_php_cast_int");
  }
});

// ../node_modules/locutus/php/_helpers/_php_cast_float.js
var require_php_cast_float = __commonJS({
  "../node_modules/locutus/php/_helpers/_php_cast_float.js"(exports, module) {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    module.exports = /* @__PURE__ */ __name(function _php_cast_float(value) {
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);
      switch (type) {
        case "number":
          return value;
        case "string":
          return parseFloat(value) || 0;
        case "boolean":
        // fall through
        default:
          return require_php_cast_int()(value);
      }
    }, "_php_cast_float");
  }
});

// ../node_modules/locutus/php/math/round.js
var require_round = __commonJS({
  "../node_modules/locutus/php/math/round.js"(exports, module) {
    "use strict";
    function roundToInt(value, mode) {
      var tmp = Math.floor(Math.abs(value) + 0.5);
      if (mode === "PHP_ROUND_HALF_DOWN" && value === tmp - 0.5 || mode === "PHP_ROUND_HALF_EVEN" && value === 0.5 + 2 * Math.floor(tmp / 2) || mode === "PHP_ROUND_HALF_ODD" && value === 0.5 + 2 * Math.floor(tmp / 2) - 1) {
        tmp -= 1;
      }
      return value < 0 ? -tmp : tmp;
    }
    __name(roundToInt, "roundToInt");
    module.exports = /* @__PURE__ */ __name(function round(value) {
      var precision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "PHP_ROUND_HALF_UP";
      var floatCast = require_php_cast_float();
      var intCast = require_php_cast_int();
      var p = void 0;
      value = floatCast(value);
      precision = intCast(precision);
      p = Math.pow(10, precision);
      if (isNaN(value) || !isFinite(value)) {
        return value;
      }
      if (Math.trunc(value) === value && precision >= 0) {
        return value;
      }
      var preRoundPrecision = 14 - Math.floor(Math.log10(Math.abs(value)));
      if (preRoundPrecision > precision && preRoundPrecision - 15 < precision) {
        value = roundToInt(value * Math.pow(10, preRoundPrecision), mode);
        value /= Math.pow(10, Math.abs(precision - preRoundPrecision));
      } else {
        value *= p;
      }
      value = roundToInt(value, mode);
      return value / p;
    }, "round");
  }
});

// ../node_modules/locutus/php/math/max.js
var require_max = __commonJS({
  "../node_modules/locutus/php/math/max.js"(exports, module) {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    module.exports = /* @__PURE__ */ __name(function max() {
      var ar = void 0;
      var retVal = void 0;
      var i = 0;
      var n = 0;
      var argv = arguments;
      var argc = argv.length;
      var _obj2Array = /* @__PURE__ */ __name(function _obj2Array2(obj) {
        if (Object.prototype.toString.call(obj) === "[object Array]") {
          return obj;
        } else {
          var _ar = [];
          for (var _i in obj) {
            if (obj.hasOwnProperty(_i)) {
              _ar.push(obj[_i]);
            }
          }
          return _ar;
        }
      }, "_obj2Array");
      var _compare = /* @__PURE__ */ __name(function _compare2(current, next) {
        var i2 = 0;
        var n2 = 0;
        var tmp = 0;
        var nl = 0;
        var cl = 0;
        if (current === next) {
          return 0;
        } else if ((typeof current === "undefined" ? "undefined" : _typeof(current)) === "object") {
          if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
            current = _obj2Array(current);
            next = _obj2Array(next);
            cl = current.length;
            nl = next.length;
            if (nl > cl) {
              return 1;
            } else if (nl < cl) {
              return -1;
            }
            for (i2 = 0, n2 = cl; i2 < n2; ++i2) {
              tmp = _compare2(current[i2], next[i2]);
              if (tmp === 1) {
                return 1;
              } else if (tmp === -1) {
                return -1;
              }
            }
            return 0;
          }
          return -1;
        } else if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
          return 1;
        } else if (isNaN(next) && !isNaN(current)) {
          if (current === 0) {
            return 0;
          }
          return current < 0 ? 1 : -1;
        } else if (isNaN(current) && !isNaN(next)) {
          if (next === 0) {
            return 0;
          }
          return next > 0 ? 1 : -1;
        }
        if (next === current) {
          return 0;
        }
        return next > current ? 1 : -1;
      }, "_compare");
      if (argc === 0) {
        throw new Error("At least one value should be passed to max()");
      } else if (argc === 1) {
        if (_typeof(argv[0]) === "object") {
          ar = _obj2Array(argv[0]);
        } else {
          throw new Error("Wrong parameter count for max()");
        }
        if (ar.length === 0) {
          throw new Error("Array must contain at least one element for max()");
        }
      } else {
        ar = argv;
      }
      retVal = ar[0];
      for (i = 1, n = ar.length; i < n; ++i) {
        if (_compare(retVal, ar[i]) === 1) {
          retVal = ar[i];
        }
      }
      return retVal;
    }, "max");
  }
});

// ../node_modules/locutus/php/math/min.js
var require_min = __commonJS({
  "../node_modules/locutus/php/math/min.js"(exports, module) {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    module.exports = /* @__PURE__ */ __name(function min() {
      var ar = void 0;
      var retVal = void 0;
      var i = 0;
      var n = 0;
      var argv = arguments;
      var argc = argv.length;
      var _obj2Array = /* @__PURE__ */ __name(function _obj2Array2(obj) {
        if (Object.prototype.toString.call(obj) === "[object Array]") {
          return obj;
        }
        var ar2 = [];
        for (var _i in obj) {
          if (obj.hasOwnProperty(_i)) {
            ar2.push(obj[_i]);
          }
        }
        return ar2;
      }, "_obj2Array");
      var _compare = /* @__PURE__ */ __name(function _compare2(current, next) {
        var i2 = 0;
        var n2 = 0;
        var tmp = 0;
        var nl = 0;
        var cl = 0;
        if (current === next) {
          return 0;
        } else if ((typeof current === "undefined" ? "undefined" : _typeof(current)) === "object") {
          if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
            current = _obj2Array(current);
            next = _obj2Array(next);
            cl = current.length;
            nl = next.length;
            if (nl > cl) {
              return 1;
            } else if (nl < cl) {
              return -1;
            }
            for (i2 = 0, n2 = cl; i2 < n2; ++i2) {
              tmp = _compare2(current[i2], next[i2]);
              if (tmp === 1) {
                return 1;
              } else if (tmp === -1) {
                return -1;
              }
            }
            return 0;
          }
          return -1;
        } else if ((typeof next === "undefined" ? "undefined" : _typeof(next)) === "object") {
          return 1;
        } else if (isNaN(next) && !isNaN(current)) {
          if (current === 0) {
            return 0;
          }
          return current < 0 ? 1 : -1;
        } else if (isNaN(current) && !isNaN(next)) {
          if (next === 0) {
            return 0;
          }
          return next > 0 ? 1 : -1;
        }
        if (next === current) {
          return 0;
        }
        return next > current ? 1 : -1;
      }, "_compare");
      if (argc === 0) {
        throw new Error("At least one value should be passed to min()");
      } else if (argc === 1) {
        if (_typeof(argv[0]) === "object") {
          ar = _obj2Array(argv[0]);
        } else {
          throw new Error("Wrong parameter count for min()");
        }
        if (ar.length === 0) {
          throw new Error("Array must contain at least one element for min()");
        }
      } else {
        ar = argv;
      }
      retVal = ar[0];
      for (i = 1, n = ar.length; i < n; ++i) {
        if (_compare(retVal, ar[i]) === -1) {
          retVal = ar[i];
        }
      }
      return retVal;
    }, "min");
  }
});

// ../node_modules/locutus/php/_helpers/_phpCastString.js
var require_phpCastString = __commonJS({
  "../node_modules/locutus/php/_helpers/_phpCastString.js"(exports, module) {
    "use strict";
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    module.exports = /* @__PURE__ */ __name(function _phpCastString(value) {
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);
      switch (type) {
        case "boolean":
          return value ? "1" : "";
        case "string":
          return value;
        case "number":
          if (isNaN(value)) {
            return "NAN";
          }
          if (!isFinite(value)) {
            return (value < 0 ? "-" : "") + "INF";
          }
          return value + "";
        case "undefined":
          return "";
        case "object":
          if (Array.isArray(value)) {
            return "Array";
          }
          if (value !== null) {
            return "Object";
          }
          return "";
        case "function":
        // fall through
        default:
          throw new Error("Unsupported value type");
      }
    }, "_phpCastString");
  }
});

// ../node_modules/locutus/php/strings/strip_tags.js
var require_strip_tags = __commonJS({
  "../node_modules/locutus/php/strings/strip_tags.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ __name(function strip_tags(input, allowed) {
      var _phpCastString = require_phpCastString();
      allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
      var tags = /<\/?([a-z0-9]*)\b[^>]*>?/gi;
      var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      var after = _phpCastString(input);
      after = after.substring(after.length - 1) === "<" ? after.substring(0, after.length - 1) : after;
      while (true) {
        var before = after;
        after = before.replace(commentsAndPhpTags, "").replace(tags, function($0, $1) {
          return allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : "";
        });
        if (before === after) {
          return after;
        }
      }
    }, "strip_tags");
  }
});

// ../node_modules/locutus/php/datetime/strtotime.js
var require_strtotime = __commonJS({
  "../node_modules/locutus/php/datetime/strtotime.js"(exports, module) {
    "use strict";
    var reSpace = "[ \\t]+";
    var reSpaceOpt = "[ \\t]*";
    var reMeridian = "(?:([ap])\\.?m\\.?([\\t ]|$))";
    var reHour24 = "(2[0-4]|[01]?[0-9])";
    var reHour24lz = "([01][0-9]|2[0-4])";
    var reHour12 = "(0?[1-9]|1[0-2])";
    var reMinute = "([0-5]?[0-9])";
    var reMinutelz = "([0-5][0-9])";
    var reSecond = "(60|[0-5]?[0-9])";
    var reSecondlz = "(60|[0-5][0-9])";
    var reFrac = "(?:\\.([0-9]+))";
    var reDayfull = "sunday|monday|tuesday|wednesday|thursday|friday|saturday";
    var reDayabbr = "sun|mon|tue|wed|thu|fri|sat";
    var reDaytext = reDayfull + "|" + reDayabbr + "|weekdays?";
    var reReltextnumber = "first|second|third|fourth|fifth|sixth|seventh|eighth?|ninth|tenth|eleventh|twelfth";
    var reReltexttext = "next|last|previous|this";
    var reReltextunit = "(?:second|sec|minute|min|hour|day|fortnight|forthnight|month|year)s?|weeks|" + reDaytext;
    var reYear = "([0-9]{1,4})";
    var reYear2 = "([0-9]{2})";
    var reYear4 = "([0-9]{4})";
    var reYear4withSign = "([+-]?[0-9]{4})";
    var reMonth = "(1[0-2]|0?[0-9])";
    var reMonthlz = "(0[0-9]|1[0-2])";
    var reDay = "(?:(3[01]|[0-2]?[0-9])(?:st|nd|rd|th)?)";
    var reDaylz = "(0[0-9]|[1-2][0-9]|3[01])";
    var reMonthFull = "january|february|march|april|may|june|july|august|september|october|november|december";
    var reMonthAbbr = "jan|feb|mar|apr|may|jun|jul|aug|sept?|oct|nov|dec";
    var reMonthroman = "i[vx]|vi{0,3}|xi{0,2}|i{1,3}";
    var reMonthText = "(" + reMonthFull + "|" + reMonthAbbr + "|" + reMonthroman + ")";
    var reTzCorrection = "((?:GMT)?([+-])" + reHour24 + ":?" + reMinute + "?)";
    var reTzAbbr = "\\(?([a-zA-Z]{1,6})\\)?";
    var reDayOfYear = "(00[1-9]|0[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6])";
    var reWeekOfYear = "(0[1-9]|[1-4][0-9]|5[0-3])";
    var reDateNoYear = reMonthText + "[ .\\t-]*" + reDay + "[,.stndrh\\t ]*";
    function processMeridian(hour, meridian) {
      meridian = meridian && meridian.toLowerCase();
      switch (meridian) {
        case "a":
          hour += hour === 12 ? -12 : 0;
          break;
        case "p":
          hour += hour !== 12 ? 12 : 0;
          break;
      }
      return hour;
    }
    __name(processMeridian, "processMeridian");
    function processYear(yearStr) {
      var year = +yearStr;
      if (yearStr.length < 4 && year < 100) {
        year += year < 70 ? 2e3 : 1900;
      }
      return year;
    }
    __name(processYear, "processYear");
    function lookupMonth(monthStr) {
      return {
        jan: 0,
        january: 0,
        i: 0,
        feb: 1,
        february: 1,
        ii: 1,
        mar: 2,
        march: 2,
        iii: 2,
        apr: 3,
        april: 3,
        iv: 3,
        may: 4,
        v: 4,
        jun: 5,
        june: 5,
        vi: 5,
        jul: 6,
        july: 6,
        vii: 6,
        aug: 7,
        august: 7,
        viii: 7,
        sep: 8,
        sept: 8,
        september: 8,
        ix: 8,
        oct: 9,
        october: 9,
        x: 9,
        nov: 10,
        november: 10,
        xi: 10,
        dec: 11,
        december: 11,
        xii: 11
      }[monthStr.toLowerCase()];
    }
    __name(lookupMonth, "lookupMonth");
    function lookupWeekday(dayStr) {
      var desiredSundayNumber = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var dayNumbers = {
        mon: 1,
        monday: 1,
        tue: 2,
        tuesday: 2,
        wed: 3,
        wednesday: 3,
        thu: 4,
        thursday: 4,
        fri: 5,
        friday: 5,
        sat: 6,
        saturday: 6,
        sun: 0,
        sunday: 0
      };
      return dayNumbers[dayStr.toLowerCase()] || desiredSundayNumber;
    }
    __name(lookupWeekday, "lookupWeekday");
    function lookupRelative(relText) {
      var relativeNumbers = {
        last: -1,
        previous: -1,
        this: 0,
        first: 1,
        next: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
        sixth: 6,
        seventh: 7,
        eight: 8,
        eighth: 8,
        ninth: 9,
        tenth: 10,
        eleventh: 11,
        twelfth: 12
      };
      var relativeBehavior = {
        this: 1
      };
      var relTextLower = relText.toLowerCase();
      return {
        amount: relativeNumbers[relTextLower],
        behavior: relativeBehavior[relTextLower] || 0
      };
    }
    __name(lookupRelative, "lookupRelative");
    function processTzCorrection(tzOffset, oldValue) {
      var reTzCorrectionLoose = /(?:GMT)?([+-])(\d+)(:?)(\d{0,2})/i;
      tzOffset = tzOffset && tzOffset.match(reTzCorrectionLoose);
      if (!tzOffset) {
        return oldValue;
      }
      var sign = tzOffset[1] === "-" ? -1 : 1;
      var hours = +tzOffset[2];
      var minutes = +tzOffset[4];
      if (!tzOffset[4] && !tzOffset[3]) {
        minutes = Math.floor(hours % 100);
        hours = Math.floor(hours / 100);
      }
      return sign * (hours * 60 + minutes) * 60;
    }
    __name(processTzCorrection, "processTzCorrection");
    var tzAbbrOffsets = {
      acdt: 37800,
      acst: 34200,
      addt: -7200,
      adt: -10800,
      aedt: 39600,
      aest: 36e3,
      ahdt: -32400,
      ahst: -36e3,
      akdt: -28800,
      akst: -32400,
      amt: -13840,
      apt: -10800,
      ast: -14400,
      awdt: 32400,
      awst: 28800,
      awt: -10800,
      bdst: 7200,
      bdt: -36e3,
      bmt: -14309,
      bst: 3600,
      cast: 34200,
      cat: 7200,
      cddt: -14400,
      cdt: -18e3,
      cemt: 10800,
      cest: 7200,
      cet: 3600,
      cmt: -15408,
      cpt: -18e3,
      cst: -21600,
      cwt: -18e3,
      chst: 36e3,
      dmt: -1521,
      eat: 10800,
      eddt: -10800,
      edt: -14400,
      eest: 10800,
      eet: 7200,
      emt: -26248,
      ept: -14400,
      est: -18e3,
      ewt: -14400,
      ffmt: -14660,
      fmt: -4056,
      gdt: 39600,
      gmt: 0,
      gst: 36e3,
      hdt: -34200,
      hkst: 32400,
      hkt: 28800,
      hmt: -19776,
      hpt: -34200,
      hst: -36e3,
      hwt: -34200,
      iddt: 14400,
      idt: 10800,
      imt: 25025,
      ist: 7200,
      jdt: 36e3,
      jmt: 8440,
      jst: 32400,
      kdt: 36e3,
      kmt: 5736,
      kst: 30600,
      lst: 9394,
      mddt: -18e3,
      mdst: 16279,
      mdt: -21600,
      mest: 7200,
      met: 3600,
      mmt: 9017,
      mpt: -21600,
      msd: 14400,
      msk: 10800,
      mst: -25200,
      mwt: -21600,
      nddt: -5400,
      ndt: -9052,
      npt: -9e3,
      nst: -12600,
      nwt: -9e3,
      nzdt: 46800,
      nzmt: 41400,
      nzst: 43200,
      pddt: -21600,
      pdt: -25200,
      pkst: 21600,
      pkt: 18e3,
      plmt: 25590,
      pmt: -13236,
      ppmt: -17340,
      ppt: -25200,
      pst: -28800,
      pwt: -25200,
      qmt: -18840,
      rmt: 5794,
      sast: 7200,
      sdmt: -16800,
      sjmt: -20173,
      smt: -13884,
      sst: -39600,
      tbmt: 10751,
      tmt: 12344,
      uct: 0,
      utc: 0,
      wast: 7200,
      wat: 3600,
      wemt: 7200,
      west: 3600,
      wet: 0,
      wib: 25200,
      wita: 28800,
      wit: 32400,
      wmt: 5040,
      yddt: -25200,
      ydt: -28800,
      ypt: -28800,
      yst: -32400,
      ywt: -28800,
      a: 3600,
      b: 7200,
      c: 10800,
      d: 14400,
      e: 18e3,
      f: 21600,
      g: 25200,
      h: 28800,
      i: 32400,
      k: 36e3,
      l: 39600,
      m: 43200,
      n: -3600,
      o: -7200,
      p: -10800,
      q: -14400,
      r: -18e3,
      s: -21600,
      t: -25200,
      u: -28800,
      v: -32400,
      w: -36e3,
      x: -39600,
      y: -43200,
      z: 0
    };
    var formats = {
      yesterday: {
        regex: /^yesterday/i,
        name: "yesterday",
        callback: /* @__PURE__ */ __name(function callback() {
          this.rd -= 1;
          return this.resetTime();
        }, "callback")
      },
      now: {
        regex: /^now/i,
        name: "now"
        // do nothing
      },
      noon: {
        regex: /^noon/i,
        name: "noon",
        callback: /* @__PURE__ */ __name(function callback() {
          return this.resetTime() && this.time(12, 0, 0, 0);
        }, "callback")
      },
      midnightOrToday: {
        regex: /^(midnight|today)/i,
        name: "midnight | today",
        callback: /* @__PURE__ */ __name(function callback() {
          return this.resetTime();
        }, "callback")
      },
      tomorrow: {
        regex: /^tomorrow/i,
        name: "tomorrow",
        callback: /* @__PURE__ */ __name(function callback() {
          this.rd += 1;
          return this.resetTime();
        }, "callback")
      },
      timestamp: {
        regex: /^@(-?\d+)/i,
        name: "timestamp",
        callback: /* @__PURE__ */ __name(function callback(match, timestamp) {
          this.rs += +timestamp;
          this.y = 1970;
          this.m = 0;
          this.d = 1;
          this.dates = 0;
          return this.resetTime() && this.zone(0);
        }, "callback")
      },
      firstOrLastDay: {
        regex: /^(first|last) day of/i,
        name: "firstdayof | lastdayof",
        callback: /* @__PURE__ */ __name(function callback(match, day) {
          if (day.toLowerCase() === "first") {
            this.firstOrLastDayOfMonth = 1;
          } else {
            this.firstOrLastDayOfMonth = -1;
          }
        }, "callback")
      },
      backOrFrontOf: {
        regex: RegExp("^(back|front) of " + reHour24 + reSpaceOpt + reMeridian + "?", "i"),
        name: "backof | frontof",
        callback: /* @__PURE__ */ __name(function callback(match, side, hours, meridian) {
          var back = side.toLowerCase() === "back";
          var hour = +hours;
          var minute = 15;
          if (!back) {
            hour -= 1;
            minute = 45;
          }
          hour = processMeridian(hour, meridian);
          return this.resetTime() && this.time(hour, minute, 0, 0);
        }, "callback")
      },
      weekdayOf: {
        regex: RegExp("^(" + reReltextnumber + "|" + reReltexttext + ")" + reSpace + "(" + reDayfull + "|" + reDayabbr + ")" + reSpace + "of", "i"),
        name: "weekdayof"
        // todo
      },
      mssqltime: {
        regex: RegExp("^" + reHour12 + ":" + reMinutelz + ":" + reSecondlz + "[:.]([0-9]+)" + reMeridian, "i"),
        name: "mssqltime",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute, second, frac, meridian) {
          return this.time(processMeridian(+hour, meridian), +minute, +second, +frac.substr(0, 3));
        }, "callback")
      },
      oracledate: {
        regex: /^(\d{2})-([A-Z]{3})-(\d{2})$/i,
        name: "d-M-y",
        callback: /* @__PURE__ */ __name(function callback(match, day, monthText, year) {
          var month = {
            JAN: 0,
            FEB: 1,
            MAR: 2,
            APR: 3,
            MAY: 4,
            JUN: 5,
            JUL: 6,
            AUG: 7,
            SEP: 8,
            OCT: 9,
            NOV: 10,
            DEC: 11
          }[monthText.toUpperCase()];
          return this.ymd(2e3 + parseInt(year, 10), month, parseInt(day, 10));
        }, "callback")
      },
      timeLong12: {
        regex: RegExp("^" + reHour12 + "[:.]" + reMinute + "[:.]" + reSecondlz + reSpaceOpt + reMeridian, "i"),
        name: "timelong12",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute, second, meridian) {
          return this.time(processMeridian(+hour, meridian), +minute, +second, 0);
        }, "callback")
      },
      timeShort12: {
        regex: RegExp("^" + reHour12 + "[:.]" + reMinutelz + reSpaceOpt + reMeridian, "i"),
        name: "timeshort12",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute, meridian) {
          return this.time(processMeridian(+hour, meridian), +minute, 0, 0);
        }, "callback")
      },
      timeTiny12: {
        regex: RegExp("^" + reHour12 + reSpaceOpt + reMeridian, "i"),
        name: "timetiny12",
        callback: /* @__PURE__ */ __name(function callback(match, hour, meridian) {
          return this.time(processMeridian(+hour, meridian), 0, 0, 0);
        }, "callback")
      },
      soap: {
        regex: RegExp("^" + reYear4 + "-" + reMonthlz + "-" + reDaylz + "T" + reHour24lz + ":" + reMinutelz + ":" + reSecondlz + reFrac + reTzCorrection + "?", "i"),
        name: "soap",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day, hour, minute, second, frac, tzCorrection) {
          return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, +frac.substr(0, 3)) && this.zone(processTzCorrection(tzCorrection));
        }, "callback")
      },
      wddx: {
        regex: RegExp("^" + reYear4 + "-" + reMonth + "-" + reDay + "T" + reHour24 + ":" + reMinute + ":" + reSecond),
        name: "wddx",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day, hour, minute, second) {
          return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }, "callback")
      },
      exif: {
        regex: RegExp("^" + reYear4 + ":" + reMonthlz + ":" + reDaylz + " " + reHour24lz + ":" + reMinutelz + ":" + reSecondlz, "i"),
        name: "exif",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day, hour, minute, second) {
          return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }, "callback")
      },
      xmlRpc: {
        regex: RegExp("^" + reYear4 + reMonthlz + reDaylz + "T" + reHour24 + ":" + reMinutelz + ":" + reSecondlz),
        name: "xmlrpc",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day, hour, minute, second) {
          return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }, "callback")
      },
      xmlRpcNoColon: {
        regex: RegExp("^" + reYear4 + reMonthlz + reDaylz + "[Tt]" + reHour24 + reMinutelz + reSecondlz),
        name: "xmlrpcnocolon",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day, hour, minute, second) {
          return this.ymd(+year, month - 1, +day) && this.time(+hour, +minute, +second, 0);
        }, "callback")
      },
      clf: {
        regex: RegExp("^" + reDay + "/(" + reMonthAbbr + ")/" + reYear4 + ":" + reHour24lz + ":" + reMinutelz + ":" + reSecondlz + reSpace + reTzCorrection, "i"),
        name: "clf",
        callback: /* @__PURE__ */ __name(function callback(match, day, month, year, hour, minute, second, tzCorrection) {
          return this.ymd(+year, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0) && this.zone(processTzCorrection(tzCorrection));
        }, "callback")
      },
      iso8601long: {
        regex: RegExp("^t?" + reHour24 + "[:.]" + reMinute + "[:.]" + reSecond + reFrac, "i"),
        name: "iso8601long",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute, second, frac) {
          return this.time(+hour, +minute, +second, +frac.substr(0, 3));
        }, "callback")
      },
      dateTextual: {
        regex: RegExp("^" + reMonthText + "[ .\\t-]*" + reDay + "[,.stndrh\\t ]+" + reYear, "i"),
        name: "datetextual",
        callback: /* @__PURE__ */ __name(function callback(match, month, day, year) {
          return this.ymd(processYear(year), lookupMonth(month), +day);
        }, "callback")
      },
      pointedDate4: {
        regex: RegExp("^" + reDay + "[.\\t-]" + reMonth + "[.-]" + reYear4),
        name: "pointeddate4",
        callback: /* @__PURE__ */ __name(function callback(match, day, month, year) {
          return this.ymd(+year, month - 1, +day);
        }, "callback")
      },
      pointedDate2: {
        regex: RegExp("^" + reDay + "[.\\t]" + reMonth + "\\." + reYear2),
        name: "pointeddate2",
        callback: /* @__PURE__ */ __name(function callback(match, day, month, year) {
          return this.ymd(processYear(year), month - 1, +day);
        }, "callback")
      },
      timeLong24: {
        regex: RegExp("^t?" + reHour24 + "[:.]" + reMinute + "[:.]" + reSecond),
        name: "timelong24",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute, second) {
          return this.time(+hour, +minute, +second, 0);
        }, "callback")
      },
      dateNoColon: {
        regex: RegExp("^" + reYear4 + reMonthlz + reDaylz),
        name: "datenocolon",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day) {
          return this.ymd(+year, month - 1, +day);
        }, "callback")
      },
      pgydotd: {
        regex: RegExp("^" + reYear4 + "\\.?" + reDayOfYear),
        name: "pgydotd",
        callback: /* @__PURE__ */ __name(function callback(match, year, day) {
          return this.ymd(+year, 0, +day);
        }, "callback")
      },
      timeShort24: {
        regex: RegExp("^t?" + reHour24 + "[:.]" + reMinute, "i"),
        name: "timeshort24",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute) {
          return this.time(+hour, +minute, 0, 0);
        }, "callback")
      },
      iso8601noColon: {
        regex: RegExp("^t?" + reHour24lz + reMinutelz + reSecondlz, "i"),
        name: "iso8601nocolon",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute, second) {
          return this.time(+hour, +minute, +second, 0);
        }, "callback")
      },
      iso8601dateSlash: {
        // eventhough the trailing slash is optional in PHP
        // here it's mandatory and inputs without the slash
        // are handled by dateslash
        regex: RegExp("^" + reYear4 + "/" + reMonthlz + "/" + reDaylz + "/"),
        name: "iso8601dateslash",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day) {
          return this.ymd(+year, month - 1, +day);
        }, "callback")
      },
      dateSlash: {
        regex: RegExp("^" + reYear4 + "/" + reMonth + "/" + reDay),
        name: "dateslash",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day) {
          return this.ymd(+year, month - 1, +day);
        }, "callback")
      },
      american: {
        regex: RegExp("^" + reMonth + "/" + reDay + "/" + reYear),
        name: "american",
        callback: /* @__PURE__ */ __name(function callback(match, month, day, year) {
          return this.ymd(processYear(year), month - 1, +day);
        }, "callback")
      },
      americanShort: {
        regex: RegExp("^" + reMonth + "/" + reDay),
        name: "americanshort",
        callback: /* @__PURE__ */ __name(function callback(match, month, day) {
          return this.ymd(this.y, month - 1, +day);
        }, "callback")
      },
      gnuDateShortOrIso8601date2: {
        // iso8601date2 is complete subset of gnudateshort
        regex: RegExp("^" + reYear + "-" + reMonth + "-" + reDay),
        name: "gnudateshort | iso8601date2",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day) {
          return this.ymd(processYear(year), month - 1, +day);
        }, "callback")
      },
      iso8601date4: {
        regex: RegExp("^" + reYear4withSign + "-" + reMonthlz + "-" + reDaylz),
        name: "iso8601date4",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day) {
          return this.ymd(+year, month - 1, +day);
        }, "callback")
      },
      gnuNoColon: {
        regex: RegExp("^t?" + reHour24lz + reMinutelz, "i"),
        name: "gnunocolon",
        callback: /* @__PURE__ */ __name(function callback(match, hour, minute) {
          switch (this.times) {
            case 0:
              return this.time(+hour, +minute, 0, this.f);
            case 1:
              this.y = hour * 100 + +minute;
              this.times++;
              return true;
            default:
              return false;
          }
        }, "callback")
      },
      gnuDateShorter: {
        regex: RegExp("^" + reYear4 + "-" + reMonth),
        name: "gnudateshorter",
        callback: /* @__PURE__ */ __name(function callback(match, year, month) {
          return this.ymd(+year, month - 1, 1);
        }, "callback")
      },
      pgTextReverse: {
        // note: allowed years are from 32-9999
        // years below 32 should be treated as days in datefull
        regex: RegExp("^(\\d{3,4}|[4-9]\\d|3[2-9])-(" + reMonthAbbr + ")-" + reDaylz, "i"),
        name: "pgtextreverse",
        callback: /* @__PURE__ */ __name(function callback(match, year, month, day) {
          return this.ymd(processYear(year), lookupMonth(month), +day);
        }, "callback")
      },
      dateFull: {
        regex: RegExp("^" + reDay + "[ \\t.-]*" + reMonthText + "[ \\t.-]*" + reYear, "i"),
        name: "datefull",
        callback: /* @__PURE__ */ __name(function callback(match, day, month, year) {
          return this.ymd(processYear(year), lookupMonth(month), +day);
        }, "callback")
      },
      dateNoDay: {
        regex: RegExp("^" + reMonthText + "[ .\\t-]*" + reYear4, "i"),
        name: "datenoday",
        callback: /* @__PURE__ */ __name(function callback(match, month, year) {
          return this.ymd(+year, lookupMonth(month), 1);
        }, "callback")
      },
      dateNoDayRev: {
        regex: RegExp("^" + reYear4 + "[ .\\t-]*" + reMonthText, "i"),
        name: "datenodayrev",
        callback: /* @__PURE__ */ __name(function callback(match, year, month) {
          return this.ymd(+year, lookupMonth(month), 1);
        }, "callback")
      },
      pgTextShort: {
        regex: RegExp("^(" + reMonthAbbr + ")-" + reDaylz + "-" + reYear, "i"),
        name: "pgtextshort",
        callback: /* @__PURE__ */ __name(function callback(match, month, day, year) {
          return this.ymd(processYear(year), lookupMonth(month), +day);
        }, "callback")
      },
      dateNoYear: {
        regex: RegExp("^" + reDateNoYear, "i"),
        name: "datenoyear",
        callback: /* @__PURE__ */ __name(function callback(match, month, day) {
          return this.ymd(this.y, lookupMonth(month), +day);
        }, "callback")
      },
      dateNoYearRev: {
        regex: RegExp("^" + reDay + "[ .\\t-]*" + reMonthText, "i"),
        name: "datenoyearrev",
        callback: /* @__PURE__ */ __name(function callback(match, day, month) {
          return this.ymd(this.y, lookupMonth(month), +day);
        }, "callback")
      },
      isoWeekDay: {
        regex: RegExp("^" + reYear4 + "-?W" + reWeekOfYear + "(?:-?([0-7]))?"),
        name: "isoweekday | isoweek",
        callback: /* @__PURE__ */ __name(function callback(match, year, week, day) {
          day = day ? +day : 1;
          if (!this.ymd(+year, 0, 1)) {
            return false;
          }
          var dayOfWeek = new Date(this.y, this.m, this.d).getDay();
          dayOfWeek = 0 - (dayOfWeek > 4 ? dayOfWeek - 7 : dayOfWeek);
          this.rd += dayOfWeek + (week - 1) * 7 + day;
        }, "callback")
      },
      relativeText: {
        regex: RegExp("^(" + reReltextnumber + "|" + reReltexttext + ")" + reSpace + "(" + reReltextunit + ")", "i"),
        name: "relativetext",
        callback: /* @__PURE__ */ __name(function callback(match, relValue, relUnit) {
          var _lookupRelative = lookupRelative(relValue), amount = _lookupRelative.amount, behavior = _lookupRelative.behavior;
          switch (relUnit.toLowerCase()) {
            case "sec":
            case "secs":
            case "second":
            case "seconds":
              this.rs += amount;
              break;
            case "min":
            case "mins":
            case "minute":
            case "minutes":
              this.ri += amount;
              break;
            case "hour":
            case "hours":
              this.rh += amount;
              break;
            case "day":
            case "days":
              this.rd += amount;
              break;
            case "fortnight":
            case "fortnights":
            case "forthnight":
            case "forthnights":
              this.rd += amount * 14;
              break;
            case "week":
            case "weeks":
              this.rd += amount * 7;
              break;
            case "month":
            case "months":
              this.rm += amount;
              break;
            case "year":
            case "years":
              this.ry += amount;
              break;
            case "mon":
            case "monday":
            case "tue":
            case "tuesday":
            case "wed":
            case "wednesday":
            case "thu":
            case "thursday":
            case "fri":
            case "friday":
            case "sat":
            case "saturday":
            case "sun":
            case "sunday":
              this.resetTime();
              this.weekday = lookupWeekday(relUnit, 7);
              this.weekdayBehavior = 1;
              this.rd += (amount > 0 ? amount - 1 : amount) * 7;
              break;
            case "weekday":
            case "weekdays":
              break;
          }
        }, "callback")
      },
      relative: {
        regex: RegExp("^([+-]*)[ \\t]*(\\d+)" + reSpaceOpt + "(" + reReltextunit + "|week)", "i"),
        name: "relative",
        callback: /* @__PURE__ */ __name(function callback(match, signs, relValue, relUnit) {
          var minuses = signs.replace(/[^-]/g, "").length;
          var amount = +relValue * Math.pow(-1, minuses);
          switch (relUnit.toLowerCase()) {
            case "sec":
            case "secs":
            case "second":
            case "seconds":
              this.rs += amount;
              break;
            case "min":
            case "mins":
            case "minute":
            case "minutes":
              this.ri += amount;
              break;
            case "hour":
            case "hours":
              this.rh += amount;
              break;
            case "day":
            case "days":
              this.rd += amount;
              break;
            case "fortnight":
            case "fortnights":
            case "forthnight":
            case "forthnights":
              this.rd += amount * 14;
              break;
            case "week":
            case "weeks":
              this.rd += amount * 7;
              break;
            case "month":
            case "months":
              this.rm += amount;
              break;
            case "year":
            case "years":
              this.ry += amount;
              break;
            case "mon":
            case "monday":
            case "tue":
            case "tuesday":
            case "wed":
            case "wednesday":
            case "thu":
            case "thursday":
            case "fri":
            case "friday":
            case "sat":
            case "saturday":
            case "sun":
            case "sunday":
              this.resetTime();
              this.weekday = lookupWeekday(relUnit, 7);
              this.weekdayBehavior = 1;
              this.rd += (amount > 0 ? amount - 1 : amount) * 7;
              break;
            case "weekday":
            case "weekdays":
              break;
          }
        }, "callback")
      },
      dayText: {
        regex: RegExp("^(" + reDaytext + ")", "i"),
        name: "daytext",
        callback: /* @__PURE__ */ __name(function callback(match, dayText) {
          this.resetTime();
          this.weekday = lookupWeekday(dayText, 0);
          if (this.weekdayBehavior !== 2) {
            this.weekdayBehavior = 1;
          }
        }, "callback")
      },
      relativeTextWeek: {
        regex: RegExp("^(" + reReltexttext + ")" + reSpace + "week", "i"),
        name: "relativetextweek",
        callback: /* @__PURE__ */ __name(function callback(match, relText) {
          this.weekdayBehavior = 2;
          switch (relText.toLowerCase()) {
            case "this":
              this.rd += 0;
              break;
            case "next":
              this.rd += 7;
              break;
            case "last":
            case "previous":
              this.rd -= 7;
              break;
          }
          if (isNaN(this.weekday)) {
            this.weekday = 1;
          }
        }, "callback")
      },
      monthFullOrMonthAbbr: {
        regex: RegExp("^(" + reMonthFull + "|" + reMonthAbbr + ")", "i"),
        name: "monthfull | monthabbr",
        callback: /* @__PURE__ */ __name(function callback(match, month) {
          return this.ymd(this.y, lookupMonth(month), this.d);
        }, "callback")
      },
      tzCorrection: {
        regex: RegExp("^" + reTzCorrection, "i"),
        name: "tzcorrection",
        callback: /* @__PURE__ */ __name(function callback(tzCorrection) {
          return this.zone(processTzCorrection(tzCorrection));
        }, "callback")
      },
      tzAbbr: {
        regex: RegExp("^" + reTzAbbr),
        name: "tzabbr",
        callback: /* @__PURE__ */ __name(function callback(match, abbr) {
          var offset = tzAbbrOffsets[abbr.toLowerCase()];
          if (isNaN(offset)) {
            return false;
          }
          return this.zone(offset);
        }, "callback")
      },
      ago: {
        regex: /^ago/i,
        name: "ago",
        callback: /* @__PURE__ */ __name(function callback() {
          this.ry = -this.ry;
          this.rm = -this.rm;
          this.rd = -this.rd;
          this.rh = -this.rh;
          this.ri = -this.ri;
          this.rs = -this.rs;
          this.rf = -this.rf;
        }, "callback")
      },
      year4: {
        regex: RegExp("^" + reYear4),
        name: "year4",
        callback: /* @__PURE__ */ __name(function callback(match, year) {
          this.y = +year;
          return true;
        }, "callback")
      },
      whitespace: {
        regex: /^[ .,\t]+/,
        name: "whitespace"
        // do nothing
      },
      dateShortWithTimeLong: {
        regex: RegExp("^" + reDateNoYear + "t?" + reHour24 + "[:.]" + reMinute + "[:.]" + reSecond, "i"),
        name: "dateshortwithtimelong",
        callback: /* @__PURE__ */ __name(function callback(match, month, day, hour, minute, second) {
          return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, +second, 0);
        }, "callback")
      },
      dateShortWithTimeLong12: {
        regex: RegExp("^" + reDateNoYear + reHour12 + "[:.]" + reMinute + "[:.]" + reSecondlz + reSpaceOpt + reMeridian, "i"),
        name: "dateshortwithtimelong12",
        callback: /* @__PURE__ */ __name(function callback(match, month, day, hour, minute, second, meridian) {
          return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, +second, 0);
        }, "callback")
      },
      dateShortWithTimeShort: {
        regex: RegExp("^" + reDateNoYear + "t?" + reHour24 + "[:.]" + reMinute, "i"),
        name: "dateshortwithtimeshort",
        callback: /* @__PURE__ */ __name(function callback(match, month, day, hour, minute) {
          return this.ymd(this.y, lookupMonth(month), +day) && this.time(+hour, +minute, 0, 0);
        }, "callback")
      },
      dateShortWithTimeShort12: {
        regex: RegExp("^" + reDateNoYear + reHour12 + "[:.]" + reMinutelz + reSpaceOpt + reMeridian, "i"),
        name: "dateshortwithtimeshort12",
        callback: /* @__PURE__ */ __name(function callback(match, month, day, hour, minute, meridian) {
          return this.ymd(this.y, lookupMonth(month), +day) && this.time(processMeridian(+hour, meridian), +minute, 0, 0);
        }, "callback")
      }
    };
    var resultProto = {
      // date
      y: NaN,
      m: NaN,
      d: NaN,
      // time
      h: NaN,
      i: NaN,
      s: NaN,
      f: NaN,
      // relative shifts
      ry: 0,
      rm: 0,
      rd: 0,
      rh: 0,
      ri: 0,
      rs: 0,
      rf: 0,
      // weekday related shifts
      weekday: NaN,
      weekdayBehavior: 0,
      // first or last day of month
      // 0 none, 1 first, -1 last
      firstOrLastDayOfMonth: 0,
      // timezone correction in minutes
      z: NaN,
      // counters
      dates: 0,
      times: 0,
      zones: 0,
      // helper functions
      ymd: /* @__PURE__ */ __name(function ymd(y, m, d) {
        if (this.dates > 0) {
          return false;
        }
        this.dates++;
        this.y = y;
        this.m = m;
        this.d = d;
        return true;
      }, "ymd"),
      time: /* @__PURE__ */ __name(function time(h, i, s, f) {
        if (this.times > 0) {
          return false;
        }
        this.times++;
        this.h = h;
        this.i = i;
        this.s = s;
        this.f = f;
        return true;
      }, "time"),
      resetTime: /* @__PURE__ */ __name(function resetTime() {
        this.h = 0;
        this.i = 0;
        this.s = 0;
        this.f = 0;
        this.times = 0;
        return true;
      }, "resetTime"),
      zone: /* @__PURE__ */ __name(function zone(minutes) {
        if (this.zones <= 1) {
          this.zones++;
          this.z = minutes;
          return true;
        }
        return false;
      }, "zone"),
      toDate: /* @__PURE__ */ __name(function toDate(relativeTo) {
        if (this.dates && !this.times) {
          this.h = this.i = this.s = this.f = 0;
        }
        if (isNaN(this.y)) {
          this.y = relativeTo.getFullYear();
        }
        if (isNaN(this.m)) {
          this.m = relativeTo.getMonth();
        }
        if (isNaN(this.d)) {
          this.d = relativeTo.getDate();
        }
        if (isNaN(this.h)) {
          this.h = relativeTo.getHours();
        }
        if (isNaN(this.i)) {
          this.i = relativeTo.getMinutes();
        }
        if (isNaN(this.s)) {
          this.s = relativeTo.getSeconds();
        }
        if (isNaN(this.f)) {
          this.f = relativeTo.getMilliseconds();
        }
        switch (this.firstOrLastDayOfMonth) {
          case 1:
            this.d = 1;
            break;
          case -1:
            this.d = 0;
            this.m += 1;
            break;
        }
        if (!isNaN(this.weekday)) {
          var date = new Date(relativeTo.getTime());
          date.setFullYear(this.y, this.m, this.d);
          date.setHours(this.h, this.i, this.s, this.f);
          var dow = date.getDay();
          if (this.weekdayBehavior === 2) {
            if (dow === 0 && this.weekday !== 0) {
              this.weekday = -6;
            }
            if (this.weekday === 0 && dow !== 0) {
              this.weekday = 7;
            }
            this.d -= dow;
            this.d += this.weekday;
          } else {
            var diff = this.weekday - dow;
            if (this.rd < 0 && diff < 0 || this.rd >= 0 && diff <= -this.weekdayBehavior) {
              diff += 7;
            }
            if (this.weekday >= 0) {
              this.d += diff;
            } else {
              this.d -= 7 - (Math.abs(this.weekday) - dow);
            }
            this.weekday = NaN;
          }
        }
        this.y += this.ry;
        this.m += this.rm;
        this.d += this.rd;
        this.h += this.rh;
        this.i += this.ri;
        this.s += this.rs;
        this.f += this.rf;
        this.ry = this.rm = this.rd = 0;
        this.rh = this.ri = this.rs = this.rf = 0;
        var result = new Date(relativeTo.getTime());
        result.setFullYear(this.y, this.m, this.d);
        result.setHours(this.h, this.i, this.s, this.f);
        switch (this.firstOrLastDayOfMonth) {
          case 1:
            result.setDate(1);
            break;
          case -1:
            result.setMonth(result.getMonth() + 1, 0);
            break;
        }
        if (!isNaN(this.z) && result.getTimezoneOffset() !== this.z) {
          result.setUTCFullYear(result.getFullYear(), result.getMonth(), result.getDate());
          result.setUTCHours(result.getHours(), result.getMinutes(), result.getSeconds() - this.z, result.getMilliseconds());
        }
        return result;
      }, "toDate")
    };
    module.exports = /* @__PURE__ */ __name(function strtotime(str, now) {
      if (now == null) {
        now = Math.floor(Date.now() / 1e3);
      }
      var rules = [
        formats.yesterday,
        formats.now,
        formats.noon,
        formats.midnightOrToday,
        formats.tomorrow,
        formats.timestamp,
        formats.firstOrLastDay,
        formats.backOrFrontOf,
        // formats.weekdayOf, // not yet implemented
        formats.timeTiny12,
        formats.timeShort12,
        formats.timeLong12,
        formats.mssqltime,
        formats.oracledate,
        formats.timeShort24,
        formats.timeLong24,
        formats.iso8601long,
        formats.gnuNoColon,
        formats.iso8601noColon,
        formats.americanShort,
        formats.american,
        formats.iso8601date4,
        formats.iso8601dateSlash,
        formats.dateSlash,
        formats.gnuDateShortOrIso8601date2,
        formats.gnuDateShorter,
        formats.dateFull,
        formats.pointedDate4,
        formats.pointedDate2,
        formats.dateNoDay,
        formats.dateNoDayRev,
        formats.dateTextual,
        formats.dateNoYear,
        formats.dateNoYearRev,
        formats.dateNoColon,
        formats.xmlRpc,
        formats.xmlRpcNoColon,
        formats.soap,
        formats.wddx,
        formats.exif,
        formats.pgydotd,
        formats.isoWeekDay,
        formats.pgTextShort,
        formats.pgTextReverse,
        formats.clf,
        formats.year4,
        formats.ago,
        formats.dayText,
        formats.relativeTextWeek,
        formats.relativeText,
        formats.monthFullOrMonthAbbr,
        formats.tzCorrection,
        formats.tzAbbr,
        formats.dateShortWithTimeShort12,
        formats.dateShortWithTimeLong12,
        formats.dateShortWithTimeShort,
        formats.dateShortWithTimeLong,
        formats.relative,
        formats.whitespace
      ];
      var result = Object.create(resultProto);
      while (str.length) {
        var longestMatch = null;
        var finalRule = null;
        for (var i = 0, l = rules.length; i < l; i++) {
          var format = rules[i];
          var match = str.match(format.regex);
          if (match) {
            if (!longestMatch || match[0].length > longestMatch[0].length) {
              longestMatch = match;
              finalRule = format;
            }
          }
        }
        if (!finalRule || finalRule.callback && finalRule.callback.apply(result, longestMatch) === false) {
          return false;
        }
        str = str.substr(longestMatch[0].length);
        finalRule = null;
        longestMatch = null;
      }
      return Math.floor(result.toDate(new Date(now * 1e3)) / 1e3);
    }, "strtotime");
  }
});

// ../node_modules/locutus/php/datetime/date.js
var require_date = __commonJS({
  "../node_modules/locutus/php/datetime/date.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ __name(function date(format, timestamp) {
      var jsdate = void 0, f = void 0;
      var txtWords = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var formatChr = /\\?(.?)/gi;
      var formatChrCb = /* @__PURE__ */ __name(function formatChrCb2(t, s) {
        return f[t] ? f[t]() : s;
      }, "formatChrCb");
      var _pad = /* @__PURE__ */ __name(function _pad2(n, c) {
        n = String(n);
        while (n.length < c) {
          n = "0" + n;
        }
        return n;
      }, "_pad");
      f = {
        // Day
        d: /* @__PURE__ */ __name(function d() {
          return _pad(f.j(), 2);
        }, "d"),
        D: /* @__PURE__ */ __name(function D() {
          return f.l().slice(0, 3);
        }, "D"),
        j: /* @__PURE__ */ __name(function j() {
          return jsdate.getDate();
        }, "j"),
        l: /* @__PURE__ */ __name(function l() {
          return txtWords[f.w()] + "day";
        }, "l"),
        N: /* @__PURE__ */ __name(function N() {
          return f.w() || 7;
        }, "N"),
        S: /* @__PURE__ */ __name(function S() {
          var j = f.j();
          var i = j % 10;
          if (i <= 3 && parseInt(j % 100 / 10, 10) === 1) {
            i = 0;
          }
          return ["st", "nd", "rd"][i - 1] || "th";
        }, "S"),
        w: /* @__PURE__ */ __name(function w() {
          return jsdate.getDay();
        }, "w"),
        z: /* @__PURE__ */ __name(function z() {
          var a = new Date(f.Y(), f.n() - 1, f.j());
          var b = new Date(f.Y(), 0, 1);
          return Math.round((a - b) / 864e5);
        }, "z"),
        // Week
        W: /* @__PURE__ */ __name(function W() {
          var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
          var b = new Date(a.getFullYear(), 0, 4);
          return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        }, "W"),
        // Month
        F: /* @__PURE__ */ __name(function F() {
          return txtWords[6 + f.n()];
        }, "F"),
        m: /* @__PURE__ */ __name(function m() {
          return _pad(f.n(), 2);
        }, "m"),
        M: /* @__PURE__ */ __name(function M() {
          return f.F().slice(0, 3);
        }, "M"),
        n: /* @__PURE__ */ __name(function n() {
          return jsdate.getMonth() + 1;
        }, "n"),
        t: /* @__PURE__ */ __name(function t() {
          return new Date(f.Y(), f.n(), 0).getDate();
        }, "t"),
        // Year
        L: /* @__PURE__ */ __name(function L() {
          var j = f.Y();
          return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
        }, "L"),
        o: /* @__PURE__ */ __name(function o() {
          var n = f.n();
          var W = f.W();
          var Y = f.Y();
          return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
        }, "o"),
        Y: /* @__PURE__ */ __name(function Y() {
          return jsdate.getFullYear();
        }, "Y"),
        y: /* @__PURE__ */ __name(function y() {
          return f.Y().toString().slice(-2);
        }, "y"),
        // Time
        a: /* @__PURE__ */ __name(function a() {
          return jsdate.getHours() > 11 ? "pm" : "am";
        }, "a"),
        A: /* @__PURE__ */ __name(function A() {
          return f.a().toUpperCase();
        }, "A"),
        B: /* @__PURE__ */ __name(function B() {
          var H = jsdate.getUTCHours() * 3600;
          var i = jsdate.getUTCMinutes() * 60;
          var s = jsdate.getUTCSeconds();
          return _pad(Math.floor((H + i + s + 3600) / 86.4) % 1e3, 3);
        }, "B"),
        g: /* @__PURE__ */ __name(function g() {
          return f.G() % 12 || 12;
        }, "g"),
        G: /* @__PURE__ */ __name(function G() {
          return jsdate.getHours();
        }, "G"),
        h: /* @__PURE__ */ __name(function h() {
          return _pad(f.g(), 2);
        }, "h"),
        H: /* @__PURE__ */ __name(function H() {
          return _pad(f.G(), 2);
        }, "H"),
        i: /* @__PURE__ */ __name(function i() {
          return _pad(jsdate.getMinutes(), 2);
        }, "i"),
        s: /* @__PURE__ */ __name(function s() {
          return _pad(jsdate.getSeconds(), 2);
        }, "s"),
        u: /* @__PURE__ */ __name(function u() {
          return _pad(jsdate.getMilliseconds() * 1e3, 6);
        }, "u"),
        // Timezone
        e: /* @__PURE__ */ __name(function e() {
          var msg = "Not supported (see source code of date() for timezone on how to add support)";
          throw new Error(msg);
        }, "e"),
        I: /* @__PURE__ */ __name(function I() {
          var a = new Date(f.Y(), 0);
          var c = Date.UTC(f.Y(), 0);
          var b = new Date(f.Y(), 6);
          var d = Date.UTC(f.Y(), 6);
          return a - c !== b - d ? 1 : 0;
        }, "I"),
        O: /* @__PURE__ */ __name(function O() {
          var tzo = jsdate.getTimezoneOffset();
          var a = Math.abs(tzo);
          return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        }, "O"),
        P: /* @__PURE__ */ __name(function P() {
          var O = f.O();
          return O.substr(0, 3) + ":" + O.substr(3, 2);
        }, "P"),
        T: /* @__PURE__ */ __name(function T() {
          return "UTC";
        }, "T"),
        Z: /* @__PURE__ */ __name(function Z() {
          return -jsdate.getTimezoneOffset() * 60;
        }, "Z"),
        // Full Date/Time
        c: /* @__PURE__ */ __name(function c() {
          return "Y-m-d\\TH:i:sP".replace(formatChr, formatChrCb);
        }, "c"),
        r: /* @__PURE__ */ __name(function r() {
          return "D, d M Y H:i:s O".replace(formatChr, formatChrCb);
        }, "r"),
        U: /* @__PURE__ */ __name(function U() {
          return jsdate / 1e3 | 0;
        }, "U")
      };
      var _date = /* @__PURE__ */ __name(function _date2(format2, timestamp2) {
        jsdate = timestamp2 === void 0 ? /* @__PURE__ */ new Date() : timestamp2 instanceof Date ? new Date(timestamp2) : new Date(timestamp2 * 1e3);
        return format2.replace(formatChr, formatChrCb);
      }, "_date");
      return _date(format, timestamp);
    }, "date");
  }
});

// ../node_modules/locutus/php/var/boolval.js
var require_boolval = __commonJS({
  "../node_modules/locutus/php/var/boolval.js"(exports, module) {
    "use strict";
    module.exports = /* @__PURE__ */ __name(function boolval(mixedVar) {
      if (mixedVar === false) {
        return false;
      }
      if (mixedVar === 0 || mixedVar === 0) {
        return false;
      }
      if (mixedVar === "" || mixedVar === "0") {
        return false;
      }
      if (Array.isArray(mixedVar) && mixedVar.length === 0) {
        return false;
      }
      if (mixedVar === null || mixedVar === void 0) {
        return false;
      }
      return true;
    }, "boolval");
  }
});

// ../node_modules/twig/src/twig.lib.js
var require_twig_lib = __commonJS({
  "../node_modules/twig/src/twig.lib.js"(exports, module) {
    module.exports = function(Twig) {
      Twig.lib = {};
      Twig.lib.sprintf = require_sprintf();
      Twig.lib.vsprintf = require_vsprintf();
      Twig.lib.round = require_round();
      Twig.lib.max = require_max();
      Twig.lib.min = require_min();
      Twig.lib.stripTags = require_strip_tags();
      Twig.lib.strtotime = require_strtotime();
      Twig.lib.date = require_date();
      Twig.lib.boolval = require_boolval();
      Twig.lib.is = function(type, obj) {
        if (typeof obj === "undefined" || obj === null) {
          return false;
        }
        switch (type) {
          case "Array":
            return Array.isArray(obj);
          case "Date":
            return obj instanceof Date;
          case "String":
            return typeof obj === "string" || obj instanceof String;
          case "Number":
            return typeof obj === "number" || obj instanceof Number;
          case "Function":
            return typeof obj === "function";
          case "Object":
            return obj instanceof Object;
          default:
            return false;
        }
      };
      Twig.lib.replaceAll = function(string, search, replace) {
        const stringToChange = typeof string === "string" ? string : string.toString();
        const searchEscaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return stringToChange.replace(new RegExp(searchEscaped, "g"), replace);
      };
      Twig.lib.chunkArray = function(arr, size) {
        const returnVal = [];
        let x = 0;
        const len = arr.length;
        if (size < 1 || !Array.isArray(arr)) {
          return [];
        }
        while (x < len) {
          returnVal.push(arr.slice(x, x += size));
        }
        return returnVal;
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.loader.ajax.js
var require_twig_loader_ajax = __commonJS({
  "../node_modules/twig/src/twig.loader.ajax.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.Templates.registerLoader("ajax", function(location, params, callback, errorCallback) {
        let template;
        const { precompiled } = params;
        const parser = this.parsers[params.parser] || this.parser.twig;
        if (typeof XMLHttpRequest === "undefined") {
          throw new Twig.Error('Unsupported platform: Unable to do ajax requests because there is no "XMLHTTPRequest" implementation');
        }
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          let data = null;
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200 || window.cordova && xmlhttp.status === 0) {
              Twig.log.debug("Got template ", xmlhttp.responseText);
              if (precompiled === true) {
                data = JSON.parse(xmlhttp.responseText);
              } else {
                data = xmlhttp.responseText;
              }
              params.url = location;
              params.data = data;
              template = parser.call(this, params);
              if (typeof callback === "function") {
                callback(template);
              }
            } else if (typeof errorCallback === "function") {
              errorCallback(xmlhttp);
            }
          }
        };
        xmlhttp.open("GET", location, Boolean(params.async));
        xmlhttp.overrideMimeType("text/plain");
        xmlhttp.send();
        if (params.async) {
          return true;
        }
        return template;
      });
    };
  }
});

// (disabled):fs
var require_fs = __commonJS({
  "(disabled):fs"() {
  }
});

// ../node_modules/twig/src/twig.loader.fs.js
var require_twig_loader_fs = __commonJS({
  "../node_modules/twig/src/twig.loader.fs.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      let fs;
      let path2;
      try {
        fs = require_fs();
        path2 = __require("path");
      } catch (error) {
        console.warn("Missing fs and path modules. " + error);
      }
      Twig.Templates.registerLoader("fs", function(location, params, callback, errorCallback) {
        let template;
        let data = null;
        const { precompiled } = params;
        const parser = this.parsers[params.parser] || this.parser.twig;
        if (!fs || !path2) {
          throw new Twig.Error('Unsupported platform: Unable to load from file because there is no "fs" or "path" implementation');
        }
        const loadTemplateFn = /* @__PURE__ */ __name(function(err, data2) {
          if (err) {
            if (typeof errorCallback === "function") {
              errorCallback(err);
            }
            return;
          }
          if (precompiled === true) {
            data2 = JSON.parse(data2);
          }
          params.data = data2;
          params.path = params.path || location;
          template = parser.call(this, params);
          if (typeof callback === "function") {
            callback(template);
          }
        }, "loadTemplateFn");
        params.path = params.path || location;
        if (params.async) {
          fs.stat(params.path, (err, stats) => {
            if (err || !stats.isFile()) {
              if (typeof errorCallback === "function") {
                errorCallback(new Twig.Error("Unable to find template file " + params.path));
              }
              return;
            }
            fs.readFile(params.path, "utf8", loadTemplateFn);
          });
          return true;
        }
        try {
          if (!fs.statSync(params.path).isFile()) {
            throw new Twig.Error("Unable to find template file " + params.path);
          }
        } catch (error) {
          throw new Twig.Error("Unable to find template file " + params.path + ". " + error);
        }
        data = fs.readFileSync(params.path, "utf8");
        loadTemplateFn(void 0, data);
        return template;
      });
    };
  }
});

// ../node_modules/twig/src/twig.logic.js
var require_twig_logic = __commonJS({
  "../node_modules/twig/src/twig.logic.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.logic = {};
      Twig.logic.type = {
        if_: "Twig.logic.type.if",
        endif: "Twig.logic.type.endif",
        for_: "Twig.logic.type.for",
        endfor: "Twig.logic.type.endfor",
        else_: "Twig.logic.type.else",
        elseif: "Twig.logic.type.elseif",
        set: "Twig.logic.type.set",
        setcapture: "Twig.logic.type.setcapture",
        endset: "Twig.logic.type.endset",
        filter: "Twig.logic.type.filter",
        endfilter: "Twig.logic.type.endfilter",
        apply: "Twig.logic.type.apply",
        endapply: "Twig.logic.type.endapply",
        do: "Twig.logic.type.do",
        shortblock: "Twig.logic.type.shortblock",
        block: "Twig.logic.type.block",
        endblock: "Twig.logic.type.endblock",
        extends_: "Twig.logic.type.extends",
        use: "Twig.logic.type.use",
        include: "Twig.logic.type.include",
        spaceless: "Twig.logic.type.spaceless",
        endspaceless: "Twig.logic.type.endspaceless",
        macro: "Twig.logic.type.macro",
        endmacro: "Twig.logic.type.endmacro",
        import_: "Twig.logic.type.import",
        from: "Twig.logic.type.from",
        embed: "Twig.logic.type.embed",
        endembed: "Twig.logic.type.endembed",
        with: "Twig.logic.type.with",
        endwith: "Twig.logic.type.endwith",
        deprecated: "Twig.logic.type.deprecated"
      };
      Twig.logic.definitions = [
        {
          /**
           * If type logic tokens.
           *
           *  Format: {% if expression %}
           */
          type: Twig.logic.type.if_,
          regex: /^if\s?([\s\S]+)$/,
          next: [
            Twig.logic.type.else_,
            Twig.logic.type.elseif,
            Twig.logic.type.endif
          ],
          open: true,
          compile(token) {
            const expression = token.match[1];
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            delete token.match;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            return Twig.expression.parseAsync.call(state, token.stack, context).then((result) => {
              chain = true;
              if (Twig.lib.boolval(result)) {
                chain = false;
                return state.parseAsync(token.output, context);
              }
              return "";
            }).then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        {
          /**
           * Else if type logic tokens.
           *
           *  Format: {% elseif expression %}
           */
          type: Twig.logic.type.elseif,
          regex: /^elseif\s*([^\s].*)$/,
          next: [
            Twig.logic.type.else_,
            Twig.logic.type.elseif,
            Twig.logic.type.endif
          ],
          open: false,
          compile(token) {
            const expression = token.match[1];
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            delete token.match;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            return Twig.expression.parseAsync.call(state, token.stack, context).then((result) => {
              if (chain && Twig.lib.boolval(result)) {
                chain = false;
                return state.parseAsync(token.output, context);
              }
              return "";
            }).then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        {
          /**
           * Else type logic tokens.
           *
           *  Format: {% else %}
           */
          type: Twig.logic.type.else_,
          regex: /^else$/,
          next: [
            Twig.logic.type.endif,
            Twig.logic.type.endfor
          ],
          open: false,
          parse(token, context, chain) {
            let promise = Twig.Promise.resolve("");
            const state = this;
            if (chain) {
              promise = state.parseAsync(token.output, context);
            }
            return promise.then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        {
          /**
           * End if type logic tokens.
           *
           *  Format: {% endif %}
           */
          type: Twig.logic.type.endif,
          regex: /^endif$/,
          next: [],
          open: false
        },
        {
          /**
           * For type logic tokens.
           *
           *  Format: {% for expression %}
           */
          type: Twig.logic.type.for_,
          regex: /^for\s+([a-zA-Z0-9_,\s]+)\s+in\s+([\S\s]+?)(?:\s+if\s+([^\s].*))?$/,
          next: [
            Twig.logic.type.else_,
            Twig.logic.type.endfor
          ],
          open: true,
          compile(token) {
            const keyValue = token.match[1];
            const expression = token.match[2];
            const conditional = token.match[3];
            let kvSplit = null;
            token.keyVar = null;
            token.valueVar = null;
            if (keyValue.includes(",")) {
              kvSplit = keyValue.split(",");
              if (kvSplit.length === 2) {
                token.keyVar = kvSplit[0].trim();
                token.valueVar = kvSplit[1].trim();
              } else {
                throw new Twig.Error("Invalid expression in for loop: " + keyValue);
              }
            } else {
              token.valueVar = keyValue.trim();
            }
            token.expression = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            if (conditional) {
              token.conditional = Twig.expression.compile.call(this, {
                type: Twig.expression.type.expression,
                value: conditional
              }).stack;
            }
            delete token.match;
            return token;
          },
          parse(token, context, continueChain) {
            const output = [];
            let len;
            let index = 0;
            let keyset;
            const state = this;
            const { conditional } = token;
            const buildLoop = /* @__PURE__ */ __name(function(index2, len2) {
              const isConditional = conditional !== void 0;
              return {
                index: index2 + 1,
                index0: index2,
                revindex: isConditional ? void 0 : len2 - index2,
                revindex0: isConditional ? void 0 : len2 - index2 - 1,
                first: index2 === 0,
                last: isConditional ? void 0 : index2 === len2 - 1,
                length: isConditional ? void 0 : len2,
                parent: context
              };
            }, "buildLoop");
            const loop = /* @__PURE__ */ __name(function(key, value) {
              const innerContext = { ...context };
              innerContext[token.valueVar] = value;
              if (token.keyVar) {
                innerContext[token.keyVar] = key;
              }
              innerContext.loop = buildLoop(index, len);
              const promise = conditional === void 0 ? Twig.Promise.resolve(true) : Twig.expression.parseAsync.call(state, conditional, innerContext);
              return promise.then((condition) => {
                if (!condition) {
                  return;
                }
                return state.parseAsync(token.output, innerContext).then((tokenOutput) => {
                  output.push(tokenOutput);
                  index += 1;
                });
              }).then(() => {
                delete innerContext.loop;
                delete innerContext[token.valueVar];
                delete innerContext[token.keyVar];
                Twig.merge(context, innerContext, true);
              });
            }, "loop");
            return Twig.expression.parseAsync.call(state, token.expression, context).then((result) => {
              if (Array.isArray(result)) {
                len = result.length;
                return Twig.async.forEach(result, (value) => {
                  const key = index;
                  return loop(key, value);
                });
              }
              if (Twig.lib.is("Object", result)) {
                if (result._keys === void 0) {
                  keyset = Object.keys(result);
                } else {
                  keyset = result._keys;
                }
                len = keyset.length;
                return Twig.async.forEach(keyset, (key) => {
                  if (key === "_keys") {
                    return;
                  }
                  return loop(key, result[key]);
                });
              }
            }).then(() => {
              continueChain = output.length === 0;
              return {
                chain: continueChain,
                context,
                output: Twig.output.call(state.template, output)
              };
            });
          }
        },
        {
          /**
           * End for type logic tokens.
           *
           *  Format: {% endfor %}
           */
          type: Twig.logic.type.endfor,
          regex: /^endfor$/,
          next: [],
          open: false
        },
        {
          /**
           * Set type logic tokens.
           *
           *  Format: {% set key = expression %}
           */
          type: Twig.logic.type.set,
          regex: /^set\s+([a-zA-Z0-9_,\s]+)\s*=\s*([\s\S]+)$/,
          next: [],
          open: true,
          compile(token) {
            const key = token.match[1].trim();
            const expression = token.match[2];
            const expressionStack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            token.key = key;
            token.expression = expressionStack;
            delete token.match;
            return token;
          },
          parse(token, context, continueChain) {
            const { key } = token;
            const state = this;
            return Twig.expression.parseAsync.call(state, token.expression, context).then((value) => {
              if (value === context) {
                value = { ...value };
              }
              context[key] = value;
              return {
                chain: continueChain,
                context
              };
            });
          }
        },
        {
          /**
           * Set capture type logic tokens.
           *
           *  Format: {% set key %}
           */
          type: Twig.logic.type.setcapture,
          regex: /^set\s+([a-zA-Z0-9_,\s]+)$/,
          next: [
            Twig.logic.type.endset
          ],
          open: true,
          compile(token) {
            const key = token.match[1].trim();
            token.key = key;
            delete token.match;
            return token;
          },
          parse(token, context, continueChain) {
            const state = this;
            const { key } = token;
            return state.parseAsync(token.output, context).then((output) => {
              state.context[key] = output;
              context[key] = output;
              return {
                chain: continueChain,
                context
              };
            });
          }
        },
        {
          /**
           * End set type block logic tokens.
           *
           *  Format: {% endset %}
           */
          type: Twig.logic.type.endset,
          regex: /^endset$/,
          next: [],
          open: false
        },
        {
          /**
           * Filter logic tokens.
           *
           *  Format: {% filter upper %} or {% filter lower|escape %}
           */
          type: Twig.logic.type.filter,
          regex: /^filter\s+(.+)$/,
          next: [
            Twig.logic.type.endfilter
          ],
          open: true,
          compile(token) {
            const expression = "|" + token.match[1].trim();
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            delete token.match;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            return state.parseAsync(token.output, context).then((output) => {
              const stack = [{
                type: Twig.expression.type.string,
                value: output
              }].concat(token.stack);
              return Twig.expression.parseAsync.call(state, stack, context);
            }).then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        {
          /**
           * End filter logic tokens.
           *
           *  Format: {% endfilter %}
           */
          type: Twig.logic.type.endfilter,
          regex: /^endfilter$/,
          next: [],
          open: false
        },
        {
          /**
           * Apply logic tokens.
           *
           *  Format: {% apply upper %} or {% apply lower|escape %}
           */
          type: Twig.logic.type.apply,
          regex: /^apply\s+(.+)$/,
          next: [
            Twig.logic.type.endapply
          ],
          open: true,
          compile(token) {
            const expression = "|" + token.match[1].trim();
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            delete token.match;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            return state.parseAsync(token.output, context).then((output) => {
              const stack = [{
                type: Twig.expression.type.string,
                value: output
              }].concat(token.stack);
              return Twig.expression.parseAsync.call(state, stack, context);
            }).then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        {
          /**
           * End apply logic tokens.
           *
           *  Format: {% endapply %}
           */
          type: Twig.logic.type.endapply,
          regex: /^endapply$/,
          next: [],
          open: false
        },
        {
          /**
           * Set type logic tokens.
           *
           *  Format: {% do expression %}
           */
          type: Twig.logic.type.do,
          regex: /^do\s+([\S\s]+)$/,
          next: [],
          open: true,
          compile(token) {
            const expression = token.match[1];
            const expressionStack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            token.expression = expressionStack;
            delete token.match;
            return token;
          },
          parse(token, context, continueChain) {
            const state = this;
            return Twig.expression.parseAsync.call(state, token.expression, context).then(() => {
              return {
                chain: continueChain,
                context
              };
            });
          }
        },
        {
          /**
           * Block logic tokens.
           *
           *  Format: {% block title %}
           */
          type: Twig.logic.type.block,
          regex: /^block\s+(\w+)$/,
          next: [
            Twig.logic.type.endblock
          ],
          open: true,
          compile(token) {
            token.blockName = token.match[1].trim();
            delete token.match;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            let promise = Twig.Promise.resolve();
            state.template.blocks.defined[token.blockName] = new Twig.Block(state.template, token);
            if (state.template.parentTemplate === null || state.template.parentTemplate instanceof Twig.Template) {
              promise = state.getBlock(token.blockName).render(state, context);
            }
            return promise.then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        {
          /**
           * Block shorthand logic tokens.
           *
           *  Format: {% block title expression %}
           */
          type: Twig.logic.type.shortblock,
          regex: /^block\s+(\w+)\s+(.+)$/,
          next: [],
          open: true,
          compile(token) {
            const template = this;
            token.expression = token.match[2].trim();
            token.output = Twig.expression.compile({
              type: Twig.expression.type.expression,
              value: token.expression
            }).stack;
            return Twig.logic.handler[Twig.logic.type.block].compile.apply(template, [token]);
          },
          parse(...args) {
            const state = this;
            return Twig.logic.handler[Twig.logic.type.block].parse.apply(state, args);
          }
        },
        {
          /**
           * End block logic tokens.
           *
           *  Format: {% endblock %}
           */
          type: Twig.logic.type.endblock,
          regex: /^endblock(?:\s+(\w+))?$/,
          next: [],
          open: false
        },
        {
          /**
           * Block logic tokens.
           *
           *  Format: {% extends "template.twig" %}
           */
          type: Twig.logic.type.extends_,
          regex: /^extends\s+(.+)$/,
          next: [],
          open: true,
          compile(token) {
            const expression = token.match[1].trim();
            delete token.match;
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            return Twig.expression.parseAsync.call(state, token.stack, context).then((fileName) => {
              if (Array.isArray(fileName)) {
                const result = fileName.reverse().reduce((acc, file) => {
                  try {
                    return {
                      render: state.template.importFile(file),
                      fileName: file
                    };
                  } catch (error) {
                    return acc;
                  }
                }, {
                  render: null,
                  fileName: null
                });
                if (result.fileName !== null) {
                  state.template.parentTemplate = result.fileName;
                }
              } else {
                state.template.parentTemplate = fileName;
              }
              return {
                chain,
                output: ""
              };
            });
          }
        },
        {
          /**
           * Block logic tokens.
           *
           *  Format: {% use "template.twig" %}
           */
          type: Twig.logic.type.use,
          regex: /^use\s+(.+)$/,
          next: [],
          open: true,
          compile(token) {
            const expression = token.match[1].trim();
            delete token.match;
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            return Twig.expression.parseAsync.call(state, token.stack, context).then((filePath) => {
              const useTemplate = state.template.importFile(filePath);
              const useState = new Twig.ParseState(useTemplate);
              return useState.parseAsync(useTemplate.tokens).then(() => {
                state.template.blocks.imported = {
                  ...state.template.blocks.imported,
                  ...useState.getBlocks()
                };
              });
            }).then(() => {
              return {
                chain,
                output: ""
              };
            });
          }
        },
        {
          /**
           * Block logic tokens.
           *
           *  Format: {% includes "template.twig" [with {some: 'values'} only] %}
           */
          type: Twig.logic.type.include,
          regex: /^include\s+(.+?)(?:\s|$)(ignore missing(?:\s|$))?(?:with\s+([\S\s]+?))?(?:\s|$)(only)?$/,
          next: [],
          open: true,
          compile(token) {
            const { match } = token;
            const expression = match[1].trim();
            const ignoreMissing = match[2] !== void 0;
            const withContext = match[3];
            const only = match[4] !== void 0 && match[4].length;
            delete token.match;
            token.only = only;
            token.ignoreMissing = ignoreMissing;
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            if (withContext !== void 0) {
              token.withStack = Twig.expression.compile.call(this, {
                type: Twig.expression.type.expression,
                value: withContext.trim()
              }).stack;
            }
            return token;
          },
          parse(token, context, chain) {
            let innerContext = token.only ? {} : { ...context };
            const { ignoreMissing } = token;
            const state = this;
            let promise = null;
            const result = { chain, output: "" };
            if (typeof token.withStack === "undefined") {
              promise = Twig.Promise.resolve();
            } else {
              promise = Twig.expression.parseAsync.call(state, token.withStack, context).then((withContext) => {
                innerContext = {
                  ...innerContext,
                  ...withContext
                };
              });
            }
            return promise.then(() => {
              return Twig.expression.parseAsync.call(state, token.stack, context);
            }).then((file) => {
              let files;
              if (Array.isArray(file)) {
                files = file;
              } else {
                files = [file];
              }
              const result2 = files.reduce((acc, file2) => {
                if (acc.render === null) {
                  if (file2 instanceof Twig.Template) {
                    return {
                      render: file2.renderAsync(
                        innerContext,
                        {
                          isInclude: true
                        }
                      ),
                      lastError: null
                    };
                  }
                  try {
                    return {
                      render: state.template.importFile(file2).renderAsync(
                        innerContext,
                        {
                          isInclude: true
                        }
                      ),
                      lastError: null
                    };
                  } catch (error) {
                    return {
                      render: null,
                      lastError: error
                    };
                  }
                }
                return acc;
              }, { render: null, lastError: null });
              if (result2.render !== null) {
                return result2.render;
              }
              if (result2.render === null && ignoreMissing) {
                return "";
              }
              throw result2.lastError;
            }).then((output) => {
              if (output !== "") {
                result.output = output;
              }
              return result;
            });
          }
        },
        {
          type: Twig.logic.type.spaceless,
          regex: /^spaceless$/,
          next: [
            Twig.logic.type.endspaceless
          ],
          open: true,
          // Parse the html and return it without any spaces between tags
          parse(token, context, chain) {
            const state = this;
            return state.parseAsync(token.output, context).then((tokenOutput) => {
              const rBetweenTagSpaces = />\s+</g;
              let output = tokenOutput.replace(rBetweenTagSpaces, "><").trim();
              output = new Twig.Markup(output);
              return {
                chain,
                output
              };
            });
          }
        },
        // Add the {% endspaceless %} token
        {
          type: Twig.logic.type.endspaceless,
          regex: /^endspaceless$/,
          next: [],
          open: false
        },
        {
          /**
           * Macro logic tokens.
           *
           * Format: {% macro input(name = default, value, type, size) %}
           *
           */
          type: Twig.logic.type.macro,
          regex: /^macro\s+(\w+)\s*\(\s*((?:\w+(?:\s*=\s*([\s\S]+))?(?:,\s*)?)*)\s*\)$/,
          next: [
            Twig.logic.type.endmacro
          ],
          open: true,
          compile(token) {
            const macroName = token.match[1];
            const rawParameters = token.match[2].split(/\s*,\s*/);
            const parameters = rawParameters.map((rawParameter) => {
              return rawParameter.split(/\s*=\s*/)[0];
            });
            const parametersCount = parameters.length;
            if (parametersCount > 1) {
              const uniq = {};
              for (let i = 0; i < parametersCount; i++) {
                const parameter = parameters[i];
                if (uniq[parameter]) {
                  throw new Twig.Error("Duplicate arguments for parameter: " + parameter);
                } else {
                  uniq[parameter] = 1;
                }
              }
            }
            token.macroName = macroName;
            token.parameters = parameters;
            token.defaults = rawParameters.reduce(function(defaults, rawParameter) {
              const pair = rawParameter.split(/\s*=\s*/);
              const key = pair[0];
              const expression = pair[1];
              if (expression) {
                defaults[key] = Twig.expression.compile.call(this, {
                  type: Twig.expression.type.expression,
                  value: expression
                }).stack;
              } else {
                defaults[key] = void 0;
              }
              return defaults;
            }, {});
            delete token.match;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            state.macros[token.macroName] = function(...args) {
              const macroContext = {
                // Use current state context because state context includes current loop variables as well
                ...state.context,
                _self: state.macros
              };
              return Twig.async.forEach(token.parameters, function(prop, i) {
                if (typeof args[i] !== "undefined") {
                  macroContext[prop] = args[i];
                  return true;
                }
                if (typeof token.defaults[prop] !== "undefined") {
                  return Twig.expression.parseAsync.call(this, token.defaults[prop], context).then((value) => {
                    macroContext[prop] = value;
                    return Twig.Promise.resolve();
                  });
                }
                macroContext[prop] = void 0;
                return true;
              }).then(() => {
                return state.parseAsync(token.output, macroContext);
              });
            };
            return {
              chain,
              output: ""
            };
          }
        },
        {
          /**
           * End macro logic tokens.
           *
           * Format: {% endmacro %}
           */
          type: Twig.logic.type.endmacro,
          regex: /^endmacro$/,
          next: [],
          open: false
        },
        {
          /*
          * Import logic tokens.
          *
          * Format: {% import "template.twig" as form %}
          */
          type: Twig.logic.type.import_,
          regex: /^import\s+(.+)\s+as\s+(\w+)$/,
          next: [],
          open: true,
          compile(token) {
            const expression = token.match[1].trim();
            const contextName = token.match[2].trim();
            delete token.match;
            token.expression = expression;
            token.contextName = contextName;
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            const output = {
              chain,
              output: ""
            };
            if (token.expression === "_self") {
              context[token.contextName] = state.macros;
              return output;
            }
            return Twig.expression.parseAsync.call(state, token.stack, context).then((filePath) => {
              return state.template.importFile(filePath || token.expression);
            }).then((importTemplate) => {
              const importState = new Twig.ParseState(importTemplate);
              return importState.parseAsync(importTemplate.tokens).then(() => {
                context[token.contextName] = importState.macros;
                return output;
              });
            });
          }
        },
        {
          /*
          * From logic tokens.
          *
          * Format: {% from "template.twig" import func as form %}
          */
          type: Twig.logic.type.from,
          regex: /^from\s+(.+)\s+import\s+([a-zA-Z0-9_, ]+)$/,
          next: [],
          open: true,
          compile(token) {
            const expression = token.match[1].trim();
            const macroExpressions = token.match[2].trim().split(/\s*,\s*/);
            const macroNames = {};
            for (const res of macroExpressions) {
              const macroMatch = res.match(/^(\w+)\s+as\s+(\w+)$/);
              if (macroMatch) {
                macroNames[macroMatch[1].trim()] = macroMatch[2].trim();
              } else if (res.match(/^(\w+)$/)) {
                macroNames[res] = res;
              } else {
              }
            }
            delete token.match;
            token.expression = expression;
            token.macroNames = macroNames;
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            return token;
          },
          parse(token, context, chain) {
            const state = this;
            let promise;
            if (token.expression === "_self") {
              promise = Twig.Promise.resolve(state.macros);
            } else {
              promise = Twig.expression.parseAsync.call(state, token.stack, context).then((filePath) => {
                return state.template.importFile(filePath || token.expression);
              }).then((importTemplate) => {
                const importState = new Twig.ParseState(importTemplate);
                return importState.parseAsync(importTemplate.tokens).then(() => {
                  return importState.macros;
                });
              });
            }
            return promise.then((macros) => {
              for (const macroName in token.macroNames) {
                if (macros[macroName] !== void 0) {
                  context[token.macroNames[macroName]] = macros[macroName];
                }
              }
              return {
                chain,
                output: ""
              };
            });
          }
        },
        {
          /**
           * The embed tag combines the behaviour of include and extends.
           * It allows you to include another template's contents, just like include does.
           *
           *  Format: {% embed "template.twig" [with {some: 'values'} only] %}
           */
          type: Twig.logic.type.embed,
          regex: /^embed\s+(.+?)(?:\s+(ignore missing))?(?:\s+with\s+([\S\s]+?))?(?:\s+(only))?$/,
          next: [
            Twig.logic.type.endembed
          ],
          open: true,
          compile(token) {
            const { match } = token;
            const expression = match[1].trim();
            const ignoreMissing = match[2] !== void 0;
            const withContext = match[3];
            const only = match[4] !== void 0 && match[4].length;
            delete token.match;
            token.only = only;
            token.ignoreMissing = ignoreMissing;
            token.stack = Twig.expression.compile.call(this, {
              type: Twig.expression.type.expression,
              value: expression
            }).stack;
            if (withContext !== void 0) {
              token.withStack = Twig.expression.compile.call(this, {
                type: Twig.expression.type.expression,
                value: withContext.trim()
              }).stack;
            }
            return token;
          },
          parse(token, context, chain) {
            let embedContext = {};
            let promise = Twig.Promise.resolve();
            let state = this;
            if (!token.only) {
              embedContext = { ...context };
            }
            if (token.withStack !== void 0) {
              promise = Twig.expression.parseAsync.call(state, token.withStack, context).then((withContext) => {
                embedContext = { ...embedContext, ...withContext };
              });
            }
            return promise.then(() => {
              return Twig.expression.parseAsync.call(state, token.stack, embedContext);
            }).then((fileName) => {
              const embedOverrideTemplate = new Twig.Template({
                data: token.output,
                base: state.template.base,
                path: state.template.path,
                url: state.template.url,
                name: state.template.name,
                method: state.template.method,
                options: state.template.options
              });
              try {
                embedOverrideTemplate.importFile(fileName);
              } catch (error) {
                if (token.ignoreMissing) {
                  return "";
                }
                state = null;
                throw error;
              }
              embedOverrideTemplate.parentTemplate = fileName;
              return embedOverrideTemplate.renderAsync(
                embedContext,
                {
                  isInclude: true
                }
              );
            }).then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        /* Add the {% endembed %} token
         *
         */
        {
          type: Twig.logic.type.endembed,
          regex: /^endembed$/,
          next: [],
          open: false
        },
        {
          /**
           * Block logic tokens.
           *
           *  Format: {% with {some: 'values'} [only] %}
           */
          type: Twig.logic.type.with,
          regex: /^(?:with(?:\s+([\S\s]+?))?)(?:\s|$)(only)?$/,
          next: [
            Twig.logic.type.endwith
          ],
          open: true,
          compile(token) {
            const { match } = token;
            const withContext = match[1];
            const only = match[2] !== void 0 && match[2].length;
            delete token.match;
            token.only = only;
            if (withContext !== void 0) {
              token.withStack = Twig.expression.compile.call(this, {
                type: Twig.expression.type.expression,
                value: withContext.trim()
              }).stack;
            }
            return token;
          },
          parse(token, context, chain) {
            let innerContext = {};
            let i;
            const state = this;
            let promise = Twig.Promise.resolve();
            if (!token.only) {
              innerContext = { ...context };
            }
            if (token.withStack !== void 0) {
              promise = Twig.expression.parseAsync.call(state, token.withStack, context).then((withContext) => {
                for (i in withContext) {
                  if (Object.hasOwnProperty.call(withContext, i)) {
                    innerContext[i] = withContext[i];
                  }
                }
              });
            }
            const isolatedState = new Twig.ParseState(state.template, void 0, innerContext);
            return promise.then(() => {
              return isolatedState.parseAsync(token.output);
            }).then((output) => {
              return {
                chain,
                output
              };
            });
          }
        },
        {
          type: Twig.logic.type.endwith,
          regex: /^endwith$/,
          next: [],
          open: false
        },
        {
          /**
           * Deprecated type logic tokens.
           *
           *  Format: {% deprecated 'Description' %}
           */
          type: Twig.logic.type.deprecated,
          regex: /^deprecated\s+(.+)$/,
          next: [],
          open: true,
          compile(token) {
            console.warn("Deprecation notice: " + token.match[1]);
            return token;
          },
          parse() {
            return {};
          }
        }
      ];
      Twig.logic.handler = {};
      Twig.logic.extendType = function(type, value) {
        value = value || "Twig.logic.type" + type;
        Twig.logic.type[type] = value;
      };
      Twig.logic.extend = function(definition) {
        if (definition.type) {
          Twig.logic.extendType(definition.type);
        } else {
          throw new Twig.Error("Unable to extend logic definition. No type provided for " + definition);
        }
        Twig.logic.handler[definition.type] = definition;
      };
      while (Twig.logic.definitions.length > 0) {
        Twig.logic.extend(Twig.logic.definitions.shift());
      }
      Twig.logic.compile = function(rawToken) {
        const expression = rawToken.value.trim();
        let token = Twig.logic.tokenize.call(this, expression);
        const tokenTemplate = Twig.logic.handler[token.type];
        if (tokenTemplate.compile) {
          token = tokenTemplate.compile.call(this, token);
          Twig.log.trace("Twig.logic.compile: ", "Compiled logic token to ", token);
        }
        return token;
      };
      Twig.logic.tokenize = function(expression) {
        let tokenTemplateType = null;
        let tokenType = null;
        let tokenRegex = null;
        let regexArray = null;
        let regexLen = null;
        let regexI = null;
        let match = null;
        expression = expression.trim();
        for (tokenTemplateType in Twig.logic.handler) {
          if (Object.hasOwnProperty.call(Twig.logic.handler, tokenTemplateType)) {
            tokenType = Twig.logic.handler[tokenTemplateType].type;
            tokenRegex = Twig.logic.handler[tokenTemplateType].regex;
            regexArray = tokenRegex;
            if (!Array.isArray(tokenRegex)) {
              regexArray = [tokenRegex];
            }
            regexLen = regexArray.length;
            for (regexI = 0; regexI < regexLen; regexI++) {
              match = regexArray[regexI].exec(expression);
              if (match !== null) {
                Twig.log.trace("Twig.logic.tokenize: ", "Matched a ", tokenType, " regular expression of ", match);
                return {
                  type: tokenType,
                  match
                };
              }
            }
          }
        }
        throw new Twig.Error("Unable to parse '" + expression.trim() + "'");
      };
      Twig.logic.parse = function(token, context, chain, allowAsync) {
        return Twig.async.potentiallyAsync(this, allowAsync, function() {
          Twig.log.debug("Twig.logic.parse: ", "Parsing logic token ", token);
          const tokenTemplate = Twig.logic.handler[token.type];
          let result;
          const state = this;
          if (!tokenTemplate.parse) {
            return "";
          }
          state.nestingStack.unshift(token);
          result = tokenTemplate.parse.call(state, token, context || {}, chain);
          if (Twig.isPromise(result)) {
            result = result.then((result2) => {
              state.nestingStack.shift();
              return result2;
            });
          } else {
            state.nestingStack.shift();
          }
          return result;
        });
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.parser.source.js
var require_twig_parser_source = __commonJS({
  "../node_modules/twig/src/twig.parser.source.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.Templates.registerParser("source", (params) => {
        return params.data || "";
      });
    };
  }
});

// ../node_modules/twig/src/twig.parser.twig.js
var require_twig_parser_twig = __commonJS({
  "../node_modules/twig/src/twig.parser.twig.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.Templates.registerParser("twig", (params) => {
        return new Twig.Template(params);
      });
    };
  }
});

// ../node_modules/twig/src/twig.path.js
import path from "https://cdn.jsdelivr.net/npm/path-browserify-esm/index.esm.js";
var require_twig_path = __commonJS({
  "../node_modules/twig/src/twig.path.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.path = {};
      Twig.path.expandNamespace = function(namespaces, path2) {
        const namespaceIdentifiers = Object.keys(namespaces);
        const pattern = new RegExp(`^(?:@(${namespaceIdentifiers.join("|")})/|(${namespaceIdentifiers.join("|")})::)`);
        return path2.replace(pattern, (wholeMatch, atNamespace, colonNamespace) => {
          const namespaceIdentifier = atNamespace === void 0 ? colonNamespace : atNamespace;
          return `${namespaces[namespaceIdentifier]}/`;
        });
      };
      Twig.path.parsePath = function(template, _file) {
        const { namespaces } = template.options;
        const file = _file || "";
        const hasNamespaces = namespaces && typeof namespaces === "object";
        let path2 = hasNamespaces ? Twig.path.expandNamespace(namespaces, file) : file;
        if (path2 === file) {
          path2 = Twig.path.relativePath(template, file);
        }
        return path2;
      };
      Twig.path.relativePath = function(template, _file) {
        let base;
        let basePath;
        let sepChr = "/";
        const newPath = [];
        let file = _file || "";
        let val;
        if (template.url) {
          if (typeof template.base === "undefined") {
            base = template.url;
          } else {
            base = template.base.replace(/([^/])$/, "$1/");
          }
        } else if (template.path) {
          const sep = path.sep || sepChr;
          const relative = new RegExp("^\\.{1,2}" + sep.replace("\\", "\\\\"));
          file = file.replace(/\//g, sep);
          if (template.base !== void 0 && file.match(relative) === null) {
            file = file.replace(template.base, "");
            base = template.base + sep;
          } else {
            base = path.normalize(template.path);
          }
          base = base.replace(sep + sep, sep);
          sepChr = sep;
        } else if ((template.name || template.id) && template.method && template.method !== "fs" && template.method !== "ajax") {
          base = template.base || template.name || template.id;
        } else {
          throw new Twig.Error("Cannot extend an inline template.");
        }
        basePath = base.split(sepChr);
        basePath.pop();
        basePath = basePath.concat(file.split(sepChr));
        while (basePath.length > 0) {
          val = basePath.shift();
          if (val === ".") {
          } else if (val === ".." && newPath.length > 0 && newPath[newPath.length - 1] !== "..") {
            newPath.pop();
          } else {
            newPath.push(val);
          }
        }
        return newPath.join(sepChr);
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.tests.js
var require_twig_tests = __commonJS({
  "../node_modules/twig/src/twig.tests.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.tests = {
        empty(value) {
          if (value === true) {
            return false;
          }
          if (value === null || value === void 0) {
            return true;
          }
          if (typeof value === "number") {
            return false;
          }
          if (value.length > 0) {
            return false;
          }
          for (const key in value) {
            if (Object.hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        },
        odd(value) {
          return value % 2 === 1;
        },
        even(value) {
          return value % 2 === 0;
        },
        "divisible by"(value, params) {
          return value % params[0] === 0;
        },
        divisibleby(value, params) {
          console.warn("`divisibleby` is deprecated use `divisible by`");
          return Twig.tests["divisible by"](value, params);
        },
        defined(value) {
          return value !== void 0;
        },
        none(value) {
          return value === null;
        },
        null(value) {
          return this.none(value);
        },
        "same as"(value, params) {
          return value === params[0];
        },
        sameas(value, params) {
          console.warn("`sameas` is deprecated use `same as`");
          return Twig.tests["same as"](value, params);
        },
        iterable(value) {
          return value && (Twig.lib.is("Array", value) || Twig.lib.is("Object", value));
        }
        /*
        Constant ?
         */
      };
      Twig.test = function(test, value, params) {
        if (!Twig.tests[test]) {
          throw Twig.Error("Test " + test + " is not defined.");
        }
        return Twig.tests[test](value, params);
      };
      Twig.test.extend = function(test, definition) {
        Twig.tests[test] = definition;
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.async.js
var require_twig_async = __commonJS({
  "../node_modules/twig/src/twig.async.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      const STATE_UNKNOWN = 0;
      const STATE_RESOLVED = 1;
      const STATE_REJECTED = 2;
      Twig.ParseState.prototype.parseAsync = function(tokens, context) {
        return this.parse(tokens, context, true);
      };
      Twig.expression.parseAsync = function(tokens, context, tokensAreParameters) {
        const state = this;
        return Twig.expression.parse.call(state, tokens, context, tokensAreParameters, true);
      };
      Twig.logic.parseAsync = function(token, context, chain) {
        const state = this;
        return Twig.logic.parse.call(state, token, context, chain, true);
      };
      Twig.Template.prototype.renderAsync = function(context, params) {
        return this.render(context, params, true);
      };
      Twig.async = {};
      Twig.isPromise = function(obj) {
        return obj && obj.then && typeof obj.then === "function";
      };
      function potentiallyAsyncSlow(that, allowAsync, action) {
        let result = action.call(that);
        let err = null;
        let isAsync = true;
        if (!Twig.isPromise(result)) {
          return result;
        }
        result.then((res) => {
          result = res;
          isAsync = false;
        }).catch((error) => {
          err = error;
        });
        if (err !== null) {
          throw err;
        }
        if (isAsync) {
          throw new Twig.Error("You are using Twig.js in sync mode in combination with async extensions.");
        }
        return result;
      }
      __name(potentiallyAsyncSlow, "potentiallyAsyncSlow");
      Twig.async.potentiallyAsync = function(that, allowAsync, action) {
        if (allowAsync) {
          return Twig.Promise.resolve(action.call(that));
        }
        return potentiallyAsyncSlow(that, allowAsync, action);
      };
      function run(fn, resolve, reject) {
        try {
          fn(resolve, reject);
        } catch (error) {
          reject(error);
        }
      }
      __name(run, "run");
      function pending(handlers, onResolved, onRejected) {
        const h = [onResolved, onRejected, -2];
        if (!handlers) {
          handlers = h;
        } else if (handlers[2] === -2) {
          handlers = [handlers, h];
        } else {
          handlers.push(h);
        }
        return handlers;
      }
      __name(pending, "pending");
      Twig.Thenable = function(then, value, state) {
        this.then = then;
        this._value = state ? value : null;
        this._state = state || STATE_UNKNOWN;
      };
      Twig.Thenable.prototype.catch = function(onRejected) {
        if (this._state === STATE_RESOLVED) {
          return this;
        }
        return this.then(null, onRejected);
      };
      Twig.Thenable.resolvedThen = function(onResolved) {
        try {
          return Twig.Promise.resolve(onResolved(this._value));
        } catch (error) {
          return Twig.Promise.reject(error);
        }
      };
      Twig.Thenable.rejectedThen = function(onResolved, onRejected) {
        if (!onRejected || typeof onRejected !== "function") {
          return this;
        }
        const value = this._value;
        let result;
        try {
          result = onRejected(value);
        } catch (error) {
          result = Twig.Promise.reject(error);
        }
        return Twig.Promise.resolve(result);
      };
      Twig.Promise = function(executor) {
        let state = STATE_UNKNOWN;
        let value = null;
        let changeState = /* @__PURE__ */ __name(function(nextState, nextValue) {
          state = nextState;
          value = nextValue;
        }, "changeState");
        function onReady(v) {
          changeState(STATE_RESOLVED, v);
        }
        __name(onReady, "onReady");
        function onReject(e) {
          changeState(STATE_REJECTED, e);
        }
        __name(onReject, "onReject");
        run(executor, onReady, onReject);
        if (state === STATE_RESOLVED) {
          return Twig.Promise.resolve(value);
        }
        if (state === STATE_REJECTED) {
          return Twig.Promise.reject(value);
        }
        changeState = new Twig.FullPromise();
        return changeState.promise;
      };
      Twig.FullPromise = function() {
        let handlers = null;
        function resolved(onResolved) {
          onResolved(p._value);
        }
        __name(resolved, "resolved");
        function rejected(onResolved, onRejected) {
          onRejected(p._value);
        }
        __name(rejected, "rejected");
        let append = /* @__PURE__ */ __name(function(onResolved, onRejected) {
          handlers = pending(handlers, onResolved, onRejected);
        }, "append");
        function changeState(newState, v) {
          if (p._state) {
            return;
          }
          p._value = v;
          p._state = newState;
          append = newState === STATE_RESOLVED ? resolved : rejected;
          if (!handlers) {
            return;
          }
          if (handlers[2] === -2) {
            append(handlers[0], handlers[1]);
            handlers = null;
            return;
          }
          handlers.forEach((h) => {
            append(h[0], h[1]);
          });
          handlers = null;
        }
        __name(changeState, "changeState");
        const p = new Twig.Thenable((onResolved, onRejected) => {
          const hasResolved = typeof onResolved === "function";
          if (p._state === STATE_RESOLVED && !hasResolved) {
            return Twig.Promise.resolve(p._value);
          }
          if (p._state === STATE_RESOLVED) {
            try {
              return Twig.Promise.resolve(onResolved(p._value));
            } catch (error) {
              return Twig.Promise.reject(error);
            }
          }
          const hasRejected = typeof onRejected === "function";
          return new Twig.Promise((resolve, reject) => {
            append(
              hasResolved ? (result) => {
                try {
                  resolve(onResolved(result));
                } catch (error) {
                  reject(error);
                }
              } : resolve,
              hasRejected ? (err) => {
                try {
                  resolve(onRejected(err));
                } catch (error) {
                  reject(error);
                }
              } : reject
            );
          });
        });
        changeState.promise = p;
        return changeState;
      };
      Twig.Promise.defaultResolved = new Twig.Thenable(Twig.Thenable.resolvedThen, void 0, STATE_RESOLVED);
      Twig.Promise.emptyStringResolved = new Twig.Thenable(Twig.Thenable.resolvedThen, "", STATE_RESOLVED);
      Twig.Promise.resolve = function(value) {
        if (arguments.length === 0 || typeof value === "undefined") {
          return Twig.Promise.defaultResolved;
        }
        if (Twig.isPromise(value)) {
          return value;
        }
        if (value === "") {
          return Twig.Promise.emptyStringResolved;
        }
        return new Twig.Thenable(Twig.Thenable.resolvedThen, value, STATE_RESOLVED);
      };
      Twig.Promise.reject = function(e) {
        return new Twig.Thenable(Twig.Thenable.rejectedThen, e, STATE_REJECTED);
      };
      Twig.Promise.all = function(promises) {
        const results = new Array(promises.length);
        return Twig.async.forEach(promises, (p, index) => {
          if (!Twig.isPromise(p)) {
            results[index] = p;
            return;
          }
          if (p._state === STATE_RESOLVED) {
            results[index] = p._value;
            return;
          }
          return p.then((v) => {
            results[index] = v;
          });
        }).then(() => {
          return results;
        });
      };
      Twig.async.forEach = function(arr, callback) {
        const len = arr ? arr.length : 0;
        let index = 0;
        function next() {
          let resp = null;
          do {
            if (index === len) {
              return Twig.Promise.resolve();
            }
            resp = callback(arr[index], index);
            index++;
          } while (!resp || !Twig.isPromise(resp) || resp._state === STATE_RESOLVED);
          return resp.then(next);
        }
        __name(next, "next");
        return next();
      };
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.exports.js
var require_twig_exports = __commonJS({
  "../node_modules/twig/src/twig.exports.js"(exports, module) {
    module.exports = function(Twig) {
      "use strict";
      Twig.exports = {
        VERSION: Twig.VERSION
      };
      Twig.exports.twig = function(params) {
        "use strict";
        const { id } = params;
        const options = {
          strictVariables: params.strict_variables || false,
          // TODO: turn autoscape on in the next major version
          autoescape: params.autoescape !== null && params.autoescape || false,
          allowInlineIncludes: params.allowInlineIncludes || false,
          rethrow: params.rethrow || false,
          namespaces: params.namespaces
        };
        if (Twig.cache && id) {
          Twig.validateId(id);
        }
        if (params.debug !== void 0) {
          Twig.debug = params.debug;
        }
        if (params.trace !== void 0) {
          Twig.trace = params.trace;
        }
        if (params.data !== void 0) {
          return Twig.Templates.parsers.twig({
            data: params.data,
            path: Object.hasOwnProperty.call(params, "path") ? params.path : void 0,
            module: params.module,
            id,
            options
          });
        }
        if (params.ref !== void 0) {
          if (params.id !== void 0) {
            throw new Twig.Error("Both ref and id cannot be set on a twig.js template.");
          }
          return Twig.Templates.load(params.ref);
        }
        if (params.method !== void 0) {
          if (!Twig.Templates.isRegisteredLoader(params.method)) {
            throw new Twig.Error('Loader for "' + params.method + '" is not defined.');
          }
          return Twig.Templates.loadRemote(params.name || params.href || params.path || id || void 0, {
            id,
            method: params.method,
            parser: params.parser || "twig",
            base: params.base,
            module: params.module,
            precompiled: params.precompiled,
            async: params.async,
            options
          }, params.load, params.error);
        }
        if (params.href !== void 0) {
          return Twig.Templates.loadRemote(params.href, {
            id,
            method: "ajax",
            parser: params.parser || "twig",
            base: params.base,
            module: params.module,
            precompiled: params.precompiled,
            async: params.async,
            options
          }, params.load, params.error);
        }
        if (params.path !== void 0) {
          return Twig.Templates.loadRemote(params.path, {
            id,
            method: "fs",
            parser: params.parser || "twig",
            base: params.base,
            module: params.module,
            precompiled: params.precompiled,
            async: params.async,
            options
          }, params.load, params.error);
        }
      };
      Twig.exports.extendFilter = function(filter, definition) {
        Twig.filter.extend(filter, definition);
      };
      Twig.exports.extendFunction = function(fn, definition) {
        Twig._function.extend(fn, definition);
      };
      Twig.exports.extendTest = function(test, definition) {
        Twig.test.extend(test, definition);
      };
      Twig.exports.extendTag = function(definition) {
        Twig.logic.extend(definition);
      };
      Twig.exports.extend = function(fn) {
        fn(Twig);
      };
      Twig.exports.compile = function(markup, options) {
        const id = options.filename;
        const path2 = options.filename;
        const template = new Twig.Template({
          data: markup,
          path: path2,
          id,
          options: options.settings["twig options"]
        });
        return function(context) {
          return template.render(context);
        };
      };
      Twig.exports.renderFile = function(path2, options, fn) {
        if (typeof options === "function") {
          fn = options;
          options = {};
        }
        options = options || {};
        const settings = options.settings || {};
        const viewOptions = settings["twig options"];
        const params = {
          path: path2,
          base: settings.views,
          load(template) {
            if (!viewOptions || !viewOptions.allowAsync) {
              fn(null, String(template.render(options)));
              return;
            }
            template.renderAsync(options).then((out) => fn(null, out), fn);
          },
          error(err) {
            fn(err);
          }
        };
        if (viewOptions) {
          for (const option in viewOptions) {
            if (Object.hasOwnProperty.call(viewOptions, option)) {
              params[option] = viewOptions[option];
            }
          }
        }
        Twig.exports.twig(params);
      };
      Twig.exports.__express = Twig.exports.renderFile;
      Twig.exports.cache = function(cache) {
        Twig.cache = cache;
      };
      Twig.exports.path = Twig.path;
      Twig.exports.filters = Twig.filters;
      Twig.exports.tests = Twig.tests;
      Twig.exports.functions = Twig.functions;
      Twig.exports.Promise = Twig.Promise;
      return Twig;
    };
  }
});

// ../node_modules/twig/src/twig.factory.js
var require_twig_factory = __commonJS({
  "../node_modules/twig/src/twig.factory.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function factory() {
      const Twig = {
        VERSION: "1.17.1"
      };
      require_twig_core()(Twig);
      require_twig_compiler()(Twig);
      require_twig_expression()(Twig);
      require_twig_filters()(Twig);
      require_twig_functions()(Twig);
      require_twig_lib()(Twig);
      require_twig_loader_ajax()(Twig);
      require_twig_loader_fs()(Twig);
      require_twig_logic()(Twig);
      require_twig_parser_source()(Twig);
      require_twig_parser_twig()(Twig);
      require_twig_path()(Twig);
      require_twig_tests()(Twig);
      require_twig_async()(Twig);
      require_twig_exports()(Twig);
      Twig.exports.factory = factory;
      return Twig.exports;
    }, "factory");
  }
});

// ../node_modules/twig/src/twig.js
var require_twig = __commonJS({
  "../node_modules/twig/src/twig.js"(exports, module) {
    module.exports = require_twig_factory()();
  }
});

// modules/dep-solar-system-twig.js
var dep_solar_system_twig_exports = {};
__reExport(dep_solar_system_twig_exports, __toESM(require_twig(), 1));
/*! Bundled license information:

twig/src/twig.js:
  (**
   * Twig.js
   *
   * @copyright 2011-2020 John Roepke and the Twig.js Contributors
   * @license   Available under the BSD 2-Clause License
   * @link      https://github.com/twigjs/twig.js
   *)
*/
//# sourceMappingURL=lib-solar-system-twig.js.map
