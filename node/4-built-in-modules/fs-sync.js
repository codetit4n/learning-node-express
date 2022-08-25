const {readFileSync, writeFileSync} = require('fs');

const first = readFileSync('./content/first.txt','utf8');//NOTE: utf8 encoding
const second = readFileSync('./content/second.txt','utf8');

console.log(first,second);

//create new file
writeFileSync('./content/result-sync.txt',
`Here is the result ${first},${second}`,
{flag:'a'}
);
/* If the file is not there node will create one and if the file is already there
node by default will overwrite all the values that are in the file. */

