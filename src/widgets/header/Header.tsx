"use client";
import { setSearchTerm } from "@/features/search/model/searchSlice";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { Flex, Input } from "antd";
import { useRef } from "react";

export const HeaderComponent = () => {
    const dispatch = useAppDispatch();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = (value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            dispatch(setSearchTerm(value));
        }, 400);
    };

    return (
        <Flex justify="center" className="mb-4">
            <div className="max-w-[800px] w-full">
                <Input
                    placeholder="Поиск постов..."
                    onChange={(e) => handleSearch(e.target.value)}
                    allowClear
                />
            </div>
        </Flex>
    );
};
