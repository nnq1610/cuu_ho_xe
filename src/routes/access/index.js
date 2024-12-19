const express = require('express');
const accessController = require('../../controllers/access.controller.js');
const {checkJWT} = require('../../middlewares/checkJWT')
const asyncHandler = require('../../helpers/asyncHandler.js');
const {upload, uploadToCloudinary} = require('../../middlewares/upload');
const router = express.Router();

// Sign up
router.post('/signup', asyncHandler(accessController.signUp));

// Login
router.post('/login', asyncHandler(accessController.login));

// Update User
router.put('/user/update',checkJWT, asyncHandler(accessController.updateUser))

// Logout
router.post('/logout', asyncHandler(accessController.logout))

//Get user byId
router.get('/user/:id', asyncHandler(accessController.getUserById))

router.get('/user/me', checkJWT, asyncHandler(accessController.getUser))

//delete Account byId
router.delete('/user/:userId',checkJWT, asyncHandler(accessController.deleteAccount))

//Get list users
router.get('/users', asyncHandler(accessController.getListUsers))

//changePassword
router.post('/changePassword', asyncHandler(accessController.changePassword))


module.exports = router;