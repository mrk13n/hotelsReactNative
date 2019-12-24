const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require("cors");
const api = require('./api');

const configureEndpoints = (app) => {
    app.get('/api/checkLogin/', api.checkLogin);
    app.post('/api/registration/', api.registration);
    app.post('/api/login/', api.login);
    app.get('/api/logout/', api.logout);
    app.get('/api/getHotels/', api.getHotels);
    app.post('/api/getRooms/', api.getRooms);
};

const startServer = (port) => {
    const app = express();

    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    app.use(cors());

    app.use(session({
        secret: "hotels"
    }));

    configureEndpoints(app);

    app.listen(port, () => {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
};

exports.startServer = startServer;