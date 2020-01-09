const Promise = require('./PromiseNew');

let p1 = new Promise((resovle,reject)=>{
    // resovle(111);
    // reject(222);
    throw new Error('test 抛错');
}); 
p1.then((resoult)=>{
    console.log(resoult);
},(reason)=>{
    console.log(reason);
})

