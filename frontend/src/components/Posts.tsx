import {useCallback, useEffect, useRef} from "react";
import type {PostType} from "../types/postTypes.ts";
import {findAll, findPostsFromUser, removePost} from "../api/post.ts";
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
            setPage(response.length === 50 ? page + 1 : undefined);
        } catch {
            //setError(true);
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

    const handleDelete = useCallback(async (postId: number) => {
        try {

            await removePost(postId);
            setPosts(prev => prev.filter(p => p.id !== postId));
        } catch {
            //setError(true);
        }
    }, [setPosts]);

    return (
        <div className="flex flex-col">
            {posts && posts.map((p) => (
                <div
                    key={p.id}
                    className="w-full border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                    <Post
                        user={p.user}
                        content={p.content}
                        id={p.id}
                        userId={p.userId}
                        isLiked={p.isLiked}
                        isDisliked={p.isDisliked}
                        canDelete={canDelete}
                        deletePost={() => handleDelete(p.id)} isForPostPage={false}
                    />
                </div>
            ))}
            {page && (
                <div ref={observerRef} className="h-20 w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md text-[#8A9A5B]"></span>
                </div>
            )}
        </div>
    )
}