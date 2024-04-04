import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.100.14:1337/api/",
});

const getCategory = () => axiosClient.get("/categories?populate=*");
// const getCategory=()=>axios.create({baseURL:"http://localhost:1337/api/"}).get('/categories?populate=*')

const getBanners=()=>axiosClient.get('/banners?populate=*').then((resp)=>{
 
  return  resp.data.data
})

const getCategoryList = () => axiosClient.get("/categories?populate=*").then((resp)=>{
  return resp.data.data
})
const getProductList=()=>axiosClient.get("/products?populate=*").then((resp)=>{
  console.log(resp.data.data)
  return resp.data.data
})

export default {
  getCategory,
  getBanners,
  getCategoryList,
  getProductList
};
