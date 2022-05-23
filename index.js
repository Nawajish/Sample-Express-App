const express = require('express');
const app = express();

const createZip = require('./create-zip');
const PORT = 3000;

app.get('/raml', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(ramlSpecString);
});

app.get('/raml.zip', async (req, res) => {
  await createZip();

  res.set('Content-Type', 'application/zip');
  res.sendFile(__dirname + '/raml-spec.yml.gz');
});

app.listen(PORT, HOSTNAME || '0.0.0.0', () => {
    console.log('Server listening on port 3000');
});
