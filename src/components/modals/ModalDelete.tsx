import { ModalProps } from "../../interfaces"
import { ButtonCustom } from "../buttons/ButtonCustom"
import { Modal } from "./Modal"

export const ModalDelete = <T,>(
    {
        showModal, 
        title,
        toggleShowModal,
        handleClickCancel,
        onSubmit
    }: ModalProps<T>
) => {
    
    return (
        <Modal 
            show={ showModal } 
            onClickClose={ toggleShowModal }
            title={ title ? title : "" }
        >
            <form  method="post" onSubmit={ onSubmit }>

                <h4 className="font-[600] text-lg md:text-2xl text-center mt-4">¿Desea eliminar el registro?</h4>
                <h5 className="font-[500] text-base md:text-xl text-center">Si elimina el registro, no podra recuperarlo </h5>


                <div className="flex w-full border-t justify-end mt-8 pt-2 gap-x-2">
                    <ButtonCustom 
                        text="Eliminar"
                        type="submit"
                        buttonClass="!bg-[#FF0000]"
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
