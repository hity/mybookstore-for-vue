import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, index: true}  // 名称
});

export default mongoose.model('category', categorySchema);

