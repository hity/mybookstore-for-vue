// 书本的常规属性
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
    isbn: { type: String }, // 唯一码
    name: { type: String, required: true }, // 名称
    author: { type: String }, // 作者
    translator: { type: String }, // 翻译
    publisher: { type: String }, // 出版社
    category: { type: String }, // 分类 分类表
    realPrice: { type: Number }, // 购买价格
    logo: { type: String }, // 封面链接
    pubdate: { type: String }, // 出版日期
    pages: { type: String }, // 页码
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('book', bookSchema)