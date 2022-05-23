const fs = require('fs');
const zlib = require('zlib');

const createZip = function () {
  return new Promise((resolve, reject) => {
    //   const ramlSpec = fs.readFileSync('./raml-spec.yml', 'utf8');
    //   const ramlSpecString = ramlSpec.split('\r\n').join('\n');

    const readStream = fs.createReadStream('./raml-spec.yml', 'utf8');
    const writeStream = fs.createWriteStream('./raml-spec.gz');

    const gzip = zlib.createGzip();
    readStream
      .pipe(gzip)
      .pipe(writeStream)
      .on('finish', () => {
        console.log('done');
      });


      resolve('true');
  });
};

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

module.exports = createZip;
