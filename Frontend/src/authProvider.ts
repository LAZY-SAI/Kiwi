
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI

export const authProvider = {

    login: async() => ({success:true, redirectTo:"/account"}),
    check:async()=>{
        const token = localStorage.getItem("token");
        if(!token) return {
            authenticated:false, redirectTo:"/signup"
        }
        return {authenticated:true}
    },
    logout:async()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        return {success:true, redirectTo:"/login"}
    },
    onError:async(error : any)=>({error}),
    getIdentity: async()=>{
        const token = localStorage.getItem("token");
        if(!token) return null;

        try{
            const response = await fetch(`${BACKEND_URI}/api/users`,
                {
                    method:"GET",
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
           if(response.ok)
           {
               const data = await response.json()
               return{

                   name:data.name,
                   email:data.email,
                   location:data.location
               }
           }
           return null
        }
        catch (e) {

            console.error("error in fetching ",e)
            return null
        }
    }
}