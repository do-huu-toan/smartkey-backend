import { Router, Request, Response } from "express";
import Controller from "@/utils/interface/controller.interface";
import UserService from "../../service/user";
import { Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

@JsonController("/users")
class UserController implements Controller {
  path: string = "/user";
  router: Router = Router();
  private userService: UserService = new UserService();
  constructor() {}
  @Get("/")
  @OpenAPI({
    summary: "API lấy tất cả users",
    description: "Created: DHTOAN - 10/10/2022",
  })
  getUser() {
    return "aaa";
  }
  private createUser(req: Request, res: Response) {}
}
export default UserController;
