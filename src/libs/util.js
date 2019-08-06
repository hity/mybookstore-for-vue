import Vue from 'vue';
import axios from 'axios';
import _ from 'lodash';
import store from '@/store';

export const noop = function() {};

// 导出的 $vue 可直接使用 iView 挂载在 vue 原型的方法
// 比如 this.$Message
const $vue = new Vue();
$vue.$Message.config({
    duration: 2.5
});

export function simpleCopy(o) {
    let o1 = {};
    for (let key in o) {
        o1[key] = o[key];
    }
    return o1;
};

export function abs(num) {
    return Math.abs(num);
}

export const rules = ['>', '<', '≥', '≤', '=', '≠', '∈(含临界值)', '∈(不含临界值)', '∉(含临界值)', '∉(不含临界值)'];

function isInt(value) {
    return parseInt(value, 10) === Number(value);
}

export function traverseArray(obj, attr = '', res = {}) {
    // 数据初始化
    // var res = res || {};
    // var attr = attr || '';

    // 执行数据转换
    if (_.isObject(obj)) {
        let attrRes;
        if (_.isArray(obj)) {
            console.log(obj);
            _.each(obj, function(item, index) {
                attrRes = attr;
                attr += '[' + index + '].';
                res = traverseArray(item, attr, res);
                attr = attrRes;
            });
        } else {
            _.each(obj, function(item, index) {
                attrRes = attr;
                attr += index;
                res = traverseArray(item, attr, res);
                attr = attrRes;
            });
        }
    } else {
        res[attr] = obj;
    }
    return res;
}

export const defaultCMOptions = {
    mode: 'text/x-sql',
    lineNumbers: true,
    theme: 'elegant',
    autoRefresh: true,
    lineWrapping: true
};

export function endWith(str, str1) {
    let delta = str.length - str1.length;
    return (delta > 0 && str.lastIndexOf(str1) === delta);
}

export function splitValue(v) {
    if (typeof v === 'undefined') return [null, null];
    let v1 = v.split(',');
    if (v1.length === 1) return [Number(v1[0]), null];
    return [Number(v1[0]), Number(v1[1])];
}

/**
 * 格式化时间，yyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w
 *
 * 各标识说明：
 *
 * | 标识  | 说明 |
 * | :--  | :-- |
 * | yyyy | 四位年份，如2001 |
 * | yy   | 两位年费，如01 |
 * | MM   | 两位月份，如08 |
 * | M    | 一位月份，如8 |
 * | dd   | 两位日期，如09 |
 * | d    | 一位日期，如9 |
 * | HH   | 两位小时，如07 |
 * | H    | 一位小时，如7 |
 * | mm   | 两位分钟，如03 |
 * | m    | 一位分钟，如3 |
 * | ss   | 两位秒数，如09 |
 * | s    | 一位秒数，如9 |
 * | ms   | 毫秒数，如234 |
 * | w    | 中文星期几，如一 |
 * | ct   | 12小时制中文后缀，上午/下午 |
 * | et   | 12小时制英文后缀，A.M./P.M. |
 * | cM   | 中文月份，如三 |
 * | eM   | 英文月份，如Mar |
 *
 * ```javascript
 * // 根据格式输出时间，比如:2012-01-11,连接符可自定义
 * let str = formatTime(new Date(),'yyyy-MM-dd');
 * ```
 *
 * @method formatTime
 * @param  {Date}             arg0 - 时间
 * @param  {String}           arg1 - 格式
 * @return {String}           指定格式的时间串
 */
