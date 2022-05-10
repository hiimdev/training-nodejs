const { query } = require('express');
const express = require('express');
const app = express();

const userRouter = require('./routes/user.route');

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
