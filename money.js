var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 2222;
var session = require('express-session');
var path = require('path');
const fileUpload = require('express-fileupload');
var flash = require('express-flash');
var passport   = require('passport');
require('./passport')(passport);

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload());
app.use(flash());
app.use(session({
    key: 'aid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
const webRoutes = require('./routes/web'); 
app.use(webRoutes); 

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port} port.`);
});