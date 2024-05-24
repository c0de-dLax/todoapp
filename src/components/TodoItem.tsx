import React, {
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

interface TodoProps {
  task: {
    id: string;
    startDate: string;
    task: string;
    completed: boolean;
    priorityLevel: string;
    isEditOpened: boolean;
  };
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string) => void;
  filterType: "Today" | "Week" | "Month" | "All" | ""; // Add filterType prop
  theme: string;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
}

const usePointerScroll = (ref: React.RefObject<HTMLElement>) => {
  const isDrag = useRef(false);

  const dragStart = () => {
    isDrag.current = true;
  };

  const dragEnd = () => {
    isDrag.current = false;
  };

  const drag = (ev: PointerEvent) => {
    if (isDrag.current && ref.current) {
      ref.current.scrollLeft -= ev.movementX;
    }
  };

  useEffect(() => {
    const elem = ref.current;

    if (elem) {
      elem.addEventListener("pointerdown", dragStart);
      document.addEventListener("pointerup", dragEnd);
      document.addEventListener("pointermove", drag);

      return () => {
        elem.removeEventListener("pointerdown", dragStart);
        document.removeEventListener("pointerup", dragEnd);
        document.removeEventListener("pointermove", drag);
      };
    }
  }, [ref, dragStart, dragEnd, drag]);
};

const TodoItem: React.FC<TodoProps> = ({
  task,
  toggleComplete,
  editTodo,
  deleteTodo,
  filterType, // Retrieve filterType from props
  // theme,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleOverTodoItem = () => {
    setIsHovered(true);
  };

  const handleNotOverTodoItem = () => {
    setIsHovered(false);
  };

  const paragraphRef = useRef<HTMLParagraphElement>(null);
  usePointerScroll(paragraphRef);

  // Filter task based on filterType
  const showTodo = () => {
    const currentDate = new Date();
    const taskDate = new Date(task.startDate);

    switch (filterType) {
      case "Today":
        return (
          taskDate.getDate() === currentDate.getDate() &&
          taskDate.getMonth() === currentDate.getMonth() &&
          taskDate.getFullYear() === currentDate.getFullYear()
        );
      case "Week":
        // Get start of current week (Sunday 00:00am)
        const startOfWeek = new Date(currentDate);
        startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Move back to Sunday of the current week

        // Get end of current week (Saturday 11:59:59 pm)
        const endOfWeek = new Date(currentDate);
        endOfWeek.setHours(23, 59, 59, 999); // Set time to end of day
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Move forward to Saturday of the current week

        return (
          taskDate >= startOfWeek &&
          taskDate <= endOfWeek &&
          taskDate.getFullYear() === currentDate.getFullYear()
        );
      case "Month":
        // Get start of current month (first day at 00:00am)
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        startOfMonth.setHours(0, 0, 0, 0); // Set time to midnight

        // Get end of current month (last day at 11:59:59 pm)
        const endOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        endOfMonth.setHours(23, 59, 59, 999); // Set time to end of day

        return (
          taskDate >= startOfMonth &&
          taskDate <= endOfMonth &&
          taskDate.getFullYear() === currentDate.getFullYear() &&
          taskDate.getMonth() === currentDate.getMonth()
        );
      default:
        return filterType === "All";
    }
  };

  // ${
  //   theme === "light" && !isSorted ? "TodoLightFlash" : ""
  // } ${theme !== "light" && !isSorted ? "TodoDarkFlash" : ""}

  if (showTodo()) {
    return (
      <section
        onMouseEnter={handleOverTodoItem}
        onMouseLeave={handleNotOverTodoItem}
        className={`TodoItem bg-[rgb(235,235,235)] text-black dark:bg-[rgb(55,55,55)] dark:text-white ${
          isHovered
            ? "transition duration-200 scale-[101%] shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px]"
            : "transition duration-200 scale-[100%]"
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-[6px] h-full ${
            task.priorityLevel === "Low"
              ? "bg-green-500"
              : task.priorityLevel === "Medium"
              ? "bg-yellow-500"
              : task.priorityLevel === "High"
              ? "bg-red-500"
              : ""
          }`}
        />
        <input
          className="checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <p
          ref={paragraphRef}
          className={`${
            task.completed
              ? "TodoDone text-gray-500 dark:text-gray-400 scroll disable-select"
              : "TodoActive text-black dark:text-white scroll disable-select"
          }`}
        >
          {task.task}
        </p>
        <p
          className={`${
            task.completed
              ? "TodoDateDone text-gray-500 dark:text-gray-400"
              : "TodoDateActive text-black dark:text-white "
          }`}
        >
          {task.startDate.replace(/,\s\d{4}$/, "")}
        </p>
        <p
          className={`${
            task.completed
              ? "TodoIconsDone text-gray-500 dark:text-gray-400"
              : "TodoIconsActive text-black dark:text-white"
          }`}
        >
          <PencilSquareIcon
            title="Edit Task"
            onClick={() => {
              editTodo(task.id);
              setIsHovered(false);
            }}
            className="editIcon"
          />
          <TrashIcon
            title="Delete Task"
            onClick={() => deleteTodo(task.id)}
            className="deleteIcon"
          />
        </p>
      </section>
    );
  } else {
    null;
  }
};

export default TodoItem;
