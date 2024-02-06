import React from "react";

const Post = ({ post }) => {

    function formatDate(dateString) {
        const months = [
            "janv.", "fév.", "mars", "avril", "mai", "juin",
            "jui.", "août", "sept.", "oct.", "nov.", "déc."
        ];

        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const month = months[monthIndex];

        return `${day} ${month}`;
    }

    return (
        <div className=" py-5 px-4 h-auto hover:bg-slate-50 md:w-[36rem] border-b border-r">
            <div className="">
                <div className="flex justify-between">
                    <div className="flex justify-start space-x-2 place-items-center">
                        <a className="font-bold hover:underline text-lg">{post.username}</a>
                        <p className="text-gray-500">{post.idName} ~ {formatDate(post.creationDate)}</p>
                    </div>
                    <button>p</button>
                </div>
                <p>{post.text}</p>
            </div>
            <div className="flex justify-evenly">
                <button>c {post.comments.length}</button>
                <button>r {post.retweets}</button>
                <button>l {post.likes}</button>
            </div>
        </div>
    )
}

export default Post;