import React from "react";
import Post from "./Post";

const ListPosts  = ({listPosts, getPosts}) => {

    const list = listPosts.map((post) => <Post post={post} getPosts={getPosts} key={post._id}></Post>);
    list.reverse();

    return(
        <div className="w-full">
            {list}
        </div>
    )
}

export default ListPosts;