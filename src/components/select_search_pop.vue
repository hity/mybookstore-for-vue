<!--
 - 带搜索的筛选面板
 - 
 - @author hity <heting01@corp.netease.com>
 - @dateTime 20181211
 - @props {String} title 筛选项的名称
 - @props {Array} options 筛选项列表，其中每个item必须包含：searchStr, value
 - @props {Object} defaultSelectedItem 筛选项列表默认选中项，其中每个item必须包含：searchStr, value
 - @props {Object} defaultItem 默认全选项，其中每个item必须包含：searchStr, value
 - @props {Function} cb 选中item后回调，处理相关选中逻辑
 - @props {Number} popWidth 展开面板的宽度
-->
<template>
    <section class="select_search_wp" :class="className" style="position:relative;">
        <span :class="{'icon-selected': isValidSelectedItem}">{{title}}</span>
        <i class="ivu-icon ivu-icon-funnel" @click="showBtnClick" style="font-size: 12px;"></i>
        <transition name="fade">
            <div class="select_search_pop" v-show="showPop" :style="{width: popWidth + 'px'}">
                <el-input placeholder="请输入内容" v-model="modifier" size="small" clearable>
                    <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
                </el-input>
                <ul v-if="targetList.length" class="box-card">
                    <li v-for="item in targetList" :key="item.key" class="text" :class="{active: isActive(item)}" @click="changeModifier(item)">
                        {{item.value}}
                    </li>
                </ul>
                <p v-else style="color:#909399; font-weight: normal; font-size: 12px;">暂无相关信息</p>
            </div>
        </transition>
    </section>
</template>
<script>
import _ from 'lodash';

export default {
    name: 'select_search_wp',
    props: {
        // 选中项
        defaultSelectedItem: {
            type: Object,
            default: {}
        },
        options: {
            type: Array,
            required: true
        },
        defaultItem: {
            type: Object,
            default: {
                value: '全部',
                searchStr: '全部'
            }
        },
        title: {
            type: String,
            default: '筛选项'
        },
        cb: {
            type: Function,
            required: true
        },
        popWidth: {
            type: Number,
            default: 200
        }
    },
    data() {
        let selectedItem = Object.assign({}, this.defaultSelectedItem);
        return {
            modifier: '',
            showPop: false,
            className: 'select_search_' + new Date().getTime(),
            wpEl: {},
            panelEl: {},
            selectedItem: selectedItem
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.wpEl = document.querySelector('.' + this.className);
            this.panelEl = this.wpEl.querySelector('.select_search_pop');
            document.body.addEventListener('click', this.componentShowHandle.bind(this));
        });
    },
    watch: {
        showPop(value) {
            if (value) {
                this.setComponentPos();
            }
        },
        // 重新渲染数组时，重置默认选中项～
        targetList(list) {
            this.selectedItem = this.defaultSelectedItem;
        }
    },
    beforeRouteLeave(to, from, next) {
        document.body.removeEventListener('click', this.componentShowHandle.bind(this));
        next();
    },
    computed: {
        // 显示在面板中的items
        targetList() {
            let options = [this.defaultItem, ...this.options];
            let list = this.modifier ? options.filter(item => item.searchStr.indexOf(this.modifier) !== -1) : options;
            return list;
        },
        // 是否为有效的选中项
        isValidSelectedItem() {
            return this.selectedItem.value && !_.isEqual(this.defaultItem, this.selectedItem);
        }
    },
    methods: {
        setComponentPos() {
            let pos = this.wpEl.getBoundingClientRect();
            let panelElPosInfo = this.panelEl.getBoundingClientRect();
            this.panelEl.style.top = pos.top + 30 + 'px';
            this.panelEl.style.left = (pos.left - (this.popWidth - pos.width) / 2) + 'px';
        },
        componentShowHandle(event) {
            let target = event.target;
            if (this.wpEl && !this.wpEl.contains(event.target)) {
                this.showPop = false;
            }
        },
        showBtnClick() {
            this.showPop = !this.showPop;
        },
        // 选中item
        changeModifier(item) {
            if (_.isEqual(this.defaultItem, item)) {
                this.modifier = '';
            } else {
                this.modifier = item.value;
            }
            this.selectedItem = item;
            this.cb && this.cb(item);
            this.showPop = false;
        },
        // 面板内是否为激活item
        isActive(item) {
            return _.isEqual(item, this.selectedItem);
        }
    }
};
</script>
<style lang="scss">
.select_search_wp {
    .fade-enter-active {
        transition: all .3s .3s ease;
    }

    .fade-leave-active {
        transition: all .8s 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .select_search_pop {
        position: fixed!important;
        width: 300px;
        max-height: 300px;
        overflow-y: auto;
        padding: 20px;
        z-index: 1000;
        background: #fff;
        border: 1px solid #efefef;
        border-radius: 4px;
        margin: 0!important;
        .el-input {
            display: flex;
            padding: 0!important;
        }
        .el-input-group__append {
            line-height: 30px;
            width: auto;
        }
        .box-card {
            width: 100%;
            margin-top: 10px;
            li {
                line-height: 28px;
                font-size: 12px;
                font-weight: normal;
                color: #495060;
                padding: 0 12px;
                &:hover {
                    background: #f3f3f3;
                }
            }
            .active {
                color: #108ee9;
            }
        }
    }

    .icon-selected {
        color: #108ee9;
    }
}
</style>