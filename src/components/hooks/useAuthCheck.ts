import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";

export default function UseAuthCheck(){
    const dispatch = useAppDispatch();
    const [authChecked, setAuthChecked] = useState(false);
    useEffect(()=>{
        const localAuth = localStorage?.getItem("auth");
        if(localAuth){
            const auth = JSON.parse(localAuth);
            if(auth?.accessToken && auth?.user){
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user
                }));
            }
        }
        setAuthChecked(true);
    },[dispatch])
}