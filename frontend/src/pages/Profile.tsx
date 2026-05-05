import {MapPin, CalendarDays, Users, Edit3, UserCircle, Activity, UserPlus, Hourglass, X, LogOut} from 'lucide-react';
import Posts from "../components/Posts.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useUsername} from "../hooks/UseUsername.tsx";
import {useCallback, useEffect, useState} from "react";
import type {PostType} from "../types/postTypes.ts";
import {findPostsFromUser} from "../api/post.ts";
import {createFriendRequest, findUniqueFriend, removeFriend} from "../api/friend.ts";
import type { FriendRequestType } from '../types/friendRequestType.ts';
import {getCurrentUserId} from "../api/user.ts";
import Sidebar from "../components/Sidebar.tsx";

export default function Profile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const numericId = Number(id);
    const isValid = !isNaN(numericId);
    const { username, loading } = useUsername(numericId);
    const currentUserId = getCurrentUserId();

    const [posts, setPosts] = useState<PostType[]>([]);
    const [page, setPage] = useState<number | undefined>();
    const [friendReq, setFriendReq] = useState<boolean>(false);
    const [friendAdded, setFriendAdded] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    useEffect(() => {
        findUniqueFriend(numericId)
            // data es un array de Friend[] porque como la amistad es bidireccional hay que checkear la relacion
            // user1,user2 y user2,user1 y eso genera algunos quilombos, pero en realidad esto solo devuelve un elemento
            .then((data: FriendRequestType[]) => {
                // some recorre el array data y devuelve true si algun elemento es true
                const hasRequested: boolean = data.some(f => f.state === 'Requested');
                setFriendReq(hasRequested);

                const isFriend: boolean = data.some(f => f.state === 'Accepted');
                setFriendAdded(isFriend);
            });
    }, [numericId]);

    const loadPosts = useCallback(async () => {
        try {
            const findAllTypes: PostType[] = await findPostsFromUser(numericId);
            setPosts(findAllTypes);
            setPage(findAllTypes.length === 50 ? 1 : undefined);
        } catch {
            setError(true);
        }
    }, [numericId]);

    const handleClickRequest = async () => {
        if (friendReq) {
            await removeFriend(numericId);
        } else {
            await createFriendRequest(numericId);
        }
        setFriendReq(!friendReq);
    }
    const handleClickFriend = async () => {
        if (friendAdded) {
            await removeFriend(numericId);
            setFriendAdded(false);
        }
    }


    // Datos mockeados para que veas el diseño
    const mockFriends = [
        { id: 1, name: "Friend One", location: "Escobar, Buenos Aires" },
        { id: 2, name: "Friend Two", location: "Pilar, Buenos Aires" },
        { id: 3, name: "Friend Three", location: "Pilar, Buenos Aires" },
    ];

    if (!isValid) {
        navigate("/error", {
            state: {
                title: "",
                message: "",
            }
        });
        return null;
    }
    else if (error) {
        navigate("/error", {
            state: {
                title: "",
                message: "El usuario ingresado no existe",
            }
        });
        return null;
    }

    return (
        // Contenedor principal sin bordes laterales, usando el max-width para que no se estire infinito en monitores gigantes
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar onPostCreated={() => {}}/>

            <main className="flex-1 ml-60">
                <div className="w-full max-w-5xl mx-auto pb-10">
                    {/*header*/}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 border-b border-white/5">
                        <div className="w-28 h-28 rounded-full ring-2 ring-[#8A9A5B] ring-offset-2 ring-offset-[#141414] flex items-center justify-center bg-[#2a2a2a] shrink-0">
                            <UserCircle size={72} strokeWidth={0.8} className="text-white/20"/>
                        </div>


                        <div className="flex-1 space-y-3 mt-2">
                            <div className="flex items-center gap-4 flex-wrap">

                                {/*username*/}
                                <h1 className="text-2xl font-bold text-white/90">{loading? 'loading' : username}</h1>

                                {/*botones de amistad y edicion*/}
                                {/*la logica de esto es asi:
                                        1. somos amigos? si si, el usuario que navega puede eliminar la amistad
                                                         si no, el usuario no puede hacer que sean amigos, asi que no hace nada
                                        2. te mande request? si si, se pone en pending y gris y si pasas por arriba te permite cancelar la request
                                                             si no, el boton esta en verda y aparece Add friend
                                */}
                                {(currentUserId != numericId) ?
                                    ( friendAdded? (
                                        <button
                                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all"
                                            onClick={handleClickFriend}
                                            style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                                        >
                                            <UserPlus size={14} /> Friend!
                                        </button>
                                        ) : (friendReq ? (
                                            <button
                                                className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/15 text-white/50 hover:border-red-400/50 hover:text-red-400 transition-all"
                                                onClick={handleClickRequest}
                                            >
                                                <span className="flex items-center gap-1 group-hover:hidden">
                                                    <Hourglass size={14} /> Pending
                                                </span>

                                                <span className="hidden items-center gap-1 group-hover:flex">
                                                    <X size={14} /> Cancel
                                                </span>
                                            </button>
                                        ) : (
                                            <button
                                                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border border-[#8A9A5B] text-[#8A9A5B] hover:bg-[#8A9A5B] hover:text-white transition-all"
                                                onClick={handleClickRequest}
                                            >
                                                <UserPlus size={14} /> Add Friend
                                            </button>
                                        ))
                                    )    :
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/15 text-white/50 hover:border-[#8A9A5B] hover:text-[#8A9A5B] transition-all">
                                            <Edit3 size={13} className="mr-1" /> Edit profile
                                        </button>

                                        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/15 text-white/50 hover:border-red-400/50 hover:text-red-400 transition-all"
                                                onClick={logout}
                                        >
                                            <LogOut size={13} /> logout
                                        </button>

                                    </div>
                                }
                            </div>

                            <div className="space-y-1.5 text-sm text-white/60">
                                <p className="flex items-center gap-2">
                                    <Activity size={15} className="text-[#8A9A5B]" />
                                    <span className="text-white/80 font-medium">Interests:</span> Padel, Tennis, Soccer
                                </p>
                                <p className="flex items-center gap-2">
                                    <MapPin size={15} className="text-[#8A9A5B]" />
                                    <span className="text-white/80 font-medium">Lives in:</span> Pilar, Buenos Aires, Argentina
                                </p>
                                <p className="mt-2">
                                    <span className="text-white/80 font-medium block mb-0.5">Biography:</span>
                                    "I am very very very gud at Soccer. Fr bro"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Cuerpo de la página (Grid de 2 columnas en desktop) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 mt-8">

                        {/* Columna Izquierda: Actividad (Ocupa 2 espacios) */}
                        <div className="lg:col-span-2">
                            <h2 className="text-base font-semibold text-white/50 uppercase tracking-widest mb-4 px-0">
                                Activity
                            </h2>
                            <div className="rounded-xl overflow-hidden border border-white/5">
                                <Posts userId={numericId} posts={posts} page={page} loadPosts={loadPosts} setPage={setPage} setPosts={setPosts} />
                            </div>
                        </div>

                        <div className="space-y-6">

                            {/* Columna Derecha: Amigos y Eventos (Ocupa 1 espacio) */}
                            <div className="bg-[#1e1e1e] rounded-xl p-5 border border-white/5">

                                {/* Lista de Amigos */}
                                <h3 className="font-semibold text-sm text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Users size={15} className="text-[#8A9A5B]" />
                                    John's Friends
                                </h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                    {mockFriends.map((friend) => (
                                        <div key={friend.id} className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
                                                <UserCircle size={20} className="text-white/20" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white/80 leading-none">{friend.name}</p>
                                                <p className="text-xs text-white/40 mt-1">{friend.location}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Eventos en los que participa */}
                            <div className="bg-[#1e1e1e] rounded-xl p-5 border border-white/5">
                                <h3 className="font-semibold text-sm text-white/50 uppercase tracking-widest mb-4 flex items-center gap-">
                                    <CalendarDays size={15} className="text-[#8A9A5B]" />
                                    Participates In
                                </h3>
                                <div className="space-y-3">
                                    {/* Tarjeta de Evento */}
                                    <div className="bg-[#141414] p-3 rounded-lg border border-white/5 border-l-2 border-l-[#8A9A5B] hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                                        <h4 className="font-semibold text-sm text-white/80">Futbol game saturday night</h4>
                                        <p className="text-xs text-white/40 mt-1">Sat 21 Jun · 20:00</p>
                                        <p className="text-xs text-white/40">City Stadium</p>
                                        <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider text-[#8A9A5B] bg-[#8A9A5B]/10 px-2 py-0.5 rounded-full">
                                          In person event
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}