import axios from "axios";
import baseURL from "./baseURL";

const userApi = {};

userApi.getInfo = async (accessToken) => {
    try {
        const response = await axios.get(`${baseURL}/api/get-info`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
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

export default userApi;
