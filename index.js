const fs = require('fs');
const express = require('express');
const app = express();

const createZip = require('./create-zip');

app.get('/', (req, res) => {
  res.send('Server is up!');
});

app.get('/raml', (req, res) => {
  const ramlSpec = fs.readFileSync('./raml-spec.yml', 'utf8');
  const ramlSpecString = ramlSpec.split('\r\n').join('\n');

  res.send(ramlSpecString);
});

app.get('/raml.zip', async (req, res) => {
  await createZip();

  res.set('Content-Type', 'application/zip');
  res.sendFile(__dirname + '/raml-spec.yml.gz');
});

app.get('/user/:userId', (req, res) => {
  // get userId from request params or query string or body
  const userId = req.params?.userID || req.body?.userID;
  res.send(`User ${userId}`);
});

// create PUT route for /user/:userId
app.put('/user/:userId', (req, res) => {
  // get userId from request params or query string or body
  const userId = req.params?.userId || req.body?.userId;
  res.send(`User ${userId}`);
});

// create DELETE route for /user/:userId
app.delete('/user/:userId', (req, res) => {
  // get userId from request params or query string or body
  const userId = req.params?.userId || req.body?.userId;
  res.send(`User ${userId}`);
});

app.listen(process.env.PORT || 3131, () => {
  console.log('Server listening on port 3131');
});
