import express from 'express';
import authCtrl from './auth.controller';
import verifyJwt from './verify-jwt';

const router = express.Router();

router.post('/login', authCtrl.login);
// router.post('/register', verifyJwt, authCtrl.register); // Just testing with auth
router.post('/register', authCtrl.register);

module.exports = router;
