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
    const { title, description } = req.body;
    const task = await Task.create({
        title,
        description,
        status: "pending",
        user: req.session.userId
    });
    res.status(201).json(task);
};

module.exports = {
    loadDashboard,
    createTask
};