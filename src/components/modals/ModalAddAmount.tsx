//COMPONENTS
import { ButtonCustom } from "../buttons/ButtonCustom"
import { InputCustom } from "../inputs/InputCustom"
import { Modal } from "./Modal"

//INTERFACES
import { ModalProductProps } from "../../interfaces"

export const ModalAddAmount = (
    {
        showModal,
        handleClickCancel,
        toggleShowModal,
        onSubmit,
        setValue,
        data,
        value
    }: ModalProductProps 
) => {
    return (
        <Modal
            show = { showModal }
            onClickClose={ toggleShowModal }
            title="Agregar a Inventario"
        >
            <form method="post" onSubmit={ onSubmit }>
                <div className="w-full flex flex-wrap justify-between gap-3 md:gap-1">
                    <InputCustom 
                        parentClass="md:w-[45%]"
                        label="Cantidad actual"
                        type="number"
                        disabled
                        value={ data.amount.toString() }
                        
                    />
                    <InputCustom 
                        parentClass="md:w-[45%]"
                        label="Cantidad a ingresar"
                        type="number"
                        value={ value }
                        onChange={ setValue }
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

        </Modal>
    )
}
