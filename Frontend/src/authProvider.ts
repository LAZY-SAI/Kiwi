
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI
export const authProvider = {
    login: async() => ({success:true, redirectTo:"/account"}),
    check:async()=>({authenticated:true}),
    logout:async()=>({success:true, redirectTo:"login"}),
    onError:async(error : any)=>({error}),
    getIdentity: async()=>{
        const response = await fetch(`${BACKEND_URI}/api/users`)
           if (response.ok)
           {
            const Result =  await response.json()

                return Result;

           }

           return null
    }
}