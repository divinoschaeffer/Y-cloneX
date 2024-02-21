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
    const [imageName, setImageName] = useState('');
    const [isZoomed, setIsZoomed] = useState(false);
    const [subPost, setSubPost] = useState(null);
    const [originPost, setOriginPost] = useState(null);

    const navigate = useNavigate();

    function openPostModal(e){
        e.stopPropagation();
        setPostModalOpen(true);
    }

    const closePostModal = (e) => {
        setPostModalOpen(false);
    }

    function toggleZoom(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setIsZoomed(!isZoomed);
    }

    async function like(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        await likePost(post._id);
        getPosts();
    }

    async function removePost(e) {
        e.stopPropagation();

        if (post.username === user.username) {
            try {
                await deletePost(post._id);
                getPosts();
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function retweetPost() {
        const data = {
            'username': user.username,
            'text': input,
            'retweetOf': post._id,
            'image': imageName
        };
        try {
            await createPost(data);
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
    },[])

    return (
        <div className="cursor-pointer py-5 px-4 h-auto hover:bg-slate-50 w-full border-b border-r flex flex-col" onClick={(e) => handleNavigation(e,"/post/" + post._id)}>
            {(originPost) ? <p>En réponse à un <a className="text-twitter-blue hover:underline" href="#" onClick={(e) => handleNavigation(e,"/post/" + originPost._id)}>post</a> de <a>@{originPost.idName}</a></p> : null}
            <div className={`flex flex-col }`}>
                <div className="flex justify-between">
                    <div className="flex justify-start space-x-2 place-items-center">
                        <a className="font-bold hover:underline text-lg" href="#" onClick={(e) => {handleNavigation(e,"/profile/" + post.idName)}}>{post.username}</a>
                        <p className="text-gray-500" onClick={(e) => {handleNavigation(e,"/profile/" + post.idName)}}>@{post.idName} ~ {formatDate(post.creationDate)}</p>
                    </div>
                    {(post.username === user.username) ? <button onClick={removePost}>s</button> : null}
                </div>
                
                <p>{post.text}</p>
                {(post.image.length !== 0) ? <img 
                    src={"http://localhost:3000/api/" + post.image[0]} 
                    className={`max-h-64 self-center mb-4 transition-transform  ${isZoomed ? 'scale-150' : ''}`}
                    onClick={(e) => toggleZoom(e)}
                    /> : null}
            </div>
            {(subPost) ? <SubPost formatDate={formatDate} post={subPost}></SubPost> : null}
            <div className="flex justify-evenly">
                <a href="#" onClick={(e) => handleNavigation(e,"/post/" + post._id)}>c {post.comments.length}</a>
                <button onClick={(e) => openPostModal(e)}>r {post.retweets}</button>
                <button onClick={(e) => like(e)}>l {post.likes}</button>
            </div>
            <InputModal closeModal={closePostModal} modalOpen={postModalOpen} input={input} inputSubmit={retweetPost} setInput={setInput} setImage={setImageName}></InputModal>
        </div>
    )
}

export default Post;