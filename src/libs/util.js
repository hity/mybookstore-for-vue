/**
 * @author:      hity
 * @dateTime:    2019-08-07
 * @description: 接口base管理
 */
import axios from 'axios';
import { Toast } from 'mint-ui';
// import { toLogin } from 'libs/login';

// aixos响应错误拦截器
// axios.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response) {
//         switch (error.response.status) {
//             case 401:
//                 if (window.location.href.indexOf('landingpage') == -1) {
//                     toLogin();
//                 }
//                 break;
//         }
//     }
// });

export function promiseRequest(options) {
    if (!options.url) {
        throw new Error('缺少参数 url.');
    }

    let headers = handleHeader(options.headers);

    return new Promise((resolve, reject) => {
        return axios({
            method: options.method || 'GET',
            url: options.url,
            data: options.data || {},
            params: options.params || {},
            headers: headers,
            timeout: options.timeout || 6000
        }).then((response) => {
            if (response.status === 200) {
                if (response.data.code === 200) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }
        }).catch(function(e) {
            Toast('请求失败，请稍后重试！');
        });
    });
};

function handleHeader(headerOptions) {
    // 处理header
    let headers = {
        'X-Requested-With': 'XMLHttpRequest'
    };

    if (headerOptions) {
        Object.keys(headerOptions).forEach((key) => {
            headers[key] = headerOptions[key];
        });
    }
    return headers;
}

export const formatDate = (date, fmt = 'YYYY年MM月DD日') => {
    date = new Date(date);
    let o = {
        'Y+': date.getFullYear(),
        'M+': date.getMonth(),
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };

    // 遍历这个对象
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = String(o[k]);
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
