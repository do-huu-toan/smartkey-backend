import { Service } from "typedi";
import { DbContext as _context } from "../../entity/datasource";
import { Devices } from "../../entity/Devices";
import { v4 as uuidv4 } from "uuid";
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
  addDevice = async (name: string, userId: string) => {
    return await _context.getRepository(Devices).save({
      id: uuidv4(),
      name: name,
      userId: userId,
    });
  };
}
export default DeviceService;
