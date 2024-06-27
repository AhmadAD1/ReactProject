import { useForm } from "react-hook-form";
import {  RegisterUser } from "../@types/types";
import patterns from "../validation/patterns";
import { auth } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Register.scss"
import { useState } from "react";
import dialogs from "../ui/dialogs";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { FloatingLabel } from "flowbite-react";
import { DevTool } from "@hookform/devtools";



const Register = () => {
  const navigate=useNavigate();

  const {
    formState: { errors, isValid },
    register,
    control,
    handleSubmit,
  } = useForm<RegisterUser>({ mode: "onTouched" });
 const [showPassword, setShowPassword] = useState(false);
  // פונקציה שנפעיל בלחיצה על כפתור שליחה - רק אם הטופס תקין
  function onRegister(data: RegisterUser) {
  //  alert(JSON.stringify(data));
  //  fetch("http://localhost:3001/register", 
  auth
      .register(data)
      .then((res) => {
        const jwt = res.data as string;
        console.log(jwt);
          localStorage.setItem("user_id", res.data._id);
        dialogs.success("Success", "Register").then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        console.log(err.response.data);
         dialogs.error("Error", err.response.data);
      });

   
  }

  return (
    <div className="register">
      
      <div className="flex justify-center items-center continer-form  ">
      
      <form className="bg-gray-500 p-5  mb-10 s shadow-3xl   mx-auto rounded-md" onSubmit={handleSubmit(onRegister)} noValidate /*css className*/>
        {/* firstName */}
        <h1 className="p-2 text-3xl font-sans font-bold text-blue-900">Register</h1>
        <div className="flex flex-row">
        <section className="p-2">
          <FloatingLabel variant="filled" label="First Name" sizing="sm" className="text-blue-900 "
          
           
            type="text"
            {...register("name.first", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.name?.last && (
            <p className="text-red-500">{errors.name?.first?.message}</p>
          )}
        </section>

        {/* middle */}
        <section className="p-2">
        <FloatingLabel variant="filled" label="Midle Name" sizing="sm" className="text-blue-900 "
           
            type="text"
            {...register("name.middle", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.name?.middle && (
            <p className="text-red-500">{errors.name?.middle?.message}</p>
          )}
        </section>
        </div>

        {/* last */}
         <div className="flex flex-row">
        <section className="p-2">
         <FloatingLabel variant="filled" label="Last Name" sizing="sm" className="text-blue-900 "
           
            type="text"
            {...register("name.last", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.name?.last && (
            <p className="text-red-500">{errors.name?.last?.message}</p>
          )}
        </section>

        {/* phone */}
        <section className="p-2">
        <FloatingLabel variant="filled" label="Phone" sizing="sm" className="text-blue-900 "
            
            type="tel"
            {...register("phone", {
              required: "This field is mandatory",
              minLength: { value: 9, message: "Too short" },
              maxLength: { value: 14, message: "Too long" },
            })}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone?.message}</p>
          )}
        </section >
        </div>

        {/* email */}
        <div className="flex flex-row">
        <section className="p-2">
        <FloatingLabel variant="filled" label="Email" sizing="sm" className="text-blue-900 "
            
            type="email"
            {...register("email", {
              required: "This field is mandatory",
              pattern: {
                value: patterns.email,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </section>

        {/* password */}
        <section className="p-2">
           
          <div className="password-container">
            
           <FloatingLabel variant="filled"  label="Password" sizing="sm" className="text-blue-900 "
           
           
               type={showPassword ? `text` : `password`}
              {...register("password", {
                required: "This field is mandatory",
                pattern: {
                  value: patterns.password,
                  message:
                    "characters long and number lowercase letter, !@#$%^&*-",
                },
              })}
            />
               {/* <button
              type="button"
              onClick={() => {
                setShowPassword((s) => !s);
              }}
            >
              {showPassword ? <BsEyeSlashFill  className="text-white ml-1 " /> : <BsEye className="text-white ml-1" />}
            </button> */}
          </div>
          
          {errors.password && (
            <p className="text-red-500 mx-auto ">{errors.password?.message}</p>
          )}
        </section>
         <button
              type="button"
              onClick={() => {
                setShowPassword((s) => !s);
              }}
            >
              {showPassword ? <BsEyeSlashFill  className="text-white  " /> : <BsEye className="text-white " />}
            </button>
        </div>

        {/* image.url */}
          <div className="flex flex-row">
        <section className="p-2">
        <FloatingLabel variant="filled" label="Image URL" sizing="sm" className="text-blue-900 "
            
            type="url"
            {...register("image.url", {
              pattern: {
                value: patterns.url,
                message: "Invalid image URL",
              },
            })}
          />
          {errors.image?.url && (
            <p className="text-red-500">{errors.image?.url?.message}</p>
          )}
        </section>

        {/* image.alt */}
        <section className="p-2">
         <FloatingLabel variant="filled" label="Image Description" sizing="sm" className="text-blue-900 "
            
            type="text"
            {...register("image.alt", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.image?.alt && (
            <p className="text-red-500">{errors.image?.alt?.message}</p>
          )}
        </section>
        </div>

        {/* address.state */}
        <div className="flex flex-row">
        <section className="p-2">
           <FloatingLabel variant="filled" label="State" sizing="sm" className="text-blue-900 "
           
            type="text"
            {...register("address.state", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.state && (
            <p className="text-red-500">{errors.address?.state?.message}</p>
          )}
        </section>

        {/* address.country */}
        <section className="p-2">
          <FloatingLabel variant="filled" label="Country" sizing="sm" className="text-blue-900 "
            
            type="text"
            {...register("address.country", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.country && (
            <p className="text-red-500">{errors.address?.country?.message}</p>
          )}
        </section>
        </div>

        {/* address.city */}
        <div className="flex flex-row">
        <section className="p-2">
            <FloatingLabel variant="filled" label="City" sizing="sm" className="text-blue-900 "
           
            type="text"
            {...register("address.city", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.city && (
            <p className="text-red-500">{errors.address?.city?.message}</p>
          )}
        </section>

        {/* address.street */}
        <section className="p-2">
          <FloatingLabel variant="filled" label="Street" sizing="sm" className="text-blue-900 "
           
            type="text"
            {...register("address.street", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}
          />
          {errors.address?.street && (
            <p className="text-red-500">{errors.address?.street?.message}</p>
          )}
        </section>
        </div>

        {/* address.houseNumber */}
        <div className="flex flex-row">
        <section className="p-2">
            <FloatingLabel variant="filled" label="House Number" sizing="sm" className="text-blue-900 "
           
            type="number"
            {...register("address.houseNumber", {
              
              min: { value: 2, message: "Too small" },
              max: { value: 256, message: "Too big" },
            })}
          />
          {errors.address?.houseNumber && (
            <p className="text-red-500">
              {errors.address?.houseNumber?.message}
            </p>
          )}
        </section>

        {/* address.zip */}
        <section className="p-2">
           <FloatingLabel variant="filled" label="Zip" sizing="sm" className="text-blue-900 "
            
            type="number"
            {...register("address.zip", {
              required: "This field is mandatory",
              min: { value: 2, message: "Too small" },
              max: { value: 256, message: "Too big" },
            })}
          />
          {errors.address?.zip && (
            <p className="text-red-500">{errors.address?.zip?.message}</p>
          )}
        </section>
        </div>

        {/* isBusiness */}
        {/* <section className="checkbox-container p-2">
          <label className="text-blue-900 font-bold" htmlFor="isBusiness">Business</label>
          <input
            id="isBusiness"
            type="checkbox"
            {...register("isBusiness", {
              required: "This field is mandatory",
            })}
          />
          {errors.isBusiness && (
            <p className="text-red-500">{errors.isBusiness?.message}</p>
          )}
        </section> */}
           <section className="checkbox-container p-2">
          <label htmlFor="isBusiness">Business</label>
          <input className="text-blue-900 font-bold" id="isBusiness" type="checkbox" {...register("isBusiness")} />
          {errors.isBusiness && (
            <p className="text-red-500">{errors.isBusiness?.message}</p>
          )}
        </section>
        <button
          disabled={!isValid}
          type="submit"
          className="disabled:bg-slate-300 bg-green-600 disabled:text-black text-white p-2 ml-2 mt-4  font-bold rounded-md"
        >
          Register
        </button>
      </form>
      <DevTool  control={control} />
      </div>
     
      
      
    </div>
  );
};

export default Register;