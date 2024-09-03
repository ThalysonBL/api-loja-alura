import { EmailEhUnicaValidator } from './validacacao/email-eh-unico.validator';
import { Module } from '@nestjs/common'
import { UsuarioController } from './usuario.controller'
import { UsuarioRepository } from './usuario.repository';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository, EmailEhUnicaValidator]
})
export class UsuarioModule {}
