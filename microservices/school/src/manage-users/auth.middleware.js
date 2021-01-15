const jwt = require('jsonwebtoken');
const { jwt_key } = require('./config');
const UserService = require('./user.service');
const validatePassword = require('./password-validation');

class UserMiddleware {
    constructor() {
        this.userService = new UserService();
    }

    validateCreate= async (req, res, next) =>  {
        const credentials = req.body;

        let errorList = [];
        let isError = false;

        const result = await this.userService.retrieveUserByName(credentials.username);
        if (result && result.length != 0 ) {
            isError = true;
            errorList.push('UserAlreadyExists')
        }

        const errors = validatePassword(credentials.password);

        if(errors.length) {
            isError = true;
            for (let error of errors) {
                errorList.push(error);
            }
        }

        if (isError) {
            res.status(400).json({ message: errorList });
        } else {
            next();
        }
    }

    checkAuth = (req, res, next) => {
        // token is the value of 'authorization' http header
        // format "Bearer abcd1234..."
        // split on the white space to grab the token value
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, jwt_key);
            req.userData = {userId: decodedToken.id};
            // if code gets here with no errors thrown, token is present and valid
            next();
        } catch (error) {
            res.status(401).json({message: "Authorization failed!"});
        }
    }
}

module.exports = UserMiddleware;
