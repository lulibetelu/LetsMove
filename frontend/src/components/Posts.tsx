import type {PostType} from "../types/postTypes.ts";
import Post from "./Post.tsx";
import {getCurrentUserId} from "../api/user.ts";


interface PostsProps {
    userId: number | null;
    setError: (hasError:boolean) => void;
    posts: PostType[];
    deletePost: (id:number) => void;
    observerRef:  React.RefObject<HTMLDivElement | null>
}

export default function Posts({userId, setError, posts, deletePost, observerRef}: PostsProps) {
    const currentUserId = getCurrentUserId();
    const canDelete = currentUserId === userId;




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
                        deletePost={() => deletePost(p.id)} isForPostPage={false}
                    />
                </div>
            ))}
                <div ref={observerRef} className="h-20 w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md text-[#8A9A5B]"></span>
                </div>
        </div>
    )
}