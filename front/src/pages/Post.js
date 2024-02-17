import Menu from "../components/Menu";
import CreatePostModal from "../components/CreatePostModal";
import { useEffect, useState } from "react";
import OpenPost from "../components/post/OpenPost";
import { useLocation, useParams } from "react-router-dom";
import { getPost } from "../services/postServices";

const Post = () => {
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [post, setPost] = useState(null);
    let {id} = useParams();

    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    async function fetchPost(){
        try {
            const data = await getPost(id);
            setPost(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPost();
    },[id])

    return(
        <div className="flex flex-row w-full h-full">
            <Menu openPostModal={openPostModal} ></Menu>
            {(post !== null) ? <OpenPost post={post} fetchPost={fetchPost}></OpenPost> : null}
            <CreatePostModal closeModal={closePostModal} modalOpen={postModalOpen} getPosts={() => {}}></CreatePostModal>
        </div>
    )
}

export default Post;