import { prisma } from '../lib/prisma'

interface CriarFuncionarioDTO {
  nome: string
  funcao: string
  salario?: number
  usuarioId?: number
  aeronaveId?: number
}

interface AtualizarFuncionarioDTO {
  nome?: string
  funcao?: string
  salario?: number
  usuarioId?: number
  aeronaveId?: number
}

export class FuncionarioService {
  async listar() {
    return await prisma.funcionario.findMany({
      include: {
        usuario: true,
        aeronave: true
      },
      orderBy: {
        nome: 'asc'
      }
    })
  }

  async buscarPorId(id: number) {
    const funcionario = await prisma.funcionario.findUnique({
      where: { id },
      include: {
        usuario: true,
        aeronave: true
      }
    })

    if (!funcionario) {
      throw new Error('Funcionario nao encontrado')
    }

    return funcionario
  }

  async listarPorAeronave(aeronaveId: number) {
    return await prisma.funcionario.findMany({
      where: { aeronaveId },
      include: {
        usuario: true
      },
      orderBy: {
        nome: 'asc'
      }
    })
  }

  async listarDisponiveis() {
    return await prisma.funcionario.findMany({
      where: { aeronaveId: null },
      include: {
        usuario: true
      },
      orderBy: {
        nome: 'asc'
      }
    })
  }

  async criar(dados: CriarFuncionarioDTO) {
    if (dados.usuarioId) {
      const funcionarioExistente = await prisma.funcionario.findUnique({
        where: { usuarioId: dados.usuarioId }
      })

      if (funcionarioExistente) {
        throw new Error('Usuario ja possui funcionario associado')
      }
    }

    return await prisma.funcionario.create({
      data: {
        nome: dados.nome,
        funcao: dados.funcao,
        salario: dados.salario,
        usuarioId: dados.usuarioId,
        aeronaveId: dados.aeronaveId
      },
      include: {
        usuario: true,
        aeronave: true
      }
    })
  }

  async atualizar(id: number, dados: AtualizarFuncionarioDTO) {
    await this.buscarPorId(id)

    return await prisma.funcionario.update({
      where: { id },
      data: dados,
      include: {
        usuario: true,
        aeronave: true
      }
    })
  }

  async atribuirAeronave(id: number, aeronaveId: number) {
    await this.buscarPorId(id)

    const aeronave = await prisma.aeronave.findUnique({
      where: { id: aeronaveId }
    })

    if (!aeronave) {
      throw new Error('Aeronave nao encontrada')
    }

    return await prisma.funcionario.update({
      where: { id },
      data: { aeronaveId },
      include: {
        usuario: true,
        aeronave: true
      }
    })
  }

  async removerAeronave(id: number) {
    await this.buscarPorId(id)

    return await prisma.funcionario.update({
      where: { id },
      data: { aeronaveId: null },
      include: {
        usuario: true,
        aeronave: true
      }
    })
  }

  async deletar(id: number) {
    await this.buscarPorId(id)

    return await prisma.funcionario.delete({
      where: { id }
    })
  }
}
