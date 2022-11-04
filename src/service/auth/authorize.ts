import { Action, ForbiddenError, HttpError } from "routing-controllers";
import * as jwt from "jsonwebtoken";
require("dotenv").config();
export default {
  authorizationChecker: async (action: Action, roles: string[]) => {
    try {
      const authorizeHeader = action.request.headers["authorization"];
      const token = authorizeHeader.split(" ")[1];
      if (token != null && token != undefined) {
        jwt.verify(token, String(process.env.JWTSECRETKEY));
        return true;
      }
      return false;
    } catch (e) {
        throw new ForbiddenError("Unauthorized");
    }
  },
};
