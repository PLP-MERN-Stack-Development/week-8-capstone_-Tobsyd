const router = require('express').Router();
const { getAll, getById, create } = require('../controllers/testController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAll);
router.get('/:id', protect, getById);
router.post('/', protect, create);
module.exports = router;