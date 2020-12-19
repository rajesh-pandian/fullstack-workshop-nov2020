const RoomService = require('./room.service');

class RoomMiddleware {
    constructor() {
        this.roomService = new RoomService();
    }

    validateCreate= async (req, res, next) =>  {
        const roomDetails = req.body
        let errorList = [];
        let isError = false;
        if (!roomDetails.name || roomDetails.name.trim() === '') {
            isError = true;
            errorList.push('Name cannot be Empty')
        }

        if (!roomDetails.capacity || roomDetails.capacity < 2) {
            isError = true;
            errorList.push('Capacity cannot be Empty or less than 2')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateUpdate= async (req, res, next) =>  {
        const roomDetails = req.body;
        let errorList = [];
        let isError = false;
        
        const result = await this.roomService.retrieveRoomById(req.params.roomId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (!roomDetails.name || roomDetails.name.trim() === '') {
            isError = true;
            errorList.push('Name cannot be Empty')
        }

        if (!roomDetails.capacity || roomDetails.capacity < 2) {
            isError = true;
            errorList.push('Capacity cannot be Empty or less than 2')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    validateDelete= async (req, res, next) =>  {
        let errorList = [];
        let isError = false;
        
        const result = await this.roomService.retrieveRoomById(req.params.roomId);
        if (result && result.length === 0) {
            isError = true;
            errorList.push('Id is invalid')
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }
}

module.exports = RoomMiddleware;
