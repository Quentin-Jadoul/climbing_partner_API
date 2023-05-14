let express = require('express');
let router = express.Router();
let userController = require('./controllers/userController.js');
let boulderController = require('./controllers/boulderController.js');
let activityController = require('./controllers/activityController.js');
let placeController = require('./controllers/placeController.js');
let climbController = require('./controllers/climbController.js');

const { login, isAuthorized} = require('./middlewares/authorization.js');

// user
router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.patch('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

// boulders
router.post('/boulder', boulderController.createBoulder);
router.get('/boulders', boulderController.getBoulders);
router.get('/boulder/:id', boulderController.getBoulder);
router.patch('/boulder/:id', boulderController.updateBoulder);
router.delete('/boulder/:id', boulderController.deleteBoulder);
router.get('/boulders/place/:id', boulderController.getBouldersByPlace);
router.get('/boulders/place/:id/count', boulderController.getBouldersCountByPlace);

// activities
router.post('/activity', isAuthorized, activityController.createActivity);
router.get('/activities', activityController.getActivities);
router.get('/activity/:id', activityController.getActivity);
router.patch('/activity/:id', isAuthorized, activityController.updateActivity);
router.delete('/activity/:id', isAuthorized, activityController.deleteActivity);
router.get('/activities/user', activityController.getActivitiesByUser);
router.get('/activities/count', activityController.getActivitiesCount);

// climbs
router.post('/climb', isAuthorized, climbController.createClimb);
router.get('/climbs', climbController.getClimbs);
router.get('/climb/:id', climbController.getClimb);
router.patch('/climb/:id', isAuthorized, climbController.updateClimb);
router.delete('/climb/:id', isAuthorized, climbController.deleteClimb);
router.get('/climbs/activity/:id', climbController.getClimbsByActivity);
router.get('/climbs/boulder/:id', climbController.getClimbsByBoulder);

// places
router.post('/place', placeController.createPlace);
router.get('/places', placeController.getPlaces);
router.get('/place/:id', placeController.getPlace);
router.patch('/place/:id', placeController.updatePlace);
router.delete('/place/:id', placeController.deletePlace);
router.get('/places/count', placeController.getPlacesCount);
router.get('/places/names', placeController.getPlacesNames);

// Auth
router.post('/login', login);

module.exports = router;