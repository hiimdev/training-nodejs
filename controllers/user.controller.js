const shortid = require('shortid');

var db = require('../db/db');

module.exports.index = (req, res) => {
    res.render('./users/users', {
        users: db.get('users').value(),
    });
};

module.exports.search = (req, res) => {
    let q = req.query.q;
    let matchUser = db
        .get('../db/db.json')
        .filter(
            (user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1,
        );

    console.log(matchUser);

    res.render('./users/users', {
        users: matchUser,
    });
};

module.exports.create = (req, res) => {
    res.render('./users/create');
};

module.exports.getInfor = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();

    res.render('./users/infor', {
        user: user,
    });
};

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate();

    let errors = [];

    if (!req.body.name) {
        errors.push('User name is require!');
    }

    if (!req.body.phone) {
        errors.push('User phone is require!');
    }

    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body,
        });
        return;
    }

    db.get('users').push(req.body).write();
    res.redirect('/users');
};
