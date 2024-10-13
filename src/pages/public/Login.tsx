import { useEffect } from "react";

import { useAuthStore, useUserStore } from "../../hooks";
import { sessionStore } from "../../helpers/sessionStore";

import { LoginCard, RegisterCard } from "../../components";

export const Login = () => {

    const { loginForm,  authentication, setLoginForm, navigateToHome } = useAuthStore();
    const { userForm, isRegister, setUserForm, createUser, toggleIsRegister } = useUserStore();
    const { existSession } = sessionStore();

    const handleClick = () => { authentication() }

    useEffect(() => {
        if(existSession()) return navigateToHome();
    });

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
                    registerForm={ userForm}
                    isRegister = { isRegister }
                    toggleIsRegister={ toggleIsRegister }
                    setRegisterForm={ setUserForm }
                    handleClick={ createUser }
                />
                <div className="w-dvw h-dvh sm:flex absolute z-[9]">
                    <div className={`absolute sm:relative ${ isRegister ? 'sm:w-[35vw]' : 'sm:w-[65vw]' } sm:h-full flex justify-center items-center bg-[#F0F0F0] transition-all duration-500 ease-in` }></div>
                    <div className={`absolute sm:relative  ${ isRegister ? 'sm:w-[65vw] animate-second-background-reverse' : 'sm:w-[35vw] animate-second-background-normal' } sm:h-full flex justify-center items-center bg-orange-400 transition-all duration-500 ease-in`}></div>
                </div>
            </div>
        </>
    )
}


