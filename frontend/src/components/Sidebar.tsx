import {Home, CalendarDays, Users, User, Settings, Plus, Bell, PartyPopper} from 'lucide-react';
import {useState} from "react";
import NewPost from "./NewPost.tsx";
import {Link, useLocation} from "react-router-dom";
import {getCurrentUserId} from "../api/user.ts";

export default function Sidebar({ onPostCreated }: { onPostCreated: () => void }) {
    const [createPost, setCreatePost] = useState(false);
    const location = useLocation();
    const currentUserId = getCurrentUserId();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: "/homepage", icon: Home, label: "Inicio" },
        { path: "/event", icon: PartyPopper, label: "Evento"},
        { path: "/events", icon: CalendarDays, label: "Eventos" },
        { path: "/groups", icon: Users, label: "Grupos" },
        { path: currentUserId ? `/profile/${currentUserId}` : "/login", icon: User, label: "Perfil" },
        { path: "/settings", icon: Settings, label: "Configuración" },
        { path: "/notifications", icon: Bell, label: "Notificaciones" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-60 border-r border-white/5 bg-[#1e1e1e] flex flex-col py-8 px-4 z-50">
            <div className="mb-8 px-2">
                <span className="text-xl font-bold text-[#8A9A5B] tracking-tight">Lets Move</span>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map(({ path, icon: Icon, label }) => {
                    const active = isActive(path);
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                                ${active
                                ? "text-[#8A9A5B] bg-[#8A9A5B]/10 font-semibold"
                                : "text-white/50 hover:text-white/80 hover:bg-white/5"
                            }`}
                        >
                            <Icon size={22} strokeWidth={active ? 2 : 1.5} />
                            <span className="text-sm">{label}</span>
                        </Link>
                    );
                })}
            </nav>


            <button
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm tracking-wide transition-all active:scale-[0.97]"
                style={{
                    background: "linear-gradient(135deg, #8A9A5B, #6b7a46)",
                }}
                type="button"
                aria-label="Crear publicación"
                onClick={()=> setCreatePost(true) }>
                <Plus size={18}/>
                Publicar
            </button>
            {createPost && <NewPost onClose={() => setCreatePost(false)} onPostCreated={onPostCreated} />}

        </aside>
    );
}
