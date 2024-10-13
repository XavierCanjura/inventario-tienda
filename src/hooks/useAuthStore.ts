import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { firebaseApi } from "../apis/firebase";

import { LoginForm, User } from "../interfaces"
import { sessionStore } from "../helpers/sessionStore";
import { showMessage } from "../helpers/message";

export const useAuthStore = () => {

    const initialValue: LoginForm = { email: "", password: "" }

    const { getData } = firebaseApi();
    const { saveSession, destroySession } = sessionStore();

    const [loginForm, setLoginForm] = useState<LoginForm>(initialValue);

    const resetLoginForm = () => setLoginForm({ ...initialValue });
    const navigate = useNavigate();

    // VALIDATES
    const validateForm = (form: LoginForm): boolean => {
        if(form.email.trim().length === 0) return false;
        if(form.password.trim().length === 0) return false;

        return true;
    }

    // FUNCITONS
    const authentication = async () => {
        if(!validateForm(loginForm)) return showMessage({ message: "Completar los campos requeridos", type: 'warning' });


        const users = await getData('users') as User[];
        const usersMapper: User[] = users.map((user) => ({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password
        }));

        const user: User[] = usersMapper.filter( user => user.email === loginForm.email && user.password === loginForm.password );
        const isUserValid: boolean = user.length > 0;

        if(!isUserValid) return showMessage({ message: "Las credenciales son incorrectas", type: "warning" });
        saveSession<User>( { ...user[0], password: "" });
        resetLoginForm();
        navigateToHome();
    }

    const logout = (): void => {
        destroySession();
        navigateToLogin();
    }

    // NAVIGATES
    const navigateToHome = () => navigate('/dash/productos');
    const navigateToLogin = () => navigate('/login');


    return {
        // properties
        loginForm,

        // methods
        authentication,
        logout,
        setLoginForm,
        navigateToHome,
        navigateToLogin,

    }
}