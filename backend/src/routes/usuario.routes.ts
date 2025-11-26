import { Router } from 'express';
import * as UsuarioController from '../controllers/usuario.controller';

const router = Router();

router.post('/login', UsuarioController.login);
router.post('/registro', UsuarioController.registro);
router.get('/', UsuarioController.listar);
router.get('/:id', UsuarioController.buscarPorId);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.deletar);

export default router;
