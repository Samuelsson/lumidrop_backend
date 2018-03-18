import express from 'express';
import userCtrl from './user.controller';

const router = express.Router();

router.route('/')
    .post(userCtrl.register);

export default router;
