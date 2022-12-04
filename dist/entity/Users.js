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
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var Devices_1 = require("./Devices");
var Roles_1 = require("./Roles");
var Users = /** @class */ (function () {
    function Users() {
    }
    __decorate([
        (0, typeorm_1.Column)("char", { primary: true, name: "id", length: 36 }),
        __metadata("design:type", String)
    ], Users.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "usename", unique: true, length: 255 }),
        __metadata("design:type", String)
    ], Users.prototype, "usename", void 0);
    __decorate([
        (0, typeorm_1.Column)("varchar", { name: "password", length: 255 }),
        __metadata("design:type", String)
    ], Users.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)("datetime", { name: "createdAt" }),
        __metadata("design:type", Date)
    ], Users.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("datetime", { name: "updatedAt" }),
        __metadata("design:type", Date)
    ], Users.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.Column)("char", { name: "roleId", length: 36 }),
        __metadata("design:type", String)
    ], Users.prototype, "roleId", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Devices_1.Devices; }, function (devices) { return devices.user; }),
        __metadata("design:type", Array)
    ], Users.prototype, "devices", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Roles_1.Roles; }, function (roles) { return roles.users; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        (0, typeorm_1.JoinColumn)([{ name: "roleId", referencedColumnName: "id" }]),
        __metadata("design:type", Roles_1.Roles)
    ], Users.prototype, "role", void 0);
    Users = __decorate([
        (0, typeorm_1.Index)("id", ["id"], { unique: true }),
        (0, typeorm_1.Index)("usename", ["usename"], { unique: true }),
        (0, typeorm_1.Index)("IDX_d23535658503099d5c0e6661fe", ["usename"], { unique: true }),
        (0, typeorm_1.Index)("roleId", ["roleId"], {}),
        (0, typeorm_1.Entity)("users", { schema: "iot-system" })
    ], Users);
    return Users;
}());
exports.Users = Users;
