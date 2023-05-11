let express = require('express');
let router = express.Router();
let userController = require('./controllers/userController.js');
let boulderController = require('./controllers/boulderController.js');
let activityController = require('./controllers/activityController.js');
let placeController = require('./controllers/placeController.js');
let climbController = require('./controllers/climbController.js');

// user
router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.patch('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/user/login', userController.loginUser);
router.get('/user/check/username/:username', userController.checkUsername);
router.get('/user/check/email/:email', userController.checkEmail);

// boulders
router.post('/boulder', boulderController.createBoulder);
router.get('/boulders', boulderController.getBoulders);
router.get('/boulder/:id', boulderController.getBoulder);
router.patch('/boulder/:id', boulderController.updateBoulder);
router.delete('/boulder/:id', boulderController.deleteBoulder);
router.get('/boulders/place/:id', boulderController.getBouldersByPlace);
router.get('/boulders/place/:id/count', boulderController.getBouldersCountByPlace);

// activities
router.post('/activity', activityController.createActivity);
router.get('/activities', activityController.getActivities);
router.get('/activity/:id', activityController.getActivity);
router.patch('/activity/:id', activityController.updateActivity);
router.delete('/activity/:id', activityController.deleteActivity);
router.get('/activities/user/:id', activityController.getActivitiesByUser);
router.get('/activities/count', activityController.getActivitiesCount);

// climbs
router.post('/climb', climbController.createClimb);
router.get('/climbs', climbController.getClimbs);
router.get('/climb/:id', climbController.getClimb);
router.patch('/climb/:id', climbController.updateClimb);
router.delete('/climb/:id', climbController.deleteClimb);
router.get('/climbs/activity/:id', climbController.getClimbsByActivity);
router.get('/climbs/boulder/:id', climbController.getClimbsByBoulder);

// places
router.post('/place', placeController.createPlace);
router.get('/places', placeController.getPlaces);
router.get('/place/:id', placeController.getPlace);
router.patch('/place/:id', placeController.updatePlace);
router.delete('/place/:id', placeController.deletePlace);
router.get('/places/count', placeController.getPlacesCount);

module.exports = router;