"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleMiddleware = void 0;
var routing_controllers_1 = require("routing-controllers");
var typedi_1 = require("typedi");
var SampleMiddleware = /** @class */ (function () {
    function SampleMiddleware() {
    }
    SampleMiddleware.prototype.use = function (request, response, next) {
        // console.log("Sample Middleware");
        next();
    };
    SampleMiddleware = __decorate([
        (0, routing_controllers_1.Middleware)({ type: 'before' }),
        (0, typedi_1.Service)()
    ], SampleMiddleware);
    return SampleMiddleware;
}());
exports.SampleMiddleware = SampleMiddleware;
