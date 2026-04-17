import {useCallback, useEffect, useRef} from "react";
import type {PostType} from "../types/postTypes.ts";
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";
import {findAll, findPostsFromUser} from "../api/post.ts";
import Post from "./Post.tsx";

interface PostsProps {
    userId: number | null;
    posts: PostType[];
    cursor: number | undefined;
    loadPosts: () => Promise<void>;
    setCursor: (cursor: number | undefined) => void;
    setPosts: (posts: PostType[] | ((prev: PostType[]) => PostType[])) => void;
}

export default function Posts({userId, posts, cursor, loadPosts, setCursor, setPosts}: PostsProps) {
    useEffect(() => {
        loadPosts().then();
    }, [loadPosts]);

    const loadMorePosts = useCallback(async () => {
        if (!cursor) return;
        try {
            let response: FindAllPostsTypes;
            if (userId === null) {
                response = await findAll(cursor);
            } else {
                response = await findPostsFromUser(userId, cursor);
            }
            setPosts((prevPosts) => [...prevPosts, ...response.formattedPosts]);
            setCursor(response.newCursor);
        } catch {
            //set error
        }
    }, [cursor, setCursor, setPosts, userId]);

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
            observer.disconnect();
        };
    }, [cursor, loadMorePosts]);

    return (
        <div className="flex flex-col">
            {posts && posts.map((p) => (
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