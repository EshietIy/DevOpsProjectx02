
import { useSelector } from "react-redux";

export default function userAuth(){
    
    const {user} = useSelector((state:any) => state.auth);
    // console.log("user", user);
    // Check if user is authenticated
    // This can be a simple check like checking if user object exists
    if(user){
        return true;
    }
    else{
        return false;
    }
}