import { FaExclamationTriangle } from "react-icons/fa";
interface FormErrorProps{
    message?:string;
}
const FormError = ({message}:FormErrorProps) => {
    if(!message)
        return null;
    return (  
        <div className="bg-destructive/15 flex items-center gap-x-2 rounded p-3 text-destructive text-sm">
            <FaExclamationTriangle className="h-3 w-4"/>
            <p>
                {message}
            </p>
        </div>

    );
}
 
export default FormError;