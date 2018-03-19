import mongoose from './db.js'

const Schema = mongoose.Schema

const bookSchema = new Schema({
    isbn: { type: String }, // 唯一码
    name: { type: String }, // 名称
    author: { type: String }, // 作者
    translator: { type: String }, // 翻译
    publisher: { type: String }, // 出版社
    category: { type: String }, // 分类
    realPrice: {type: Number }, // 购买价格
    logo: {type: String }, // 封面链接

    tagIds: { type: Array }, // 自定义标签
    posId: { type: Schema.Types.ObjectId, ref: 'position' }, // 位置

    isWantedToBuy: { type: Boolean}, // 是否想买
    isWantedToRead: { type: Boolean}, // 是否想读
    isMine: { type: Boolean}, // 是否是藏书
    isRead: { type: Boolean}, // 是否已读

    possessTime: { type: Date }, // 购买时间 or 拥有时间
    readTime: { type: Date }, // 完成阅读时间

    borrower: { type: String }, // 借阅人
    borrowTime: { type: Date }, // 借阅时间
    returnTime: { type: Date } // 归还时间

})

export default mongoose.model('book', bookSchema)