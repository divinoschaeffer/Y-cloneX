import { useState } from "react";
import { updateUser } from "../services/userServices";


const EditProfileModal = ({closeModal, modalOpen, user, fetchUser}) => {
    const [bio, setBio] = useState(user.bio);

    async function dataUpdate(){
        const data = {
            "bio": bio
        }
        try {
            await updateUser(user.idName, data);
            fetchUser();
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`fixed inset-0 bg-white md:bg-gray-800 md:bg-opacity-50 flex md:items-center md:justify-center w-full flex-col ${(modalOpen) ? '' : 'hidden'}`}>
            <div className="flex flex-col w-full h-full py-3 px-10 md:bg-white md:rounded-xl md:w-[37rem] md:h-[15rem] space-y-8">
                <div className="flex flex-row space-x-4 items-center w-full">
                    <button onClick={() => closeModal()}>
                        <p>x</p>
                    </button>
                    <h1 className="font-bold">Editer le profil</h1>
                </div>
                <div>
                    <div>
                        <label>Bio</label>
                        <input 
                        className=" border w-full h-14 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2 md:w-full" 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}
                        ></input>
                    </div>
                </div>
                <button 
                className=" border focus:outline-none focus:border-2 rounded-full px-2 w-full md:w-auto text-white bg-black"
                onClick={() => dataUpdate()}
                >Enregistrer</button>
            </div>
        </div>
    );
}

export default EditProfileModal;