import { useState } from "react"
import { Product } from "../../interfaces"
import { ButtonCustom } from "../buttons/ButtonCustom"
import { InputCustom } from "../inputs/InputCustom"

export const VentaItem = (
    { 
        product,
        addProductToCart
    }: {
        product: Product,
        amountCart?: number,
        addProductToCart: (product: Product, amount: number) => void
    }
) => {

    const [amountCart, setAmountCart] = useState<number>(0);

    const onChangeAmountCart = (value: number) => {
        if(value < 0) return;
        if(value > product.amount) return;

        setAmountCart(value);
    }

    const handleAddProduct = () => {
        addProductToCart(product, amountCart);
        setAmountCart(0);
    }

    return (
        <div className="flex flex-col relative min-w-[80vw] sm:min-w-[250px] min-h-fit border-2 rounded-[20px] shadow-md">
            {/* Image */}
            <div className="w-full h-[150px]">
                <img className="w-full h-full object-contain" src={ product.image } alt={ product.name } />
            </div>

            {/* Information */}
            <div className="flex justify-center px-2 py-2">
                <h4 className="font-bold">{ product.name }</h4>
                <span className="mx-2">-</span>
                <p>${ product.price }</p>
            </div>

            <div className="flex justify-center items-center mb-3">
                <ButtonCustom
                    text="-"
                    buttonClass="!min-w-[40px] mx-1 !h-[40px] !p-0 text-2xl"
                    onClick={ () => onChangeAmountCart(amountCart-1) }
                />
                <InputCustom 
                    parentClass="!w-[60%]"
                    inputClass="text-center text-lg"
                    value={ amountCart.toString() }
                    onChange={ (event) => onChangeAmountCart( !Number(event.target.value) ? 0 : Number(event.target.value) ) }
                    
                />
                <ButtonCustom
                    text="+"
                    buttonClass="!min-w-[40px] mx-1 !h-[40px] !p-0 text-2xl"
                    onClick={ () => onChangeAmountCart(amountCart+1) }
                />

            </div>

            <ButtonCustom
                text="Agregar al carrito"
                buttonClass="mb-1"
                onClick={ handleAddProduct }
            />
        </div>
    )
}
