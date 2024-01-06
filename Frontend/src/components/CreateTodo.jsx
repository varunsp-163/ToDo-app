const Todo = () => {
  return (
    <div className="text-center p-2">
      <div className="justify-center pt-3 flex">
        <h1>Input title: </h1>
        <input
          className="border-2 px-2 m-1"
          placeholder="title"
          type="text"
          name=""
          id=""
        />
      </div>
      <br />
      <div className="justify-center py-2 flex">
        <h1>Input Description: </h1>
        <input
          className="border-2 px-2 m-1"
          placeholder="Description"
          type="text"
          name=""
          id=""
        />
      </div>
      <button className="border-1 p-2 bg-red-400 rounded-md">Add a ToDo</button>
    </div>
  );
};

export default Todo;
