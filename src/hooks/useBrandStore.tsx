import { useState } from "react";
import { firebaseApi } from "../apis/firebase";
import { Brand, User } from "../interfaces";
import { showMessage } from "../helpers/message";
import { sessionStore } from "../helpers/sessionStore";
import { useAuthStore } from "./useAuthStore";

const initialValues: Brand = {
    id: "",
    name: "",
    image: "",
    idUser: ""
}

export const useBrandStore = () => {
    const collectionName = "marcas";

    const { getData, addData, updateData, deleteData } = firebaseApi();
    const { getSession } = sessionStore();
    const { navigateToLogin } = useAuthStore();

    
    // STATE ABOUT MODALS
    const [brandsList, setBrandsList] = useState<Brand[]>([]);
    const [inputSearch, setInputSearch] = useState<string>('');
    const [brandForm, setBrandForm] = useState<Brand>(initialValues);
    const [fetching, setFetching] = useState<boolean>(false);

    // STATE ABOUT MODALS
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
    const [showModalDelete, setshowModalDelete] = useState<boolean>(false);

    // TOGGLES
    const toggleShowModalAdd = () => setShowModalAdd(!showModalAdd);
    const toggleShowModalEdit = () => setShowModalEdit(!showModalEdit);
    const toggleShowModalDelete = () => setshowModalDelete(!showModalDelete);


    // HANDLES
    const searchProducts = (): Brand[] => {
        if(inputSearch === "") return brandsList;
        const productsSearch: Brand[] = brandsList.filter( (brand) => brand.name.toLowerCase().includes(inputSearch.toLowerCase()) );
        return productsSearch;
    }

    const handleAddBrand = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if( brandForm.name === "" ) return showMessage({ message: "Completar los campos requeridos", type: "warning" });

        const auth = getSession<User>();
        if( !auth ) return navigateToLogin();

        addBrand({ ...brandForm, idUser: auth.id });
        toggleShowModalAdd();
        setBrandForm({ ...initialValues });
        getBrandsList();
        showMessage({ message: "Marca creada correctamente", type: "success" });
    }

    const handleEditBrand = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( brandForm.name === "" ) return showMessage({ message: "Completar los campos requeridos", type: "warning" });

        const auth = getSession<User>();
        if( !auth ) return navigateToLogin();

        editBrand(brandForm);
        toggleShowModalEdit();
        setBrandForm({ ...initialValues });
        getBrandsList();
        showMessage({ message: "Marca editada correctamente", type: "success" });

    }

    const handleDeleteBrand = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toggleShowModalDelete();
        deleteBrand(brandForm);
        setBrandForm({ ...initialValues });
        showMessage({ message: "Marca eliminada correctamente", type: "success" });
    }

    const handleClickCancel = () => {
        if(showModalAdd) toggleShowModalAdd();
        if(showModalEdit) toggleShowModalEdit();
        if(showModalDelete) toggleShowModalDelete();

        setBrandForm({ ...initialValues });
    }

    // METHODS BY CRUD
    const getBrandsList = async () => {
        setFetching(true);
        const brands = await getData(collectionName) as Brand[];
        const brandMapper: Brand[] = brands.map((brand) => ({
            id: brand.id.toString(),
            name: brand.name,
            image: brand.image,
            idUser: brand.idUser
        }))
        setBrandsList([ ...brandMapper ]); 
        setFetching(false);
    }

    const addBrand = (data: Brand): void => {
        const date = new Date();
        data.id = date.getTime().toString();
        addData(collectionName, data);
    }
    const editBrand = (data: Brand) => {
        updateData(collectionName, data);
        getBrandsList();
    }
    const deleteBrand = (data: Brand) => {
        deleteData(collectionName, data.id);
        getBrandsList();
    }

    return {
        // properties
        brandsList,
        brandForm,
        fetching,
        inputSearch,
        showModalAdd,
        showModalDelete,
        showModalEdit,


        // methods
        setInputSearch,
        setBrandForm,
        getBrandsList,
        searchProducts,
        handleAddBrand,
        handleEditBrand,
        handleDeleteBrand,
        handleClickCancel,
        toggleShowModalAdd,
        toggleShowModalEdit,
        toggleShowModalDelete
    }
}