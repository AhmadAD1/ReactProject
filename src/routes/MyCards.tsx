

import {Link, useNavigate } from "react-router-dom";

import Spinners from "../components/Spinners";
import { useCards } from "../hooks/useCards";
import './Cards.scss';
import AuthContext from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Rating } from "flowbite-react";
import { CardType } from "../@types/types";
import auth from "../services/auth";
import { useForm } from "react-hook-form";
import { getCardById } from "../services/cards";
import dialogs from "../ui/dialogs";
import patterns from "../validation/patterns";


const MyCards = () => {
const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CardType>();
         const navigate = useNavigate();
const [editCardId, setEditCardId] = useState<string | null>(null);

  const { cards, loading, error } = useCards();
  const cancel = () => {
    setEditCardId(null);
  }
     

    const onEdit = (data: CardType) => {
        auth
        .updateCardAll(data, editCardId as string)
            .then((res) => {
                localStorage.setItem("card_id", res.data._id);
                dialogs.success("Success", "Card edited successfully").then(() => {
                    navigate("/");
                });
            })
            .catch((e) => {
                dialogs.error("Error", e.response.data);
            });
    };
    useEffect(() => {
        
        getCardById(editCardId as string)
            .then((res) => {
                setValue("title", res.data.title);
                setValue("subtitle", res.data.subtitle);
                setValue("description", res.data.description);
                setValue("phone", res.data.phone);
                setValue("email", res.data.email);
                setValue("web", res.data.web);
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
    }, [editCardId])


  
  const userId = localStorage.getItem("user_id") ?? "no user id";
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [fav, setFav] = useState(false);

 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const MyCards = cards.filter((card) =>
    card.user_id === userId && card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFav = (data: CardType) => {
    setFav(!fav);
    if (data.likes.includes(userId)) {
      data.likes = data.likes.filter((id) => id !== userId);
    } else {
      data.likes.push(userId);
    }
    auth.updateCard(data._id, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleReadMore = (data: CardType) => {
    const cardId = data._id;
    navigate(`../cards/${cardId}`);
  };

  const handleEditCard = (card: CardType) => {
    setEditCardId(card._id);
  
    
  };
  const deleted = (data: CardType) => {
  const confirmed = window.confirm("Are you sure you want to delete this card?");

  if (confirmed) {
    auth.deleteCard(data._id)
      .then((res) => {
        console.log(res.data);
        console.log("Card deleted successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response.data);
        console.error("Error deleting card");
      });
  } else {
    console.log("Delete operation canceled by user");
  }
};



  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex justify-center flex-col dark:bg-gray-400">
      <h1 className="md:text-6xl text-3xl font-serif p-4 text-blue-900 m-2 font-bold text-center dark:text-orange-500">My Cards</h1>
      <input
        className="search-card w-full max-w-md p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Search cards"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="flex flex-row flex-wrap justify-center items-center p-20 container-cards">
        {loading && <Spinners />}
        {error && <div>{error}</div>}
        {MyCards.map((c) => (
          <div className="shadow-2xl p-0 mx-auto rounded-md my-6 text-center b-card dark:bg-orange-200" key={c._id}>
            {editCardId === c._id ? (
              
              <div>
                  <form noValidate onSubmit={handleSubmit(onEdit)} className=" flex  flex-col justify-end items-center  px-6 py-12 lg:px-8 gap-4 ">
                        <input
                            className="custom-input-reg"
                            placeholder="Title"
                            type="text"
                            {...register("title", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                            defaultValue={"test"}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.title.message as string}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Subtitle"
                            type="text"
                            {...register("subtitle", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.subtitle?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Description"
                            type="text"
                            {...register("description", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 1024, message: "Too long" },
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.description?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Phone"
                            type="tel"
                            {...register("phone", {
                                required: "This field is mandatory",
                                minLength: { value: 9, message: "Too short" },
                                maxLength: { value: 14, message: "Too long" },
                            })}
                        />
                        {errors.phone && (
                            <p className="text-red-500">{errors.phone?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Email"
                            type="email"
                            autoComplete="current-email"
                            {...register("email", {
                                required: "This field is mandatory",
                                pattern: {
                                    value: patterns.email,
                                    message: "Invalid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Website"
                            type="web"
                            autoComplete="current-web"
                            {...register("web", {
                                
                                min: { value: 7, message: "Too small" },
                                max: { value: 21, message: "Too big" },

                            })}
                        />
                        {errors.web && (
                            <p className="text-red-500">{errors.web?.message as string}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Image URL"
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

                       <input
                            className="custom-input-reg"
                            placeholder="Image Alt Text"
                            type="text"
                            {...register("image.alt", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.image?.alt&& (
                            <p className="text-red-500">{errors.image?.alt?.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="State"
                            type="text"
                            {...register("address.state", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.state && (
                            <p className="text-red-500">{errors.address?.state?.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Country"
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

                        <input
                            className="custom-input-reg"
                            placeholder="City"
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

                        <input
                            className="custom-input-reg"
                            placeholder="Street"
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



                        <input

                            className="custom-input-reg"
                            placeholder="House Number"
                            type="number"
                            {...register("address.houseNumber", {
                                required: "This field is mandatory",
                                min: { value: 1, message: "Too small" },
                                max: { value: 256, message: "Too big" },
                            })}
                        />
                        {errors.address?.houseNumber && (
                            <p className="text-red-500">
                                {errors.address?.houseNumber?.message}
                            </p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="Zip"
                            type="number"
                            {...register("address.zip", {
                                required: "This field is mandatory",
                                min: { value: 2, message: "Too small" },

                            })}
                        />
                        {errors.address?.zip && (
                            <p className="text-red-500">{errors.address?.zip?.message}</p>
                        )}

                        <button type="submit"  className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ">Edit</button>
                         <button type="submit" onClick={cancel}  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ">Cancel</button>
                    </form>

              </div>
            ) : (
              // Display Mode
              <div>
                <Link to={`../cards/${c._id}`}>
                  <img className="b-img" src={c.image.url} alt={c.image.alt} />
                  <h2 className="b-title p-1">{c.title}</h2>
                  <p className="sub-title p-1">{c.subtitle}</p>
                  <hr />
                </Link>
                <div className="flex flex-col justify-center items-start p-3">
                  <p className="phone pt-1 text-left"><span className="font-bold">Phone: </span>{c.phone}</p>
                  <p className="address pt-2 text-left"><span className="font-bold">Address: </span>{c.address.city} , {c.address.zip} , {c.address.street}</p>
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />
                  </Rating>
                  <p className="text-left font-bold pt-2">Read More: </p>
                </div>
                <div className="flex justify-around items-center favor">
                  <button onClick={() => handleReadMore(c)}>
                    <span className="material-symbols-outlined read-more">read_more</span>
                  </button>
                  {isLoggedIn && (
                    <button onClick={() => handleFav(c)} className={`${c.likes.includes(userId) ? 'did-like' : ''}`}>
                      <span className="material-symbols-outlined mycardfav mr-1 ">favorite</span>
                    </button>
                  )}
                  {isLoggedIn && (
                    <button onClick={() => handleEditCard(c)} className="edit-button">
                      <span className="material-symbols-outlined edit pt-1 text-purple-900">edit</span>
                    </button>
                  )}
                   {isLoggedIn && (
                    <button onClick={() => deleted(c)} className="edit-button">
                      <span className="material-symbols-outlined edit p-2 pt-1 text-purple-900">delete</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCards;