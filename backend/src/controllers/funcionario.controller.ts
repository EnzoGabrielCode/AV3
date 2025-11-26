import { Request, Response } from 'express'
import { FuncionarioService } from '../services/funcionario.service'

const funcionarioService = new FuncionarioService()

export class FuncionarioController {
    static async listar(req: Request, res: Response) {
        try {
            const funcionarios = await funcionarioService.listar()
            return res.json(funcionarios)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao listar funcionarios',
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
            const funcionario = await funcionarioService.buscarPorId(id)
            return res.json(funcionario)
        } catch (error) {
            if (error instanceof Error && error.message === 'Funcionario nao encontrado') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao buscar funcionario',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async criar(req: Request, res: Response) {
        try {
            const { nome, telefone, endereco, usuario, senha, nivelPermissao } = req.body
            if (!nome || !telefone || !usuario || !senha) {
                return res.status(400).json({ erro: 'Campos obrigatorios faltando' })
            }
            const funcionario = await funcionarioService.criar({ nome, telefone, endereco, usuario, senha, nivelPermissao })
            return res.status(201).json(funcionario)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao criar funcionario',
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
            const funcionario = await funcionarioService.atualizar(id, req.body)
            return res.json(funcionario)
        } catch (error) {
            if (error instanceof Error && error.message === 'Funcionario nao encontrado') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao atualizar funcionario',
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
            await funcionarioService.excluir(id)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error && error.message === 'Funcionario nao encontrado') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao excluir funcionario',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async associarEquipe(req: Request, res: Response) {
        try {
            const funcionarioId = parseInt(req.params.id)
            const { etapaId } = req.body
            if (isNaN(funcionarioId) || !etapaId) {
                return res.status(400).json({ erro: 'Parametros invalidos' })
            }
            const funcionario = await funcionarioService.associarEquipe(funcionarioId, etapaId)
            return res.json(funcionario)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao associar funcionario a equipe',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }
}
