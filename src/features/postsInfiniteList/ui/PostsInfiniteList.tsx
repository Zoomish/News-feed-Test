"use client";

import { RootState } from "@/app/store";
import { appendPosts, setPosts } from "@/entities/post/model/postsSlice";
import { PostCard } from "@/entities/post/ui/PostCard";
import { $axios } from "@/shared/api/axios";
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
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
        setIsLoading(true);
        const skip = page * LIMIT;
        const endpoint = searchTerm
            ? `/posts/search?q=${encodeURIComponent(searchTerm)}`
            : `/posts?limit=${LIMIT}&skip=${skip}`;
        const { data } = await $axios.get(endpoint);
        if (page === 0) {
            dispatch(setPosts({ posts: data.posts, total: data.total }));
        } else {
            dispatch(appendPosts({ posts: data.posts }));
        }

        setIsLoading(false);
    };

    useEffect(() => {
        setPage(0);
    }, [searchTerm]);

    useEffect(() => {
        fetchPosts();
    }, [page, searchTerm]);

    const hasMore = posts.length < total;

    const lastRef = useInfinityScroll({
        hasMore,
        isLoading,
        onLoadMore: () => setPage((prev) => prev + 1),
    });

    return (
        <Flex vertical wrap={false} gap={"small"} className="max-w-[800px]">
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
