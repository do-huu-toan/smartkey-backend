import { Column, Entity, Index, OneToMany } from "typeorm";
import { Users } from "./Users";

@Index("id", ["id"], { unique: true })
@Index("rolename", ["rolename"], { unique: true })
@Index("IDX_2db66a4809c8d953c3cd1975c5", ["rolename"], { unique: true })
@Entity("roles", { schema: "iot-system" })
export class Roles {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "rolename", unique: true, length: 255 })
  rolename: string;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
