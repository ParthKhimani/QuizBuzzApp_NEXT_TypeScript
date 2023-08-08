export const getManagerData = async () => {
  const managerResponse = await fetch(
    "http://localhost:3333/admin-dashboard/manager-data"
  );
  const managerData = await managerResponse.json();
  return managerData;
};

export const getEmployeeData = async () => {
  const employeeResponse = await fetch(
    "http://localhost:3333/admin-dashboard/employee-data"
  );
  const employeeData = await employeeResponse.json();
  return employeeData;
};

export const deleteManagerFn = async (managerJSONString: string) => {
  const data = managerJSONString;
  const response = await fetch(
    "http://localhost:3333/admin-dashboard/delete-manager-data",
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
    "http://localhost:3333/admin-dashboard/delete-employee-data",
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
  const response = await fetch("http://localhost:3333/update-manager", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const result = await response.json();
  return result;
};

export const UpdateEmployeeFn = async (formData: FormData) => {
  const response = await fetch("http://localhost:3333/update-employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const result = await response.json();
  return result;
};

export const AddManagerFn = async (formData: FormData) => {
  const response = await fetch("http://localhost:3333/add-manager", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const result = await response.json();
  return result;
};

export const AddEmployeeFn = async (formData: FormData) => {
  const response = await fetch("http://localhost:3333/add-employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const result = await response.json();
  return result;
};

export const GetQuizFn = async (employee: string) => {
  const response = await fetch("http://localhost:3333/get-quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ employee: employee }),
  });
  const result = await response.json();
  return result;
};

export const AdminLoginFn = async (formData: FormData) => {
  const AdminResponse = await fetch("http://localhost:3333/admin-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const AdminLoginData = await AdminResponse.json();
  return AdminLoginData;
};

export const ManagerLoginFn = async (formData: FormData) => {
  const ManagerResponse = await fetch("http://localhost:3333/manager-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const ManagerLoginData = await ManagerResponse.json();
  return ManagerLoginData;
};

export const EmployeeLoginFn = async (formData: FormData) => {
  const EmployeeResponse = await fetch("http://localhost:3333/employee-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const EmployeeLoginData = await EmployeeResponse.json();
  return EmployeeLoginData;
};

export const GetQuizDataFn = async (quizIndex: string, employee: string) => {
  const quiz = await fetch("http://localhost:3333/get-quiz-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      index: quizIndex,
      employee: employee,
    }),
  });
  const quizData = await quiz.json();
  return quizData;
};

export const GetQuizDataWithAnswersFn = async (
  quizIndex: string,
  employee: string
) => {
  const quiz = await fetch("http://localhost:3333/get-quiz-data-with-answers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      index: quizIndex,
      employee: employee,
    }),
  });
  const quizData = await quiz.json();
  return quizData;
};
