import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.100.14:1337/api/",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getBanners = () =>
  axiosClient.get("/banners?populate=*").then((resp) => {
    return resp.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });
const getProductList = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });
const getProductByCategory = (categoryName) =>
  axiosClient
    .get(`products?filters[categories][name][$in]=${categoryName}&populate=*`)
    .then((resp) => {
      return resp.data.data;
    });

const registerUsers = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addTOCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const userCart = (userId, jwt) =>
  axiosClient.get(
    `/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][image]=url`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
const deleteItem = (userId, jwt) =>
  axiosClient.delete(`/user-carts/${userId}`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const orderItemList = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&[populate][orderitemlist][populate][product][populate][images]=url`
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item?.attributes?.totalOrderAmount,
        paymentId: item?.attributes?.paymentId,
        orderItemList: item?.attributes?.orderitemlist,
        createdAt: item?.attributes?.createdAt,
        status:item?.attributes.status
      }));
      return orderList;
    });
export default {
  getCategory,
  getBanners,
  getCategoryList,
  getProductList,
  getProductByCategory,
  registerUsers,
  signIn,
  addTOCart,
  userCart,
  deleteItem,
  createOrder,
  orderItemList,
};
