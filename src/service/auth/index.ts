import { AccountRequest } from "../../controller/auth/accountRequest";
import { Service } from "typedi";
import { DbContext as _context } from "../../entity/datasource";
import { Users } from "../../entity/Users";
import * as jwt from "jsonwebtoken";
@Service()
class AuthService {
  generateToken = async (objReq: AccountRequest) => {
    const user = await _context.getRepository(Users).findOneBy({
      usename: objReq.username,
      password: objReq.password,
    });
    if (user) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          username: user.usename,
        },
        String(process.env.JWTSECRETKEY),
        { expiresIn: "1h" }
      );
      return {
        accessToken,
      };
    }
    return null;
  };
}
export default AuthService;
