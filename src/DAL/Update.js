import { invokeApi } from "../utils/InvokeApi.js";
export const updateCartItem = async (data, id) => {
  const reqObj = {
    path: `/cart/${id}`,
    method: "PUT",
    headers: {
     "Content-Type": "application/json", 
    },
    postData: JSON.stringify(data),
  };
  return invokeApi(reqObj);
};

export const cancelOrder = async ( id) => {

  const reqObj = {
    path: `/orders/${id}/cancel`,
    method: "PUT",
    headers: {
    }
    
  };
  return invokeApi(reqObj);
};
