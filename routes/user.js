
const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPost, userPut, userDelete } = require('../controllers/user');

const { esRolValido } = require('../helpers/db-validators');

const {
    validarCampos,
    emailExiste,
    existeUsuarioPorId,
    validarJWT,
    isAdmin,
    tieneRol
} = require('../middlewares')

const router = Router()

router.get('/', userGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y de 6 caracter').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], userPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], userPut);

router.delete('/:id', [
    validarJWT,
    // isAdmin,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], userDelete);

module.exports = router;