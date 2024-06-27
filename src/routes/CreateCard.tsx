
import { useForm } from "react-hook-form";
import { useNavigate} from 'react-router-dom';
import { CardType } from '../@types/types';
import auth from '../services/auth';
import dialogs from '../ui/dialogs';


const CreateCard = () => {
const navigate=useNavigate();
 
 

  const {
    formState: { errors, isValid },
    register,
    handleSubmit: handleSubmitCard,
  } = useForm<CardType>({ mode: "onTouched" });
  const onCreate = (data: CardType) => {
    alert(JSON.stringify(data));
    
    // fetch("http://localhost:3001/register", 
  auth
      .createCard(data)
      .then((res) => {  
        console.log(res.data);
        dialogs.success("Success", "Created").then(() => {
          //go to card id
          navigate("/mycards");
        });
      })
      .catch((err) => {
        
        console.log(err.response.data);
        dialogs.error("Error", err.response.data);
      });

  };
  return (
    <div>
      <div className='createcard flex flex-col justify-center items-center gap-2 p-4 m-2'>
        
        <h1 className=' text-5xl font-bold p-2 text-blue-900 font-serif'>Creat Card</h1>
        <p className=' text-2xl p-1 text-blue-900 font-sans'>Creat Your Card For Your Bussniess</p>
        
        <div>
        <form className='bg-gray-300 p-5  mb-10 s shadow-3xl   mx-auto rounded-md border-2 border-blue-900 ' onSubmit={handleSubmitCard(onCreate)} noValidate>
          <div className='flex flex-row gap-2'>
          <section className='p-2'>
            
            <input type="text" 
            placeholder="title"
             {...register("title", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}/>
              {errors.title && (
            <p className="text-red-500">{errors.title?.message}</p>
          )}
            </section>
            <section className='p-2'>
            <input type="text" 
              placeholder="subtitle"
             {...register("subtitle", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })}/>
              {errors.subtitle && (
            <p className="text-red-500">{errors.subtitle?.message}</p>
          )}
            
          </section>
          </div>
          <div className='flex flex-row gap-2'>
          <section className='p-2'>
            
            <input type="text"
              placeholder="description"
             {...register("description", {
              required: "This field is mandatory",
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 1024, message: "Too long" },
            })} />
            {errors.description && (
            <p className="text-red-500">{errors.description?.message}</p>
          )}
            </section>
            <section className='p-2'>
            <input type="text"
               placeholder="tel"
             {...register("phone", {
              required: "This field is mandatory",
              minLength: { value: 9, message: "Too short" },
              maxLength: { value: 11, message: "Too long" },
            })} />
            {errors.phone && (
            <p className="text-red-500">{errors.phone?.message}</p>
          )}
            
          </section>
          </div>
          <div className='flex flex-row gap-2'>
          <section className='p-2'>
            
            <input type="text"
               placeholder="email"
             {...register("email", {
              required: "This field is mandatory",
              minLength: { value: 5, message: "Too short" },
              
            })} />
            {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
            </section>
            <section className='p-2'>
            <input type="text"
               placeholder="web"
             {...register("web", {
              
              minLength: { value: 14, message: "Too short" },
             
            })} />
            {errors.web && (
            <p className="text-red-500">{errors.web?.message}</p>
          )}
            
          </section>
          </div>
          <div className='flex flex-row gap-2'>
          <section className='p-2'>
            
            <input type="text"
              placeholder="imageurl"
           {...register("image.url", {
            required: "This field is mandatory",

              minLength: { value: 14, message: "Too short" },
              
            })} />
            {errors.image?.url && (
            <p className="text-red-500">{errors.image?.url?.message}</p>
          )}
            </section>
            <section className='p-2'>
            <input type="text"
              placeholder="imagealt"
             {...register("image.alt",{
              required: "This field is mandatory",
              
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
             })

             } />
            {errors.image?.alt && (
            <p className="text-red-500">{errors.image?.alt?.message}</p>
          )}
            
          </section>
          </div>
          <div className='flex flex-row gap-2'>
          <section className='p-2'>
            
            <input type="text"
               placeholder="state"
             {...register("address.state", {
             
              minLength: { value: 2, message: "Too short" },
              maxLength: { value: 255, message: "Too long" },
            })} />
            {errors.address?.state && (
            <p className="text-red-500">{errors.address?.state?.message}</p>
          )}
            </section>
            <section className='p-2'>
            <input type="text"
               placeholder="country"
             {...register("address.country", {
              required: "This field is mandatory"})} />
            {errors.address?.country && (
            <p className="text-red-500">{errors.address?.country?.message}</p>
          )}
            
          </section>
          </div>
           <div className='flex flex-row gap-2'>
          <section className='p-2'>
            
            <input type="text"
               placeholder="city"
             {...register("address.city", {
              required: "This field is mandatory",
             
            })} />
            {errors.address?.city && (
            <p className="text-red-500">{errors.address?.city?.message}</p>
          )}
            </section>
            <section className='p-2'>
            <input type="text" 
               placeholder="street"
             {...register("address.street", {
               required: "This field is mandatory"
             
            })}/>
            {errors.address?.street && (
            <p className="text-red-500">{errors.address?.street?.message}</p>
          )}
            
          </section>
          </div>
           <div className='flex flex-row gap-2'>
          <section className='p-2'>
            
            <input type="number" 
               placeholder="houseNumber"
             {...register("address.houseNumber", {
                required: "This field is mandatory"
            
            })}/>
            {errors.address?.houseNumber && (
            <p className="text-red-500">{errors.address?.houseNumber?.message}</p>
          )}
            </section>
            <section className='p-2'>
            <input type="number"
               placeholder="zip"
             {...register("address.zip")} />
            {errors.address?.zip && (
            <p className="text-red-500">{errors.address?.zip?.message}</p>
          )}
            
          </section>
          </div>
           <button
          disabled={!isValid}
          className="disabled:bg-slate-300 bg-blue-800 disabled:text-black text-white p-2 ml-2 mt-4  font-bold rounded-md border-2 border-blue-900" 
        >
          Create
        </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCard