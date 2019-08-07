<template>
    <div class="m-wrapper">
        <div class="book-list">
            <div class="book-item" v-for="book in bookList" :key="book.id">
                <div class="book-logo-wp">
                    <img class="book-logo" :src="book.logo"/>
                </div>
                <div class="book-abstract">
                    <p class="book-name">{{book.name}}</p>
                    <p class="book-other">作者：{{book.author}}</p>
                    <p class="book-other">出版社：{{book.publisher}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'store.list',
    data() {
        return {
            bookList: [
                {id: 12, logo: '学习 JavaScript'},
                {id: 123, logo: '学习 JavaScript'},
                {id: 124, name: '学习 Vue'},
                {id: 125, author: '整个牛项目'}
            ]
        };
    },
};
</script>
<style lang="scss" scoped>
@import 'src/assets/styles/style.scss';
.book-list {
  width: 100%;
}

.book-item {
    display: flex;
    justify-content:space-between;
    padding: px2rem(12);
    border-bottom: 1px solid #d9d9d9;
    width: 100%;
    .book-logo-wp {
        width: px2rem(90);
        height: px2rem(90);
        margin-right: px2rem(5);
        img {
            width: px2rem(90);
            height: px2rem(90);
        }
    }
}

.book-abstract {
    width: 100%;
    .book-name {
        font-size: px2rem(14);
        line-height: 120%;
        height: px2rem(37);
    }

    .book-other {
        font-size: px2rem(12);
        line-height: 1.2;
        margin-top: px2rem(5);
    }
}
</style>
