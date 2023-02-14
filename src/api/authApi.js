import axios from "axios";

const authApi = {};
authApi.login = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:9999/api/login", {
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
