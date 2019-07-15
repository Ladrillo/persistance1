const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.json('success!');
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
