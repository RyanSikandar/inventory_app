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

//Delete a product
export const deleteAProduct = async (id) => {
    const response = await axios.delete(`${BACKEND_URL}/api/products/${id}`);
    return response.data;
}

//Get a single product
export const getProduct = async (id) => {
    const response = await axios.get(`${BACKEND_URL}/api/products/${id}`);
    return response.data;
}

export const updateAProduct = async (id, formData) => {
    const response = await axios.patch(`${BACKEND_URL}/api/products/${id}`, formData);
    return response.data;
}