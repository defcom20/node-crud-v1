const { response } = require("express")


const isAdmin = async(req, res = response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            message: 'Se quiere verificar el rol sin validar el token primero'
        }) 
    } 
    const { rol, nombre } = req.usuario
    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            message: `${nombre} no es administrador`
        }) 
    }
    next()
}

const tieneRol = ( ...roles ) => {
    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                message: 'Se quiere verificar el rol sin validar el token primero'
            })
        }
        if( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                message: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    isAdmin,
    tieneRol
}