import { Request, Response } from 'express'
import { UsuarioService } from '../services/usuario.service'

const usuarioService = new UsuarioService()

export class UsuarioController {
    static async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body

            if (!email || !senha) {
                return res.status(400).json({ erro: 'Email e senha sao obrigatorios' })
            }

            const resultado = await usuarioService.autenticar(email, senha)
            return res.json(resultado)
        } catch (error) {
            if (error instanceof Error && error.message === 'Credenciais invalidas') {
                return res.status(401).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao realizar login',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async listar(req: Request, res: Response) {
        try {
            const usuarios = await usuarioService.listar()
            return res.json(usuarios)
        } catch (error) {
            return res.status(500).json({
                erro: 'Erro ao listar usuarios',
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

            const usuario = await usuarioService.buscarPorId(id)
            return res.json(usuario)
        } catch (error) {
            if (error instanceof Error && error.message === 'Usuario nao encontrado') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao buscar usuario',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }

    static async criar(req: Request, res: Response) {
        try {
            const { nome, email, senha, nivelPermissao } = req.body

            if (!nome || !email || !senha) {
                return res.status(400).json({ erro: 'Nome, email e senha sao obrigatorios' })
            }

            const usuario = await usuarioService.criar({ nome, email, senha, nivelPermissao })
            return res.status(201).json(usuario)
        } catch (error) {
            if (error instanceof Error && error.message === 'Email ja cadastrado') {
                return res.status(409).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao criar usuario',
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

            const usuario = await usuarioService.atualizar(id, req.body)
            return res.json(usuario)
        } catch (error) {
            if (error instanceof Error && error.message === 'Usuario nao encontrado') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao atualizar usuario',
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

            await usuarioService.excluir(id)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error && error.message === 'Usuario nao encontrado') {
                return res.status(404).json({ erro: error.message })
            }
            return res.status(500).json({
                erro: 'Erro ao excluir usuario',
                mensagem: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    }
}
