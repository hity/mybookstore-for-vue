<!--
 - @author:      hity
 - @dateTime:    2018-11-05
 - @description: index\error\landingpage容器
-->
<template>
    <div style="width: 100%;height:100%;">
        <router-view></router-view>
        <footerbar></footerbar>
    </div>
</template>
<script>
import footerbar from './common_blocks/footerbar.vue';

export default {
    name: 'pageApp',
    components: { footerbar }
};
</script>