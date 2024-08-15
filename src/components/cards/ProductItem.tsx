import { useState } from "react";
import { Dots } from "../../assets/icons/Dots";

export const ProductItem = () => {

    const [showOptions, setShowOptions] = useState<boolean>(false);

    const toggleShowOptions = () => setShowOptions(!showOptions);

    const imageURL = "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    return (
        <div className="flex flex-col relative min-w-[80vw] sm:min-w-[250px] min-h-fit border-2 rounded-[20px] shadow-md">
            {/* Image */}
            <img className="w-full h-[200px] rounded-[20px]" src={ imageURL } alt="product" />
            {/* Information */}
            <div className="px-2 py-2">
                <p>Price</p>
                <h4>Product Name</h4>
                <p>Amount</p>
            </div>
            {/* button options */}
            <div className="flex justify-center absolute cursor-pointer w-[25px] h-[25px] bg-orange-600 rounded-full top-[7px] right-[5px]" onClick={ toggleShowOptions }>
                <span className="w-full h-full p-1"><Dots /></span>
            </div>
            {/* Options */}
            <div className={`${showOptions ? 'absolute': 'hidden' } bg-white min-h-fit flex flex-col rounded-lg top-[32px] right-[6px]`}>
                <span className="py-0.5 cursor-pointer hover:bg-slate-500 hover:text-white px-2">add amounts</span>
                <span className="py-0.5 cursor-pointer hover:bg-slate-500 hover:text-white px-2">edit</span>
                <span className="py-0.5 cursor-pointer hover:bg-slate-500 hover:text-white px-2">delete</span>
            </div>
        </div>
    )
}
