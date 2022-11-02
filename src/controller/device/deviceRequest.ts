import { IsString } from "class-validator";

export class DeviceRequest {
  @IsString()
  name: string;
  @IsString()
  userId: string
}
