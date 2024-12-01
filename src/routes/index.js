const express = require('express');
const {checkJWT} = require('../middlewares/checkJWT')
const router = express.Router();

router.use('/v1/api', require('./access'));

router.use(checkJWT);

router.use('/v1/api', require('./rescue'));

module.exports = router;