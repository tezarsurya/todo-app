import { selector } from "recoil";
import { filterState, todoListState } from "./atoms";

export const todoSelector = selector({
  key: "filteredTodoList",
  get: ({ get }) => {
    const todos = get(todoListState);
    const filter = get(filterState);

    switch (filter) {
      case "Active":
        return todos.filter((item) => !item.completed);
      case "Completed":
        return todos.filter((item) => item.completed);
      default:
        return todos;
    }

    return todos;
  },
});
