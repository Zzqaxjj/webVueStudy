class PromiseNew {
    constructor (executorFuntion) {
        // 初始状态 
        let _this = this;
        _this.status = 'pending';
        _this.value = '';
        _this.reason = undefined;

        function resovle(value) {
            if (_this.status === 'pending') {
                _this.status = 'resovled';
                _this.value = value;
            }
        }

        function reject(reason) {
            if (_this.status === 'pending') {
                _this.status = 'rejected';
                _this.reason = reason;
            }
        }

        try {
            executorFuntion(resovle,reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFufilled,onRejected){
        if (this.status === 'resovled') {
            onFufilled(this.value);
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
    };
}

module.exports = PromiseNew;
