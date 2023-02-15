import axios from "axios";
import baseURL from "./baseURL";

const tasksApi = {};

tasksApi.getTasks = async (accessToken) => {
    try {
        const response = await axios.get(`${baseURL}/api/tasks`, {
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

tasksApi.getTask = async (accessToken, taskId) => {
    try {
        const response = await axios.get(`${baseURL}/api/task/${taskId}`, {
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

tasksApi.createTask = async (data) => {
    try {
        const { accessToken, title, description, dueDate } = data;
        const response = await axios.post(
            `${baseURL}/api/task`,
            {
                Title: title,
                Description: description,
                DueDate: dueDate,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (response.data) {
            return response.data;
        }
        return response;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

export default tasksApi;
