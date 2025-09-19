"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameworkUtils = exports.globalSharedContext = exports.globalEventBus = exports.SharedContextImpl = exports.EventBusImpl = void 0;
/**
 * A simple event bus for cross-framework communication
 * @example
 * // JavaScript
 * const bus = new EventBusImpl();
 * bus.on('data', (data) => console.log(data));
 * bus.emit('data', { message: 'Hello' });
 *
 * // TypeScript
 * import { EventBusImpl } from '@react-angular-fusion/core';
 * const bus = new EventBusImpl();
 * bus.on('userUpdate', (user: User) => updateUI(user));
 */
var EventBusImpl = /** @class */ (function () {
    function EventBusImpl() {
        this.events = new Map();
    }
    EventBusImpl.prototype.on = function (event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    };
    EventBusImpl.prototype.off = function (event, callback) {
        var callbacks = this.events.get(event);
        if (!callbacks)
            return;
        this.events.set(event, callbacks.filter(function (cb) { return cb !== callback; }));
    };
    EventBusImpl.prototype.emit = function (event, data) {
        var callbacks = this.events.get(event);
        if (!callbacks)
            return;
        // Create a copy to avoid issues if callbacks are removed during iteration
        var callbacksCopy = __spreadArray([], callbacks, true);
        callbacksCopy.forEach(function (callback) {
            try {
                callback(data);
            }
            catch (error) {
                console.error("Error in event handler for ".concat(event, ":"), error);
            }
        });
    };
    EventBusImpl.prototype.once = function (event, callback) {
        var _this = this;
        var onceWrapper = function (data) {
            _this.off(event, onceWrapper);
            callback(data);
        };
        this.on(event, onceWrapper);
    };
    EventBusImpl.prototype.removeAllListeners = function (event) {
        if (event) {
            this.events.delete(event);
        }
        else {
            this.events.clear();
        }
    };
    return EventBusImpl;
}());
exports.EventBusImpl = EventBusImpl;
/**
 * Shared context for global state management between frameworks
 * @example
 * // JavaScript
 * const context = new SharedContextImpl();
 * context.set('user', { name: 'John' });
 * const user = context.get('user');
 *
 * // TypeScript
 * import { SharedContextImpl } from '@react-angular-fusion/core';
 * interface User { name: string; }
 * const context = new SharedContextImpl();
 * context.set<User>('user', { name: 'John' });
 */
var SharedContextImpl = /** @class */ (function () {
    function SharedContextImpl() {
        this.data = new Map();
        this.watchers = new Map();
    }
    SharedContextImpl.prototype.set = function (key, value) {
        this.data.set(key, value);
        this.notifyWatchers(key, value);
    };
    SharedContextImpl.prototype.get = function (key) {
        return this.data.get(key);
    };
    SharedContextImpl.prototype.watch = function (key, callback) {
        var _this = this;
        if (!this.watchers.has(key)) {
            this.watchers.set(key, []);
        }
        this.watchers.get(key).push(callback);
        // Return unsubscribe function
        return function () {
            var callbacks = _this.watchers.get(key);
            if (callbacks) {
                _this.watchers.set(key, callbacks.filter(function (cb) { return cb !== callback; }));
            }
        };
    };
    SharedContextImpl.prototype.remove = function (key) {
        this.data.delete(key);
        this.watchers.delete(key);
    };
    SharedContextImpl.prototype.clear = function () {
        this.data.clear();
        this.watchers.clear();
    };
    SharedContextImpl.prototype.has = function (key) {
        return this.data.has(key);
    };
    SharedContextImpl.prototype.keys = function () {
        return Array.from(this.data.keys());
    };
    SharedContextImpl.prototype.notifyWatchers = function (key, value) {
        var callbacks = this.watchers.get(key);
        if (!callbacks)
            return;
        // Create a copy to avoid issues if callbacks are removed during iteration
        var callbacksCopy = __spreadArray([], callbacks, true);
        callbacksCopy.forEach(function (callback) {
            try {
                callback(value);
            }
            catch (error) {
                console.error("Error in watcher for ".concat(key, ":"), error);
            }
        });
    };
    return SharedContextImpl;
}());
exports.SharedContextImpl = SharedContextImpl;
// Singleton instances for global access
exports.globalEventBus = new EventBusImpl();
exports.globalSharedContext = new SharedContextImpl();
// Utility functions
exports.frameworkUtils = {
    /**
     * Check if running in a browser environment
     */
    isBrowser: function () {
        return typeof window !== 'undefined' && typeof document !== 'undefined';
    },
    /**
     * Check if running in a server environment
     */
    isServer: function () {
        return !exports.frameworkUtils.isBrowser();
    },
    /**
     * Safe JSON stringify with error handling
     */
    safeStringify: function (obj, indent) {
        try {
            return JSON.stringify(obj, null, indent);
        }
        catch (error) {
            console.error('Error stringifying object:', error);
            return '{}';
        }
    },
    /**
     * Safe JSON parse with error handling
     */
    safeParse: function (json, defaultValue) {
        try {
            return JSON.parse(json);
        }
        catch (error) {
            console.error('Error parsing JSON:', error);
            return defaultValue;
        }
    }
};
var fusionCore = {
    EventBus: EventBusImpl,
    SharedContext: SharedContextImpl,
    globalEventBus: exports.globalEventBus,
    globalSharedContext: exports.globalSharedContext,
    frameworkUtils: exports.frameworkUtils
};
exports.default = fusionCore;
