import type { PostTypes } from '../types/postTypes'
import { Link } from 'react-router-dom';
import {CircleUserRound, MessageCircle, ThumbsDown, ThumbsUp} from 'lucide-react';
export default function Post({ user: {username}, content, userId } : PostTypes){
    return (
        <article className="flex w-full flex-col p-4 border border-base-300 hover:bg-base-200/50 transition-colors duration-200 cursor-pointer">
            <div className="flex items-center gap-2">
                <div className="avatar items-center"><CircleUserRound /></div>
                <div> <Link to={`/user/${userId}`}>{username}</Link> </div>
            </div>
            <div> <p>{content}</p> </div>
            <hr className="my-2 border-gray-50"/>
            <div className="flex items-center gap-2">
                <button type="button"> <ThumbsUp /> </button>
                <button type="button"> <ThumbsDown /> </button>
                <button type="button"> <MessageCircle /> </button>
            </div>
        </article>

    )}