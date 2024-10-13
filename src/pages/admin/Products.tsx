// REACT PACKAGE
import { useEffect } from "react"

// COMPONENTS
import { ButtonCustom, InputCustom, ModalAddAmount, ModalDelete, ModalProduct, ProductItem } from "../../components"

// CUSTOM HOOKS
import { useBrandStore, useProductStore } from "../../hooks"

// LAYOUT
import { PrivateLayout } from "../../layouts/PrivateLayout"

// ICONS
import { AddIcon } from "../../assets/icons/Add"

export const Products = () => {

    const { 
        fetching,
        productsList, 
        productForm,
        showModalAdd,
        showModalAmount,
        showModalEdit,
        showModalDelete,
        newAmount,
        setProductForm,
        setNewAmount,
        setInputSearch,
        searchProducts,
        getProductsList,
        handleAddAmount,
        handleAddProduct,
        handleEditProduct,
        handleDeleteProduct,
        handleClickCancel,
        toggleShowModalAdd,
        toggleShowModalAmount,
        toggleShowModalEdit,
        toggleShowModalDelete
    } = useProductStore();

    const { brandsByOption, getBrandByOption } = useBrandStore();

    useEffect( () => {
        getProductsList();
        getBrandByOption();
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
                            disabled={ brandsByOption.length === 0 }
                            text="Agregar Producto"
                            buttonClass="hidden md:block"
                            onClick={ toggleShowModalAdd }
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
                                <ProductItem 
                                    key = { index } 
                                    data = { product }
                                    setForm = { setProductForm }
                                    toggleShowModalEdit = { toggleShowModalEdit } 
                                    toggleShowModalAmount = { toggleShowModalAmount }
                                    toggleShowModalDelete = { toggleShowModalDelete }
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
                optionsMap={ { "brands": brandsByOption  } }
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
                optionsMap={ { "brands": brandsByOption  } }

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

            {/* Modal for delete product */}
            <ModalDelete 
                showModal = { showModalDelete }
                data={ productForm }
                toggleShowModal={ toggleShowModalDelete }
                handleClickCancel={ handleClickCancel }
                onSubmit={ handleDeleteProduct } 
                title={ `Eliminar - ${ productForm.name }` }               
            />
        </>
    )
}
