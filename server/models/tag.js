import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
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

export default mongoose.model('tag', tagSchema);

