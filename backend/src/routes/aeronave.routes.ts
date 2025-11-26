import { Router } from 'express'
import { AeronaveController } from '../controllers/aeronave.controller'

const router = Router()

router.get('/', AeronaveController.listar)
router.get('/estatisticas', AeronaveController.obterEstatisticas)
router.get('/:id', AeronaveController.buscarPorId)
router.post('/', AeronaveController.criar)
router.put('/:id', AeronaveController.atualizar)
router.delete('/:id', AeronaveController.deletar)

export default router
