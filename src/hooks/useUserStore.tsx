import { useState } from "react"
import { User } from "../interfaces"
import { firebaseApi } from "../apis/firebase";


export const useUserStore = () => {

    const { addData, getData } = firebaseApi();

    const [usersList, setUsersList] = useState<User[]>([]);

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

        // methods
        getUsers,
        addUser,
        updateUser,
        deleteUser
    }
}