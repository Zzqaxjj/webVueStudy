let fs = require('fs');

function read(path) {
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf-8',function(err,data){
            if (err) return reject(err);
            resolve(data);
        })
    });
}

// read('./a.txt').then((data)=>{
//     console.log(data);
// })

Promise.race([read('./a.txt'),read('./b.txt')]).then(arr=>{
    let [a,b] = arr;
    console.log(arr);
    console.log(a);
    console.log(b);
},(error)=>{
    console.log(error);
    
})