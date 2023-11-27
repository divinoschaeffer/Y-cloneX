import CreatePostModal from "../components/CreatePostModal";
import { useState } from "react";
import Menu from "../components/Menu";


const Home = () => {
    const [postModalOpen, setPostModalOpen] = useState(false);

    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false);
    }

    return(
        <div className="flex flex-row w-full">
            <Menu openPostModal={openPostModal}></Menu>
            <CreatePostModal closeModal={closePostModal} modalOpen={postModalOpen}></CreatePostModal>
        </div>
    )
}

export default Home;