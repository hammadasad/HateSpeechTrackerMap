const express = require('express');
const router = express.Router();

require('dotenv/config');

// Routes
router.get('/', (req, res) => {
    res.render('index', { title: "Hate Speech Twitter Stream", api: process.env.GOOGLE_MAP_API_KEY });
});

module.exports = router;