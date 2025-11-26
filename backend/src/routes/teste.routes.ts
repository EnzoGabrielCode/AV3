import { Router } from 'express';
import * as TesteController from '../controllers/teste.controller';

const router = Router();

router.get('/', TesteController.listarTestes);
router.get('/aeronave/:aeronaveId', TesteController.listarPorAeronave);
router.get('/:id', TesteController.buscarPorId);
router.post('/', TesteController.criarTeste);
router.put('/:id', TesteController.atualizarTeste);
router.put('/:id/executar', TesteController.executarTeste);
router.put('/:id/resultado', TesteController.registrarResultado);
router.delete('/:id', TesteController.deletarTeste);

export default router;
