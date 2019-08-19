const fs = require('fs');
const path = require('path');

const accountsJsonPath = path.join(__dirname, 'json/accounts.json');
const accountData = fs.readFileSync(accountsJsonPath, { encoding: 'UTF8' });
const accounts = JSON.parse(accountData);

const usersJsonPath = path.join(__dirname, 'json/users.json');
const userData = fs.readFileSync(usersJsonPath, { encoding: 'UTF8' });
const users = JSON.parse(userData);

const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts, null, 2);
  fs.writeFileSync(accountsJsonPath, accountsJSON, 'UTF8');
};

module.exports = { accounts, users, writeJSON };
