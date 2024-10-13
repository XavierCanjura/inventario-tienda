export const sessionStore = () => {

    function saveSession<T>(data: T): void{
        const dataString = JSON.stringify(data);
        sessionStorage.setItem('auth', dataString);
    }

    function getSession<T>(): T | undefined {
        const dataString = sessionStorage.getItem('auth');

        if(!existSession()) return;

        const data: T = JSON.parse(dataString!);
        
        return data;
    }

    const existSession = (): boolean => {
        const dataString = sessionStorage.getItem('auth');
        if(!dataString) return false;
        return true;
    }

    const destroySession = () => {
        sessionStorage.removeItem('auth');
    }

    return {

        // methods
        existSession,
        getSession,
        saveSession,
        destroySession
    }
}