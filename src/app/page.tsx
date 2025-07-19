import { PostsResponse } from "@/entities/post/types";
import { PostsInfiniteList } from "@/features/postsInfiniteList/ui/PostsInfiniteList";

const LIMIT = 10;

async function getInitialPosts(): Promise<PostsResponse> {
    const res = await fetch(
        `https://dummyjson.com/posts?limit=${LIMIT}&skip=0`,
        {
            cache: "no-store",
        },
    );
    return res.json();
}

export default async function Home() {
    const data = await getInitialPosts();

    return (
        <main className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Новости</h1>
            <PostsInfiniteList initialPosts={data.posts} total={data.total} />
        </main>
    );
}
