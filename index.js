const csvparser = require('csv-parser');
const _ = require('lodash');
const fs = require('fs');
const grid = [];
const root = 'Person';
const csv = './data.csv';
const xml = './data.xml';

fs.createReadStream(csv)
  .pipe(csvparser())
  .on('data', (row) => {
    const el = _.keys(row).map((k) => (
      '  <' + k + '>' + row[k] + '</' + k + '>'
    )).join('\n');
    grid.push('<' + root + '>\n' + el + '\n</' + root +'>\n')
  })
  .on('end', () => {
    const str = grid.join('');
    fs.writeFile(xml, str, function (err) {
      if (err) return console.log(err);
    });
  });
