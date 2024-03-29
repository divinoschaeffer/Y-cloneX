import { useState } from "react";
import DateSelector from "../DateSelector";
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isAlreadyUser } from "../../services/userServices";
import { signToAPI } from "../../services/authServices";


const SignInModal = ({showModal, closeModal}) => {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifPassword, setVerifPassword] = useState("");

    const [alreadyUse, setAlreadyUse] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [textError, setTextError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const displayAlreadyUse = () => {
        setAlreadyUse(true);
        setTimeout(() => {
            setAlreadyUse(false);
        }, 4000);
        return;
    }

    const displayWrongPassword = (text) => {
        setTextError(text);
        setWrongPassword(true);
        setTimeout(() => {
            setWrongPassword(false);
        }, 4000);
        return;
    }

    const isUser = async (idName) => {
        if(/\s+/.test(idName) || idName === "")
            displayAlreadyUse();
        try {
            const result = await isAlreadyUser(idName);
            if(result){
                displayAlreadyUse();
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }

    const goodPassword = () => {
        if(/\s+/.test(password) || password === ""){
            displayWrongPassword("Votre mot de passe est trop faible");
            return false;
        }
        if(password.length < 6){
            displayWrongPassword("Votre mot de passe est trop court");
            return false;
        }
        if(password !== verifPassword){
            displayWrongPassword("Les mots de passe ne correspondent pas");
            return false;
        }
        return true;
    }

    const createAccount = async () => {
        if(await isUser(username)){
            displayAlreadyUse();
            return;
        }
        else if(!goodPassword()){
            return;
        }
        else{
            const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`;
            const data = {
                'idName': username,
                'username': username,
                'password': password,
                'birthDate': formattedDate
            };
            try {
                const user = await signToAPI(data);
                login(user);
                navigate('/home', {replace: true});
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <div 
        className={`fixed inset-0 bg-white md:bg-gray-800 md:bg-opacity-50 flex md:items-center md:justify-center w-full flex-col
        ${showModal ? '' : 'hidden'}`}>
            <div className="flex flex-col w-full h-full p-3 md:p-3 md:bg-white md:rounded-xl md:w-[37rem] md:h-[40rem] items-center space-y-8">
                <header className="flex flex-row self-start space-x-10">
                    <button onClick={closeModal}>C</button>
                </header>
                <section className="flex flex-col md:w-[28rem] items-center space-y-5">
                    <h1 className=" self-start text-3xl font-bold">Créer votre compte</h1>

                    <input placeholder="Nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} value={username}
                    className="border w-full h-10 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2"></input>
                    <p className={`bg-twitter-blue text-white w-full text-center ${alreadyUse ? "" : "hidden"}`}>Ce nom d'utilisateur est déjà utilisé</p>

                    <input placeholder="Mot de passe" type="password" onChange={(e) => setPassword(e.target.value)} value={password}
                    className="border w-full h-10 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2"></input>

                    <input placeholder="Confirmez votre mot de passe" type="password" onChange={(e) => setVerifPassword(e.target.value)} value={verifPassword}
                    className="border w-full h-10 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2"></input>
                    <p className={`bg-twitter-blue text-white w-full text-center ${wrongPassword ? "" : "hidden"}`}>{textError}</p>

                    <div className="space-y-2">
                        <h6 className="text-l font-semibold">Date de naissance</h6>
                        <p className="text-sm text-gray-500 font-semibold">Cette information ne sera pas affichée publiquement. Confirmez votre âge, même si ce compte est pour une entreprise, un animal de compagnie ou autre chose.</p>
                        <DateSelector 
                            selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDay={selectedDay}
                            setSelectedYear={setSelectedYear} setSelectedMonth={setSelectedMonth} setSelectedDay={setSelectedDay}
                        ></DateSelector>
                    </div>
                </section>
                <footer className="">
                    <button className={`rounded-full bg-black font-semibold text-white w-[24rem] md:w-[28rem] ${(wrongPassword || alreadyUse)? 'md:mt-2' :'md:mt-16'} h-12 mt-72`}
                    onClick={async () => await createAccount()}
                    >
                        Créer mon compte
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default SignInModal;