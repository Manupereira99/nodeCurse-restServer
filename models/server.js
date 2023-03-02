
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths= {
            auth:           '/api/auth',
            searchs:         '/api/searchs',
            users:          '/api/users',
            categories:     '/api/categories',
            products:       '/api/products',
        }


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
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.searchs, require('../routes/search') );
        this.app.use( this.paths.users, require('../routes/users') );
        this.app.use( this.paths.categories, require('../routes/categories') );
        this.app.use( this.paths.products, require('../routes/products') );

    }

    listen() {
        this.app.listen( this.port , ()=>{
            console.log('Server on PORT:', this.port )
        })
    }

}


module.exports = Server;