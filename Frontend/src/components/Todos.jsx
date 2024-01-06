import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState("");

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

  const markCompleted = async () => {
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.log("The error:", err);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="text-center p-2">
      <div className="text-center">
        {todos.length > 0 ? (
          todos.map((e, index) => (
            <div key={index} className="border-2 rounded-lg bg-gray-300">
              <h1>{e.title}</h1>
              <p>{e.description}</p>
              <p
                className={
                  e.completed ? "text-green-600 font-bold" : "text-red-500"
                }
              >
                {e.completed ? "Completed" : "Incomplete"}
              </p>
            </div>
          ))
        ) : (
          <p>No todos available</p>
        )}
      </div>
      <button
        className="border-1 p-2 my-4 bg-red-400 rounded-md"
        onClick={() => navigate("/createTodo")}
      >
        Create todos
      </button>
      <div>
        <input
          type="text"
          name=""
          placeholder="Enter the ID"
          className="border-2 px-2 m-2"
          id=""
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={() => markCompleted()}>Make as completed</button>
      </div>
    </div>
  );
};

export default Todos;
