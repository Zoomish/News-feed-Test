"use client";

import { Card, Tag } from "antd";
import { Post } from "../types";

export const PostCard = ({ post }: { post: Post }) => {
    return (
        <Card title={post.title} style={{ marginBottom: "16px" }}>
            <p
                style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                }}
            >
                {post.body}
            </p>
            <div style={{ marginTop: "8px" }}>
                {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
            <div style={{ marginTop: "8px" }}>❤️ {post.reactions}</div>
        </Card>
    );
};
