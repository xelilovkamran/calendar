import { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  addWeeks,
  subWeeks,
} from "date-fns";
import type { Task, Holiday, DayCell } from "../../types";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../TaskList";
import TaskModal from "../TaskModal";
import * as S from "./styles";

interface TasksState {
  [date: string]: Task[];
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<DayCell[]>([]);
  const [view, setView] = useState<"month" | "week">("month");
  const [tasks, setTasks] = useState<TasksState>(() => {
    const savedTasks = localStorage.getItem("calendar-tasks");
    return savedTasks ? JSON.parse(savedTasks) : {};
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<{
    task: Task;
    sourceDate: string;
  } | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    localStorage.setItem("calendar-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    let start, end;

    if (view === "month") {
      // Get the first day of the month
      start = startOfMonth(currentDate);
      // Get the start of the week containing the first day
      start = startOfWeek(start);
      // Get the end of the month
      end = endOfMonth(currentDate);
      // Get the end of the week containing the last day
      end = endOfWeek(end);
    } else {
      start = startOfWeek(currentDate);
      end = endOfWeek(currentDate);
    }

    const daysInInterval = eachDayOfInterval({ start, end });

    const initialDays: DayCell[] = daysInInterval.map((date) => ({
      date: format(date, "yyyy-MM-dd"),
      tasks: [],
      holidays: [],
    }));

    setDays(initialDays);
    fetchHolidays(format(currentDate, "yyyy"));
  }, [currentDate, view]);

  useEffect(() => {
    console.log("Days state updated:", days);
  }, [days]);

  const handlePrevPeriod = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const handleNextPeriod = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const handleViewChange = (newView: "month" | "week") => {
    setView(newView);
    // Reset to start of current week when switching to week view
    if (newView === "week") {
      setCurrentDate(startOfWeek(currentDate));
    }
  };

  const fetchHolidays = async (year: string) => {
    try {
      console.log("Fetching holidays for year:", year);
      const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/US`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch holidays");
      }
      const holidays: Holiday[] = await response.json();
      console.log("Fetched holidays:", holidays);

      setDays((prevDays) => {
        const newDays = prevDays.map((day) => {
          const dayHolidays = holidays.filter(
            (holiday) => holiday.date === day.date
          );
          console.log(`Holidays for ${day.date}:`, dayHolidays);
          return {
            ...day,
            holidays: dayHolidays,
          };
        });
        return newDays;
      });
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const handleAddTask = (text: string, selectedDate: string) => {
    setTasks((prevTasks) => {
      const dateTasks = prevTasks[selectedDate] || [];

      // Add 2-3 random labels from this set of colors
      const labelColors = [
        "#61BD4F", // green
        "#F2D600", // yellow
        "#FF9F1A", // orange
        "#EB5A46", // red
        "#C377E0", // purple
        "#0079BF", // blue
      ];

      const numLabels = Math.floor(Math.random() * 2) + 2;
      const selectedColors = [...labelColors]
        .sort(() => 0.5 - Math.random())
        .slice(0, numLabels)
        .map((color) => ({ color }));

      const newTask: Task = {
        id: uuidv4(),
        text,
        date: selectedDate,
        position: dateTasks.length,
        labels: selectedColors,
      };

      return {
        ...prevTasks,
        [selectedDate]: [...dateTasks, newTask],
      };
    });
  };

  const handleTasksReorder = (date: string, reorderedTasks: Task[]) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: reorderedTasks,
    }));
  };

  const handleTaskEdit = (date: string, taskId: string, newText: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: prevTasks[date].map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      ),
    }));
  };

  const handleTaskDelete = (date: string, taskId: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [date]: prevTasks[date].filter((task) => task.id !== taskId),
    }));
  };

  const handleTaskMove = (
    task: Task,
    sourceDate: string,
    targetDate: string
  ) => {
    if (sourceDate === targetDate) return;

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };

      // Remove from source
      newTasks[sourceDate] = prevTasks[sourceDate].filter(
        (t) => t.id !== task.id
      );
      if (newTasks[sourceDate].length === 0) {
        delete newTasks[sourceDate];
      }

      // Add to target
      const updatedTask = { ...task, date: targetDate };
      newTasks[targetDate] = [...(prevTasks[targetDate] || []), updatedTask];

      // Update positions
      newTasks[targetDate] = newTasks[targetDate].map((t, index) => ({
        ...t,
        position: index,
      }));

      return newTasks;
    });
  };

  const handleCellDragOver = (e: React.DragEvent, date: string) => {
    e.preventDefault();
    if (dragOverDate !== date) {
      setDragOverDate(date);
    }
  };

  const handleCellDragLeave = () => {
    setDragOverDate(null);
  };

  const handleCellDrop = (e: React.DragEvent, targetDate: string) => {
    e.preventDefault();
    setDragOverDate(null);

    if (draggedTask && draggedTask.sourceDate !== targetDate) {
      handleTaskMove(draggedTask.task, draggedTask.sourceDate, targetDate);
    }
  };

  const handleTaskDragStart = (task: Task, sourceDate: string) => {
    setDraggedTask({ task, sourceDate });
  };

  const handleTaskDragEnd = () => {
    setDraggedTask(null);
    setDragOverDate(null);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getFilteredTasks = (date: string) => {
    const dateTasks = tasks[date] || [];
    if (!searchText) return dateTasks;

    return dateTasks.filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <S.CalendarContainer>
      <S.TopBar>
        <S.Logo>Calendar</S.Logo>
        <S.HeaderContent>
          <S.NavigationButtons>
            <S.NavButton onClick={handlePrevPeriod}>
              <FaAngleUp />
            </S.NavButton>
            <S.NavButton onClick={handleNextPeriod}>
              <FaAngleDown />
            </S.NavButton>
          </S.NavigationButtons>
          <S.MonthTitle>
            {view === "month"
              ? format(currentDate, "MMMM yyyy")
              : `Week of ${format(startOfWeek(currentDate), "MMMM d, yyyy")}`}
          </S.MonthTitle>
        </S.HeaderContent>
        <S.SearchContainer>
          <S.SearchIcon />
          <S.SearchInput
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </S.SearchContainer>
        <S.AddButton onClick={() => setIsAddModalOpen(true)}>
          + Add task
        </S.AddButton>
        <S.ViewControls>
          <S.ViewButton
            active={view === "week"}
            onClick={() => handleViewChange("week")}
          >
            Week
          </S.ViewButton>
          <S.ViewButton
            active={view === "month"}
            onClick={() => handleViewChange("month")}
          >
            Month
          </S.ViewButton>
        </S.ViewControls>
      </S.TopBar>

      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTask}
        defaultDate={format(currentDate, "yyyy-MM-dd")}
      />

      <S.WeekDaysHeader>
        {weekDays.map((day) => (
          <S.DayHeader key={day}>{day}</S.DayHeader>
        ))}
      </S.WeekDaysHeader>

      <S.CalendarGrid isWeekView={view === "week"}>
        {days.map((day) => {
          const date = new Date(day.date);
          const isCurrentMonth = isSameMonth(date, currentDate);

          return (
            <S.Cell
              key={day.date}
              isCurrentMonth={view === "week" ? true : isCurrentMonth}
              isDragOver={dragOverDate === day.date}
              onDragOver={(e) => handleCellDragOver(e, day.date)}
              onDragLeave={handleCellDragLeave}
              onDrop={(e) => handleCellDrop(e, day.date)}
            >
              <S.DateLabel>
                {format(date, "d")}
                {getFilteredTasks(day.date)?.length > 0 && (
                  <S.TaskCount>
                    {getFilteredTasks(day.date).length} card
                    {getFilteredTasks(day.date).length !== 1 ? "s" : ""}
                  </S.TaskCount>
                )}
              </S.DateLabel>
              <S.TasksContainer>
                {day.holidays.length > 0 && (
                  <S.HolidayContainer>
                    {day.holidays.map((holiday) => (
                      <S.Holiday key={holiday.name}>{holiday.name}</S.Holiday>
                    ))}
                  </S.HolidayContainer>
                )}
                <TaskList
                  tasks={getFilteredTasks(day.date)}
                  onTasksReorder={(reorderedTasks) =>
                    handleTasksReorder(day.date, reorderedTasks)
                  }
                  onTaskEdit={(taskId, newText) =>
                    handleTaskEdit(day.date, taskId, newText)
                  }
                  onTaskDelete={(taskId) => handleTaskDelete(day.date, taskId)}
                  onTaskDragStart={(task) =>
                    handleTaskDragStart(task, day.date)
                  }
                  onTaskDragEnd={handleTaskDragEnd}
                />
              </S.TasksContainer>
            </S.Cell>
          );
        })}
      </S.CalendarGrid>
    </S.CalendarContainer>
  );
};

export default Calendar;
