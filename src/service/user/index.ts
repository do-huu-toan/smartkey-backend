import { Service } from "typedi";
import { DbContext } from "../../entity/datasource";
import { Users } from "../../entity/Users";
@Service()
class UserService {
    private _context = DbContext;
    getAllUser = async () => {
        return await this._context.getRepository(Users).find();
    }
}
export default UserService;