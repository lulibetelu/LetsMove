import {useCallback, useEffect, useRef, useState} from "react";
import type {PostType} from "../types/postTypes.ts";
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";
import {findAll} from "../api/post.ts";
import Post from "./Post.tsx";

export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
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

    return (
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
    )
}