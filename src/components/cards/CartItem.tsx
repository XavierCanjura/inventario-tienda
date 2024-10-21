import { Venta } from '../../interfaces'
import { ButtonCustom } from '../buttons/ButtonCustom'

export const CartItem = ({
    product,
    onDelete
}: {
    product: Venta;
    onDelete: ( id:string ) => void
}) => {

    const { id, name, amountCart, price } = product;
    return (
        <div className="flex border rounded-md p-2 my-1 items-center">
            <div className="flex-1">
                <h4 className='font-semibold'>{ name }</h4>
                <p>Precio: ${ price }</p>
                <p>Cantidad: { amountCart }</p>
            </div>
            <ButtonCustom 
                buttonClass="!p-0 !min-w-[30px] !h-[30px] bg-red-500 rounded"
                text="X"
                onClick={ () => onDelete(id) }
            />
        </div>
    )
}
