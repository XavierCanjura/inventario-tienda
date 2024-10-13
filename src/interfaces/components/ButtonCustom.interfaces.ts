export interface ButtonProps{
    text?: string;
    buttonClass?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
}