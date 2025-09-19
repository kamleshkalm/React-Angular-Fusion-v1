"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularWrapper = exports.AngularWrapperInternal = void 0;
var react_1 = require("react");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var src_1 = require("../../../core/src");
// Simple Angular component for demonstration
var AngularWrapperInternal = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'angular-wrapper-internal',
            template: "\n    <div style=\"border: 2px solid blue; padding: 16px; margin: 16px; border-radius: 8px;\">\n      <h3 style=\"color: #1976d2; margin-top: 0;\">Angular Component in React (v19)</h3>\n      <p><strong>Message:</strong> {{ message }}</p>\n      <p><strong>Count:</strong> {{ count }}</p>\n      <p><strong>Active:</strong> {{ active ? 'Yes' : 'No' }}</p>\n      \n      <div style=\"display: flex; gap: 8px; margin-top: 16px;\">\n        <button (click)=\"increment()\" style=\"padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;\">\n          Increment\n        </button>\n        <button (click)=\"emitCustomEvent()\" style=\"padding: 8px 16px; background: #388e3c; color: white; border: none; border-radius: 4px; cursor: pointer;\">\n          Emit Event\n        </button>\n        <button (click)=\"toggleActive()\" style=\"padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer;\">\n          Toggle Active\n        </button>\n      </div>\n      \n      <div style=\"margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;\">\n        <p><strong>Global Context Data:</strong></p>\n        <pre style=\"font-size: 12px; overflow: auto;\">{{ globalData | json }}</pre>\n      </div>\n    </div>\n  ",
            standalone: true
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _count_decorators;
    var _count_initializers = [];
    var _count_extraInitializers = [];
    var _active_decorators;
    var _active_initializers = [];
    var _active_extraInitializers = [];
    var _countChange_decorators;
    var _countChange_initializers = [];
    var _countChange_extraInitializers = [];
    var _customEvent_decorators;
    var _customEvent_initializers = [];
    var _customEvent_extraInitializers = [];
    var _activeChange_decorators;
    var _activeChange_initializers = [];
    var _activeChange_extraInitializers = [];
    var AngularWrapperInternal = _classThis = /** @class */ (function () {
        function AngularWrapperInternal_1() {
            var _this = this;
            this.message = __runInitializers(this, _message_initializers, '');
            this.count = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _count_initializers, 0));
            this.active = (__runInitializers(this, _count_extraInitializers), __runInitializers(this, _active_initializers, false));
            this.countChange = (__runInitializers(this, _active_extraInitializers), __runInitializers(this, _countChange_initializers, new core_1.EventEmitter()));
            this.customEvent = (__runInitializers(this, _countChange_extraInitializers), __runInitializers(this, _customEvent_initializers, new core_1.EventEmitter()));
            this.activeChange = (__runInitializers(this, _customEvent_extraInitializers), __runInitializers(this, _activeChange_initializers, new core_1.EventEmitter()));
            this.globalData = (__runInitializers(this, _activeChange_extraInitializers), {});
            // Subscribe to global context changes
            src_1.globalSharedContext.watch('angularData', function (data) {
                _this.globalData = data;
            });
        }
        AngularWrapperInternal_1.prototype.ngOnInit = function () {
            this.globalData = src_1.globalSharedContext.get('angularData') || {};
        };
        AngularWrapperInternal_1.prototype.increment = function () {
            this.count++;
            this.countChange.emit(this.count);
            src_1.globalEventBus.emit('countIncremented', { count: this.count, source: 'angular' });
        };
        AngularWrapperInternal_1.prototype.emitCustomEvent = function () {
            var eventData = {
                message: 'Hello from Angular 19!',
                timestamp: Date.now(),
                count: this.count
            };
            this.customEvent.emit(eventData);
            src_1.globalEventBus.emit('customEventEmitted', eventData);
        };
        AngularWrapperInternal_1.prototype.toggleActive = function () {
            this.active = !this.active;
            this.activeChange.emit(this.active);
            src_1.globalEventBus.emit('activeToggled', { active: this.active, source: 'angular' });
        };
        return AngularWrapperInternal_1;
    }());
    __setFunctionName(_classThis, "AngularWrapperInternal");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _message_decorators = [(0, core_1.Input)()];
        _count_decorators = [(0, core_1.Input)()];
        _active_decorators = [(0, core_1.Input)()];
        _countChange_decorators = [(0, core_1.Output)()];
        _customEvent_decorators = [(0, core_1.Output)()];
        _activeChange_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
        __esDecorate(null, null, _count_decorators, { kind: "field", name: "count", static: false, private: false, access: { has: function (obj) { return "count" in obj; }, get: function (obj) { return obj.count; }, set: function (obj, value) { obj.count = value; } }, metadata: _metadata }, _count_initializers, _count_extraInitializers);
        __esDecorate(null, null, _active_decorators, { kind: "field", name: "active", static: false, private: false, access: { has: function (obj) { return "active" in obj; }, get: function (obj) { return obj.active; }, set: function (obj, value) { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
        __esDecorate(null, null, _countChange_decorators, { kind: "field", name: "countChange", static: false, private: false, access: { has: function (obj) { return "countChange" in obj; }, get: function (obj) { return obj.countChange; }, set: function (obj, value) { obj.countChange = value; } }, metadata: _metadata }, _countChange_initializers, _countChange_extraInitializers);
        __esDecorate(null, null, _customEvent_decorators, { kind: "field", name: "customEvent", static: false, private: false, access: { has: function (obj) { return "customEvent" in obj; }, get: function (obj) { return obj.customEvent; }, set: function (obj, value) { obj.customEvent = value; } }, metadata: _metadata }, _customEvent_initializers, _customEvent_extraInitializers);
        __esDecorate(null, null, _activeChange_decorators, { kind: "field", name: "activeChange", static: false, private: false, access: { has: function (obj) { return "activeChange" in obj; }, get: function (obj) { return obj.activeChange; }, set: function (obj, value) { obj.activeChange = value; } }, metadata: _metadata }, _activeChange_initializers, _activeChange_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AngularWrapperInternal = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AngularWrapperInternal = _classThis;
}();
exports.AngularWrapperInternal = AngularWrapperInternal;
var AngularWrapper = function (_a) {
    var _b = _a.message, message = _b === void 0 ? 'Default message from React 18' : _b, _c = _a.count, count = _c === void 0 ? 0 : _c, _d = _a.active, active = _d === void 0 ? false : _d, onCountChange = _a.onCountChange, onCustomEvent = _a.onCustomEvent, onActiveChange = _a.onActiveChange, _e = _a.className, className = _e === void 0 ? '' : _e, _f = _a.style, style = _f === void 0 ? {} : _f;
    var containerRef = (0, react_1.useRef)(null);
    var _g = (0, react_1.useState)(null), angularComponentRef = _g[0], setAngularComponentRef = _g[1];
    var _h = (0, react_1.useState)(null), platformRef = _h[0], setPlatformRef = _h[1];
    var _j = (0, react_1.useState)(null), error = _j[0], setError = _j[1];
    // Update Angular component when props change
    (0, react_1.useEffect)(function () {
        if (angularComponentRef && angularComponentRef.instance) {
            var instance = angularComponentRef.instance;
            instance.message = message;
            instance.count = count;
            instance.active = active;
            try {
                angularComponentRef.changeDetectorRef.detectChanges();
            }
            catch (err) {
                console.error('Error detecting changes in Angular component:', err);
            }
        }
    }, [message, count, active, angularComponentRef]);
    // Bootstrap Angular component
    (0, react_1.useEffect)(function () {
        if (!containerRef.current)
            return;
        var bootstrapAngular = function () { return __awaiter(void 0, void 0, void 0, function () {
            var platform, moduleRef, injector, componentRef, err_1, errorMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        setError(null);
                        platform = platformRef;
                        if (!platform) {
                            platform = (0, platform_browser_dynamic_1.platformBrowserDynamic)();
                            setPlatformRef(platform);
                        }
                        return [4 /*yield*/, platform.bootstrapModule(platform_browser_1.BrowserModule)];
                    case 1:
                        moduleRef = _a.sent();
                        injector = moduleRef.injector;
                        componentRef = (0, core_1.createComponent)(AngularWrapperInternal, {
                            environmentInjector: injector,
                            hostElement: containerRef.current
                        });
                        // Set initial properties
                        componentRef.instance.message = message;
                        componentRef.instance.count = count;
                        componentRef.instance.active = active;
                        // Subscribe to output events
                        if (onCountChange) {
                            componentRef.instance.countChange.subscribe(onCountChange);
                        }
                        if (onCustomEvent) {
                            componentRef.instance.customEvent.subscribe(onCustomEvent);
                        }
                        if (onActiveChange) {
                            componentRef.instance.activeChange.subscribe(onActiveChange);
                        }
                        // Detect changes and store reference
                        componentRef.changeDetectorRef.detectChanges();
                        setAngularComponentRef(componentRef);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        errorMsg = err_1 instanceof Error ? err_1.message : 'Unknown error';
                        setError("Failed to bootstrap Angular component: ".concat(errorMsg));
                        console.error('Error bootstrapping Angular component:', err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        bootstrapAngular();
        return function () {
            // Cleanup Angular component
            if (angularComponentRef) {
                try {
                    angularComponentRef.destroy();
                }
                catch (err) {
                    console.error('Error destroying Angular component:', err);
                }
            }
        };
    }, []);
    if (error) {
        return (<div style={{ border: '2px solid #f44336', padding: '16px', margin: '16px', borderRadius: '8px' }}>
        <h3 style={{ color: '#f44336', marginTop: 0 }}>Error Loading Angular Component</h3>
        <p>{error}</p>
        <button onClick={function () { return setError(null); }} style={{ padding: '8px 16px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Try Again
        </button>
      </div>);
    }
    return <div ref={containerRef} className={className} style={style}/>;
};
exports.AngularWrapper = AngularWrapper;
exports.default = exports.AngularWrapper;
