// const Promise = require('./PromiseNew');

// let p1 = new Promise((resovle,reject)=>{
//     // resovle(111);
//     // reject(222);
//     throw new Error('test 抛错');
// }); 
// p1.then((resoult)=>{
//     console.log(resoult);
// },(reason)=>{
//     console.log(reason);
// })
const Promise = require('./Promise');

let p = new Promise((resovle,reject)=>{
    // resovle(111);
    // reject(222);
    //throw new Error('test 抛错');
    setTimeout(()=>{
        resovle(111);
    })
}); 
p.then((resoult)=>{
    console.log(resoult);
},(reason)=>{
    console.log(reason);
    //throw new Error('test')
}).then((resoult)=>{
    console.log(resoult+'data2');
},(reason)=>{
    console.log(reason);
})


