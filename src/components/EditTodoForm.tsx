import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import TodoDate from "./TodoDate";

export interface EditTodoFormProps {
  task: {
    id: string;
    task: string;
    startDate: string;
    priorityLevel: string;
    isEditOpened: boolean;
  };
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  editTodo: (
    todo: string,
    id: string,
    startDate: string,
    priorityLevel: string,
    isEditOpened: boolean
  ) => void;
  priorityLevel: string;
  setPriorityLevel: Dispatch<SetStateAction<string>>;
  theme: string;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
  editTodo,
  task,
  startDate,
  setStartDate,
  priorityLevel,
  setPriorityLevel,
}) => {
  const [input, setInput] = useState<string>(task.task);
  const [editPriorityLevel, setEditPriorityLevel] = useState<string>(
    task.priorityLevel
  );
  const [editTodoDate, setEditTodoDate] = useState<string>(task.startDate);

  const reverseDateString = new Date(Date.parse(editTodoDate));

  useEffect(() => {
    setStartDate(reverseDateString);
  }, []);

  const selectedIsLow = () => {
    setPriorityLevel("Low");
    setEditPriorityLevel("Low");
  };

  const selectedIsMedium = () => {
    setPriorityLevel("Medium");
    setEditPriorityLevel("Medium");
  };

  const selectedIsHigh = () => {
    setPriorityLevel("High");
    setEditPriorityLevel("High");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === "" || !startDate) {
      return;
    } else {
      editTodo(
        input,
        task.id,
        startDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        `${priorityLevel === "" ? task.priorityLevel : priorityLevel}`,
        (task.isEditOpened = true),
      );
    }

    setInput("");
    setPriorityLevel("");
    setEditTodoDate("");
  };

  return (
    <section>
      <div className="EditTodoFormOverlay" />
      <form
        className="EditTodoForm bg-[rgb(239,239,239)] text-black dark:bg-[rgb(55,55,55)] dark:text-white dark:border-[rgb(140,82,255)]"
        onSubmit={handleSubmit}
      >
        <div
          className={`absolute top-0 left-0 w-[6px] h-full ${
            editPriorityLevel === "Low"
              ? "bg-green-500"
              : editPriorityLevel === "Medium"
              ? "bg-yellow-500"
              : editPriorityLevel === "High"
              ? "bg-red-500"
              : ""
          }`}
        />
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="What is the task?"
            required
            className="text-black border-white focus:ring-0 focus:border-blue-600 dark:focus:border-fuchsia-400"
          />
        </div>
        <div className="flex items-center justify-start gap-x-2">
          <div className="text-black dark:text-white">Select Date: </div>
          <TodoDate
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </div>
        <div className="flex items-center justify-center w-full max-w-[340px]">
          <div className="text-black dark:text-white">Priority</div>
          <button
            type="button"
            onClick={selectedIsLow}
            className={`LowBtn border-2 rounded border-green-600 hover:bg-green-600 hover:text-black transition duration 200 ease-in-out ${
              editPriorityLevel === "Low"
                ? "bg-green-600 text-black"
                : "text-green-600"
            }`}
          >
            Low
          </button>
          <button
            type="button"
            onClick={selectedIsMedium}
            className={`MediumBtn border-2 rounded border-yellow-500 hover:bg-yellow-500 hover:text-black transition duration 200 ease-in-out ${
              editPriorityLevel === "Medium"
                ? "bg-yellow-500 text-black"
                : "text-yellow-500"
            }`}
          >
            Medium
          </button>
          <button
            type="button"
            onClick={selectedIsHigh}
            className={`HighBtn border-2 rounded border-red-500 hover:bg-red-500 hover:text-black transition duration 200 ease-in-out ${
              editPriorityLevel === "High"
                ? "bg-red-500 text-black"
                : "text-red-500"
            }`}
          >
            High
          </button>
        </div>
        <button
          type="submit"
          className="UpdateTask border-blue-600 bg-blue-600 text-white dark:border-fuchsia-400 dark:bg-fuchsia-400 dark:text-[rgb(55,55,55)] transition duration 200 ease-in-out"
        >
          Update
        </button>
      </form>
    </section>
  );
};

export default EditTodoForm;
