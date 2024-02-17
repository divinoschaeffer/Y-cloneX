import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import InputModal from "./InputModal";
import { createPost } from "../services/postServices";

const CreatePostModal = ({closeModal, modalOpen, getPosts}) => {

    const {user} = useAuth();
    const [text, setText] = useState("");

    async function publishPost(){
        const data = {
            'username': user.username,
            'text': text,
        };
        try {
            const post = await createPost(data);
            setText("");
            closeModal();
            getPosts();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <InputModal closeModal={closeModal} modalOpen={modalOpen} input={text} setInput={setText} inputSubmit={publishPost}></InputModal>
    )
}

export default CreatePostModal;