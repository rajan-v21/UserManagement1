import axios from "axios";

export const fetchAllUsers = async () => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    return response.data;
}

export const fetchUser = async (id: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}