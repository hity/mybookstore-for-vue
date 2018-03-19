import mongoose from 'mongoose'

const positionSchema = new mongoose.Schema({
    name: { type: String, unique: true, index: true}  // 名称
});

export default mongoose.model('position', positionSchema);

