import react from "react"
import '../css/home.css'

function Home(){

    return(
           <div className="flex flex-row h-full">
                <section className="basis-1/2 h-screen flex justify-center items-center">
                        <h1 className="logo">Y</h1>
                </section>
                <section className="basis-1/2 h-screen flex flex-col space-y-10 justify-center min-h-fit">
                    <div className="space-y-20  ">
                        <h1 className="text-7xl font-bold w-5/6">Ça se passe <br/> maintenant</h1>
                        <h2 className="text-4xl font-bold">Inscrivez-vous.</h2>
                    </div>
                        <div className="w-1/3 h-1/3 space-y-1">
                            <button className="bg-twitter-blue text-white w-full rounded-full font-bold h-10 hover:bg-[#1d9bf0]">
                                Créer un compte
                            </button>
                            <p className="text-xs text-gray-500">En vous inscrivant, vous acceptez les 
                                <span className="text-twitter-blue">Conditions d'utilisation</span> et la 
                                <span className="text-twitter-blue">Politique de confidentialité</span>, notamment <span className="text-twitter-blue">l'Utilisation des cookies</span>.
                            </p>
                            <div className="space-y-5 h-3/7">
                                <h3 className="font-semibold text-l mt-10">
                                    Vous avez déjà un compte ?
                                </h3 >
                                <button className="h-10 font-bold text-twitter-blue bg-white text-center w-full border border-gray-300  rounded-full hover:bg-twitter-blue/10">
                                    Se connecter
                                </button>
                            </div>
                        </div>     
                </section>
           </div>
    )
}

export default Home;