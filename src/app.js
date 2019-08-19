/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Index',
  });
});

app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
