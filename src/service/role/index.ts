import { Service } from "typedi";
import { DbContext as _context } from "../../entity/datasource";
import { Roles } from "../../entity/Roles";
@Service()
class RoleService {
    getAllRole = async () => {
        return await _context.getRepository(Roles).find();
    }
}
export default RoleService;