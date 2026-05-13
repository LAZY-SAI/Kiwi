import { useContext,useState, useEffect, createContext } from "react"

interface User{
    token:string,
    username:string
}

interface AuthContextType{
    user: User | null,
    loading: boolean,
    login:(userData: User, token: string) => void
    logout:()=> void    
}
const AuthContext = createContext<AuthContextType | null>(null)
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user,setUser] = useState<User | null>(null)
    const [loading, setLoading]= useState<boolean>(true)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            setUser(JSON.parse(token))
        }
        setLoading(false)
    },[])
    const login = (userData:User,token:string)=>{
        localStorage.setItem('token',token)
        setUser(userData)
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setUser(null)
    }
  return (
   <AuthContext.Provider value={{user, login, logout, loading}}>
    {children}
   </AuthContext.Provider>
  )
}



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};