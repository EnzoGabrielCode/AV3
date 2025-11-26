import { Router } from 'express'
import { UsuarioController } from '../controllers/usuario.controller'

const router = Router()

router.post('/login', UsuarioController.login)
router.get('/', UsuarioController.listar)
router.get('/:id', UsuarioController.buscarPorId)
router.post('/', UsuarioController.criar)
router.put('/:id', UsuarioController.atualizar)

export default router
