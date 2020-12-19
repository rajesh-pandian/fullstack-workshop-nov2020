const { Router } = require('express');
const RoomController = require('../manage-rooms/room.controller');
const RoomMiddleware = require('../manage-rooms/room.middleware');

const router = new Router();
const roomController = new RoomController();
const roomMiddleware = new RoomMiddleware();

router.get('/all', roomController.retrieveAllRooms);

router.get('/search', roomController.retrieveRoom);

router.post('/create', roomMiddleware.validateCreate, roomController.createRoom);

router.put('/update/:roomId', roomMiddleware.validateUpdate, roomController.updateRoom);

router.delete('/delete/:roomId', roomMiddleware.validateDelete, roomController.deleteRoom);

module.exports = router;
