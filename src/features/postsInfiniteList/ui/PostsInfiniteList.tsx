"use client";

import { useEffect, useState } from "react";
import { useGetPostsQuery } from "@/entities/post/model/postApi";
import { PostCard } from "@/entities/post/ui/PostCard";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Post } from "@/entities/post/types";

type Props = {
    initialPosts: Post[];
    total: number;
};

export const PostsInfiniteList = ({ initialPosts, total }: Props) => {
    const LIMIT = 10;
    const [page, setPage] = useState(1); // первая страница уже загружена
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const skip = page * LIMIT;

    const { data, isFetching } = useGetPostsQuery(
        { limit: LIMIT, skip },
        { skip: !page },
    );

    useEffect(() => {
        if (data?.posts?.length) {
            setPosts((prev) => [...prev, ...data.posts]);
        }
    }, [data]);

    const hasMore = posts.length < total;

    const lastRef = useInfinityScroll({
        hasMore,
        isLoading: isFetching,
        onLoadMore: () => setPage((prev) => prev + 1),
    });

    return (
        <div className="space-y-4">
            {posts.map((post, index) => (
                <div
                    key={post.id}
                    ref={index === posts.length - 1 ? lastRef : undefined}
                >
                    <PostCard post={post} />
                </div>
            ))}
            {isFetching && (
                <div className="text-gray-500 text-center">Загрузка...</div>
            )}
        </div>
    );
};
