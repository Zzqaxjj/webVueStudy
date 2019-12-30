/* 
    表单校验函数 
    formRegExp(str,type);
    str: 校验数据
    type: 对象类型
*/ 
function formRegExp(str,type) {
    var regexp;
    if (type == 'phone') {
        regexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        return regexp.test(str);
    } else if (type == 'QQ') {
        regexp = /[1-9][0-9]{4,}/
        return regexp.test(str);
    } else if (type == 'username') {
        regexp = /[\u4e00-\u9fa5]{2,8}/
        return regexp.test(str);
    } else if (type == 'msg') {
        regexp = /\d{6}/
        return regexp.test(str);
    } else if (type == 'password') {
        regexp = /^[a-zA-Z]\w{5,17}$/
        return regexp.test(str);
    }else if (type == 'rspassword') {
        regexp = /^[a-zA-Z]\w{5,17}$/
        return regexp.test(str);
    }
    return false;
}

/* 失焦校验方法 */
function objBlur(obj,objMsg,objType) {
    obj.onblur = function() {
        var flag = formRegExp(obj.value,objType);
        if (flag) {
            objMsg.innerHTML = '√ 恭喜您输入正确';
            objMsg.className = 'right';
        } else {
            objMsg.innerHTML = '* 您输入格式不正确,请重新输入';
            objMsg.className = 'wrong';
        }
    }
}

/* 确认密码的校验 */
function objRsBlur (obj1,obj2,objMsg,objType) {
    obj2.onblur = function() {
        if (obj1.value != obj2.value) {
            objMsg.innerHTML = '* 您输入的确认密码与密码不一致';
            objMsg.className = 'wrong';
        } else {
            var flag = formRegExp(obj2.value,objType);
            if (flag) {
                objMsg.innerHTML = '√ 恭喜您输入正确';
                objMsg.className = 'right';
            } else {
                objMsg.innerHTML = '* 您输入格式不正确,请重新输入';
                objMsg.className = 'wrong';
            }
        }
    }
}