import { prisma } from '../lib/prisma'

interface CriarProducaoDTO {
  aeronaveId: number
  dataPrevisao?: Date
}

interface AtualizarProducaoDTO {
  statusAtual?: string
  percentual?: number
  dataPrevisao?: Date
  dataFinalizacao?: Date
}

export class ProducaoService {
  async listar() {
    return await prisma.producao.findMany({
      include: {
        aeronave: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })
  }

  async buscarPorId(id: number) {
    const producao = await prisma.producao.findUnique({
      where: { id },
      include: {
        aeronave: {
          include: {
            etapas: true,
            pecas: true,
            funcionarios: true,
            testes: true
          }
        }
      }
    })

    if (!producao) {
      throw new Error('Producao nao encontrada')
    }

    return producao
  }

  async buscarPorAeronave(aeronaveId: number) {
    return await prisma.producao.findUnique({
      where: { aeronaveId },
      include: {
        aeronave: true
      }
    })
  }

  async criar(dados: CriarProducaoDTO) {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id: dados.aeronaveId }
    })

    if (!aeronave) {
      throw new Error('Aeronave nao encontrada')
    }

    const producaoExistente = await prisma.producao.findUnique({
      where: { aeronaveId: dados.aeronaveId }
    })

    if (producaoExistente) {
      throw new Error('Ja existe producao para esta aeronave')
    }

    return await prisma.producao.create({
      data: {
        aeronaveId: dados.aeronaveId,
        dataPrevisao: dados.dataPrevisao,
        statusAtual: 'iniciada',
        percentual: 0
      },
      include: {
        aeronave: true
      }
    })
  }

  async atualizar(id: number, dados: AtualizarProducaoDTO) {
    await this.buscarPorId(id)

    return await prisma.producao.update({
      where: { id },
      data: dados,
      include: {
        aeronave: true
      }
    })
  }

  async atualizarPercentual(id: number) {
    const producao = await this.buscarPorId(id)
    
    const etapas = await prisma.etapa.findMany({
      where: { aeronaveId: producao.aeronaveId }
    })

    if (etapas.length === 0) {
      return producao
    }

    const etapasConcluidas = etapas.filter(e => e.status === 'concluida').length
    const percentual = Math.round((etapasConcluidas / etapas.length) * 100)

    let statusAtual = 'iniciada'
    if (percentual === 100) {
      statusAtual = 'concluida'
    } else if (percentual > 0) {
      statusAtual = 'em_andamento'
    }

    return await prisma.producao.update({
      where: { id },
      data: {
        percentual,
        statusAtual,
        dataFinalizacao: percentual === 100 ? new Date() : null
      },
      include: {
        aeronave: true
      }
    })
  }

  async finalizar(id: number) {
    await this.buscarPorId(id)

    return await prisma.producao.update({
      where: { id },
      data: {
        statusAtual: 'concluida',
        percentual: 100,
        dataFinalizacao: new Date()
      },
      include: {
        aeronave: true
      }
    })
  }

  async cancelar(id: number) {
    await this.buscarPorId(id)

    return await prisma.producao.update({
      where: { id },
      data: {
        statusAtual: 'cancelada'
      },
      include: {
        aeronave: true
      }
    })
  }

  async deletar(id: number) {
    await this.buscarPorId(id)

    return await prisma.producao.delete({
      where: { id }
    })
  }

  async obterEstatisticas() {
    const total = await prisma.producao.count()
    const iniciadas = await prisma.producao.count({ where: { statusAtual: 'iniciada' } })
    const emAndamento = await prisma.producao.count({ where: { statusAtual: 'em_andamento' } })
    const concluidas = await prisma.producao.count({ where: { statusAtual: 'concluida' } })
    const canceladas = await prisma.producao.count({ where: { statusAtual: 'cancelada' } })

    return {
      total,
      iniciadas,
      emAndamento,
      concluidas,
      canceladas
    }
  }
}
