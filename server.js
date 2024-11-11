//REQUIRES

const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');


//SERVER SETTINGS

const PORT = process.env.PORT || 3001;
const app = express();


//USE
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(routes);


//DB LISTEN
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server now running on port ${PORT}`);
    });
});