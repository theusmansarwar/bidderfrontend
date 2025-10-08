import { invokeApi } from "../utils/InvokeApi";

export const getAllProducts = async (page, limit) => {
  const reqObj = {
    path: `/api/products/list?limit=${limit}&page=${page}`,
    method: "GET",
    headers: {},
    body: {},
  };
  return invokeApi(reqObj);
};

export const getProductById = async (id) => {
  const reqObj = {
    path: `/api/products/${id}`,
    method: "GET",
    headers: {},

    body: {},
  };
  return invokeApi(reqObj);
};
export const getFeaturedArtists = async (limit) => {
  const reqObj = {
    path: `/api/artist/featured?limit=${limit}`,
    method: "GET",
    headers: {},

    body: {},
  };
  return invokeApi(reqObj);
};
