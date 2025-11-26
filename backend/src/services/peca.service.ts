import { prisma } from '../lib/prisma'

interface CriarPecaDTO {
  nome: string
  codigo: string
  quantidade?: number
  aeronaveId: number
}

interface AtualizarPecaDTO {
  nome?: string
  codigo?: string
  status?: string
  quantidade?: number
}

export class PecaService {
  async listar() {
    return await prisma.peca.findMany({
      include: {
        aeronave: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })
  }

  async buscarPorId(id: number) {
    const peca = await prisma.peca.findUnique({
      where: { id },
      include: {
        aeronave: true
      }
    })

    if (!peca) {
      throw new Error('Peca nao encontrada')
    }

    return peca
  }

  async buscarPorCodigo(codigo: string) {
    return await prisma.peca.findUnique({
      where: { codigo },
      include: {
        aeronave: true
      }
    })
  }

  async listarPorAeronave(aeronaveId: number) {
    return await prisma.peca.findMany({
      where: { aeronaveId },
      orderBy: {
        nome: 'asc'
      }
    })
  }

  async criar(dados: CriarPecaDTO) {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id: dados.aeronaveId }
    })

    if (!aeronave) {
      throw new Error('Aeronave nao encontrada')
    }

    const pecaExistente = await prisma.peca.findUnique({
      where: { codigo: dados.codigo }
    })

    if (pecaExistente) {
      throw new Error('Codigo de peca ja existe')
    }

    return await prisma.peca.create({
      data: {
        nome: dados.nome,
        codigo: dados.codigo,
        quantidade: dados.quantidade || 1,
        aeronaveId: dados.aeronaveId,
        status: 'pendente'
      },
      include: {
        aeronave: true
      }
    })
  }

  async atualizar(id: number, dados: AtualizarPecaDTO) {
    await this.buscarPorId(id)

    if (dados.codigo) {
      const pecaExistente = await prisma.peca.findFirst({
        where: {
          codigo: dados.codigo,
          NOT: { id }
        }
      })

      if (pecaExistente) {
        throw new Error('Codigo de peca ja existe')
      }
    }

    return await prisma.peca.update({
      where: { id },
      data: dados,
      include: {
        aeronave: true
      }
    })
  }

  async instalar(id: number) {
    await this.buscarPorId(id)

    return await prisma.peca.update({
      where: { id },
      data: {
        status: 'instalada'
      },
      include: {
        aeronave: true
      }
    })
  }

  async deletar(id: number) {
    await this.buscarPorId(id)

    return await prisma.peca.delete({
      where: { id }
    })
  }

  async obterEstatisticas(aeronaveId?: number) {
    const where = aeronaveId ? { aeronaveId } : {}
    
    const total = await prisma.peca.count({ where })
    const pendentes = await prisma.peca.count({ where: { ...where, status: 'pendente' } })
    const instaladas = await prisma.peca.count({ where: { ...where, status: 'instalada' } })

    return {
      total,
      pendentes,
      instaladas
    }
  }
}
