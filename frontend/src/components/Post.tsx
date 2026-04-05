import type { PostTypes } from 'frontend/src/types/postTypes.ts'
export default function Post({ userId, content } : PostTypes){
    return (
        <article className="flex w-full gap-4 p-4 border-b border-base-300 hover:bg-base-200/50 transition-colors duration-200 cursor-pointer">
            <div className="avatar">profile picture</div>
            <div className="card-title"> <p>{userId}</p> </div>
            <div className="card-body"> <p>{content}</p> </div>

        </article>
    )
}