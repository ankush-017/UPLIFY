import express from 'express';
import { GetPostLikes,GetCommunityPosts,getComments,toggleLike, addComment} from '../Controllers/CommunityController.js';

const router = express.Router();
router.get('/posts', GetCommunityPosts);
router.get('/likes', GetPostLikes);
router.post('/comments', getComments);
router.post('/like-post', toggleLike);
router.post('/comment-post', addComment);

export default router;