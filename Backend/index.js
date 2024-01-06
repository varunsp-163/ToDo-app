const express = require("express");
const { createTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

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
  const parsedPayload = updatePayload.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({
      msg: "you sent the wrong inputs",
    });
    return;
  }
  await todo.update(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );
  res.json({
    msg: "ToDo markes as completed ",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
