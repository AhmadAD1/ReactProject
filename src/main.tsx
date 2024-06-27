
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";


import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import About from './routes/About.tsx';
import Cards from './routes/Cards.tsx';
import Root from './layouts/Root.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import Register from './routes/Register.tsx';
import Login from './routes/Login.tsx';
import  { AuthContextProvider } from './contexts/AuthContext.tsx';
// import Profile from './routes/Profile.tsx';
import MyCards from './routes/MyCards.tsx';
import FavCards from './routes/FavCards.tsx';
import CreateCard from './routes/CreateCard.tsx';
import Card from './routes/Card.tsx';
import Profile from './routes/Profile.tsx';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
// import Admin from './routes/Admin.tsx';
// import { Card } from 'flowbite-react';
// import Search from './routes/Search.tsx';


const router=createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[
      {
        index:true,
        element:<Cards/>
      },
      {
        path:"/about",
        element:<About/>
      
      },
      {
        path:"/register",
        element:<Register/>
      },
       {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/profile",
        element:(
          <ProtectedRoute>
        <Profile/>
        </ProtectedRoute>
        )
      },
       {
        path:"/mycards",
        element:<MyCards/>
      },
       {
        path:"/favcards",
        element:<FavCards/>
      },
       {
        path:"/createcard",
        element:<CreateCard/>
      },
      {

       path:"/cards/:id",
        element:<Card/>
      },
      // {

      //  path:"/Admin",
      //   element:<Admin/>
      // },
    
     

    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
   </ThemeProvider>
   
  </React.StrictMode>,
);
