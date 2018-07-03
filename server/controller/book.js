import bookModel from '../models/book'
import tagModel from '../models/tag'
import categoryModel from '../models/category'
import posModel from '../models/pos'
import * as baseModel from '../models/base'
import asyncModule from 'async'

export default {
	addBook: async (req, res, next) => {
		let data = req.body
		if (!data.name) {
			res.send({
				success: false,
				error: '书名不能为空！'
			})
			return
		}
		try {
			let info = await baseModel.add2Db(bookModel, {name: data.name}, data)
			await addTag(data.tag)
			await baseModel.add2Db(categoryModel, {name: data.category}, {name: data.category})
			await baseModel.add2Db(posModel, {name: data.pos}, {name: data.pos})
			res.send({
				success: true
			})
		} catch (err) {
			res.send({
				success: false
			})
			console.log('book存储失败');
			throw new Error(err)
		}
	},

	getBook: async (req, res, next) => {
		let data = req.query
		console.log('here')
		try {
			let rst = await baseModel.getInfo(bookModel, data)
			res.send(rst)
		} catch (err) {
			res.send({
				success: false
			})
			console.log('book获取失败');
			throw new Error(err)
		}

	}
}

async function addTag(tag) {
	let asyncFuncArray = []
	tag.split(',').forEach(i => {
		asyncFuncArray.push(
			async (callback) => {
				let info = await baseModel.add2Db(tagModel, {name: i}, {name: i})
				callback(null, info)
			}
		)
	})
	return new Promise((resolve, reject) => {
		asyncModule.parallel(asyncFuncArray, (err, result) => {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}