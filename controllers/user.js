
const { response } = require('express');
const bcryptjs = require('bcryptjs');

//Models
const User = require('../models/user');

const userGet = async(req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const status = { estado: true }

    // const usuario = await User.find(status)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    //const total = await User.countDocuments(status)

    const [total, data] = await Promise.all([
        User.countDocuments(status),
        User.find(status)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        data
    })
}
const userPost = async (req, res = response) => {
   
    const { nombre, correo, password, rol} = req.body;
    const user = new User({ nombre, correo, password, rol })
    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)
    //Guardar base de datos
    await user.save()

    res.json({
        msg: 'POST CONTROLLERS', user
    })
}
const userPut = async (req, res = response) => {

    const { id } = req.params
    const { password, google, correo, ...data } = req.body

    //Todo validar BD
    if( password ){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await User.findByIdAndUpdate(id, data)

    res.json({
        msg: 'PUT correcto', usuario
    })

    
}
const userDelete = async(req, res = response) => {

    const { id } = req.params
    const usuario = await User.findByIdAndUpdate(id, {estado: false})
    const usuarioAtenticado = req.usuario

    res.json({
        usuario,
        usuarioAtenticado
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}