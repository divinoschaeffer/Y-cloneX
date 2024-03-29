import React, { useEffect, useState } from "react";
import { getPost } from "../services/postServices";
import ListPosts from "./post/ListPosts";
import EditProfileModal from "./EditProfileModal";
import { useAuth } from "../context/AuthContext";


const ProfileComp = ({ chosenUser, fetchUser }) => {
    const {user} = useAuth();
    const [typePosts, setTypePosts] = useState(0);
    const [posts, setPosts] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    

    const openEditModal = () => {
        setEditModalOpen(true);
    }

    const closeEditModal = () => {
        setEditModalOpen(false);
    }

    async function fetchPosts(list){
        try{
            const listPromises = list.map(post => getPost(post));
            const postsData = await Promise.all(listPromises);
            setPosts(postsData);
        }catch(error){
            console.log(error);
        }
    }

    async function selectPosts(){
        switch (typePosts) {
            case 0:
                await fetchPosts(chosenUser.posts.slice(0,40));
                break;
            case 1:
                await fetchPosts(chosenUser.comments.slice(0,40));
                break;
            case 2:
                await fetchPosts(chosenUser.likes.slice(0,40));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        selectPosts();
    },[typePosts, posts])

    return (
        <div className="w-full border-r">
            <div className="pl-10 sticky top-0 bg-white bg-opacity-90">
                <h1 className="text-xl font-bold">{chosenUser.idName}</h1>
                <p className="text-sm text-gray-600 font-light">{chosenUser.posts.length} posts</p>
            </div>
            <div className="px-4 space-y-4 border-b">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-xl font-bold">{chosenUser.username}</h1>
                        <p className="text-l text-gray-600 font-light">@{chosenUser.idName}</p>
                    </div>
                    {(chosenUser.idName === user.idName) ? <button className="font-bold border rounded-full px-4" onClick={() => openEditModal()}>Editer le profil</button> : null}
                </div>
               
                <p>{chosenUser.bio}</p>
                <div className="flex h-[3rem]">
                    <button className={"hover:bg-slate-200 flex-1" + (typePosts === 0 ? " font-bold border-b-2 border-twitter-blue" : "")} onClick={() => setTypePosts(0)}>
                        Posts
                    </button>
                    <button className={"hover:bg-slate-200 flex-1" + (typePosts === 1 ? " font-bold border-b-2 border-twitter-blue" : "")} onClick={() => setTypePosts(1)}>
                        Réponses
                    </button>
                    <button className={"hover:bg-slate-200 flex-1" + (typePosts === 2 ? " font-bold border-b-2 border-twitter-blue" : "")} onClick={() => setTypePosts(2)}>
                        J'aime
                    </button>
                </div>
            </div>
            {(posts) ? <ListPosts listPosts={posts} getPosts={() => {}}></ListPosts> : null}
            <EditProfileModal closeModal={closeEditModal} modalOpen={editModalOpen} user={chosenUser} fetchUser={fetchUser}></EditProfileModal>
        </div>
    )

}

export default ProfileComp;