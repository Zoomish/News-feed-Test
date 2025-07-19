import { useCallback, useRef } from "react";

type TUseInfinityScrollProps = {
    hasMore: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
};

export const useInfinityScroll = ({
    hasMore,
    isLoading,
    onLoadMore,
}: TUseInfinityScrollProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastItemRef = useCallback(
        (node: Element | null) => {
            if (isLoading) return;
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    onLoadMore();
                }
            });
            if (node) observerRef.current.observe(node);
        },
        [isLoading, hasMore, onLoadMore],
    );

    return lastItemRef;
};
