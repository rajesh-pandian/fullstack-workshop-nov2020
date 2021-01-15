const { Router } = require('express');
const UserController = require('../manage-users/user.controller');
const UserMiddleWare = require('../manage-users/auth.middleware');


const router = new Router();
const userController = new UserController();
const userMiddleWare = new UserMiddleWare();

router.post('/signup', userMiddleWare.validateCreate ,userController.userSignUp);
router.post('/login',  userController.userLogin);


module.exports = router;
