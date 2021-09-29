const Todo = require("../models/Todo");
const { validationResult } = require("express-validator");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ order: "asc" }).lean();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "There is an issue with server!" });
  }
};

exports.getTodo = async (req, res) => {
  res.status(200).json({ msg: "get todo" });
};

exports.addTodo = async (req, res) => {
  const data = req.body.data;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const todo = await Todo.create(data);

    return res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

exports.updateTodo = async (req, res) => {
  const up = { active: req.body.data.active };
  const data = await Todo.findOneAndUpdate({ _id: req.body.data._id }, up, {
    new: true,
  }).lean();

  res.status(200).json(data);
};

exports.reorderTodos = async (req, res) => {
  const newIndex = req.body.data.newIndex;
  const oldIndex = req.body.data.oldIndex;

  const todos = await Todo.find().lean();

  let newState = [];

  if (oldIndex > newIndex) {
    newState = todos.map((todo) => {
      if (todo.order >= newIndex && todo.order < oldIndex) {
        todo.order = todo.order + 1;
      } else if (todo.order === oldIndex) {
        todo.order = newIndex;
      }
      return todo;
    });

    newState.sort((a, b) => a.order - b.order);
  } else {
    newState = todos.map((todo) => {
      if (todo.order > oldIndex && todo.order <= newIndex) {
        todo.order = todo.order - 1;
      } else if (todo.order === oldIndex) {
        todo.order = newIndex;
      }
      return todo;
    });

    newState.sort((a, b) => a.order - b.order);
  }

  const temp = newState.map((todoToUpdate) => {
    return {
      updateOne: {
        filter: { _id: todoToUpdate._id },
        update: { order: todoToUpdate.order },
      },
    };
  });

  const resp = await Todo.bulkWrite(temp);

  res.status(200).json(resp);
};

exports.deleteTodo = async (req, res) => {
  const params = req.params;

  try {
    const todoToDelete = await Todo.findOne({ _id: req.params.id }).lean();

    const todosToUpdate = await Todo.find({
      order: { $gt: todoToDelete.order },
    }).lean();

    const bulkArr = todosToUpdate.map((todoToUpdate) => {
      return {
        updateOne: {
          filter: { _id: todoToUpdate._id },
          update: { order: todoToUpdate.order - 1 },
        },
      };
    });

    bulkArr.unshift({
      deleteOne: {
        filter: { _id: req.params.id },
      },
    });

    await Todo.bulkWrite(bulkArr);

    return res.status(200).json({ msg: "cool" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

exports.deleteCompletedTodos = async (req, res) => {
  try {
    const todosToDelete = await Todo.find({ active: true }).lean();

    const todosToUpdate = await Todo.find({
      active: false,
    })
      .sort({ order: "asc" })
      .lean();

    const bulkArr1 = [];
    const bulkArr2 = [];

    todosToDelete.forEach((todoTodelete) => {
      bulkArr1.push({
        deleteOne: {
          filter: { _id: todoTodelete._id },
        },
      });
    });

    todosToUpdate.forEach((todoToUpdate, index) => {
      bulkArr2.push({
        updateOne: {
          filter: { _id: todoToUpdate._id },
          update: { order: index },
        },
      });
    });

    await Todo.bulkWrite(bulkArr1);
    await Todo.bulkWrite(bulkArr2);

    return res.status(200).json({ msg: "cool" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
