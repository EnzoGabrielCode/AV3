import { Router } from 'express'
import { FuncionarioController } from '../controllers/funcionario.controller'

const router = Router()

router.get('/', FuncionarioController.listar)
router.get('/:id', FuncionarioController.buscarPorId)
router.post('/', FuncionarioController.criar)
router.put('/:id', FuncionarioController.atualizar)
router.delete('/:id', FuncionarioController.excluir)

export default router
