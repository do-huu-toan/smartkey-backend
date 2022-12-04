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
exports.Roles = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("./Users");
var Roles = /** @class */ (function () {
    function Roles() {
    }
    __decorate([
        (0, typeorm_1.Column)("char", { primary: true, name: "id", length: 36 }),
        __metadata("design:type", String)
    ], Roles.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "rolename", unique: true, length: 255 }),
        __metadata("design:type", String)
    ], Roles.prototype, "rolename", void 0);
    __decorate([
        (0, typeorm_1.Column)("datetime", { name: "createdAt" }),
        __metadata("design:type", Date)
    ], Roles.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("datetime", { name: "updatedAt" }),
        __metadata("design:type", Date)
    ], Roles.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Users_1.Users; }, function (users) { return users.role; }),
        __metadata("design:type", Array)
    ], Roles.prototype, "users", void 0);
    Roles = __decorate([
        (0, typeorm_1.Index)("id", ["id"], { unique: true }),
        (0, typeorm_1.Index)("rolename", ["rolename"], { unique: true }),
        (0, typeorm_1.Index)("IDX_2db66a4809c8d953c3cd1975c5", ["rolename"], { unique: true }),
        (0, typeorm_1.Entity)("roles", { schema: "iot-system" })
    ], Roles);
    return Roles;
}());
exports.Roles = Roles;
