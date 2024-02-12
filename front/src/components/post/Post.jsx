import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import InputModal from "../InputModal";

const Post = ({ post, getPosts }) => {
    const { user } = useAuth();
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [input, setInput] = useState("");


    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    async function likePost(){
        await axios.put('http://localhost:3000/api/post/like/' + post._id, {}, {withCredentials: true})
        .then((res) => {
            getPosts();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    async function deletePost(){
        if(post.username == user.username){
            await axios.delete('http://localhost:3000/api/post/delete/' + post._id, {withCredentials: true})
            .then((res) => {
                getPosts();
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    async function retweetPost(){
        const data = {
            'username': user.username,
            'text': input,
            'retweetOf': post._id
        };
        axios.post('http://localhost:3000/api/post/create', data, {withCredentials: true})
        .then(() => {
            setInput("");
            closePostModal();
            getPosts();
        })
        .catch((err) => console.log(err));
    }

    function formatDate(dateString) {
        const months = [
            "janv.", "fév.", "mars", "avril", "mai", "juin",
            "jui.", "août", "sept.", "oct.", "nov.", "déc."
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const month = months[monthIndex];

        return `${day} ${month}`;
    }

    return (
        <div className=" py-5 px-4 h-auto hover:bg-slate-50 md:w-[36rem] border-b border-r">
            <div className="">
                <div className="flex justify-between">
                    <div className="flex justify-start space-x-2 place-items-center">
                        <a className="font-bold hover:underline text-lg">{post.username}</a>
                        <p className="text-gray-500">{post.idName} ~ {formatDate(post.creationDate)}</p>
                    </div>
                    {(post.username == user.username) ? <button onClick={deletePost}>s</button> : null }   
                </div>
                <p>{post.text}</p>
            </div>
            <div className="flex justify-evenly">
                <button>c {post.comments.length}</button>
                <button onClick={() => openPostModal()}>r {post.retweets}</button>
                <button onClick={likePost}>l {post.likes}</button>
            </div>
            <InputModal closeModal={closePostModal} modalOpen={postModalOpen} input={input} inputSubmit={retweetPost} setInput={setInput}></InputModal>
        </div>
    )
}

export default Post;