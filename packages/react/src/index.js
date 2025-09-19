"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameworkUtils = exports.globalSharedContext = exports.globalEventBus = exports.AngularWrapper = void 0;
var AngularWrapper_1 = require("./lib/AngularWrapper");
Object.defineProperty(exports, "AngularWrapper", { enumerable: true, get: function () { return AngularWrapper_1.AngularWrapper; } });
// Re-export core utilities for convenience
var src_1 = require("../../core/src");
Object.defineProperty(exports, "globalEventBus", { enumerable: true, get: function () { return src_1.globalEventBus; } });
Object.defineProperty(exports, "globalSharedContext", { enumerable: true, get: function () { return src_1.globalSharedContext; } });
Object.defineProperty(exports, "frameworkUtils", { enumerable: true, get: function () { return src_1.frameworkUtils; } });
