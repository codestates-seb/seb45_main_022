import axios from "axios";


interface UserData {
    email: string;
    password: string;
    nickname?: string;
}



export const registerAuth = async (userData: UserData) => {
    const response = await axios.post('user/users.json', userData);
    return response.data;
};


export const loginAuth = async (userData: UserData) => {
    const response = await axios.post('user/users.json', userData);
    return response.data;
};