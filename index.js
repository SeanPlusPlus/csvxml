const csvparser = require('csv-parser');
const _ = require('lodash');
const fs = require('fs');
const grid = [];
const csv = './data.csv';
const xml = './data.xml';
const el = 'Person';

fs.createReadStream(csv)
  .pipe(csvparser())
  .on('data', (row) => {
    const values = _.keys(row).map((k) => (
      '  <' + k + '>' + row[k] + '</' + k + '>'
    )).join('\n');
    grid.push('<' + el + '>\n' + values + '\n</' + el +'>\n')
  })
  .on('end', () => {
    const str = grid.join('');
    fs.writeFile(xml, str, function (err) {
      if (err) return console.log(err);
    });
  });
