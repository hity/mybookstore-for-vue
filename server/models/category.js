import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, index: true},  // 名称
    createTime: { type: Date },
    updateTime: { type: Date }
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
});

export default mongoose.model('category', categorySchema);

