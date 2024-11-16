const express = require("express");
const { login, register } = require("../controllers/userController");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/tasks", protect, getTasks);
router.post("/task", protect, createTask);
router.put("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

module.exports = router;
