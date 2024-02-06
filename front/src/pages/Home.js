import CreatePostModal from "../components/CreatePostModal";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Post from "../components/post/Post";
import ListPosts from "../components/post/ListPosts";
import axios from "axios";


const Home = () => {
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [listPosts, setListsPosts] = useState([]);

    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    const getPosts = async () => {
        await axios.get('http://localhost:3000/api/post/get-all', {withCredentials: true})
        .then((res) => {
            setListsPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
     useEffect(() => {

        if(listPosts.length === 0)
            getPosts();
     })

    return(
        <div className="flex flex-row w-full">
            <Menu openPostModal={openPostModal}></Menu>
            <ListPosts listPosts={listPosts}></ListPosts>
            <CreatePostModal closeModal={closePostModal} modalOpen={postModalOpen}></CreatePostModal>
        </div>
    )
}

export default Home;