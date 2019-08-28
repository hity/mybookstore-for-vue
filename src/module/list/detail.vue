<template>
    <div class="g-bd-wrapper">
        <BackHd title="书本详情"></BackHd>
        <div class="g-bd-content">
            <div class="book-name">{{baseInfo.name}}</div>
            <section class="book-base">
                <div class="book-info">
                    <div class="other-info">
                        <div class="book-item">
                            <div class="label">作者、译者：</div>
                            <div class="value">{{baseInfo.author}}</div>
                        </div>
                        <div class="book-item">
                            <div class="label">出版社：</div>
                            <div class="value">{{baseInfo.publisher}}</div>
                        </div>
                        <div class="book-item">
                            <div class="label">Isbn：</div>
                            <div class="value">{{baseInfo.isbn}}</div>
                        </div>
                        <div class="book-item">
                            <div class="label">原价：</div>
                            <div class="value">{{baseInfo.price}}</div>
                        </div>
                        <div class="book-item">
                            <div class="label">语言：</div>
                            <div class="value">{{baseInfo.lauguage}}</div>
                        </div>
                    </div>
                    <div class="other-info-opr">
                        <div class="txt-btn" v-if="stockInfo.stockStatus === '待购' && !stockInfo.isToBuy" @click="changeStatus(baseInfo.id, 'toShop')">欲购</div>
                        <div class="txt-btn" v-if="stockInfo.stockStatus === '借出'" @click="changeStatus(baseInfo.id, 'toReturn')">归还</div>
                        <div class="txt-btn" v-if="stockInfo.stockStatus === '在库'" @click="changeStatus(baseInfo.id, 'toBorrow')">借出</div>
                        <div class="txt-btn" v-if="stockInfo.readStatus === '未读' && !readInfo.isToRead" @click="changeStatus(baseInfo.id, 'toRead')">想读</div>
                        <div class="txt-btn" v-if="stockInfo.readStatus === '未读' && readInfo.isToRead" @click="changeStatus(baseInfo.id, 'beginRead')">开读</div>
                        <div class="txt-btn" v-if="stockInfo.readStatus === '进行中'" @click="changeStatus(baseInfo.id, 'finishRead')">读完</div>
                        <div class="txt-btn" @click="edit">编辑</div>
                    </div>
                </div>
                <div class="book-logo-wp" :style="{backgroundImage: 'url('+ baseInfo.logo +')'}"></div>
            </section>
            <section class="book-individual">
                <div class="block-title">个性化信息</div>
                <div class="book-item">
                    <div class="label">标签：</div>
                    <div class="value">{{baseInfo.tags && baseInfo.tags.length ? baseInfo.tags.join(',') : '--'}}</div>
                </div>
                <div class="book-item">
                    <div class="label">库存状态：</div>
                    <div class="value">{{stockInfo.stockStatus || '--'}}</div>
                </div>
                <section v-if="stockInfo.stockStatus === '在库'" class="supplement-block">
                    <div class="book-item">
                        <div class="label">购买价格：</div>
                        <div class="value">{{stockInfo.boughtPrice || '--'}}元</div>
                    </div>
                    <div class="book-item">
                        <div class="label">购买时间：</div>
                        <div class="value">{{stockInfo.boughtTime ? formatDate(stockInfo.boughtTime) : '--'}}</div>
                    </div>
                    <div class="book-item">
                        <div class="label">位置信息：</div>
                        <div class="value">{{stockInfo.pos || '--'}}</div>
                    </div>
                </section>
                <section v-if="stockInfo.stockStatus === '借出'" class="supplement-block">
                    <div class="book-item">
                        <div class="label">借阅人：</div>
                        <div class="value">{{stockInfo.borrower || '--'}}</div>
                    </div>
                    <div class="book-item">
                        <div class="label">借阅时间：</div>
                        <div class="value">{{stockInfo.borrowedTime ? formatDate(stockInfo.borrowedTime) : '--'}}</div>
                    </div>
                </section>
                <div class="book-item">
                    <div class="label">阅读状态：</div>
                    <div class="value">{{readInfo.readStatus || '--'}}</div>
                </div>
                <section v-if="readInfo.readStatus === '已读'" class="supplement-block">
                    <div class="book-item">
                        <div class="label">完成阅读时间：</div>
                        <div class="value">{{readInfo.endReadTime ? formatDate(readInfo.endReadTime) : '--'}}</div>
                    </div>
                </section>
                <div class="book-item">
                    <div class="label">备注：</div>
                    <div class="value">{{baseInfo.remark || '--'}}</div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import {requestBookDetail} from '@/request/list';
import oprMixin from './blocks/statusOprMixin';
import {formatDate} from '../../libs/util';
import BackHd from '../common_blocks/back_hd';

export default {
    name: 'store.detail',
    data() {
        return {
            baseInfo: {},
            readInfo: {},
            stockInfo: {},
            formatDate,
        }
    },
    created() {
        this.getBookDetail();
    },
    mixins: [oprMixin],
    components: {
        BackHd
    },
    methods: {
        getBookDetail() {
            requestBookDetail({id: this.$route.params.bookId}).then(({baseInfo, readInfo, stockInfo}) => {
                this.baseInfo = baseInfo;
                this.readInfo = readInfo;
                this.stockInfo = stockInfo;
            });
        },
        edit() {
            this.$router.push({
                name: 'store.edit',
                params: {
                    bookId: this.$route.params.bookId,
                }
            });
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
    .book-name {
        font-size: $font-size-lg;
        font-weight: bold;
        line-height: 200%;
    }
    .book-base {
        display: flex;
        justify-content: space-between;
        .book-logo-wp {
            width: px2rem(240);
            height: px2rem(240);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: auto 100%;
            border-radius: px2rem(4);
        }
        .book-info {
            width: px2rem(470);
        }
        .other-info-desc {
            font-size: $font-size-sm;
            line-height: 120%;
        }
        .other-info-opr {
            display: flex;
            margin-top: px2rem(10);
            justify-content: center;
            .txt-btn {
                border-radius: px2rem(4);
                background: #fff;
                border: 1px solid $theme-color;
                padding: px2rem(5) px2rem(20);
                margin-right: px2rem(10);
                color: $theme-color;
            }
        }
    }
    .book-individual {
        margin-top: px2rem(40);
        .block-title {
            font-size: $font-size-lg;
            line-height: 200%;
        }
        .supplement-block {
            margin: px2rem(20) px2rem(20) px2rem(20) px2rem(40);
            padding: px2rem(10) 0;
            border-radius: px2rem(10);
            background: rgba(189, 153, 184, 0.2);
        }
    }
    .book-item {
        display: flex;
        line-height: 200%;
        .label {
            width: px2rem(220);
            text-align: right;
            padding-right: px2rem(10);
            color: $theme-color;
        }
    }
}
</style>