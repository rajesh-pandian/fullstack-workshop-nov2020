const { Router } = require('express');
const RoomController = require('../manage-rooms/room.controller');
const RoomMiddleware = require('../manage-rooms/room.middleware');
const UserMiddleware = require('../manage-users/auth.middleware')

const router = new Router();
const roomController = new RoomController();
const roomMiddleware = new RoomMiddleware();
const userMiddleware = new UserMiddleware();

router.get('/all', roomController.retrieveAllRooms);
router.get('/search', roomController.retrieveRoom);
router.post('/create', userMiddleware.checkAuth, roomMiddleware.validateCreate, roomController.createRoom);
router.put('/update/:roomId', userMiddleware.checkAuth, roomMiddleware.validateUpdate, roomController.updateRoom);
router.delete('/delete/:roomId', userMiddleware.checkAuth, roomMiddleware.validateDelete, roomController.deleteRoom);

module.exports = router;
