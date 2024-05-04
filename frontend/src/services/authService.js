import axios from 'axios';
import { toast } from 'react-toastify';
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
}


export const registerUser = async (userData) => {

    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData);
        if (response.statusText === "OK") {
            toast.success("User Registered Successfully");
        }
        return response.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}

export const loginUser = async (userData) => {

    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);
        if (response.statusText === "OK") {
            toast.success("Login Successful");
        }
        return response.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}


export const logoutUser = async () => {

    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}


export const forgotPassword = async (userData) => {

    try {
        const resp = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData);
        if (resp.statusText === "OK") {
            toast.success("Reset link sent to your email");
        }
        return resp.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}


export const resetPassword = async (userData, resetToken) => {

    try {
        const resp = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData);
        return resp.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}

export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
        return response.data;
    }
    catch (error) {
        return false;
    }
}

export const getUserDetails = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
        return response.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}

export const updateProfile = async (userData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/updateUser`, userData);
        if (response.statusText === "OK") {
            toast.success("Profile Updated Successfully");
        }
        return response.data;
    }
    catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}