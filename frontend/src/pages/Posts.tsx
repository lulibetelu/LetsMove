import {useEffect, useRef, useState} from "react";
import {findAll} from "../api/post.ts";
import type {PostType} from "../types/postTypes.ts"
import Post from "../components/Post.tsx"
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";
import NewPost from "../components/NewPost.tsx";
import { Plus } from 'lucide-react';


export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    //const [error, setError] = useState(false);
    const [cursor, setCursor] = useState<number|undefined>();
    const [createPost, setCreatePost] = useState(false);

    useEffect(() => {
        async function loadPosts() {
            try {
                const findAllTypes: FindAllPostsTypes = await findAll();
                setPosts(findAllTypes.formattedPosts);
                setCursor(findAllTypes.newCursor);
            } catch {
                //setError(true);
            }
        }
        loadPosts();
    },[]);

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
        <div>
            <div className="flex flex-col items-center justify-center">
                {posts.map((p) => (
                    <div key={p.id} className="max-w-xl w-full">
                    <Post user={p.user} content={p.content} id={p.id} userId={p.userId} isLiked={p.isLiked} isDisliked={p.isDisliked}/>
                    </div>
                ))}
                {cursor && (
                    <div ref={observerRef} className="h-10 w-full"> </div>
                )}
            </div>

            <button className="btn btn-neutral fixed bottom-10 right-10 z-50 shadow-2xl btn-circle btn-lg" onClick={()=> setCreatePost(true) }><Plus/></button>
            {createPost && <NewPost onClose={() => setCreatePost(false)} />}
        </div>
    );
}