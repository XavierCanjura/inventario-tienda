import { useState } from "react"
import { Product, Venta } from "../interfaces";
import { firebaseApi } from "../apis/firebase";
import { showMessage } from "../helpers/message";


export const useVentaStore = () => {
    
    const collectionName = 'ventas';

    const { addData } = firebaseApi();

    const [cart, setCart] = useState<Venta[]>([]);
    const [showCart, setShowCart] = useState<boolean>(false);

    const toggleShowCart = () => setShowCart(!showCart);

    const addProductToCart = (product: Product, amountCart: number) => {

        if(amountCart === 0) return;

        const newVenta: Venta = {
            id: product.id,
            name: product.name,
            amountCart,
            price: product.price
        }

        product.amount -= amountCart;
        const existVenta = cart.filter( venta => venta.id === newVenta.id );

        if(existVenta.length > 0){
            changeAmount(newVenta.id, newVenta.amountCart);
            return;
        }

        setCart([...cart, newVenta])
    }

    const changeAmount = (productId: string, amount: number) => {
        const newCart: Venta[] = cart.map( venta => {
            if( venta.id === productId ){
                return {
                    ...venta,
                    amountCart: venta.amountCart + amount
                }
            }

            return venta;
        });
        setCart([ ...newCart ]);

    }

    const deleteProduct = (productId: string) => {
        const newCart = cart.filter( product => product.id !== productId );
        setCart([...newCart]);
    }

    const saveSale = () => {
        if(cart.length === 0) return;

        addCart(cart);

        setCart([]);
        toggleShowCart();
        showMessage({
            message: "Compra realizada con exito",
            type: "success"
        })
    }

    const addCart = (cart: Venta[]) => {
        const date = new Date();
        const data = {
            id: date.getTime().toString(),
            ventas: cart
        }
        addData(collectionName, data);
    }

    return {
        // properties
        showCart,
        cart,

        // methods
        addProductToCart,
        changeAmount,
        saveSale,
        toggleShowCart,
        deleteProduct
    }
}