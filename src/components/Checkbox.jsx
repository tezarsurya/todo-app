import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../lib/recoil/atoms";

function Checkbox({ name, id }) {
  const [todos, setTodos] = useRecoilState(todoListState);
  let currentTodo = todos.filter((item) => item.id === id);
  let currentTodoIndex = todos.indexOf(currentTodo[0]);

  function handleChange() {
    const newTodo = { ...currentTodo[0], completed: !currentTodo[0].completed };
    let updatedTodos = [...todos];
    updatedTodos.splice(currentTodoIndex, 1, newTodo);
    setTodos([...updatedTodos]);
  }

  return (
    <div className="relative h-6 w-6 rounded-full border-2 border-[#E6E5EA] dark:border dark:border-[#4D5066]">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="peer invisible"
        onChange={handleChange}
        checked={currentTodo[0].completed}
      />
      <label
        htmlFor={id}
        className="absolute inset-0 grid h-full w-full cursor-pointer place-items-center rounded-full opacity-0 transition-all duration-300 ease-in-out peer-checked:bg-gradient-to-br peer-checked:from-[#57ddff] peer-checked:to-[#c058f3] peer-checked:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </label>
    </div>
  );
}

export default Checkbox;
