import { Router, Request, Response } from "express";
import Controller from "@/utils/interface/controller.interface";
import DeviceService from "../../service/device";
import {
  Authorized,
  BadRequestError,
  Body,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import { DeviceRequest } from "./deviceRequest";

@Authorized()
@JsonController("/device")
@OpenAPI({
  security: [{ bearerAuth: [] }],
})
@Service()
class DeviceController implements Controller {
  path: string = "/device";
  router: Router = Router();
  constructor(private deviceService: DeviceService) {}
  @Authorized()
  @Get("/")
  @OpenAPI({
    summary: "API lấy tất cả device",
    description: "Created: DHTOAN - 10/10/2022",
    security: [{ bearerAuth: [] }],
  })
  async getDevice() {
    return await this.deviceService.getAllDevice();
  }

  @Get("/:userId")
  async getDeviceByUserId(@Param("userId") userId: string) {
    return await this.deviceService.getDeviceByUserId(userId);
  }
  @HttpCode(201)
  @Post("/")
  async addDevice(@Body() objReq: DeviceRequest) {
    try {
      const device = await this.deviceService.addDevice(
        objReq.name,
        objReq.userId
      );
      if (device)
        return {
          message: "Success",
        };
      else throw new BadRequestError("Internal Error");
    } catch (error) {
      throw new BadRequestError("Internal Error");
    }
  }
}
export default DeviceController;
