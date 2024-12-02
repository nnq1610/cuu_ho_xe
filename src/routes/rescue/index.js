const express = require('express');
const rescueController = require('../../controllers/rescue.controller.js');
const asyncHandler = require('../../helpers/asyncHandler.js');
const router = express.Router();

//create rescue unit
router.post('/rescue-units', asyncHandler(rescueController.createRescueUnit));

// getActiveRescueUnits
router.get('/rescue-units/active', asyncHandler(rescueController.getActiveRescueUnits));

// addIncidentType
router.post('/addIncident', asyncHandler(rescueController.addIncidentType))

// updateIncidentType
router.put('/rescue-units/incident-types', asyncHandler(rescueController.updateIncidentType))
//search rescue theo bộ lọc
router.get('/rescue-units/search', asyncHandler(rescueController.searchRescueUnits))

module.exports = router;