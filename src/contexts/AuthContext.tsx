import { createContext, useEffect, useState } from "react"
import { FCC } from "../@types/types";


const AuthContext =createContext({
    isLoggedIn:false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login:(jwt:string)=>{},
    logout:()=>{},
});
export const AuthContextProvider:FCC=({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            setIsLoggedIn(true);
        }
    },[]);


    const login=(jwt:string)=>{
        localStorage.setItem("token",jwt);
        setIsLoggedIn(true);
    };
    const logout=()=>{
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };
    // const contextValue={
    //     isLoggedIn:isLoggedIn,
    //     login:login,
    //     logout:logout,
    // };
    return(
     <AuthContext.Provider value={{isLoggedIn,login,logout}}>
    {children}
    </AuthContext.Provider>
    );
}
  


export default AuthContext