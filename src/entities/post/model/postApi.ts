import { $axios } from "@/shared/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Post } from "../types";

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: async ({ url, method = "GET", params }) => {
        try {
            const result = await $axios.request({ url, method, params });
            return { data: result.data };
        } catch (error) {
            return { error };
        }
    },
    endpoints: (build) => ({
        getPosts: build.query<
            { posts: Post[]; total: number },
            { limit: number; skip: number }
        >({
            query: ({ limit, skip }) => ({
                url: "/posts",
                method: "GET",
                params: { limit, skip },
            }),
        }),
    }),
});

export const { useGetPostsQuery } = postApi;
