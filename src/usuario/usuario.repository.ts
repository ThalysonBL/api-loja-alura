import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar(): Promise<Usuario[]> {
    return this.usuarios;
  }

  async existeEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {

    const usuario = this.buscaPorId(id);
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave == 'id') {
        return;
      }
      usuario[chave] = valor;
    });

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);

    this.usuarios = this.usuarios.filter(
      usuarioSalvo => usuarioSalvo.id !== id
    )

    return usuario;

  }

  private async buscaPorId(id: string) {
    const usuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id == id,
    );
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    return usuario;
  }
}
