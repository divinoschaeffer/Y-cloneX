import react from "react"
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home(){

    return(
        <div>
           <section>
                <h1>Y</h1>
           </section>
           <section>
                <h1>Ça se passe maintenant</h1>
                <h2>Inscrivez-vous.</h2>
                <div>
                    <Button>Créer un compte</Button>
                    <p></p>
                </div>
                <div>
                    <h3>
                        Vous avez déjà un compte ?
                    </h3>
                    <Button>Se connecter</Button>
                </div>
           </section>
        </div>
    )
}

export default Home;