import { Product } from "../hooks/useProductStore.interfaces";

export interface ModalProductProps {
    showModal: boolean;
    handleClickCancel: React.MouseEventHandler<HTMLButtonElement>;
    toggleShowModal: React.MouseEventHandler<HTMLDivElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    setForm?: React.Dispatch<React.SetStateAction<Product>>;
    data: Product;
    isCreate?: boolean;
    value?: string;
    setValue?: React.ChangeEventHandler<HTMLInputElement>;
    title?: string;
}