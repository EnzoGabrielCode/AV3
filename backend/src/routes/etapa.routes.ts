import { Router } from 'express'
import { EtapaController } from '../controllers/etapa.controller'

const router = Router()

router.get('/', EtapaController.listar)
router.get('/aeronave/:aeronaveId', EtapaController.listarPorAeronave)
router.get('/:id', EtapaController.buscarPorId)
router.post('/', EtapaController.criar)
router.put('/:id', EtapaController.atualizar)
router.put('/:id/iniciar', EtapaController.iniciar)
router.put('/:id/finalizar', EtapaController.finalizar)
router.delete('/:id', EtapaController.excluir)

export default router
