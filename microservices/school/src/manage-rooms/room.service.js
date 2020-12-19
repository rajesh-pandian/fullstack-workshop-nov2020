const DatabaseService = require('../database/database.service');

class RoomService {
    INSERT_ROOM = `
        INSERT INTO room (name, capacity) VALUES(?,?);
    `;

    UPDATE_ROOM = `
        UPDATE room SET name = ?, capacity = ? WHERE id = ?;
    `;

    DELETE_ROOM = `
        DELETE FROM room where id = ?;
    `;

    SELECT_ALL_ROOM = `
        SELECT id, name, capacity FROM room ORDER BY name;
    `;

    SELECT_ROOM = `
        SELECT id, name, capacity FROM room where name like ?;
    `;

    SELECT_ROOM_BY_ID = `
        SELECT name, capacity FROM room where id = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createRoom({ name, capacity }) {
        try {
            const { insertId } = await this.databaseService.query(this.INSERT_ROOM,
                [ name, capacity ]);
            return insertId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async updateRoom({ name, capacity }, roomId) {
        try {
            const { updateId } = await this.databaseService.query(this.UPDATE_ROOM,
                [ name, capacity, roomId ]);
            return updateId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async deleteRoom(roomId) {
        try {
            const { deleteId } = await this.databaseService.query(this.DELETE_ROOM,
                [ roomId ]);
            return deleteId;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveAllRooms() {
        try {
            const result = await this.databaseService.query(this.SELECT_ALL_ROOM);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveRoom({ name }) {
        try {
            const result = await this.databaseService.query(this.SELECT_ROOM, [ `${name}%` ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }

    async retrieveRoomById(id) {
        try {
            const result = await this.databaseService.query(this.SELECT_ROOM_BY_ID, [ id ]);
            return result;
          } catch (error) {
            console.error(error);
            throw error;
          }
    }
}

module.exports = RoomService;
