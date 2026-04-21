import {useCallback, useEffect, useRef} from "react";
import type {PostType} from "../types/postTypes.ts";
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";
import {findAll, findPostsFromUser} from "../api/post.ts";
import Post from "./Post.tsx";

interface PostsProps {
    userId: number | null;
    posts: PostType[];
    page: number | undefined;
    loadPosts: () => Promise<void>;
    setPage: (page: number | undefined) => void;
    setPosts: (posts: PostType[] | ((prev: PostType[]) => PostType[])) => void;
}

export default function Posts({userId, posts, page, loadPosts, setPage, setPosts}: PostsProps) {
    useEffect(() => {
        loadPosts().then();
    }, [loadPosts]);

    const loadMorePosts = useCallback(async () => {
        if (!page) return;
        try {
            let response: FindAllPostsTypes;
            if (userId === null) {
                response = await findAll(page);
            } else {
                response = await findPostsFromUser(userId, page);
            }
            setPosts((prevPosts) => [...prevPosts, ...response.formattedPosts]);
            setPage(response.newCursor);
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
                    {/*agregue el isForPostPage para distinguir si hago el post clickeable o no, para entrar a la pagina del post*/}
                    <Post user={p.user} content={p.content} id={p.id} userId={p.userId} isLiked={p.isLiked} isDisliked={p.isDisliked} isForPostPage={false}/>
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