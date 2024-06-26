import {CheckCircledIcon} from "@radix-ui/react-icons"
interface FormSuccessProps{
    message?:String
}
const FormSuccess = ({message}:FormSuccessProps) => {
    if(!message)
        return null;
    return (  
        <div className="bg-emerald-500/15 flex items-center gap-x-2 rounded p-3 text-destructive text-sm text-green-500">
            <CheckCircledIcon className="h-3 w-4"/>
            <p>
                {message}
            </p>
        </div>

    );
}
export default FormSuccess
 