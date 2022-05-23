const express = require('express');
const app = express();

const createZip = require('./create-zip');

app.get('/raml', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(ramlSpecString);
});

app.get('/raml.zip', async (req, res) => {
  await createZip();

  res.set('Content-Type', 'application/zip');
  res.sendFile(__dirname + '/raml-spec.yml.gz');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000');
});
