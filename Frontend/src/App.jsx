import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="/createTodo" element={<CreateTodo />} />
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
