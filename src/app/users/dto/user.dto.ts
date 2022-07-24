import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export class UserDtoCreate {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @Matches(regex, {
    message:
      'Deve conter ao menos um caracter especial, um numero, uma letra maiússcula, uma letra minuscula e oito digitos ',
  })
  password: string;
}

export class UserDtoUpdate {
  @IsOptional()
  name: string;
  @IsOptional()
  email: string;
}
