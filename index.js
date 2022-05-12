require('dotenv').config();

const { query } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');

// Route
const userRouter = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const authMiddleware = require('./middlewares/auth.middleware');

const port = 3000;

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// cookies
app.use(cookieParser(process.env.SESSION_SECRET));

// Set view engine
app.set('view engine', 'pug');
app.set('views', './views');

// file static
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/users', authMiddleware.requireAuth, userRouter);
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
