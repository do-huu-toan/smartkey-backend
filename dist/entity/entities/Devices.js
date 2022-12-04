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
exports.Devices = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("./Users");
var Devices = /** @class */ (function () {
    function Devices() {
    }
    __decorate([
        (0, typeorm_1.Column)("char", { primary: true, name: "id", length: 36 }),
        __metadata("design:type", String)
    ], Devices.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "name", unique: true, length: 255 }),
        __metadata("design:type", String)
    ], Devices.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("datetime", { name: "createdAt" }),
        __metadata("design:type", Date)
    ], Devices.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("datetime", { name: "updatedAt" }),
        __metadata("design:type", Date)
    ], Devices.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("char", { name: "userId", length: 36 }),
        __metadata("design:type", String)
    ], Devices.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.devices; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)([{ name: "userId", referencedColumnName: "id" }]),
        __metadata("design:type", Users_1.Users)
    ], Devices.prototype, "user", void 0);
    Devices = __decorate([
        (0, typeorm_1.Index)("id", ["id"], { unique: true }),
        (0, typeorm_1.Index)("name", ["name"], { unique: true }),
        (0, typeorm_1.Index)("userId", ["userId"], {}),
        (0, typeorm_1.Entity)("devices", { schema: "iot-system" })
    ], Devices);
    return Devices;
}());
exports.Devices = Devices;
