import {promiseRequest} from '../libs/util';

export const requestBookList = (params) => {
    return promiseRequest({
        url: '/api/book/list',
        params,
    });
};
