import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ChooseInterestsPage from "./pages/ChooseInterestsPage.tsx";
import TestPage from "./pages/TestPage.tsx";
import Posts from "./pages/Posts.tsx";

//define a partir de donde le pegué en la URL qué componente va a renderizar react
const router = createBrowserRouter([
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
        path: "/posts",
        element: <Posts/>
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
