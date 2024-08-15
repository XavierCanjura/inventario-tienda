import { useEffect } from "react";
import { firebaseApi } from "../../apis/firebase"

export const Login = () => {

    const { getData } = firebaseApi();

    useEffect( () => {
        getData('productos');
    }, [])

    return (
        <div>Login</div>
    )
}
