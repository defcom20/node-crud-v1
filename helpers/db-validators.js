// const Categoria = require('../models/categoria')
// const Role = require('../models/role')

const { response } = require("express")
const { Role, Categoria } = require("../models")

const esRolValido = async (rol = '') => {
    try {
        const existeRol = await Role.findOne({ rol })
        if (!existeRol) {
            throw new Error(`El rol ${rol} no esta en la BD.`)
        }
    } catch (error) {
        throw new Error(`El rol ${rol} no esta en la BD.`)
    }
}

const existeCategoriaId = async (id) => {
    try {
        const res = await Categoria.findById(id)
        if (!res.estado) {
            throw new Error(`La categoria ${id} no existe ó fue borrado.`)
        }
    } catch (error) {
        throw new Error(`El id ${id} no existe.`)
    }
}

module.exports = { esRolValido, existeCategoriaId }