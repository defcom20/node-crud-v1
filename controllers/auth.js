const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const {correo, password} = req.body

    try {
        //Verificar si el email existe
        const usuario = await User.findOne({ correo })
        if(!usuario){
            return res.status(400).json({
                message: 'Correo / Password no son correctos - c'
            })
        }
        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                message: 'Correo / Password no son correctos - e'
            })
        }
        //Verificar la contraseña
        const validatePass = bcryptjs.compareSync(password, usuario.password)
        if (!validatePass) {
            return res.status(400).json({
                message: 'Correo / Password no son correctos - p'
            })
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id)


        res.json({ usuario, token })
        
    } catch (error) {
        console.log("🚀 ~ file: auth.js ~ line 16 ~ login ~ error", error)        
        res.status(500).json({
            message: "hable con el admin"
        })
    }
}

module.exports = {
    login
}

