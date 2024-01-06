import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center p-2">
      <button
        className="border-1 p-2 bg-red-400 rounded-md"
        onClick={() => navigate("/todos")}
      >
        Check out todo-app
      </button>
    </div>
  );
};

export default Home;
