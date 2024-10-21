// REACT PACKAGE
import { useEffect } from "react"

// COMPONENTS
import { ButtonCustom, ButttonFab, InputCustom, ModalAddAmount, ModalDelete, ModalProduct, ProductItem } from "../../components"

// CUSTOM HOOKS
import { useBrandStore, useProductStore } from "../../hooks"

// LAYOUT
import { PrivateLayout } from "../../layouts/PrivateLayout"

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
                <ButttonFab 
                    onClick={ toggleShowModalAdd }
                />
                

            </PrivateLayout>

            {/* Modal for create products */}
            <ModalProduct
                showModal = { showModalAdd }
                handleClickCancel = { handleClickCancel }
                toggleShowModal = { handleClickCancel }
                onSubmit = { handleAddProduct }
                setForm = { setProductForm }
                data={ productForm }
                optionsMap={ { "brands": brandsByOption  } }
            />

            {/* modal for edit products */}
            <ModalProduct
                showModal = { showModalEdit }
                handleClickCancel = { handleClickCancel }
                toggleShowModal = { handleClickCancel }
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
                toggleShowModal = { handleClickCancel }
                onSubmit = { handleAddAmount }
                setValue = { (event) => setNewAmount(Number(event.target.value)) }
                data = { productForm }
                value = { newAmount.toString() }
            />

            {/* Modal for delete product */}
            <ModalDelete 
                showModal = { showModalDelete }
                data={ productForm }
                toggleShowModal={ handleClickCancel }
                handleClickCancel={ handleClickCancel }
                onSubmit={ handleDeleteProduct } 
                title={ `Eliminar - ${ productForm.name }` }               
            />
        </>
    )
}
