import {useEffect, useRef} from "react";
import {findAll, removePost} from "../../api/post.ts";
import type {PostType} from "../../types/postTypes.ts";
import {useInfiniteQuery, useMutation} from "@tanstack/react-query";

export function usePosts(search?: string){
    const observerRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isError,
        isLoading,
        refetch,
    } = useInfiniteQuery({
        queryKey: ['posts', search ?? ''],
        queryFn: (async ({pageParam}) => {
            const posts: PostType[] = await findAll(pageParam, search);
            return posts;
        }),
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < 10) return undefined;
            return allPages.length + 1;
        },
        initialPageParam: 1,
    });

    const posts: PostType[] = data?.pages.flat() ?? [];

    const mutation  = useMutation({
        mutationKey: ['eventsUpdate'],
        mutationFn: (async (postId: number) => {
            return removePost(postId);
        })
    })

    const deletePost = (postId: number) => mutation.mutate(postId);




    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);


    const error = isError || mutation.isError;

    return { posts, deletePost, observerRef, isLoading, error, refetch}
}