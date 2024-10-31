import pushToast from "../helpers/sonnerToast.js";
import {get} from "../utils/requestsApi.js";

const getAllCategories = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
  search = null,
}) => {
  try {
    const res = await get('/categories', {
      params: {
        page,
        limit,
        sortBy,
        order,
        search,
      }
    });
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const getCategory = async (id) => {
  try {
    const res = await get(`/categories/${id}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

export default {
  getAllCategories,
  getCategory,
}