"use client";

import { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/entities/post/model/postApi";
import { PostCard } from "@/entities/post/ui/PostCard";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Post } from "@/entities/post/types";

type Props = {
    initialPosts: Post[];
    total: number;
};

export const PostsInfiniteList = ({ initialPosts, total }: Props) => {
    const limit = 10;
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const skip = page * limit;

    const { data, isFetching } = useGetPostsQuery(
        { limit, skip },
        { skip: page === 0 },
    );

    useEffect(() => {
        if (data?.posts) {
            setPosts((prev) => [...prev, ...data.posts]);
        }
    }, [data]);

    const hasMore = posts.length < total;

    const lastItemRef = useInfinityScroll({
        hasMore,
        isLoading: isFetching,
        onLoadMore: () => setPage((prev) => prev + 1),
    });

    return (
        <div className="mt-6">
            {posts.map((post, idx) => (
                <div
                    ref={idx === posts.length - 1 ? lastItemRef : null}
                    key={post.id}
                >
                    <PostCard post={post} />
                </div>
            ))}
            {isFetching && (
                <div className="text-center py-4 text-gray-500">
                    Загрузка...
                </div>
            )}
        </div>
    );
};
