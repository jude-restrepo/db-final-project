export async function addPost(newPost) {
    await fetch(`/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    });
}

export async function deletePost(post_id) {
    await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    })
}