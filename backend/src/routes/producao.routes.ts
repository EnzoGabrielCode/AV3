import { Router } from 'express';
import * as ProducaoController from '../controllers/producao.controller';

const router = Router();

router.get('/', ProducaoController.listarProducoes);
router.get('/:id', ProducaoController.buscarProducaoPorId);
router.get('/aeronave/:aeronaveId', ProducaoController.buscarProducaoPorAeronave);
router.get('/estatisticas', ProducaoController.obterEstatisticasProducao);
router.post('/', ProducaoController.criarProducao);
router.put('/:id', ProducaoController.atualizarProducao);
router.put('/:id/percentual', ProducaoController.atualizarPercentualProducao);
router.put('/:id/finalizar', ProducaoController.finalizarProducao);
router.put('/:id/cancelar', ProducaoController.cancelarProducao);
router.delete('/:id', ProducaoController.deletarProducao);

export default router;
