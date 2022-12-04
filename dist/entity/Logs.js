"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
var typeorm_1 = require("typeorm");
var Logs = /** @class */ (function () {
    function Logs() {
    }
    __decorate([
        (0, typeorm_1.Column)("char", { primary: true, name: "id", length: 36, default: function () { return "''"; } }),
        __metadata("design:type", String)
    ], Logs.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("text", { name: "content", nullable: true }),
        __metadata("design:type", Object)
    ], Logs.prototype, "content", void 0);
    __decorate([
        (0, typeorm_1.Column)("datetime", { name: "createdAt", nullable: true }),
        __metadata("design:type", Object)
    ], Logs.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("char", { name: "userId", length: 36, default: function () { return "''"; } }),
        __metadata("design:type", String)
    ], Logs.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "device", nullable: true, length: 255 }),
        __metadata("design:type", Object)
    ], Logs.prototype, "device", void 0);
    Logs = __decorate([
        (0, typeorm_1.Entity)("logs", { schema: "iot-system" })
    ], Logs);
    return Logs;
}());
exports.Logs = Logs;
