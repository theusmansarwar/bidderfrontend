import { invokeApi } from "../utils/InvokeApi.js";

export const placeBid = async (data) => {
  const reqObj = {
    path: "/api/bids",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

