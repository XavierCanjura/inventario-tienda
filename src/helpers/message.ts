import { toast } from "react-toastify"
import { Message } from "../interfaces";

export const showMessage = ( { message, type }: Message ): void => {

    toast(message, {
        type,
        autoClose: 2000
    });
}