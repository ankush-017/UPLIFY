import express from 'express';
import { AddBlogController, AllBlogsController, updateBlogController } from '../Controllers/AllBlogsController.js';

const router = express.Router();

router.get('/', AllBlogsController);
router.post('/admin-blogs', AddBlogController);
router.put('/:id', updateBlogController);
export default router;