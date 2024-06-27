import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import './Navbar.scss';
// import { Button } from "flowbite-react";
import { Avatar } from "flowbite-react";





// import { ThemeContext } from '../contexts/ThemeContext'
import DarkMode from "../DarkMode/DarkMode";
import auth from "../services/auth";
import { RegisterUser } from "../@types/types";
const Navbar = () => {
  const userId = localStorage.getItem("user_id") ?? "no user id";
  const [user, setUser] = useState<RegisterUser>();
  const [open, setOpen] = useState(false);
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
  //  const { toggle } = useContext(ThemeContext)
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  }
  
  return (
    
    <nav className="md:flex md:flex-row gap-1 justify-between text-2xl container mx-auto  items-center flex-col navmd   ">
      
      {/* <button onClick={()=>setOpen(!open)}>
      <span className="material-symbols-outlined text-3xl absolute right-8 top-8 md:hidden">
        {open ? "close" : "menu"}



</span>
</button> */}
 <button
          className="block md:hidden text-white p-5 focus:outline-none float-right menu"
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
{/* <span className="material-symbols-outlined text-3xl absolute right-8 top-8 md:hidden">
close
</span> */}

      <div className=" flex md:flex-row flex-col resp">
        
        <NavLink to="/" className={`md:flex gap-2 flex-col md:flex-row ${open ? 'block' : 'hidden'}`}>
          <FaHome className="hover:text-red-400   text-orange-500 mt-5 hidden md:block " />
          <h1 className="hover:text-red-400  py-2 md:px-4 font-bold font-serif mt-2 ">Home</h1>
         <NavLink to={"/About"}>
          <h1 className="hover:text-red-400 py-2 md:px-4  font-bold font-serif mt-2 ">About</h1>
        </NavLink>
        <h1 className="hover:text-red-400 py-2 md:px-4  font-bold font-serif mt-2 " >
         {isLoggedIn && <NavLink to="/mycards"  className={"hover:text-red-400  md:border border-red-400 py-3 md:px-4 "}>My Cards</NavLink>}
         </h1>
         <h1 className="hover:text-red-400 py-2 md:px-4  font-bold font-serif mt-2 ">
          {isLoggedIn && <NavLink to="/favcards"  className={"hover:text-red-400 border-red-400  py-3 md:px-4 md:border"}>Fav Cards</NavLink>}
          </h1>
          <h1 className="hover:text-red-400 py-2 md:px-4  font-bold font-serif mt-2 ">
           {isLoggedIn && <NavLink to="/createcard"  className={"hover:text-red-400 border-red-400  py-3 md:px-4  md:border"}>Create Card</NavLink>}
           </h1>
        
          
     
          {/* <Search /> */}
 

        
        </NavLink>
        
        </div>
        
      <div className="flex md:flex-row flex-col resp2  ">   
      
        <NavLink to="/" className={`md:flex flex-col md:flex-row ${open ? 'block' : 'hidden'}`}>  
          <h1 className="hover:text-red-400 py-2 md:px-4  font-bold font-serif mt-2 ">
        {!isLoggedIn && <NavLink to="/register"  className={"bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full shadow-lg mt-2 pb-2"}>Sing Up</NavLink>}
        </h1>
        <h1 className="hover:text-red-400 py-2 px-4  font-bold font-serif mt-2 ">
        {!isLoggedIn && <NavLink to="/login" className={"hover:text-red-400 font-bold mt-2"}>Login</NavLink>}
        </h1>
         <h1 className="hover:text-red-400 py-1 md:px-4  font-bold font-serif mt-2 ">
        {isLoggedIn && <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold pt-1 px-4 rounded-full shadow-lg mt-2 pb-2" onClick={()=>{
          logout();
          navigate("/");
        }}>Logout</button>}
        </h1>
         <h1 className="hover:text-red-400 py-3 md:px-4  font-bold font-serif mt-2 ">
        { isLoggedIn && <NavLink onClick={handleProfile} to="/Profile"><Avatar onClick={handleProfile}  className="profile" img={user?.image?.url  || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' } alt="avatar of Jese" rounded /> </NavLink>}
        </h1>
       
        </NavLink> 
        <div className="theme pt-7"> <DarkMode  /></div>
        {/* <button onClick={()=>toggle()}></button> */}
        {/* <Avatar img={profile} alt="avatar of Jese" rounded />  */}
        
      </div>
     
     
    </nav>
    
  );
};


export default Navbar;