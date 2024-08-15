import { useMediaQuery } from "react-responsive"

export const useMediaQueris = () => {
    const isTablet = useMediaQuery({ query: "(max-width: 768px)"});

    return{
        // propierties
        isTablet
        //methods
    }
}