
const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...categoria } = this.toObject()
    return categoria
}

module.exports = model('Categoria', CategoriaSchema)