const express = require('express');
const orderRoute = express.Router();
const validator = require('../middlewares/validator')
const {addOrder} = require('../controllers/orderController')
const validation = require('../validation/index')

orderRoute.post('/order',addOrder)

module.exports = orderRoute;