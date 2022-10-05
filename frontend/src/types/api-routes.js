export const apiRoutes = {
  //* Auth
  GET_TOKENS: "api/token/",
  REFRESH_TOKEN: "api/token/refresh/",

  EMPLOYEE: "api/v1.0/employee/",
  FETCH_EMPLOYEE_LIST: "api/v1.0/employees/",
  FETCH_DEPARTMENT_LIST: "api/v1.0/departments/",
  FETCH_EMPLOYEE_FOR_REGISTER_LIST: "api/v1.0/employeesForRegister/",
  INITIALIZE_REGISTER: "api/v1.0/initializeRegister/",
  FETCH_REGISTER_DETAILS: "api/v1.0/registerRH/",
  PUT_REGISTER: "api/v1.0/registerRH/",
  FETCH_REGISTER_LIST: "api/v1.0/registerList/",

  FETCH_PERCEPTION_TYPE_LIST: "api/v1.0/perceptionTypeList/",
  CREATE_PERCEPTION_TYPE: "api/v1.0/perceptionType/",
  EDIT_PERCEPTION_TYPE: "api/v1.0/perceptionType/",
  FETCH_EMPLOYEE_PERCEPTIONS_LIST: "api/v1.0/employeePerceptionList/",
  CREATE_PERCEPTION: "api/v1.0/perception/",
  EDIT_PERCEPTION: "api/v1.0/perception/",

  FETCH_DEDUCTION_TYPE_LIST: "api/v1.0/deductionTypeList/",
  CREATE_DEDUCTION_TYPE: "api/v1.0/deductionType/",
  EDIT_DEDUCTION_TYPE: "api/v1.0/deductionType/",
  FETCH_EMPLOYEE_DEDUCTIONS_LIST: "api/v1.0/employeeDeductionList/",
  CREATE_DEDUCTION: "api/v1.0/deduction/",
  EDIT_DEDUCTION: "api/v1.0/deduction/",
};
