import { useState } from "react";
import styled from "@emotion/styled";
import { Task } from "../types";
import TaskCard from "./TaskCard";

const Container = styled.div`
  min-height: 10px;
  display: flex;
  flex-direction: column;
`;

interface TaskListProps {
  tasks: Task[];
  onTasksReorder: (tasks: Task[]) => void;
  onTaskEdit: (taskId: string, newText: string) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskDragStart: (task: Task) => void;
  onTaskDragEnd: () => void;
}

const TaskList = ({
  tasks,
  onTasksReorder,
  onTaskEdit,
  onTaskDelete,
  onTaskDragStart,
  onTaskDragEnd,
}: TaskListProps) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTaskId(task.id);
    onTaskDragStart(task);
    e.dataTransfer.setData("text/plain", task.id);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    onTaskDragEnd();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTaskId || draggedTaskId === targetTaskId) return;

    const updatedTasks = [...tasks];
    const draggedTaskIndex = tasks.findIndex((t) => t.id === draggedTaskId);
    const targetTaskIndex = tasks.findIndex((t) => t.id === targetTaskId);

    // Remove the dragged task
    const [draggedTask] = updatedTasks.splice(draggedTaskIndex, 1);

    // Insert it at the target position
    updatedTasks.splice(targetTaskIndex, 0, draggedTask);

    // Update positions
    const reorderedTasks = updatedTasks.map((task, index) => ({
      ...task,
      position: index,
    }));

    onTasksReorder(reorderedTasks);
    setDraggedTaskId(null);
  };

  return (
    <Container>
      {tasks
        .sort((a, b) => a.position - b.position)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={(e) => handleDragStart(e, task)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, task.id)}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
          />
        ))}
    </Container>
  );
};

export default TaskList;
