import { Router, Request, Response } from "express";
import Controller from "@/utils/interface/controller.interface";
import UserService from "../../service/user";
import { Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from 'typedi';


@JsonController("/users")
@Service()
class UserController implements Controller {
  path: string = "/user";
  router: Router = Router();
  constructor(private userService: UserService) {
  }
  @Get("/")
  @OpenAPI({
    summary: "API lấy tất cả users",
    description: "Created: DHTOAN - 10/10/2022",
  })
  getUser = async () => {
    return await this.userService.getAllUser();
  }
}
export default UserController;
