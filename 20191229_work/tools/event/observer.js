//被观察者
class Subject {
    constructor(name) {
        this.name = name;
        this.observers = []; //存放所有观察者
        this.mood = '心情很美丽';
    }
    // 接收观察者方法
    attach(observer) {
        this.observers.push(observer);
    }
    setMood(newMood) {
        this.mood = newMood;
        this.observers.forEach(ob=>ob.update(newMood));
    }
}

//观察者
class Observer {
    constructor (name) {
        this.name = name;
    }
    update(newMood) {
        console.log(this.name+'知道了：'+newMood);
    }
}

let sub = new Subject('girl');
let o1 = new Observer('boy1');
let o2 = new Observer('boy2');
sub.attach(o1);
sub.attach(o2);
sub.setMood('心情很糟糕');