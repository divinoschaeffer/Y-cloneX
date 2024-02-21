import CreatePostModal from "../components/CreatePostModal";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import ListPosts from "../components/post/ListPosts";
import { getPosts } from "../services/postServices";


const Home = () => {
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [listPosts, setListsPosts] = useState([]);

    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    async function fetchPosts() {
        try {
            const posts = await getPosts();
            if(posts.length !== 0)
                setListsPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="flex flex-row w-full">
            <Menu openPostModal={openPostModal} ></Menu>
            <ListPosts listPosts={listPosts} getPosts={fetchPosts} ></ListPosts>
            <CreatePostModal closeModal={closePostModal} modalOpen={postModalOpen} getPosts={fetchPosts}></CreatePostModal>
        </div>
    )
}

export default Home;