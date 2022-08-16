const path = require('path')

console.log(path.sep);

/* Join method: Joins a sequence of path segements using that platform specific
seperator as the limiter and second thing it does is, it returns a normalized
resulting path */

const filePath = path.join('/content','subfolder','test.txt')
console.log(filePath);
/* Note: Here we will get the normalized path(i.e., path without any unneccesory
trailing /'s ).*/

const base = path.basename(filePath); //to get base name - last portion of path
console.log(base);

/*resolve - returns an absolute path. It accepts a sequence of paths or path segments
and resolves it into an absolute path.
*/

const absolute = path.resolve(__dirname,'content','subfolder','test.txt')
console.log(absolute);