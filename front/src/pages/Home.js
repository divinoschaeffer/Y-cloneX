import CreatePostModal from "../components/CreatePostModal";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Post from "../components/post/Post";
import ListPosts from "../components/post/ListPosts";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { json } from "react-router-dom";


const Home = () => {
    const { user } = useAuth();
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [listPosts, setListsPosts] = useState([]);
    const [userData, setUserData] = useState(null);

    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    const getPosts = async () => {
        await axios.get('http://localhost:3000/api/post/get-all', { withCredentials: true })
            .then((res) => {
                setListsPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async function getUSer() {
        await axios.get('http://localhost:3000/api/user/' + user.idName, { withCredentials: true })
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {

        if (listPosts.length === 0)
            getPosts();
        if (userData === null)
            getUSer();
    })

    return (
        <div className="flex flex-row w-full">
            <Menu openPostModal={openPostModal} ></Menu>
            <ListPosts listPosts={listPosts} getPosts={getPosts} ></ListPosts>
            <CreatePostModal closeModal={closePostModal} modalOpen={postModalOpen} getPosts={getPosts}></CreatePostModal>
        </div>
    )
}

export default Home;