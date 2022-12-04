"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var app_1 = __importDefault(require("./app"));
var sockerServer_1 = __importDefault(require("./sockerServer"));
var http_1 = require("http");
var port = process.env.PORT || 3000;
var app = new app_1.default(Number(port));
var httpServer = (0, http_1.createServer)(app.express);
var socketServer = new sockerServer_1.default(httpServer);
httpServer.listen(port, function () {
    console.log("Open swagger http://localhost:".concat(port, "/docs"));
});
