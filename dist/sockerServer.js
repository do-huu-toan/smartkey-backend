"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var memory_cache_1 = __importDefault(require("memory-cache"));
var datasource_1 = require("./entity/datasource");
var Devices_1 = require("./entity/Devices");
var jwt = __importStar(require("jsonwebtoken"));
var Logs_1 = require("./entity/Logs");
var uuid_1 = require("uuid");
var SocketServer = /** @class */ (function () {
    function SocketServer(httpServer) {
        this.memCache = new memory_cache_1.default.Cache();
        this.io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "http://localhost:8080",
            },
        });
        this.ioDevice = this.io.of("/device");
        this.IOMiddleware();
        this.listen();
        this.IODeviceMiddleware();
        this.listenIODevice();
    }
    SocketServer.prototype.IOMiddleware = function () {
        var self = this;
        this.io.use(function (socket, next) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload;
                return __generator(this, function (_a) {
                    token = socket.handshake.auth.token;
                    try {
                        payload = jwt.verify(token, String(process.env.JWTSECRETKEY));
                        socket.handshake.query.userId = payload.id;
                        self.memCache.put("user/".concat(socket.handshake.query.userId, "/").concat(socket.id), socket.id);
                        next();
                    }
                    catch (error) {
                        next(new Error("Unauthorized"));
                    }
                    return [2 /*return*/];
                });
            });
        });
    };
    SocketServer.prototype.listen = function () {
        var _this = this;
        console.log("Socket Server is start");
        this.io.on("connection", function (socket) {
            //Các thiết bị đang online
            _this.handleEmitDeviceOnline(socket);
            _this.handleControlDevice(socket);
            socket.on("disconnect", function () { });
        });
    };
    SocketServer.prototype.IODeviceMiddleware = function () {
        var self = this;
        this.ioDevice.use(function (socket, next) {
            return __awaiter(this, void 0, void 0, function () {
                var device, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, datasource_1.DbContext.getRepository(Devices_1.Devices).findBy({
                                    id: String(socket.handshake.query.token),
                                })];
                        case 1:
                            device = _a.sent();
                            if (device.length > 0) {
                                self.memCache.put("device/".concat(socket.handshake.query.token, "/").concat(device[0].userId), {
                                    socketId: socket.id,
                                    status: false,
                                });
                                socket.handshake.query.userId = device[0].userId;
                                next();
                            }
                            else
                                next(new Error("Unauthorized"));
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            next(new Error("Unauthorized"));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
    };
    SocketServer.prototype.listenIODevice = function () {
        var _this = this;
        this.ioDevice.on("connection", function (socket) {
            console.log("1 device connected");
            //Gửi cho brower biết có thiết bị kết nối
            _this.handleDeviceConnected(socket);
            //Khi thiết bị được bật/tắt từ phần cứng
            _this.handleMessageFromDevice(socket);
            socket.on("disconnect", function () {
                _this.memCache.del("device/".concat(socket.handshake.query.token, "/").concat(socket.handshake.query.userId));
                _this.handleDeviceConnected(socket);
            });
        });
    };
    //Handle Emit
    SocketServer.prototype.handleDeviceConnected = function (socket) {
        var devicesOnlineKey = this.memCache.keys().filter(function (key) {
            return (key.startsWith("device/") &&
                key.endsWith("/".concat(socket.handshake.query.userId)));
        });
        var data = [];
        for (var _i = 0, devicesOnlineKey_1 = devicesOnlineKey; _i < devicesOnlineKey_1.length; _i++) {
            var deviceKey = devicesOnlineKey_1[_i];
            data.push({
                key: deviceKey,
                status: this.memCache.get(deviceKey),
            });
        }
        var userOnline = this.memCache.keys().filter(function (key) {
            return key.startsWith("user/".concat(socket.handshake.query.userId));
        });
        for (var _a = 0, userOnline_1 = userOnline; _a < userOnline_1.length; _a++) {
            var userCacheKey = userOnline_1[_a];
            var socketId = this.memCache.get(userCacheKey);
            this.io.to(socketId).emit("eventDeviceOnline", data);
        }
    };
    SocketServer.prototype.handleEmitDeviceOnline = function (socket) {
        var devicesOnlineKey = this.memCache.keys().filter(function (key) {
            return (key.startsWith("device/") &&
                key.endsWith("/".concat(socket.handshake.query.userId)));
        });
        var data = [];
        for (var _i = 0, devicesOnlineKey_2 = devicesOnlineKey; _i < devicesOnlineKey_2.length; _i++) {
            var deviceKey = devicesOnlineKey_2[_i];
            data.push({
                key: deviceKey,
                status: this.memCache.get(deviceKey),
            });
        }
        socket.emit("eventDeviceOnline", data);
    };
    SocketServer.prototype.handleControlDevice = function (socket) {
        var self = this;
        socket.on("control", function (data) {
            var deviceId = data.id;
            var cache = self.memCache.get("device/".concat(deviceId, "/").concat(socket.handshake.query.userId));
            if (cache != null) {
                self.ioDevice.to(cache.socketId).emit("userControl", data.value);
                cache.status = data.value;
                self.memCache.put("device/".concat(deviceId, "/").concat(socket.handshake.query.userId), cache);
            }
        });
    };
    //Handle On
    SocketServer.prototype.handleMessageFromDevice = function (socket) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                socket.on("onChange", function (data) {
                    // console.log("onChange1: ", typeof(data));
                    var deviceId = socket.handshake.query.token;
                    var data = String(data);
                    // console.log("onChange2: ", data);
                    var userId = socket.handshake.query.userId;
                    // console.log(userId);
                    var keyCaches = self.memCache
                        .keys()
                        .filter(function (key) { return key.startsWith("user/".concat(userId)); });
                    // console.log(keyCaches);
                    if (keyCaches.length > 0) {
                        for (var _i = 0, keyCaches_1 = keyCaches; _i < keyCaches_1.length; _i++) {
                            var key = keyCaches_1[_i];
                            var socketId = self.memCache.get(key);
                            var cache = self.memCache.get("device/".concat(deviceId, "/").concat(userId));
                            if (cache != null) {
                                cache.status = data;
                                self.memCache.put("device/".concat(deviceId, "/").concat(userId), cache);
                            }
                            self.io.to(socketId).emit("statusDeviceChange", {
                                key: "device/".concat(deviceId, "/").concat(userId),
                                status: data,
                            });
                        }
                    }
                    //Lưu db
                    if (data == "true") {
                        var device = datasource_1.DbContext
                            .getRepository(Devices_1.Devices)
                            .findOneBy({
                            id: deviceId,
                        })
                            .then(function (device) {
                            datasource_1.DbContext.getRepository(Logs_1.Logs).save({
                                id: (0, uuid_1.v4)(),
                                device: device != null && device != undefined ? device.name : null,
                                createdAt: new Date(),
                                content: "Mở khóa",
                                userId: userId
                            });
                        })
                            .catch(function () { });
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return SocketServer;
}());
exports.default = SocketServer;
