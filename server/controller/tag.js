import tagModel from '../models/tag'
import * as baseModel from '../models/base'

export default {
	getTag: async (req, res, next) => {
		let data = req.query
		try {
			let rst = await baseModel.getInfo(tagModel, data)
			res.send(rst)
		} catch (err) {
			res.send({
				success: false
			})
			console.log('tag获取失败');
			throw new Error(err)
		}
	}
}
