<!--
 - @author:      hity
 - @dateTime:    2018-09-26
 - @description: app容器盒子
-->
<template>
    <transition name="fade">
        <router-view class="view"></router-view>
    </transition>
</template>
<script>
import { mapMutations } from 'vuex';
// import { userInfo } from '@/request/user';
export default {
    name: 'App',
    methods: {
        // ...mapMutations('user', [
        //     'changeUserInfo'
        // ]),
        // requestUser() {
        //     userInfo().then(({ data, statusCode }) => {
        //         if (statusCode === 200 && data) {
        //             this.setSysInfo(data);
        //         }
        //     });
        // }
    },
    created() {
        // this.requestUser();
    }
};
</script>
<style lang="scss">
@import 'src/style.scss';
</style>
