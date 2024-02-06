import React from "react";
import Post from "./Post";

const ListPosts  = ({listPosts}) => {

    const list = listPosts.reverse().map((post) => <Post post={post} key={post._id}></Post>)

    return(
        <div className="w-full">
            {list}
        </div>
    )
}

export default ListPosts;