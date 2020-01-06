class MyPromise {
    constructor (executorCallback) {
        let _this = this;
        _this.value = '';// 记录成功原因
        _this.reason = undefined;// 记录失败的原因
        this.status = 'pending';// 默认等待状态
        function resolve(value) {
            if (_this.status === 'pending') {
                _this.status = 'resolved';// 状态改成成功状态
                _this.value = value;
            }
        }
        function reject(reason) {
            if (_this.status === 'pending') {
                _this.status = 'rejected';// 状态改成失败状态
                _this.reason = reason;
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
        if (this.status === 'resolved') {
            onFufilled(this.value);
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
    };
}

module.exports = MyPromise






























