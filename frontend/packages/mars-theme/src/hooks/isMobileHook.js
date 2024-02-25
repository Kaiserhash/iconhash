import React, { useEffect, useState } from 'react';
import {theme} from "../constants/theme";
const isMobileHook = () => {
    const [isMobile, setIsMobile] = useState(false)
    const handleResize = () => {
        if(window) {
            if (window.innerWidth < +theme.screens.lg.replace(/\D/g,'')) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

    }
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    },[]);
    return isMobile;
}

export default isMobileHook;