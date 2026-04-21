import {MapPin, CalendarDays, Users, Edit3, UserCircle, Activity, UserPlus, Hourglass, X} from 'lucide-react';
import Posts from "../components/Posts.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useUsername} from "../hooks/UseUsername.tsx";
import {useCallback, useEffect, useState} from "react";
import type {PostType} from "../types/postTypes.ts";
import {findPostsFromUser} from "../api/post.ts";
import {createFriendRequest, findUniqueFriend, removeFriend} from "../api/friend.ts";
import type { FriendRequestType } from '../types/friendRequestType.ts';
import {getCurrentUserId} from "../api/user.ts";

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
        <div className="w-full max-w-5xl mx-auto text-base-content pb-10">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 border-b-8 border-base-200">

                <div className="avatar">
                    <div className="w-24 md:w-32 rounded-full ring ring-[#8A9A5B] ring-offset-base-100 ring-offset-4">
                        {/* Si tenés imagen usás <img />, por ahora va un ícono gigante */}
                        <div className="w-full h-full bg-base-300 flex items-center justify-center text-base-content/50">
                            <UserCircle size={80} strokeWidth={1} />
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-3 mt-2 md:mt-0">
                    <div className="flex items-center gap-4">

                        {/*username*/}
                        <h1 className="text-3xl font-bold">{loading? 'loading' : username}</h1>

                        {/*botones de amistad y edicion*/}
                        <div className="flex items-center gap-2">
                            {/*la logica de esto es asi:
                                    1. somos amigos? si si, el usuario que navega puede eliminar la amistad
                                                     si no, el usuario no puede hacer que sean amigos, asi que no hace nada
                                    2. te mande request? si si, se pone en pending y gris y si pasas por arriba te permite cancelar la request
                                                         si no, el boton esta en verda y aparece Add friend
                            */}
                            {(currentUserId != numericId) ?
                                ( friendAdded? (
                                    <button
                                        className="btn btn-xs bg-[#8A9A5B] hover:bg-[#728249] text-base-100 border-[#8A9A5B] hover:border-[#728249] transition-all w-25"
                                        onClick={handleClickFriend}
                                    >
                                        <UserPlus size={16} className="mr-1" /> Friend!
                                    </button>
                                    ) : (friendReq ? (
                                        <button
                                            className="btn btn-xs btn-outline border-base-content/30 text-base-content/70 group hover:bg-error hover:border-error hover:text-white transition-all w-25"
                                            onClick={handleClickRequest}
                                        >
                                            <span className="flex items-center group-hover:hidden">
                                                <Hourglass size={16} className="mr-1" /> Pending
                                            </span>

                                            <span className="hidden items-center group-hover:flex">
                                                <X size={16} className="mr-1" /> Cancel
                                            </span>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-xs bg-[#8A9A5B] hover:bg-[#728249] text-base-100 border-[#8A9A5B] hover:border-[#728249] transition-all w-25"
                                            onClick={handleClickRequest}
                                        >
                                            <UserPlus size={16} className="mr-1" /> Add Friend
                                        </button>
                                    ))
                                )    :
                                <button className="btn btn-xs btn-outline hover:bg-[#8A9A5B] hover:border-[#8A9A5B] hover:text-base-100 text-[#8A9A5B] transition-colors">
                                    <Edit3 size={14} className="mr-1" /> edit profile
                                </button>
                            }
                        </div>
                    </div>

                    <div className="space-y-1 text-sm text-base-content/80">
                        <p className="flex items-center gap-2">
                            <Activity size={16} className="text-[#8A9A5B]" />
                            <span className="font-semibold text-base-content">Interests:</span> Padel, Tennis, Soccer
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin size={16} className="text-[#8A9A5B]" />
                            <span className="font-semibold text-base-content">Lives in:</span> Pilar, Buenos Aires, Argentina
                        </p>
                        <p className="mt-2 text-base">
                            <span className="font-semibold text-base-content block mb-1">Biography:</span>
                            "I am very very very gud at Soccer. Fr bro"
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Cuerpo de la página (Grid de 2 columnas en desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8 px-0 lg:px-8 mt-6">

                {/* Columna Izquierda: Actividad (Ocupa 2 espacios) */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 px-4 lg:px-0 flex items-center gap-2">
                        Activity
                    </h2>
                    <Posts userId={numericId} posts={posts} page={page} loadPosts={loadPosts} setPage={setPage} setPosts={setPosts} />
                </div>

                {/* Columna Derecha: Amigos y Eventos (Ocupa 1 espacio) */}
                <div className="space-y-8 p-4 lg:p-0">

                    {/* Lista de Amigos */}
                    <div className="bg-base-200/50 rounded-xl p-5 border border-base-300">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Users size={18} className="text-[#8A9A5B]" />
                            John's Friends
                        </h3>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                            {mockFriends.map((friend) => (
                                <div key={friend.id} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                                        <UserCircle size={24} className="text-base-content/50" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm leading-none">{friend.name}</p>
                                        <p className="text-xs text-base-content/60 mt-1">{friend.location}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Eventos en los que participa */}
                    <div className="bg-base-200/50 rounded-xl p-5 border border-base-300">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <CalendarDays size={18} className="text-[#8A9A5B]" />
                            Participates In
                        </h3>
                        <div className="space-y-3">
                            {/* Tarjeta de Evento */}
                            <div className="bg-base-100 p-3 rounded-lg border border-base-300 border-l-4 border-l-[#8A9A5B] hover:bg-base-200 transition-colors cursor-pointer">
                                <h4 className="font-bold text-sm">Futbol game saturday night</h4>
                                <p className="text-xs text-base-content/70 mt-1">Sat 21 Jun · 20:00</p>
                                <p className="text-xs text-base-content/70">City Stadium</p>
                                <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider text-[#8A9A5B] bg-[#8A9A5B]/10 px-2 py-1 rounded">
                  In person event
                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}