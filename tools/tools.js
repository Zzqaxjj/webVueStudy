/* 
    求指定区间中的素数个数 [min,max]
    返回值： 返回值为一个数组 [sum,count];
            sum 指区间内所有的素数和
            count 指区间内所有的素数个数
*/
function getSNum(min,max) {
    var count = 0;
    var sum = 0;
    for (var i=min;i<=max;i++) {
        var flag = true;
        for (j=2;j<i/2;j++) {
            if (i%j === 0){
                flag = false;
                break;
            }
        }
        if (flag) {
            count++;
            sum += i;
        }
    }
    return [sum,count];
}

/* 
    数组冒泡排序 
    传入一个数组对象： array
    是否从大到小排序： 默认 true 可传入false 
*/
function bubbleSort(array) {
    var flag = arguments[1];
    flag = flag != undefined ? flag : true;
    for (var i=0;i<array.length-1;i++) {
        for (var j=0;j<array.length-1-i;j++) {
            if (flag) {
                if (array[j] > array[j+1]) {
                    [array[j],array[j+1]] = [array[j+1],array[j]];
                }
            }else{
                if (array[j] < array[j+1]) {
                    [array[j],array[j+1]] = [array[j+1],array[j]];
                }
            }
        }
    }
    return array;
}


/* 
    生成区间是[min,max]中的随机数 
    如： getRandom(0,15);取 [0,15] 之间一个随机数
    返回值： 0 ~ 15 中一个数
*/
function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}


/* 
    随机生成一个颜色字符串
*/
function getRandomColor () {
    var str = '0123456789abcdef';
    var color='';
    for (var i=0;i<6;i++) {
        color += str[getRandom(0,15)];
    }
    return '#'+color;
}



/* 
    产生n位随机验证码
*/
function getRandomCode(n) {
    var code = '';
    for (var i=0;i<n;i++) {
        code += getRandomStr();
    }
    return code;
}


/* 
    随机取返回一位值
    取值为： [0,9] + [65,90] + [97,122] 中随机一位数 如果该值大于9 则通过 String.fromCharCode(s) 转换成[a,z]或者[A,Z]中一位数
*/
function getRandomStr() {
    var str = [];
    for (var i=0;i<=9;i++) {    /* [0,9] */
        str.push(i);
    }
    for (var i=65;i<=90;i++) {  /* [A,Z] */
        str.push(i);
    }
    for (var i=97;i<=122;i++) { /* [a,z] */
        str.push(i);
    }
    var num = parseInt(str[getRandom(0,str.length-1)]);
    return num > 9 ? String.fromCharCode(num) : num;  /* String.fromCharCode(s) 根据 s 对应的Code码 转换*/
}

/* 
    格式化日期： xxxx年xx月xx日  时 ：分 ：秒  星期x
*/
function formatDate () {
    var d = new Date();
    /* xxxx年xx月xx日 */
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    /* 时 ：分 ：秒 */
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var second = d.getSeconds();
    /* 星期x */
    var str = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    var week = d.getDay();
    return year+'年'+formatNum(mon)+'月'+formatNum(day)+'日 '+formatNum(hours)+':'+formatNum(minutes)+':'+formatNum(second)+' '+str[week];
}

/* 
    格式化两位数数据 
    如： 5 => 05
*/
function formatNum (num) {
    return num > 9 ? num : '0'+num;
}

/* 获取元素 */
function $(attr) {
    return document.querySelector(attr);
}

/* 
    倒计时 
    start:开始日期
    end:结束日期
    返回一个日期对象
*/
function countDown(start,end){
    var diff = end.getTime() - start.getTime(); /* 得到毫秒数 */
    diff = diff/1000;
    var day,hours,minutes,second;
    var day = Math.floor(diff/(24*60*60));
    var hours = Math.floor(diff/(60*60)%24);
    var minutes = Math.floor(diff/60%60);
    var second = Math.floor(diff%60);
    return {
        day,
        hours,
        minutes,
        second
    }
}

/* 
    获取非行内元素方法 最终样式值 
    注意：要修改的值必须设置了默认值  否则默认 auto 会导致样式不生效
*/
function getStyle(obj,attr) {
    if(window.getComputedStyle){
        return getComputedStyle(obj,false)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

/* 
    顺序执行操作元素方法
        obj 运动的元素
        target 目标值
        attr 操作的属性
        callback 执行完后需要后续的操作函数
*/
function moveOrder(obj,target,attr,callback) {
    clearInterval(obj.timer);
    var speed = 0;
    if(attr === 'opacity') {
        current = parseFloat(getStyle(obj,attr))*100;
        speed = target - current >0? 1 : -1;
    } else {
        current = parseInt(getStyle(obj,attr));
        speed = target - current >0? 10 : -10;
    }
    obj.timer = setInterval(()=>{
        var current = 0;
        if(attr === 'opacity') {
            current = parseFloat(getStyle(obj,attr))*100;
            obj.style[attr] = (current + speed)/100;
        } else {
            current = parseInt(getStyle(obj,attr));
            obj.style[attr] = (current + speed) + 'px';
        }
        if(Math.abs(target-current) < Math.abs(speed)) {
            if(attr === 'opacity') {
                obj.style[attr] = target/100;
            } else {
                obj.style[attr] = target + 'px';
            }
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
    },30);
}
/* 
    同步操作执行多种属性方法
        obj 运动的元素
        targets 目标值 包含变更属性
        {
            width:500px 将原始值变成 500px
            height:800px 将原始值变成 800px
        }
*/
function moveSynchronization(obj,targets){
    clearInterval(obj.timer);
    var current = 0;
    /* 确定步长 */
    for (var key in targets){
        if(key === 'opacity') {
            current = parseFloat(getStyle(obj,key))*100;
            speed = parseInt(targets[key]) - current >0? 1 : -1;
        } else {
            current = parseInt(getStyle(obj,key));
            speed = parseInt(targets[key]) - current >0? 10 : -10;
        }
    }
    obj.timer = setInterval(()=>{
        for (var key in targets){
            if(key === 'opacity') {
                current = parseFloat(getStyle(obj,key))*100;
                speed = parseInt(targets[key]) - current >0? 1 : -1;
                obj.style[key] = (current + speed)/100;
            } else {
                current = parseInt(getStyle(obj,key));
                speed = parseInt(targets[key]) - current >0? 10 : -10;
                obj.style[key] = (current + speed) + 'px';
            }
            if(Math.abs(parseInt(targets[key])-current) < Math.abs(speed)) {
                if(key === 'opacity') {
                    obj.style[key] = parseInt(targets[key])/100;
                } else {
                    obj.style[key] = parseInt(targets[key]) + 'px';
                }
                return clearInterval(obj.timer); 
            }
        }
    },30);
}