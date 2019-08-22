<template>
    <div class="g-bd-wrapper">
        <div class="g-bd-hd">
            <i class="icon iconfont iconxiangzuo" @click="$router.go(-1)"></i>
            {{$route.params.bookId ? '编辑' : '添加'}}书本
        </div>
        <div class="g-bd-content">
            <section class="book-base">
                <div class="block-title">基础信息</div>
                <mt-field label="书名：" :state="valid.name" placeholder="请输入书名" v-model="baseInfo.name" @click.native="clearValid('name')"></mt-field>
                <mt-field label="作者、译者：" placeholder="请输入用户名" v-model="baseInfo.author"></mt-field>
                <mt-field label="出版社：" placeholder="请输入出版社" v-model="baseInfo.publisher"></mt-field>
                <mt-field label="Isbn：" :state="valid.isbn" placeholder="请输入ISBN" v-model="baseInfo.isbn" @click.native="clearValid('isbn')"></mt-field>
                <mt-field type="number" label="原价：" placeholder="请输入原价" v-model="baseInfo.price">元</mt-field>
                <mt-field label="语言：" placeholder="请输入语言" v-model="baseInfo.lauguage"></mt-field>
                <mt-field label="装帧：" placeholder="请输入装帧" v-model="baseInfo.design"></mt-field>
            </section>
            <section class="book-individual">
                <div class="block-title">个性化信息</div>
                <mt-field label="标签：" class="extend-field">
                    <template v-if="baseInfo.tags && baseInfo.tags.length">
                        <span class="tag-wp" :key="item" v-for="item of baseInfo.tags">
                            <mt-badge size="small">{{item}}</mt-badge>
                        </span>
                        <i class="icon iconfont iconbianji i-btn" @click="changeBadge('tag')" ></i>
                    </template>
                    <i v-else class="icon iconfont iconicon-test" @click="changeBadge('tag')"></i>
                </mt-field>
                <mt-field label="库存状态：" class="extend-field">
                    <mt-radio
                        title=""
                        v-model="stockInfo.stockStatus"
                        :options="['在库', '借出', '待购']">
                    </mt-radio>
                </mt-field>
                
                <section v-if="stockInfo.stockStatus === '在库'" class="supplement-block">
                    <mt-field type="number" label="购买价格：" placeholder="请输入购买价格" v-model="stockInfo.boughtPrice">元</mt-field>
                    <mt-field label="购买时间：" class="extend-field">
                        <span v-if="!boughtTime" @click="tapDatePicker('boughtTime')" class="txt-btn">请选择时间<i class="icon iconfont iconxiangxia"></i></span>
                        <span v-else class="txt-btn">
                            <span @click="tapDatePicker('boughtTime')">{{formatDate(boughtTime)}}</span>
                            <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('boughtTime')" ></i>
                        </span>
                    </mt-field>
                    <mt-field label="藏书位置：" class="extend-field">
                        <template v-if="stockInfo.pos">
                            <mt-badge size="small">{{stockInfo.pos}}</mt-badge>
                            <i class="icon iconfont iconbianji i-btn" @click="changeBadge('pos')" ></i>
                        </template>
                        <i v-else class="icon iconfont iconicon-test" @click="changeBadge('pos')"></i>
                    </mt-field>
                </section>
                <section v-if="stockInfo.stockStatus === '借出'" class="supplement-block">
                    <mt-field label="借阅人：" placeholder="请输入借阅人" v-model="stockInfo.borrower"></mt-field>
                    <mt-field label="借阅时间：" class="extend-field">
                        <span v-if="!borrowedTime" @click="tapDatePicker('borrowedTime')" class="txt-btn">请选择时间<i class="icon iconfont iconxiangxia"></i></span>
                        <span v-else class="txt-btn">
                            <span @click="tapDatePicker('borrowedTime')">{{formatDate(borrowedTime)}}</span>
                            <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('borrowedTime')" ></i>
                        </span>
                    </mt-field>
                </section>
                <section v-if="stockInfo.stockStatus === '待购'" class="supplement-block">
                    <mt-field label="加入购书单：" class="extend-field">
                        <mt-checklist
                            title=""
                            v-model="isToBuy"
                            :options="['加入']">
                        </mt-checklist>
                    </mt-field>
                    <template v-if="isToBuy[0] === '加入'">
                        <mt-field label="购书备注：" placeholder="请输入购书备注" type="textarea" rows="4" v-model="stockInfo.buyRemark"></mt-field>
                    </template>
                </section>
                <mt-field label="阅读状态：" class="extend-field">
                    <mt-radio
                        title=""
                        v-model="readInfo.readStatus"
                        :options="['已读', '进行中', '未读']">
                    </mt-radio>
                </mt-field>
                <section v-if="readInfo.readStatus === '已读'" class="supplement-block">
                    <mt-field label="完成阅读时间：" class="extend-field">
                        <span v-if="!endReadTime" @click="tapDatePicker('endReadTime')" class="txt-btn">请选择时间<i class="icon iconfont iconxiangxia"></i></span>
                        <span v-else class="txt-btn">
                            <span @click="tapDatePicker('endReadTime')">{{formatDate(endReadTime)}}</span>
                            <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('endReadTime')" ></i>
                        </span>
                    </mt-field>
                </section>
                <section v-if="readInfo.readStatus === '未读'" class="supplement-block">
                    <mt-field label="加入读书计划：" class="extend-field">
                        <mt-checklist
                            title=""
                            v-model="isToRead"
                            :options="['加入']">
                        </mt-checklist>
                    </mt-field>
                    <template v-if="isToRead[0] == '加入'">
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
                    </template>
                </section>
                <mt-field type="textarea" rows="4" label="备注：" placeholder="请输入备注" v-model="baseInfo.remark"></mt-field>
            </section>
            <mt-datetime-picker
                v-model="datePickerValue"
                ref="datePicker"
                type="date"
                @confirm="onDatePickerValueChange"
            >
            </mt-datetime-picker>
            <mt-popup
                style="width:100%"
                v-model="popupVisible"
                position="bottom">
                <mt-radio 
                    v-if="activeBadgeType === 'pos'"
                    title="请选择藏书位置"
                    v-model="stockInfo.pos"
                    :options="finalPosList">
                </mt-radio>
                <mt-checklist
                    v-else
                    title="请选择标签"
                    v-model="baseInfo.tags"
                    :options="finalTagList">
                </mt-checklist>
                <div class="badge-add">
                    不在列表中？<span>添加<i class="icon iconfont iconicon-test" @click="addBadgeField"></i></span>
                </div>
                
            </mt-popup>
            <div class="book-opr">
                <mt-button type="default" @click="$router.go(-1)">取消</mt-button>
                <mt-button type="primary" @click="submit">提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import {requestBookDetail, addBook, editBook} from '@/request/list';
import {formatDate} from '../../libs/util';
import { Toast, MessageBox } from 'mint-ui';
import { mapActions, mapState } from 'vuex'

export default {
    name: 'store.add',
    data() {
        return {
            baseInfo: {
                tags: []
            },
            stockInfo: {},
            readInfo: {},
            expectedReadTimeMin: undefined,
            expectedReadTimeMax: undefined,
            borrowedTime: undefined,
            endReadTime: undefined,
            boughtTime: undefined,
            isToBuy: [],
            isToRead: [],
            activeDateType: undefined,
            datePickerValue: undefined,
            formatDate,
            activeBadgeType: undefined,
            newTags: [],
            newPos: [],
            popupVisible: false,
            valid: {}, // success, error, warning
        }
    },
    created() {
        this.getBookDetail();
        this.getTagList();
        this.getPosList();
    },
    computed: {
        finalTagList() {
            return [...this.newTags, ...this.tagList];
        },
        finalPosList() {
            return [...this.newPos, ...this.posList];
        },
        ...mapState('list', {
            tagList: state => state.tagList,
            posList: state => state.posList,
        }),
    },
    methods: {
        ...mapActions('list', [
            'getTagList',
            'getPosList',
        ]),
        getBookDetail() {
            let id = this.$route.params.bookId;
            id && requestBookDetail({id}).then(({baseInfo, stockInfo, readInfo}) => {
                this.baseInfo = baseInfo;
                this.stockInfo = stockInfo;
                this.readInfo = readInfo;
                this.initInfo({...baseInfo, ...stockInfo, ...readInfo});
            });
        },
        initInfo({expectedReadTime, borrowedTime, endReadTime, boughtTime, isToBuy, isToRead}) {
            this.expectedReadTimeMin = expectedReadTime ? expectedReadTime[0] : undefined;
            this.expectedReadTimeMax = expectedReadTime ? expectedReadTime[1] : undefined;
            this.borrowedTime = borrowedTime;
            this.endReadTime = endReadTime;
            this.boughtTime = boughtTime;
            this.isToBuy = isToBuy ? ['加入'] : [];
            this.isToRead = isToRead ? ['加入'] : [];
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
        },
        // 切换badge的值
        changeBadge(type) {
            this.activeBadgeType = type;
            this.popupVisible = true;
        },
        addBadgeField() {
            MessageBox.prompt('请输入' + this.activeBadgeType === 'pos' ? '藏书位置' : '标签').then(({ value, action }) => {
                value && (this.activeBadgeType === 'pos' ? this.newPos.push(value) : this.newTags.push(value));
            }, () => {});
        },
        submit() {
            let bookId = this.$route.params.bookId;
            let submitFun = bookId ? editBook : addBook;

            if (!this.baseInfo.name || !this.baseInfo.name.trim()) {
                this.valid = Object.assign({}, this.valid, {
                    name: 'error'
                });
                Toast('书名不能为空！');
                return;
            }
            submitFun({
                baseInfo: this.baseInfo,
                readInfo: this.computeReadInfo(),
                stockInfo: this.computeStockInfo(),
            }).then(() => {
                Toast(bookId ? '修改成功！' : '添加成功！');
                this.$router.go(-1);
            }, ({code}) => {
                if (code === 1001) {
                    this.valid = Object.assign({}, this.valid, {
                        name: 'error'
                    });
                    Toast('书名已存在！')
                } else if (code === 1002) {
                    this.valid = Object.assign({}, this.valid, {
                        isbn: 'error'
                    });
                    Toast('ISBN已存在！')
                }
            });
        },
        computeReadInfo() {
            //  组装阅读相关信息
            let readInfo = {};
            switch (this.readInfo.readStatus) {
                case '已读':
                    readInfo = {
                        endReadTime: this.endReadTime
                    };
                    break;
                case '进行中':
                    break;
                case '未读':
                    readInfo = {
                        isToRead: this.isToRead[0] === '加入',
                        expectedReadTime: [this.expectedReadTimeMin, this.expectedReadTimeMax]
                    };
                    break;
            }
            readInfo.readStatus = this.readInfo.readStatus;
            return readInfo;
        },
        computeStockInfo() {
            //  组装库存相关信息
            let stockInfo = {};
            switch (this.stockInfo.stockStatus) {
                case '在库':
                    stockInfo = {
                        boughtPrice: this.stockInfo.boughtPrice,
                        boughtTime: this.boughtTime,
                        pos: this.stockInfo.pos,
                    };
                    break;
                case '借出':
                    stockInfo = {
                        borrower: this.stockInfo.borrower,
                        borrowedTime: this.borrowedTime,
                    };
                    break;
                case '待购':
                    stockInfo = {
                        isToBuy: this.isToBuy[0] === '加入',
                        buyRemark: this.stockInfo.buyRemark,
                    };
                    break;
            }
            stockInfo.stockStatus = this.stockInfo.stockStatus;
            return stockInfo;
        },
        clearValid(name) {
            this.valid = Object.assign({}, this.valid, {
                [name]: undefined
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
    padding: px2rem(40) px2rem(20);
    height: calc(100% - #{px2rem(200)});
    .block-title {
        font-size: $font-size-lg;
        font-weight: bold;
        line-height: 200%;
    }
    .book-individual {
        margin-top: px2rem(40);
        .tag-wp {
            margin-right: px2rem(10);
        }
    }
    .book-item {
        display: flex;
        .label {
            width: px2rem(180);
            text-align: right;
            padding-right: px2rem(10);
        }
    }
    .supplement-block {
        border-radius: px2rem(10);
        background: rgba(189, 153, 184, 0.2);
        padding: 0 px2rem(10);
    }
    .badge-add {
        margin: px2rem(20);
        font-size: $font-size-lg;
        span {
            color: $theme-color;
            font-weight: bold;
            margin: px2rem(20);
        }
    }
    .book-opr {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin: px2rem(20) 0 px2rem(40);
        button {
            width: 40%;
        }
    }
}
</style>