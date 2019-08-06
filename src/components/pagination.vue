<!--
 - 分页器
 - 
 - @author hity <heting01@corp.netease.com>
 - @dateTime 20181212
 - @props {Number} pageNo 页码
 - @props {Number} pageSize 条数/页 
 - @props {Number} total 记录总条数
 - @emit-method {Function} current-change 翻页操作
 - @emit-params {Number} pageNo 翻页页码
-->
<template>
    <div class="dmp_pagination">
        <span class="other_info" v-if="totalCustomer">第  {{start}}-{{end}}  项，共  {{total}}   项</span>
        <el-pagination @current-change="handleCurrentChange" :current-page="pageNo" :page-size="pageSize" :layout="layout" :total="total" :pager-count="pagerCount" background>
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'pagination',
    props: {
        // 选中项
        pageNo: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 30
        },
        total: {
            type: Number,
            default: 0,
            required: true
        },
        layout: {
            type: String,
            default: 'prev, pager, next, jumper'
        },
        pagerCount: {
            type: Number,
            default: 7
        },
        totalCustomer: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        start() {
            return (this.pageNo - 1) * this.pageSize + 1;
        },
        end() {
            let mayEnd = this.pageNo * this.pageSize;
            return mayEnd > this.total ? this.total : mayEnd;
        }
    },
    methods: {
        handleCurrentChange(pageNo) {
            this.$emit('current-change', pageNo);
        }
    }
};
</script>
<style lang="scss">
.dmp_pagination {
    position: absolute;
    right: 25px;
    bottom: 12px;
    display: flex;
    .other_info {
        padding: 2px 5px;
        line-height: 28px;
        color: #333;
    }
    .el-pagination {
        .el-pagination__jump {
            color: #333;
        }
    }
}
</style>