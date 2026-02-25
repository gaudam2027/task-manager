const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const isAuthenticated = require('../middleware/authentication')

router.get("/", isAuthenticated, taskController.loadDashboard);

// Tasks CRUD
// router.get("/tasks", isAuthenticated, taskController.getTasks); // list tasks
// router.post("/tasks", isAuthenticated, taskController.createTask); // create new task
// router.put("/tasks/:id", isAuthenticated, taskController.updateTask); // update status
// router.delete("/tasks/:id", isAuthenticated, taskController.deleteTask); // soft delete


module.exports = router