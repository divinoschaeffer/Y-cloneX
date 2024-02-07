import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import closeIcon from "../icons/close.png";
import axios from "axios";

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
        <div className={`fixed inset-0 bg-white md:bg-gray-800 md:bg-opacity-50 flex md:items-center md:justify-center w-full flex-col ${(modalOpen) ? '' : 'hidden'}`}>
            <div className="flex flex-col w-full h-full py-3 px-10 md:bg-white md:rounded-xl md:w-[37rem] md:h-[16rem] items-center space-y-8">
                <div className="flex flex-row justify-between items-center w-full">
                    <button onClick={() => closeModal()}>
                        <img src={closeIcon} className="h-4 w-4"></img>
                    </button>
                    <button className="rounded-full bg-twitter-blue text-white font-bold w-[5rem] h-[2rem]"
                    onClick={() => createPost()}
                    >Poster</button>
                </div>
                <div className="w-full min-h-[8rem] border-b-2">
                    <textarea placeholder="Quoi de neuf?!" className="text-xl w-full h-full focus-visible:outline-none pt-0 pl-0"
                    onChange={(e) => setText(e.target.value)} value={text}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default CreatePostModal;