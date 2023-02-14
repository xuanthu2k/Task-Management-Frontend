import axios from "axios";

const tasksApi = {};

tasksApi.getTasks = async (accessToken) => {
    try {
        const response = await axios.get("http://localhost:9999/api/tasks", {
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
            "http://localhost:9999/api/task",
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
