import { RootState } from "@/app/store";
import { Post } from "@/entities/post/types";
import { setSearchTerm } from "@/features/search/model/searchSlice";
import { DislikeOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Card, Flex, Statistic, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useDispatch, useSelector } from "react-redux";

const { Paragraph } = Typography;

type Props = {
    post: Post;
};

export const PostCard: React.FC<Props> = ({ post }) => {
    const dispatch = useDispatch();

    const searchTerm = useSelector((state: RootState) => state.search.term);
    const searchType = useSelector((state: RootState) => state.search.type);

    const onTagClick = (tag: string, isActiveTag: boolean) => {
        dispatch(
            setSearchTerm(
                isActiveTag
                    ? { term: "", type: "search" }
                    : { term: tag, type: "tag" },
            ),
        );
    };

    return (
        <Card className="relative">
            <Flex gap={4} justify="center" wrap={false} align="center" className="absolute" style={{ top: '8px', right: '10px'}}>
                <EyeOutlined /> {post.views}
            </Flex>
            <Flex style={{ marginTop: 8 }}>
                <Flex wrap={false} gap={6}>
                    {post.tags.map((tag) => {
                        const isActiveTag =
                            searchType === "tag" && tag === searchTerm;
                        return (
                            <Tag
                                key={tag}
                                className="cursor-pointer"
                                color={isActiveTag ? "purple" : "blue"}
                                onClick={() => onTagClick(tag, isActiveTag)}
                            >
                                {tag}
                            </Tag>
                        );
                    })}
                </Flex>
            </Flex>
            <Title level={2} style={{ marginTop: 8 }}>
                {post.title}
            </Title>
            <Paragraph
                ellipsis={{
                    rows: 3,
                    expandable: true,
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
