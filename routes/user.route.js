var express = require('express');
const shortid = require('shortid');

var db = require('../db/db');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('./users/users', {
        users: db.get('users').value(),
    });
});

router.get('/search', (req, res) => {
    let q = req.query.q;
    let matchUser = db
        .get('users')
        .filter(
            (user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1,
        );

    res.render('./users/users', {
        users: matchUser,
    });
});

router.get('/create', (req, res) => {
    res.render('./users/create');
});

router.get('/:id', (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();

    res.render('./users/infor', {
        user: user,
    });
});

router.post('/create', function (req, res) {
    req.body.id = shortid.generate();

    db.get('users').push(req.body).write();
    res.redirect('/users');
});

module.exports = router;
