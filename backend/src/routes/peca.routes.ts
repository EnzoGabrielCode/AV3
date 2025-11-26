import { Router } from 'express';
import * as PecaController from '../controllers/peca.controller';

const router = Router();

router.get('/', PecaController.listarPecas);
router.get('/aeronave/:aeronaveId', PecaController.listarPorAeronave);
router.get('/:id', PecaController.buscarPorId);
router.post('/', PecaController.criarPeca);
router.put('/:id', PecaController.atualizarPeca);
router.put('/:id/status', PecaController.atualizarStatus);
router.delete('/:id', PecaController.deletarPeca);

export default router;
