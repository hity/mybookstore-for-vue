import posModel from '../models/pos'
import * as baseModel from '../models/base'

export default {
	getPos: async (req, res, next) => {
		let data = req.query
		try {
			let rst = await baseModel.getInfo(posModel, data)
			res.send(rst)
		} catch (err) {
			res.send({
				success: false
			})
			console.log('pos获取失败');
			throw new Error(err)
		}

	}
}
