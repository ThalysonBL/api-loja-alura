import { EmailEhUnico } from '../validacacao/email-eh-unico.validator';
import { IsEmail, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class AtualizaUsuarioDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome!: string;

  @IsEmail(undefined, { message: 'Email é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este email' })
  @IsOptional()
  email!: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  @IsOptional()
  senha!: string;
}
