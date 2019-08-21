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

export const changeBookStatus = (data) => {
    return promiseRequest({
        url: '/api/book',
        method: 'PATCH',
        data,
    });
};

export const delBook = (params) => {
    return promiseRequest({
        url: '/api/book',
        method: 'DELETE',
        params,
    });
};

export const requestBookDetail = (params) => {
    return promiseRequest({
        url: '/api/book',
        params,
    });
};

export const requestPosList = (params) => {
    return promiseRequest({
        url: '/api/pos/list',
        params,
    });
};

export const addBook = (data) => {
    return promiseRequest({
        url: '/api/book',
        method: 'POST',
        data,
    });
};

export const editBook = (data) => {
    return promiseRequest({
        url: '/api/book',
        method: 'PUT',
        data,
    });
};
