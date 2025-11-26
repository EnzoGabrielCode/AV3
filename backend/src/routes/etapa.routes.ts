import { Router } from 'express';
import * as EtapaController from '../controllers/etapa.controller';

const router = Router();

router.get('/', EtapaController.listarEtapas);
router.get('/aeronave/:aeronaveId', EtapaController.listarPorAeronave);
router.get('/:id', EtapaController.buscarPorId);
router.post('/', EtapaController.criarEtapa);
router.put('/:id', EtapaController.atualizarEtapa);
router.put('/:id/reordenar', EtapaController.reordenar);
router.put('/:id/status', EtapaController.atualizarStatus);
router.delete('/:id', EtapaController.deletarEtapa);

export default router;
