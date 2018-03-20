import path from 'path';
import express from 'express';
import BookCtrl from '../controller/book';
import TagCtrl from '../controller/tag';
import PosCtrl from '../controller/pos';
import CategoryCtrl from '../controller/category';

const router = express.Router()

router.post('/api/book', BookCtrl.addBook)
router.get('/api/book', BookCtrl.getBook)
router.get('/api/tag', TagCtrl.getTag)
router.get('/api/pos', PosCtrl.getPos)
router.get('/api/category', CategoryCtrl.getCategory)

router.get('*', function(req, res, next) {
	res.sendfile(path.join(__dirname, '../../public/index.html')); // 发送静态文件
});
export default router