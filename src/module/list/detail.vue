<template>
    <div class="g-bd-wrapper">
        <div class="g-bd-hd">
            <i class="icon iconfont iconxiangzuo"></i>
            书本详情
        </div>
        <div class="g-bd-content">
            <section class="book-base">
                <div class="book-logo-wp" :style="{backgroundImage: 'url('+ detail.logo +')'}"></div>
                <div class="book-info">
                    <div class="book-name">{detail.title}</div>
                    <div class="other-info">
                        <div class="other-info-desc">{detail.author} / {detail.publisher} / {detail.isbn} / {detail.price} / {detail.lauguage}</div>
                        <div class="other-info-opr">
                            <div class="txt-btn" v-if="detail.stockStatus === '待购'">欲购</div>
                            <div class="txt-btn" v-if="detail.readStatus === '未读'">想读</div>
                            <div class="txt-btn" v-if="detail.readStatus !== '已读'">读完</div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="book-individual">
                <div class="block-title">个性化信息</div>
                <div class="book-item">
                    <div class="label">标签</div>
                    <div class="value">{detail.tags}</div>
                </div>
                <div class="book-item">
                    <div class="label">库存状态</div>
                    <div class="value">{detail.stockStatus}</div>
                </div>
                <section v-if="detail.stockStatus === '在库'" class="supplement-block">
                    <div class="book-item">
                        <div class="label">购买价格</div>
                        <div class="value">{detail.boughtPrice}</div>
                    </div>
                    <div class="book-item">
                        <div class="label">购买时间</div>
                        <div class="value">{detail.boughtTime}</div>
                    </div>
                    <div class="book-item">
                        <div class="label">位置信息</div>
                        <div class="value">{detail.pos}</div>
                    </div>
                </section>
                <section v-if="detail.stockStatus === '借出'" class="supplement-block">
                    <div class="book-item">
                        <div class="label">借阅人</div>
                        <div class="value">{detail.borrower}</div>
                    </div>
                    <div class="book-item">
                        <div class="label">借阅时间</div>
                        <div class="value">{detail.borrowTime}</div>
                    </div>
                </section>
                <div class="book-item">
                    <div class="label">阅读状态</div>
                    <div class="value">{detail.readStatus}</div>
                </div>
                <section v-if="detail.readStatus === 'done'" class="supplement-block">
                    <div class="book-item">
                        <div class="label">开始阅读时间</div>
                        <div class="value">{detail.beginReadTime}</div>
                    </div>
                    <div class="book-item">
                        <div class="label">完成阅读时间</div>
                        <div class="value">{detail.endReadTime}</div>
                    </div>
                </section>
                <section v-if="detail.readStatus === 'ing'" class="supplement-block">
                    <div class="book-item">
                        <div class="label">开始阅读时间</div>
                        <div class="value">{detail.beginReadTime}</div>
                    </div>
                </section>
                <div class="book-item">
                    <div class="label">备注</div>
                    <div class="value">{detail.remark}</div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    name: 'store.detail',
    data() {
        return {
            detail: {}
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
    .book-base {
        display: flex;
        .book-logo-wp {
            width: px2rem(200);
            height: px2rem(300);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 100% auto;
            border-radius: px2rem(4);
            margin-right: px2rem(20);
        }
        .book-name {
            font-size: $font-size-lg;
            font-weight: bold;
            line-height: 200%;
        }
        .other-info-desc {
            font-size: $font-size-sm;
            line-height: 120%;
        }
        .other-info-opr {
            display: flex;
            .txt-btn {
                border-radius: px2rem(4);
                background: #fff;
            }
        }
    }
    .book-individual {
        margin-top: px2rem(20);
        .block-title {
            font-size: $font-size-lg;
            line-height: 200%;
        }
        .book-item {
            display: flex;
            .book-label {
                width: px2rem(120);
                text-align: right;
                padding-right: px2rem(10);
            }
        }
        .supplement-block {
            margin-left: px2rem(20);
        }
    }
}
</style>