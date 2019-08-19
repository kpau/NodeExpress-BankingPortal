const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
  res.render('transfer');
});

router.post('/transfer', (req, res) => {
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

router.get('/payment', (req, res) => {
  res.render('payment', {
    account: accounts.credit,
  });
});

router.post('/payment', (req, res) => {
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

module.exports = router;
