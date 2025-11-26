import { Request, Response } from 'express'
import { PecaService } from '../services/peca.service'

const pecaService = new PecaService()

export class PecaController {
    static async listar(req: Request, res: Response) {
        try {
            const pecas = await pecaService.listar()
            return res.json(pecas)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao listar pecas',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async listarPorAeronave(req: Request, res: Response) {
        try {
            const aeronaveId = parseInt(req.params.aeronaveId)
            if (isNaN(aeronaveId)) {
                return res.status(400).json({ erro: 'ID da aeronave invalido' })
            }
            const pecas = await pecaService.listarPorAeronave(aeronaveId)
            return res.json(pecas)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao listar pecas da aeronave',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async buscarPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) {
                return res.status(400).json({ erro: 'ID invalido' })
            }
            const peca = await pecaService.buscarPorId(id)
            return res.json(peca)
        } catch (error) {
            if (error instanceof Error && error.message === 'Peca nao encontrada') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao buscar peca',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async criar(req: Request, res: Response) {
        try {
            const { nome, codigo, quantidade, aeronaveId } = req.body
            if (!nome || !codigo || !aeronaveId) {
                return res.status(400).json({ erro: 'Nome, codigo e aeronaveId sao obrigatorios' })
            }
            const peca = await pecaService.criar({ 
                nome, 
                codigo, 
                quantidade: quantidade ? parseInt(quantidade) : 1,
                aeronaveId: parseInt(aeronaveId)
            })
            return res.status(201).json(peca)
        } catch (error) {
            if (error instanceof Error && error.message === 'Aeronave nao encontrada') {
                return res.status(404).json({ erro: error.message })
            }
            if (error instanceof Error && error.message === 'Codigo de peca ja existe') {
                return res.status(409).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao criar peca',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async atualizar(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) {
                return res.status(400).json({ erro: 'ID invalido' })
            }
            const peca = await pecaService.atualizar(id, req.body)
            return res.json(peca)
        } catch (error) {
            if (error instanceof Error && error.message === 'Peca nao encontrada') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao atualizar peca',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async atualizarStatus(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            const { status } = req.body
            if (isNaN(id) || !status) {
                return res.status(400).json({ erro: 'ID e status sao obrigatorios' })
            }
            const peca = await pecaService.atualizar(id, { status })
            return res.json(peca)
        } catch (error) {
            if (error instanceof Error && error.message === 'Peca nao encontrada') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao atualizar status da peca',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async excluir(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) {
                return res.status(400).json({ erro: 'ID invalido' })
            }
            await pecaService.deletar(id)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error && error.message === 'Peca nao encontrada') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao excluir peca',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }
}
