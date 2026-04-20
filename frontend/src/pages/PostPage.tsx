import {useLocation} from "react-router-dom";
import Post from "../components/Post.tsx";

export default function PostPage(){
    const { data } = useLocation().state;

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
                    />
                </div>

                {/* Comments section */}
                <div className="bg-base-100 shadow-xl rounded-2xl p-4 flex flex-col gap-4">

                    <h3 className="text-lg font-semibold">Comments</h3>

                    {/* Comment 1 */}
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-sm">user123</span>
                        <p className="text-base-content/80">
                            This is a really interesting post!
                        </p>
                    </div>

                    <hr className="border-base-300" />

                </div>

            </div>

        </div>
    );
}