import { invokeApi } from "../utils/InvokeApi.js";

export const SignUp = async (data) => {
  const reqObj = {
    path: "/api/auth/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const SignIn = async (data) => {
  const reqObj = {
    path: "/api/auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// export const logout = async () => {
//   const reqObj = {
//     path: "/api/user/logout",
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("Token")}`,
//     },
//   };
//   return invokeApi(reqObj);
// };