const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/signup', userController.loadSignUp)
router.post('/signup', userController.signUp)

router.get('/signin', userController.loadsignIn)
router.post('/signin', userController.signIn)

router.get('/logout', userController.logout);

module.exports = router