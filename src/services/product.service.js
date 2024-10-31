import pushToast from "../helpers/sonnerToast.js";
import {get} from "../utils/requestsApi.js";
import CategoriesService from "./categories.service.js";

const getAllProducts = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
  search = null,
}) => {
  try {
    const res = await get('/products', {
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

const getCategories = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
  search = null,
}) => {
  return await CategoriesService.getAllCategories({
    page,
    limit,
    sortBy,
    order,
    search
  });
}

const getProduct = async (id) => {
  try {
    const res = await get(`/products/${id}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

const getProductByCategory = async (categorySlug) => {
  try {
    const res = await get(`/products/category/${categorySlug}`);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

export default {
  getAllProducts,
  getCategories,
  getProduct,
  getProductByCategory
}