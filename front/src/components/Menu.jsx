import { useAuth } from "../context/AuthContext";
import homeIcon from '../icons/homepage.png'
import accountIcon from '../icons/account.png'
import bookmarkIcon from '../icons/bookmark.png'
import messageIcon from '../icons/message.png';
import moreIcon from '../icons/more.png';
import notifIcon from '../icons/notification.png';
import exploreIcon from '../icons/search.png';
import { useState } from "react";


const Menu = ({openPostModal}) => {

    const {user, login, logout} = useAuth();
    

    return (
        <div className="flex flex-col w-1/4 h-screen items-end border-r-2 min-w-[5rem] sticky top-0">
            <div className=" mr-1 xl:mr-8 space-y-4 flex flex-col items-center xl:items-start">
                <h1 className="text-4xl text-center font-bold border border-white hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">Y</h1>
                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4" href="/home">
                    <img src={homeIcon} alt="homepage icon" className="h-7 w-7"></img>
                    <p className="text-xl font-semibold hidden xl:block">Accueil</p>
                </a>

                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">
                    <img src={exploreIcon} className="h-8 w-8"></img>
                    <p className="text-xl hidden xl:block">Explorer</p>
                </a>
                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">
                    <img src={notifIcon} className="h-6 w-6"></img>
                    <p className="text-xl hidden xl:block">Notifications</p>
                </a>
                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">
                    <img src={messageIcon} className="h-7 w-7"></img>
                    <p className="text-xl hidden xl:block">Messages</p>
                </a>
                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">
                    <img src={bookmarkIcon} className="h-7 w-7"></img>
                    <p className="text-xl hidden xl:block">Signets</p>
                </a>
                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">
                    <img src={accountIcon} className="h-7 w-7"></img>
                    <p className="text-xl hidden xl:block">Profil</p>
                </a>
                <a className="flex flex-row space-x-4 items-center border border-white hover:border hover:rounded-full hover:bg-gray-200 w-fit py-2 px-4">
                    <img src={moreIcon} className="h-7 w-7"></img>
                    <p className="text-xl hidden xl:block">Plus</p>
                </a>
                <button className="rounded-full bg-twitter-blue border border-white text-white font-bold xl:w-[14rem] xl:h-[3rem] w-fit flex items-center justify-center"
                onClick={() => openPostModal()}
                >
                    <p className="hidden xl:block">Poster</p>
                    <p className="text-4xl xl:hidden pb-2 px-3">+</p>
                </button>
            </div>
        </div>
    )
}

export default Menu;