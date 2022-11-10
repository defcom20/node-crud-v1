
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
    try {
        const user = new User({ nombre, correo, password, rol })
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt)
        await user.save()

        res.json({
            msg: `Data success`
        })
    } catch (error) {
        res.status(401).json({
            msg: `Create error ${error}`
        })
    }
}
const userPut = async (req, res = response) => {

    const { id } = req.params
    const { password, ...data } = req.body

    try {
        if (password) {
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync(password, salt)
        }
        await User.findByIdAndUpdate(id, data)
        res.json({
            msg: 'Update success',
        })
    } catch (error) {
        res.status(401).json({
            msg: `Update error ${error}`
        })
    }    
}
const userDelete = async(req, res = response) => {

    const { id } = req.params
    try {
        // const usuario = await User.findByIdAndUpdate(id, { estado: false })
        // const usuarioAtenticado = req.usuario
        await User.findByIdAndUpdate(id, { estado: false })
        res.json({
            msg: 'Delete success',
        })
    } catch (error) {
        res.status(401).json({
            msg: `Delete error ${error}`
        })
    }
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}