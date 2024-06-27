import { Link, useNavigate  } from "react-router-dom";
import Spinners from "../components/Spinners";
import { useCards } from "../hooks/useCards";
import'./Cards.scss';
import AuthContext from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { Rating } from "flowbite-react";
import { CardType } from "../@types/types";
import auth from "../services/auth";






const Cards = () => {
   const navigate = useNavigate();
 
  const userId = localStorage.getItem("user_id") ?? "no user id";



const [searchTerm, setSearchTerm] = useState<string>('');
const [fav, setFav] = useState(false);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

 const {cards, loading, error} = useCards();
  const filteredCards = cards.filter((card) =>

    card.title.toLowerCase().includes(searchTerm.toLowerCase())
    
  );
  const handlefav = (data :CardType) => {
    setFav(!fav);
    if(data.likes.includes(userId)){
      data.likes = data.likes.filter((id) => id !== userId);}

    else

    data.likes.push(userId);
    auth
    .updateCard(data._id, data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      
      console.log(err.response.data);
    });
   


    
 

    //chang the color of the fav button
    
      


  };
  const hanleReadMore = (data :CardType) => {
    const cardId = data._id;
    navigate(`cards/${cardId}`);
   
    
  };
 
        
  









  // const {cards, loading, error} = useCards();
const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className="flex justify-center flex-col dark:bg-gray-400  ">
      
      {/* <span className="material-symbols-outlined search-icon">
manage_search
</span> */}
<h1 className="md:text-6xl text-3xl font-serif p-4 text-blue-900 m-2 font-bold text-center dark:text-orange-500">Bussnis Card</h1>
       <input  className="search-card w-full max-w-md p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
     
        type="text"
        placeholder="Search cards"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
    <div className="flex flex-row flex-wrap justify-center items-center p-20 countiner-cards  ">
      
      {loading && <Spinners />}
      {error && <div>{error}</div>}
      
      {/* cards */}
      {filteredCards.map((c) => (
        
      <div className="shadow-2xl p-0  mx-auto rounded-md my-6 text-center b-card bg-white dark:bg-orange-200 ">
        <Link 
          to={`cards/${c._id}`}
          key={c._id}
          
        >
          <img className="b-img" src={c.image.url} alt={c.image.alt} />
          <h2 className="b-title p-1 ">{c.title}</h2>
          
          <p className="sub-title p-1">{c.subtitle}</p>
          <hr />
          </Link>
          
          <div className="flex flex-col justify-center items-start p-3">
          <p className=" phone pt-1 text-left  "><span className="font-bold">Phone: </span>{c.phone}</p>
             <p className="address pt-2  text-left "><span className="font-bold">Address: </span>{c.address.city} , {c.address.zip} , {c.address.street}</p>
             
             <Rating>
             <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star />
      <Rating.Star filled={false} />
      </Rating>
             <p  className="  text-left font-bold pt-2" >Read More: </p>
          </div>
          <div className="flex justify-around items-center favor">
           

            
<button  onClick={()=>hanleReadMore(c)}>  <span className="material-symbols-outlined read-more" >
read_more
   </span></button>
   
          {isLoggedIn && <button  onClick={()=>handlefav(c)} className={`${c.likes.includes(userId)? 'did-like' : ''}`} >   <span className="material-symbols-outlined fav" >
favorite
</span> </button>}

</div>

          
          
        {/* </Link> */}
        </div>
        
      ))}
      
    </div>
    </div>
  );
};

export default Cards;