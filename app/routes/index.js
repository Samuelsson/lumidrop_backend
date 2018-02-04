const express = require('express');
const userRoutes = require('./users/users.route');

const router = express.Router();

router.use('/users', userRoutes);

// Fallback for non declared routes
router.get('*', (req, res) => {
    res.json({ message: "This isn't the place you're looking for" });
});

module.exports = router;
