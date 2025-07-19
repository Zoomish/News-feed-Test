import { Post } from "@/entities/post/types";
import { $axios } from "@/shared/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetPostsResponse = { posts: Post[]; total: number };

type UsePostsQueryParams = {
    page: number;
    limit: number;
    searchTerm: string;
    searchType: string;
    enabled: boolean;
};

export const usePostsQuery = ({
    page,
    limit,
    searchTerm,
    searchType,
    enabled = true,
}: UsePostsQueryParams) => {
    const skip = page * limit;
    const endpoint =
        searchType === "search"
            ? `/posts/search?q=${encodeURIComponent(
                  searchTerm,
              )}&limit=${limit}&skip=${skip}`
            : searchType === "tag"
            ? `/posts/tag/${searchTerm}?limit=${limit}&skip=${skip}`
            : `/posts?limit=${limit}&skip=${skip}`;

    return useQuery<GetPostsResponse>({
        queryKey: ["posts", searchTerm, searchType, page],
        queryFn: async () => {
            const { data } = await $axios.get(endpoint);
            return data;
        },
        enabled,
    });
};
