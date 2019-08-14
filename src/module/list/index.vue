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
        <div class="book-list" >
            <div class="book-item" v-for="book in bookList" :key="book.id" @touchmove.prevent="onTouchMove" @touchstart.prevent="onTouchStart" @touchend.prevent="onTouchEnd">
                <div class="book-item-base">
                    <div class="book-logo-wp" :style="{backgroundImage: 'url('+ book.logo +')'}"></div>
                    <div class="book-info-wp">
                        <p class="book-name">{{book.title}}</p>
                        <div class="book-info">
                            <div class="book-abstract">
                                <p class="book-other">作者：{{book.author}}</p>
                                <p class="book-other">出版社：{{book.publisher}}</p>
                            </div>
                            <div class="book-status">
                                <p class="book-other">库存：{{book.stockStatus || '--'}}</p>
                                <p class="book-other">阅读：{{book.readStatus || '--'}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="book-item-opr">
                    <div class="book-item-opr-wp">
                        <div class="txt-btn" v-if="book.stockStatus === 'toBuy'">加入购书单</div>
                        <div class="txt-btn" v-if="book.stockStatus === 'borrowed'">归还</div>
                        <div class="txt-btn" v-if="book.stockStatus === 'in'">借出</div>
                        <div class="txt-btn" v-if="book.readStatus === 'toRead'">加入读书单</div>
                        <div class="txt-btn" v-if="book.readStatus !== 'done'">完成阅读</div>
                        <div class="txt-btn">删除</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {requestBookList, requestTagList} from '@/request/list';
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
            endDate: new Date(),
            tagList: [],
            moveBlock: {
                startX: undefined,
                startTime: undefined,
                criticalTime: 1000, // 判断快速滑动与缓动的临界值（ms）
                oprWidth: undefined, // 操作长度
                el: undefined,
                startLeft: undefined, // 操作时，滑条的位置
            }
        };
    },
    created() {
        this.getBookList();
        this.getTagList();
    },
    watch: {
        // 当picker的弹窗关闭时，用户已经选中需要的选项，此时可发起相关请求
        popupVisible(newValue, oldValue) {
            if (!newValue && newValue !== oldValue) {
                this.reLoadList();
            }
        }
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
                readStatus,
                boughtTime: (boughtTimeMin || boughtTimeMax) ? [boughtTimeMin, boughtTimeMax].join(',') : undefined,
                endReadTime: (endReadTimeMin || endReadTimeMax) ? [endReadTimeMin, endReadTimeMax].join(',') : undefined,
            }).then(({items, total}) => {
                this.bookList = items || [];
                this.total = total;
            }, (data) => {
                console.log('error', data);
            })
        },
        getTagList() {
            requestTagList(null).then(({items, total}) => {
                this.tagList = items || [];
            });
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
                    pickerSlots[0].values = this.tagList;
                    break;
                case 'stockStatus':
                    pickerSlots[0].values = STOCK_STATUS;
                    break;
                case 'readStatus':
                    pickerSlots[0].values = READ_STATUS;
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
            this.reLoadList();
        },
        clearFilter(type) {
            this[type] = undefined;
            this.reLoadList();
            if (type === 'tag' || type === 'stockStatus' || type === 'readStatus') {
                this.pickerSlots = JSON.parse(JSON.stringify([{}]));
            }
        },
        onTouchMove(event) {
            let {
                startX,
                oprWidth,
                el,
                startLeft,
            } = this.moveBlock;

            let endX = event.targetTouches[0].pageX;
            let leftMoveX = endX - startX + startLeft;
            if (leftMoveX < (oprWidth * -1)) {
                leftMoveX = oprWidth * -1;
            } else if (leftMoveX > 0) {
                leftMoveX = 0
            }
            el.style.left = leftMoveX + 'px';
        },
        onTouchStart(event) {
            let targetEl = event.currentTarget;
            this.moveBlock = Object.assign(this.moveBlock, {
                startX: event.targetTouches[0].pageX,
                startTime: new Date().getTime(),
                el: targetEl,
                oprWidth: targetEl.getElementsByClassName('book-item-opr-wp')[0].offsetWidth,
                startLeft: parseFloat(targetEl.style.left) || 0
            });
            targetEl.style.transition = 'left 0s ease 0s';
        },
        onTouchEnd(event) {
            let {
                startX,
                oprWidth,
                el,
                startLeft,
                startTime,
                criticalTime
            } = this.moveBlock;
            let endX = event.changedTouches[0].pageX;
            let moveTime = new Date().getTime() - startTime;
            el.style.transition = 'left 0.5s ease 0s';
            // 超出时间阈值，为快速滑动
            if (moveTime < criticalTime) {
                // 向左
                if ((endX - startX) <= 0) {
                    el.style.left = (oprWidth * -1) + 'px';
                } else {
                    el.style.left = '0px';
                }
            } else {
                let leftMoveX = endX - startX + startLeft;
                // 缓动，按照 1/2区域原则 舍入
                if ((oprWidth * -0.5) <= leftMoveX && leftMoveX <= 0) {
                    el.style.left = '0px';
                } else if ((oprWidth * -0.5) > leftMoveX && leftMoveX > (oprWidth * -1)) {
                    el.style.left = (oprWidth * -1) + 'px';
                }
            }
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
                width: px2rem(90);
                height: px2rem(90);
                margin-right: px2rem(20);
                background-repeat: no-repeat;
                background-size: 100% auto;
                background-position: center center;
            }
            .book-info-wp {
                width: px2rem(480);
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