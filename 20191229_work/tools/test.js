console.log('13')

function isType(obj) {
    return Object.prototype.toString.call(obj).includes('String');
}
console.log(isType('fdsfsdf'));

function say(...who) {
    console.log(who+'saying');
}
 
Function.prototype.before = function(fn) {
    let _this = this;
    return function() {
        fn();
        _this(...arguments);
    }
}

let newFn = say.before(function() {
    console.log("sss");
    
}) 

newFn('我','你');