import {Home, CalendarDays, Users, Settings, Bell, PartyPopper} from 'lucide-react';
import {Link, useLocation} from "react-router-dom";
import {getCurrentUserId, getCurrentUsername} from "../api/user.ts";

export default function Sidebar() {
    const location = useLocation();
    const currentUserId = getCurrentUserId();
    const currentUsername = getCurrentUsername();

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: "/homepage", icon: Home, label: "Inicio" },
        { path: "/event", icon: PartyPopper, label: "Eventos"},
        { path: "/events", icon: CalendarDays, label: "Calendario" },
        { path: "/group", icon: Users, label: "Grupos" },
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

            {currentUserId && currentUsername && (
                <Link to={`/profile/${currentUserId}`}>
                    <div className="mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                            <div className="w-8 h-8 rounded-full bg-[#8A9A5B]/20 flex items-center justify-center shrink-0">
                                <span className="text-sm font-semibold text-[#8A9A5B]">
                                    {currentUsername[0].toUpperCase()}
                                </span>
                            </div>
                            <span className="text-sm text-white/70 hover:text-white/90 truncate">{currentUsername}</span>
                        </div>
                    </div>
                </Link>
            )}
        </aside>
    );
}
