const express = require('express');
const accessController = require('../../controllers/access.controller.js');
const asyncHandler = require('../../helpers/asyncHandler.js');
const router = express.Router();

// Sign up
router.post('/signup', asyncHandler(accessController.signUp));
router.post('/login', asyncHandler(accessController.login));

// Logout
router.post('/logout', asyncHandler(accessController.logout))

//Get user byId
router.get('/user/:id', asyncHandler(accessController.getUserById))

//Get list users

router.get('/users', asyncHandler(accessController.getListUsers))

module.exports = router;