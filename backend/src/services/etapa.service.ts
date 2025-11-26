import { prisma } from '../lib/prisma'

interface CriarEtapaDTO {
  nome: string
  descricao?: string
  ordem: number
  aeronaveId: number
}

interface AtualizarEtapaDTO {
  nome?: string
  descricao?: string
  ordem?: number
  status?: string
}

export class EtapaService {
  async listar() {
    return await prisma.etapa.findMany({
      include: {
        aeronave: true
      },
      orderBy: [
        { aeronaveId: 'asc' },
        { ordem: 'asc' }
      ]
    })
  }

  async buscarPorId(id: number) {
    const etapa = await prisma.etapa.findUnique({
      where: { id },
      include: {
        aeronave: true
      }
    })

    if (!etapa) {
      throw new Error('Etapa nao encontrada')
    }

    return etapa
  }

  async listarPorAeronave(aeronaveId: number) {
    return await prisma.etapa.findMany({
      where: { aeronaveId },
      orderBy: {
        ordem: 'asc'
      }
    })
  }

  async criar(dados: CriarEtapaDTO) {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id: dados.aeronaveId }
    })

    if (!aeronave) {
      throw new Error('Aeronave nao encontrada')
    }

    return await prisma.etapa.create({
      data: {
        nome: dados.nome,
        descricao: dados.descricao,
        ordem: dados.ordem,
        aeronaveId: dados.aeronaveId,
        status: 'pendente'
      },
      include: {
        aeronave: true
      }
    })
  }

  async atualizar(id: number, dados: AtualizarEtapaDTO) {
    await this.buscarPorId(id)

    return await prisma.etapa.update({
      where: { id },
      data: dados,
      include: {
        aeronave: true
      }
    })
  }

  async iniciar(id: number) {
    await this.buscarPorId(id)

    return await prisma.etapa.update({
      where: { id },
      data: {
        status: 'em_andamento'
      },
      include: {
        aeronave: true
      }
    })
  }

  async concluir(id: number) {
    await this.buscarPorId(id)

    return await prisma.etapa.update({
      where: { id },
      data: {
        status: 'concluida'
      },
      include: {
        aeronave: true
      }
    })
  }

  async deletar(id: number) {
    await this.buscarPorId(id)

    return await prisma.etapa.delete({
      where: { id }
    })
  }

  async reordenar(aeronaveId: number, etapasOrdem: { id: number; ordem: number }[]) {
    const updates = etapasOrdem.map(item =>
      prisma.etapa.update({
        where: { id: item.id },
        data: { ordem: item.ordem }
      })
    )

    await prisma.$transaction(updates)

    return await this.listarPorAeronave(aeronaveId)
  }
}
