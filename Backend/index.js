const express = require("express");
const { createTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const port = 3000;
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Routes
app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "you sent the wrong inputs",
    });
    return;
  }
  // updating mongodb
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find();

  res.json({
    todos,
  });
});

app.post("/completed", async (req, res) => {
  const updatePayload = req.body;

  try {
    const todoId = updatePayload.id; 
    const updatedTodo = await todo.findByIdAndUpdate(
      todoId,
      { completed: true },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({
        msg: "Todo not found",
      });
      return;
    }

    res.json({
      msg: "ToDo marked as completed",
      updatedTodo,
    });
  } catch (error) {
    console.error("Error marking ToDo as completed:", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
