import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//Create a new product

export const createProduct = async (productData) => {
    const response = await axios.post(`${BACKEND_URL}/api/products`, productData);
    return response.data;
}