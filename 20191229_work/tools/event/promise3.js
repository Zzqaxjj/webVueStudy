//  Promise
// let p1 = new Promise(()=>{
//     console.log('promise');
// })
// console.log('world');
/*
    function read () {
        fs.readFile('a.txt','utf-8',function(err,data){
            if (err) return console.log(err);
            console.log(data);
            fs.readFile('b.txt','utf-8',function(err,data){
                if (err) return console.log(err);
                console.log(data)
            });
        });
    }
    read();
*/
const fs = require('fs');
// let promise = new Promise((resolve,reject)=>{
//     fs.readFile('a.txt','utf-8',function(err,data){
//         if (err) return reject(err);
//         resolve(data);
//     });
// });
// promise.then(data=>{
//     console.log(data);
// },err=>{
//     console.log(err)
// });

function read(path) {
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf-8',function(err,data){
            if (err) return reject(err);
            resolve(data);
        });
    });
}
read('a.txt').then(
    data=>{
        console.log(data);
        return read('b.txt');
    }).then(
        data=>{
            console.log(data);
        });



