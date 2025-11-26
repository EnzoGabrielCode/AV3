import { Router } from 'express'
import * as EtapaController from '../controllers/etapa.controller'

const router = Router()

router.get('/', EtapaController.listar)
router.get('/:id', EtapaController.buscarPorId)
router.post('/', EtapaController.criar)
router.put('/:id', EtapaController.atualizar)
router.put('/:id/iniciar', EtapaController.iniciar)
router.put('/:id/finalizar', EtapaController.finalizar)

export default router
