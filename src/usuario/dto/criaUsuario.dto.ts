import { EmailEhUnico } from './../validacacao/email-eh-unico.validator';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class criaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome!: string;

  @IsEmail(undefined, { message: 'Email é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este email' })
  email!: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha!: string;
}
