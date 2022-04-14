
const userController = require('../controller/userController')
const express = require('express');
const router = express.Router();


router.route("/api/register").post(userController.register)
router.route("/api/login").post(userController.login)
router.route("api/logout").post(userController.logout)

module.exports = router