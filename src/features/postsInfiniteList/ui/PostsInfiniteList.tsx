"use client";

import { useGetPostsQuery } from "@/entities/post/model/postApi";
import { Post } from "@/entities/post/types";
import { PostCard } from "@/entities/post/ui/PostCard";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Spin } from "antd";
import { useState } from "react";

export const PostsInfiniteList = () => {
    const limit = 10;
    const [page, setPage] = useState(0);
    const skip = page * limit;

    const { data, isFetching } = useGetPostsQuery({ limit, skip });

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = () => {
        if (!isFetching) {
            setPage((prev) => prev + 1);
        }
    };

    const lastItemRef = useInfinityScroll({
        hasMore,
        isLoading: isFetching,
        onLoadMore: handleLoadMore,
    });

    if (data?.posts && allPosts.length < data.total) {
        setAllPosts((prev) => [...prev, ...data.posts]);
        setHasMore(allPosts.length + data.posts.length < data.total);
    }

    return (
        <div>
            {allPosts.map((post, i) => (
                <div
                    ref={i === allPosts.length - 1 ? lastItemRef : null}
                    key={post.id}
                >
                    <PostCard post={post} />
                </div>
            ))}
            {isFetching && (
                <Spin style={{ display: "block", margin: "20px auto" }} />
            )}
        </div>
    );
};
