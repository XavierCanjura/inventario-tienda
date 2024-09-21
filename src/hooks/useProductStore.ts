import { useState } from "react"
import { Product } from "../interfaces"
import { firebaseApi } from "../apis/firebase";

const initialValues: Product = { 
    id: '',
    name: '', 
    amount: 0, 
    price: '', 
    image: '', 
    marca: '' 
}

export const useProductStore = () => {
    const collectionName = 'productos';

    const { getData, addData, updateData } = firebaseApi();

    // STATE ABOUT PRODUCTS
    const [inputSearch, setInputSearch] = useState<string>('');
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [productForm, setProductForm] = useState<Product>(initialValues);
    const [newAmount, setNewAmount] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);

    // STATE ABOUT MODALS
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [showModalAmount, setshowModalAmount] = useState<boolean>(false);

    // TOGGLES
    const toggleShowModalAdd = () => setShowModalAdd(!showModalAdd);
    const toggleShowModalEdit = () => setShowModalEdit(!showModalEdit);
    const toggleShowModalAmount = () => setshowModalAmount(!showModalAmount);

    // VALIDATIONS
    const validateProductForm = (productForm: Product): boolean => {
        if( productForm.name.trim() === '' ) return false;
        if( productForm.amount <= 0 ) return false;
        if( productForm.price.trim() === '' || isNaN( Number(productForm.price) ) ) return false;
        return true;
    }

    // HANDLES
    const searchProducts = (): Product[] => {
        if(inputSearch === "") return productsList;
        const productsSearch: Product[] = productsList.filter( (product) => product.name.toLowerCase().includes(inputSearch.toLowerCase()) );
        return productsSearch;
    }

    const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        if( !validateProductForm(productForm) ) return handleMessage("Completar los campos");
        addProduct(productForm);
        toggleShowModalAdd();
        setProductForm({ ...initialValues });
    };

    const handleEditProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( !validateProductForm(productForm) ) return;
        editProduct(productForm);
        toggleShowModalEdit();
        setProductForm({ ...initialValues });
    }

    const handleAddAmount = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( newAmount === 0) return;
        addAmount(productForm, newAmount);
        toggleShowModalAmount();
        setNewAmount(0);
        setProductForm({ ...initialValues });
    }

    const handleClickCancel = () => {
        if(showModalAdd) toggleShowModalAdd();
        if(showModalEdit) toggleShowModalEdit();
        if(showModalAmount) toggleShowModalAmount();

        setProductForm({ ...initialValues });
    }

    const handleMessage = (message: string) => {
        setMessage(message);
        setTimeout( () => { setMessage(null) }, 1000);
    }

    // METHODS BY CRUD
    const getProductsList = async () => {
        const products = await getData(collectionName) as Product[];
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
        addData(collectionName, data);
        getProductsList();
    }
    const editProduct = (data: Product) => {
        updateData(collectionName, data);
        getProductsList();
    }
    const addAmount = (data: Product, newAmount: number) => {
        data.amount = data.amount + newAmount;
        updateData(collectionName, data);
        getProductsList();
    }
    // const deleteProducto = () => {}

    return {
        // properties
        productsList,
        productForm,
        inputSearch,
        newAmount,
        showModalAdd,
        showModalAmount,
        showModalEdit,
        message,

        // methods
        setProductForm,
        setNewAmount,
        setInputSearch,
        searchProducts,
        handleAddAmount,
        handleAddProduct,
        handleEditProduct,
        handleClickCancel,
        toggleShowModalAdd,
        toggleShowModalAmount,
        toggleShowModalEdit,
        getProductsList,
        addProduct,
        editProduct,
        addAmount
    }
}