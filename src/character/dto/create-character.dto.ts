import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCharacterDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    salary: number;

    @IsNotEmpty()
    @IsBoolean()
    employee: boolean;

}
