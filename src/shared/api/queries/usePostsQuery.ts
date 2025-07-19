import { Post } from "@/entities/post/types";
import { $axios } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetPostsResponse = { posts: Post[]; total: number };

type UsePostsQueryParams = {
    page: number;
    limit: number;
    searchTerm?: string;
    searchType?: string;
    enabled?: boolean;
};

export const usePostsQuery = ({
    page,
    limit,
    searchTerm,
    searchType,
    enabled = true,
}: UsePostsQueryParams) => {
    const endpoint = searchTerm
        ? `/posts/search?q=${encodeURIComponent(searchTerm)}`
        : searchType
        ? `/posts/tag/${searchType}`
        : `/posts?limit=${limit}&skip=${page * limit}`;

    return useQuery<GetPostsResponse>({
        queryKey: ["posts", searchTerm, searchType, page],
        queryFn: async () => {
            const { data } = await $axios.get(endpoint);
            return data;
        },
        enabled, // используем enabled из параметров
    });
};
