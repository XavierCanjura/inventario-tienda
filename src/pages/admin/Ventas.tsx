import { useEffect } from "react";
import { ButtonCustom, ButttonFab, CartItem, InputCustom, VentaItem } from "../../components"
import { useProductStore, useVentaStore } from "../../hooks"
import { PrivateLayout } from "../../layouts/PrivateLayout"
import { CloseIcon } from "../../assets/icons/Close";

export const Ventas = () => {

    const { fetching, productsList, setInputSearch, searchProducts, getProductsList, subtractAmount } = useProductStore();

    const { cart, showCart, addProductToCart, toggleShowCart, deleteProduct, saveSale } = useVentaStore();

    useEffect(() => {
        getProductsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <>
            <PrivateLayout
                title="Ventas"
            >
                <>
                    <div className="flex justify-end my-3 gap-3">
                        <InputCustom 
                            placeholder="Buscar"
                            onChange={ (event) => setInputSearch(event.target.value) }
                        />
                        
                        <ButtonCustom 
                            text="Ver Carrito"
                            buttonClass="hidden md:block"
                            onClick={ toggleShowCart }
                        />
                    </div>
                    {
                        (productsList.length === 0 && fetching) && (<h1 className="w-full text-center">Cargando...</h1>)
                    }
                    {
                        (productsList.length === 0 && !fetching) && (<h1 className="w-full text-center">No hay registros en la base de datos</h1>)
                    }
                    <div className="responsive-grid gap-y-4 gap-2">
                        {
                            searchProducts().map((product, index) => (
                                <VentaItem 
                                    key={ index }
                                    product={ product }
                                    addProductToCart={ addProductToCart }
                                />
                            ))
                        }
                    </div>
                    
                    <ButttonFab 
                        onClick={ toggleShowCart }
                    />
                </>
            </PrivateLayout>

            <div 
                className={`w-full md:w-[350px] top-[50px] h-[calc(100dvh-50px)] flex flex-col  ${ showCart ? 'absolute right-0' : 'hidden md:right-[-350px]' }  bg-white`}
            >
                <div className="flex">
                    <div className="mt-3 ml-3 cursor-pointer" onClick={ toggleShowCart }>
                        <CloseIcon stroke="!stroke-orange-600" />
                    </div>
                    <h2 className="flex-1 text-center text-xl pt-3 font-semibold">Carrito de Compras</h2>
                </div>

                {/* Container */}
                <div className="mt-3 mx-3 overflow-y-auto flex-1">
                    {
                        cart.length === 0 && (
                            <h3 className="text-center">No hay productos en el carrito</h3>
                        )
                    }
                    {
                        cart.map( ( product, index ) => (
                            <CartItem
                                key={ index }
                                product={ product }
                                onDelete={ deleteProduct }
                            />
                        ))
                    }
                </div>

                <div className="mb-3 w-full px-3">
                    <ButtonCustom 
                        buttonClass="w-full"
                        text="Realizar Compra"
                        onClick={ () => {
                            saveSale();
                            subtractAmount(productsList);
                        } }
                    />
                </div>
                
            </div>
        </>
    )
}
