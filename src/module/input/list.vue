<template>
    <div class="result-list">
        <section :key="item.key" v-for="item of sectionList">
            <p class="title">{{item.key === 'storeBooks' ? '藏书馆' : '在线'}}搜索结果：</p>
            <div class="book-list" >
                <div class="book-item" v-for="book of item.value" :key="book.id + book.isbn" @click="goAddBook(item.key, book.id, book.href)">
                    <div class="book-item-base">
                        <div class="book-logo-wp" :style="{backgroundImage: 'url('+ book.logo +')'}"></div>
                        <div class="book-info-wp">
                            <p class="book-name">{{book.name}}</p>
                            <div class="book-info">
                                <div class="book-abstract">
                                    <p class="book-other">作者：{{book.author}}</p>
                                    <p class="book-other">出版社：{{book.publisher}}</p>
                                    <p class="book-other">ISBN：{{book.isbn}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import { mapActions, mapState } from 'vuex'
import BackHd from '../common_blocks/back_hd';

export default {
    name: 'input.list',
    data() {
        return {
            sectionList: [{
                key: 'storeBooks',
                value: [],
            }, {
                key: 'onlineBooks',
                value: [],
            }]
        }
    },
    created() {
        this.sectionList.forEach(item => {
            item.value = this[item.key];
        });
    },
    components: {
        BackHd
    },
    computed: {
        ...mapState('input', {
            storeBooks: state => state.storeBooks,
            onlineBooks: state => state.onlineBooks,
        })
    },
    methods: {
        ...mapActions('input', [
            'getInputBookDetail',
        ]),
        goAddBook(bookType, bookId, href) {
            if (bookType === 'storeBooks') {
                this.$emit('showDetail', {bookId});
            } else {
                this.getInputBookDetail({
                    href,
                    success: () => {
                        this.$emit('showDetail', {});
                    },
                    fail: () => {
                        Toast('请求失败，稍后重试！');
                    }
                })
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/style.scss';
section {
    & > .title {
        font-size: $font-size-lg;
        padding: px2rem(30);
    }
}
.book-list {
    width: 100%;
    .book-item {
        position: relative;
        width: 100%;
        border-bottom: 1px solid #d9d9d9;
        .book-item-base {
            display: flex;
            justify-content:space-between;
            padding: px2rem(20);
            width: 100%;
            .book-logo-wp {
                width: px2rem(180);
                height: px2rem(180);
                margin-right: px2rem(20);
                background-repeat: no-repeat;
                background-size: auto 100%;
                background-position: center center;
            }
            .book-info-wp {
                width: px2rem(600);
                line-height: 150%;
                .book-name {
                    font-size: $font-size-lg;
                    font-weight: bold;
                    height: px2rem(37);
                }
                .book-info {
                    display: flex;
                    .book-abstract {
                        .book-other {
                            font-size: $font-size-base;
                            // line-height: 1.2;
                            margin-top: px2rem(5);
                            @include nLineLimit(1);
                            padding-right: px2rem(20);
                        }
                    }
                }
            }   
        }

        .book-item-opr {
            position: absolute;
            top: 0;
            left: 100%;
            width: 100%;
            height: 100%;
            font-size: $font-size-sm;
            display: flex;
            .book-item-opr-wp {
                display: flex;
                .txt-btn {
                    color: #fff;
                    padding: 0 px2rem(10);
                    height: 100%;
                    line-height: px2rem(150);
                    &:nth-child(1) {
                        background-color: $text-c;
                    }
                    &:nth-child(2) {
                        background-color: $theme-color;
                    }
                    &:nth-child(3) {
                        background-color: $assistant-danger;
                    }
                }
            }
            
        }
    }

}
</style>