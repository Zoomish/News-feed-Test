import { PostsInfiniteList } from "@/features/postsInfiniteList/ui/PostsInfiniteList";
import { $axios } from "@/shared/api/axios";

export default async function Home() {
    const res = await $axios.get("/posts", {
        params: { limit: 10, skip: 0 },
    });
    const data = res.data;

    return (
        <main className="max-w-2xl mx-auto p-4">
            <PostsInfiniteList initialPosts={data.posts} total={data.total} />
        </main>
    );
}
