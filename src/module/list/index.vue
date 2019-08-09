<template>
    <div class="m-wrapper">
        <div class="book-hd">
            <div class="opr-handle">
                <div class="search-wp">
                    <input type="text" v-model="searchValue" placeholder="请输入书名、作者、isbn" />
                    <i class="icon iconfont iconsousuo" @click="searchBookList"></i>
                </div>
                <span :class="'txt-btn' + (showFilter ? ' active' : '')" @click="showFilter=!showFilter">&nbsp;<i class="icon iconfont iconguolv"></i>筛选&nbsp;</span>
            </div>
            <!-- 普通 picker控制-->
            <div class="filter normal-picker-handle" v-if="showFilter">
                <template >
                    <span v-if="!tag" @click="tapPicker('tag')" class="txt-btn">
                        标签<i class="icon iconfont iconxiangxia"></i>
                    </span>
                    <span v-else class="txt-btn">
                        标签:
                        <span @click="tapPicker('tag')">{{tag}}</span>
                        <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('tag')"></i>
                    </span>
                </template>
                <template>
                    <span v-if="!stockStatus" @click="tapPicker('stockStatus')" class="txt-btn">
                        库存<i class="icon iconfont iconxiangxia"></i>
                    </span>
                    <span v-else class="txt-btn">
                        库存:
                        <span @click="tapPicker('stockStatus')">{{stockStatus}}</span>
                        <i @click="clearFilter('stockStatus')" class="icon iconfont iconqingkong2 i-btn"></i>
                    </span>
                </template>
                <template >
                    <span v-if="!readStatus" @click="tapPicker('readStatus')" class="txt-btn">阅读状态<i class="icon iconfont iconxiangxia"></i></span>
                    <span v-else class="txt-btn">
                        阅读状态:
                        <span @click="tapPicker('readStatus')">{{readStatus}}</span>
                        <i @click="clearFilter('readStatus')" class="icon iconfont iconqingkong2 i-btn"></i>
                    </span>
                </template>
            </div>
            <!-- date picker控制-->
            <div class="filter date-picker-handle" v-if="showFilter">
                读完时间区间：
                <span v-if="!endReadTimeMin" @click="tapDatePicker('endReadTimeMin')" class="txt-btn">开始时间<i class="icon iconfont iconxiangxia"></i></span>
                <span v-else class="txt-btn">
                    <span @click="tapDatePicker('endReadTimeMin')">{{formatDate(endReadTimeMin)}}</span>
                    <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('endReadTimeMin')" ></i>
                </span> ~
                <span v-if="!endReadTimeMax" @click="tapDatePicker('endReadTimeMax')" class="txt-btn">结束时间<i class="icon iconfont iconxiangxia"></i></span>
                <span v-else class="txt-btn">
                    <span @click="tapDatePicker('endReadTimeMax')">{{formatDate(endReadTimeMax)}}</span>
                    <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('endReadTimeMax')" ></i>
                </span>
            </div>
            <div class="filter date-picker-handle" v-if="showFilter">
                购买时间区间：
                <span v-if="!boughtTimeMin" @click="tapDatePicker('boughtTimeMin')" class="txt-btn">开始时间<i class="icon iconfont iconxiangxia"></i></span>
                <span v-else class="txt-btn">
                    <span @click="tapDatePicker('boughtTimeMin')">{{formatDate(boughtTimeMin)}}</span>
                    <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('boughtTimeMin')" ></i>
                </span> ~ 
                <span v-if="!boughtTimeMax" @click="tapDatePicker('boughtTimeMax')" class="txt-btn">结束时间<i class="icon iconfont iconxiangxia"></i></span>
                <span v-else class="txt-btn">
                    <span @click="tapDatePicker('boughtTimeMax')">{{formatDate(boughtTimeMax)}}</span>
                    <i class="icon iconfont iconqingkong2 i-btn" @click="clearFilter('boughtTimeMax')" ></i>
                </span>
            </div>
            <mt-popup
                style="width:100%"
                v-model="popupVisible"
                position="bottom">
                <mt-picker :slots="pickerSlots" @change="onPickerValueChange"></mt-picker>
            </mt-popup>
            <mt-datetime-picker
                v-model="datePickerValue"
                :startDate="startDate"
                :endDate="endDate"
                ref="datePicker"
                type="date"
                @confirm="onDatePickerValueChange"
            >
            </mt-datetime-picker>
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
                            <p class="book-other">库存：{{book.stockStatus ? STOCK_STATUS[book.stockStatus] : '--'}}</p>
                            <p class="book-other">阅读：{{book.readStatus ? READ_STATUS[book.readStatus] : '--'}}</p>
                        </div>
                        <div class="book-opr">
                            <p v-if="book.stockStatus === 'toBuy'">加入购书单</p>
                            <p v-if="book.stockStatus === 'borrowed'">归还</p>
                            <p v-if="book.stockStatus === 'in'">借出</p>
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
import {PAGE_SIZE, READ_STATUS, STOCK_STATUS} from '../../libs/Const';
import {formatDate} from '../../libs/util';

export default {
    name: 'store.list',
    data() {
        return {
            pageNo: 1,
            searchValue: undefined,
            tag: undefined,
            stockStatus: undefined,
            readStatus: undefined,
            boughtTimeMin: undefined,
            boughtTimeMax: undefined,
            endReadTimeMin: undefined,
            endReadTimeMax: undefined,
            total: 0,
            loading: false,
            bookList: [],
            READ_STATUS,
            STOCK_STATUS,
            showSearch: false,
            showFilter: false,
            activeFilterType: undefined,
            pickerSlots: [
                {
                    flex: 1,
                    values: [],
                    textAlign: 'center'
                }
            ],
            popupVisible: false,
            pickerVisible: false,
            datePickerValue: undefined,
            formatDate,
            startDate: new Date(0),
            endDate: new Date()
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
                tag,
                stockStatus,
                readStatus,
                boughtTimeMin,
                boughtTimeMax,
                endReadTimeMin,
                endReadTimeMax,
            } = this;
            requestBookList({
                pageNo,
                pageSize: PAGE_SIZE,
                searchValue,
                tag,
                stockStatus,
                readStatus
            }).then(({items, total}) => {
                this.bookList = items || [];
                this.total = total;
            }, (data) => {
                console.log('error', data);
            })
        },
        searchBookList() {
            this.reLoadList();
        },
        reLoadList() {
            this.pageNo = 1;
            this.getBookList();
        },
        tapPicker(type) {
            let pickerSlots = JSON.parse(JSON.stringify(this.pickerSlots));

            switch (type) {
                case 'tag':
                    pickerSlots[0].values = ['哲学', '我喜欢', '哈哈'];
                    break;
                case 'stockStatus':
                    pickerSlots[0].values = Object.keys(STOCK_STATUS).map(key => STOCK_STATUS[key]);
                    break;
                case 'readStatus':
                    pickerSlots[0].values = Object.keys(READ_STATUS).map(key => READ_STATUS[key]);
                    break;
            }
            this.pickerSlots = JSON.parse(JSON.stringify(pickerSlots));
            this[type] = this[type] || pickerSlots[0].values[0];// 初始的值
            this.popupVisible = true;
            this.activeFilterType = type;
        },
        tapDatePicker(type) {
            this.pickerVisible = true;
            this.activeFilterType = type;

            this.datePickerValue = this[type] ? new Date(this[type]) : new Date();
            this.$refs['datePicker'].open();
        },
        onPickerValueChange({values}) {
            this[this.activeFilterType] = values && values[0];
        },
        onDatePickerValueChange(value) {
            this[this.activeFilterType] = new Date(value).getTime();
        },
        clearFilter(type) {
            this[type] = undefined;
        }
    }
};
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/style.scss';
.book-hd {
    font-size: $font-size-base;
    line-height: px2rem(88);
    padding: px2rem(20);
    border-bottom: 1px solid #efefed;
    .opr-handle {
        height: px2rem(88);
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        .search-wp {
            position: relative;
            width: px2rem(500);
            input {
                width: 100%;
                line-height: px2rem(60);
                border: 1px solid $border-color;
                padding: 0 px2rem(10);
            }
            i {
                position: absolute;
                top: 0;
                right: px2rem(20);
            }
            // border-bottom: 1px solid $border-color;
        }
        .active {
            color: $theme-color;
        }
    }
    .filter {
        display: flex;
        justify-content: space-around;
        i {
            font-size: $font-size-sm;
        }
        .active {
            color: $theme-color;
        }
        .i-btn {
            float: right;
            padding: 0 px2rem(20);
        }
    }
    .normal-picker-handle {
        .txt-btn {
            // width: 33.33%;
            text-align: left;
        }
    }
    .date-picker-handle {
        width: 100%;
        text-align: left;
        .txt-btn {
            width: px2rem(250);
        }
    }
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