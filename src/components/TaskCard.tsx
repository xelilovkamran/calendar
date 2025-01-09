import styled from "@emotion/styled";
import { Task } from "../types";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

const Card = styled.div`
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  margin-bottom: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #f8f9fa;

    .task-actions {
      opacity: 1;
    }
  }
`;

const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: ${(props) => (props.children ? "8px" : "0")};
`;

const Label = styled.div<{ color: string }>`
  height: 3px;
  width: 40px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
`;

const CardContent = styled.div`
  padding: 6px 8px 8px;
`;

const TaskText = styled.div`
  font-size: 14px;
  color: #172b4d;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
  font-weight: 400;
`;

const TaskInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 3px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  color: #172b4d;
  background: white;
  box-shadow: inset 0 0 0 2px #0079bf;
  margin: 0;
  min-height: 60px;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #0079bf;
  }

  &::placeholder {
    color: #5e6c84;
  }
`;

const TaskActions = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.15s ease;
  background: inherit;
  padding: 2px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b778c;
  padding: 4px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #172b4d;
  }
`;

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onEdit: (taskId: string, newText: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({
  task,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(task.text);
    }
  };

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  return (
    <Card
      draggable={!isEditing}
      onDragStart={(e) => !isEditing && onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {isEditing ? (
        <CardContent>
          <TaskInput
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </CardContent>
      ) : (
        <>
          {task.labels && task.labels.length > 0 && (
            <Labels>
              {task.labels.map((label, index) => (
                <Label key={index} color={label.color} />
              ))}
            </Labels>
          )}
          <CardContent>
            <TaskText>{task.text}</TaskText>
            <TaskActions className="task-actions">
              <ActionButton onClick={() => setIsEditing(true)}>
                <FaEdit size={14} />
              </ActionButton>
              <ActionButton onClick={() => setShowDeleteModal(true)}>
                <FaTrash size={14} color="red" />
              </ActionButton>
            </TaskActions>
          </CardContent>
        </>
      )}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(task.id);
          setShowDeleteModal(false);
        }}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </Card>
  );
};

export default TaskCard;
