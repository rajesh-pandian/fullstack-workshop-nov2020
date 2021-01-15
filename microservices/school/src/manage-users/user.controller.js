const UserService = require('./user.service');
const { jwt_key } = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authError = new Error('Authentication failed.');

class UserController {

    constructor() {
        this.userService = new UserService();
    }

    userLogin = async (req, res) => {

        try {
            const fetchedUser = await this.userService.retrieveUserByName(req.body.username);
            if (!fetchedUser || fetchedUser.length < 1) {
                throw authError;
            }
            // found user
            const {username, id, passwordDigest} = fetchedUser[0];

            const hashMatch = await bcrypt.compare(req.body.password, passwordDigest);
            if (!hashMatch) {
                throw authError;
            }
            // hashes match, correct password entered
            // time to generate user's JWT
            const token = jwt.sign(
                {username, id},
                jwt_key,
                {expiresIn: '60m'}
            );

            res.status(200).json({
                token: token,
                expiresIn: 3600,
                id
            });
        }
        catch (error) {
            console.log('in userLogin and the error caught is ', error);
            res.status(500).json({ status: 'Failed', message: 'Error logging in user' });
        }
    }

    userSignUp = async (req, res) => {
        try {
            // create a new user and store it in the database
            const hash = await bcrypt.hash(req.body.password, 15)
            const {username, id} = await this.userService.createUser(req.body.username, hash);

            const token = jwt.sign({username, id},
                jwt_key,
                {expiresIn: '60m'}
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                id
            });
        }
        catch (error) {
            console.log('in userSignUp and the error caught is ', error);
            res.status(500).json({ status: 'Failed', message: 'Error creating user' });
        }
    }
}

module.exports = UserController;
