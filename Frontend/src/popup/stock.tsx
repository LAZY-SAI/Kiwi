import  {useForm} from "@refinedev/core";
import { ToastContainer, toast } from "react-toastify";
import React, {ChangeEvent, useState} from "react";
interface InputFieldProps {
   type:string,
    placeholder:string,
    value:string,
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    icon?:React.ReactNode;
    name:string,
    error?:string,
    suffix?:React.ReactNode


}

interface IBrandFormValues{
    name:string,
    description:string,
    image_url:string,

}
const InputField :React.FC<InputFieldProps >= ({ type, placeholder, value, onChange, icon, name, error, suffix }) => (
    <div className="relative w-full max-w-xs mb-6">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">{icon}</span>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full pl-10 pr-10 py-3 border-b-2 bg-transparent outline-none transition-all text-gray-700 ${
                error ? "border-red-500" : "border-gray-200 focus:border-indigo-600"
            }`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">{suffix}</span>}
        {error && <p className="text-red-500 text-[10px] font-bold uppercase mt-1 absolute whitespace-nowrap">{error}</p>}
    </div>
);
const StockForm = () => {
    const {onFinish, formLoading} = useForm<IBrandFormValues>({
            resource:"brands",
            action:"create",
        onMutationSuccess:()=>{
                setFormValues({name:"", description:"", image_url:""})
    }
    })

    const {formValues, setFormValues} = useState<IBrandFormValues>(
        {
            name:"",
            description:"",
            image_url:""
        }
    )
    return (
        <form>
        <InputField type={"text"} placeholder={"Name of the product"} />
        </form>
    );
};

export default StockForm;