import {
  MyLoginValue,
  MySignUpValue,
  Question,
  AddScorePayload,
} from "@/types";
import Cookies from "js-cookie";
import "dotenv/config";

export const getManagerData = async () => {
  const managerResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin-dashboard/manager-data`,
    {
      headers: new Headers({
        auth: Cookies.get("token") as string,
      }),
    }
  );
  const managerData = await managerResponse.json();
  return managerData;
};

export const getEmployeeData = async () => {
  const employeeResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin-dashboard/employee-data`,
    {
      headers: new Headers({
        auth: Cookies.get("token") as string,
      }),
    }
  );
  const employeeData = await employeeResponse.json();
  return employeeData;
};

export const deleteManagerFn = async (managerJSONString: string) => {
  const data = managerJSONString;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin-dashboard/delete-manager-data`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  if (result.status === "200") {
    return result;
  }
};

export const deleteEmployeeFn = async (employeeJSONString: string) => {
  const data = employeeJSONString;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin-dashboard/delete-employee-data`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  if (result.status === "200") {
    return result;
  }
};

export const updateManagerFn = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/update-manager`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const UpdateEmployeeFn = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/update-employee`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const AddManagerFn = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/add-manager`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const AddEmployeeFn = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/add-employee`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const GetQuizFn = async (employee: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-quiz`, {
    headers: new Headers({
      auth: Cookies.get("token") as string,
      "Content-Type": "application/json;charset=utf-8",
    }),
    method: "POST",
    body: JSON.stringify({ employee: employee }),
  });
  const result = await response.json();
  return result;
};

export const GetQuizByTechnologyFn = async (technology: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get-quiz-by-technology`,
    {
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      method: "POST",
      body: JSON.stringify({ technology: technology }),
    }
  );
  const result = await response.json();
  return result;
};

export const AssignQuizFn = async (quiz: string, employee: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assign-quiz`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify({ quiz: quiz, employee: employee }),
    }
  );
  const result = response.json();
  return result;
};

export const AbandonQuizFn = async (quiz: string, employee: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/abandon-quiz`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify({ quiz: quiz, employee: employee }),
    }
  );
  const result = response.json();
  return result;
};

export const DeleteQuizFn = async (quiz: string, employee: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/delete-quiz`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify({ quiz: quiz, employee: employee }),
    }
  );
  const result = response.json();
  return result;
};

export const GetEmployeeFn = async (employee: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get-employee-data-to-assign-quiz`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify({ employee: employee }),
    }
  );
  const result = response.json();
  return result;
};

export const AdminLoginFn = async (values: MyLoginValue) => {
  const AdminResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/admin-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }
  );
  const AdminLoginData = await AdminResponse.json();
  return AdminLoginData;
};

export const ManagerLoginFn = async (values: MyLoginValue) => {
  const ManagerResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/manager-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }
  );
  const ManagerLoginData = await ManagerResponse.json();
  return ManagerLoginData;
};

export const EmployeeLoginFn = async (values: MyLoginValue) => {
  const EmployeeResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/employee-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }
  );
  const EmployeeLoginData = await EmployeeResponse.json();
  return EmployeeLoginData;
};

export const GetQuizDataFn = async (quizIndex: string, employee: string) => {
  const quiz = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get-quiz-data`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify({
        index: quizIndex,
        employee: employee,
      }),
    }
  );
  const quizData = await quiz.json();
  return quizData;
};

export const GetQuizDataWithAnswersFn = async (
  quizIndex: string,
  employee: string
) => {
  const quiz = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get-quiz-data-with-answers`,
    {
      method: "POST",
      headers: new Headers({
        auth: Cookies.get("token") as string,
        "Content-Type": "application/json;charset=utf-8",
      }),
      body: JSON.stringify({
        index: quizIndex,
        employee: employee,
      }),
    }
  );
  const quizData = await quiz.json();
  return quizData;
};

export const SignUpFn = async (values: MySignUpValue) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/employee-register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    }
  );
  const result = await response.json();
  return result;
};

export const GetTechnologiesFn = async () => {
  const technologies = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get-technologies`,
    {
      headers: new Headers({
        auth: Cookies.get("token") as string,
      }),
    }
  );
  const technologiesData = await technologies.json();
  return technologiesData;
};

export const AddQuizFn = async (questions: Question[], technology: string) => {
  const quiz = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-quiz`, {
    method: "POST",
    headers: new Headers({
      auth: Cookies.get("token") as string,
      "Content-Type": "application/json;charset=utf-8",
    }),
    body: JSON.stringify({ questions: questions, technology: technology }),
  });
  const quizData = await quiz.json();
  return quizData;
};

export const AddScoreFn = async (mutationVariables: string) => {
  const quizIndex = JSON.parse(mutationVariables).quizIndex;
  const answers = JSON.parse(mutationVariables).answers;
  const employee = JSON.parse(mutationVariables).employee;

  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/add-score`, {
    method: "POST",
    headers: new Headers({
      auth: Cookies.get("token") as string,
      "Content-Type": "application/json;charset=utf-8",
    }),
    body: JSON.stringify({
      quizIndex: quizIndex,
      answers: answers,
      employee: employee,
    }),
  });
  const responseData = await result.json();
  return responseData;
};
