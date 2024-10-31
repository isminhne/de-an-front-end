import {post} from "../utils/requestsApi.js";
import pushToast from "../helpers/sonnerToast.js";

const placeOrder = async (data) => {
  try {
    const res = await post('/user/orders', data);
    return res;
  } catch (e) {
    pushToast(e.response.data.message, "error");
  }
}

export default {
  placeOrder
}