
export interface ModalProps<T> {
    showModal: boolean;
    handleClickCancel: React.MouseEventHandler<HTMLButtonElement>;
    toggleShowModal: React.MouseEventHandler<HTMLDivElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    setForm?: React.Dispatch<React.SetStateAction<T>>;
    data: T;
    isCreate?: boolean;
    value?: string;
    setValue?: React.ChangeEventHandler<HTMLInputElement>;
    title?: string;
}