// import _ from 'lodash';
import moment from 'moment';

const Filters = {
    // 转换空值到'--'
    nullValue: function(val) {
        if (val === null || val === '') {
            return '--';
        } else {
            return val;
        }
    },

    count: function(val) {
        if (val === null || val === undefined || val === '') {
            return '--';
        } else {
            return val.toLocaleString();
        }
    },

    longName: function(val, long) {
        return val.substr(0, long) + (val.length > long ? '...' : '');
    },

    // 过滤corp邮箱到名字
    email2Name: function(email) {
        return email.substring(0, email.indexOf('@'));
    },

    fileName: function(val) {
        if (!val) {
            return '';
        }
        return val.substring(val.lastIndexOf('/') + 1, val.lastIndexOf('.'));
    },

    exportStatus: function(val) {
        let value = 0;
        switch (val) {
            case 'ready':
                value = 0;
                break;
            case 'success':
                value = 1;
                break;
            case 'failed':
                value = 2;
                break;
            case 'exporting':
            case 'unexported':
                value = 3;
                break;
            default:
                value = 5;
                break;
        }
        return value;
    },

    time: function(val, format) {
        if (!val) {
            return '--';
        }
        if (format) {
            return moment(+val).format(format);
        }
        return moment(+val).format('YYYY-MM-DD HH:mm:ss');
    },

    jsonParse: function(val) {
        return val ? JSON.parse(val) : {};
    }

};

export default Filters;
