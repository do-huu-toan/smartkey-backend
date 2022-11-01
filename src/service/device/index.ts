import { Service } from "typedi";
import { DbContext as _context } from "../../entity/datasource";
import { Devices } from "../../entity/Devices";
@Service()
class DeviceService {
  getAllDevice = async () => {
    return await _context.getRepository(Devices).find();
  };
  getDeviceByUserId = async (userId: string) => {
    return await _context.getRepository(Devices).findBy({
      userId: userId,
    });
  };
}
export default DeviceService;
