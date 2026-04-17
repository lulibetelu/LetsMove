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

//define a partir de donde le pegué en la URL qué componente va a renderizar react
const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn() ? <Navigate to={"/homepage"}/> : <Navigate to={"/login"}/>,
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
        path: "/error",
        element: <ErrorPage/>
    }
]);
//Estoy muy cansado como para pensar como verificar que ese logeado.
function isLoggedIn(): boolean {
    try {
        const token = localStorage.getItem('token');
        return token !== null && token.trim() !== '';
    } catch {
        return false;
    }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
