
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Connect database 
        this.connectDb();

        // Middleware
        this.middleware();

        // Routes of my app
        this.router();
    }

    async connectDb (){
        await dbConnection();
    }

    middleware() {

        //CORS
        this.app.use( cors());

        // lecture and parse lobby
        this.app.use( express.json());

        // public directory
        this.app.use( express.static('public'));
    }

    router() {
        this.app.use( this.usersPath, require('../routes/users'))
    }

    listen() {
        this.app.listen( this.port , ()=>{
            console.log('Server on PORT:', this.port )
        })
    }

}


module.exports = Server;