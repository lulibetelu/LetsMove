import {useCallback, useEffect, useRef, useState} from "react";
import {findAll} from "../api/post.ts";
import type {PostType} from "../types/postTypes.ts"
import Post from "../components/Post.tsx"
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";
import {Search} from 'lucide-react';
import Sidebar from "../components/Sidebar.tsx"


export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    //const [error, setError] = useState(false);
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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPosts();
    },[loadPosts]);

    async function loadMorePosts() {
        if (!cursor) return;
        try {
            const response= await findAll(cursor);
            setPosts((prevPosts) => [...prevPosts, ...response.formattedPosts]);
            setCursor(response.newCursor);
        } catch {
            //set error
        }
    }

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const ancla = entries[0];
            if (ancla.isIntersecting && cursor) {
                loadMorePosts();
            }
        };

        const observer = new IntersectionObserver(observerCallback);

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [cursor, posts]);

    return(
        <div className="min-h-screen bg-base-100 flex">
            <Sidebar onPostCreated={() => loadPosts()} />
                <main className="flex-1 ml-20 flex justify-center">
                    <div className="w-full max-w-2xl min-h-screen relative pb-24">
                        <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-md px-4 py-5 flex justify-center border-b-2 border-base-content/10">
                            <div className="w-full max-w-md relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search size={18} className="text-base-content/50" />
                                </div>
                                <input
                                    type="text"
                                    aria-label="Search posts"
                                    placeholder="search"
                                    className="input input-bordered w-full rounded-full pl-12 h-10 bg-base-200/50 focus:bg-base-100 transition-colors"
                                />
                            </div>
                        </header>
                        <div className="flex flex-col">
                            {posts.map((p) => (
                                <div key={p.id} className="w-full border-b-2 border-base-content/10 hover:bg-base-200/30 transition-colors">
                                <Post user={p.user} content={p.content} id={p.id} userId={p.userId} isLiked={p.isLiked} isDisliked={p.isDisliked}/>
                                </div>
                            ))}
                            {cursor && (
                                <div ref={observerRef} className="h-20 w-full flex items-center justify-center">
                                    <span className="loading loading-spinner loading-md text-primary"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
        </div>
    );
}
