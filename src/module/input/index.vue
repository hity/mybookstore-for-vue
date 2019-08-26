<template>
    <div class="g-bd-wrapper">
        <div class="g-bd-hd">
            <i class="icon iconfont iconxiangzuo" @click="$router.go(-1)"></i>
            录入
        </div>
        <div class="g-bd-content">
            <div class="opr-list">
                <div class="opr-item disabled" @click="inputBook('scan')">
                    <i class="icon iconfont iconsaomiao"></i>
                    <span>扫一扫录入</span>
                </div>
                <div class="opr-item" @click="inputBook('hand')">
                    <i class="icon iconfont iconshoudong"></i>
                    <span>手动录入</span>
                </div>
                <div class="opr-item" >
                    <i class="icon iconfont iconsousuo"></i>
                    <span>查询录入</span>
                </div>
                <div class="search">
                    <div class="search-wp">
                        <input type="text" v-model="searchValue" placeholder="请输入书名、作者、isbn" />
                        <i class="icon iconfont iconsousuo" @click="inputBook('search')"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import { searchBook } from '@/request/list';

export default {
    name: 'input.index',
    data() {
        return {
            searchValue: undefined,
            bookList: []
        };
    },
    created() {
    },
    methods: {
        inputBook(type) {
            switch (type) {
                // 待后续增加微信扫一扫
                case 'scan':
                    break;
                case 'hand':
                    this.$router.push({
                        name: 'input.add'
                    });
                    break;
                case 'search':
                    searchBook({
                        searchValue: this.searchValue,
                    }).then(({items}) => {
                        this.bookList = items || [];
                    }, () => {
                        Toast('请重试！');
                    });
                    break;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/style.scss';

.g-bd-hd {
    width: 100%;
    height: px2rem(100);
    line-height: px2rem(100);
    font-size: $font-size-lg;
    text-align: center;
    border-bottom: 1px solid $border-color;
    box-shadow: 0px 2px 10px $shadow-color;
    i {
        float: left;
        font-size: px2rem(50);
    }
}

.g-bd-content {
    padding: px2rem(20);
    height: calc(100% - #{px2rem(200)});
    font-size: $font-size-base;
    .opr-list {
        width: px2rem(500);
        margin: 40% auto;
    }
    .opr-item {
        font-size: $font-size-lg;
        line-height: px2rem(100);
        vertical-align: center;
        cursor: pointer;
        i {
            font-size: px2rem(60);
            color: $theme-color;
            margin-right: px2rem(10);
        }
        span {
            vertical-align: super;
        }
    }
    .search-wp {
        font-size: $font-size-lg;
        line-height: px2rem(60);
        border-bottom: 1px solid $border-color;
        margin: px2rem(20) 0;
        i {
            float: right;
            font-size: px2rem(40);
            cursor: pointer;
            color: $theme-color;
        }
        input {
            font-size: $font-size-lg;
            width: 85%;
            height: px2rem(60);
        }
    }
    .disabled {
        color: $disabled-color;
        cursor: default;
        i {
            color: $disabled-color;
        }
    }
}
</style>