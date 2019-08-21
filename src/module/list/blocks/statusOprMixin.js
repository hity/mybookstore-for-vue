import { Toast, MessageBox } from 'mint-ui';
import { changeBookStatus } from '@/request/list';

export default {
    methods: {
        changeStatus(id, oprType) {
            let params = {};
            switch (oprType) {
                case 'toShop':
                    params = {
                        id,
                        isToBuy: true
                    };
                    break;
                case 'toReturn':
                    params = {
                        borrower: '',
                        stockStatus: '在库'
                    };
                    break;
                case 'toRead':
                    params = {
                        isToRead: true
                    };
                    break;
                case 'beginRead':
                    params = {
                        readStatus: '进行中'
                    };
                    break;
                case 'finishRead':
                    params = {
                        readStatus: '完成'
                    };
                    break;
            }

            if (oprType === 'toBorrow') {
                MessageBox.prompt('请输入借阅人姓名').then(({ value, action }) => {
                    this.changeBookStatus(id, {
                        borrower: value,
                        stockStatus: '借出'
                    });
                }, () => {});
            } else {
                this.changeBookStatus(id, params);
            }
        },
        changeBookStatus(id, params) {
            changeBookStatus(params).then((data) => {
                Toast('操作成功');
                this.changeListInfo(id, params);
            }, ({code}) => {
                Toast('操作失败，请刷新重试');
            });
        },
        changeListInfo(id, rst) {
            if (this.bookList && this.bookList.length) {
                let obj = this.bookList.find(item => item.id == id);
                Object.assign(obj, rst);
                this.bookList = JSON.parse(JSON.stringify(this.bookList));
            } else {
                Object.assign(this.detail, rst);
                this.detail = JSON.parse(JSON.stringify(this.detail));
            }
        }
    }
}
