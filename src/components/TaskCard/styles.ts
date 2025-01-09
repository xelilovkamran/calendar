import styled from "@emotion/styled";

export const Card = styled.div`
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

export const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: ${(props) => (props.children ? "8px" : "0")};
`;

export const Label = styled.div<{ color: string }>`
  height: 3px;
  width: 40px;
  background-color: ${(props) => props.color};
  border-radius: 2px;
`;

export const CardContent = styled.div`
  padding: 6px 8px 8px;
`;

export const TaskText = styled.div`
  font-size: 14px;
  color: #172b4d;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
  font-weight: 400;
`;

export const TaskInput = styled.textarea`
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

export const TaskActions = styled.div`
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

export const ActionButton = styled.button`
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
