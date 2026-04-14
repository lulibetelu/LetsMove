import { Home, CalendarDays, Users, User, Settings, Plus } from 'lucide-react';
import {useCallback, useState} from "react";
import NewPost from "./NewPost.tsx";
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";
import {findAll} from "../api/post.ts";
import type {PostType} from "../types/postTypes.ts";

export default function Sidebar() {
    const [createPost, setCreatePost] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [posts, setPosts] = useState<PostType[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cursor, setCursor] = useState<number|undefined>();

    const loadPosts = useCallback(async () => {
        try {
            const findAllTypes: FindAllPostsTypes = await findAll();
            setPosts(findAllTypes.formattedPosts);
            setCursor(findAllTypes.newCursor);
        } catch {
            //setError(true);
        }
    }, []);

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
                    <User size={26} strokeWidth={1.5} />
                </button>

                <button type="button" className="btn btn-ghost btn-circle" aria-label="Configuración">
                    <Settings size={26} strokeWidth={1.5} />
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
                {createPost && <NewPost onClose={() => setCreatePost(false)} onPostCreated={loadPosts} />}
            </div>
        </aside>
    );
}
