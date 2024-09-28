import { useState } from "react";
import { Dots } from "../../assets/icons/Dots";
import { Product } from "../../interfaces";

export const ProductItem = (
    { 
        product, 
        setForm, 
        toggleShowModalEdit ,
        toggleShowModalAmount,
        toggleShowModalDelete
    }: { 
        product: Product, 
        setForm: React.Dispatch<React.SetStateAction<Product>>,
        toggleShowModalEdit: () => void,
        toggleShowModalAmount: () => void,
        toggleShowModalDelete: () => void,

    }
) => {

    const [showOptions, setShowOptions] = useState<boolean>(false);

    const toggleShowOptions = () => setShowOptions(!showOptions);

    const handleClick = (callback: () => void) => {
        setForm({ ...product });
        callback();
        toggleShowOptions();
    }

    // const imageURL = "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    return (
        <div className="flex flex-col relative min-w-[80vw] sm:min-w-[250px] min-h-fit border-2 rounded-[20px] shadow-md">
            {/* Image */}
            <img className="w-full h-[200px] rounded-[20px]" src={ product.image } alt={ product.name } />
            {/* Information */}
            <div className="px-2 py-2">
                <p>${ product.price }</p>
                <h4>{ product.name }</h4>
                <p>Cantidad: { product.amount }</p>
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
                        handleClick(toggleShowModalAmount);
                    } }
                >Agregar Cantidad</span>
                <span 
                    className="py-1 cursor-pointer hover:bg-orange-500 hover:text-white px-2" 
                    onClick={ () => {
                        handleClick(toggleShowModalEdit);
                    } }
                >Editar</span>
                <span 
                    className="py-1 cursor-pointer hover:bg-orange-500 hover:text-white px-2 rounded-b-lg"
                    onClick={ () => {
                        handleClick(toggleShowModalDelete);
                    } }
                >Eliminar</span>
            </div>
        </div>
    )
}
