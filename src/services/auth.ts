import axios from "axios";

import { LoginType, RegisterUser , CardType } from "../@types/types";

 

export const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";


export const usersUrl = `${baseUrl}/users`;
export const loginUrl = `${usersUrl}/login`;
export const cardsUrl = `${baseUrl}/cards`;


 export function login(data: LoginType) {


  return axios.post(loginUrl, data);

}
export function createCard(data: CardType){
  
 
 
  return axios.post(cardsUrl, data, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  }
  );
  

}
export function geyUserById(id: string) {
  const url = `${usersUrl}/${id}`;

  return axios.get(url, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}

export function register(data: RegisterUser) {

  return axios.post(usersUrl, data);
}
export const userDetails = (id: string) => {
  const url = `${usersUrl}/${id}`;

  return axios.get(url, {
    
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },


    
  }
);
};
export const updateCard = (id: string, data: CardType) => {
  const url = `${cardsUrl}/${id}`;

  return axios.patch(url, data, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};
export const updateCardAll =( data: CardType , id: string | undefined ) => {
  const url = `${cardsUrl}/${id}`;
  console.log("ayth",data);
  console.log(id);

  return axios.put(url, data, { 
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

};
export const deleteCard = (id: string) => {
  const url = `${cardsUrl}/${id}`;

  return axios.delete(url, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};
export const getCard = (id :string) => {
   const url = `${cardsUrl}/${id}`;
  return axios.get(url, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },  
  });
}
export const updateUserData = (id: string, data: RegisterUser) => {
  const url = `${usersUrl}/${id}`;

  return axios.patch(url, data, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};
export const updateUserDetailsAll = (id: string,data: RegisterUser) => {
  const url = `${usersUrl}/${id}`;

  return axios.put(url, data, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });

};

export const toBisness = (id: string) => {
  const url = `${usersUrl}/${id}`;

  return axios.patch(url, { isBusiness: true }, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
};

 


export const auth = {
  register,
  login,
  userDetails,
  createCard,
  updateCard,
  updateCardAll,
  deleteCard,
  getCard,
  updateUserData,
  toBisness,
  updateUserDetailsAll,
  geyUserById,
  
};
// import auth from './auth.ts'

export default auth;