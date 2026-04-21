import {useLocation} from "react-router-dom";
import Post from "../components/Post.tsx";
import {useEffect, useState} from "react";
import type {CommentRequestType} from "../types/commentTypes.ts";
import {eliminateCommentApi, findAllComments} from "../api/comment.ts";
import PopUpError from "../components/PopUpError.tsx";
import Comment from "../components/Comment.tsx";

export default function PostPage(){
    const [loading, setLoading] = useState(true);
    const { data } = useLocation().state;
    const [comments, setComments] = useState<CommentRequestType>()
    const [render, setRender] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiComments: CommentRequestType = await findAllComments(data.id);
                setComments(apiComments);
            }catch{
                return <PopUpError message="Something went wrong Could not reach requests"/>
            }finally {
                setLoading(false);

            }
        }

        fetchData();
    }, [data.id, render]);

    const handleCommentCreation = () => {
        setRender(prev => !prev);
    }

    const eliminateComment = async (commentId: number) => {
	    const comment = await eliminateCommentApi(commentId);
        console.log(comment);
        setRender(prev => !prev);
    }

    if (loading) return <span className="font-bold text-[#6B8E23]">Loading...</span>

    return (
        <div className="min-h-screen bg-base-200 flex justify-center py-10 px-4">

            <div className="w-full max-w-3xl flex flex-col gap-6 ">

                {/* Post */}
                <div className="bg-base-100 shadow-xl rounded-2xl p-4">
                    <Post
                        id={data.id}
                        userId={data.userId}
                        content={data.content}
                        user={data.user}
                        isLiked={data.isLiked}
                        isDisliked={data.isDisliked}
                        isForPostPage={true}
                        onCommentCreate={handleCommentCreation}
                    />
                </div>

                {/* Comments section */}
                <div className="bg-base-100 shadow-xl rounded-2xl p-4 flex flex-col gap-4">

                    <h3 className="text-lg font-semibold">Comments</h3>
                    {/* Comment 1 */}
                    {comments?.comments.map(comment =>
                        <Comment key={comment.id} id={comment.id} user={comment.user.username} content={comment.content} handleClick={eliminateComment}/>
                    )}

                </div>

            </div>

        </div>
    );
}
