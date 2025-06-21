const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const taskController = require("../controllers/tasks");
router.post(
  "/tasks",
  [body("title").notEmpty().withMessage("title is required"),
  body("description")
    .isLength({ max: 200 })
    .withMessage("description should be atmost 200 characters")],
  taskController.createTask
);
router.get("/tasks", taskController.getTasks);
router.get("/tasks/:id", taskController.getTask);
router.put("/tasks/:id", taskController.changeTask);
router.delete("/tasks/:id", taskController.deleteTask);
module.exports = router;
