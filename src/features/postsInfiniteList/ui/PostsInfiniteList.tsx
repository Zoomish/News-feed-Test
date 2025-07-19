"use client";

import { RootState } from "@/app/store";
import { appendPosts, setPosts } from "@/entities/post/model/postsSlice";
import { PostCard } from "@/entities/post/ui/PostCard";
import { usePostsQuery } from "@/shared/api/queries/usePostsQuery";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Empty, Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LIMIT = 10;

export const PostsInfiniteList = () => {
    const dispatch = useAppDispatch();
    const searchTerm = useSelector((state: RootState) => state.search.term);
    const posts = useSelector((state: RootState) => state.posts.posts);
    const total = useSelector((state: RootState) => state.posts.total);

    const [page, setPage] = useState(0);
    const { data, isLoading } = usePostsQuery({
        page,
        limit: LIMIT,
        searchTerm,
    });

    useEffect(() => {
        setPage(0);
    }, [searchTerm]);

    useEffect(() => {
        if (data) {
            if (page === 0) {
                dispatch(setPosts({ posts: data.posts, total: data.total }));
            } else {
                dispatch(appendPosts({ posts: data.posts }));
            }
        }
    }, [data, page, dispatch]);

    const hasMore = posts.length < total;
    const lastRef = useInfinityScroll({
        hasMore,
        isLoading,
        onLoadMore: () => setPage((prev) => prev + 1),
    });

    return (
        <Flex vertical wrap={false} gap="small" className="max-w-[800px]">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div
                        key={post.id}
                        ref={index === posts.length - 1 ? lastRef : undefined}
                    >
                        <PostCard post={post} />
                    </div>
                ))
            ) : (
                <Empty />
            )}
            {isLoading && <Spin size="large" />}
        </Flex>
    );
};
