export interface SelectProps {
    label?: string;
    optionsList: Option[];
    placeholder?: string;
    value?: string;
    inputClass?: string;
    parentClass?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface Option {
    value: string;
    label: string;
}