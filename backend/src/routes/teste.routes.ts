import { Router } from 'express'
import { TesteController } from '../controllers/teste.controller'

const router = Router()

router.get('/', TesteController.listar)
router.get('/:id', TesteController.buscarPorId)
router.post('/', TesteController.criar)
router.put('/:id', TesteController.atualizar)
router.delete('/:id', TesteController.excluir)

export default router
