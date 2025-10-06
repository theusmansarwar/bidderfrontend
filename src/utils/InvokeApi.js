/* eslint-disable no-useless-catch */
import axios from "axios";
import { baseUrl } from "../config/Config.js";

axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
}) {
  const reqObj = {
    method,
    url: baseUrl + path,
    headers,
  };

  reqObj.params = queryParams;

  if (method === "POST") {
    reqObj.data = postData;
  }
  if (method === "PUT") {
    reqObj.data = postData;
  }
  if (method === "DELETE") {
    reqObj.data = postData;
  }

  let results;

  // console.log("<===REQUEST-OBJECT===>", reqObj);

  try {
    results = await axios(reqObj);
    // console.log("<===Api-Success-Result===>", results);

    return results.data;
  } catch (error) {
    throw error;
  }
}
