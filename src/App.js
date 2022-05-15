import React, { Fragment, useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import axios from "axios";
import "./App.scss";

const App = () => {
  let url = "http://jsonplaceholder.typicode.com/users/1/todos";
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState(0);
  useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((result) => {
        let d = result.data;
        setTodos([d[0], d[1], d[2]]);
      })
      .catch((err) => {
        throw err;
      });
  }, [url]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: Math.random(),
        title: input,
      },
    ]);
    setInput("");
  };
  const handleCheck = (element) => {
    let child = element.target;
    child.parentElement.classList.toggle("done");
    let doneTodos = document.querySelectorAll(".done");
    setDone(doneTodos.length);
  };
  const handleRemove = (e, element) => {
    let child = e.target;
    let parent = child.parentElement;
    parent.parentElement.classList.contains("done")
      ? setDone(done - 1)
      : setDone(done);
    const todosAfterRemoval = todos.filter((item) => {
      return item.id !== element.id;
    });
    setTodos(todosAfterRemoval);
  };

  return (
    <Fragment>
      <h3 className="top-header">THINGS TO DO :</h3>
      <hr className="todo-hr" />
      <div className="todo-container">
        <ul className="todo-ul">
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  value="checked"
                  onChange={(e) => handleCheck(e)}
                />
                <span className="todo-span">{todo.title}</span>
                <span className="todo-remove">
                  <VscClose onClick={(e) => handleRemove(e, todo)} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="todo-hr" />
      <h3 className="top-header">Done : {done}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-todo"
          value={input}
          placeholder="Enter new task"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button type="submit" className="submit-todo">
          Add Task
        </button>
      </form>
    </Fragment>
  );
};

export default App;
