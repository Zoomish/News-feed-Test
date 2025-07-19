"use client";

import { RootState } from "@/app/store";
import { appendPosts, setPosts } from "@/entities/post/model/postsSlice";
import { Post } from "@/entities/post/types";
import { PostCard } from "@/entities/post/ui/PostCard";
import { usePostsQuery } from "@/shared/api/queries/usePostsQuery";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Empty, Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LIMIT = 10;

type Props = {
    initialPosts: Post[];
    total: number;
};

export const PostsInfiniteList: React.FC<Props> = ({ initialPosts, total }) => {
    const dispatch = useAppDispatch();
    const searchTerm = useSelector((state: RootState) => state.search.term);
    const posts = useSelector((state: RootState) => state.posts.posts);
    const [page, setPage] = useState(0);

    useEffect(() => {
        dispatch(setPosts({ posts: initialPosts, total }));
    }, [dispatch, initialPosts, total]);

    useEffect(() => {
        setPage(0);
    }, [searchTerm]);

    const { data, isLoading } = usePostsQuery({
        page,
        limit: LIMIT,
        searchTerm,
    });

    useEffect(() => {
        if (data && page > 0) {
            dispatch(appendPosts({ posts: data.posts }));
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
