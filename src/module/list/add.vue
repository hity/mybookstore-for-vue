<template>
    <div class="g-bd-wrapper">
        <BackHd :title="($route.params.bookId ? '编辑' : '添加') + '书本'"></BackHd>
        <div class="g-bd-content">
            <AddBook></AddBook>
        </div>
    </div>
</template>
<script>
import AddBook from '../common_blocks/add_book';
import BackHd from '../common_blocks/back_hd';

export default {
    name: 'store.add',
    data() {
        return {
        }
    },
    components: {
        AddBook,
        BackHd,
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
.g-bd-content {
    padding: px2rem(40) px2rem(20);
    height: calc(100% - #{px2rem(200)});
}
</style>