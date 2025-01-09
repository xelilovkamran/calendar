import { useState, useEffect } from "react";
import styled from "@emotion/styled";
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
import type { Task, Holiday, DayCell } from "../types";
import { FaAngleDown, FaAngleUp, FaSearch } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

interface TasksState {
  [date: string]: Task[];
}

const CalendarContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const TopBar = styled.div`
  background-color: #ff9800;
  color: white;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
`;

const NavigationButtons = styled.div`
  display: flex;
  margin-right: 8px;
  gap: 1px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }
`;

const MonthTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: normal;
`;

const ViewControls = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px;
  border-radius: 3px;
`;

const ViewButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? "#fff" : "transparent")};
  color: ${(props) => (props.active ? "#172b4d" : "#fff")};
  border: none;
  padding: 4px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 60px;
  outline: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${(props) =>
      props.active ? "#fff" : "rgba(255, 255, 255, 0.1)"};
  }
`;

const WeekDaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

const DayHeader = styled.div`
  text-align: center;
  padding: 12px 8px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CalendarGrid = styled.div<{ isWeekView: boolean }>`
  display: grid;
  grid-template-columns: repeat(7, minmax(200px, 1fr));
  grid-auto-rows: ${(props) =>
    props.isWeekView ? "1fr" : "minmax(180px, calc((100vh - 120px) / 6))"};
  gap: 1px;
  background-color: #e0e0e0;
  flex: 1;
  overflow: auto;
  min-width: 100%;
`;

const Cell = styled.div<{ isCurrentMonth: boolean; isDragOver?: boolean }>`
  height: 100%;
  min-height: ${(props) => (props.isCurrentMonth ? "100%" : "180px")};
  min-width: 200px;
  padding: 8px;
  background-color: ${(props) =>
    props.isDragOver
      ? "#e3f2fd"
      : props.isCurrentMonth
      ? "#ffffff"
      : "#f5f5f5"};
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: background-color 0.2s ease;
`;

const DateLabel = styled.div`
  color: #666;
  margin-bottom: 8px;
  flex-shrink: 0;
`;

const TaskCount = styled.span`
  color: #666;
  font-size: 12px;
  margin-left: 4px;
`;

const TasksContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  max-height: calc(100% - 32px);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const AddButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 3px;
  color: white;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background-color 0.2s ease;
  margin-right: 16px;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const HolidayContainer = styled.div`
  margin-bottom: 8px;
`;

const Holiday = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  padding: 4px 8px;
  margin-bottom: 4px;
  font-size: 12px;
  color: #172b4d;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;

  &:before {
    content: "🎉";
    font-size: 14px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-right: 16px;
  min-width: 200px;
`;

const SearchInput = styled.input`
  padding: 6px 12px 6px 32px;
  border: none;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
  width: 100%;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

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
    <CalendarContainer>
      <TopBar>
        <Logo>Calendar</Logo>
        <HeaderContent>
          <NavigationButtons>
            <NavButton onClick={handlePrevPeriod}>
              <FaAngleUp />
            </NavButton>
            <NavButton onClick={handleNextPeriod}>
              <FaAngleDown />
            </NavButton>
          </NavigationButtons>
          <MonthTitle>
            {view === "month"
              ? format(currentDate, "MMMM yyyy")
              : `Week of ${format(startOfWeek(currentDate), "MMMM d, yyyy")}`}
          </MonthTitle>
        </HeaderContent>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchContainer>
        <AddButton onClick={() => setIsAddModalOpen(true)}>
          + Add task
        </AddButton>
        <ViewControls>
          <ViewButton
            active={view === "week"}
            onClick={() => handleViewChange("week")}
          >
            Week
          </ViewButton>
          <ViewButton
            active={view === "month"}
            onClick={() => handleViewChange("month")}
          >
            Month
          </ViewButton>
        </ViewControls>
      </TopBar>

      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTask}
        defaultDate={format(currentDate, "yyyy-MM-dd")}
      />

      <WeekDaysHeader>
        {weekDays.map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
      </WeekDaysHeader>

      <CalendarGrid isWeekView={view === "week"}>
        {days.map((day) => {
          const date = new Date(day.date);
          const isCurrentMonth = isSameMonth(date, currentDate);

          return (
            <Cell
              key={day.date}
              isCurrentMonth={view === "week" ? true : isCurrentMonth}
              isDragOver={dragOverDate === day.date}
              onDragOver={(e) => handleCellDragOver(e, day.date)}
              onDragLeave={handleCellDragLeave}
              onDrop={(e) => handleCellDrop(e, day.date)}
            >
              <DateLabel>
                {format(date, "d")}
                {getFilteredTasks(day.date)?.length > 0 && (
                  <TaskCount>
                    {getFilteredTasks(day.date).length} card
                    {getFilteredTasks(day.date).length !== 1 ? "s" : ""}
                  </TaskCount>
                )}
              </DateLabel>
              <TasksContainer>
                {day.holidays.length > 0 && (
                  <HolidayContainer>
                    {day.holidays.map((holiday) => (
                      <Holiday key={holiday.name}>{holiday.name}</Holiday>
                    ))}
                  </HolidayContainer>
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
              </TasksContainer>
            </Cell>
          );
        })}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default Calendar;
