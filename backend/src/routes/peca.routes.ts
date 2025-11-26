import { Router } from 'express'
import { PecaController } from '../controllers/peca.controller'

const router = Router()

router.get('/', PecaController.listar)
router.get('/:id', PecaController.buscarPorId)
router.post('/', PecaController.criar)
router.put('/:id', PecaController.atualizar)
router.put('/:id/status', PecaController.atualizarStatus)
router.delete('/:id', PecaController.excluir)

export default router
