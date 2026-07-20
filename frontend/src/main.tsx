import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter, Navigate,
    RouterProvider
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ChooseInterestsPage from "./pages/ChooseInterestsPage.tsx";
import Homepage from './pages/Homepage.tsx';
import Profile from "./pages/Profile.tsx";
import NotificationsPage from "./pages/NotificationsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import PasswordResetPage from "./pages/PasswordResetPage.tsx";
import PostPage from "./pages/PostPage.tsx";
import EventFeed from "./pages/EventFeed.tsx";
import EventPage from "./pages/EventPage.tsx";
import GroupPage from "./pages/GroupPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CalendarPage from "./pages/CalendatPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

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
        path: "/error",
        element: <ErrorPage/>
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage/>
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/interests",
                element: <ChooseInterestsPage/>
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
                element: <EventFeed></EventFeed>
            },
            {
                path: "/event/:id",
                element: <EventPage/>
            },
            {
                path: "/group",
                element: <GroupPage/>
            },
            {
                path: "/calendar",
                element: <CalendarPage/>
            },
            {
                path: "/settings",
                element: <SettingsPage/>
            }
        ]
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
    <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </GoogleOAuthProvider>
);
