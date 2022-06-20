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

app.get('/user/:userID', (req, res) => {
  // get userId from request params or query string or body
  const userID = req.params?.userID || req.body?.userID;
  console.log(userID);
  res.send(`User ${userID}`);
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

app.post('/testDummy', (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.data);
  console.log(req.formData);
  res.send(201);
})

app.listen(process.env.PORT || 3131, () => {
  console.log('Server listening on port 3131');
});
