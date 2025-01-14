// COMPONENTS
import { ButtonCustom } from "../buttons/ButtonCustom";
import { InputCustom } from "../inputs/InputCustom";
import { Modal } from "./Modal";

// INTERFACES
import { ModalProps, Product } from "../../interfaces";
import { SelectCustom } from "../inputs/SelectCustom";

export const ModalProduct = (
    { 
        data,
        isCreate = true,
        showModal,
        handleClickCancel,
        toggleShowModal,
        onSubmit,
        setForm,
        optionsMap
    } : ModalProps<Product>
) => {
    return(
        <Modal 
            show = { showModal }
            onClickClose = { toggleShowModal }
            title = {`${ isCreate ? "Agregar" : "Editar" } Producto`}
        >
            <form className="w-full flex flex-wrap mt-5 overflow-y-auto" method="post" onSubmit={ onSubmit }>
                <div className="w-full flex flex-wrap justify-between gap-3 md:gap-1">
                    <InputCustom 
                        parentClass="md:w-[45%]"
                        label="Nombre de producto"
                        placeholder="Ingrese el nombre"
                        value={ data.name }
                        onChange={ (event) => setForm?.({ ...data, name: event.target.value }) }
                    />

                    <InputCustom 
                        disabled={ !isCreate }
                        parentClass="md:w-[45%]"
                        label="Cantidad de producto"
                        placeholder="Ingrese la cantidad"
                        type="number"
                        value={ data.amount.toString() }
                        onChange={ (event) => setForm?.({ ...data, amount: Number(event.target.value) }) }
                    />
                    
                    <InputCustom 
                        parentClass="md:w-[45%]"
                        label="Precio de compra del producto ($)"
                        placeholder="Ingrese el precio de compra"
                        value={ data.priceBuy }
                        onChange={(event) => setForm?.({ ...data, priceBuy: event.target.value }) }
                    />

                    <InputCustom 
                        parentClass="md:w-[45%]"
                        label="Precio de venta del producto ($)"
                        placeholder="Ingrese el precio de venta"
                        value={ data.price }
                        onChange={(event) => setForm?.({ ...data, price: event.target.value }) }
                    />

                    <SelectCustom 
                        parentClass="md:w-[45%]"
                        label="Marcas"
                        placeholder="Selecciona una marca"
                        optionsList={ optionsMap ? optionsMap!["brands"] : [] }
                        value={ data.marca }
                        onChange={ (event) => setForm?.({ ...data, marca: event.target.value }) }
                    />

                    <InputCustom 
                        parentClass="!w-full"
                        label="Imagen del producto"
                        placeholder="Copie la direccion de la imagen"
                        value={ data.image }
                        onChange={(event) => setForm?.({ ...data, image: event.target.value }) }
                    />

                    {/* <InputCustom 
                        parentClass="md:w-[45%] file-select"
                        type="file"
                    /> */}

                </div>

                <div className="flex w-full border-t justify-end mt-8 pt-2 gap-x-2">
                    <ButtonCustom 
                        text={ isCreate ? "Agregar" : "Editar" }
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
        </Modal>
    );
}
