import { createContext, useState } from "react";


export const AppConText = createContext();
export const AppConTextProvider = (props) => {
    const { children } = props;
    const [isLogin, setisLogin] = useState(false);
    const [infoUser, setinfoUser] = useState({});
    const [movieId,setmovieId] = useState({});

    return (
        <AppConText.Provider value={{ isLogin, setisLogin, infoUser, setinfoUser,movieId,setmovieId }}>
            {children}
        </AppConText.Provider>
    )
}