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

tasksApi.getSubTasks = async (accessToken, parentTaskId) => {
    try {
        const response = await axios.get(`${baseURL}/api/subtasks/${parentTaskId}`, {
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

tasksApi.updateTask = async (data) => {
    try {
        const { taskId, accessToken, title, description, dueDate, status } = data;
        const updateData = {};
        if (title) {
            updateData.Title = title;
        }
        if (description) {
            updateData.Description = description;
        }
        if (dueDate) {
            updateData.DueDate = dueDate;
        }
        if (status) {
            updateData.Status = status;
        }
        const response = await axios.patch(`${baseURL}/api/task/${taskId}`, updateData, {
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

tasksApi.deleteTask = async (accessToken, taskId) => {
    try {
        const response = await axios.delete(`${baseURL}/api/task/${taskId}`, {
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

export default tasksApi;
