import { MyLoginValue, MySignUpValue } from "@/types";

export const getManagerData = async () => {
  const managerResponse = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/admin-dashboard/manager-data"
  );
  const managerData = await managerResponse.json();
  return managerData;
};

export const getEmployeeData = async () => {
  const employeeResponse = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/admin-dashboard/employee-data"
  );
  const employeeData = await employeeResponse.json();
  return employeeData;
};

export const deleteManagerFn = async (managerJSONString: string) => {
  const data = managerJSONString;
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/admin-dashboard/delete-manager-data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
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
    "https://quiz-app-backend-parthkhimani.vercel.app/admin-dashboard/delete-employee-data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
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
    "https://quiz-app-backend-parthkhimani.vercel.app/update-manager",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const UpdateEmployeeFn = async (formData: FormData) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/update-employee",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const AddManagerFn = async (formData: FormData) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/add-manager",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const AddEmployeeFn = async (formData: FormData) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/add-employee",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  const result = await response.json();
  return result;
};

export const GetQuizFn = async (employee: string) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/get-quiz"
  );
  const result = await response.json();
  return result;
};

export const GetQuizByTechnologyFn = async (technology: string) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/get-quiz-by-technology"
  );
  const result = await response.json();
  return result;
};

export const AssignQuizFn = async (quiz: string, employee: string) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/assign-auiz"
  );
  const result = response.json();
  return result;
};

export const AbandonQuizFn = async (quiz: string, employee: string) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/abandon-auiz",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ quiz: quiz, employee: employee }),
    }
  );
  const result = response.json();
  return result;
};

export const GetEmployeeFn = async (employee: string) => {
  const response = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/get-employee-data-to-assign-quiz",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ employee: employee }),
    }
  );
  const result = response.json();
  return result;
};

export const AdminLoginFn = async (values: MyLoginValue) => {
  const AdminResponse = await fetch(
    "https://quiz-app-backend-parthkhimani.vercel.app/admin-login",
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
    "https://quiz-app-backend-parthkhimani.vercel.app/manager-login",
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
    "https://quiz-app-backend-parthkhimani.vercel.app/employee-login",
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
    "https://quiz-app-backend-parthkhimani.vercel.app/get-quiz-data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
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
    "https://quiz-app-backend-parthkhimani.vercel.app/get-quiz-data-with-answers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
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
    "https://quiz-app-backend-parthkhimani.vercel.app/employee-register",
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
