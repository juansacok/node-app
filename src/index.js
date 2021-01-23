const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();



//Initializations
const app = express();
require('./dataBase');



//Settings
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));



//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));


//Global Variables



//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/user'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')))


//Server
app.listen(app.get('port'), () => console.log(`
Server on: http://localhost:${app.get('port')}
Routes: {
    GET: {
        http://localhost:3000/
        http://localhost:3000/about
        http://localhost:3000/user/signin
        http://localhost:3000/user/signup
        http://localhost:3000/notes
    }
}`));