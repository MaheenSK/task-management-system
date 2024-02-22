import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(['todo', 'in progress', 'done'])
  status: string;
}
