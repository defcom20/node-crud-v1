
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = 8700;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            user:       '/api/user'
        }        

        //Conectar a base de datos
        this.conectarDB()

        // Middlewate
        this.middlewares();
        //Rutas de mi aplicacion

        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.user, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Puerto corriendo en http://localhost:${this.port}`)
        })
    }

}

module.exports = Server;