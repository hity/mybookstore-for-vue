import path from 'path';
import express from 'express';
import GetId from '../controller/book';

const router = express.Router()

router.get('/addBook', function(req, res, next) {
    GetId.getId(req, res, next)
	// res.json({
	// 	"status": 1,
	// 	"notes": 'df',
	// 	"total": 'fds'
	// });
})

router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});
export default router