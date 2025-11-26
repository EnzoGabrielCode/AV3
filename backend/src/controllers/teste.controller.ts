import { Request, Response } from 'express'
import { TesteService } from '../services/teste.service'

const testeService = new TesteService()

export class TesteController {
    static async listar(req: Request, res: Response) {
        try {
            const testes = await testeService.listar()
            return res.json(testes)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao listar testes', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async buscarPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ erro: 'ID invalido' })
            const teste = await testeService.buscarPorId(id)
            return res.json(teste)
        } catch (error) {
            if (error instanceof Error && error.message === 'Teste nao encontrado') return res.status(404).json({ erro: error.message })
            return res.status(500).json({ erro: 'Erro ao buscar teste', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async criar(req: Request, res: Response) {
        try {
            const { tipo, resultado } = req.body
            if (!tipo || !resultado) return res.status(400).json({ erro: 'Tipo e resultado sao obrigatorios' })
            const teste = await testeService.criar({ tipo, resultado })
            return res.status(201).json(teste)
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao criar teste', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async atualizar(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ erro: 'ID invalido' })
            const teste = await testeService.atualizar(id, req.body)
            return res.json(teste)
        } catch (error) {
            if (error instanceof Error && error.message === 'Teste nao encontrado') return res.status(404).json({ erro: error.message })
            return res.status(500).json({ erro: 'Erro ao atualizar teste', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }

    static async excluir(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)
            if (isNaN(id)) return res.status(400).json({ erro: 'ID invalido' })
            await testeService.excluir(id)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error && error.message === 'Teste nao encontrado') return res.status(404).json({ erro: error.message })
            return res.status(500).json({ erro: 'Erro ao excluir teste', mensagem: error instanceof Error ? error.message : 'Erro desconhecido' })
        }
    }
}
