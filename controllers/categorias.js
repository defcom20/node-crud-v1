const { response } = require("express");

const { Categoria } = require('../models')

const getCategoria = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const status = { estado: true }

    const [total, data] = await Promise.all([
        Categoria.countDocuments(status),
        Categoria.find(status)
            .populate('user_id', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        data
    })
}

const getCategoriaId = async (req, res = response) => {
    const { id } = req.params
    
    try {
        const data = await Categoria.findById(id).populate('user_id', 'nombre')
        res.json({
            msg: 'GetCategoriaId success',
            data
        })
    } catch (error) {
        res.status(401).json({
            message: `GetCategoriaId no encontrado`
        })
    }

}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    try {
        //Existe nombre categoria ????
        const categoriaDB = await Categoria.findOne({ nombre })

        if (categoriaDB) {
            return res.status(400).json({
                message: `La categoria ${categoriaDB.nombre}, ya existe.`
            })
        }

        const data = {
            nombre,
            user_id: req.usuario._id
        }

        const categoria = new Categoria(data)
        await categoria.save()

        res.json({
            message: "Categoria success"
        })

    } catch (error) {
        res.status(401).json({
            message: 'Algo salio mal en crear la categoria.', error
        })
    }
}

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params
    const { estado, user_id, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.user_id = req.usuario._id

    try {
        await Categoria.findByIdAndUpdate(id, data, { new: true})

        res.json({
            msg: 'Update success',
        })

    } catch (error) {
        res.status(401).json({
            message: `No se pudo actualizar la categoria`
        })
    }

}

const eliminarCategoria = async (req, res = response) => {
    const { id } = req.params
    try {
        await Categoria.findByIdAndUpdate(id, { estado: false }, {new: true})
        res.json({
            msg: 'Delete categoria success',
        })
    } catch (error) {
        res.status(401).json({
            message: `Delete error ${error}`
        })
    }
}

module.exports = {
    getCategoria,
    getCategoriaId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}