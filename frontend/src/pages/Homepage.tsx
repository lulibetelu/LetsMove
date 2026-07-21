import {Search, Plus, X} from 'lucide-react';
import Sidebar from "../components/Sidebar.tsx"
import Posts from "../components/posts/Posts.tsx";
import { useState} from "react";
import PopUpError from "../components/PopUpError.tsx";
import NewPost from "../components/create/NewPost.tsx";
import {usePosts} from "../hooks/posts/usePosts.ts";
import {useQueryClient} from "@tanstack/react-query";
import RecommendationSidebar from "../components/recommendations/RecommendationSidebar.tsx";


export default function Homepage() {
    const [createPost, setCreatePost] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const { posts, deletePost, observerRef, error, isLoading } = usePosts(search || undefined);
    const queryClient = useQueryClient();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
    }

    const handleClearSearch = () => {
        setSearchInput("");
        setSearch("");
    }

    const handleOnClose = (wasCreated: boolean) => {
        setCreatePost(false);
        if (wasCreated) {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    }

    return(
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar/>
                <main className="flex-1 ml-60 flex justify-center">
                    <div className="w-full max-w-2xl min-h-screen relative pb-24">
                        <header className="sticky top-0 z-40 bg-[#141414]/90 backdrop-blur-md px-4 py-5 flex justify-center border-b-2 border-white/10">
                            <div className="w-full max-w-md relative">
                                <form onSubmit={handleSearch}>
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search size={18} className="text-white/50" />
                                    </div>
                                    <input
                                        type="text"
                                        aria-label="Search posts"
                                        placeholder="search"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="input input-bordered w-full rounded-full pl-12 pr-10 h-10 bg-white/5 focus:bg-white/10 transition-colors"
                                    />
                                    {searchInput && (
                                        <button
                                            type="button"
                                            onClick={handleClearSearch}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/80 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </form>
                            </div>
                        </header>
                        <Posts userId={null} posts={posts} deletePost={deletePost} observerRef={observerRef} isLoading={isLoading}/>
                        <div>
                            {error && <PopUpError message='Failed to load posts, please try again later'/>}
                        </div>
                    </div>
                </main>
            <RecommendationSidebar />
            <button type="button" onClick={() => setCreatePost(true)} className="
                fixed bottom-6 right-[19rem]
                w-10 h-10
                rounded-full

                bg-[#96a55a]
                hover:bg-[#a8b96a]

                text-white

                flex items-center justify-center

                shadow-lg
                hover:shadow-2xl

                transition-all duration-300 ease-out

                hover:scale-110
                hover:rotate-90

                active:scale-95

                cursor-pointer
              "
            ><Plus size={18} /></button>
            {createPost && <NewPost onClose={(wasCreated: boolean) => handleOnClose(wasCreated)}/>}
        </div>
    );
}
