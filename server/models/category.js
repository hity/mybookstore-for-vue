import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, index: true},  // 名称
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('category', categorySchema);

