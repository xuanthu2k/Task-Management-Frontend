import axios from "axios";
import baseURL from "./baseURL";

const authApi = {};
authApi.login = async (email, password) => {
    try {
        const response = await axios.post(`${baseURL}/api/login`, {
            email: email,
            password: password,
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
