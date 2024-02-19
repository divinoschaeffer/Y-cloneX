import axios from "axios";

export async function getUser(idName) {
    try {
        const response = await axios.get('http://localhost:3000/api/user/' + idName, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error fetching user: " + error);
        throw error;
    }
}

export async function updateUser(idName, data) {
    try {
        const response = await axios.put('http://localhost:3000/api/user/update/' + idName, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error); 
    }
}