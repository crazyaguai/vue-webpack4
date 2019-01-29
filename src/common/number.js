import Decimal from 'decimal.js-light'

Decimal.set({
    precision: 20,
    rounding: Decimal.ROUND_HALF_UP,//默认使用四舍五入
    toExpNeg: -9e15,
    toExpPos: 9e15,
});

export default {
    //数字转换为字符串显示
    format(num){
        num = num ? num : 0
        return new Decimal(num).toString()
    },
    //保留小数向上取整
    formatUp(num,len){
        return new Decimal(num).toDecimalPlaces(len,Decimal.ROUND_UP).toString()
    },
    //保留小数向下取整
    formatDown(num,len){
        return new Decimal(num).toDecimalPlaces(len,Decimal.ROUND_DOWN).toString()
    },
    //保留小数四舍五入
    formatHalf(num,len){
        return new Decimal(num).toDecimalPlaces(len,Decimal.ROUND_HALF_UP).toString()
    },
    //小数舍去0
    remove0(num){
        num = num ? num : 0
        return new Decimal(num).toString()
    },
    //小数补零
    add0(num,len){
        return new Decimal(num).toFixed(len,Decimal.ROUND_DOWN).toString()
    },
    //加
    add(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.plus(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },
    //减
    minus(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.minus(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },
    //乘
    mult(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.times(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },
    //除
    div(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.dividedBy(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    },
    //取余
    mod(num1, num2, len) {
        let a = new Decimal(num1)
        let b = new Decimal(num2)
        let c = a.modulo(b)
        if(len > 0){
            return c.toDecimalPlaces(len).toString()
        }else{
            return c.toString()
        }
    }
}
