import React, { forwardRef, ButtonHTMLAttributes } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TodoDateProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

interface CustomInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TodoDate: React.FC<TodoDateProps> = ({ startDate, setStartDate }) => {
  const getMonth = (date: Date) => date.getMonth();

  const getYear = (date: Date) => date.getFullYear();

  const range = (start: number, end: number, step: number) => {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, i) => start + i * step);
  };

  const years = range(2010, getYear(new Date()) + 10, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, ...rest }, ref) => {
      const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Prevent the default form submission action
        e.preventDefault();
        
        // If there is an onClick handler, call it
        if (onClick) {
          onClick(e);
        }
      };
  
      return (
        <button onClick={handleClick} ref={ref} {...rest}>
          {value}
        </button>
      );
    }
  );

  return (
    <div className="DatePickerContainer">
      <DatePicker
        renderCustomHeader={({
          date,
          changeMonth,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <header>
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"◄"}
            </button>
            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(parseInt(value))}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
             {"►"}
            </button>
          </header>
        )}
        dateFormat="MMMM d, yyyy"
        customInput={<CustomInput className="SelectDateButton bg-[rgb(35,35,35)] text-white dark:bg-white dark:text-black" value="" />}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        withPortal
        portalId="root-portal"
        todayButton="Click Here To Set Today"
      />
    </div>
  );
};

export default TodoDate;
