import React, { useEffect, useState } from "react";
import Post from "./Post";
import { createPost, getPost } from "../../services/postServices";
import { downloadImage } from "../../services/imageServices";
import ListPosts from "./ListPosts";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const OpenPost = ({ post, fetchPost }) => {
    const { user } = useAuth();
    const [input, setInput] = useState('');
    const [image, setImage] = useState('');
    const [comments, setComments] = useState([]);
    let {id} = useParams();

    async function fetchComments() {
        try {
            const commentPromises = post.comments.map(comment => getPost(comment));
            const commentsData = await Promise.all(commentPromises);
            setComments(commentsData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [post, id])

    async function createComment(){
        const data = {
            'username': user.username,
            'text': input,
            'responseTo': post._id,
            'image': image
        };
        try {
            await createPost(data);
            fetchPost();
            setInput("");
        } catch (error) {
            console.log(error);
        }
    }

    async function uploadImageAPI(e){
        try {
            const data = await downloadImage(e);
            setImage(data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-col w-full">
            <div className="flex border-r space-x-8 pl-4">
                <h1 className="font-bold text-xl">Poster</h1>
            </div>

            <Post post={post} getPosts={fetchPost}></Post>

            <div className="flex flex-col border-b border-r p-4 space-y-3">
                <p>En réponse à <span className="text-twitter-blue">@{post.idName}</span></p>

                <div className="flex justify-between w-full">
                    <textarea
                        placeholder="Postez votre réponse"
                        className="focus-visible:outline-none h-auto w-3/4"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    >
                    </textarea>
                    <button
                        className="rounded-full bg-twitter-blue text-white font-bold w-[6rem] h-[2rem] disabled:opacity-50"
                        disabled={input === '' && image === ''}
                        onClick={createComment}
                    >
                        Répondre
                    </button>
                </div>
                <input type="file" onChange={(e) => uploadImageAPI(e)}></input>
            </div>
            {(comments != []) ? <ListPosts listPosts={comments} getPosts={fetchComments}></ListPosts> : null}
        </div>
    )
}

export default OpenPost;