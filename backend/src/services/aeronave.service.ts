import { prisma } from '../lib/prisma'

interface CriarAeronaveDTO {
  cod: string
  modelo: string
  tipo: string
  capacidade: number
  alcance: number
  status?: string
}

interface AtualizarAeronaveDTO {
  cod?: string
  modelo?: string
  tipo?: string
  capacidade?: number
  alcance?: number
  status?: string
}

export class AeronaveService {
  async listar() {
    return await prisma.aeronave.findMany({
      include: {
        pecas: true,
        etapas: true,
        funcionarios: true,
        testes: true,
        producao: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })
  }

  async buscarPorId(id: number) {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id },
      include: {
        pecas: true,
        etapas: { orderBy: { ordem: 'asc' } },
        funcionarios: true,
        testes: true,
        producao: true
      }
    })

    if (!aeronave) {
      throw new Error('Aeronave não encontrada')
    }

    return aeronave
  }

  async buscarPorCodigo(cod: string) {
    return await prisma.aeronave.findUnique({
      where: { cod },
      include: {
        pecas: true,
        etapas: true,
        funcionarios: true,
        testes: true
      }
    })
  }

  async criar(dados: CriarAeronaveDTO) {
    const aeronaveExistente = await this.buscarPorCodigo(dados.cod)
    
    if (aeronaveExistente) {
      throw new Error('Já existe uma aeronave com este código')
    }

    const aeronave = await prisma.aeronave.create({
      data: {
        ...dados,
        status: dados.status || 'em_producao'
      },
      include: {
        pecas: true,
        etapas: true,
        funcionarios: true,
        testes: true
      }
    })

    await prisma.producao.create({
      data: {
        aeronaveId: aeronave.id,
        statusAtual: 'iniciada',
        percentual: 0
      }
    })

    return aeronave
  }

  async atualizar(id: number, dados: AtualizarAeronaveDTO) {
    await this.buscarPorId(id)

    if (dados.cod) {
      const aeronaveComMesmoCod = await prisma.aeronave.findFirst({
        where: {
          cod: dados.cod,
          NOT: { id }
        }
      })

      if (aeronaveComMesmoCod) {
        throw new Error('Já existe outra aeronave com este código')
      }
    }

    return await prisma.aeronave.update({
      where: { id },
      data: dados,
      include: {
        pecas: true,
        etapas: true,
        funcionarios: true,
        testes: true
      }
    })
  }

  async deletar(id: number) {
    await this.buscarPorId(id)
    
    return await prisma.aeronave.delete({
      where: { id }
    })
  }

  async obterEstatisticas() {
    const total = await prisma.aeronave.count()
    const emProducao = await prisma.aeronave.count({
      where: { status: 'em_producao' }
    })
    const concluidas = await prisma.aeronave.count({
      where: { status: 'concluida' }
    })
    const canceladas = await prisma.aeronave.count({
      where: { status: 'cancelada' }
    })

    return {
      total,
      emProducao,
      concluidas,
      canceladas
    }
  }
}
