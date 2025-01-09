import { FC } from "react";
import * as S from "./styles";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
        <S.ButtonGroup>
          <S.Button onClick={onClose}>Cancel</S.Button>
          <S.Button danger onClick={onConfirm}>
            Delete
          </S.Button>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default ConfirmModal;
