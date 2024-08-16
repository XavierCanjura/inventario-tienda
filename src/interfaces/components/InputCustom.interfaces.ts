export interface InputProps {
    label?: string;
    placeholder?: string;
    parentClass?: string;
    inputClass?: string;
    value?: string;
    type?: React.HTMLInputTypeAttribute;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}