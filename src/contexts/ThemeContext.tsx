import { createContext, useState } from "react";
import { FCC } from "../@types/types";

export const ThemeContext=createContext({
    theme:'light',
    toggle:()=>{}
});
export const ThemeProvider:FCC=(props)=>{
    const [theme,setTheme]=useState("light");
    function toggle(){
        const newTheme=theme==="light"?"dark":"light";
        if(newTheme=="dark"){
            document.body.classList.add("dark");
        }
           else{
                document.body.classList.remove("dark");
              
           }
        setTheme(newTheme);
    }
    return(
        <ThemeContext.Provider value={{theme,toggle}}>
            {props.children}
        </ThemeContext.Provider>
    )
}