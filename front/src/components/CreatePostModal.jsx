import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import InputModal from "./InputModal";

const CreatePostModal = ({closeModal, modalOpen, getPosts}) => {

    const {user} = useAuth();
    const [text, setText] = useState("");

    const createPost = () =>{
        const data = {
            'username': user.username,
            'text': text,
        };
        axios.post('http://localhost:3000/api/post/create', data, {withCredentials: true})
        .then(() => {
            setText("");
            closeModal();
            getPosts();
        })
        .catch((err) => console.log(err));
    }


    return (
        <InputModal closeModal={closeModal} modalOpen={modalOpen} input={text} setInput={setText} inputSubmit={createPost}></InputModal>
    )
}

export default CreatePostModal;