import { useForm } from "@inertiajs/react";
import Layout from "./layout/Layout";

const Add = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
    });

    const foo = 124;

    const submit = (e: React.SubmitEvent) => {
        e.preventDefault();

        post("/posts", {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6">Add Post</h2>

            <input
                className="w-full border p-2 mb-2"
                placeholder="Title"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
            />
            {errors.title && (
                <div className="text-red-500 text-sm mb-2">{errors.title}</div>
            )}

            <textarea
                className="w-full border p-2 mb-2"
                placeholder="Content"
                value={data.content}
                onChange={(e) => setData("content", e.target.value)}
            />
            {errors.content && (
                <div className="text-red-500 text-sm mb-4">
                    {errors.content}
                </div>
            )}

            <button
                disabled={processing}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Create
            </button>
        </form>
    );
};

Add.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default Add;
