import categoryModel from '../models/category'
import * as baseModel from '../models/base'

export default {
	getCategory: async (req, res, next) => {
		let data = req.query
		try {
			let rst = await baseModel.getInfo(categoryModel, data)
			res.send(rst)
		} catch (err) {
			res.send({
				success: false
			})
			console.log('category获取失败');
			throw new Error(err)
		}

	}
}
