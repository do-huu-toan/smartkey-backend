import { DataSource } from 'typeorm'
import { Devices } from './Devices'
import { Roles } from './Roles'
import { Users } from './Users'
export const DbContext = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "iot-system",
    entities: [Users, Roles, Devices],
    synchronize: false,
    logging: false,
})