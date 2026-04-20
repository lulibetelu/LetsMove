import { Home, CalendarDays, Users, User, Settings, Plus, Bell } from 'lucide-react';
import {useState} from "react";
import NewPost from "./NewPost.tsx";
import {Link, useNavigate} from "react-router-dom";
import {getCurrentUserId} from "../api/user.ts";

export default function Sidebar({ onPostCreated }: { onPostCreated: () => void }) {
    const [createPost, setCreatePost] = useState(false);
    const navigate = useNavigate();
    const currentUserId = getCurrentUserId();

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 border-r border-base-300 bg-base-100 flex flex-col items-center py-6 z-50">
            <nav className="flex flex-col gap-6 flex-1 mt-4">
                <button type="button" className="btn btn-ghost btn-circle" aria-label="Inicio">
                    <Home size={26} strokeWidth={1.5} />
                </button>

                <button type="button" className="btn btn-ghost btn-circle" aria-label="Eventos">
                    <CalendarDays size={26} strokeWidth={1.5} />
                </button>

                <button type="button" className="btn btn-ghost btn-circle" aria-label="Grupos">
                    <Users size={26} strokeWidth={1.5} />
                </button>

                <button type="button" className="btn btn-ghost btn-circle" aria-label="Perfil">
                    <Link
                        to={currentUserId ? "/profile/" + currentUserId : "/login"}
                    >
                        <User size={26} strokeWidth={1.5} className="font-semibold hover:underline" />
                    </Link>

                </button>

                <button type="button" className="btn btn-ghost btn-circle" aria-label="Configuración">
                    <Settings size={26} strokeWidth={1.5} />
                </button>

                <button type="button" className="btn btn-ghost btn-circle" aria-label="Notificación" onClick={() => navigate("/notifications")}>
                    <Bell size={26} strokeWidth={1.5}/>
                </button>
            </nav>

            <div className="mt-auto mb-4">
                <button
                    className="btn btn-neutral bottom-10 right-10 z-50 shadow-2xl btn-circle btn-lg border-2 hover:bg-base-200"
                    type="button"
                    aria-label="Crear publicación"
                    onClick={()=> setCreatePost(true) }>
                    <Plus/>
                </button>
                {createPost && <NewPost onClose={() => setCreatePost(false)} onPostCreated={onPostCreated} />}
            </div>
        </aside>
    );
}
