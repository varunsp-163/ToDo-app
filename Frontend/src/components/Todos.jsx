import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  const getAllTodos = async () => {
    try {
      const responseData = await fetch("http://localhost:3000/todos");

      if (!responseData.ok) {
        throw new Error(`HTTP error! Status: ${responseData.status}`);
      }

      const data = await responseData.json();
      console.log("data :", data.todos);
      setTodos(data.todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  return (
    <div className="text-center p-2">
      <div className="text-center">
        {todos.length > 0 ? (
          todos.map((e, index) => (
            <div key={index} className="border-2 rounded-lg bg-gray-500">
              <h1>{e.title}</h1>
              <p>{e.description}</p>
              <p>{e.completed ? "Completed" : "Incomplete"}</p>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>
      <button
        className="border-1 p-2 bg-red-400 mx-3 rounded-md"
        onClick={getAllTodos}
      >
        Checkout all todos
      </button>
      <button
        className="border-1 p-2 bg-red-400 rounded-md"
        onClick={() => navigate("/createTodo")}
      >
        Create todos
      </button>
    </div>
  );
};

export default Todos;
