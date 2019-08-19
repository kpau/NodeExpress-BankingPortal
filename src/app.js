/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');

const PORT = 3000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Account Summary',
    accounts,
  });
});

app.get('/savings', (req, res) => {
  res.render('account', {
    account: accounts.savings,
  });
});

app.get('/checking', (req, res) => {
  res.render('account', {
    account: accounts.checking,
  });
});

app.get('/credit', (req, res) => {
  res.render('account', {
    account: accounts.credit,
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    user: users[0],
  });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;

  const fromAccount = accounts[from];
  const toAccount = accounts[to];
  const ammountValue = parseInt(amount, 10);

  fromAccount.balance -= ammountValue;
  toAccount.balance += ammountValue;

  writeJSON();

  res.render('transfer', {
    message: 'Transfer Completed',
  });
});

app.get('/payment', (req, res) => {
  res.render('payment', {
    account: accounts.credit,
  });
});

app.post('/payment', (req, res) => {
  const amount = parseInt(req.body.amount, 10);
  const account = accounts.credit;

  account.balance -= amount;
  account.available += amount;

  writeJSON();

  res.render('payment', {
    message: 'Payment Completed',
    account,
  });
});

app.listen(PORT, () => {
  console.log(`PS Project Running on port ${PORT}!`);
});
