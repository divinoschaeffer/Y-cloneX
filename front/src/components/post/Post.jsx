import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import InputModal from "../InputModal";
import SubPost from "./SubPost";
import { useNavigate } from "react-router-dom";
import { createPost, getPost, likePost, deletePost } from "../../services/postServices";

const Post = ({ post, getPosts }) => {
    const { user } = useAuth();
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [input, setInput] = useState("");
    const [subPost, setSubPost] = useState(null);
    const [originPost, setOriginPost] = useState(null);

    const navigate = useNavigate();


    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    async function like(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        await likePost(post._id);
        getPosts();
    }

    async function removePost(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();

        if (post.username == user.username) {
            try {
                await deletePost(post._id);
                getPosts();
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function retweetPost(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        const data = {
            'username': user.username,
            'text': input,
            'retweetOf': post._id
        };
        try {
            const post = await createPost(data);
            setInput("");
            closePostModal();
            getPosts();
        } catch (error) {
            console.log(error);
        }
    }

    function formatDate(dateString) {
        const months = [
            "janv.", "fév.", "mars", "avril", "mai", "juin",
            "jui.", "août", "sept.", "oct.", "nov.", "déc."
        ];

        const date = new Date(dateString);
        const now = new Date();
        const diffInMilliseconds = now - date;

        // Convertir la différence en heures et en minutes
        const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

        if (diffInHours < 24) {
            if (diffInHours > 0) {
                return `${diffInHours} h`;
            } else {
                return `${diffInMinutes} mn`;
            }
        } else {
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const month = months[monthIndex];
            return `${day} ${month}`;
        }
    }

    async function displayRetweet() {
        if (post.retweetOf[0]) {
            try {
                const data = await getPost(post.retweetOf[0]);
                setSubPost(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function displayOriginPost() {
        if (post.responseTo[0]) {
            try {
                const data = await getPost(post.responseTo[0]);
                setOriginPost(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleNavigation = (e, link) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        navigate(link);
    }

    useEffect(() => {
        if (!subPost) {
            displayRetweet();
        }
        if (!originPost) {
            displayOriginPost();
        }
    }, [])

    return (
        <div className=" py-5 px-4 h-auto hover:bg-slate-50 md:w-[36rem] border-b border-r flex flex-col" onClick={(e) => handleNavigation(e,"/post/" + post._id)}>
            {(originPost) ? <p>En réponse à un <a className="text-twitter-blue hover:underline" href="#" onClick={(e) => handleNavigation(e,"/post/" + originPost._id)}>post</a> de <a>@{originPost.idName}</a></p> : null}
            <div className="">
                <div className="flex justify-between">
                    <div className="flex justify-start space-x-2 place-items-center">
                        <a className="font-bold hover:underline text-lg">{post.username}</a>
                        <p className="text-gray-500">@{post.idName} ~ {formatDate(post.creationDate)}</p>
                    </div>
                    {(post.username == user.username) ? <button onClick={removePost}>s</button> : null}
                </div>
                <p>{post.text}</p>
            </div>
            {(subPost) ? <SubPost formatDate={formatDate} post={subPost}></SubPost> : null}
            <div className="flex justify-evenly">
                <a href="#" onClick={(e) => handleNavigation(e,"/post/" + post._id)}>c {post.comments.length}</a>
                <button onClick={(e) => openPostModal(e)}>r {post.retweets}</button>
                <button onClick={(e) => like(e)}>l {post.likes}</button>
            </div>
            <InputModal closeModal={closePostModal} modalOpen={postModalOpen} input={input} inputSubmit={retweetPost} setInput={setInput}></InputModal>
        </div>
    )
}

export default Post;