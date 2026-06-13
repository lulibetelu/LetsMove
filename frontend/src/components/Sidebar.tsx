import {Home, CalendarDays, Users, User, Settings, Bell, PartyPopper} from 'lucide-react';
import {Link, useLocation} from "react-router-dom";
import {getCurrentUserId} from "../api/user.ts";

export default function Sidebar() {
    const location = useLocation();
    const currentUserId = getCurrentUserId();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: "/homepage", icon: Home, label: "Inicio" },
        { path: "/event", icon: PartyPopper, label: "Eventos"},
        { path: "/calendar", icon: CalendarDays, label: "Calendario" },
        { path: "/group", icon: Users, label: "Grupos" },
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
        </aside>
    );
}
