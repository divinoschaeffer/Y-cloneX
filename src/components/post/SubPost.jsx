import react from 'react';

const SubPost = ({post, formatDate, handleNavigation}) => {

    return (
            <div className="border m-2 flex flex-col justify-center w-5/6 self-center rounded p-2" onClick={(e) => handleNavigation(e,"/post/" + post._id)}>
                <div className="flex justify-between">
                    <div className="flex justify-start space-x-2 place-items-center">
                        <a className="font-bold hover:underline text-lg">{post.username}</a>
                        <p className="text-gray-500">{post.idName} ~ {formatDate(post.creationDate)}</p>
                    </div>
                </div>
                <p>{post.text}</p>
                {(post.image.length !== 0) ? <img src={process.env.REACT_APP_API_URL + post.image[0]} className='max-h-24 self-center'/> : null}
            </div>
    )
}

export default SubPost;