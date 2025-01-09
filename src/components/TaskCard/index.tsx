import { Task } from "../../types";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal";
import * as S from "./styles";

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
    <S.Card
      draggable={!isEditing}
      onDragStart={(e: React.DragEvent) =>
        !isEditing && onDragStart(e, task.id)
      }
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {isEditing ? (
        <S.CardContent>
          <S.TaskInput
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEditText(e.target.value)
            }
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </S.CardContent>
      ) : (
        <>
          {task.labels && task.labels.length > 0 && (
            <S.Labels>
              {task.labels.map((label, index) => (
                <S.Label key={index} color={label.color} />
              ))}
            </S.Labels>
          )}
          <S.CardContent>
            <S.TaskText>{task.text}</S.TaskText>
            <S.TaskActions className="task-actions">
              <S.ActionButton onClick={() => setIsEditing(true)}>
                <FaEdit size={14} />
              </S.ActionButton>
              <S.ActionButton onClick={() => setShowDeleteModal(true)}>
                <FaTrash size={14} color="red" />
              </S.ActionButton>
            </S.TaskActions>
          </S.CardContent>
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
    </S.Card>
  );
};

export default TaskCard;
