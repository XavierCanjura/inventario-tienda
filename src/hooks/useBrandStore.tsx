import { useState } from "react";
import { firebaseApi } from "../apis/firebase";
import { Brand } from "../interfaces";

const initialValues: Brand = {
    id: "",
    name: "",
    image: ""
}

export const useBrandStore = () => {

    const collectionName = "marcas";

    const { getData, addData} = firebaseApi();

    const [brandsList, setBrandsList] = useState<Brand[]>([]);
    const [brandForm, setBrandForm] = useState<Brand>(initialValues)
    const [message, setMessage] = useState<string | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);


    // HANDLES
    const handleAddBrand = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( brandForm.name !== "" ) return handleMessage("Completar los campos requeridos");
        addBrand(brandForm);
        setBrandForm({ ...initialValues })
    }

    const handleMessage = (message: string) => {
        setMessage(message);
        setTimeout( () => { setMessage(null) }, 1000);
    }


    // METHODS BY CRUD
    const getBrandsList = async () => {
        setFetching(true);
        const brands = await getData(collectionName) as Brand[];
        const brandMapper: Brand[] = brands.map((brand) => ({
            id: brand.id.toString(),
            name: brand.name,
            image: brand.image,
        }))
        setBrandsList([ ...brandMapper ]); 
        setFetching(false);
    }

    const addBrand = (data: Brand) => {
        const date = new Date();
        // console.log(date.getTime());
        data.id = date.getTime().toString();
        addData(collectionName, data);
        getBrandsList();
    }

    return {
        // properties
        brandsList,
        message,
        fetching,


        // methods
        getBrandsList,
        handleAddBrand,
    }
}