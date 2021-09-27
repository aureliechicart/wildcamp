const { Router } = require('express');
const router = Router();

const campgroundController = require('./controllers/campgroundController');

router.get('/campgrounds', campgroundController.getAll);

module.exports = router;