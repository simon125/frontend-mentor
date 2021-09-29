const { Router } = require("express");
const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  reorderTodos,
  deleteCompletedTodos,
} = require("../controllers/todos");
const { createTodoCheck } = require("../middlewares/todos");

const router = Router();

router
  .route("/")
  .get(getTodos)
  .post(createTodoCheck, addTodo)
  .put(updateTodo)
  .patch(reorderTodos)
  .delete(deleteCompletedTodos);

router.route("/:id").get(getTodo).delete(deleteTodo);

module.exports = router;
