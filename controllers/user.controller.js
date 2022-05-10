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
        .get('users')
        .filter(
            (user) => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1,
        );

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

    db.get('users').push(req.body).write();
    res.redirect('/users');
};
