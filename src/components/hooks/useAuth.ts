import { useAppSelector } from "@/redux/hooks";

export default function UseAuth(){
    const auth = useAppSelector(state=>state.auth);
    if(auth?.accessToken && auth?.user){
        return true;
    }
    else{
        return false;
    }
}