import { Router } from 'express';
import * as FuncionarioController from '../controllers/funcionario.controller';

const router = Router();

router.get('/', FuncionarioController.listarFuncionarios);
router.get('/aeronave/:aeronaveId', FuncionarioController.listarPorAeronave);
router.get('/:id', FuncionarioController.buscarPorId);
router.post('/', FuncionarioController.criarFuncionario);
router.put('/:id', FuncionarioController.atualizarFuncionario);
router.put('/:id/aeronave', FuncionarioController.associarAeronave);
router.delete('/:id', FuncionarioController.deletarFuncionario);

export default router;
