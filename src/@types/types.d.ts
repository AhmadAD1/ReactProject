import { ReactNode } from "react";
// import { Omit } from "utility-types"; 
export type FCProps={
    children:ReactNode?;
}
export type FCC=(props:{children : ReactNode})=>ReactNode;
export type RegisterUser = {
  name: {
    first: string
   middle: string
    last: string
  },
  email: string
  password: string
  phone: number
  address: {
    state: string
    city: string
    country: string
    street: string
    houseNumber: number
    zip: number

  }
  image:{
    url:string
    alt:string
  }
  isBusiness: boolean

}
//declare type for login

export type LoginType = {
  email: string
  password: string
}
export type CardType = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  }
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
    _id: string;
  }
  bizNumber: number;
  likes: string[];
  user_id: string;
  createdAt: string;
  __v: number;
};
// type CreateType = Omit<CardType, "_id" | "createdAt" | "__v" | "user_id" | "likes">;
export type CreateType = {
  _id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
        _id: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
          _id: string;
    };
    bizNumber: number;
    likes: string[];
    user_id: string;
    createdAt: string;
    __v: number;
};

export type ErrorType = {
  status: number;
  message: string;
  details: string;
};
