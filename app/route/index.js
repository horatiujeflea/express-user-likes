const express = require('express');
const router = express.Router();

router.use(require('./auth-routes'));
router.use(require('./likes-routes'));

module.exports = router;