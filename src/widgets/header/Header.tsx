"use client";
import { setSearchTerm } from "@/features/search/model/searchSlice";
import { Flex, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const HeaderComponent: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearchTerm({ term: inputValue, type: "search" }));
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue, dispatch]);

    return (
        <Flex justify="center" className="my-4">
            <Input
                placeholder="Search posts"
                className="max-w-[800px]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                allowClear
            />
        </Flex>
    );
};
