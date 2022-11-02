import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("id", ["id"], { unique: true })
@Index("name", ["name"], { unique: true })
@Index("userId", ["userId"], {})
@Entity("devices", { schema: "iot-system" })
export class Devices {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("datetime", { name: "updatedAt" })
  updatedAt: Date;

  @Column("char", { name: "userId", length: 36 })
  userId: string;

  @ManyToOne(() => Users, (users) => users.devices, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
