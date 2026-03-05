import express from 'express';
import { addResourcesController, getSingleResourceController, ResoursesController, updateResourceController } from '../Controllers/ResoursesController.js';

const router = express.Router();

router.get('/', ResoursesController);
router.get('/:id', getSingleResourceController);
router.put('/:id', updateResourceController);
router.post('/add', addResourcesController);

export default router;