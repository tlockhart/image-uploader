const express = require('express');

// Conveniently handles routes with different endpoints
const router = express.Router();

const UserController = require('../controllers/user');

//Import check Auth MiddleWare
const checkAuth = require('../authenticators/check-auth');

/****************************************
 * Purpose: Get user login info and role
 * API URL: '/user/information/:userEmail'
 * Access: Admin - Requires Check Auth
 * **************************************/
router.get('/information/:userEmail', UserController.users_get_user); 

/********************************
 * Purpose: Register user new user
 * API URL: '/user/register'
 * Access: All - No Check Auth req
 ********************************/
router.post('/register', UserController.user_register); // post

/**********************************
 * Purpose: Refresh a users cred
 * API URL: '/user/login/refresh'
 * Access: User/Admin - Check Auth req
 **********************************/
router.post('/login/refresh', checkAuth, UserController.user_refreshTokens);

/*******************************
 * Purpose: User login, create token
 * API URL: '/user/login'
 * Access: All - No Check Auth req
 * ******************************/
router.post('/login', UserController.user_login);

/********************************
 * Purpose: Delete a product
 * API URL: 'localhost:3000'/user/:productId'
 * Access: Admin - Check Auth req
 * *******************************/
router.delete('/:userId', checkAuth, UserController.user_delete); // delete

module.exports = router;