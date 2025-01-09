import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

export const CalendarContainer = styled.div`
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

export const TopBar = styled.div`
  background-color: #ff9800;
  color: white;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  justify-content: center;
`;

export const NavigationButtons = styled.div`
  display: flex;
  margin-right: 8px;
  gap: 1px;
`;

export const NavButton = styled.button`
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

export const MonthTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: normal;
`;

export const ViewControls = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px;
  border-radius: 3px;
`;

export const ViewButton = styled.button<{ active?: boolean }>`
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

export const WeekDaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
`;

export const DayHeader = styled.div`
  text-align: center;
  padding: 12px 8px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CalendarGrid = styled.div<{ isWeekView: boolean }>`
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

export const Cell = styled.div<{
  isCurrentMonth: boolean;
  isDragOver?: boolean;
}>`
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

export const DateLabel = styled.div`
  color: #666;
  margin-bottom: 8px;
  flex-shrink: 0;
`;

export const TaskCount = styled.span`
  color: #666;
  font-size: 12px;
  margin-left: 4px;
`;

export const TasksContainer = styled.div`
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

export const AddButton = styled.button`
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

export const HolidayContainer = styled.div`
  margin-bottom: 8px;
`;

export const Holiday = styled.div`
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

export const SearchContainer = styled.div`
  position: relative;
  margin-right: 16px;
  min-width: 200px;
`;

export const SearchInput = styled.input`
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

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;
