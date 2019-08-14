import {promiseRequest} from '../libs/util';

export const requestBookList = (params) => {
    return promiseRequest({
        url: '/api/book/list',
        params,
    });
};

export const requestTagList = (params) => {
    return promiseRequest({
        url: '/api/tag/list',
        params,
    });
};
