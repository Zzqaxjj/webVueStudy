const myPromise = require('./MyPromise');

// let p1 = new Promise((resovle,reject)=>{
//     resovle(123);
//     reject(11);
// });
// p1.then((resoult)=>{
//     console.log(1);
// },(reason)=>{
//     console.log(2);
// });
// console.log(3);
let p1 = new myPromise((resolve,reject)=>{
    // resolve(11);
    // reject(12);
    //throw new Error('抛错')
    // setTimeout(function(){
    //     resolve('ok')
    // })
    // setTimeout(function(){
    //     reject('error')
    // },2000)
    resolve('ok')
});
p1.then((resoult)=>{
    console.log(resoult);
    //return 10;
},(reason)=>{
    console.log(reason);
}).then((data)=>{
    console.log('sss'+data);
},(err)=>{
    console.log(err);
})

















