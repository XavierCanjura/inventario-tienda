import { useEffect } from "react";
import { ButtonCustom, InputCustom } from "../../components";
import { useAuthStore } from "../../hooks";
import { sessionStore } from "../../helpers/sessionStore";
import { toast } from "react-toastify";

export const Login = () => {

    const {  loginForm, message, authentication, setLoginForm, navigateToHome } = useAuthStore();
    const { existSession } = sessionStore();

    const handleClick = () => { authentication() }

    useEffect(() => {
        if(existSession('auth')) return navigateToHome();
    });

    useEffect( () => {
        if(message) toast.error(message);
    }, [message])

    return (
        <div className="flex flex-col sm:flex-row w-dvw h-dvh">
            <div className="w-full h-[60vh] sm:w-[65vw] sm:h-full flex justify-center items-center bg-[#F0F0F0] relative">
                <div className="absolute sm:relative w-[90vw] h-[70vh] sm:min-w-[400px] sm:w-[50%] md:max-w-[500px] sm:h-[60%] bg-[#F0F0F0] shadow-2xl rounded-lg top-[10vh] sm:top-0">
                    <div className="w-full h-full flex flex-col justify-center px-[10%]">
                        <div className="flex justify-start">
                            <img className="w-[100px] h-[100px] mb-[5%]" src="./img/shop.png" alt="" />
                        </div>
                        <h5 className="text-md text-black/50 ">Bienvenido !!!</h5>
                        <h1 className="text-5xl font-extrabold mb-[5%]">Login</h1>
                        <InputCustom 
                            label="Correo electronico"
                            placeholder="example@mail.com"
                            type="email"
                            parentClass="md:w-full my-4"
                            value={ loginForm.email }
                            onChange={ (event) => setLoginForm({ ...loginForm, email: event.target.value }) }
                        />
                        <InputCustom 
                            label="Contraseña"
                            type="password"
                            placeholder="*****"
                            parentClass="md:w-full mb-4"
                            value={ loginForm.password }
                            onChange={ (event) => setLoginForm({ ...loginForm, password: event.target.value }) }

                        />

                        <div className="w-full flex justify-center">
                            <ButtonCustom 
                                text="Ingresar"
                                type="button"
                                buttonClass="w-[150px]"
                                onClick={ handleClick }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[40vh] sm:w-[35vw] sm:h-full bg-orange-400"></div>
        </div>
    )
}
