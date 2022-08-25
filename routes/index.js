/**
 * Configura todas as rotas.
 */

const router = require('express').Router();
const auth = require('./auth');
const role = require('./role');
// const category = require('./category');
// const status = require('./status');
// const supplier = require('./supplier');
const country = require('./country');
const province = require('./province');
const township = require('./township');



router.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
router.use('/api/v1.0/auth', auth);
router.use('/api/v1.0/role', role);
// router.use('/api/v1.0/category', category);
// router.use('/api/v1.0/status', status);
router.use('/api/v1.0/country', country);
router.use('/api/v1.0/province', province);
// router.use('/api/v1.0/supplier', supplier);
router.use('/api/v1.0/township', township);


module.exports = router;