"use client";

import { RootState } from "@/app/store";
import { appendPosts, setPosts } from "@/entities/post/model/postsSlice";
import { Post } from "@/entities/post/types";
import { PostCard } from "@/entities/post/ui/PostCard";
import { usePostsQuery } from "@/shared/api/queries/usePostsQuery";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { Empty, Flex, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const LIMIT = 10;

type Props = {
    initialPosts: Post[];
    total: number;
};

export const PostsInfiniteList: React.FC<Props> = ({
    initialPosts,
    total: initialTotal,
}) => {
    const dispatch = useAppDispatch();
    const searchTerm = useSelector((state: RootState) => state.search.term);
    const searchType = useSelector((state: RootState) => state.search.type);
    const posts = useSelector((state: RootState) => state.posts.posts);
    const total = useSelector((state: RootState) => state.posts.total);

    const [page, setPage] = useState(0);
    const [skipInitial, setSkipInitial] = useState(true);
    const initialLoadedRef = useRef(false);

    useEffect(() => {
        if (!initialLoadedRef.current && initialPosts.length > 0) {
            dispatch(setPosts({ posts: initialPosts, total: initialTotal }));
            initialLoadedRef.current = true;
            setSkipInitial(false);
        }
    }, [dispatch, initialPosts, initialTotal]);

    useEffect(() => {
        setPage(0);
        if (initialLoadedRef.current) {
            setSkipInitial(false);
        }
    }, [searchTerm, searchType]);
    console.log(searchType, searchTerm);

    const { data, isLoading } = usePostsQuery({
        page,
        limit: LIMIT,
        searchTerm,
        searchType,
        enabled:
            !skipInitial && !(searchType === "search" && searchTerm === ""),
    });

    useEffect(() => {
        if (!data) return;
        if (page === 0 && searchTerm === "") {
            dispatch(setPosts({ posts: initialPosts, total: total }));
        } else if (page === 0) {
            dispatch(setPosts({ posts: data.posts, total: total }));
        } else {
            dispatch(appendPosts({ posts: data.posts }));
        }
    }, [data, page, dispatch, initialPosts, total]);

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
                <Empty className="mt-[30%]" />
            )}
            {isLoading && <Spin size="large" />}
        </Flex>
    );
};
