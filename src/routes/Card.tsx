import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardType, ErrorType } from "../@types/types";
import { getCardById } from "../services/cards";

const Card = () => {

  // dynamic route: /cards/:id
  const { id } = useParams();
  const [card, setCard] = useState<CardType>();
  const [error, setError] = useState<ErrorType>();

  useEffect(() => {
    getCardById(id ?? "")
      .then((res) => {
        setCard(res.data);
      })
      .catch((e) => {
        const status = e.response.status;
        const message = e.message;
        const details = e.response.data;

        setError({ status, message, details });
      });
  }, []);
  return error ? (
    <div>
      <h2>{error.message}</h2>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center">
      <h2 className=" text-4xl p-4">{card?.title}</h2>
      <p className=" text-2xl p-2">{card?.subtitle}</p>
      {/* <p>{card?.description}</p> */}
      <img className=" rounded p-1" src={card?.image.url} alt={card?.image.alt} />
    </div>
  );
};

export default Card;