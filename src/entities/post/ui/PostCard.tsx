import { Post } from "@/entities/post/types";

type Props = {
    post: Post;
};

export const PostCard = ({ post }: Props) => {
    return (
        <div className="border rounded-2xl p-4 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 line-clamp-3 mb-3">{post.body}</p>

            <div className="flex flex-wrap gap-2 text-sm mb-3">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div className="text-gray-600 text-sm flex justify-between">
                <span>
                    👍 {post.reactions.likes} | 👎 {post.reactions.dislikes}
                </span>
                <span>👁 {post.views}</span>
            </div>
        </div>
    );
};
