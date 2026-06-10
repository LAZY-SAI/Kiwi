import React, { useState, ChangeEvent } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

import "react-toastify/dist/ReactToastify.css";
//import {useAuth} from "../context/AuthContext";


import "react-phone-input-2/lib/style.css";

const API_URI = import.meta.env.VITE_BACKEND_URI;
interface InputFieldProps{
    type:string, 
    placeholder:string,
    value:string,
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    icon?:React.ReactNode;
    name:string,
    error?:string,
    suffix?:React.ReactNode
}

interface AuthOverLayProps{
    isLoginView:boolean;
    onToggle:()=> void;
}
interface UserData{
    id:string
    name:string,
    email:string,
    location: string,
    bio:string,
    role: "ADMIN" | "USER";

}

// interface AuthResponse {
//   accessToken: string;
//   user: UserData;
//   message?: string;
// }

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


const AuthOverlay:React.FC<AuthOverLayProps> = ({ isLoginView, onToggle }) => (
  <div className={`absolute top-0 left-0 w-1/2 h-full bg-indigo-600 z-50 transition-transform duration-700 ease-in-out flex flex-col items-center justify-center text-white text-center overflow-hidden ${isLoginView ? "translate-x-full" : "translate-x-0"}`}>
    <div className="p-12 z-10">
      <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter leading-none">
        {isLoginView ? "Start Your Journey!" : "Welcome Back!"}
      </h2>
      <p className="text-indigo-100 mb-10 font-medium">
        {isLoginView ? "Enter your personal details and start your journey." : "To keep connected please login with your info."}
      </p>
      <p className="text-indigo-100 mb-3 font-medium">{isLoginView ? "Already have an account?" : "Don't have an account?"}</p>
      <button onClick={onToggle} className="px-10 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-indigo-600 transition-all active:scale-95 shadow-xl">
        {isLoginView ? "Log In" : "Sign Up"}
      </button>
    </div>
    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50" />
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-50" />
  </div>
);

const Signup:React.FC = () => {
  const navigate = useNavigate();
  //const {login} = useAuth()
  const  login  = () => {}
  const [isLoginView, setIsLoginView] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
    signupName: "",
    signupLocation:"",
    SignupBio:"",
    signupEmail: "",
    signupPassword: "",

  });

  const [errors, setErrors] = useState<Record<string,string>>({});

  // Real-time validation
  const runRealTimeValidation = (name:string, value:string) => {
    let errorMsg = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case "signupEmail":
      case "loginEmail":
        if (value && !emailRegex.test(value)) errorMsg = "Invalid email format";
        break;
      case "signupPassword":
        if (value && value.length < 6) errorMsg = "Password too short (min 6)";
        break;
      case "signupName":
        if (value && value.length < 3) errorMsg = "Username too short";
        break;
      case "signupLocation":
        if(value && value.length < 4) errorMsg = "must be valid location"
            break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    runRealTimeValidation(name, value);
  };

 


  const validateAll = (isLogin:boolean):boolean => {
    const newErrors:Record<string, string> = {};
    if (isLogin) {
      if (!formData.loginEmail) newErrors.loginEmail = "Email required";
      if (!formData.loginPassword) newErrors.loginPassword = "Password required";
    } else {
      if (!formData.signupName) newErrors.signupName = "Required";
      if (!formData.signupEmail) newErrors.signupEmail = "Email required";


      if (formData.signupPassword.length < 6) newErrors.signupPassword = "Min 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignup = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll(false)) return;
    try {
      const res = await fetch(`${API_URI}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.signupEmail,
          name: formData.signupName,
          password: formData.signupPassword,
          location: formData.signupLocation
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Account Created Successfully! Please login.");

        setFormData(prev => ({
          ...prev,
          signupName: "",
          signupLocation: "",
          signupEmail: "",
          signupPassword: ""
        }));
        // Switch to login view
        setTimeout(() => {
          setIsLoginView(false);
        }, 1000);
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll(true)) return;

    try {
      const res = await fetch(`${API_URI}/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.loginEmail,
          password: formData.loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save basic user info
      localStorage.setItem("token", data.token);

      localStorage.setItem("name",data.user.name);
      localStorage.setItem("role", data.user.role);

      toast.success(`Welcome back, ${data.user.name}!`);

      // Navigate based on role
      setTimeout(() => {
        if (data.user.role === "customer") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);

    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 font-sans p-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-225 h-162.5 bg-white rounded-4xl shadow-2xl relative overflow-hidden flex">

        {/* REGISTER SECTION */}
        <div className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center p-12 transition-all duration-700 z-10 ${!isLoginView ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`}>
          <h2 className="text-3xl font-black text-indigo-600 mb-4 uppercase tracking-tighter">Register</h2>
          <form onSubmit={onSignup} className="w-full flex flex-col items-center overflow-y-auto max-h-full py-4 custom-scrollbar px-2">
            <InputField type="text" placeholder="Username" name="signupName" value={formData.signupName} onChange={handleInputChange} icon={<FaUser/>} error={errors.signupName} />

            <InputField type="text" placeholder="location" name="signupLocation" value={formData.signupLocation} icon={<MdLocationOn/>} onChange={handleInputChange} error={errors.signupLocation}/>


            <InputField type="email" placeholder="Email" name="signupEmail" value={formData.signupEmail} onChange={handleInputChange} icon={<FaEnvelope />} error={errors.signupEmail} />
            <InputField type="password" placeholder="Password" name="signupPassword" value={formData.signupPassword} onChange={handleInputChange} icon={<FaLock />} error={errors.signupPassword} />

            <button className="w-full max-w-xs py-3 mt-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
              Create Account
            </button>
          </form>
        </div>

        {/* LOGIN SECTION */}
        <div className={`absolute top-0 right-0 h-full w-1/2 flex flex-col justify-center items-center p-12 transition-all duration-700 z-10 ${isLoginView ? "opacity-0 -translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`}>
          <h2 className="text-3xl font-black text-indigo-600 mb-8 uppercase tracking-tighter">Login</h2>
          <form onSubmit={onLogin} className="w-full flex flex-col items-center">
            <InputField type="email" placeholder="Email" name="loginEmail" value={formData.loginEmail} onChange={handleInputChange} icon={<FaEnvelope />} error={errors.loginEmail} />
            <InputField
              type={showPass ? "text" : "password"}
              placeholder="Password" name="loginPassword"
              value={formData.loginPassword} onChange={handleInputChange}
              icon={<FaLock />} error={errors.loginPassword}
              suffix={<div onClick={() => setShowPass(!showPass)} className="hover:text-indigo-600 transition-colors">{showPass ? <FaEyeSlash /> : <FaEye />}</div>}
            />
            <button className="w-full max-w-xs py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
              Log In
            </button>
          </form>
        </div>

        <AuthOverlay isLoginView={isLoginView} onToggle={() => { setIsLoginView(!isLoginView); setErrors({}); }} />
      </div>
    </div>
  );
};

export default Signup;