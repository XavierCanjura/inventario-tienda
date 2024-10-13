import { LoginForm } from "../../interfaces"
import { ButtonCustom } from "../buttons/ButtonCustom"
import { InputCustom } from "../inputs/InputCustom"

export const LoginCard = ({
    loginForm,
    isRegister,
    setLoginForm,
    handleClick,
    toggleIsRegister
}:{
    loginForm: LoginForm;
    isRegister: boolean;
    setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>;
    handleClick: () => void;
    toggleIsRegister: () => void
}) => {

    return (
        <div className={`absolute w-[90vw] h-[70vh] sm:min-w-[400px] sm:w-[50vw] md:max-w-[500px] bg-[#F0F0F0] shadow-2xl border rounded-lg top-[10vh] sm:top-0 sm:bottom-0 sm:my-auto sm:left-[calc(65vw/2-200px)] md:left-[calc(65vw/2-250px)] z-10 ${ isRegister ? 'animate-out-login' : 'animate-in-login' }`}>
            <div className="w-full h-full flex flex-col justify-center px-[7%]">
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

                <div className="w-full flex flex-col items-center">
                    <ButtonCustom 
                        text="Ingresar"
                        type="button"
                        buttonClass="w-[150px]"
                        onClick={ handleClick }
                    />

                    <label className="mt-3 text-orange-700 underline cursor-pointer" onClick={ toggleIsRegister }>Registrarse</label>
                </div>
            </div>
        </div>
    )
}
