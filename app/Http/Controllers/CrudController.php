<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;

class CrudController extends Controller
{
    private function fetchPosts() {
        $posts = Post::select([
            'id as post_id',
            'title',
            'content',
        ])->paginate(2);

        return $posts;
    }

    function loadList() {
        $posts = $this->fetchPosts();
        return inertia('sample-crud/List', [
            'posts' => $posts,
        ]);
    }
    
    public function create()
    {
        return inertia('sample-crud/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Post::create($validated);

        return redirect()
            ->route('list.load')
            ->with('success', 'Post created successfully.');
    }

    // The URL param 'post' will automatically resolve to a Post model instance if names are matched
    function edit(Post $post)
    {
        return inertia('sample-crud/Edit', [
            'post' => $post,
        ]);
    }

    function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post->update($validated);

        return redirect()
            ->route('list.load')
            ->with('success', 'Post updated successfully.');
    }

    function destroy(Post $post)
    {
        $post->delete();

        return redirect()
            ->route('list.load')
            ->with('success', 'Post deleted successfully.');
    }
}
