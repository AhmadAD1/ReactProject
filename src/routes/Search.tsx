// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCards } from "../hooks/useCards";
// import { useContext } from "react";
// import { CardType } from "../@types/types";
// import { Link } from 'react-router-dom';
// import { Rating } from 'flowbite-react';
// import AuthContext from '../contexts/AuthContext';
// import './Cards.scss';


// const Search = () => {
//    const {cards} = useCards();
//    const { isLoggedIn } = useContext(AuthContext);
  
//    const [searchTerm, setSearchTerm] = useState<string>('');


//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredCards = cards.filter((card) =>
//     card.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-row flex-wrap justify-center items-center p-20 countiner-cards">
//       <input
//         type="text"
//         placeholder="Search cards"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />
//         {filteredCards.map((card) => (
//          <Link
//           to={`cards/${card._id}`}
//           key={card._id}
//           className="shadow-2xl p-0  mx-auto rounded-md my-6 text-center b-card"
//         >
//           <img className="b-img" src={card.image.url} alt={card.image.alt} />
//           <h2 className="b-title p-2">{card.title}</h2>
          
//           <p className="sub-title">{card.subtitle}</p>
//           <hr />
//           <div className="flex flex-col justify-center items-start p-3">
//           <p className=" phone pt-2 text-left  "><span className="font-bold">Phone: </span>{card.phone}</p>
//             <p className="address pt-2  text-left "><span className="font-bold">Address: </span>{card.address.city} , {card.address.zip} , {card.address.street}</p>
//             <Rating>
//         <Rating.Star />
//       <Rating.Star />
//       <Rating.Star />
//       <Rating.Star />
//       <Rating.Star filled={false} />
//       </Rating>
//          <p  className="  text-left font-bold pt-2" >Read More: </p>
//           </div>
//           <div className="flex justify-around items-center favor">
 
//                       <span className="material-symbols-outlined read-more  ">
// read_more
//    </span>
//           { isLoggedIn &&<span className="material-symbols-outlined fav">
// favorite
// </span>}
//             </div>

          
          
//         </Link>
        
//       ))}
        
//       </div>
    
//   );
// };

// export default Search;