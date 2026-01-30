import { Link, router, usePage } from "@inertiajs/react";
import Layout from "./layout/Layout";

const List = () => {
    const { posts, flash }: any = usePage().props;

    const handleDelete = (postId: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        router.delete(`/posts/${postId}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <h2 className="text-center text-4xl font-semibold mt-10 mb-6">
                Sample CRUD List Component
            </h2>

            {/* Flash Message */}
            {flash?.success && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                    {flash.success}
                </div>
            )}

            <div className="flex justify-center">
                <div className="min-w-200">
                    {/* Add */}
                    <div className="mb-4 flex justify-end">
                        <Link
                            href="/posts/add"
                            className="px-3 py-1 bg-green-500 text-white rounded"
                        >
                            Add Post
                        </Link>
                    </div>

                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Content</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts.data.length ? (
                                posts.data.map((post: any) => (
                                    <tr key={post.post_id}>
                                        <td className="px-6 py-4">
                                            {post.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.content}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={`/posts/${post.post_id}/edit`}
                                                    className="px-3 py-1 bg-blue-500 text-white rounded"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            post.post_id,
                                                        )
                                                    }
                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No posts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-1 flex-wrap">
                {posts.links.map((link: any, index: number) => {
                    console.log("posts", posts);
                    return (
                        <Link
                            key={index}
                            href={link.url ?? "#"}
                            preserveScroll
                            className={`px-3 py-1 border rounded text-sm
                                ${link.active ? "bg-blue-500 text-white" : "bg-white"}
                                ${!link.url ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}
            </div>
        </>
    );
};

List.layout = (page: any) => <Layout children={page} />;

export default List;
