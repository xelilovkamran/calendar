import styled from "@emotion/styled";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(9, 30, 66, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 3px;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25);
  width: 100%;
  max-width: 320px;
  padding: 20px;
`;

const Title = styled.h3`
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
  color: #172b4d;
`;

const Message = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  color: #42526e;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button<{ danger?: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${(props) => (props.danger ? "#ef5350" : "#ebecf0")};
  color: ${(props) => (props.danger ? "white" : "#42526e")};

  &:hover {
    background-color: ${(props) => (props.danger ? "#e53935" : "#dfe1e6")};
  }
`;

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <Button onClick={onClose}>Cancel</Button>
          <Button danger onClick={onConfirm}>
            Delete
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmModal;
