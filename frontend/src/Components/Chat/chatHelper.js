import axios from "axios";
import { API_URL_CHAT, API_URL_MESSAGE } from "../../utils/apiURL";

export const userChats = async (id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const chats = await axios.get(`${API_URL_CHAT}/${id}`, config);
        return chats;
    } catch (error) {
        console.log(error);
    }
};

export const getMessages = async (id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const messages = await axios.get(`${API_URL_MESSAGE}/${id}`, config);
        return messages;
    } catch (error) {
        console.log(error);
    }
};

export const addMessages = async(data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const result = await axios.post(`${API_URL_MESSAGE}/`,data , config); 
        return result ; 
    } catch (error) {
        console.log(error); 
    }
}



