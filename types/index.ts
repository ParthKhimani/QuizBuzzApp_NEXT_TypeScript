export interface Technology {
  _id: string;
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
  _id: string;
  questions: Question[];
  score: number;
  attempted: boolean;
  scoreGained: number;
}

export interface Employee {
  _id: string;
  emailId: string;
  password?: string;
  technology: Technology;
  quizes?: Quiz[];
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

export interface QuizResponse {
  quiz: Quiz;
}

export interface EmployeeProps {
  item: Employee;
}
export interface MyLoginValue {
  emailId: string;
  password: string;
}
export interface MySignUpValue {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  technology: string;
}

export interface AddScorePayload {
  quizIndex: string;
  answers: Answer[];
  employee: string;
}
