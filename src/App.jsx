import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import FilterControl from "./components/FilterControl";
import ListItem from "./components/ListItem";
import Checkbox from "./components/Checkbox";
import DeleteBtn from "./components/DeleteBtn";
import { themeState, todoListState } from "./lib/recoil/atoms";
import { todoSelector } from "./lib/recoil/selectors";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [theme, setTheme] = useRecoilState(themeState);
  const filteredTodos = useRecoilValue(todoSelector);

  function handleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function handleSubmit(e) {
    e.preventDefault();

    let nextId = 0;
    const data = new FormData(e.target);

    if (todos.length === 0) {
      nextId = todos.length + 1;
    }

    if (todos.length > 0) {
      let idArray = todos.map((item) => item.id);
      const maxId = idArray.sort((a, b) => a - b).slice(-1);

      nextId = maxId[0] + 1;
    }

    setTodos((oldTodos) => [
      ...oldTodos,
      {
        id: nextId.toString(),
        todo: data.get("todo"),
        completed: data.get("completed") ? true : false,
      },
    ]);

    document.getElementById("todoInput").reset();
  }

  function handleClearCompleted() {
    const updatedTodos = todos.filter((item) => !item.completed);
    setTodos([...updatedTodos]);
  }

  function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result) {
    if (!result.destination) return;

    const items = reorder(todos, result.source.index, result.destination.index);

    setTodos([...items]);
  }

  useEffect(() => {
    const rootElement = document.documentElement;
    theme === "dark"
      ? rootElement.classList.add("dark")
      : rootElement.classList.remove("dark");
  }, [theme]);

  return (
    <div className="App flex min-h-screen w-full justify-center bg-[#e4e5f1] bg-[url('/images/bg-mobile-light.jpg')] bg-contain bg-fixed bg-left-top bg-no-repeat py-10 px-6 font-sans text-sm transition-colors duration-300 ease-in-out dark:bg-[#13131D] dark:bg-[url('/images/bg-mobile-dark.jpg')] md:bg-[url('/images/bg-desktop-light.jpg')] md:dark:bg-[url('/images/bg-desktop-dark.jpg')] lg:py-16 xl:py-28 2xl:py-72">
      <div className="flex w-full flex-col items-center md:w-4/5 lg:w-3/5 xl:w-2/5 2xl:w-1/5">
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-bold tracking-[.5em] text-[#fafafa]">
            TODO
          </h1>
          <button
            type="button"
            onClick={handleTheme}
            className="focus:outline-none"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Header end */}

        {/* Input */}
        <form
          id="todoInput"
          action="#"
          onSubmit={handleSubmit}
          className="mt-7 flex w-full items-center justify-around space-x-3 rounded-md bg-[#fafafa] px-6 py-4 font-bold text-[#484b6a] transition-colors duration-300 ease-in-out dark:bg-[#1E1F30] dark:text-[#9596A9]"
        >
          <div className="relative h-6 w-6 rounded-full border-2 border-[#E6E5EA] dark:border dark:border-[#4D5066]">
            <input
              type="checkbox"
              name="completed"
              id="completed"
              className="peer invisible"
            />
            <label
              htmlFor="completed"
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
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Create a new todo..."
            autoComplete="off"
            required
            className="h-full flex-1 bg-transparent placeholder-[#88878C] focus:outline-none dark:placeholder-[#626475]"
          />
        </form>
        {/* Input end */}

        {/* List */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <ul
                id="listContainer"
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-4 w-full rounded-md bg-[#fafafa] font-bold text-[#484b6a] shadow-lg shadow-[#9394a5] transition-colors duration-300 ease-in-out dark:bg-[#1E1F30] dark:text-[#9596A9] dark:shadow-[#0A0C16]"
              >
                {filteredTodos.length > 0 &&
                  filteredTodos.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={[item.id].toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center space-x-3 border-b px-6 py-4 dark:border-[#4D5066]"
                        >
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
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
                <div className="flex justify-between px-6 py-4 text-[#AEADB5] dark:text-[#6E6881]">
                  <p className="text-sm">
                    {todos.filter((item) => !item.completed).length} items left
                  </p>
                  <div className="hidden place-items-center md:grid">
                    <FilterControl />
                  </div>
                  <button
                    type="button"
                    onClick={handleClearCompleted}
                    className="text-sm text-[#AEADB5] transition-colors duration-300 ease-in-out hover:text-[#181824] dark:text-[#6E6881] dark:hover:text-[#fafafa]"
                  >
                    Clear Completed
                  </button>
                </div>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {/* List end */}

        {/* Filter Control (mobile) */}
        <div className="mt-5 grid w-full place-items-center rounded-md bg-[#fafafa] p-4 text-[#484b6a] shadow-lg transition-colors duration-300 ease-in-out dark:bg-[#1E1F30] md:hidden">
          <FilterControl />
        </div>
        {/* Filter Control end */}

        <p className="mt-10 w-full text-center font-bold text-[#AEADB5] dark:text-[#4F5062]">
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  );
}

export default App;
