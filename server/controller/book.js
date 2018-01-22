import Classes from '../models/books'

module.exports = {
	getId: async function(req, res, next){
		try{
			Classes.add({username: 'hity'});
			let info = await Classes.find({'username': 'hity'})
			console.log('info', info)
			res.json({'status': 1, 'info': info})
		}catch(err){
			console.log('获取ID数据失败');
			throw new Error(err)
		}
	}
}
