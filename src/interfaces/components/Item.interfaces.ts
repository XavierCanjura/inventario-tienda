export interface ItemProps<T> {
    data: T, 
    setForm: React.Dispatch<React.SetStateAction<T>>,
    toggleShowModalEdit: () => void,
    toggleShowModalAmount?: () => void,
    toggleShowModalDelete: () => void,
}