import { useAuth } from "../context/AuthContext";
import homeIcon from '../icons/homepage.png'
import accountIcon from '../icons/account.png'
import { useState } from "react";


const Menu = ({openPostModal}) => {

    const {user} = useAuth();
    

    return (
        <div className="bg-white flex md:flex-col md:w-1/4 w-full md:h-screen items-end md:border-r-2 min-w-[5rem] md:sticky fixed md:top-0 bottom-0">
            <div className="w-full md:w-auto md:mr-1 xl:mr-8 md:space-y-4 flex md:flex-col items-center xl:items-start justify-evenly md:justify-normal">
                <h1 className="text-4xl text-center font-bold hidden md:visible border border-white hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">Y</h1>
                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4" href="/home">
                    <img src={homeIcon} alt="homepage icon" className="h-7 w-7"></img>
                </a>
                <a href={"/profile/" + user.idName}className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">
                    <img src={accountIcon} className="h-7 w-7"></img>
                </a>
                
                <button className="rounded-full bg-twitter-blue border border-white text-white font-bold xl:w-[14rem] xl:h-[3rem] w-fit flex items-center justify-center"
                onClick={() => openPostModal()}
                >
                    <p className="text-4xl xl:hidden pb-2 px-3.5">+</p>
                </button>
            </div>
        </div>
    )
}

export default Menu;