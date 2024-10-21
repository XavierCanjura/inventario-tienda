// LAYOUTS
import { PrivateLayout } from "../../layouts/PrivateLayout"

// COMPONENTS
import { BrandItem, ButtonCustom, ButttonFab, InputCustom, ModalBrand, ModalDelete } from "../../components"
import { useBrandStore } from "../../hooks"
import { useEffect } from "react";

export const Marcas = () => {

    const {
        brandForm,
        brandsList,
        fetching,
        showModalAdd,
        showModalDelete,
        showModalEdit,
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
    } = useBrandStore();

    useEffect( () => {
        getBrandsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <PrivateLayout title="Marcas">
                <div className="flex justify-end my-3 gap-3">
                    <InputCustom 
                        placeholder="Buscar"
                        onChange={ (event) => setInputSearch(event.target.value) }

                    />
                    <ButtonCustom 
                        text="Agregar Marca"
                        buttonClass="hidden md:block"
                        onClick={ toggleShowModalAdd }
                    />
                </div>
                {
                    (brandsList.length === 0 && fetching) && (<h1 className="w-full text-center">Cargando...</h1>)
                }
                {
                    (brandsList.length === 0 && !fetching) && (<h1 className="w-full text-center">No hay registros en la base de datos</h1>)
                }
                <div className="responsive-grid gap-y-4 gap-2">
                    {
                        searchProducts().map( (brand, index) => (
                            <BrandItem 
                                key={ index }
                                data={ brand } 
                                setForm={ setBrandForm } 
                                toggleShowModalEdit={ toggleShowModalEdit } 
                                toggleShowModalDelete={ toggleShowModalDelete }                                
                            />
                        ))
                    }
                </div>
                <ButttonFab 
                    onClick={ toggleShowModalAdd }
                />
            </PrivateLayout>

            <ModalBrand
                showModal={ showModalAdd }
                toggleShowModal={ toggleShowModalAdd }
                handleClickCancel={ handleClickCancel }
                data={ brandForm }
                onSubmit={ handleAddBrand }
                setForm={ setBrandForm }
            />

            <ModalBrand
                isCreate = { false }
                showModal={ showModalEdit }
                toggleShowModal={ toggleShowModalEdit }
                handleClickCancel={ handleClickCancel }
                data={ brandForm }
                onSubmit={ handleEditBrand }
                setForm={ setBrandForm }
            />

            {/* Modal for delete product */}
            <ModalDelete 
                showModal = { showModalDelete }
                data={ brandForm }
                toggleShowModal={ toggleShowModalDelete }
                handleClickCancel={ handleClickCancel }
                onSubmit={ handleDeleteBrand } 
                title={ `Eliminar - ${ brandForm.name }` }               
            />
        </>
    )
}
