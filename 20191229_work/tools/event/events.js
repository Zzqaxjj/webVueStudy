function  Events () {
    this.callbacks = [];
    this.resoults = [];
}

//订阅
Events.prototype.on = function (callback) {
    this.callbacks.push(callback);
}

//发布
Events.prototype.emit = function (data) {
    this.resoults.push(data);
    this.callbacks.forEach(cb=>cb(this.resoults));
}

let e = new Events();
e.on(function(res){

});

