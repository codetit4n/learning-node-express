const {readFile,writeFile} = require('fs');

readFile('./content/first.txt','utf8',(err,result)=>{
    if(err){
        console.log(err);
        reuturn
    }
    const first = result;
    readFile('./content/second.txt','utf8',(err,result)=>{
        if(err){
            console.log(err);
            reuturn
        }
        const second = result; 
        writeFile('./content/result-async.txt',
        `Output: ${first},${second}`,
        (err,result)=>{
            if(err){
                console.log(err);
                reuturn
            }
            console.log(result);
        })
    })
})