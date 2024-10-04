var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// modules/navigation-polyfill/src/NavigateEvent.ts
var NavigateEvent = class extends Event {
  static {
    __name(this, "NavigateEvent");
  }
  constructor(type, options) {
    const { navigationType, destination, ...eventInit } = options;
    super(
      type,
      Object.assign(
        {
          bubbles: false,
          cancelable: true
        },
        eventInit
      )
    );
    this.navigationType = navigationType;
    this.destination = destination;
  }
};

// modules/navigation-polyfill/src/constants.ts
var NAVIGATION_STATE_KEY = "__navigation__";
var NAVIGATION_HISTORY_ENTRY_STATE_KEY = "__navigation_history_entry__";
var NAVIGATION_HISTORY_STACK_CACHE_KEY = "navigation_history_stack";
var NAVIGATION_HISTORY_ENTRY_STATE_CACHE_KEY = "navigation_history_entry_state";

// modules/navigation-polyfill/src/utils.ts
function createKey() {
  return Math.random().toString(36).substring(2, 10);
}
__name(createKey, "createKey");

// modules/navigation-polyfill/src/NavigationHistoryEntry.ts
function getNavigationHitoryEntryStateCacheKey(key) {
  return `${NAVIGATION_HISTORY_ENTRY_STATE_CACHE_KEY}_${key}`;
}
__name(getNavigationHitoryEntryStateCacheKey, "getNavigationHitoryEntryStateCacheKey");
function getNavigationHistoryEntryState(key) {
  const stateCacheKey = getNavigationHitoryEntryStateCacheKey(key);
  const stateCache = sessionStorage.getItem(stateCacheKey);
  if (stateCache) {
    try {
      return JSON.parse(stateCache);
    } catch (error) {
    }
  }
  return void 0;
}
__name(getNavigationHistoryEntryState, "getNavigationHistoryEntryState");
function setNavigationHistoryEntryState(key, state) {
  const stateCacheKey = getNavigationHitoryEntryStateCacheKey(key);
  if (state === null || state === void 0) {
    sessionStorage.removeItem(stateCacheKey);
  } else {
    const stateCache = JSON.stringify(state);
    sessionStorage.setItem(stateCacheKey, stateCache);
  }
}
__name(setNavigationHistoryEntryState, "setNavigationHistoryEntryState");
var NavigationHistoryEntry = class {
  static {
    __name(this, "NavigationHistoryEntry");
  }
  constructor(index, url, key, id) {
    this.index = index;
    this.url = url;
    this.key = key ?? createKey();
    this.id = id ?? createKey();
  }
  toJSON() {
    return {
      index: this.index,
      url: this.url,
      key: this.key,
      id: this.id
    };
  }
  getState() {
    return getNavigationHistoryEntryState(this.key);
  }
};

// modules/navigation-polyfill/src/NavigationHistoryStack.ts
function getNavigationHistoryStackCacheKey(navigation2) {
  return `${NAVIGATION_HISTORY_STACK_CACHE_KEY}_${navigation2.key}`;
}
__name(getNavigationHistoryStackCacheKey, "getNavigationHistoryStackCacheKey");
var NavigationHistoryStack = class {
  static {
    __name(this, "NavigationHistoryStack");
  }
  constructor(navigation2) {
    this.navigation = navigation2;
    let stack = [];
    try {
      stack = JSON.parse(
        sessionStorage.getItem(
          getNavigationHistoryStackCacheKey(navigation2)
        ) || "[]"
      ).map((entryCache, index) => {
        return new NavigationHistoryEntry(
          entryCache.index,
          entryCache.url,
          entryCache.key,
          entryCache.id
        );
      });
    } catch (error) {
      stack = [];
    }
    this.stack = stack;
  }
  entries() {
    return this.stack;
  }
  push(entry) {
    try {
      this.stack = this.stack.slice(0, entry.index);
      this.stack.push(entry);
      sessionStorage.setItem(
        getNavigationHistoryStackCacheKey(this.navigation),
        JSON.stringify(this.stack)
      );
    } catch (error) {
    }
  }
  replace(entry) {
    this.stack.splice(entry.index, 1, entry);
    try {
      sessionStorage.setItem(
        getNavigationHistoryStackCacheKey(this.navigation),
        JSON.stringify(this.stack)
      );
    } catch (error) {
    }
  }
};

// modules/navigation-polyfill/src/Navigation.ts
var nativePushState = History.prototype.pushState;
var nativeReplaceState = History.prototype.replaceState;
function createNavigationHistoryState(state, navigation2, entry) {
  return Object.assign({}, state, {
    [NAVIGATION_STATE_KEY]: navigation2.key,
    [NAVIGATION_HISTORY_ENTRY_STATE_KEY]: entry.key
  });
}
__name(createNavigationHistoryState, "createNavigationHistoryState");
function getNavigationCurrentEntryKey() {
  return history.state?.[NAVIGATION_HISTORY_ENTRY_STATE_KEY];
}
__name(getNavigationCurrentEntryKey, "getNavigationCurrentEntryKey");
function getNavigationEntry(entries, entryKey = getNavigationCurrentEntryKey()) {
  let matchedEntry = entries[entries.length - 1];
  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index];
    if (entry.key === entryKey) {
      matchedEntry = entry;
    }
  }
  return matchedEntry;
}
__name(getNavigationEntry, "getNavigationEntry");
var Navigation = class extends EventTarget {
  static {
    __name(this, "Navigation");
  }
  constructor() {
    super();
    const cacheKey = history.state?.[NAVIGATION_STATE_KEY];
    const key = cacheKey ?? createKey();
    const shouldInit = cacheKey !== key;
    this.key = key;
    this.entryStack = new NavigationHistoryStack(this);
    if (shouldInit) {
      const entry = new NavigationHistoryEntry(
        0,
        location.pathname + location.search + location.hash
      );
      nativeReplaceState.call(
        history,
        createNavigationHistoryState(history.state, this, entry),
        "",
        location.pathname + location.search + location.hash
      );
      this.entryStack.push(entry);
    }
    this.currentEntry = getNavigationEntry(this.entryStack.entries());
    const that = this;
    History.prototype.pushState = function(data, unused, url) {
      const entry = new NavigationHistoryEntry(that.currentEntry.index + 1, url);
      const navigateEvent = new NavigateEvent("navigate", {
        navigationType: "push",
        destination: entry
      });
      that.dispatchEvent(navigateEvent);
      if (!navigateEvent.defaultPrevented) {
        const state = createNavigationHistoryState(data, that, entry);
        nativePushState.call(this, state, unused, url);
        that.entryStack.push(entry);
        that.currentEntry = entry;
      }
    };
    History.prototype.replaceState = function(data, unused, url) {
      const entry = new NavigationHistoryEntry(
        that.currentEntry.index,
        url,
        navigation.currentEntry.key
      );
      const navigateEvent = new NavigateEvent("navigate", {
        navigationType: "replace",
        destination: entry
      });
      that.dispatchEvent(navigateEvent);
      if (!navigateEvent.defaultPrevented) {
        const state = createNavigationHistoryState(data, that, entry);
        nativeReplaceState.call(this, state, unused, url);
        that.entryStack.replace(entry);
        that.currentEntry = entry;
      }
    };
    window.addEventListener("popstate", function(event) {
      const entryKey = event.state[NAVIGATION_HISTORY_ENTRY_STATE_KEY];
      const entry = getNavigationEntry(that.entries(), entryKey);
      that.currentEntry = entry;
      const navigateEvent = new NavigateEvent("navigate", {
        navigationType: "traverse",
        destination: entry,
        cancelable: false
      });
      that.dispatchEvent(navigateEvent);
    });
  }
  updateCurrentEntry(options) {
    setNavigationHistoryEntryState(this.currentEntry.key, options.state);
  }
  entries() {
    return this.entryStack.entries();
  }
};
var navigation = new Navigation();

// modules/navigation-polyfill/src/index.ts
var src_default = navigation;
export {
  src_default as navigation
};
//# sourceMappingURL=lib-navigation.js.map
