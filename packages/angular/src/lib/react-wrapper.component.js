"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactWrapper = exports.ReactWrapperModule = exports.ReactWrapperComponent = void 0;
var core_1 = require("@angular/core");
var React = require("react");
var ReactDOM = require("react-dom/client");
var src_1 = require("../../../core/src");
/**
 * Angular component that wraps and renders React components
 * Compatible with Angular 19 and React 18
 *
 * @example
 * // Angular TypeScript usage
 * @Component({
 *   template: `
 *     <react-wrapper
 *       [component]="reactComponent"
 *       [props]="reactProps"
 *       (event)="handleReactEvent($event)">
 *     </react-wrapper>
 *   `
 * })
 * class MyComponent {
 *   reactComponent = MyReactComponent;
 *   reactProps = { message: 'Hello from Angular' };
 *
 *   handleReactEvent(event: any) {
 *     console.log('React event:', event);
 *   }
 * }
 *
 * @example
 * // Angular JavaScript usage
 * angular.module('app').component('myComponent', {
 *   template: `
 *     <react-wrapper
 *       [component]="$ctrl.reactComponent"
 *       [props]="$ctrl.reactProps"
 *       (event)="$ctrl.handleReactEvent($event)">
 *     </react-wrapper>
 *   `,
 *   controller: function() {
 *     this.reactComponent = MyReactComponent;
 *     this.reactProps = { message: 'Hello from Angular' };
 *
 *     this.handleReactEvent = function(event) {
 *       console.log('React event:', event);
 *     };
 *   }
 * });
 */
var ReactWrapperComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'react-wrapper',
            template: '<div #container></div>',
            standalone: true
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _component_decorators;
    var _component_initializers = [];
    var _component_extraInitializers = [];
    var _props_decorators;
    var _props_initializers = [];
    var _props_extraInitializers = [];
    var _event_decorators;
    var _event_initializers = [];
    var _event_extraInitializers = [];
    var ReactWrapperComponent = _classThis = /** @class */ (function () {
        function ReactWrapperComponent_1() {
            /** The React component class to render */
            this.component = __runInitializers(this, _component_initializers, void 0);
            /** Props to pass to the React component */
            this.props = (__runInitializers(this, _component_extraInitializers), __runInitializers(this, _props_initializers, {}));
            /** Event emitter for React component events */
            this.event = (__runInitializers(this, _props_extraInitializers), __runInitializers(this, _event_initializers, new core_1.EventEmitter()));
            this.root = (__runInitializers(this, _event_extraInitializers), null);
            this.isDestroyed = false;
            this.containerRef = (0, core_1.inject)(core_1.ElementRef);
            this.ngZone = (0, core_1.inject)(core_1.NgZone);
            this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
        }
        ReactWrapperComponent_1.prototype.ngAfterViewInit = function () {
            this.renderReactComponent();
        };
        ReactWrapperComponent_1.prototype.ngOnChanges = function (changes) {
            if (this.root && (changes['component'] || changes['props'])) {
                this.renderReactComponent();
            }
        };
        ReactWrapperComponent_1.prototype.ngOnDestroy = function () {
            this.isDestroyed = true;
            this.unmountReactComponent();
        };
        ReactWrapperComponent_1.prototype.renderReactComponent = function () {
            var _this = this;
            if (!this.component || this.isDestroyed)
                return;
            // Run outside Angular zone to prevent unnecessary change detection
            this.ngZone.runOutsideAngular(function () {
                var container = _this.containerRef.nativeElement.querySelector('div');
                if (!container) {
                    console.warn('React wrapper container not found');
                    return;
                }
                if (!_this.root) {
                    try {
                        _this.root = ReactDOM.createRoot(container);
                    }
                    catch (error) {
                        console.error('Error creating React root:', error);
                        return;
                    }
                }
                // Prepare props with event emitter and global utilities
                var propsWithEvents = __assign(__assign({}, _this.props), { emit: function (eventName, data) {
                        // Run back inside Angular zone to trigger change detection
                        _this.ngZone.run(function () {
                            _this.event.emit({ name: eventName, data: data });
                            _this.cdr.markForCheck();
                        });
                    }, globalEventBus: src_1.globalEventBus, globalSharedContext: src_1.globalSharedContext });
                try {
                    // Create React element and render
                    var reactElement = React.createElement(_this.component, propsWithEvents);
                    _this.root.render(reactElement);
                }
                catch (error) {
                    console.error('Error rendering React component:', error);
                }
            });
        };
        ReactWrapperComponent_1.prototype.unmountReactComponent = function () {
            var _this = this;
            if (this.root) {
                this.ngZone.runOutsideAngular(function () {
                    try {
                        setTimeout(function () {
                            if (_this.root && !_this.isDestroyed) {
                                _this.root.unmount();
                                _this.root = null;
                            }
                        }, 0);
                    }
                    catch (error) {
                        console.error('Error unmounting React root:', error);
                    }
                });
            }
        };
        return ReactWrapperComponent_1;
    }());
    __setFunctionName(_classThis, "ReactWrapperComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _component_decorators = [(0, core_1.Input)()];
        _props_decorators = [(0, core_1.Input)()];
        _event_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _component_decorators, { kind: "field", name: "component", static: false, private: false, access: { has: function (obj) { return "component" in obj; }, get: function (obj) { return obj.component; }, set: function (obj, value) { obj.component = value; } }, metadata: _metadata }, _component_initializers, _component_extraInitializers);
        __esDecorate(null, null, _props_decorators, { kind: "field", name: "props", static: false, private: false, access: { has: function (obj) { return "props" in obj; }, get: function (obj) { return obj.props; }, set: function (obj, value) { obj.props = value; } }, metadata: _metadata }, _props_initializers, _props_extraInitializers);
        __esDecorate(null, null, _event_decorators, { kind: "field", name: "event", static: false, private: false, access: { has: function (obj) { return "event" in obj; }, get: function (obj) { return obj.event; }, set: function (obj, value) { obj.event = value; } }, metadata: _metadata }, _event_initializers, _event_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReactWrapperComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReactWrapperComponent = _classThis;
}();
exports.ReactWrapperComponent = ReactWrapperComponent;
exports.ReactWrapper = ReactWrapperComponent;
var core_2 = require("@angular/core");
var ReactWrapperModule = function () {
    var _classDecorators = [(0, core_2.NgModule)({
            imports: [ReactWrapperComponent],
            exports: [ReactWrapperComponent]
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReactWrapperModule = _classThis = /** @class */ (function () {
        function ReactWrapperModule_1() {
        }
        return ReactWrapperModule_1;
    }());
    __setFunctionName(_classThis, "ReactWrapperModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReactWrapperModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReactWrapperModule = _classThis;
}();
exports.ReactWrapperModule = ReactWrapperModule;
exports.default = ReactWrapperComponent;
