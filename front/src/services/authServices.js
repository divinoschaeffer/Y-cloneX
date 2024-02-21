import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export async function loginToAPI(data){
    try {
        const response = await axios.post(API + `auth/login`, data, {withCredentials: true});
        return response.data.user;
    } catch (error) {
        console.log(error);
    }
}

export async function signToAPI(data){
    try {
        const response = await axios.post(API + 'auth/sign-in', data, {withCredentials: true});
        return response.data.user;
    } catch (error) {
        console.log(error);
    }
}