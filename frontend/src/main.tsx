import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter, Navigate,
    RouterProvider
} from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ChooseInterestsPage from "./pages/ChooseInterestsPage.tsx";
import TestPage from "./pages/TestPage.tsx";
import Homepage from './pages/Homepage.tsx';
import Profile from "./pages/Profile.tsx";
import NotificationsPage from "./pages/NotificationsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import PostPage from "./pages/PostPage.tsx";
import EventPage from "./pages/EventPage.tsx";

//define a partir de donde le pegué en la URL qué componente va a renderizar react
const router = createBrowserRouter([
    {
      path: "/",
      element: await isLoggedIn() ? <Navigate to={"/homepage"}/> : <Navigate to={"/login"}/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/interests",
        element: <ChooseInterestsPage/>
    },
    {
        path: "/test",
        element: <TestPage/>
    },
    {
        path: "/homepage",
        element: <Homepage/>
    },
    {
        path: "/profile/:id",
        element: <Profile/>
    },
    {
        path: "/notifications",
        element: <NotificationsPage/>
    },
    {
        path: "/post/:id",
        element: <PostPage/>
    },
    {
        path: "/event",
        element: <EventPage></EventPage>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    },
    {
        path: "*",
        element: <ErrorPage/>
    }
]);
//Estoy muy cansado como para pensar como verificar que ese logeado.
async function isLoggedIn(): Promise<boolean> {
        const url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token');
        const response = await fetch(url + "auth", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) return true;
        return false;

}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
