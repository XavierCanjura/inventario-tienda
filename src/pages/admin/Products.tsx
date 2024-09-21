// REACT PACKAGE
import { useEffect } from "react"

// COMPONENTS
import { ButtonCustom, InputCustom, ModalAddAmount, ModalProduct, ProductItem } from "../../components"

// CUSTOM HOOKS
import { useProductStore } from "../../hooks"

// LAYOUT
import { PrivateLayout } from "../../layouts/PrivateLayout"

// ICONS
import { AddIcon } from "../../assets/icons/Add"

export const Products = () => {

    const { 
        productsList, 
        productForm,
        showModalAdd,
        showModalAmount,
        showModalEdit,
        newAmount,
        message,
        setProductForm,
        setNewAmount,
        setInputSearch,
        searchProducts,
        handleAddAmount,
        handleAddProduct,
        handleEditProduct,
        handleClickCancel,
        getProductsList,
        toggleShowModalAdd,
        toggleShowModalAmount,
        toggleShowModalEdit
    } = useProductStore();

    useEffect( () => { console.log(message) }, [message]);

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
                                <ProductItem 
                                    key = { index } 
                                    product = { product }
                                    setForm = { setProductForm }
                                    toggleShowModalEdit = { toggleShowModalEdit } 
                                    toggleShowModalAmount = { toggleShowModalAmount }
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="md:hidden fixed w-[50px] h-[50px] bg-orange-600 rounded-full bottom-2 right-2 shadow-lg" onClick={ toggleShowModalAdd }>
                    <button className="w-full h-full flex justify-center items-center"><AddIcon /></button>
                </div>

            </PrivateLayout>

            {/* Modal for create products */}
            <ModalProduct
                showModal = { showModalAdd }
                handleClickCancel = { handleClickCancel }
                toggleShowModal = { toggleShowModalAdd }
                onSubmit = { handleAddProduct }
                setForm = { setProductForm }
                data={ productForm }
            />

            {/* modal for edit products */}
            <ModalProduct
                showModal = { showModalEdit }
                handleClickCancel = { handleClickCancel }
                toggleShowModal = { toggleShowModalEdit }
                onSubmit = { handleEditProduct }
                setForm = { setProductForm }
                data = { productForm }
                isCreate = { false }
            />

            {/* Modal for add amount */}
            <ModalAddAmount 
                showModal = { showModalAmount }
                handleClickCancel = { handleClickCancel }
                toggleShowModal = { toggleShowModalAmount }
                onSubmit = { handleAddAmount }
                setValue = { (event) => setNewAmount(Number(event.target.value)) }
                data = { productForm }
                value = { newAmount.toString() }
            />
        </>
    )
}
