import react from 'react';

const SubPost = ({post, formatDate}) => {

    return (
            <div className="border m-2 flex flex-col justify-center w-5/6 self-center rounded p-2">
                <div className="flex justify-between">
                    <div className="flex justify-start space-x-2 place-items-center">
                        <a className="font-bold hover:underline text-lg">{post.username}</a>
                        <p className="text-gray-500">{post.idName} ~ {formatDate(post.creationDate)}</p>
                    </div>
                </div>
                <p>{post.text}</p>
            </div>
    )
}

export default SubPost;