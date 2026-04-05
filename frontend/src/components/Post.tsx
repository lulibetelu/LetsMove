import type { PostTypes } from 'frontend/src/types/postTypes.ts'
export default function Post({ userId, content } : PostTypes){
    return (
        <div>
            <p>{userId}</p>
            <p>{content}</p>
        </div>
    )
}