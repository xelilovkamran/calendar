export interface Label {
  color: string;
  name?: string;
}

export interface Task {
  id: string;
  text: string;
  date: string;
  position: number;
  labels: Label[];
}

export interface Holiday {
  date: string;
  name: string;
  countryCode: string;
}

export interface DayCell {
  date: string;
  tasks: Task[];
  holidays: Holiday[];
}
