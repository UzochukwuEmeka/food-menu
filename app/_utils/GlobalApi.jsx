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
    console.log(resp.data.data);
    return resp.data.data;
  });
const getProductByCategory = (categoryName) =>
  axiosClient
    .get(`products?filters[categories][name][$in]=${categoryName}&populate=*`)
    .then((resp) => {
      console.log(resp.data.data);
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
      Authorization: "Bearer " +jwt,
    },
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
};
