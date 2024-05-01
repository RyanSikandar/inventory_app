import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Create a new product

export const createProduct = async (productData) => {
    console.log(...productData)
    const response = await axios.post(`${BACKEND_URL}/api/products`, productData);
    console.log(response.data)
    return response.data;
}


//Get all products
export const getProducts = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/products/allProducts`);
    return response.data;
}
