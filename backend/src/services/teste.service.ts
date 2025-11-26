import { prisma } from '../lib/prisma'

interface CriarTesteDTO {
  nome: string
  tipo: string
  aeronaveId: number
}

interface AtualizarTesteDTO {
  nome?: string
  tipo?: string
  status?: string
  resultado?: string
}

export class TesteService {
  async listar() {
    return await prisma.teste.findMany({
      include: {
        aeronave: true
      },
      orderBy: {
        criadoEm: 'desc'
      }
    })
  }

  async buscarPorId(id: number) {
    const teste = await prisma.teste.findUnique({
      where: { id },
      include: {
        aeronave: true
      }
    })

    if (!teste) {
      throw new Error('Teste nao encontrado')
    }

    return teste
  }

  async listarPorAeronave(aeronaveId: number) {
    return await prisma.teste.findMany({
      where: { aeronaveId },
      orderBy: {
        criadoEm: 'desc'
      }
    })
  }

  async criar(dados: CriarTesteDTO) {
    const aeronave = await prisma.aeronave.findUnique({
      where: { id: dados.aeronaveId }
    })

    if (!aeronave) {
      throw new Error('Aeronave nao encontrada')
    }

    return await prisma.teste.create({
      data: {
        nome: dados.nome,
        tipo: dados.tipo,
        aeronaveId: dados.aeronaveId,
        status: 'pendente'
      },
      include: {
        aeronave: true
      }
    })
  }

  async atualizar(id: number, dados: AtualizarTesteDTO) {
    await this.buscarPorId(id)

    return await prisma.teste.update({
      where: { id },
      data: dados,
      include: {
        aeronave: true
      }
    })
  }

  async iniciar(id: number) {
    await this.buscarPorId(id)

    return await prisma.teste.update({
      where: { id },
      data: {
        status: 'em_andamento'
      },
      include: {
        aeronave: true
      }
    })
  }

  async aprovar(id: number, resultado: string) {
    await this.buscarPorId(id)

    return await prisma.teste.update({
      where: { id },
      data: {
        status: 'aprovado',
        resultado
      },
      include: {
        aeronave: true
      }
    })
  }

  async reprovar(id: number, resultado: string) {
    await this.buscarPorId(id)

    return await prisma.teste.update({
      where: { id },
      data: {
        status: 'reprovado',
        resultado
      },
      include: {
        aeronave: true
      }
    })
  }

  async deletar(id: number) {
    await this.buscarPorId(id)

    return await prisma.teste.delete({
      where: { id }
    })
  }

  async obterEstatisticas(aeronaveId?: number) {
    const where = aeronaveId ? { aeronaveId } : {}
    
    const total = await prisma.teste.count({ where })
    const pendentes = await prisma.teste.count({ where: { ...where, status: 'pendente' } })
    const emAndamento = await prisma.teste.count({ where: { ...where, status: 'em_andamento' } })
    const aprovados = await prisma.teste.count({ where: { ...where, status: 'aprovado' } })
    const reprovados = await prisma.teste.count({ where: { ...where, status: 'reprovado' } })

    return {
      total,
      pendentes,
      emAndamento,
      aprovados,
      reprovados
    }
  }
}
