var db = require('../db/db');

module.exports.index = (req, res) => {
    res.render('./products/products', {
        products: db.get('products').value(),
    });
};
