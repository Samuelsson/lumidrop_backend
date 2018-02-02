const express = require('express');

const router = express.Router();

require('./users')(router);

// Fallback for non declared routes
router.get('*', (req, res) => {
    res.json({ message: "This isn't the place you're looking for" });
});

module.exports = router;
