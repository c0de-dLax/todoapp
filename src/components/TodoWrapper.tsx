import React, { useState, useEffect } from "react";

import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import EditTodoForm from "./EditTodoForm";
import TodoFilter from "./TodoFilter";

import { v4 as uuidv4 } from "uuid";
uuidv4();

import Popup from "reactjs-popup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  ArrowsUpDownIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import ThemeSwitch from "./ThemeSwitch";

export interface Todo {
  id: string;
  startDate: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
  priorityLevel: string;
  isEditOpened: boolean;
}

export interface ThemeProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const useLocalStorage = (key: string, initialTodos: Todo[]) => {
  const [value, setValue] = useState(() => {
    const storedTodos = localStorage.getItem(key);
    return storedTodos !== null ? JSON.parse(storedTodos) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const TodoWrapper: React.FC = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [toSortTodos, setToSortTodos] = useState<Todo[]>(todos);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [filterType, setFilterType] = useState<
    "Today" | "Week" | "Month" | "All" | ""
  >(todos.length === 0 ? "" : "All");
  const [sortIcon, setSortIcon] = useState(0);
  const [sortStatus, setSortStatus] = useState<
    "Unsorted" | "Ascending" | "Descending"
  >("Unsorted");
  const [priorityLevel, setPriorityLevel] = useState("");
  const initialTheme = localStorage.getItem("themeForTodoApp") || "light";
  const [theme, setTheme] = useState(initialTheme);
  const [addBtnShake, setAddBtnShake] = useState(false);
  const [sortBtnClicked, setSortBtnClicked] = useState(false);

  const addTodo = (todo: string, startDate: string, priorityLevel: string) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        startDate,
        completed: false,
        isEditing: false,
        priorityLevel,
        isEditOpened: false,
      },
    ]);
  };

  useEffect(() => {
    // Set the initial state of todos when the component mounts
    if (todos.length !== toSortTodos.length) {
      setToSortTodos(todos);
    }
  }, [todos]);

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    setToSortTodos(
      toSortTodos.map((todo: Todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
    setToSortTodos(
      toSortTodos.map((todo: Todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (
    task: string,
    id: string,
    startDate: string,
    priorityLevel: string
  ) => {
    setTodos(
      todos.map((todo: Todo) =>
        todo.id === id
          ? {
              ...todo,
              startDate,
              task,
              priorityLevel,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
    setToSortTodos(
      toSortTodos.map((todo: Todo) =>
        todo.id === id
          ? {
              ...todo,
              startDate,
              task,
              priorityLevel,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
    setToSortTodos(toSortTodos.filter((todo: Todo) => todo.id !== id));
  };

  const handleUnsort = () => {
    setSortIcon(0);
    setSortStatus("Unsorted");
  };

  const handleAscendingSort = () => {
    const sortedTodos = [...toSortTodos].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateB - dateA; // Sort ascending by date
    });
    setToSortTodos(sortedTodos);
    setSortIcon(1);
    setSortStatus("Ascending");
  };

  const handleDescendingSort = () => {
    const sortedTodos = [...toSortTodos].sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateA - dateB; // Sort descending by date
    });
    setToSortTodos(sortedTodos);
    setSortIcon(2);
    setSortStatus("Descending");
  };

  const handleSortBtn = () => {
    if (sortIcon === 0) {
      handleAscendingSort();
    } else if (sortIcon === 1) {
      handleDescendingSort();
    } else {
      handleUnsort();
    }
  };

  const btnSortClickedEffect = () => {
    setSortBtnClicked(true);
  };

  const btnSortReleasedEffect = () => {
    setSortBtnClicked(false);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const closeModal = () => {
    setOpenModal(false);
    setPriorityLevel("");
  };

  const onRedirectBtn = () => {
    setAddBtnShake(true);
  };

  const offRedirectBtn = () => {
    setAddBtnShake(false);
  };

  return (
    <main className="w-[100vw] h-[100dvh] bg-[rgb(239,239,239)] dark:bg-[rgb(55,55,55)]">
      <header className="TodoAppHeader bg-white text-black dark:bg-black dark:text-white">
        <h1 className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center gap-x-[10px]">
            <div>// To-Do App</div>
            <div className="flex items-center justify-center w-[calc(28px+2vw)] h-[calc(28px+2vw)] max-w-[44px] max-h-[44px]">
              <img
                alt="Todo App Icon"
                src="images/ToDoAppIcon.webp"
                width="500"
                height="500"
              />
            </div>
          </div>
          <ThemeSwitch theme={theme} setTheme={setTheme} />
        </h1>
      </header>
      <div className="TodoWrapper bg-[rgb(239,239,239)] dark:bg-[rgb(55,55,55)]">
        <div className="CurrentDate text-black bg-white border-white dark:text-white dark:bg-black dark:border-[rgb(140,82,255)]">
          {currentDate}
        </div>
        <aside className="SideBar bg-white border-white dark:bg-black dark:border-[rgb(140,82,255)]">
          <TodoFilter
            filterType={filterType}
            setFilterType={setFilterType}
            todos={todos}
            setSortIcon={setSortIcon}
            setSortStatus={setSortStatus}
          />
          <div className="flex items-center justify-center mt-[40px] max-w-[210px] w-full mx-auto px-1 vertical:mt-0 vertical:max-w-[180px] vertical:justify-end sm:mr-2 sm:ml-auto">
            <div className="SortTaskDates">
              <button
                title={`${
                  sortIcon === 0
                    ? "Click to sort by ascending order"
                    : sortIcon === 1
                    ? "Click to sort by descending order"
                    : "Click to unsort"
                }`}
                aria-label="Click here to sort task"
                className={`${
                  sortStatus === "Ascending" || sortStatus === "Descending"
                    ? "active border-blue-600 bg-blue-600 text-white dark:border-purple-700 dark:bg-purple-700 dark:text-white"
                    : "border-gray-400 bg-[rgb(232,232,232)] text-black dark:border-[rgb(140,82,255)] dark:bg-[rgb(55,55,55)] dark:text-white"
                } ${sortBtnClicked ? "buttonShadow" : ""}`}
                onMouseDown={btnSortClickedEffect}
                onMouseUp={btnSortReleasedEffect}
                onMouseLeave={btnSortReleasedEffect}
                onClick={() => {
                  handleSortBtn();
                }}
              >
                {sortIcon === 0 ? (
                  <ArrowsUpDownIcon />
                ) : sortIcon === 1 ? (
                  <BarsArrowUpIcon />
                ) : (
                  <BarsArrowDownIcon />
                )}
              </button>
            </div>
            <button
              title="Add Task"
              aria-label="Click here to add task"
              className={`AddTodoButton relative ${
                addBtnShake ? "RedirectBtn" : ""
              }`}
              onClick={() => {
                setOpenModal((o: boolean) => !o);
              }}
            >
              <span className="AddTaskBtnText">ADD TASK</span>
              <PlusIcon className="AddIcon" />
            </button>
          </div>
          <Popup
            open={openModal}
            closeOnDocumentClick={false}
            onClose={closeModal}
            className={`${theme === "light" ? "light-popup" : "dark-popup"}`}
          >
            <div className="modal ">
              <XMarkIcon
                className="close text-white rounded-md bg-red-600 dark:text-black dark:bg-white"
                onClick={closeModal}
              />
              <TodoForm
                addTodo={addTodo}
                startDate={startDate}
                setStartDate={setStartDate}
                priorityLevel={priorityLevel}
                setPriorityLevel={setPriorityLevel}
                closeModal={closeModal}
                setFilterType={setFilterType}
                setSortIcon={setSortIcon}
                setSortStatus={setSortStatus}
              />
            </div>
          </Popup>
        </aside>
        <ul className="ListWrapper bg-white border-white dark:bg-black dark:border-[rgb(140,82,255)]">
          <li
            className={`List ${
              theme === "light" ? "ListLightScrollbar" : "ListDarkScrollbar"
            }`}
          >
            {todos.length > 0 ? (
              sortStatus === "Ascending" || sortStatus === "Descending" ? (
                toSortTodos
                  .slice()
                  .reverse()
                  .map((todo: Todo) =>
                    todo.isEditing ? (
                      <EditTodoForm
                        key={todo.id}
                        editTodo={editTask}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        task={todo}
                        priorityLevel={priorityLevel}
                        setPriorityLevel={setPriorityLevel}
                        theme={theme}
                      />
                    ) : (
                      <TodoItem
                        key={todo.id}
                        task={{
                          ...todo,
                          startDate: todo.startDate,
                          priorityLevel: todo.priorityLevel,
                          isEditOpened: todo.isEditOpened,
                        }}
                        setStartDate={setStartDate}
                        toggleComplete={toggleComplete}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                        filterType={filterType}
                        theme={theme}
                      />
                    )
                  )
              ) : sortStatus === "Unsorted" ? (
                todos
                  .slice()
                  .reverse()
                  .map((todo: Todo) =>
                    todo.isEditing ? (
                      <EditTodoForm
                        key={todo.id}
                        editTodo={editTask}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        task={todo}
                        priorityLevel={priorityLevel}
                        setPriorityLevel={setPriorityLevel}
                        theme={theme}
                      />
                    ) : (
                      <TodoItem
                        key={todo.id}
                        task={{
                          ...todo,
                          startDate: todo.startDate,
                          priorityLevel: todo.priorityLevel,
                          isEditOpened: todo.isEditOpened,
                        }}
                        setStartDate={setStartDate}
                        toggleComplete={toggleComplete}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                        filterType={filterType}
                        theme={theme}
                      />
                    )
                  )
              ) : (
                ""
              )
            ) : todos.length === 0 ? (
              <div className="flex flex-col gap-y-10 w-full h-full justify-center items-center overflow-hidden text-2xl text-black dark:text-white sm:gap-y-[18px] sm:text-lg">
                <span>Woooow, so empty....</span>
                {theme === "light" ? (
                  <div className="disable-select max-w-[300px] w-full h-auto ml-[95px] mt-[-10px] vertical:max-w-[240px] sm:w-[140px] sm:ml-[55px]">
                    <img
                      alt="Light Empty List"
                      src="images/LightEmptyList.webp"
                      width="770"
                      height="800"
                    />
                  </div>
                ) : (
                  <div className="disable-select max-w-[300px] w-full h-auto ml-[95px] mt-[-10px] vertical:max-w-[240px] sm:w-[140px] sm:ml-[55px]">
                    <img
                      alt="Dark Empty List"
                      src="images/DarkEmptyList.webp"
                      width="770"
                      height="800"
                    />
                  </div>
                )}
                <span className="text-center">
                  Click the{" "}
                  <span
                    onMouseEnter={onRedirectBtn}
                    onMouseLeave={offRedirectBtn}
                    className="disable-select cursor-help text-[18px] text-white font-[600] bg-[rgb(255,1,60)] rounded-[8px] p-3 shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px] sm:text-[12px] sm:px-[6px] sm:py-[13px]"
                  >
                    <span className="EmptyAddTaskBtn">ADD TASK</span>
                    <PlusIcon className="EmptyPlusIconBtn" />
                  </span>{" "}
                  button now to fill your list!
                </span>
              </div>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </main>
  );
};

export default TodoWrapper;
