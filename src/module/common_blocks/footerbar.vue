<!--
 - @author:      hity
 - @dateTime:    2019-08-06
 - @description: footerbar
-->
<template>
    <div class="g-footer">
        <div class="toolbar">
            <router-link to="/store/list">
                <i class="icon iconfont iconbook"></i><br/>
                藏书
            </router-link>
            <router-link to="/store/detail/12">
                <i class="icon iconfont icondengji"></i><br/>
                录入
            </router-link>
            <router-link to="/store/detail/13">
                <i class="icon iconfont iconwj-jh"></i><br/>
                计划
            </router-link>
        </div>
    </div>
</template>
<script>
// import { toQuit, toLogin } from 'libs/login';
// import { mapState, mapGetters, mapMutations } from 'vuex';
// import storage from '@/libs/storage';

export default {
    name: 'footerbar',
    computed: {
    },
    methods: {
    }
};
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/style.scss';

.g-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 2rem;
    border-top: 1px solid $border-color;
    .toolbar {
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
    }
    a {
        display: block;
        color: $text-6;
        font-size: $font-size-base;
        cursor: pointer;
        i {
            font-size: $font-size-lg;
        }
        &:hover{
            color: $theme-color;
        }
        &:active{
            color: $theme-color;
        }
    }
    .active {
        color: $theme-color;
    }
}
</style>