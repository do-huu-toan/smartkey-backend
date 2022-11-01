import { IsString } from "class-validator"

export class AccountRequest{
    @IsString()
    username: string
    @IsString()
    password: string
}