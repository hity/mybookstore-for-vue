import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String }, // 自定义标签 标签表 以逗号分割
    email: { type: String }, // 位置 位置表
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('user', userSchema)