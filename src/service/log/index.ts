import { Logs } from "../../entity/Logs";
import { Service } from "typedi";
import { DbContext as _context } from "../../entity/datasource";
@Service()
class LogsService {
    getAllLog = async () => {
        return await _context.getRepository(Logs).find();
    }
    getLogByUserId = async (userId: string) => {
        return await _context.getRepository(Logs).findBy({
          userId: userId,
        });
    };
}
export default LogsService;