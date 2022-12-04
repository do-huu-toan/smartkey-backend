"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContext = void 0;
var typeorm_1 = require("typeorm");
var Devices_1 = require("./Devices");
var Logs_1 = require("./Logs");
var Roles_1 = require("./Roles");
var Users_1 = require("./Users");
exports.DbContext = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    entities: [Users_1.Users, Roles_1.Roles, Devices_1.Devices, Logs_1.Logs],
    synchronize: false,
    logging: false,
});
