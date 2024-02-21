
const FirstStepLogin = ({input, setInput, closeModal, isUser}) => {
    return(
                <section className="flex flex-col items-center justify-center space-y-6 mt-60 md:mt-20">
                    <h1 className="font-bold text-2xl md:text-3xl">Connectez-vous à Y</h1>
                    <input className="border w-3/4 md:w-1/2 h-10 focus:border-twitter-blue focus:outline-none focus:border-2 rounded px-2" 
                    placeholder="Nom d'utilisateur" 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    >

                    </input>
                    <button className="text-white font-bold bg-black rounded-full w-3/4 md:w-1/2 h-10"
                    onClick={async () => await isUser(input)}
                    >Suivant</button>
                    <button className="font-bold bg-white rounded-full border-gray-300 border w-3/4 md:w-1/2 h-10">Mot de passe oublié ?</button>
                    <div className="flex flex-row">
                        <p className="text-gray-600">Vous n'avez pas de compte ? </p>
                        <button className="text-twitter-blue" onClick={closeModal}> Inscrivez-vous</button>
                    </div>
                </section>
    )
}

export default FirstStepLogin;