import {promiseRequest} from '../libs/util';

export const searchBook = (params) => {
    return promiseRequest({
        url: '/api/book/input/search',
        params,
    });
};

export const searchOnlineBookDetail = (params) => {
    return promiseRequest({
        url: '/api/book/input/detail',
        params,
    });
};
