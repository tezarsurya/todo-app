import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../lib/recoil/atoms";

function DeleteBtn({ id }) {
  const [todos, setTodos] = useRecoilState(todoListState);
  let currentTodo = todos.filter((item) => item.id === id);
  let currentTodoIndex = todos.indexOf(currentTodo[0]);

  function handleDelete() {
    let updatedTodos = [...todos];
    updatedTodos.splice(currentTodoIndex, 1);
    setTodos([...updatedTodos]);
  }

  return (
    <button type="button" onClick={handleDelete}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path
          fill="#494C6B"
          fillRule="evenodd"
          d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
        />
      </svg>
    </button>
  );
}

export default DeleteBtn;
