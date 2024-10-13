import { User } from "../../interfaces";
import { ButtonCustom } from "../buttons/ButtonCustom"
import { InputCustom } from "../inputs/InputCustom"

export const RegisterCard = ({
    registerForm,
    isRegister,
    setRegisterForm,
    toggleIsRegister,
    handleClick
}:{
    registerForm: User;
    isRegister: boolean;
    toggleIsRegister: () => void;
    setRegisterForm: React.Dispatch<React.SetStateAction<User>>;
    handleClick: () => void;
}) => {
    return (
        <div className={`absolute w-[90vw] h-[75vh] sm:min-w-[400px] sm:w-[50vw] md:max-w-[500px] bg-[#F0F0F0] shadow-2xl rounded-lg top-[10vh] sm:top-0 sm:bottom-0 sm:m-auto sm:right-[calc(65vw/2-200px)] md:right-[calc(65vw/2-250px)] z-10  ${ isRegister ? 'animate-in-register' : 'animate-out-register'} `}>            
            <div className="w-full h-full flex flex-col justify-center px-[5%]">
                <div className="flex justify-start">
                    <img className="w-[100px] h-[100px] mb-3" src="./img/shop.png" alt="image-register" />
                </div>
                <div className="overflow-y-auto md:overflow-hidden">

                    <h1 className="text-5xl font-extrabold mb-4">Registrate</h1>

                    <div className="flex flex-wrap">
                        <InputCustom 
                            label="Nombres"
                            placeholder="Juan"
                            type="text"
                            parentClass="md:!w-6/12 pr-1"
                            value={ registerForm.name }
                            onChange={ (event) => setRegisterForm({ ...registerForm, name: event.target.value }) }
                        />
                        <InputCustom 
                            label="Apellidos"
                            placeholder="Perez"
                            type="text"
                            parentClass="md:!w-6/12 pl-1"
                            value={ registerForm.lastname }
                            onChange={ (event) => setRegisterForm({ ...registerForm, lastname: event.target.value }) }
                        />
                    </div>
                    <InputCustom 
                        label="Nombre de usuario"
                        placeholder="Nombre de usuario"
                        type="text"
                        parentClass="md:w-full pr-1"
                        value={ registerForm.username }
                        onChange={ (event) => setRegisterForm({ ...registerForm, username: event.target.value }) }
                    />
                    <InputCustom 
                        label="Correo electronico"
                        placeholder="juan@mail.com"
                        type="email"
                        parentClass="md:w-full pr-1"
                        value={ registerForm.email }
                        onChange={ (event) => setRegisterForm({ ...registerForm, email: event.target.value }) }
                    />
                    <InputCustom 
                        label="Contraseña"
                        type="password"
                        placeholder="Contraseña"
                        parentClass="md:w-full mb-4"
                        value={ registerForm.password }
                        onChange={ (event) => setRegisterForm({ ...registerForm, password: event.target.value }) }
                    />

                </div>
                <div className="w-full flex flex-col items-center my-2">
                    <ButtonCustom 
                        text="Crear Cuenta"
                        type="button"
                        buttonClass="w-[150px]"
                        onClick={ handleClick }
                    />
                    
                    <label className="mt-3 text-lg text-center text-pretty">
                        <span className="">¿Ya tiene una cuenta? </span> 
                        <span 
                            onClick={ toggleIsRegister } 
                            className="text-orange-700 underline cursor-pointer"
                        >Inicia Sesion</span>
                    </label>

                </div>
            </div>
        </div>
    )
}
