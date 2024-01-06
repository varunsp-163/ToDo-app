import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = async () => {
    if (title && description) {
      const newTodo = {
        title: title,
        description: description,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      try {
        const response = await fetch("http://localhost:3000/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (err) {
        console.log("Couldn't create the new ToDo");
      }

      setTitle("");
      setDescription("");
    } else {
      alert("Please enter both title and description.");
    }
  };

  return (
    <div className="text-center p-2">
      <div className="justify-center pt-3 flex">
        <h1>Input title: </h1>
        <input
          className="border-2 px-2 m-1"
          placeholder="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div className="justify-center py-2 flex">
        <h1>Input Description: </h1>
        <input
          className="border-2 px-2 m-1"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="border-1 p-2 bg-red-400 rounded-md" onClick={addTodo}>
        Add a ToDo
      </button>
    </div>
  );
};

export default Todo;
