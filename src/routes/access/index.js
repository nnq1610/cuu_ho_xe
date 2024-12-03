const express = require('express');
const accessController = require('../../controllers/access.controller.js');
const asyncHandler = require('../../helpers/asyncHandler.js');
const router = express.Router();

// Sign up
router.post('/signup', asyncHandler(accessController.signUp));

// Login
router.post('/login', asyncHandler(accessController.login));

// Logout
router.post('/logout', asyncHandler(accessController.logout))

//Get user byId
router.get('/user/', asyncHandler(accessController.getUserById))

//Get list users
router.get('/users', asyncHandler(accessController.getListUsers))

//changePassword
router.post('/changePassword', asyncHandler(accessController.changePassword))



module.exports = router;