import { Request, Response } from 'express'
import { EtapaService } from '../services/etapa.service'

const etapaService = new EtapaService()

export class EtapaController {
    static async listar(req: Request, res: Response) {
        try {
            const etapas = await etapaService.listar()
            return res.json(etapas)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao listar etapas', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async listarPorAeronave(req: Request, res: Response) {
        try {
            const aeronaveId = parseInt(req.params.aeronaveId)
            if (isNaN(aeronaveId)) return res.status(400).json({ erro: 'ID da aeronave invalido' })
            const etapas = await etapaService.listarPorAeronave(aeronaveId)
            return res.json(etapas)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao listar etapas por aeronave', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async buscarPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ erro: 'ID invalido' })
            const etapa = await etapaService.buscarPorId(id)
            return res.json(etapa)
        } catch (error) {
            if (error instanceof Error && error.message === 'Etapa nao encontrada') return res.status(404).json({ erro: error.message })
            return res.status(500).json({ erro: 'Erro ao buscar etapa', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async criar(req: Request, res: Response) {
        try {
            const { nome, prazo, status, aeronaveId } = req.body
            if (!nome || !prazo) return res.status(400).json({ erro: 'Nome e prazo sao obrigatorios' })
            if (!aeronaveId) return res.status(400).json({ erro: 'ID da aeronave e obrigatorio' })
            const etapa = await etapaService.criar({ nome, prazo, status, aeronaveId })
            return res.status(201).json(etapa)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao criar etapa', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async atualizar(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ erro: 'ID invalido' })
            const { nome, prazo, status } = req.body
            const etapa = await etapaService.atualizar(id, { nome, prazo, status })
            return res.json(etapa)
        } catch (error) {
            if (error instanceof Error && error.message === 'Etapa nao encontrada') return res.status(404).json({ erro: error.message })
            return res.status(500).json({ erro: 'Erro ao atualizar etapa', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async finalizar(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ erro: 'ID invalido' })
            const etapa = await etapaService.finalizar(id)
            return res.json(etapa)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao finalizar etapa', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async excluir(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ erro: 'ID invalido' })
            await etapaService.excluir(id)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error && error.message === 'Etapa nao encontrada') return res.status(404).json({ erro: error.message })
            return res.status(500).json({ erro: 'Erro ao excluir etapa', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }
}
