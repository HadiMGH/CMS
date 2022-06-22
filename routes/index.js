/**
 * Configura todas as rotas.
 */

const router = require('express').Router();
const auth = require('./auth');


router.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
router.use('/api/v1.0/auth', auth);

module.exports = router;