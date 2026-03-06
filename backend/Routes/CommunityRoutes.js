import express from 'express';
import { GetPostLikes,GetCommunityPosts,getComments,toggleLike, addComment, uploadImagePost, createPost} from '../Controllers/CommunityController.js';
import {upload} from '../Middlewares/upload.js';

const router = express.Router();

router.get('/posts', GetCommunityPosts);
router.get('/likes', GetPostLikes);
router.get('/comments', getComments);
router.post('/like-post', toggleLike);
router.post('/comment-post', addComment);
router.post('/upload-post-image', upload.single("file"), uploadImagePost);
router.post('/create-post', createPost);

export default router;