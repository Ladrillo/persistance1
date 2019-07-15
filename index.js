const express = require('express');
const knex = require('knex');
const app = express();

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db/database.db3',
  },
  useNullAsDefault: true,
});

function getAllUsers() {
  // SELECT * FROM users;
  return db('users');
}

function getUserById(id) {
  // SELECT * FROM users WHERE id = id;
  return db('users').where({ id });
}

function createNewUser({ fname, lname }) {
  // INSERT INTO users (fname, lname) VALUES (fname, lname);
  return db('users').insert({ fname, lname });
}

app.use(express.json());

app.get('/', (req, res, next) => {
  res.json('success!');
});

app.get('/users/:id', async (req, res) => {
  const records = await getUserById(req.params.id);
  res.json(records[0]);
});

app.get('/users', async (req, res) => {
  // pull all users from db
  const users = await getAllUsers();
  // send users back to client
  res.json(users);
});

app.post('/users', async (req, res) => {
  // improve so we return newly created record instead of an array of ids
  const result = await createNewUser(req.body);
  res.json(result);
});

app.use(function errorHandler(err, req, res, next) {
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(4000, () => console.log('listening on 4000'));
