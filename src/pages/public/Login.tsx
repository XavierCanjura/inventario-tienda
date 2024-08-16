import { useEffect } from "react";
import { firebaseApi } from "../../apis/firebase"
import { ButtonCustom, InputCustom } from "../../components";

export const Login = () => {

    const { getData } = firebaseApi();

    useEffect( () => {
        getData('productos');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col sm:flex-row w-dvw h-dvh">
            <div className="w-full h-[60vh] sm:w-[65vw] sm:h-full flex justify-center items-center bg-[#F0F0F0] relative">
                <div className="absolute sm:relative w-[90vw] h-[70vh] sm:min-w-[400px] sm:w-[50%] md:max-w-[500px] sm:h-[60%] bg-white shadow-2xl rounded-lg top-[10vh] sm:top-0">
                    <div className="w-full h-full flex flex-col justify-center px-[10%]">
                        <div className="flex justify-start">
                            <img className="w-[100px] h-[100px] mb-[5%]" src="./img/shop.png" alt="" />
                        </div>
                        <h5 className="text-md text-black/50 ">Bienvenido !!!</h5>
                        <h1 className="text-5xl font-extrabold mb-[5%]">Login</h1>
                        <InputCustom 
                            label="Correo electronico"
                            type="email"
                            parentClass="md:w-full my-4"
                        />
                        <InputCustom 
                            label="Contraseña"
                            type="password"
                            parentClass="md:w-full mb-4"
                        />

                        <div className="w-full flex justify-center">
                            <ButtonCustom 
                                text="Ingresar"
                                type="button"
                                buttonClass="w-[150px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[40vh] sm:w-[35vw] sm:h-full bg-orange-400"></div>
        </div>
    )
}
