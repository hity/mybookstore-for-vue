<template>
    <div class="g-bd-hd">
        <i class="icon iconfont iconxiangzuo" @click="goBack()"></i>
        {{title}}
    </div>
</template>
<script>

export default {
    name: 'back-hd',
    data() {
        return {
        }
    },
    props: {
        title: {
            type: String,
            require: true
        },
        goFunc: {
            type: Function
        }
    },
    methods: {
        goBack() {
            if (this.goFunc) {
                this.goFunc();
            } else {
                this.$router.go(-1);
            }
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
</style>