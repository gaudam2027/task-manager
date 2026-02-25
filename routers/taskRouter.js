const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const isAuthenticated = require('../middleware/authentication')

router.get("/",isAuthenticated,taskController.loadDashboard);

// Tasks CRUD
router.get("/tasks", isAuthenticated, taskController.getTasks);
router.post("/tasks", isAuthenticated, taskController.createTask);
router.put("/tasks/:id", isAuthenticated, taskController.updateTask);
router.delete("/tasks/:id", isAuthenticated, taskController.deleteTask);


module.exports = router