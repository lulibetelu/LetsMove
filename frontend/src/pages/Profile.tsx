import {MapPin, Users, Edit3, UserCircle, Activity, UserPlus, Hourglass, X, LogOut} from 'lucide-react';
import Posts from "../components/posts/Posts.tsx";
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createFriendRequest, findUniqueFriend, removeFriend} from "../api/friend.ts";
import type { FriendRequestType } from '../types/friendRequestType.ts';
import {getCurrentUserId} from "../api/user.ts";
import {useUserProfile} from "../hooks/useUserProfile.ts";
import Sidebar from "../components/Sidebar.tsx";
import ActivityTabBar from "../components/ActivityTabBar.tsx";
import Events from "../components/events/Events.tsx";
import {useProfilePosts} from "../hooks/posts/useProfilePosts.ts";
import {useProfileEvents} from "../hooks/events/useProfileEvents.ts";

export default function Profile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const numericId = Number(id);
    const isValid = !isNaN(numericId);

    const { data: profile, isLoading: profileLoading, isError } = useUserProfile(numericId);
    const currentUserId = getCurrentUserId();

    const [friendReq, setFriendReq] = useState<boolean>(false);
    const [friendAdded, setFriendAdded] = useState<boolean>(false);
    const { posts, deletePost,observerRef, isLoading: postsLoading } = useProfilePosts(numericId);
    const [searchParams, setSearchParams] = useSearchParams();
    const [tab, setTab] = useState<'posts' | 'events'>(searchParams.get('tab') === 'events' ? 'events' : 'posts');
    const {events} = useProfileEvents(numericId);


    const logout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    useEffect(() => {
        findUniqueFriend(numericId)
            .then((data: FriendRequestType[]) => {
                const hasRequested: boolean = data.some(f => f.state === 'Requested');
                setFriendReq(hasRequested);

                const isFriend: boolean = data.some(f => f.state === 'Accepted');
                setFriendAdded(isFriend);
            });
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

    useEffect(() => {
        if (!isValid) {
            navigate("/error", { state: { message: "ID inválido" } });
            return;
        }
        if (isError) {
            navigate("/error", { state: { message: "El usuario no existe" } });
        }
    }, [isValid, isError, navigate]);

    if (profileLoading || !profile) return null;

    const interests = profile.preferences.map(p => p.sport.name).join(", ");
    const location = profile.userLocations[0]?.location.location ?? null;

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>

            <main className="flex-1 ml-60">
                <div className="w-full max-w-5xl mx-auto pb-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 border-b border-white/5">
                        <div className="w-28 h-28 rounded-full ring-2 ring-[#8A9A5B] ring-offset-2 ring-offset-[#141414] flex items-center justify-center bg-[#2a2a2a] shrink-0">
                            <UserCircle size={72} strokeWidth={0.8} className="text-white/20"/>
                        </div>

                        <div className="flex-1 space-y-3 mt-2">
                            <div className="flex items-center gap-4 flex-wrap">

                                <h1 className="text-2xl font-bold text-white/90">{profile.username}</h1>

                                {(currentUserId != numericId) ?
                                    ( friendAdded? (
                                        <button
                                            className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white hover:bg-red-500 transition-all"
                                            onClick={handleClickFriend}
                                            style={{background: "linear-gradient(135deg, #8A9A5B, #6b7a46)"}}
                                        >

                                            <span className="flex items-center gap-1 group-hover:hidden">
                                                <UserPlus size={14} /> Friend!
                                            </span>

                                            <span className="hidden items-center gap-1 group-hover:flex">
                                                <X size={14} /> End Friendship
                                            </span>
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
                                {interests && (
                                    <p className="flex items-center gap-2">
                                        <Activity size={15} className="text-[#8A9A5B]" />
                                        <span className="text-white/80 font-medium">Interests:</span> {interests}
                                    </p>
                                )}
                                {location && (
                                    <p className="flex items-center gap-2">
                                        <MapPin size={15} className="text-[#8A9A5B]" />
                                        <span className="text-white/80 font-medium">Lives in:</span> {location}
                                    </p>
                                )}
                                {profile.biography && (
                                    <p className="mt-2">
                                        <span className="text-white/80 font-medium block mb-0.5">Biography:</span>
                                        "{profile.biography}"
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 mt-8">

                        <div className="lg:col-span-2">
                            <h2 className="text-base font-semibold text-white/50 uppercase tracking-widest mb-4 px-0">
                                Activity
                            </h2>
                            <div className="rounded-xl overflow-hidden border border-white/5">
                                <ActivityTabBar
                                    defaultTab={tab}
                                    onTabChange={(tab) => {
                                        setTab(tab);
                                        setSearchParams(tab === 'posts' ? {} : { tab }, { replace: true });
                                    }}
                                />
                                {tab === 'posts' ? (
                                    <Posts userId={numericId} posts={posts} deletePost={deletePost} observerRef={observerRef} isLoading={postsLoading}/>
                                ) : (
                                    <Events eventArray={events}/>
                                )}

                            </div>
                        </div>

                        <div className="space-y-6">

                            <div className="bg-[#1e1e1e] rounded-xl p-5 border border-white/5">

                                <h3 className="font-semibold text-sm text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Users size={15} className="text-[#8A9A5B]" />
                                    {profile.username}'s Friends
                                </h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                    {profile.friends.length === 0 ? (
                                        <p className="text-sm text-white/40">No friends yet</p>
                                    ) : (
                                        profile.friends.map((friend) => (
                                            <Link
                                                key={friend.id}
                                                to={`/profile/${friend.id}`}
                                                className="flex items-center gap-3 hover:bg-white/5 transition-all rounded-lg px-2 py-1.5"
                                            >
                                                <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
                                                    <UserCircle size={20} className="text-white/20" />
                                                </div>
                                                <p className="text-sm font-semibold text-white/80 leading-none">{friend.username}</p>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}