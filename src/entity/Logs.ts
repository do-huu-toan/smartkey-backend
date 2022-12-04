import { Column, Entity } from "typeorm";

@Entity("logs", { schema: "iot-system" })
export class Logs {
  @Column("char", { primary: true, name: "id", length: 36, default: () => "''" })
  id: string;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("datetime", { name: "createdAt", nullable: true })
  createdAt: Date | null;

  @Column("char", { name: "userId", length: 36, default: () => "''" })
  userId: string;

  @Column("varchar", { name: "device", nullable: true, length: 255 })
  device: string | null;
}
