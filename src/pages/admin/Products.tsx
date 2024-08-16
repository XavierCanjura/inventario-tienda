import { useEffect, useState } from "react"
import { AddIcon } from "../../assets/icons/Add"
import { ButtonCustom, InputCustom, Modal, ProductItem } from "../../components"
import { useProductStore } from "../../hooks"
import { PrivateLayout } from "../../layouts/PrivateLayout"
import { CloseIcon } from "../../assets/icons/Close"
import { Product } from "../../interfaces"

const initialValues: Product = { 
    id: '',
    name: '', 
    amount: 0, 
    price: '', 
    image: '', 
    marca: '' 
}

export const Products = () => {

    const { productsList, getProductsList, addProduct } = useProductStore();
    const [inputSearch, setInputSearch] = useState<string>('');
    const [productForm, setProductForm] = useState<Product>(initialValues);
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false);

    const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();
        if( productForm.name.trim() === '' ) return;
        if( productForm.amount <= 0 ) return;
        if( productForm.price.trim() === '' || isNaN( Number(productForm.price) ) ) return;
        addProduct(productForm);
    };
    
    const toggleShowModalAdd = () => setShowModalAdd(!showModalAdd);

    const handleClickCancel = () => {
        toggleShowModalAdd();
        setProductForm({ ...initialValues });
    }

    const searchProducts = (): Product[] => {
        if(inputSearch === "") return productsList;
        const productsSearch: Product[] = productsList.filter( (product) => product.name.toLowerCase().includes(inputSearch.toLowerCase()) );
        return productsSearch;
    }


    useEffect( () => {
        getProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PrivateLayout title="Productos">
                <div className="">
                    <div className="flex justify-end my-3 gap-3">
                        <InputCustom 
                            placeholder="Buscar"
                            onChange={ (event) => setInputSearch(event.target.value) }

                        />
                        <ButtonCustom 
                            text="Agregar Producto"
                            buttonClass="hidden md:block"
                            onClick={ toggleShowModalAdd }
                        />
                    </div>
                    {
                        productsList.length === 0 && (<h1 className="w-full text-center">Cargando...</h1>)
                    }
                    <div className="responsive-grid gap-y-4 gap-2">
                        {
                            searchProducts().map((product, index) => (
                                <ProductItem key={ index } product={ product } />
                            ))
                        }
                        {
                            searchProducts().map((product, index) => (
                                <ProductItem key={ index } product={ product } />
                            ))
                        }
                    </div>
                </div>
                <div className="md:hidden fixed w-[50px] h-[50px] bg-orange-600 rounded-full bottom-2 right-2 shadow-lg">
                    <button className="w-full h-full flex justify-center items-center"><AddIcon /></button>
                </div>

            </PrivateLayout>

            <Modal show={ showModalAdd }>
                <div className="w-full flex flex-col px-5 py-3">
                    <div className="relative">
                        <h2 className="text-xl md:text-3xl md:text-center font-semibold uppercase">Agregar Producto</h2>
                        <div className="absolute w-[25px] h-[25px] top-0 right-0 cursor-pointer" onClick={ toggleShowModalAdd }>
                            <CloseIcon stroke="!stroke-orange-600" />
                        </div>
                    </div>                    
                    <form className="w-full flex flex-wrap mt-5 overflow-y-auto" method="post" onSubmit={ handleAddProduct }>
                        <div className="w-full flex flex-wrap justify-between gap-3 md:gap-1">
                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Nombre de producto"
                                placeholder="Ingrese el nombre"
                                value={ productForm.name }
                                onChange={ (event) => setProductForm({ ...productForm, name: event.target.value }) }
                            />

                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Cantidad de producto"
                                placeholder="Ingrese la cantidad"
                                type="number"
                                value={ productForm.amount.toString() }
                                onChange={ (event) => setProductForm({ ...productForm, amount: Number(event.target.value) }) }
                            />
                            
                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Precio del producto"
                                placeholder="Ingrese el precio"
                                value={ productForm.price }
                                onChange={(event) => setProductForm({ ...productForm, price: event.target.value }) }
                            />

                            <InputCustom 
                                parentClass="md:w-[45%] file-select"
                                type="file"
                            />

                        </div>

                        <div className="flex w-full border-t justify-end mt-8 pt-2 gap-x-2">
                            <ButtonCustom 
                                text="Agregar"
                                type="submit"
                            />
                            
                            <ButtonCustom 
                                text="Cancelar"
                                buttonClass="bg-slate-600"
                                type="button"
                                onClick={ handleClickCancel }
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}
