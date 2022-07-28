import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export class UserDtoCreate {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Matches(regex, {
    message:
      'Deve conter ao menos um caracter especial, um numero, uma letra maiússcula, uma letra minuscula e oito digitos ',
  })
  @ApiProperty()
  password: string;
}

export class UserDtoUpdate {
  @ApiPropertyOptional()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  email: string;
}
