import {react, useState} from "react";
import axios from 'axios'
import FirstStepLogin from "./FirstStepLogin";
import SecondStepLogin from "./SecondStepLogin";

const LoginModal = ({showModal, closeModal}) => {

    const [input, setInput] = useState("");
    const [existUsername, setExistUsername] = useState(true);
    const [stepNumber, setStepNumber] = useState(1);
    const [rightPassword, setRightPassword] = useState(true);

    const displayErrorUsername = () => {
        setExistUsername(false);
        setTimeout(() => {
            setExistUsername(true);
        }, 2000);
        return;
    }

    const displayErrorPassword = () => {
        setRightPassword(false);
        setTimeout(() => {
            setRightPassword(true);
        }, 2000);
        return;
    }

    const isUser = (idName) => {
        if(/\s+/.test(idName) || idName === "")
            displayErrorUsername();
        axios.get(`http://localhost:3000/api/user/isUser/${idName}`)
        .then((response) => {
            if(!response.data.isUser){
                displayErrorUsername();
            }
            else{
                setStepNumber(stepNumber+1);
            }
        })
        .catch((e) => console.log(e))
    }

    return(
        <div 
        className={`fixed inset-0 bg-white md:bg-gray-800 md:bg-opacity-50 flex md:items-center md:justify-center w-full flex-col
        ${showModal ? '' : 'hidden'}`}>
            <div className="flex flex-col w-full h-full p-3 md:p-3 md:bg-white md:rounded-xl md:w-[37rem] md:h-[40rem]">
                <section className="flex flex-row items-center justify-between">
                    <div className="">
                        <button onClick={closeModal}>close</button>
                    </div>
                    <h1 className="text-4xl font-bold">Y</h1>
                    <div className=""></div>
                </section>
                {(stepNumber===1) ? (
                    <FirstStepLogin input={input} setInput={setInput} isUser={isUser} closeModal={closeModal}/>
                ): (
                    <SecondStepLogin idName={input} displayError={displayErrorPassword}/>
                )}   
            </div>
            <p  className={`text-white bg-twitter-blue my-5 md:w-[25rem] h-10 text-center pt-2 ${!existUsername ? '' : 'hidden'}`}>Désolé, nous n'avons pas pu trouver votre compte.</p>
            <p  className={`text-white bg-twitter-blue my-5 md:w-[25rem] h-10 text-center pt-2 ${!rightPassword ? '' : 'hidden'}`}>Désolé, votre mot de passe n'est pas bon.</p>

        </div>
    )
}

export default LoginModal;