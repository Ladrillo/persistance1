const express = require('express');
// 2- BRING KNEX
const knex = require('knex');
const app = express();

// 3- CREATE THE DB WRAPPER USING KNEX
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './db/database.db3',
  },
  useNullAsDefault: true,
});

app.use(express.json());

app.get('/', (req, res, next) => {
  res.json('success!');
});

// 1-  ENDPOINT
app.get('/users', (req, res) => {
  // pull all users from db
  // send users back to client
});

// this comes at the end of the pipeline
app.use(function errorHandler(err, req, res, next) {
  console.error('ERROR:', err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(4000, () => console.log('listening on 4000'));
