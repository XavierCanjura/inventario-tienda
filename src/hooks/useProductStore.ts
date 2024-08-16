import { useState } from "react"
import { Product } from "../interfaces"
import { firebaseApi } from "../apis/firebase";

export const useProductStore = () => {

    const { getData, addData } = firebaseApi();

    const [productsList, setProductsList] = useState<Product[]>([]);

    const getProductsList = async () => {
        const products = await getData('productos') as Product[];
        const productMapper: Product[] = products.map((product) => ({
            id: product.id.toString(),
            name: product.name,
            amount: product.amount,
            image: product.image,
            marca: product.marca,
            price: product.price
        }))
        setProductsList([ ...productMapper ]);
    }

    const addProduct = (data: Product) => {
        const date = new Date();
        // console.log(date.getTime());
        data.id = date.getTime().toString();
        addData('productos', data);
        getProductsList();
    }
    // const editProduct = () => {}
    // const addAmount = () => {}
    // const deleteProducto = () => {}

    return {
        // properties
        productsList,

        // methods
        getProductsList,
        addProduct
    }
}