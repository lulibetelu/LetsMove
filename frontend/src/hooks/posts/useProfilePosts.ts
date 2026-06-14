import {useEffect, useRef} from "react";
import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type {PostType} from "../../types/postTypes.ts";
import {findPostsFromUser, removePost} from "../../api/post.ts";

export function useProfilePosts(userId: number){
    const observerRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isError,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['profilePosts', userId],
        queryFn: (async ({pageParam}) => {
            const posts: PostType[] = await findPostsFromUser(userId, pageParam);
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
        mutationKey: ['profileEventsUpdate'],
        mutationFn: (async (postId: number) => {
            return removePost(postId);
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['profilePosts']});
        }
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

    return { posts, deletePost, observerRef, error, isLoading}

    //yo se que es bastante al pedo esto porque solo cambia la query. Podria hacerse algo ahi pero ueno.

}