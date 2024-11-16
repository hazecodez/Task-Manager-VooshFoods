const Task = require("../models/taskModel");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      res.status(201).json({ message: "No tasks" });
    }
  } catch (error) {
    console.log("Error fetching tasks: ", error);
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task data" });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Invalid task data" });
  }
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user.id) {
    await task.remove();
    res.json({ message: "Task removed" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};
