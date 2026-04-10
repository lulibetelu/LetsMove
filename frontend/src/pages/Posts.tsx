import {useEffect, useState} from "react";
import {findAll} from "../api/post.ts";
import type {PostType} from "../types/postTypes.ts"
import Post from "../components/Post.tsx"
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";

export default function Posts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    //const [error, setError] = useState(false);
    const [cursor, setCursor] = useState<number|undefined>();

    useEffect(() => {
        async function loadPosts() {
            try {
                const findAllTypes: FindAllPostsTypes = await findAll(cursor);
                setPosts(findAllTypes.formattedPosts);
                setCursor(findAllTypes.newCursor);
            } catch {
                //setError(true);
            }
        }
        loadPosts();
    },[]);

    return(
        <div className="flex flex-col items-center justify-center">
            {posts.map((p) => (
                <div key={p.id} className="max-w-xl w-full">
                <Post user={p.user} content={p.content} id={p.id} userId={p.userId} isLiked={p.isLiked} isDisliked={p.isDisliked}/>
                </div>
            ))}

        </div>
    );
}