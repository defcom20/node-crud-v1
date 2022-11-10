const jwt = require('jsonwebtoken')

const generarJWT = ( uid = '') => {
    return new Promise( (resolve, reject) => {
        const payload = { uid }        
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log("🚀 ~ file: generar-jwt.js ~ line 12 ~ returnnewPromise ~ err", err)                
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT
}