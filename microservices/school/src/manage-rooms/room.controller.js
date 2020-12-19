const RoomService = require('./room.service');

class RoomController {
    constructor() {
        this.roomService = new RoomService();
    }

    createRoom= async (req, res) => {
        try {

            const roomDetails = req.body;


            console.log('in room controller, room details are ', roomDetails);

            await this.roomService.createRoom(roomDetails);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error creating Room' });
        }
    } 

    updateRoom= async (req, res) => {
        try {
            const roomId = req.params.roomId
            const roomDetails = req.body;
            await this.roomService.updateRoom(roomDetails, roomId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error updating Room' });
        }
    } 

    deleteRoom= async (req, res) => {
        try {
            const roomId = req.params.roomId
            await this.roomService.deleteRoom(roomId);
            return res.json({'result': 'success'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error deleting Room' });
        }
    } 

    retrieveAllRooms= async (req, res) => {
        try {
            const roomDetails = req.body;
            const result = await this.roomService.retrieveAllRooms(roomDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving all Rooms' });
        }
    } 

    retrieveRoom= async (req, res) => {
        try {
            const roomDetails = req.query;
            const result = await this.roomService.retrieveRoom(roomDetails);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 'Failed', message: 'Error retrieving Room' });
        }
    } 
}

module.exports = RoomController;
