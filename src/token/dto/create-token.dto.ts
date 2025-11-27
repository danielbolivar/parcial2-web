import { IsNotEmpty, IsString } from "class-validator";
import { Not } from "typeorm";

export class CreateTokenDto {

    @IsString()
    @IsNotEmpty()
    token: string;

}
