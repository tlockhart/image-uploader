// Handles product related routes

const express = require('express');

// Conveniently handles routes with different endpoints
const router = express.Router();


// JWT Middleware to Authenticate routes:
const checkAuth = require('../authenticators/check-auth');

// Import ProductsController
const ProductsController = require('../controllers/products');

/*************************************************
 * products': Second argument is a handler function
 * Display URL: localhost:3000/products/
 * API URL: 'api/products/'
 * Access: Visitor/User/Admin - No Check Auth req
 *************************************************/
router.get('/', ProductsController.products_get_all);

// Post request body:
// {
// 	"name": "Smurfs",
// 	"value": 12.99,
//  "productImage": tlockhart.png
// }

/***********************************
 * Purpose: Insert a new Product
 * API URL: 'api/products/product/insert/'
 * Access: User/Admin - Check Auth req
 ***********************************/
router.post('/product/insert/', checkAuth, ProductsController.products_insert_product);

/*******************************
 * Purpose: Insert an image to cloudinary
 * API URL: 'api/products/cloudinary/insert/'
 * Access: Admin - Check Auth req
 *******************************/
router.post('/cloudinary/insert/', checkAuth, ProductsController.cb_image_upload);

/******************************
 * Purpose: Get a product
 * Display URL: localhost:3000/products/
 * :productId
 * API URL: 'api/products/:productId'
 * Access: User/Admin - Check Auth req
 *******************************/
router.get('/:productId',checkAuth, ProductsController.products_get_product);

// change data in the database (update)
// Patch Request Body: 
// [
// 	{
// 		"propName": "name",
// 		"value": "Harry Potter 7"
// 	},
// 	{
// 		"propName": "value",
// 		"value": "10"
// 	}
// ]
/*******************************************
 * Purpose: Update existing product
 * Display URL: localhost:3000/products/
 * :productId
 * API URL: 'api/products/product/update/:productId
 * Access: Admin - Check Auth req
 *********************************************/
router.patch('/product/update/:productId', checkAuth, ProductsController.products_update_product);

/*********************************
 * Purpose: Delete a product
 * Display URL: localhost:3000/products/delete/
 * :productId
 * API URL: 'api/products/delete/:productId
 * Access: Admin - Check Auth req
 **********************************/
router.delete('/product/delete/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;