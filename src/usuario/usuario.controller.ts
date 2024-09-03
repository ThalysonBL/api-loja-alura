import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { UsuarioRepository, Usuario } from './usuario.repository';
import { criaUsuarioDTO } from './dto/criaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: criaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return { usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome), message: 'usuário criado com sucesso' };
  }

  @Get()
  async listUsuarios(): Promise<ListaUsuarioDTO[]> {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  @Put('/:id')
  async autualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO)
  {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados);
    return {
      usuario: usuarioAtualizado,
      message: 'Usuario atualizado'
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido =  await this.usuarioRepository.remove(id);
    return {
      usuario: usuarioRemovido,
      message: 'Usuario removido com sucesso'
    }
  }
}
