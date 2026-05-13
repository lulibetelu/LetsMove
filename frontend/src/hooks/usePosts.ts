import {useEffect, useRef, useState} from "react";
import {findAll, findPostsFromUser, removePost} from "../api/post.ts";
import type {PostType} from "../types/postTypes.ts";

export function usePosts(isProfile: boolean, userId: number = 1){
    const [posts, setPosts] = useState<PostType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>();
    const observerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<boolean>(false);

    const updateState = (fetchedPosts: PostType[]) => {
        if (fetchedPosts.length < 50 || fetchedPosts.length === 0) {
            setHasMore(false);
            return page;
        }

        setHasMore(true);
        return page +1;
    }


    function updatePosts() {
        findAll(page)
            .then((p) => {
                setPosts(prev => [...prev, ...p]);
                setPage(updateState(p));
            })
            .catch((_) => setError(true))
    }

    function updatePostsByUserId(userId: number){
        findPostsFromUser(userId)
            .then((p) => setPosts(p))
            .catch((_) => setError(true))
    }

    function deletePost(id: number) {
        removePost(id)
            .then(() => updatePostsByUserId(userId))
            .catch((_) => setError(true))
    }

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const ancla = entries[0];
            if (ancla.isIntersecting && hasMore) {
                updatePosts();
            }
        };

        const observer = new IntersectionObserver(observerCallback);

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [page, updatePosts]);

    useEffect(() => {
        if (!isProfile) {
            updatePosts();
            return
        }
        updatePostsByUserId(userId)

    }, [setPosts]);

    return { posts, updatePosts, deletePost, observerRef, error }
}