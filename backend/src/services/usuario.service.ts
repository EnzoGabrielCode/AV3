import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

interface CriarUsuarioDTO {
  nome: string
  email: string
  senha: string
  role?: string
}

interface AtualizarUsuarioDTO {
  nome?: string
  email?: string
  senha?: string
  role?: string
}

interface LoginDTO {
  email: string
  senha: string
}

export class UsuarioService {
  async listar() {
    return await prisma.usuario.findMany({
      include: {
        funcionario: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })
  }

  async buscarPorId(id: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: {
        funcionario: true
      }
    })

    if (!usuario) {
      throw new Error('Usuario nao encontrado')
    }

    return usuario
  }

  async buscarPorEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
      include: {
        funcionario: true
      }
    })
  }

  async criar(dados: CriarUsuarioDTO) {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: dados.email }
    })

    if (usuarioExistente) {
      throw new Error('Email ja cadastrado')
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10)

    return await prisma.usuario.create({
      data: {
        nome: dados.nome,
        email: dados.email,
        senha: senhaHash,
        role: dados.role || 'operador'
      }
    })
  }

  async atualizar(id: number, dados: AtualizarUsuarioDTO) {
    await this.buscarPorId(id)

    if (dados.email) {
      const usuarioExistente = await prisma.usuario.findFirst({
        where: {
          email: dados.email,
          NOT: { id }
        }
      })

      if (usuarioExistente) {
        throw new Error('Email ja esta em uso')
      }
    }

    const dadosAtualizacao: any = { ...dados }

    if (dados.senha) {
      dadosAtualizacao.senha = await bcrypt.hash(dados.senha, 10)
    }

    return await prisma.usuario.update({
      where: { id },
      data: dadosAtualizacao
    })
  }

  async deletar(id: number) {
    await this.buscarPorId(id)

    return await prisma.usuario.delete({
      where: { id }
    })
  }

  async login(dados: LoginDTO) {
    const usuario = await prisma.usuario.findUnique({
      where: { email: dados.email }
    })

    if (!usuario) {
      throw new Error('Credenciais invalidas')
    }

    const senhaValida = await bcrypt.compare(dados.senha, usuario.senha)

    if (!senhaValida) {
      throw new Error('Credenciais invalidas')
    }

    const { senha, ...usuarioSemSenha } = usuario
    return usuarioSemSenha
  }

  async alterarSenha(id: number, senhaAtual: string, novaSenha: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { id }
    })

    if (!usuario) {
      throw new Error('Usuario nao encontrado')
    }

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha)

    if (!senhaValida) {
      throw new Error('Senha atual incorreta')
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10)

    return await prisma.usuario.update({
      where: { id },
      data: { senha: novaSenhaHash }
    })
  }
}
