export interface InputProps {
    disabled?: boolean;
    label?: string;
    placeholder?: string;
    parentClass?: string;
    inputClass?: string;
    value?: string;
    type?: React.HTMLInputTypeAttribute;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}