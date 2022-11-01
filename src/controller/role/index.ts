import { Router, Request, Response } from "express";
import Controller from "@/utils/interface/controller.interface";
import RoleService from "../../service/role";
import { Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from 'typedi';


@JsonController("/role")
@Service()
class RoleController implements Controller {
  path: string = "/role";
  router: Router = Router();
  constructor(private roleService: RoleService) {
  }
  @Get("/")
  @OpenAPI({
    summary: "API lấy tất cả role",
    description: "Created: DHTOAN - 10/10/2022",
  })
  getRole = async () => {
    return await this.roleService.getAllRole();
  }
}
export default RoleController;
