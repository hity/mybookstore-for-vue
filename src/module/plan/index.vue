<template>
    <div class="g-bd-wrapper">
        <BackHd title="计划"></BackHd>
        <div class="g-bd-content">
            <mt-navbar v-model="selected">
                <mt-tab-item id="buy">购书计划</mt-tab-item>
                <mt-tab-item id="read">读书计划</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="buy">
                    <div class="book-list" >
                        <div class="book-item" v-for="book in shoppingList" :key="book.id" @touchmove.stop.prevent="onTouchMove" @touchstart.stop="onTouchStart" @touchend.stop="onTouchEnd">
                            <div class="book-item-base">
                                <p class="book-name">{{book.name}}</p>
                                <div class="book-remark"  @click="editRemark(book.buyRemark)">
                                    {{book.buyRemark}}
                                </div>
                            </div>
                            <div class="book-item-opr">
                                <div class="book-item-opr-wp">
                                    <div class="txt-btn" @click="done(book.id)">完成</div>
                                    <div class="txt-btn" @click="edit(book.id)">编辑</div>
                                    <div class="txt-btn" @click="delShoppingBook(book.id)">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="read">
                    <div class="book-list" >
                        <div class="book-item" v-for="book in readList" :key="book.id" @touchmove.stop.prevent="onTouchMove" @touchstart.stop="onTouchStart" @touchend.stop="onTouchEnd">
                            <div class="book-item-base">
                                <p class="book-name">{{book.name}}</p>
                                <div class="book-time">
                                    <mt-field label="预期阅读时间：" class="extend-field">
                                        <span v-if="!expectedReadTimeMin" @click="tapDatePicker('expectedReadTimeMin')" class="txt-btn">开始时间<i class="icon iconfont iconxiangxia"></i></span>
                                        <span v-else class="txt-btn">
                                            <span @click="tapDatePicker('expectedReadTimeMin')">{{formatDate(expectedReadTimeMin)}}</span>
                                            <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('expectedReadTimeMin')" ></i>
                                        </span> ~
                                        <span v-if="!expectedReadTimeMax" @click="tapDatePicker('expectedReadTimeMax')" class="txt-btn">结束时间<i class="icon iconfont iconxiangxia"></i></span>
                                        <span v-else class="txt-btn">
                                            <span @click="tapDatePicker('expectedReadTimeMax')">{{formatDate(expectedReadTimeMax)}}</span>
                                            <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('expectedReadTimeMax')" ></i>
                                        </span>
                                    </mt-field>
                                </div>
                            </div>
                            <div class="book-item-opr">
                                <div class="book-item-opr-wp">
                                    <div class="txt-btn" @click="done(book.id)">完成</div>
                                    <div class="txt-btn" @click="delShoppingBook(book.id)">删除</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <mt-datetime-picker
                        v-model="datePickerValue"
                        ref="datePicker"
                        type="date"
                        @confirm="onDatePickerValueChange"
                    >
                    </mt-datetime-picker>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui';
import { searchBook } from '@/request/list';
import { mapActions } from 'vuex';
import BackHd from '../common_blocks/back_hd';
import oprTouchMixin from '../common_blocks/opr_touch_mixin';
import {formatDate} from '../../libs/util';

export default {
    name: 'plan.index',
    data() {
        return {
            selected: 'buy',
            shoppingList: [],
            readList: [],
            expectedReadTimeMin: undefined,
            expectedReadTimeMax: undefined,
            datePickerValue: undefined,
            formatDate,
            activeDateType: undefined,
        };
    },
    created() {
    },
    components: {
        BackHd,
    },
    mixins: [oprTouchMixin],
    computed: {
        title() {
            switch (this.process) {
                case 'list':
                    return '结果列表';
                case 'detail':
                    return this.activeBookId ? '编辑书本' : '添加书本';
                default:
                    return '录入';
            }
        }
    },
    methods: {
        ...mapActions('input', [
            'getInputBooks',
        ]),
        inputBook(type) {
            switch (type) {
                // 待后续增加微信扫一扫
                case 'scan':
                    break;
                case 'hand':
                    this.process = 'detail';
                    this.oprType = 'storeBook';
                    break;
                case 'search':
                    this.getInputBooks({
                        searchValue: this.searchValue,
                        success: (total) => {
                            if (total) {
                                this.process = 'list';
                            } else {
                                Toast('无结果，请重新查找！');
                            }
                        },
                        fail: () => {
                            Toast('请求失败，稍后重试！');
                        }
                    });
                    break;
            }
        },
        showDetail({bookId}) {
            this.process = 'detail';
            this.oprType = bookId ? 'storeBook' : 'onlineBook';
            this.activeBookId = bookId;
        },
        tapDatePicker(type) {
            this.activeDateType = type;

            this.datePickerValue = this[this.activeDateType] ? new Date(this[this.activeDateType]) : new Date();
            this.$refs['datePicker'].open();
        },
        onDatePickerValueChange(value) {
            this[this.activeDateType] = new Date(value).getTime();
        },
        clearFilter(type) {
            this[type] = undefined;
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