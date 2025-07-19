"use client";

import { Post } from "../types";

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="border rounded-2xl p-4 mb-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 line-clamp-3">{post.body}</p>
            <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            <div className="text-sm text-gray-500 mt-2">
                ❤️ {post.reactions}
            </div>
        </div>
    );
};
