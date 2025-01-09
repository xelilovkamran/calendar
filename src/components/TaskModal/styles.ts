import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
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
  backdrop-filter: blur(5px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 24px;
  position: relative;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #6b778c;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f4f5f7;
    color: #172b4d;
  }
`;

export const Title = styled.h3`
  margin: 0 0 24px;
  font-size: 20px;
  font-weight: 600;
  color: #172b4d;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #172b4d;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  min-height: 100px;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  color: #334155;

  &:hover {
    background-color: #fff;
    border-color: #cbd5e1;
  }

  &:focus {
    background-color: #fff;
    border-color: #ff9800;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const DateInputWrapper = styled.div`
  position: relative;
  width: 100%;

  &:after {
    content: "";
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ff9800' viewBox='0 0 24 24'%3E%3Cpath d='M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z'/%3E%3C/svg%3E")
      center/contain no-repeat;
    pointer-events: none;
  }
`;

export const DateInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  color: #334155;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: #f8fafc;
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    background-color: #fff;
    border-color: #cbd5e1;
  }

  &:focus {
    background-color: #fff;
    border-color: #ff9800;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ primary }) =>
    primary
      ? `
    background-color: #ff9800;
    color: white;
    
    &:hover {
      background-color: #ff9800;
    }
    
    &:active {
      background-color: #ff9800;
    }
  `
      : `
    background-color: #f1f5f9;
    color: #475569;
    
    &:hover {
      background-color: #e2e8f0;
    }
    
    &:active {
      background-color: #cbd5e1;
    }
  `}
`;
