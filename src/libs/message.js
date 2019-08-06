/**
 * @author:      hity
 * @dateTime:    2018-09-26
 * @description: 消息处理中心
 */
import { Message } from 'element-ui';

/**
 * [错误、提醒消息]
 * @author  hity
 */
export const message = {
    error: {
        noResponse: '操作失败，请重试',
        noLogin: '未登录或者登录已超时',
        noAuth: '抱歉，无权限',
        otherApiError: '操作失败，请重试'
    }
};

/**
 * [用户提醒消息展示]
 * @author  hity
 * @params {[String]} msg [需要展示的消息]
 */
export function toast(msg, msgType) {
    if (msgType) {
        Message({
            type: msgType,
            message: msg
        });
    } else {
        Message.error({
            type: 'error',
            message: msg
        });
    }
};