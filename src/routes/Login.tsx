
import { useForm } from 'react-hook-form'
import { LoginType } from '../@types/types'
import patterns from '../validation/patterns'
import { auth } from '../services/auth'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import {  useNavigate } from 'react-router-dom'
import { Checkbox, Label } from 'flowbite-react'

const Login = () => {
  const authContext=useContext(AuthContext);
  const navigate=useNavigate();
const onLogin = (data: LoginType) => {

    auth
      .login(data)
      .then((res: { data: string }) => {
        const jwt = res.data as string;
        authContext.login(jwt);
       navigate("/");
       
        //save the JWT in localStorage

        //context auth -> isLoggedIn = true (app wide state)
        //go to the home page -> navigate("/")
      })
      .catch((e: { response: { data: string } }) => {
        const errorMessage = e.response.data as string;
        alert(errorMessage);
      });

  };

    const{
        register,
         handleSubmit,
         formState:{errors,isValid},}=useForm<LoginType>({mode:"onTouched" , defaultValues:{email:"adawiahmad78@gmail.com",password:"ahmad123$"}});

  return (
    <>
   
    
    <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md flex flex-col gap-4" noValidate onSubmit={handleSubmit(onLogin)}>
       <p className="text-gray-600 text-lg mb-4 ">Please enter your credentials:</p>
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
        <input
         className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
         type="email" 
         placeholder="Email"
          autoComplete='email'
           {...register("email",{pattern:{
            value:patterns.email,
            message:"Invalid email"
        },
        })}
        />
       <p className="text-red-500">{errors.email?.message}</p>
        <input
         className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
         type="password"
          placeholder="Password"
           autoComplete='current-password'
            {...register("password",{ 
            pattern:{value:patterns.password,
                message:"Invalid password"},
            },
        )}
            />
        <p className="text-red-500">{errors.password?.message}</p>
           
        <Label htmlFor="remember"><Checkbox id="remember" /> Remember me </Label>
        
        <button
        className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-700 focus:outline-none focus:bg-orenge-700  duration-300"
         type="submit" disabled={!isValid}>Login</button>
       
    </form>
     
    </>
  )
}


export default Login;