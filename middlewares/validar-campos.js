const { validationResult } = require('express-validator');
const { User } = require('../models');

const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

const emailExiste = async( correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await User.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async( id ) => {
    //Verificar si el correo existe
    const existeUsuario = await User.findById(id)
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = { validarCampos, emailExiste, existeUsuarioPorId }