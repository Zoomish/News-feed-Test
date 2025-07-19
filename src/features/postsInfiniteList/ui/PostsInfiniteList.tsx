"use client";

import { useGetPostsQuery } from "@/entities/post/model/postApi";
import { Post } from "@/entities/post/types";
import { PostCard } from "@/entities/post/ui/PostCard";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Flex } from "antd";
import { useEffect, useState } from "react";

type Props = {
    initialPosts: Post[];
    total: number;
};

export const PostsInfiniteList = ({ initialPosts, total }: Props) => {
    const LIMIT = 10;

    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const skip = page * LIMIT;

    const { data, isFetching } = useGetPostsQuery(
        { limit: LIMIT, skip },
        { skip: page === 0 },
    );

    useEffect(() => {
        if (data?.posts?.length) {
            setPosts((prev) => {
                const newPosts = data.posts.filter(
                    (post) => !prev.find((p) => p.id === post.id),
                );
                return [...prev, ...newPosts];
            });
        }
    }, [data]);

    const hasMore = posts.length < total;

    const lastRef = useInfinityScroll({
        hasMore,
        isLoading: isFetching,
        onLoadMore: () => setPage((prev) => prev + 1),
    });

    return (
        <Flex vertical wrap={false} gap={"small"} className="max-w-[800px]">
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
        </Flex>
    );
};
