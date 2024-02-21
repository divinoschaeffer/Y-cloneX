import { downloadImage } from "../services/imageServices";
import closeIcon from "../icons/close.png";

const InputModal = ({closeModal, modalOpen, input, setInput, inputSubmit, setImage}) => {

    async function uploadImageAPI(e){
        try {
            const data = await downloadImage(e);
            setImage(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`fixed inset-0 bg-white md:bg-gray-800 md:bg-opacity-50 flex md:items-center md:justify-center w-full flex-col ${(modalOpen) ? '' : 'hidden'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col w-full h-full py-3 px-10 md:bg-white md:rounded-xl md:w-[37rem] md:h-[16rem] items-center space-y-8">
                <div className="flex flex-row justify-between items-center w-full">
                    <button onClick={(e) => closeModal()}>
                        <img src={closeIcon} className="h-4 w-4"></img>
                    </button>
                    <button className="rounded-full bg-twitter-blue text-white font-bold w-[5rem] h-[2rem] disabled:opacity-50"
                    onClick={() => inputSubmit()}
                    >Poster</button>
                </div>
                <div className="w-full min-h-[8rem] border-b-2">
                    <textarea placeholder="Quoi de neuf?!" className="text-xl w-full h-full focus-visible:outline-none pt-0 pl-0"
                    onChange={(e) => setInput(e.target.value)} value={input}
                    ></textarea>
                    <input type="file" onChange={(e) => uploadImageAPI(e)}></input>
                </div>
                
            </div>
        </div>
    )
}

export default InputModal;