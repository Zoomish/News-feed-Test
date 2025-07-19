import { Post } from "@/entities/post/types";
import { DislikeOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Card, Flex, Statistic, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
const { Text, Paragraph } = Typography;

type Props = {
    post: Post;
};

export const PostCard = ({ post }: Props) => {
    return (
        <Card className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition">
            <Flex justify="space-between">
                <Flex wrap gap={6}>
                    {post.tags.map((tag) => (
                        <Tag
                            key={tag}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                        >
                            {tag}
                        </Tag>
                    ))}
                </Flex>
                <span>
                    <EyeOutlined /> {post.views}
                </span>
            </Flex>
            <Title level={2} style={{ marginTop: 8 }}>
                {post.title}
            </Title>
            <Paragraph
                ellipsis={{
                    rows: 3,
                }}
            >
                {post.body}
            </Paragraph>
            <Flex gap={8}>
                <Statistic
                    value={post.reactions.likes}
                    valueStyle={{ fontSize: 15, color: "green" }}
                    prefix={<LikeOutlined style={{ width: 15 }} />}
                />
                <Statistic
                    value={post.reactions.dislikes}
                    valueStyle={{ fontSize: 15, color: "red" }}
                    prefix={<DislikeOutlined style={{ width: 15 }} />}
                />
            </Flex>
        </Card>
    );
};
