import { useEffect, useState } from "react";

const useCurrentViewPort = () =>{
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() =>{
        // add listener when user resize width
        window.addEventListener('resize', () =>{
            setWidth(window.innerWidth);
            
        });

        // remove listener
        return(() =>{
            window.removeEventListener('resize', () =>{
                setWidth(window.innerWidth);
            });
        })
    }, []);
    return {
        width,
        isMobile: width <= 768
    }
};

export default useCurrentViewPort;