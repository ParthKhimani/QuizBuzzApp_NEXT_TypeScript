export interface Technology {
  name: string;
  managers: Manager[];
  employees: Employee[];
}

export interface Manager {
  emailId: string;
  password: string;
  technology: Technology;
}

export interface Quiz {
  score: number;
  attempted: boolean;
  scoreGained: number;
}

export interface Employee {
  emailId: string;
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

export interface QuizForEmployees {
  questions: Question[];
  employee: {
    quizes: {
      questions: Question[];
    }[];
  };
}

export interface Quizes {
  quiz: QuizForEmployees;
  score: number;
  attempted: boolean;
  scoreGained: number;
  answers: Answer[];
}

export interface Answer {
  _id?: string;
  index: number;
  answer: string;
}
