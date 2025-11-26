import { Request, Response } from 'express'
import { AeronaveService } from '../services/aeronave.service'

const aeronaveService = new AeronaveService()

export class AeronaveController {
  static async listar(req: Request, res: Response) {
    try {
      const aeronaves = await aeronaveService.listar()
      return res.json(aeronaves)
    } catch (error) {
      return res.status(500).json({ 
        erro: 'Erro ao listar aeronaves',
        mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID inválido' })
      }

      const aeronave = await aeronaveService.buscarPorId(id)
      return res.json(aeronave)
    } catch (error) {
      if (error instanceof Error && error.message === 'Aeronave não encontrada') {
        return res.status(404).json({ erro: error.message })
      }
      return res.status(500).json({ 
        erro: 'Erro ao buscar aeronave',
        mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  static async criar(req: Request, res: Response) {
    try {
      const { cod, modelo, tipo, capacidade, alcance, status } = req.body

      if (!cod || !modelo || !tipo || !capacidade || !alcance) {
        return res.status(400).json({ 
          erro: 'Campos obrigatórios: cod, modelo, tipo, capacidade, alcance' 
        })
      }

      const aeronave = await aeronaveService.criar({
        cod,
        modelo,
        tipo,
        capacidade: parseInt(capacidade),
        alcance: parseInt(alcance),
        status
      })

      return res.status(201).json(aeronave)
    } catch (error) {
      if (error instanceof Error && error.message.includes('Já existe')) {
        return res.status(409).json({ erro: error.message })
      }
      return res.status(500).json({ 
        erro: 'Erro ao criar aeronave',
        mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID inválido' })
      }

      const aeronave = await aeronaveService.atualizar(id, req.body)
      return res.json(aeronave)
    } catch (error) {
      if (error instanceof Error && error.message === 'Aeronave não encontrada') {
        return res.status(404).json({ erro: error.message })
      }
      if (error instanceof Error && error.message.includes('Já existe')) {
        return res.status(409).json({ erro: error.message })
      }
      return res.status(500).json({ 
        erro: 'Erro ao atualizar aeronave',
        mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  static async deletar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      
      if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID inválido' })
      }

      await aeronaveService.deletar(id)
      return res.status(204).send()
    } catch (error) {
      if (error instanceof Error && error.message === 'Aeronave não encontrada') {
        return res.status(404).json({ erro: error.message })
      }
      return res.status(500).json({ 
        erro: 'Erro ao deletar aeronave',
        mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  static async obterEstatisticas(req: Request, res: Response) {
    try {
      const stats = await aeronaveService.obterEstatisticas()
      return res.json(stats)
    } catch (error) {
      return res.status(500).json({ 
        erro: 'Erro ao obter estatísticas',
        mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }
}
