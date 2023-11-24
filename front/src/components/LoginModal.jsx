import {react, useState} from "react";

const LoginModal = ({showModal, closeModal}) => {
    return(
        <div 
        className={`fixed inset-0 bg-white md:bg-gray-800 md:bg-opacity-50 flex md:items-center md:justify-center w-full
        ${showModal ? '' : 'hidden'}`}>
            <div className="flex flex-col w-full h-full m-3 space-y-60 md:p-3 md:bg-white md:rounded-xl md:space-y-20 md:w-[37rem] md:h-[40rem]">
                <section className="flex flex-row items-center justify-between">
                    <div className="">
                        <button onClick={closeModal}>close</button>
                    </div>
                    <h1 className="text-4xl font-bold">Y</h1>
                    <div className=""></div>
                </section> 
                <section className="flex flex-col items-center justify-center space-y-6">
                    <h1 className="font-bold text-2xl md:text-3xl">Connectez-vous à Y</h1>
                    <input className="border w-3/4 md:w-1/2 h-10 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2" placeholder="Nom d'utilisateur" ></input>
                    <button className="text-white font-bold bg-black rounded-full w-3/4 md:w-1/2 h-10">Suivant</button>
                    <button className="font-bold bg-white rounded-full border-gray-300 border w-3/4 md:w-1/2 h-10">Mot de passe oublié ?</button>
                    <div className="flex flex-row">
                        <p className="text-gray-600">Vous n'avez pas de compte ? </p>
                        <button className="text-twitter-blue" onClick={closeModal}> Inscrivez-vous</button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default LoginModal;