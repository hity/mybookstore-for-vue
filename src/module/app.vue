<!--
 - @author:      hity
 - @dateTime:    2018-11-05
 - @description: index\error\landingpage容器
-->
<template>
    <div style="width: 100%;height:100%;">
        <headerbar></headerbar>
        <router-view></router-view>
    </div>
</template>
<script>
import headerbar from './common_blocks/headerbar';

export default {
    name: 'pageApp',
    components: { headerbar }
};
</script>