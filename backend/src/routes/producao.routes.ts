import { Router } from 'express'
import * as ProducaoController from '../controllers/producao.controller'

const router = Router()

router.get('/', ProducaoController.listarProducoes)
router.get('/:id', ProducaoController.buscarProducaoPorId)
router.get('/aeronave/:aeronaveId', ProducaoController.buscarProducaoPorAeronave)
router.post('/', ProducaoController.criarProducao)
router.put('/:id', ProducaoController.atualizarProducao)
router.put('/:id/percentual', ProducaoController.atualizarPercentualProducao)

export default router
