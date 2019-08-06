import bookModel from '../models/book'
import tagModel from '../models/tag'
import categoryModel from '../models/category'
import posModel from '../models/pos'
import * as baseModel from '../models/base'
import asyncModule from 'async'

export default {
	addBook: async (req, res, next) => {
		let data = req.body
		console.log('data', data);
		if (!data.name) {
			res.send({
				success: false,
				error: '书名不能为空！'
			})
			return
		}
		try {
			let info = await baseModel.add2Db(bookModel, {name: data.name}, data)
			console.log('info', info);
			await addTag(data.tag)
			await baseModel.add2Db(categoryModel, {name: data.category}, {name: data.category})
			await baseModel.add2Db(posModel, {name: data.pos}, {name: data.pos})
			console.log('here');			
			res.send({
				success: !!info
			})
		} catch (err) {
			res.send({
				success: false
			})
			console.log('book存储失败', err);
			throw new Error(err)
		}
	},

	getBook: async (req, res, next) => {
		let {
			searchValue
		} = req.query
			
		console.log('here', searchValue)
		try {
			let rst = await baseModel.getInfo(bookModel, {
				$or: [
					{name: new RegExp(searchValue)}, 
					{ISBN: new RegExp(searchValue)}, 
					{author: new RegExp(searchValue)}
				]
			 });
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