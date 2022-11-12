const { Router } = require('express');
const { check } = require('express-validator');

const { getCategoria, getCategoriaId, crearCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');


const { validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoriaId } = require('../helpers/db-validators');
const { isAdmin } = require('../middlewares');

const router = Router()

router.get('/', getCategoria)

router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    //check('id').custom(isActiveCategoriaId),
    validarCampos
], getCategoriaId)

router.post('/', [
    validarJWT,
    check('nombre', 'el nonmbre es obligatorio').not().isEmpty(), 
    validarCampos
], crearCategoria)

router.put('/:id',[
    validarJWT,
    check('nombre', 'el nonmbre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaId),
    validarCampos
], actualizarCategoria)

//Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    isAdmin,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], eliminarCategoria)

module.exports = router;
