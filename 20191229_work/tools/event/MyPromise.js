class MyPromise {
    constructor (executorCallback) {
        let _this = this;
        _this.value = '';// 记录成功原因
        _this.reason = undefined;// 记录失败的原因
        _this.status = 'pending';// 默认等待状态
        _this.onResolvedCallbacks = [];// 存放成功回调
        _this.onRejectedCallbacks = [];// 存放失败回调
        function resolve(value) {
            if (_this.status === 'pending') {
                _this.status = 'resolved';// 状态改成成功状态
                _this.value = value;
                // 依次执行成功回调
                _this.onResolvedCallbacks.forEach(item => item(_this.value));
            }
        }
        function reject(reason) {
            if (_this.status === 'pending') {
                _this.status = 'rejected';// 状态改成失败状态
                _this.reason = reason;
                _this.onRejectedCallbacks.forEach(item => item(_this.reason));
            }
        }
        try {
            executorCallback(resolve,reject);
        } catch(e) {
            // executorCallback 执行发生异常时执行 当前状态变为失败状态
            reject(e);
        }
    }
    // then 传入成功回调和失败回调
    then(onFufilled,onRejected){
        let promise2;// 将来返回新的 promise 目的是为了实现 then 的链式调用 
        function resolvePromise(promise2,x,resolve,reject) {
            if (x === promise2) {}
            if (x != null && (typeof x === 'object' || typeof x === 'function')) {
                let called;
                try {
                    let then = x.then;
                    if (typeof then === 'function') {
                        then.call(x,(y)=>{
                            if (called) return;
                            called = true;
                            resolvePromise(promise2,y,resolve,reject)
                        },(err)=>{
                            if (called) return;
                            called = true;
                            reject(err);
                        });
                    } else {
                        // 不是函数 是一个普通对象 直接成功
                        resolve(x);
                    }
                } catch (e) {
                    if (called) return;
                    called = true;
                    reject(e);
                }
            } else {
                resolve(x);
            }
        }
        if (this.status === 'resolved') {
            let _this = this;
            //let x = onFufilled(this.value);
            promise2 = new MyPromise((resolve,reject)=>{
                setTimeout(function () {
                    try {
                        let x = onFufilled(_this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        // 一旦有异常 直接将 promise2 的状态变为失败状态
                        reject(e);
                    }
                });
            })
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
        if (this.status === 'pending') {
            this.onResolvedCallbacks.push(onFufilled);
            this.onRejectedCallbacks.push(onRejected);
        }
        return promise2;
    };
}

module.exports = MyPromise






























