const mongoose = require('mongoose')

const dbConnection = async () => {

    const url = "mongodb+srv://user_node_cafecito:Slt38oChNkhWs2ik@clusterdemo.znc9w10.mongodb.net/cafeDB"

    try {
        await mongoose.connect(url)
        console.log("base de datos conectado")
    } catch (error) {
        console.log(error)
        // throw new Error('Error en la DB')
    }
}

module.exports = {
    dbConnection
}