import { atom } from "recoil";

export const todoListState = atom({
  key: "todoList",
  default: [],
  effects: [
    ({ onSet, setSelf }) => {
      const savedTodos = localStorage.getItem("todos");

      setSelf(savedTodos ? JSON.parse(savedTodos) : []);

      onSet((newValue) => {
        localStorage.setItem("todos", JSON.stringify([...newValue]));
      });
    },
  ],
});

export const filterState = atom({
  key: "todoFilter",
  default: "All",
  effects: [
    ({ onSet, setSelf }) => {
      const savedFilter = localStorage.getItem("currentFilter");

      setSelf(savedFilter ? savedFilter : "All");

      onSet((newValue) => {
        localStorage.setItem("currentFilter", newValue);
      });
    },
  ],
});

export const themeState = atom({
  key: "currentTheme",
  default: "light",
  effects: [
    ({ onSet, setSelf }) => {
      const activeTheme = localStorage.getItem("theme");

      setSelf(activeTheme ? activeTheme : "light");

      onSet((newValue) => {
        localStorage.setItem("theme", newValue);
      });
    },
  ],
});
