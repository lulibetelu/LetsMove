import {useCallback, useEffect, useRef} from "react";
import type {PostType} from "../types/postTypes.ts";
import {findAll, findPostsFromUser} from "../api/post.ts";
import Post from "./Post.tsx";
import {getCurrentUserId} from "../api/user.ts";

interface PostsProps {
    userId: number | null;
    posts: PostType[];
    page: number | undefined;
    loadPosts: () => Promise<void>;
    setPage: (page: number | undefined) => void;
    setPosts: (posts: PostType[] | ((prev: PostType[]) => PostType[])) => void;
}

export default function Posts({userId, posts, page, loadPosts, setPage, setPosts}: PostsProps) {
    const currentUserId = getCurrentUserId();
    const canDelete = currentUserId === userId;
    useEffect(() => {
        loadPosts().then();
    }, [loadPosts]);

    const loadMorePosts = useCallback(async () => {
        if (!page) return;
        try {
            let response: PostType[];
            if (userId === null) {
                response = await findAll(page+1);
            } else {
                response = await findPostsFromUser(userId, page+1);
            }
            setPosts((prevPosts) => [...prevPosts, ...response]);
            setPage(page+1);
        } catch {
            //set error
        }
    }, [page, setPage, setPosts, userId]);

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const ancla = entries[0];
            if (ancla.isIntersecting && page) {
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
    }, [page, loadMorePosts]);

    return (
        <div className="flex flex-col">
            {posts && posts.map((p) => (
                <div key={p.id} className="w-full border-b-2 border-base-content/10 hover:bg-base-200/30 transition-colors">
                    <Post user={p.user} content={p.content} id={p.id} userId={p.userId} isLiked={p.isLiked} isDisliked={p.isDisliked} canDelete={canDelete}/>
                </div>
            ))}
            {page && (
                <div ref={observerRef} className="h-20 w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md text-primary"></span>
                </div>
            )}
        </div>
    )
}