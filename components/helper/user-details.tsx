'use server'

import axios from "axios";

interface UserDetailsProps{
    id?:string
}
const UserDetails = async({id}:UserDetailsProps) => {
    const currentUser=await axios.get("api/users",{params:id})
    return ( 
        <div>
            

        </div>
        
     );
}
 
export default UserDetails;