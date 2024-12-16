const express = require('express');
const rescueController = require('../../controllers/rescue.controller.js');
const multer = require('multer');
const asyncHandler = require('../../helpers/asyncHandler.js');
const router = express.Router();
const {upload, uploadToCloudinary} = require('../../middlewares/upload');
const {checkRole} = require('../../middlewares/checkRole')
const {checkJWT} = require('../../middlewares/checkJWT')

//create rescue unit
router.post('/rescue-units', checkJWT,checkRole
    , asyncHandler(rescueController.createRescueUnit));

//getRescueUnit byId
router.get('/rescue-unit/:userId', checkJWT,checkRole, asyncHandler(rescueController.getRescueUnitByUserId))

// getActiveRescueUnits
router.get('/rescue-units/active',  checkJWT,checkRole,asyncHandler(rescueController.getActiveRescueUnits));

// addIncidentType
router.post(
    '/rescue-units/incident-types',upload,  checkJWT,checkRole, uploadToCloudinary,asyncHandler(rescueController.addIncidentType)
);
// updateIncidentType
router.put(
    '/rescue-units/incident-types/:incidentTypeId', upload, uploadToCloudinary,  checkJWT,checkRole,
    asyncHandler(rescueController.updateIncidentType)
);
//deleteIncidentType
router.delete('/rescue-units/incident-types/:incidentTypeId',  checkJWT,checkRole, asyncHandler(rescueController.removeIncidentType))

//search rescue theo bộ lọc
router.post('/rescue-units/search', asyncHandler(rescueController.searchRescueUnits))

//get by id
router.get('/rescue-units/incident-types/:incidentId', asyncHandler(rescueController.getDetailIncidentById))


module.exports = router;