import { useState } from "react";
import { Dots } from "../../assets/icons/Dots";

export const BrandItem = () => {

    const [showOptions, setShowOptions] = useState<boolean>(false);

    const toggleShowOptions = () => setShowOptions(!showOptions);

    const urlImage = "https://diana.sv/wp-content/uploads/2023/10/diana-logo.png";
    return (
        <div className="flex flex-col relative min-w-[80vw] sm:min-w-[250px] min-h-fit border-2 rounded-[20px] shadow-md">
            {/* Image */}
            <img className="w-full h-[100px]" src={ urlImage } alt="" />

            {/* Information */}
            <div className="px-2 py-2">
                <p className="font-[600] text-2xl text-center">Diana</p>
            </div>

            {/* button options */}
            <div className="flex justify-center absolute cursor-pointer w-[25px] h-[25px] bg-orange-600 rounded-full top-[7px] right-[5px]" onClick={ toggleShowOptions }>
                <span className="w-full h-full p-1"><Dots /></span>
            </div> 

            {/* Options */}
            <div className={`${showOptions ? 'absolute': 'hidden' } bg-[#F0F0F0] min-h-fit flex flex-col rounded-lg top-[33px] right-[6px]`}>
                <span 
                    className="py-1 cursor-pointer hover:bg-orange-500 hover:text-white px-2 rounded-t-lg"
                    onClick={ () => {
                        // handleClick(toggleShowModalAmount);
                    } }
                >Agregar Cantidad</span>
                <span 
                    className="py-1 cursor-pointer hover:bg-orange-500 hover:text-white px-2" 
                    onClick={ () => {
                        // handleClick(toggleShowModalEdit);
                    } }
                >Editar</span>
                <span 
                    className="py-1 cursor-pointer hover:bg-orange-500 hover:text-white px-2 rounded-b-lg"
                    onClick={ () => {
                        // handleClick(toggleShowModalDelete);
                        
                    } }
                >Eliminar</span>
            </div>
        </div>
    )
}
