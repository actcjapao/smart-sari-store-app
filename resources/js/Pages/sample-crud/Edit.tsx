import { useForm, usePage } from '@inertiajs/react';
import Layout from './layout/Layout';

const Edit = () => {
    const { post } : any = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const submit = (e: any) => {
        e.preventDefault();
        put(`/posts/${post.id}`, { preserveScroll: true });
    };

    return (
        <form onSubmit={submit} className="max-w-xl mx-auto mt-10">
            <input
                className="w-full border p-2 mb-3"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
            />
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}

            <textarea
                className="w-full border p-2 mb-3"
                value={data.content}
                onChange={e => setData('content', e.target.value)}
            />
            {errors.content && <div className="text-red-500 text-sm">{errors.content}</div>}

            <button
                disabled={processing}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Update
            </button>
        </form>
    );
};

Edit.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default Edit;
