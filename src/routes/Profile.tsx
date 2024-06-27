import { useEffect, useState } from "react";
import auth from "../services/auth";
import { RegisterUser } from "../@types/types";
import patterns from "../validation/patterns";

import { useForm } from "react-hook-form";
import dialogs from "../ui/dialogs";

const Profile = () => {

const userId = localStorage.getItem("user_id") ?? "no user id";
const [user, setUser] = useState<RegisterUser>();
const [editProfile, setEditProfile] = useState(false);
const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    setValue
  } = useForm<RegisterUser>({ mode: "onTouched" });

   useEffect(() => {
        auth
        .geyUserById(userId as string)
            .then((res) => {
                setValue("name.first", res.data.name.first);
                setValue("name.middle", res.data.name.middle);
                setValue("name.last", res.data.name.last);
                setValue("phone", res.data.phone);
                setValue("email", res.data.email);
                setValue("password", res.data.Password);
                setValue("image.url", res.data.image.url);
                setValue("image.alt", res.data.image.alt);
                setValue("address.state", res.data.address.state);
                setValue("address.country", res.data.address.country);
                setValue("address.city", res.data.address.city);
                setValue("address.street", res.data.address.street);
                setValue("address.houseNumber", res.data.address.houseNumber);
                setValue("address.zip", res.data.address.zip);
            })
            .catch((err) => console.log(err))
    }, [userId])
const handleEdit = () => {
    setEditProfile(!editProfile);
  }
  const onEditProfile = (data: RegisterUser) => {
    auth
    .updateUserDetailsAll(userId, data)
    .then((res) => {

      console.log(res.data);
      setEditProfile(false);
    })
    .catch((e) => {
      dialogs.error("Error", e.response.data);
      console.log(e);
    });
  };

useEffect(() => {
    auth
    .userDetails(userId)
    .then((res) => {
        setUser(res.data);
    })
    .catch((e) => {
        console.log(e);
    });
  }, []);
  
  return (
    <div className="container mx-auto mt-8 px-4">
  <h1 className="text-5xl font-bold mb-4 text-orange-500 p-2">Profile</h1>
  <br />
  {!editProfile ? (

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <h2 className="text-lg font-semibold">First Name:</h2>
      <p className="">{user?.name.first}</p>
    </div>

    <div>
      <h2 className="text-lg font-semibold">Middle Name:</h2>
      <p>{user?.name.middle}</p>
    </div>

    <div>
      <h2 className="text-lg font-semibold">Last Name:</h2>
      <p>{user?.name.last}</p>
    </div>

    <div>
      <h2 className="text-lg font-semibold">Email:</h2>
      <p>{user?.email}</p>
    </div>

    <div>
      <h2 className="text-lg font-semibold">Phone:</h2>
      <p>{user?.phone}</p>
    </div>
     <div>
      
      <h2 className="text-lg font-semibold">Bussniss</h2>
      <p>{user?.isBusiness ? 'Business' : 'No'}</p>
    </div>

    <div>
      <h2 className="text-lg font-semibold">City:</h2>
      <p>{user?.address.city}</p>
    </div>

    <div>
      <h2 className="text-lg font-semibold">Street:</h2>
      <p>{user?.address.street}</p>
    </div>
  </div>
  ) : (
    <div>
      <form  noValidate onSubmit={handleSubmit(onEditProfile)} className=" flex  flex-col justify-end items-center  px-6 py-12 lg:px-8 gap-4 " >
        
          <input  className="text-blue-900 "
          
         
            type="text"
            {...register("name.first", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
             {errors.name?.last && (
            <p className="text-red-500">{errors.name?.first?.message}</p>
          )}
       
       
          <input className="text-blue-900 "
          
            type="text"
            {...register("name.middle", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
            {errors.name?.middle && (
            <p className="text-red-500">{errors.name?.middle?.message}</p>
          )}
        
       
          <input className="text-blue-900 "
          
            type="text"
            {...register("name.last", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
               {errors.name?.last && (
            <p className="text-red-500">{errors.name?.last?.message}</p>
          )}
       
        
          <input className="text-blue-900 "
            
            type="tel"
            {...register("phone", {
              required: "This field is mandatory",
              minLength: { value: 9, message: "Too short" },
              maxLength: { value: 14, message: "Too long" },
            })} />
              {errors.phone && (
            <p className="text-red-500">{errors.phone?.message}</p>
          )}

        
        {/* <section>
        <input   className="text-blue-900 "
            
            type="email"
            {...register("email", {
              required: "This field is mandatory",
              pattern: {
                value: patterns.email,
                message: "Invalid email",
              },
            })} />
             {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </section> */}
        {/* <section>
          <input   className="text-blue-900 "
           
           value={  }
           
               type={showPassword ? `text` : `password`}
              {...register("password", {
                required: "This field is mandatory",
                pattern: {
                  value: patterns.password,
                  message:
                    "characters long and number lowercase letter, !@#$%^&*-",
                },
              })} />
                {errors.password && (
            <p className="text-red-500 mx-auto ">{errors.password?.message}</p>
          )}
        </section> */}
         {/* <button
              type="button"
              onClick={() => {
                setShowPassword((s) => !s);
              }}
            >
              {showPassword ? <BsEyeSlashFill  className="text-white  " /> : <BsEye className="text-white " />}
            </button> */}
       
          <input  className="text-blue-900 "
            
            type="url"
            {...register("image.url", {
              pattern: {
                value: patterns.url,
                message: "Invalid image URL",
              },
            })} />
             {errors.image?.url && (
            <p className="text-red-500">{errors.image?.url?.message}</p>
          )}
       
        
          <input className="text-blue-900 "
            
            type="text"
            {...register("image.alt", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
             {errors.image?.alt && (
            <p className="text-red-500">{errors.image?.alt?.message}</p>
          )}
       
        
          <input className="text-blue-900 "
           
            type="text"
            {...register("address.state", {
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
               {errors.address?.state && (
            <p className="text-red-500">{errors.address?.state?.message}</p>
          )}
       
       
          <input className="text-blue-900 "
            
            type="text"
            {...register("address.country", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
              {errors.address?.country && (
            <p className="text-red-500">{errors.address?.country?.message}</p>
          )}
        
      
          <input className="text-blue-900 "
           
            type="text"
            {...register("address.city", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
             {errors.address?.city && (
            <p className="text-red-500">{errors.address?.city?.message}</p>
          )}
       
       
          <input className="text-blue-900 "
           
            type="text"
            {...register("address.street", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
              {errors.address?.street && (
            <p className="text-red-500">{errors.address?.street?.message}</p>
          )}
       
       
          <input  className="text-blue-900 "
           
            type="number"
            {...register("address.houseNumber", {
              
              min: { value: 2, message: "Too small" },
              max: { value: 256, message: "Too big" },
            })} />
            {errors.address?.houseNumber && (
            <p className="text-red-500">
              {errors.address?.houseNumber?.message}
            </p>
          )}
     
      
          <input className="text-blue-900 "
            
            type="number"
            {...register("address.zip", {
              required: "This field is mandatory",
              min: { value: 2, message: "Too small" },
              max: { value: 256, message: "Too big" },
            })} />
              {errors.address?.zip && (
            <p className="text-red-500">{errors.address?.zip?.message}</p>
          )}
       
       
           {/* <label htmlFor="isBusiness">Business</label>
          <input className="text-blue-900 font-bold" id="isBusiness" type="checkbox" {...register("isBusiness")} />
          {errors.isBusiness && (
            <p className="text-red-500">{errors.isBusiness?.message}</p>
          )} */}
           <button
          disabled={!isValid}
          type="submit"
          className="disabled:bg-slate-300 bg-green-600 disabled:text-black text-white p-2 ml-2 mt-4  font-bold rounded-md"
        >
          Save
        </button>
        
      </form>

    </div>
  )}
  <button className="bg-orange-500 mt-10 items-center text-white font-bold py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition ease-in-out duration-200" onClick={handleEdit}> {!editProfile ? 'Edit Profile' : 'Cancel'}</button>
</div>
  );
};

export default Profile;
