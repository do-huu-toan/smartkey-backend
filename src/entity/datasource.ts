import { DataSource } from 'typeorm'
import { Devices } from './Devices'
import { Logs } from './Logs'
import { Roles } from './Roles'
import { Users } from './Users'
export const DbContext = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    entities: [Users, Roles, Devices, Logs],
    synchronize: false,
    logging: false,
})