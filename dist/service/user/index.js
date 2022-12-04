"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Users_1 = require("../../entity/Users");
var typedi_1 = require("typedi");
var datasource_1 = require("../../entity/datasource");
var UserService = /** @class */ (function () {
    function UserService() {
        this.getAllUser = function () {
            return datasource_1.DbContext.getRepository(Users_1.Users).find();
        };
    }
    UserService = __decorate([
        (0, typedi_1.Service)()
    ], UserService);
    return UserService;
}());
exports.default = UserService;
