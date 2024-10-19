import { useState } from "react"

import { Product, User } from "../interfaces"

import { firebaseApi } from "../apis/firebase";

import { useAuthStore } from "./useAuthStore";
import { sessionStore } from "../helpers/sessionStore";

import { showMessage } from "../helpers/message";

const initialValues: Product = { 
    id: '',
    name: '', 
    amount: 0, 
    price: '', 
    image: '', 
    marca: '',
    idUser: '',
    totalHistory: 0,
}

export const useProductStore = () => {
    const collectionName = 'productos';

    const { getData, addData, updateData, deleteData } = firebaseApi();
    const { getSession } = sessionStore();
    const { navigateToLogin } = useAuthStore();

    // STATE ABOUT PRODUCTS
    const [inputSearch, setInputSearch] = useState<string>('');
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [productForm, setProductForm] = useState<Product>({ ...initialValues });
    const [newAmount, setNewAmount] = useState<number>(0);
    const [fetching, setFetching] = useState<boolean>(false);

    // STATE ABOUT MODALS
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [showModalAmount, setshowModalAmount] = useState<boolean>(false);
    const [showModalDelete, setshowModalDelete] = useState<boolean>(false);


    // TOGGLES
    const toggleShowModalAdd = () => setShowModalAdd(!showModalAdd);
    const toggleShowModalEdit = () => setShowModalEdit(!showModalEdit);
    const toggleShowModalAmount = () => setshowModalAmount(!showModalAmount);
    const toggleShowModalDelete = () => setshowModalDelete(!showModalDelete);


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
        if( !validateProductForm(productForm) ) return showMessage({ message: "Completar los campos", type: "warning"});
        
        const auth = getSession<User>();
        if( !auth ) return navigateToLogin();

        addProduct({ ...productForm, idUser: auth.id, totalHistory: productForm.amount });
        toggleShowModalAdd();
        setProductForm({ ...initialValues });
        showMessage({ message: "Producto creado correctamente", type: "success" });
    };

    const handleEditProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( !validateProductForm(productForm) ) return showMessage({ message: "Completar los campos", type: "warning"});
        editProduct({ ...productForm });
        toggleShowModalEdit();
        setProductForm({ ...initialValues });
        showMessage({ message: "Producto editado correctamente", type: "success" });

    }

    const handleAddAmount = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( newAmount === 0) return showMessage({ message: "Completar los campos", type: "warning"});
        addAmount(productForm, newAmount);
        toggleShowModalAmount();
        setNewAmount(0);
        setProductForm({ ...initialValues });
        showMessage({ message: "Cantidad actualizada correctamente", type: "success" });

    }

    const handleDeleteProduct = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toggleShowModalDelete();
        deleteProducto(productForm);
        setProductForm({ ...initialValues });
        showMessage({ message: "Producto eliminado correctamente", type: "success" });
    }

    const handleClickCancel = () => {
        if(showModalAdd) toggleShowModalAdd();
        if(showModalEdit) toggleShowModalEdit();
        if(showModalAmount) toggleShowModalAmount();
        if(showModalDelete) toggleShowModalDelete();

        setProductForm({ ...initialValues });
    }

    // METHODS BY CRUD
    const getProductsListByIdUser = async () => {

        const auth = getSession<User>();
        if( !auth ) return navigateToLogin();

        setFetching(true);
        const products = await getData(collectionName) as Product[];
        const productsFilter: Product[] = products.filter((product) => product.idUser === auth.id );

        const productsMapper: Product[] = productsFilter.map((product) => ({
            id: product.id.toString(),
            name: product.name,
            amount: product.amount,
            image: product.image,
            marca: product.marca,
            price: product.price,
            idUser: product.idUser
        }) );

        setProductsList([ ...productsMapper ]);
        setFetching(false);
    }

    const addProduct = (data: Product) => {
        const date = new Date();
        data.id = date.getTime().toString();
        addData(collectionName, data);
        getProductsListByIdUser();
    }
    const editProduct = (data: Product) => {
        updateData(collectionName, data);
        getProductsListByIdUser();
    }
    const addAmount = (data: Product, newAmount: number) => {
        data.amount = data.amount + newAmount;
        updateData(collectionName, data);
        getProductsListByIdUser();
    }
    const deleteProducto = (data: Product) => {
        deleteData(collectionName, data.id);
        getProductsListByIdUser();
    }

    return {
        // properties
        fetching,
        productsList,
        productForm,
        inputSearch,
        newAmount,
        showModalAdd,
        showModalAmount,
        showModalEdit,
        showModalDelete,

        // methods
        setProductForm,
        setNewAmount,
        setInputSearch,
        searchProducts,
        handleAddAmount,
        handleAddProduct,
        handleEditProduct,
        handleDeleteProduct,
        handleClickCancel,
        toggleShowModalAdd,
        toggleShowModalAmount,
        toggleShowModalEdit,
        toggleShowModalDelete,
        getProductsList: getProductsListByIdUser
    }
}