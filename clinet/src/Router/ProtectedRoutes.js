import { useContext, useEffect, useState } from 'react';
import {useLocation, Outlet, Navigate} from 'react-router-dom';
import { AuthContext } from '../contexts';
import {getMe} from '../Model/API'
import { getAuthToken } from '../Model/utils'



const ProtectedRoutes = () => {
    const location = useLocation();
    const [auth, setAuth] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    let token = getAuthToken();

    useEffect(()=>{
        let token = getAuthToken();
        if(token){
            getMe()
            .then((json)=>{
                if(json.success){
                    setAuth(true);
                }else{
                    throw new Error("please log in") 
                }
            })
            .catch((err) => {
                setAuth(false);
                localStorage.removeItem("token");
              })
            .finally(() => setIsTokenValidated(true));
        }else{
            setIsTokenValidated(true);
        }
    },[])
    if (!isTokenValidated) return <div>logining</div>;
    return (auth ? <Outlet/> : <Navigate to='/login' replace state={{ from: location }} />);
}

export default ProtectedRoutes