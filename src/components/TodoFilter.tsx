import React, { useState, Dispatch, SetStateAction } from "react";
import { Todo } from "./TodoWrapper";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export interface TodoFilterProps {
  filterType: string;
  setFilterType: Dispatch<
    SetStateAction<"All" | "Today" | "Week" | "Month" | "">
  >;
  todos: Todo[];
  setSortIcon: Dispatch<SetStateAction<number>>;
  setSortStatus: Dispatch<
    SetStateAction<"Unsorted" | "Ascending" | "Descending">
  >;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  filterType,
  setFilterType,
  todos,
  setSortIcon,
  setSortStatus,
}) => {
  const [allBtnClicked, setAllBtnClicked] = useState(false);
  const [todayBtnClicked, setTodayBtnClicked] = useState(false);
  const [weekBtnClicked, setWeekBtnClicked] = useState(false);
  const [monthBtnClicked, setMonthBtnClicked] = useState(false);
  const [filterMenu, setFilterMenu] = useState(false);

  // Counts how many tasks per filtertype and displays it beside the respective filter type
  const countTasksByFilter = (filterCount: string) => {
    return todos.filter((todo: Todo) => {
      const currentDate = new Date();
      const taskDate = new Date(todo.startDate);

      switch (filterCount) {
        case "Today":
          return (
            taskDate.getDate() === currentDate.getDate() &&
            taskDate.getMonth() === currentDate.getMonth() &&
            taskDate.getFullYear() === currentDate.getFullYear()
          );
        case "Week":
          const startOfWeek = new Date(currentDate);
          startOfWeek.setHours(0, 0, 0, 0);
          startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

          const endOfWeek = new Date(currentDate);
          endOfWeek.setHours(23, 59, 59, 999);
          endOfWeek.setDate(startOfWeek.getDate() + 6);

          return (
            taskDate >= startOfWeek &&
            taskDate <= endOfWeek &&
            taskDate.getFullYear() === currentDate.getFullYear()
          );
        case "Month":
          const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          startOfMonth.setHours(0, 0, 0, 0);

          const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          );
          endOfMonth.setHours(23, 59, 59, 999);

          return (
            taskDate >= startOfMonth &&
            taskDate <= endOfMonth &&
            taskDate.getFullYear() === currentDate.getFullYear() &&
            taskDate.getMonth() === currentDate.getMonth()
          );
        default:
          return true;
      }
    }).length;
  };

  const allBtnPress = () => {
    setAllBtnClicked(true);
  };

  const allBtnRelease = () => {
    setAllBtnClicked(false);
  };

  const todayBtnPress = () => {
    setTodayBtnClicked(true);
  };

  const todayBtnRelease = () => {
    setTodayBtnClicked(false);
  };

  const weekBtnPress = () => {
    setWeekBtnClicked(true);
  };

  const weekBtnRelease = () => {
    setWeekBtnClicked(false);
  };

  const monthBtnPress = () => {
    setMonthBtnClicked(true);
  };

  const monthBtnRelease = () => {
    setMonthBtnClicked(false);
  };

  const toggleFilterMenu = () => {
    setFilterMenu(prevState => !prevState);
  };

  return (
    <section className="FilterTask text-white">
      <div
        className={`FilterAllContainer ${filterType === "All" ? "active" : ""}`}
      >
        <button
          title="Display all task"
          aria-label="Click here to display all task"
          onClick={() => {
            setFilterType("All");
            setSortIcon(0);
            setSortStatus("Unsorted");
          }}
          onMouseDown={allBtnPress}
          onMouseUp={allBtnRelease}
          onMouseLeave={allBtnRelease}
          onTouchStart={allBtnPress}
          onTouchEnd={allBtnRelease}
          onTouchMove={allBtnRelease}
          className={`AllFilter bg-[rgb(232,232,232)] text-black dark:bg-[rgb(55,55,55)] dark:text-white transition duration 100 ease-out ${
            filterType === "All" &&
            todos.length !== 0 &&
            countTasksByFilter("All") !== 0
              ? "text-white bg-blue-500 dark:bg-purple-700"
              : ""
          } ${allBtnClicked ? "scale-[0.96]" : "scale-100"}`}
        >
          ALL
        </button>
        <div
          className={`AllFilterCount disable-select ${
            filterType === "All" && todos.length > 0
              ? "activenum text-blue-700 dark:text-purple-400"
              : todos.length === 0
              ? "inactivenum"
              : "text-black dark:text-white"
          }`}
        >
          {todos.length ? todos.length : null}
        </div>
      </div>
      <div
        className={`FilterTodayContainer ${
          filterType === "Today" ? "active" : ""
        }`}
      >
        <button
          title="Display today's task"
          aria-label="Click to display today's task"
          onClick={() => {
            setFilterType("Today");
            setSortIcon(0);
            setSortStatus("Unsorted");
          }}
          onMouseDown={todayBtnPress}
          onMouseUp={todayBtnRelease}
          onMouseLeave={todayBtnRelease}
          onTouchStart={todayBtnPress}
          onTouchEnd={todayBtnRelease}
          onTouchMove={todayBtnRelease}
          className={`TodayFilter bg-[rgb(232,232,232)] text-black dark:bg-[rgb(55,55,55)] dark:text-white transition duration 100 ease-out ${
            filterType === "Today" &&
            todos.length !== 0 &&
            countTasksByFilter("Today") !== 0
              ? "text-white bg-blue-600 dark:bg-purple-700"
              : ""
          } ${todayBtnClicked ? "scale-[0.96]" : "scale-100"}`}
        >
          TODAY
        </button>
        <div
          className={`TodayFilterCount disable-select ${
            filterType === "Today" && countTasksByFilter("Today") > 0
              ? "activenum text-blue-700 dark:text-purple-400"
              : countTasksByFilter("Today") === 0
              ? "inactivenum"
              : "text-black dark:text-white"
          }`}
        >
          {countTasksByFilter("Today") ? countTasksByFilter("Today") : null}
        </div>
      </div>
      <div
        className={`FilterWeekContainer  ${
          filterType === "Week" ? "active" : ""
        }`}
      >
        <button
          title="Display this week's task"
          aria-label="Click here to display this week's task"
          onClick={() => {
            setFilterType("Week");
            setSortIcon(0);
            setSortStatus("Unsorted");
          }}
          onMouseDown={weekBtnPress}
          onMouseUp={weekBtnRelease}
          onMouseLeave={weekBtnRelease}
          onTouchStart={weekBtnPress}
          onTouchEnd={weekBtnRelease}
          onTouchMove={weekBtnRelease}
          className={`WeekFilter bg-[rgb(232,232,232)] text-black dark:bg-[rgb(55,55,55)] dark:text-white transition duration 100 ease-out ${
            filterType === "Week" &&
            todos.length !== 0 &&
            countTasksByFilter("Week") !== 0
              ? "text-white bg-blue-600 dark:bg-purple-700"
              : ""
          } ${weekBtnClicked ? "scale-[0.96]" : "scale-100"}`}
        >
          This WEEK
        </button>
        <div
          className={`WeekFilterCount disable-select ${
            filterType === "Week" && countTasksByFilter("Week") > 0
              ? "activenum text-blue-700 dark:text-purple-400"
              : countTasksByFilter("Week") === 0
              ? "inactivenum"
              : "text-black dark:text-white"
          }`}
        >
          {countTasksByFilter("Week") ? countTasksByFilter("Week") : null}
        </div>
      </div>
      <div
        className={`FilterMonthContainer ${
          filterType === "Month" ? "active" : ""
        }`}
      >
        <button
          title="Display this month's task"
          aria-label="Click here to display this month's task"
          onClick={() => {
            setFilterType("Month");
            setSortIcon(0);
            setSortStatus("Unsorted");
          }}
          onMouseDown={monthBtnPress}
          onMouseUp={monthBtnRelease}
          onMouseLeave={monthBtnRelease}
          onTouchStart={monthBtnPress}
          onTouchEnd={monthBtnRelease}
          onTouchMove={monthBtnRelease}
          className={`MonthFilter bg-[rgb(232,232,232)] text-black dark:bg-[rgb(55,55,55)] dark:text-white transition duration 100 ease-out ${
            filterType === "Month" &&
            todos.length !== 0 &&
            countTasksByFilter("Month") !== 0
              ? "text-white bg-blue-500 dark:bg-purple-700"
              : ""
          } ${monthBtnClicked ? "scale-[0.96]" : "scale-100"}`}
        >
          This MONTH
        </button>
        <div
          className={`MonthFilterCount disable-select ${
            filterType === "Month" && countTasksByFilter("Month") > 0
              ? "activenum text-blue-700 dark:text-purple-400"
              : countTasksByFilter("Month") === 0
              ? "inactivenum"
              : "text-black dark:text-white"
          }`}
        >
          {countTasksByFilter("Month") ? countTasksByFilter("Month") : null}
        </div>
      </div>
      <div className={`FilterMenu`}>
        <button
          onClick={() => {
            toggleFilterMenu();
          }}
          className="FilterMenuBtn bg-[rgb(232,232,232)] text-black dark:bg-[rgb(55,55,55)] dark:text-white transition duration 100 ease-out"
        >
          <span>
            <ChevronUpIcon className="w-[16px] ml-1.5" />
          </span>
          <span className="font-[500] border-r-[1px] pr-2 border-black dark:border-white"> 
            {filterType === "All"
              ? "ALL"
              : filterType === "Today"
              ? "TODAY"
              : filterType === "Week"
              ? "This Week"
              : filterType === "Month"
              ? "This MONTH"
              : "FILTER"}
          </span>
          <span>
            {filterType === "All"
              ? countTasksByFilter("All")
              : filterType === "Today"
              ? countTasksByFilter("Today")
              : filterType === "Week"
              ? countTasksByFilter("Week")
              : filterType === "Month"
              ? countTasksByFilter("Month")
              : "Count"}
          </span>
        </button>
        <div
          className={`bg-white text-black dark:bg-[rgb(55,55,55)] dark:text-white transition duration 100 ease-out ${
            filterMenu === true ? "FilterMenuContent" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              setFilterType("All");
              setFilterMenu(false);
            }}
            className={`${
              filterType === "All"
                ? "text-white bg-blue-600 dark:bg-purple-700"
                : ""
            }`}
          >
            <span
              className={`font-[500] border-r-[1px] pr-2 mr-2 dark:border-white ${
                filterType === "All" ? "border-white" : "border-black"
              }`}
            >
              ALL
            </span>
            {countTasksByFilter("All")}
          </button>
          <button
            onClick={() => {
              setFilterType("Today");
              setFilterMenu(false);
            }}
            className={`${
              filterType === "Today"
                ? "text-white bg-blue-600 dark:bg-purple-700"
                : ""
            }`}
          >
            <span
              className={`font-[500] border-r-[1px] pr-2 mr-2 dark:border-white ${
                filterType === "Today" ? "border-white" : "border-black"
              }`}
            >
              TODAY
            </span>
            {countTasksByFilter("Today")}
          </button>
          <button
            onClick={() => {
              setFilterType("Week");
              setFilterMenu(false);
            }}
            className={`${
              filterType === "Week"
                ? "text-white bg-blue-600 dark:bg-purple-700"
                : ""
            }`}
          >
            This&nbsp;
            <span
              className={`font-[500] border-r-[1px] pr-2 mr-2 dark:border-white ${
                filterType === "Week" ? "border-white" : "border-black"
              }`}
            >
              WEEK
            </span>
            {countTasksByFilter("Week")}
          </button>
          <button
            onClick={() => {
              setFilterType("Month");
              setFilterMenu(false);
            }}
            className={`${
              filterType === "Month"
                ? "text-white bg-blue-600 dark:bg-purple-700"
                : ""
            }`}
          >
            This&nbsp;
            <span
              className={`font-[500] border-r-[1px] pr-2 mr-2 dark:border-white ${
                filterType === "Month" ? "border-white" : "border-black"
              }`}
            >
              MONTH
            </span>
            {countTasksByFilter("Month")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodoFilter;
