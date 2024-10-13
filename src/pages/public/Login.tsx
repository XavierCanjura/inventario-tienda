import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks";
import { sessionStore } from "../../helpers/sessionStore";
import { toast } from "react-toastify";
import { LoginCard, RegisterCard } from "../../components";

export const Login = () => {

    const {  loginForm, message, authentication, setLoginForm, navigateToHome } = useAuthStore();
    const { existSession } = sessionStore();

    const [isRegister, setIsRegister] = useState<boolean>(false);

    const handleClick = () => { authentication() }

    const toggleIsRegister = () => setIsRegister(!isRegister);

    useEffect(() => {
        if(existSession('auth')) return navigateToHome();
    });

    useEffect( () => {
        if(message) toast.error(message);
    }, [message])

    return (
        <>
            <div className={`flex flex-col sm:flex-row w-dvw h-dvh relative justify-center items-center md:justify-normal`}>
                <LoginCard 
                    loginForm={ loginForm }
                    isRegister={ isRegister }
                    setLoginForm={ setLoginForm }
                    handleClick={ handleClick }
                    toggleIsRegister={ toggleIsRegister }
                />
                <RegisterCard 
                    isRegister = { isRegister }
                    toggleIsRegister={ toggleIsRegister }
                />
                <div className="w-dvw h-dvh sm:flex absolute z-[9]">
                    <div className={`absolute sm:relative ${ isRegister ? 'sm:w-[35vw]' : 'sm:w-[65vw]' } sm:h-full flex justify-center items-center bg-[#F0F0F0] transition-all duration-500 ease-in` }></div>
                    <div className={`absolute sm:relative  ${ isRegister ? 'sm:w-[65vw] animate-second-background-reverse' : 'sm:w-[35vw] animate-second-background-normal' } sm:h-full flex justify-center items-center bg-orange-400 transition-all duration-500 ease-in`}></div>
                </div>
            </div>
        </>
    )
}


