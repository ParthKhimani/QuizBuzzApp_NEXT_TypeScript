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

export const deleteManagerFn = async () => {
  const response = await fetch(
    "http://localhost:3333/admin-dashboard/delete-manager-data"
  );
  const result = response.json();
  return result;
};
