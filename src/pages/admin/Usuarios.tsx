import { useEffect, useState } from "react";
import { ButtonCustom, InputCustom, Modal, UserItem } from "../../components"
import { PrivateLayout } from "../../layouts/PrivateLayout"
import { AddIcon } from "../../assets/icons/Add";
import { useUserStore } from "../../hooks";
import { User } from "../../interfaces";
import { CloseIcon } from "../../assets/icons/Close";

const initialValues: User = {
    id: '',
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
}

export const Usuarios = () => {
    const { usersList, getUsers, addUser} = useUserStore();
    const [inputSearch, setInputSearch] = useState<string>('');
    const [userForm, setUserForm] = useState<User>(initialValues);
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false);

    const handleAddUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(userForm.name === '' 
        || userForm.lastname === '' 
        || userForm.username === '' 
        || userForm.email === '' 
        || userForm.password === '') return;
        addUser(userForm);
        toggleShowModalAdd();
        setUserForm({ ...initialValues });
    }

    const toggleShowModalAdd = () => setShowModalAdd(!showModalAdd);

    const handleClickCancel = () => {
        toggleShowModalAdd();
        setUserForm({ ...initialValues });
    }

    const searchUser = (): User[] => {
        if(inputSearch === '') return usersList;
        const usersSearch: User[] = usersList.filter( (user) => 
            user.name.toLowerCase().includes( inputSearch.toLowerCase() ) 
            || user.lastname.toLowerCase().includes( inputSearch.toLowerCase() ) 
        );
        return usersSearch;
    }

    useEffect( () => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PrivateLayout title="Usuarios">
                <div className="flex flex-wrap justify-end my-3 gap-3 sticky z-[99] top-0 bg-[#F0F0F0]">
                    <InputCustom 
                        placeholder="Buscar"
                        onChange={ (event) => setInputSearch(event.target.value) }

                    />
                    <ButtonCustom 
                        text="Agregar Usuario"
                        buttonClass="hidden md:block"
                        onClick={ toggleShowModalAdd }
                    />
                </div>

                <div className="flex flex-wrap flex-col gap-2.5 pb-3 relative overflow-x-auto">
                    <div className="flex min-w-max gap-2 border rounded-[20px] h-[50px] max-h-fit bg-[#F0F0F0] p-3 shadow-md">
                        <div className='min-w-[150px] xl:w-5/12 font-bold text-lg'>Nombre</div>
                        <div className='min-w-[150px] xl:w-5/12 font-bold text-lg'>Apellido</div>
                        <div className='min-w-[150px] xl:w-5/12 font-bold text-lg'>Usuario</div>
                        <div className='min-w-[150px] xl:w-5/12 font-bold text-lg'>Correo Electronico</div>
                        <div className='min-w-[150px] xl:w-5/12 font-bold text-lg text-center'>Opciones</div>
                    </div>

                    {/* Registers */}
                    {
                        usersList.length === 0 && (<h1 className="text-center">Cargando....</h1>)
                    }
                    {
                        searchUser().map( (user, index) => ( 
                            <UserItem key={ index } user={ user } />
                        ))
                    }
                </div>

                <div className="md:hidden fixed w-[50px] h-[50px] bg-orange-600 rounded-full bottom-2 right-2 shadow-lg" onClick={ toggleShowModalAdd }>
                    <button className="w-full h-full flex justify-center items-center"><AddIcon /></button>
                </div>
            </PrivateLayout>

            <Modal show={ showModalAdd }>
                <div className="w-full flex flex-col px-5 py-3">
                    <div className="relative">
                        <h2 className="text-xl md:text-3xl md:text-center font-semibold uppercase">Agregar Usuario</h2>
                        <div className="absolute w-[25px] h-[25px] top-0 right-0 cursor-pointer" onClick={ toggleShowModalAdd }>
                            <CloseIcon stroke="!stroke-orange-600" />
                        </div>
                    </div>                    
                    <form className="w-full flex flex-wrap mt-5 overflow-y-auto" method="post" onSubmit={ handleAddUser }>
                        <div className="w-full flex flex-wrap justify-between gap-3 md:gap-2">
                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Nombre del usuario"
                                placeholder="Ingrese el nombre"
                                value={ userForm.name }
                                onChange={ (event) => setUserForm({ ...userForm, name: event.target.value }) }
                            />

                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Apellido del usuario"
                                placeholder="Ingrese un apellido"
                                type="text"
                                value={ userForm.lastname }
                                onChange={ (event) => setUserForm({ ...userForm, lastname: event.target.value }) }
                            />
                            
                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Usuario"
                                placeholder="Ingrese el usuario"
                                value={ userForm.username }
                                onChange={(event) => setUserForm({ ...userForm, username: event.target.value }) }
                            />
                            
                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Correo electronico"
                                placeholder="Ingrese el correo"
                                value={ userForm.email }
                                onChange={(event) => setUserForm({ ...userForm, email: event.target.value }) }
                            />
                            
                            <InputCustom 
                                parentClass="md:w-[45%]"
                                label="Contraseña del usuario"
                                placeholder="Ingrese una contraseña"
                                type="password"
                                value={ userForm.password }
                                onChange={ (event) => setUserForm({ ...userForm, password: event.target.value }) }
                            />

                        </div>

                        <div className="flex w-full border-t justify-end mt-8 pt-2 gap-x-2">
                            <ButtonCustom 
                                text="Agregar"
                                type="submit"
                            />
                            
                            <ButtonCustom 
                                text="Cancelar"
                                buttonClass="bg-slate-600"
                                type="button"
                                onClick={ handleClickCancel }
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}
