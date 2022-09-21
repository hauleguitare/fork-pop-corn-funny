import { useEffect, useState } from "react";

export function useScrollEvent() {
    const [scrollPos, setScrollPos] = useState<number>(0);
    useEffect(() =>{
        const updatePos = () =>{
            setScrollPos(window.pageYOffset);
        }
        window.addEventListener('scroll', updatePos)

        return() =>{
            window.removeEventListener('scroll', updatePos)
        }
    }, []);
    return [scrollPos] as const;
}