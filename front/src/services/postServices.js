import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const getPosts = async () => {
    try {
        const response = await axios.get(API + 'post/get-all', { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const getPost = async (id) => {
    try {
        const response = await axios.get(API + "post/get/" + id, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error fetching post:", error);
        throw error;
    }
};

export const createPost = async (data) => {
    try {
        const response = await axios.post(API + 'post/create', data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error creating post:", error);
        throw error;
    }
}

export const likePost = async (id) => {
    try {
        await axios.put(API + 'post/like/' + id, {}, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (id) => {
    try {
        await axios.delete(API + 'post/delete/' + id, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}