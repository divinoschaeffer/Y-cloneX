import react, { useState } from "react"
import LoginModal from "../components/LoginModal";

function Home(){

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const openLoginModal = () => {
        setLoginModalOpen(true);
      };
    
      const closeLoginModal = () => {
        setLoginModalOpen(false);
      };

    return(
           <div className="flex flex-col lg:flex-row lg:h-full p-10 lg:p-0  lg:space-y-0 items-center">
                <section className="lg:basis-1/2 lg:h-screen lg:flex lg:justify-center lg:items-center mb-10 lg:mb-0 w-full md:w-1/2">
                        <h1 className="text-6xl md:text-8xl lg:text-full" >Y</h1>
                </section>
                <section className="lg:basis-1/2 lg:h-screen flex flex-col lg:space-y-10 space-y-5 justify-center min-h-fit">
                    <div className="lg:space-y-20 space-y-10 ">
                        <h1 className="md:text-7xl text-5xl font-bold lg:w-5/6">Ça se passe <br/> maintenant</h1>
                        <h2 className="md:text-4xl text-xl font-bold">Inscrivez-vous.</h2>
                    </div>
                        <div className="lg:w-1/3 lg:h-1/3 w-80 space-y-1">
                            <button className="bg-twitter-blue text-white w-full rounded-full font-bold h-10 hover:bg-[#1d9bf0]">
                                Créer un compte
                            </button>
                            <p className="text-xs text-gray-500">En vous inscrivant, vous acceptez les 
                                <span className="text-twitter-blue">Conditions d'utilisation</span> et la 
                                <span className="text-twitter-blue">Politique de confidentialité</span>, notamment <span className="text-twitter-blue">l'Utilisation des cookies</span>.
                            </p>
                            <div className="space-y-5 h-3/7 ">
                                <h3 className="font-semibold text-l mt-10">
                                    Vous avez déjà un compte ?
                                </h3 >
                                <button className="h-10 font-bold text-twitter-blue bg-white text-center w-full border border-gray-300  rounded-full hover:bg-twitter-blue/10"
                                    onClick={openLoginModal}
                                >
                                    Se connecter
                                </button>
                            </div>
                        </div>     
                </section>
                <LoginModal showModal={loginModalOpen} closeModal={closeLoginModal}></LoginModal>
           </div>
    )
}

export default Home;