import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { firebaseApi } from "../apis/firebase";

import { LoginForm, User } from "../interfaces"
import { sessionStore } from "../helpers/sessionStore";

export const useAuthStore = () => {

    const initialValue: LoginForm = { email: "", password: "" }

    const { getData } = firebaseApi();
    const { saveSession } = sessionStore();

    const [loginForm, setLoginForm] = useState<LoginForm>(initialValue);
    const [message, setMessage] = useState<string | null>(null);

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
        if(!validateForm(loginForm)) return handleMessage("Completar los campos requeridos");


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

        if(!isUserValid) return handleMessage("Las credenciales son incorrectas");
        saveSession<User>('auth', { ...user[0], password: "" });
        resetLoginForm();
        navigateToHome();
    }

    // NAVIGATES
    const navigateToHome = () => navigate('/dash/productos');
    const navigateToLogin = () => navigate('/login');


    // HANDLES
    const handleMessage = (message: string) => {
        setMessage(message);
        setTimeout( () => { setMessage(null) }, 1000);
    }

    return {
        // properties
        loginForm,
        message,

        // methods
        authentication,
        setLoginForm,
        navigateToHome,
        navigateToLogin
    }
}