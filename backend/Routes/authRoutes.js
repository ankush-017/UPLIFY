import express from 'express';
import { allUserController, getUserController, getuserControllerbyUID, registerController, sendOtpController, updateProfileController, userVerifybyEmailController, verifyOtpController } from '../Controllers/authController.js';
import { verifyFirebaseToken } from '../Middlewares/verifyFirebaseToken.js';

const router = express.Router();

router.post('/register', verifyFirebaseToken, registerController);
router.get('/role/:uid', verifyFirebaseToken, getUserController);
router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);
router.get('/getuser/:uid', getuserControllerbyUID);
router.post('/check-email', userVerifybyEmailController);
router.put('/update-profile',verifyFirebaseToken, updateProfileController);
// router.get('/getuser/:uid', getuserControllerbyUID);
router.get('/',allUserController);

export default router;