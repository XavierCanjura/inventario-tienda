export const sessionStore = () => {

    function saveSession<T>(key: string, data: T): void{
        const dataString = JSON.stringify(data);
        sessionStorage.setItem(key, dataString);
    }

    function getSession<T>(key: string): T | string {
        const dataString = sessionStorage.getItem(key);

        if(!existSession(key)) return "No se encontro la session";

        const data: T = JSON.parse(dataString!);
        
        return data;
    }

    const existSession = (key: string): boolean => {
        const dataString = sessionStorage.getItem(key);
        if(!dataString) return false;
        return true;
    }

    const destroySession = (key: string) => {
        sessionStorage.removeItem(key);
    }

    return {

        // methods
        existSession,
        getSession,
        saveSession,
        destroySession
    }
}