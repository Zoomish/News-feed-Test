import { $axios } from "@/shared/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Post } from "../types";

type GetPostsParams = { limit: number; skip: number };
type GetPostsResponse = { posts: Post[]; total: number };

interface AxiosQueryArgs {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    params?: Record<string, unknown>;
}

const axiosBaseQuery = async ({
    url,
    method = "GET",
    params,
}: AxiosQueryArgs) => {
    const response = await $axios.request({ url, method, params });
    return { data: response.data };
};

export const postApi = createApi({
    reducerPath: "postApi",
    baseQuery: axiosBaseQuery,
    endpoints: (build) => ({
        getPosts: build.query<GetPostsResponse, GetPostsParams>({
            query: ({ limit, skip }) => ({
                url: "/posts",
                params: { limit, skip },
            }),
        }),
    }),
});

export const { useGetPostsQuery } = postApi;
