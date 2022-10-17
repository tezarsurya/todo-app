import React from "react";
import Checkbox from "./Checkbox";
import DeleteBtn from "./DeleteBtn";

function ListItem({ item, ...props }) {
  return (
    <li className="flex items-center space-x-3 border-b px-6 py-4 dark:border-[#4D5066]">
      <Checkbox name={item.id} id={item.id} />
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          item.completed
            ? "text-[#9394a5] line-through dark:text-[#6E6881]"
            : ""
        }`}
      >
        {item.todo}
      </div>
      <DeleteBtn id={item.id} />
    </li>
  );
}

export default ListItem;
