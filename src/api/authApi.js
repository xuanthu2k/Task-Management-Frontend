import axios from "axios";
import baseURL from "./baseURL";

const authApi = {};

authApi.login = async (email, password) => {
    try {
        const response = await axios.post(`${baseURL}/api/login`, {
            email: email,
            password: password,
        });
        return response;
    } catch (error) {
        return error;
    }
};

authApi.register = async (name, email, password, phone) => {
    try {
        const response = await axios.post(`${baseURL}/api/register`, {
            name: name,
            email: email,
            password: password,
            phone: phone,
        });
        if (response.data) {
            return response.data;
        }
        return response;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

export default authApi;
