import {useEffect, useState} from "react";
import {findAll} from "../api/post.ts";
import type {PostTypes} from "../types/postTypes.ts"
import Post from "../components/Post.tsx"

export default function Posts() {
    const [posts, setPosts] = useState<PostTypes[]>([]);
    //const [error, setError] = useState(false);

    useEffect(() => {
        async function loadPosts() {
            try {
                const postsList: PostTypes[] = await findAll();
                setPosts(postsList);
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