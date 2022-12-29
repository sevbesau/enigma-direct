const express = require('express');
const morgan = require('morgan');
const path = require('path');

const redirects = require('./redirects.json');
console.log(redirects);

require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(morgan('tiny'));

app.get('*', (req, res) => {
    const slug = req.url.replace(/^\//, '');
    const { url, files } = redirects[slug];
    res.render('index', { url, files });
});

app.listen(process.env.PORT, () => {
    console.log(`[express] app listening on port ${process.env.PORT}`);
});