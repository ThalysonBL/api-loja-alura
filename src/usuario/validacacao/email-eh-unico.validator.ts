import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';

import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicaValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}
  async validate(value: any): Promise<boolean> {
    const usuarioComEmailExiste =
      await this.usuarioRepository.existeEmail(value);
    return !usuarioComEmailExiste;
  }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicaValidator,
    });
  };
};
