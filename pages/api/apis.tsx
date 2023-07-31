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

export const deleteManagerFn = async (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  const data = event.currentTarget.getAttribute("value");
  const response = await fetch(
    "http://localhost:3333/admin-dashboard/delete-manager-data",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: data,
    }
  );
  const result = await response.json();
  if (result.status === "200") {
    return getManagerData;
  }
  return result;
};
