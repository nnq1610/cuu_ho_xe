const express = require('express');
const {checkRole} = require('../middlewares/checkRole')
const {checkJWT} = require('../middlewares/checkJWT')

const router = express.Router();

router.use('/v1/api', require('./access'));
// router.use(checkJWT);

router.use('/v1/api', checkJWT, require('./review'));

router.use('/v1/api',require('./rescue'));

router.get('/', (req, res) => {
    res.send('Welcome to the lib');
});

module.exports = router;
