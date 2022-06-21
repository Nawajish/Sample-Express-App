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

app.get('/swagger', (req, res) => {
  const swaggerSpec = fs.readFileSync('./swagger-spec.yml', 'utf8');
  const swaggerSpecString = swaggerSpec.split('\r\n').join('\n');

  res.send(swaggerSpecString);
});

app.get('/raml.zip', async (req, res) => {
  await createZip();

  res.set('Content-Type', 'application/zip');
  res.sendFile(__dirname + '/raml-spec.yml.gz');
});

app.get('/users', (req, res) => {
  res.send('Users');
})

app.get('/user/:id', (req, res) => {
  // get id from request params or query string or body
  const id = req.params?.id || req.body?.id;
  console.log(id);
  res.send(`User ${id}`);
});

app.listen(process.env.PORT || 3131, () => {
  console.log('Server listening on port 3131');
});
