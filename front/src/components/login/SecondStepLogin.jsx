import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginToAPI } from "../../services/authServices";
// import dotenv from '';
// dotenv.config();

const SecondStepLogin = ({idName, displayError}) =>{

    const [password, setPassword] = useState ("");
    const {login} = useAuth();
    const navigate = useNavigate();

    const setupLogin = async () => {
        const data = {
            "idName": idName,
            "password": password
        }
        try {
            const user = await loginToAPI(data);
            login(user);
            navigate('/home', {replace: true});
        } catch (error) {
            displayError();
        }
    }

    return(
        <div className="flex flex-col items-center">
            <section className="flex flex-col mt-10 space-y-5">
                <h1 className="font-bold text-3xl">Entrez votre mot de passe</h1>
                <div>
                <input className="w-full md:w-full h-14 text-gray-400 bg-gray-100 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2" 
                    type="text"
                    value={idName}
                    disabled={true}
                >
                </input>
                </div>
                <div>
                <input className=" border w-full h-14 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2 md:w-full" 
                    placeholder="Mot de passe" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                </input>
                    <p className="text-twitter-blue text-xs">Mot de passe oublié ?</p>
                </div>
            </section>
            <section className="mt-[20rem] w-full h-12 md:mt-[15rem] md:w-[23rem]">
                <button className="border rounded-full w-full h-full text-white font-bold bg-black"
                onClick={async () => await setupLogin()}
                >Se connecter</button>
            </section>
        </div>
    )
}

export default SecondStepLogin;