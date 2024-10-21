import { useState } from "react"
import { Product, User, Venta } from "../interfaces";
import { firebaseApi } from "../apis/firebase";
import { showMessage } from "../helpers/message";
import { sessionStore } from "../helpers/sessionStore";
import { useAuthStore } from "./useAuthStore";


interface VentaRequest { id: string, idUser: string, ventas: Venta[] }

export const useVentaStore = () => {
    
    const collectionName = 'ventas';

    const { addData, getData } = firebaseApi();
    const { getSession } = sessionStore();
    const { navigateToLogin } = useAuthStore();

    const [cart, setCart] = useState<Venta[]>([]);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [salesList, setSalesList] = useState<Venta[]>([])

    const toggleShowCart = () => setShowCart(!showCart);

    const getSales = () => {
        const auth = getSession<User>();
        if( !auth ) return navigateToLogin();

        getSalesByUserId(auth);
    }

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

        const auth = getSession<User>();
        if( !auth ) return navigateToLogin();

        addCart(cart, auth);

        setCart([]);
        toggleShowCart();
        showMessage({
            message: "Compra realizada con exito",
            type: "success"
        })
    }

    const addCart = (cart: Venta[], user: User) => {
        const date = new Date();
        const data = {
            id: date.getTime().toString(),
            idUser: user.id,
            ventas: cart
        }
        addData(collectionName, data);
    }

    const getSalesByUserId = async (auth: User): Promise<void> => {
        const sales = await getData(collectionName) as VentaRequest[];
        let salesFilter: Venta[] = [];
        sales.forEach( sale => {
            if( sale.idUser === auth.id ){
                salesFilter = [ ...salesFilter, ...sale.ventas];
            }
        });

        setSalesList([...salesFilter]);
    }

    return {
        // properties
        showCart,
        cart,
        salesList,

        // methods
        getSales,
        addProductToCart,
        changeAmount,
        saveSale,
        toggleShowCart,
        deleteProduct
    }
}