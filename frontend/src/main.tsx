import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ChooseInterestsPage from "./pages/ChooseInterestsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/login",
        element: <LoginPage></LoginPage>
    },
    {
        path: "/interests",
        element: <ChooseInterestsPage></ChooseInterestsPage>
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
