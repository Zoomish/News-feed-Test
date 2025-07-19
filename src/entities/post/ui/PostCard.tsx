import { Post } from "@/entities/post/types";
import { DislikeOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Card, Flex, Statistic, Tag } from "antd";
import Title from "antd/es/typography/Title";

type Props = {
    post: Post;
};

export const PostCard = ({ post }: Props) => {
    return (
        <Card className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition">
            <Flex justify="space-between">
                <div className="flex flex-wrap gap-2 text-sm mb-3">
                    {post.tags.map((tag) => (
                        <Tag
                            key={tag}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                        >
                            {tag}
                        </Tag>
                    ))}
                </div>
                <span>
                    <EyeOutlined /> {post.views}
                </span>
            </Flex>
            <Title level={2}>{post.title}</Title>
            <p className="text-gray-700 line-clamp-3 mb-3">{post.body}</p>

            <Flex>
                <Statistic
                    value={post.reactions.likes}
                    prefix={<LikeOutlined size={5} />}
                />
                <Statistic
                    value={post.reactions.dislikes}
                    prefix={<DislikeOutlined size={5} />}
                />
            </Flex>
        </Card>
    );
};
