import { Users } from "../../entity/Users";
import { Service } from "typedi";
import { DbContext as _context } from "../../entity/datasource";
@Service()
class UserService {
  getAllUser = () => {
    return _context.getRepository(Users).find();
  };
}
export default UserService;
