class Promise {
    constructor(exectorCallback) {
        let _this = this;
        _this.status = 'pending';
        _this.value = '';
        _this.reason = undefined;
        _this.onFulfilledCallbacks = [];
        _this.onRejectedCallbacks = [];
        function resolve (value) {
            if (_this.status === 'pending') {
                _this.status = 'resolved';
                _this.value = value;
                _this.onFulfilledCallbacks.forEach(item => item(value));
            }
        }

        function reject (reason) {
            if (_this.status === 'pending') {
                _this.status = 'rejected';
                _this.reason = reason;
                _this.onRejectedCallbacks.forEach(item => item(reason));
            }
        }
        try {
            exectorCallback(resolve,reject);
        } catch (error) {
            reject (error);
        }
    }
    
    then (onFulfilled,onRejected) {
        let promise2;
        let _this = this;
        function onAllCallback(promise2, x, resolve, reject) {
            if (promise2 == x) {}
            if (x != null && (typeof x === 'function' || typeof x === 'object')) {
                let used;
                try {
                    let then = x.then;
                    if (typeof then === 'function') {
                        if (used) return;
                        used = true;
                        then.call(x, (y)=>{
                            onAllCallback(promise2, y, resolve, reject);
                        },(err)=>{
                            if (used) return;
                            used = true;
                            reject(err);
                        })
                    } else {
                        resolve(x);
                    }
                } catch (error) {
                    if (used) return;
                    used = true;
                    reject(x);
                }
            } else {
                resolve(x);
            }
        }   

        if (_this.status === 'resolved') {
            promise2 = new Promise((resolve,reject)=> {
                setTimeout(()=>{
                    let x = onFulfilled(_this.value);
                    onAllCallback(promise2, x, resolve, reject);
                });
            });
        }
        if (_this.status === 'rejected') {
            promise2 = new Promise((resolve,reject)=> {
                setTimeout(()=>{
                    let x = onRejected(_this.reason);
                    onAllCallback(promise2, x, resolve, reject);
                });
            });
        }
        if (_this.status === 'pending') {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
        return promise2;
    }
}

module.exports = Promise;