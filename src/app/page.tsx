import { PostsInfiniteList } from "@/features/postsInfiniteList/ui/PostsInfiniteList";

export default async function Home() {
    const res = await fetch("https://dummyjson.com/posts?limit=10&skip=0", {
        cache: "no-store",
    });
    const data = await res.json();

    return (
        <main>
            <PostsInfiniteList initialPosts={data.posts} total={data.total} />
        </main>
    );
}
