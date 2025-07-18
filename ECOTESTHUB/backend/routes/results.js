const router = require('express').Router();
const { submit, history } = require('../controllers/resultController');
const { protect } = require('../middleware/auth');

router.post('/', protect, submit);
router.get('/', protect, history);
module.exports = router;