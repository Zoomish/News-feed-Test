import { PostsInfiniteList } from "@/features/postsInfiniteList/ui/PostsInfiniteList";

export default function Home() {
    return (
        <main style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1>Новости</h1>
            <PostsInfiniteList />
        </main>
    );
}
