import axios from "axios";

const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

export const getCards = () => axios.get(baseUrl);
export const getCardById = (id: string | undefined ) => axios.get(baseUrl + `/${id}`);