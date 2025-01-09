import { useState } from "react";
import { FaTimes, FaRegCalendarAlt } from "react-icons/fa";
import * as S from "./styles";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string, date: string) => void;
  defaultDate: string;
}

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultDate,
}: TaskModalProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description.trim(), date);
      setDescription("");
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.CloseButton onClick={onClose}>
          <FaTimes size={16} />
        </S.CloseButton>
        <S.Title>Create New Task</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label htmlFor="description">Description</S.Label>
            <S.TextArea
              id="description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              placeholder="What needs to be done?"
              autoFocus
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="date">
              <FaRegCalendarAlt size={14} />
              Due Date
            </S.Label>
            <S.DateInputWrapper>
              <S.DateInput
                id="date"
                type="date"
                value={date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(e.target.value)
                }
              />
            </S.DateInputWrapper>
          </S.FormGroup>
          <S.ButtonGroup>
            <S.Button type="button" onClick={onClose}>
              Cancel
            </S.Button>
            <S.Button type="submit" primary>
              Create Task
            </S.Button>
          </S.ButtonGroup>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default TaskModal;
