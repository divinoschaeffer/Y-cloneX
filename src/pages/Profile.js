import React, {useEffect} from "react";
import Menu from "../components/Menu";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CreatePostModal from "../components/CreatePostModal";
import ProfileComp from "../components/ProfileComp";
import { getUser } from "../services/userServices";

const Profile = () => {
    const {idName} = useParams();
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    
    async function fetchUser(){
        try {
            const tmp = await getUser(idName);
            setUser(tmp);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser()
    },[idName])

    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    return (
        <div className="flex md:flex-row w-full flex-col-reverse">
            <Menu openPostModal={openPostModal}></Menu>
            {(user) ? <ProfileComp chosenUser={user} fetchUser={fetchUser}></ProfileComp> : null}
            <CreatePostModal closeModal={closePostModal} modalOpen={postModalOpen} getPosts={fetchUser}></CreatePostModal>
        </div>
    )
}

export default Profile;