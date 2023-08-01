export interface Technology {
  name: String;
  managers: Manager[];
}

export interface Manager {
  emailId: String;
  technology: Technology;
}

export interface Quiz {
  score: number;
  attempted: boolean;
  scoreGained: number;
}

export interface Employee {
  emailId: String;
  technology: Technology;
  quizes: Quiz[];
}

export interface Option {
  id: number;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: { id: number; value: string }[];
  answer: string;
}
