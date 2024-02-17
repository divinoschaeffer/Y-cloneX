import axios from "axios";

export const getPosts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/post/get-all', { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const getPost = async (id) => {
    try {
        const response = await axios.get("http://localhost:3000/api/post/get/" + id, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error fetching post:", error);
        throw error;
    }
};

export const createPost = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/api/post/create', data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error creating post:", error);
        throw error;
    }
}

export const likePost = async (id) => {
    try {
        await axios.put('http://localhost:3000/api/post/like/' + id, {}, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (id) => {
    try {
        await axios.delete('http://localhost:3000/api/post/delete/' + id, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}