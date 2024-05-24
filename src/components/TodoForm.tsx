import React, { Dispatch, SetStateAction, useState } from "react";
import TodoDate from "./TodoDate";

export interface TodoFormProps {
  addTodo: (todo: string, startDate: string, priorityLevel: string) => void;
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  closeModal: () => void;
  setFilterType: Dispatch<
    SetStateAction<"All" | "Today" | "Week" | "Month" | "">
  >;
  setSortIcon: Dispatch<SetStateAction<number>>;
  setSortStatus: Dispatch<
    SetStateAction<"Unsorted" | "Ascending" | "Descending">
  >;
  priorityLevel: string;
  setPriorityLevel: Dispatch<SetStateAction<string>>;
}

const TodoForm: React.FC<TodoFormProps> = ({
  addTodo,
  startDate,
  setStartDate,
  closeModal,
  setFilterType,
  setSortIcon,
  setSortStatus,
  priorityLevel,
  setPriorityLevel,
}) => {
  const [input, setInput] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverOnInput = () => {
    setIsHovered(true);
  };

  const handleHoverOffInput = () => {
    setIsHovered(false);
  };

  const selectedIsLow = () => {
    setPriorityLevel("Low");
  };

  const selectedIsMedium = () => {
    setPriorityLevel("Medium");
  };

  const selectedIsHigh = () => {
    setPriorityLevel("High");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "" || !startDate) {
      return;
    } else {
      addTodo(
        input,
        startDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        priorityLevel
      );
    }

    setInput("");
    setFilterType("All");
    closeModal();
    setSortIcon(0);
    setSortStatus("Unsorted");
    setPriorityLevel("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="What is the task?"
          required
          onMouseEnter={handleHoverOnInput}
          onMouseLeave={handleHoverOffInput}
          className={`text-black bg-[rgb(239,239,239)] caret-black focus:ring-0 focus:border-blue-600 dark:border-[rgb(75,75,75)] dark:text-white dark:bg-[rgb(75,75,75)] dark:focus:border-fuchsia-500 dark:caret-white ${
            isHovered ? "border-blue-600 dark:border-fuchsia-500" : ""
          }`}
        />
      </div>
      <div className="flex items-center justify-start gap-x-2">
        <div className="text-black dark:text-white">Select Date: </div>
        <TodoDate startDate={startDate} setStartDate={setStartDate} />
      </div>
      <div className="flex flex-row items-start justify-start w-full max-w-[340px]">
        <div className="text-black dark:text-white">Priority: </div>
        <div className="flex w-full max-w-[340px] sm:flex-col sm:justify-start sm:items-start sm:max-w-[82px] sm:ml-2 sm:gap-y-2">
          <input
            type="radio"
            id="low-radio"
            name="priority"
            required
            onClick={selectedIsLow}
            className="disable-select absolute w-0 opacity-0 pointer-events-none"
          />
          <label
            htmlFor="low-radio"
            className={`LowBtn disable-select border-green-600 hover:bg-green-600 hover:text-black transition duration 200 ease-in-out ${
              priorityLevel === "Low"
                ? "bg-green-600 text-black"
                : "text-green-600"
            }`}
          >
            Low
          </label>
          <input
            type="radio"
            id="medium-radio"
            name="priority"
            required
            onClick={selectedIsMedium}
            className="disable-select absolute w-0 opacity-0 pointer-events-none"
          />
          <label
            htmlFor="medium-radio"
            className={`MediumBtn disable-select border-yellow-500 hover:bg-yellow-500 hover:text-black transition duration 200 ease-in-out ${
              priorityLevel === "Medium"
                ? "bg-yellow-500 text-black"
                : "text-yellow-500"
            }`}
          >
            Medium
          </label>
          <input
            type="radio"
            id="high-radio"
            name="priority"
            required
            onClick={selectedIsHigh}
            className="disable-select absolute w-0 opacity-0 pointer-events-none"
          />
          <label
            htmlFor="high-radio"
            className={`HighBtn disable-select border-red-500 hover:bg-red-500 hover:text-black transition duration 200 ease-in-out ${
              priorityLevel === "High"
                ? "bg-red-500 text-black"
                : "text-red-500"
            }`}
          >
            High
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="AddTask border-blue-600 bg-blue-600 text-white dark:border-fuchsia-400 dark:bg-fuchsia-400 dark:text-[rgb(55,55,55)] transition duration 200 ease-in-out"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
