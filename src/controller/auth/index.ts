import { Router, Request, Response } from "express";
import Controller from "@/utils/interface/controller.interface";
import {
  Body,
  BodyParam,
  Get,
  JsonController,
  NotFoundError,
  HttpError,
  Param,
  Params,
  Post,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import { AccountRequest } from "./accountRequest";
import UserService from "../../service/user";
import AuthService from "../../service/auth";

@JsonController("/auth")
@Service()
class AuthController implements Controller {
  path: string = "/auth";
  router: Router = Router();
  constructor(private userService: UserService, private authService: AuthService) {}
  @Post("/login")
  @OpenAPI({
    summary: "API auth/login",
    description: "Lấy token",
  })
  async login(@Body() objReq: AccountRequest) {
    //Kiểm tra user
    //Generate token
    return await this.authService.generateToken(objReq);
    //Trả về token
  }
  @Post("/validation")
  @OpenAPI({
    summary: "API auth/validation",
    description: "Validate token",
  })
  async validateToken(@BodyParam("accessToken") accessToken: String) {
    return true;
  }
}
export default AuthController;
