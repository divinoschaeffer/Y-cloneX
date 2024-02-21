import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function getUser(idName) {
    try {
        const response = await axios.get(API + 'user/' + idName, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error fetching user: " + error);
        throw error;
    }
}

export async function updateUser(idName, data) {
    try {
        const response = await axios.put(API + 'user/update/' + idName, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}

export async function isAlreadyUser(idName){
    try {
        const response = await axios.get(API + `user/isUser/${idName}`);
        return response.data.isUser;
    } catch (error) {
        console.log(error);
    }
}