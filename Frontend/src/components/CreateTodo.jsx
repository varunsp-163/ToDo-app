import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTodo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const addTodo = async () => {
    if (title && description) {
      const newTodo = {
        title,
        description,
        completed: false,
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/todo`,
          newTodo
        );
        if (response.status === 200) {
          navigate("/todos");
          setTodos([...todos, newTodo]);
          setTitle("");
          setDescription("");
          toast.success("Todo added successfully!");
        }
      } catch (err) {
        console.error("Error creating the new ToDo:", err);
        toast.error("Failed to create a new ToDo. Please try again.");
      }
    } else {
      toast.warn("Please enter both title and description.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer />
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Add a New Todo</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          onClick={addTodo}
        >
          Add ToDo
        </button>
        <button
          className="w-full mt-3 max-w-[100px] bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
