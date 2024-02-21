import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export async function getImage(id){
    
}

export async function downloadImage(e){
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try{
        const response = await axios.post(API + 'image/upload', formData, {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}})
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}