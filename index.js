const fs = require('fs');
const express = require('express');
const app = express();

const createZip = require('./create-zip');

app.get('/', (req, res) => {
  res.send('Server is up!');
});

app.get('/raml', (req, res) => {
  // const ramlSpec = fs.readFileSync('./raml-spec.yml', 'utf8');
  const ramlSpec = fs.readFileSync('./swagger-spec.yml', 'utf8');
  const ramlSpecString = ramlSpec.split('\r\n').join('\n');

  res.send(ramlSpecString);
});

app.get('/raml.zip', async (req, res) => {
  await createZip();

  res.set('Content-Type', 'application/zip');
  // res.sendFile(__dirname + '/raml-spec.yml.gz');
  res.sendFile(__dirname + '/swagger-spec.yml.gz');
});

app.get('/user/:userId/order', (req, res) => {
  console.log(req);
  const reqBody = req.body.run ? req.body.run : req.body;
  const params = reqBody?.params;

  const { queryParameters, uriParameters } = params._testaction.input.formData;

  console.log(queryParameters);
  console.log(uriParameters);


  res.send({
    userId: queryParameters.orderId,
    orderId: uriParameters.userId
  });
});

app.get('/store/inventory', (req, res) => {
  res.send({
    store: 1
  });
})

app.get('/users', (req, res) => {
  res.send('Mock user details')
})

app.listen(process.env.PORT || 3131, () => {
  console.log('Server listening on port 3131');
});
