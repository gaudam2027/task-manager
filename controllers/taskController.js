const Task = require("../models/taskSchema");
const User = require("../models/userSchema");

const loadDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        const tasks = await Task.find({ user: req.session.userId, isDeleted: false });

        res.render("dashboard", { user, tasks }); // pass tasks to dashboard view
    } catch (err) {
        console.error(err);
        res.redirect("/login");
    }
};


const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const task = await Task.create({
      title,
      description: description || "",
      status: "pending",
      userId: req.session.userId
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.session.userId, isDeleted: false }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status, title, description } = req.body;

    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const task = await Task.findOne({ _id: taskId, userId: req.session.userId });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }


    if (status && ["pending", "completed"].includes(status)) {
      task.status = status;
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;

    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}; 

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const task = await Task.findOne({ _id: id, userId: req.session.userId });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    task.isDeleted = true;
    await task.save();

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
    loadDashboard,
    createTask,
    getTasks,
    updateTask,
    deleteTask
};