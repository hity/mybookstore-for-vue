<!--
 - @author:      hity
 - @dateTime:    2018-09-26
 - @description: error跳转页
-->
<template>
    <div class="page-empty">
        <div>
            <h2>抱歉，您要找的页面不存在！</h2>
            <p>您可以尝试前往：</p>
            <a class="btn" href="javascript:void(0);">首页</a>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'notfound',
    created() {},
    methods: {
    }
};
</script>
<style lang="scss" scoped>
.page-empty {
    padding-top: 10%;
    text-align: center;
    .icon {
        font-size: 100px;
    }
    h2 {
        font-size: 24px;
        line-height: 86px;
        color: #333;
    }
    p {
        font-size: 16px;
    }
    .btn {
        display: block;
        margin: 10px auto;
        width: 100px;
        padding: 10px 30px;
        color: #fff;
        background-color: #949494;
        border-radius: 4px;
    }
}
</style>