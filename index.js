const csvparser = require('csv-parser');
const _ = require('lodash');
const fs = require('fs');
const grid = [];
const root = 'Person';

fs.createReadStream('data.csv')
  .pipe(csvparser())
  .on('data', (row) => {
    console.log(row);
    
    const el = _.keys(row).map((k) => (
      '  <' + k + '>' + row[k] + '</' + k + '>'
    )).join('\n');
    console.log(el);
    
    grid.push('<' + root + '>\n' + el + '\n</' + root +'>\n')
  })
  .on('end', () => {
    console.log('\n');
    console.log(grid.join(''));
  });
