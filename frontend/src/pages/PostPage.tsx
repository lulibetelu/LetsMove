import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {ArrowLeft, CircleUserRound} from "lucide-react";
import Post from "../components/posts/Post.tsx";
import Sidebar from "../components/Sidebar.tsx";
import type {CommentRequestType} from "../types/commentTypes.ts";
import {createComment, eliminateCommentApi, findAllComments} from "../api/comment.ts";
import PopUpError from "../components/PopUpError.tsx";
import CommentButton from "../components/buttons/CommentButton.tsx";
import type {CreateComment} from "../types/commentTypes.ts";

export default function PostPage(){
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {data} = useLocation().state ?? {};
    const [comments, setComments] = useState<CommentRequestType>();
    const [render, setRender] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [replyError, setReplyError] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!data) {
            navigate("/error", {
                state: {
                    title: "",
                    message: "El posteo ingresado no existe",
                }
            });
            return;
        }
        const fetchData = async () => {
            try {
                const apiComments = await findAllComments(data.id);
                setComments(apiComments);
            } catch {
                // handled inline
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [data, navigate, render]);

    const handleCommentCreation = () => {
        setRender(prev => !prev);
    };

    const eliminateComment = async (commentId: number) => {
        await eliminateCommentApi(commentId);
        setRender(prev => !prev);
    };

    const handleReplySubmit = async () => {
        if (!replyContent.trim()) return;
        try {
            const commentData: CreateComment = {
                postId: data.id,
                content: replyContent,
            };
            await createComment(commentData);
            setReplyContent("");
            handleCommentCreation();
        } catch {
            setReplyError(true);
        }
    };

    const focusReply = () => {
        textareaRef.current?.focus();
    };

    if (loading) return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar />
            <main className="flex-1 ml-60 flex justify-center">
                <span className="text-[#8A9A5B] font-semibold mt-10">Loading...</span>
            </main>
        </div>
    );

    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar />
            <main className="flex-1 ml-60 flex justify-center">
                <div className="w-full max-w-2xl min-h-screen">

                    {/* Sticky header */}
                    <header className="sticky top-0 z-40 bg-[#141414]/90 backdrop-blur-md px-4 py-3 flex items-center gap-4 border-b border-white/5">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} className="text-white/80" />
                        </button>
                        <span className="text-lg font-semibold text-white/90">Post</span>
                    </header>

                    {/* Post */}
                    <div className="border-b border-white/5">
                        <Post
                            id={data.id}
                            userId={data.userId}
                            content={data.content}
                            user={data.user}
                            isLiked={data.isLiked}
                            isDisliked={data.isDisliked}
                            isForPostPage={true}
                            onCommentCreate={handleCommentCreation}
                            onCommentClick={focusReply}
                        />
                    </div>

                    {/* Inline reply composer */}
                    <div className="px-4 py-2.5 border-b border-white/5">
                        <div className="text-xs text-white/40 mb-2">
                            Replying to <span className="text-[#8A9A5B]">@{data.user.username}</span>
                        </div>
                        <div className="flex gap-2">
                            <CircleUserRound size={28} strokeWidth={1.5} className="text-white/40 shrink-0 mt-0.5" />
                            <div className="flex-1 flex flex-col">
                                <textarea
                                    ref={textareaRef}
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Post your reply"
                                    className="w-full bg-transparent border-none outline-none resize-none text-sm text-white/80 placeholder:text-white/30 leading-relaxed py-0.5"
                                    rows={1}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleReplySubmit();
                                        }
                                    }}
                                />
                                <div className="flex justify-end mt-1">
                                    <button
                                        type="button"
                                        onClick={handleReplySubmit}
                                        disabled={!replyContent.trim()}
                                        className="px-3 py-1 bg-[#8A9A5B] hover:bg-[#9bab6b] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium rounded-full transition-colors"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments thread */}
                    <div>
                        {comments?.comments.map((comment) => (
                            <CommentButton
                                key={comment.id}
                                id={comment.id}
                                authorId={comment.authorId}
                                user={comment.user.username}
                                content={comment.content}
                                handleClick={eliminateComment}
                            />
                        ))}
                    </div>

                    {replyError && <PopUpError message="Failed to post reply" />}

                </div>
            </main>
        </div>
    );
}
