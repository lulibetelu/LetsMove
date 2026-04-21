import {Search} from 'lucide-react';
import Sidebar from "../components/Sidebar.tsx"
import Posts from "../components/Posts.tsx";
import {useCallback, useState} from "react";
import type {PostType} from "../types/postTypes.ts";
import type {FindAllPostsTypes} from "../types/findAllPostsTypes.ts";
import {findAll} from "../api/post.ts";
import PopUpError from "../components/PopUpError.tsx";


export default function Homepage() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [page, setPage] = useState<number|undefined>();
    const [error, setError] = useState<boolean>(false);

    const loadPosts = useCallback(async () => {
        try {
            const findAllTypes: FindAllPostsTypes = await findAll();
            setPosts(findAllTypes.formattedPosts);
            setPage(findAllTypes.newCursor);
        } catch {
            setError(true);
        }
    }, []);

    return(
        <div className="min-h-screen bg-base-100 flex">
            <Sidebar onPostCreated={loadPosts}/>
                <main className="flex-1 ml-20 flex justify-center">
                    <div className="w-full max-w-2xl min-h-screen relative pb-24">
                        <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-md px-4 py-5 flex justify-center border-b-2 border-base-content/10">
                            <div className="w-full max-w-md relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search size={18} className="text-base-content/50" />
                                </div>
                                <input
                                    type="text"
                                    aria-label="Search posts"
                                    placeholder="search"
                                    className="input input-bordered w-full rounded-full pl-12 h-10 bg-base-200/50 focus:bg-base-100 transition-colors"
                                />
                            </div>
                        </header>
                        <Posts userId={null} posts={posts} page={page} loadPosts={loadPosts} setPage={setPage} setPosts={setPosts}/>
                        <div>
                            {error && <PopUpError message='Failed to load posts, please try again later'/>}
                        </div>
                    </div>
                </main>
        </div>
    );
}
