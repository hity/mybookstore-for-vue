<template>
    <div class="m-wrapper">
        <div class="book-hd">
            <mt-button type="default"><i class="icon iconfont iconwj-jh"></i></mt-button>
            <mt-button type="default">筛选</mt-button>
            <mt-search
                v-model="searchValue"
                placeholder="请输入书名、作者、isbn"
                cancel-text=""
                @input="onSearchChange"
                >
            </mt-search>
            <div>
                <mt-button type="default">标签</mt-button>
                <mt-button type="default">库存</mt-button>
                <mt-button type="default">阅读状态</mt-button>
                <mt-button type="default">读书完成时间</mt-button>
                <mt-button type="default">购买时间</mt-button>
            </div>
        </div>
        <div class="book-list">
            <div class="book-item" v-for="book in bookList" :key="book.id">
                <div class="book-logo-wp" :style="{backgroundImage: 'url('+ book.logo +')'}"></div>
                <div class="book-info-wp">
                    <p class="book-name">{{book.title}}</p>
                    <div class="book-info">
                        <div class="book-abstract">
                            <p class="book-other">作者：{{book.author}}</p>
                            <p class="book-other">出版社：{{book.publisher}}</p>
                        </div>
                        <div class="book-status">
                            <p class="book-other">库存：{{book.storeStatus ? STORE_STATUS[book.storeStatus] : '--'}}</p>
                            <p class="book-other">阅读：{{book.readStatus ? READ_STATUS[book.readStatus] : '--'}}</p>
                        </div>
                        <div class="book-opr">
                            <p v-if="book.storeStatus === 'toBuy'">加入购书单</p>
                            <p v-if="book.storeStatus === 'borrowed'">归还</p>
                            <p v-if="book.storeStatus === 'in'">借出</p>
                            <p v-if="book.readStatus === 'toRead'">加入读书单</p>
                            <p v-if="book.readStatus !== 'done'">完成阅读</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import {requestBookList} from '@/request/list';
import {PAGE_SIZE, READ_STATUS, STORE_STATUS} from '../../libs/Const';

export default {
    name: 'store.list',
    data() {
        return {
            pageNo: 1,
            searchValue: undefined,
            tags: [],
            storeStatus: undefined,
            readingStatus: undefined,
            total: 0,
            loading: false,
            bookList: [],
            READ_STATUS,
            STORE_STATUS
        };
    },
    created() {
        this.getBookList();
        console.log('read', this.READ_STATUS['done']);
    },
    methods: {
        getBookList() {
            let {
                pageNo,
                searchValue,
                tags,
                storeStatus,
                readingStatus,
            } = this;
            requestBookList({
                pageNo,
                pageSize: PAGE_SIZE,
                searchValue,
                tags,
                storeStatus,
                readingStatus
            }).then(({items, total}) => {
                this.bookList = items || [];
                this.total = total;
            }, (data) => {
                console.log('error', data);
            })
        },
        onSearchChange(event) {
            console.log('e', this.searchValue);
        }
    }
};
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/style.scss';
.book-hd {
    height: px2rem(88);
    overflow: hidden;
    border-bottom: 1px solid #efefed;
}
.book-list {
  width: 100%;
}

.book-item {
    display: flex;
    justify-content:space-between;
    padding: px2rem(20);
    border-bottom: 1px solid #d9d9d9;
    width: 100%;
    .book-logo-wp {
        width: px2rem(90);
        height: px2rem(90);
        margin-right: px2rem(20);
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center center;
    }
    .book-info-wp {
        width: px2rem(600);
        .book-info {
            display: flex;
            .book-abstract {
                width: px2rem(320);
                .book-name {
                    font-size: $font-size-base;
                    line-height: 120%;
                    height: px2rem(37);
                }

                .book-other {
                    font-size: $font-size-sm;
                    line-height: 1.2;
                    margin-top: px2rem(5);
                    @include nLineLimit(1);
                    padding-right: px2rem(20);
                }
            }
            .book-status {
                width: px2rem(160);
                font-size: $font-size-sm;
            }
            .book-opr {
                width: px2rem(120);
                font-size: $font-size-sm;
            }
        }
    }   
}
</style>