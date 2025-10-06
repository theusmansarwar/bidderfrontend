import { invokeApi } from "../utils/InvokeApi.js";

export const removeCartItem = async (id) => {
  const reqObj = {
    path: `/cart/${id}`,
    method: "Delete",
    headers: {},
    body: {},
  };
  return invokeApi(reqObj);
};
export const clearCart = async (id) => {
  const reqObj = {
    path: `/cart/clear/${id}`,
    method: "Delete",
    headers: {},
    body: {},
  };
  return invokeApi(reqObj);
};

