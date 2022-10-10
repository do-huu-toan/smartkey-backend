import { Service } from "typedi";

@Service()
class UserService {
    constructor(){
    }
    getAllUser  = () : string => {
        return "Get All User"
    }
}
export default UserService;