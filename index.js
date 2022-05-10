const { query } = require('express');
const express = require('express');
const app = express();
const port = 3000;

// short id:
const shortid = require('shortid');

// lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

// =====================

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Huy',
    });
});

app.get('/users', (req, res) => {
    res.render('users', {
        users: db.get('users').value(),
    });
});

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchUser = db
        .get('users')
        .filter(
            (user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1,
        );

    res.render('users', {
        users: matchUser,
    });
});

app.get('/users/create', (req, res) => {
    res.render('create');
});

app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();

    res.render('infor', {
        user: user,
    });
});

app.post('/users/create', function (req, res) {
    req.body.id = shortid.generate();

    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
