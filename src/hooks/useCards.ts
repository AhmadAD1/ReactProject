import { useEffect, useState } from "react";
import { CardType } from "../@types/types";
import { getCards } from "../services/cards";

// cards/myCards/favoriteCards

export const useCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  //SRP:
  useEffect(() => {
    setError(null);
    setLoading(true);
    getCards()
      .then((res) => {
        setCards(res.data);
        setError(null);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        setError("Network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { cards, loading, error };
};