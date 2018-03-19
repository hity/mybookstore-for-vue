import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
    name: { type: String, unique: true, index: true}  // 名称
});

export default mongoose.model('tag', tagSchema);

