const DatabaseService = require('../database/database.service');

class AuthService {


    INSERT_USER = `
        INSERT INTO user (username, passwordDigest) VALUES(?,?);
    `;


    SELECT_USER_BY_NAME = `
        SELECT id, username, passwordDigest FROM user where username = ?;
    `;


    SELECT_USER_BY_ID = `
        SELECT id, username, passwordDigest FROM user where id = ?;
    `;

    constructor() {
        this.databaseService = new DatabaseService();
    }

    async createUser( username, passwordDigest ) {
        try {
            const { insertId } = await this.databaseService.query(this.INSERT_USER,
                [username,  passwordDigest]);
            return { username: username, id: insertId };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async retrieveUserByName(username) {
        try {
            const result = await this.databaseService.query(this.SELECT_USER_BY_NAME, [ username ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async retrieveUserById(id) {
        try {
            const result = await this.databaseService.query(this.SELECT_USER_BY_ID, [ id ]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}

module.exports = AuthService;
