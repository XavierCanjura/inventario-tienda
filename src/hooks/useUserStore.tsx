import { useState } from "react"
import { User } from "../interfaces"
import { firebaseApi } from "../apis/firebase";
import { showMessage } from "../helpers/message";


const initialValues: User = {
    id: '',
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
}

export const useUserStore = () => {

    const { addData, getData } = firebaseApi();

    const [usersList, setUsersList] = useState<User[]>([]);
    const [userForm, setUserForm] = useState<User>(initialValues);
    const [isRegister, setIsRegister] = useState<boolean>(false);


    const toggleIsRegister = (): void => setIsRegister(!isRegister);

    const isValidUserForm = (user: User): boolean => {
        if(user.name.trim().length === 0)     return false;
        if(user.lastname.trim().length === 0) return false;
        if(user.username.trim().length === 0) return false;
        if(user.email.trim().length === 0)    return false;
        if(user.password.trim().length === 0) return false;

        return true;
    }

    const createUser = (): void => {
        if( !isValidUserForm(userForm) ) return showMessage({ message: "Completar los campos requeridos", type: "warning" });

        addUser(userForm);
        toggleIsRegister();
        showMessage({ message: "Usuario creado correctamente", type: "success" })
    }

    const getUsers = async () => {
        const users = await getData('users') as User[];
        const usersMapper: User[] = users.map((user) => ({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password
        }))
        setUsersList([ ...usersMapper ]);
    }

    const addUser = (user: User) => {
        const date = new Date();
        user.id = date.getTime().toString();
        addData('users', user);
        getUsers();
    }
    const updateUser = () => {}
    const deleteUser = () => {}

    return {
        // properties
        usersList,
        userForm,
        isRegister,

        // methods
        createUser,
        setUserForm,
        toggleIsRegister,
        getUsers,
        addUser,
        updateUser,
        deleteUser
    }
}