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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var express_1 = require("express");
var device_1 = __importDefault(require("../../service/device"));
var routing_controllers_1 = require("routing-controllers");
var routing_controllers_openapi_1 = require("routing-controllers-openapi");
var typedi_1 = require("typedi");
var deviceRequest_1 = require("./deviceRequest");
var DeviceController = /** @class */ (function () {
    function DeviceController(deviceService) {
        this.deviceService = deviceService;
        this.path = "/device";
        this.router = (0, express_1.Router)();
    }
    DeviceController.prototype.getDevice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceService.getAllDevice()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeviceController.prototype.getDeviceByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deviceService.getDeviceByUserId(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeviceController.prototype.addDevice = function (objReq) {
        return __awaiter(this, void 0, void 0, function () {
            var device, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.deviceService.addDevice(objReq.name, objReq.userId)];
                    case 1:
                        device = _a.sent();
                        if (device)
                            return [2 /*return*/, {
                                    message: "Success",
                                }];
                        else
                            throw new routing_controllers_1.BadRequestError("Internal Error");
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new routing_controllers_1.BadRequestError("Internal Error");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Authorized)(),
        (0, routing_controllers_1.Get)("/"),
        (0, routing_controllers_openapi_1.OpenAPI)({
            summary: "API lấy tất cả device",
            description: "Created: DHTOAN - 10/10/2022",
            security: [{ bearerAuth: [] }],
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DeviceController.prototype, "getDevice", null);
    __decorate([
        (0, routing_controllers_1.Get)("/:userId"),
        __param(0, (0, routing_controllers_1.Param)("userId")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DeviceController.prototype, "getDeviceByUserId", null);
    __decorate([
        (0, routing_controllers_1.HttpCode)(201),
        (0, routing_controllers_1.Post)("/"),
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [deviceRequest_1.DeviceRequest]),
        __metadata("design:returntype", Promise)
    ], DeviceController.prototype, "addDevice", null);
    DeviceController = __decorate([
        (0, routing_controllers_1.Authorized)(),
        (0, routing_controllers_1.JsonController)("/device"),
        (0, routing_controllers_openapi_1.OpenAPI)({
            security: [{ bearerAuth: [] }],
        }),
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [device_1.default])
    ], DeviceController);
    return DeviceController;
}());
exports.default = DeviceController;
