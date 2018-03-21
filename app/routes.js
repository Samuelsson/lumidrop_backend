import express from 'express';
import authRoutes from './auth/auth.route';
import userRoutes from './user/user.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

function unknownRouteReturn(res) {
    res.status(400).json({ message: 'Unknown route' });
}

// Fallback for non declared routes
router.get('*', (req, res) => { unknownRouteReturn(res); });
router.post('*', (req, res) => { unknownRouteReturn(res); });
router.put('*', (req, res) => { unknownRouteReturn(res); });
router.delete('*', (req, res) => { unknownRouteReturn(res); });

export default router;
