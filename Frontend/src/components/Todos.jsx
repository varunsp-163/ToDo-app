import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState("");

  const getAllTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/todos`
      );
      setTodos(response.data.todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const markCompleted = async () => {
    if (!id) return alert("Please enter a valid ID.");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/completed`,
        { id }
      );
      if (response.status === 200) {
        alert("Todo marked as completed!");
        setId("");
        getAllTodos();
      }
    } catch (err) {
      console.error("Error marking todo as completed:", err);
      alert("Failed to mark as completed. Please try again.");
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Todos List</h1>
        <div className="grid gap-4 mb-6 max-h-[50vh] overflow-scroll">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div
                key={index}
                className="border p-4  rounded-lg bg-gray-50 hover:shadow-md transition "
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {todo.title}
                </h2>
                <p className="text-sm text-gray-600">ID: {todo._id}</p>
                <p className="mt-2 text-gray-700">{todo.description}</p>
                <p
                  className={
                    todo.completed
                      ? "text-green-600 font-semibold mt-2"
                      : "text-red-500 font-semibold mt-2"
                  }
                >
                  {todo.completed ? "Completed" : "Incomplete"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No todos available</p>
          )}
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            onClick={() => navigate("/createTodo")}
          >
            Create Todo
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Mark Todo as Completed
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter the ID"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              onClick={markCompleted}
            >
              Mark as Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
