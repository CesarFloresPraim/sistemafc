export const apiRoutes = {
  //* CUSTOMER
  REGISTER_CUSTOMER: "api/v1/Customer/register",
  CUSTOMER_ADDRESS: "api/v1/Customer/address",
  CUSTOMER_EMPLOYMENT: "api/v1/Customer/employmentdetails",
  CUSTOMER_GOAL: "api/v1/Customer/goals",
  BROKER_PROFILE: "api/v1/Broker/profile",
  BROKER_PREFERENCES: "api/v1/Broker/preferences",

  //* ACCOUNTS
  LOGIN: "api/v1/Account/login",
  LOGIN_STATUS: "api/v1/Account/status",
  FORGOT_PASSWORD: "api/v1/Account/resetPassword",

  //REFRESH_TOKEN: "api/v1/accounts/refresh-token",
  RESEND_CODE: "api/v1/Account/resendverificationcode",
  CHANGE_PASSWORD: "api/v1/Account/changepassword",
  CONFIRM_USER: "api/v1/Account/confirmuser",

  //* OTP
  VERIFY_CODE: "api/v1/OTP/verifycode", //Requires email and code on end
};
