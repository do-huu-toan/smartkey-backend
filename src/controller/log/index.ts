import { Router, Request, Response } from "express";
import Controller from "@/utils/interface/controller.interface";
import RoleService from "../../service/role";
import { Get, JsonController, Param } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from 'typedi';
import LogsService from "../../service/log";


@JsonController("/log")
@Service()
class LogController implements Controller {
  path: string = "/role";
  router: Router = Router();
  constructor(private readonly logService: LogsService) {
  }
  @Get("/")
  @OpenAPI({
    summary: "API lấy tất cả role",
    description: "Created: DHTOAN - 10/10/2022",
  })
  getLog = async () => {
      return this.logService.getAllLog();
  }
  @Get("/:userId")
  async getLogByUserId(@Param("userId") userId: string) {
    return await this.logService.getLogByUserId(userId);
  }
}
export default LogController;
