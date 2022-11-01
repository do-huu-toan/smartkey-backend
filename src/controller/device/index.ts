import { Router, Request, Response } from "express";
import Controller from "@/utils/interface/controller.interface";
import DeviceService from "../../service/device";
import { Get, JsonController, Param, Params } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from 'typedi';


@JsonController("/device")
@Service()
class DeviceController implements Controller {
  path: string = "/device";
  router: Router = Router();
  constructor(private deviceService: DeviceService) {
  }
  @Get("/")
  @OpenAPI({
    summary: "API lấy tất cả device",
    description: "Created: DHTOAN - 10/10/2022",
  })
  async getDevice() {
    return await this.deviceService.getAllDevice();
  }
  @Get("/:userId")
  async getDeviceByUserId(@Param('userId') userId: string){
    return await this.deviceService.getDeviceByUserId(userId);
  }
}
export default DeviceController;
