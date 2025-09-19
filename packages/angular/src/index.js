"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameworkUtils = exports.globalSharedContext = exports.globalEventBus = exports.ReactWrapper = exports.ReactWrapperModule = exports.ReactWrapperComponent = void 0;
var react_wrapper_component_1 = require("./lib/react-wrapper.component");
Object.defineProperty(exports, "ReactWrapperComponent", { enumerable: true, get: function () { return react_wrapper_component_1.ReactWrapperComponent; } });
Object.defineProperty(exports, "ReactWrapperModule", { enumerable: true, get: function () { return react_wrapper_component_1.ReactWrapperModule; } });
var react_wrapper_component_2 = require("./lib/react-wrapper.component");
Object.defineProperty(exports, "ReactWrapper", { enumerable: true, get: function () { return react_wrapper_component_2.ReactWrapperComponent; } });
// Re-export core utilities for convenience
var src_1 = require("../../core/src");
Object.defineProperty(exports, "globalEventBus", { enumerable: true, get: function () { return src_1.globalEventBus; } });
Object.defineProperty(exports, "globalSharedContext", { enumerable: true, get: function () { return src_1.globalSharedContext; } });
Object.defineProperty(exports, "frameworkUtils", { enumerable: true, get: function () { return src_1.frameworkUtils; } });
