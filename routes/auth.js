const express = require('express');
const router = express.Router();
const path = require('path');

// Route for the login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html')); // Serve the login.html file
});

// You can add more routes here for handling login POST requests, etc.

module.exports = router;
