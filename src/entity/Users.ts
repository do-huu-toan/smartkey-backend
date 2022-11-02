import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Devices } from "./Devices";
import { Roles } from "./Roles";

@Index("id", ["id"], { unique: true })
@Index("usename", ["usename"], { unique: true })
@Index("IDX_d23535658503099d5c0e6661fe", ["usename"], { unique: true })
@Index("roleId", ["roleId"], {})
@Entity("users", { schema: "iot-system" })
export class Users {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "usename", unique: true, length: 255 })
  usename: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("char", { name: "roleId", length: 36 })
  roleId: string;

  @OneToMany(() => Devices, (devices) => devices.user)
  devices: Devices[];

  @ManyToOne(() => Roles, (roles) => roles.users, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
  role: Roles;
}
