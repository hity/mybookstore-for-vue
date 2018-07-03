// 用户与书本的关联表，包含一些用户自定义属性
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const mybookSchema = new Schema({
    bookid: { type: String }, // 唯一码
    userid: { type: String }, // 唯一码 用户id

    tag: { type: String }, // 自定义标签 标签表 以逗号分割
    pos: { type: String }, // 位置 位置表

    isWantedToBuy: { type: Boolean}, // 是否想买
    isWantedToRead: { type: Boolean}, // 是否想读
    isMine: { type: Boolean}, // 是否是藏书
    isRead: { type: Boolean}, // 是否已读

    possessTime: { type: Date }, // 购买时间 or 拥有时间
    readTime: { type: Date }, // 完成阅读时间

    borrower: { type: String }, // 借阅人
    borrowTime: { type: Date }, // 借阅时间
    returnTime: { type: Date }, // 归还时间
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('mybook', bookSchema)