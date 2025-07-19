import { Post } from "@/entities/post/types";
import { $axios } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

interface GetPostsParams {
    page: number;
    limit: number;
    searchTerm: string;
}

interface GetPostsResponse {
    posts: Post[];
    total: number;
}

export const usePostsQuery = ({ page, limit, searchTerm }: GetPostsParams) => {
    const skip = page * limit;
    const endpoint = searchTerm
        ? `/posts/search?q=${encodeURIComponent(searchTerm)}`
        : `/posts?limit=${limit}&skip=${skip}`;
    return useQuery<GetPostsResponse>({
        queryKey: ["posts", searchTerm, page],
        queryFn: async () => {
            const { data } = await $axios.get(endpoint);
            return data;
        },
        staleTime: 5000,
    });
};
