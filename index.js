const express = require('express');
const dotenv = require('dotenv').config(); 
const session = require('express-session'); 
const bodyParser = require('body-parser');
const ejs = require('ejs')

const app = express();
const port = process.env.PORT || 3000;

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
};

app.use(session(sessionConfig));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.redirect('/login')
})
app.get('/login', (req, res) => {
    res.render('login', { user: req.session.user });
});
app.get('/incorrect', (req,res) => {
    res.render('error', { user: req.session.user });
});

app.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});
app.get('/admin', (req, res) => {
    if (req.session.user) {
        res.render('admin', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

app.post('/logins', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.session.user = true;
        res.redirect('/admin');
    } else if (username === process.env.VIEWER_USERNAME && password === process.env.VIEWER_PASSWORD) {
        req.session.user = true;
        res.redirect('/home');
    } else {
        res.redirect('/incorrect');
    };
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
