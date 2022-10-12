import { Service } from "typedi";
import { DbContext } from "../../entity/datasource";
import { Devices } from "../../entity/Devices";
@Service()
class DeviceService {
    private _context = DbContext;
    getAllDevice = async () => {
        return await this._context.getRepository(Devices).find();
    }
}
export default DeviceService;