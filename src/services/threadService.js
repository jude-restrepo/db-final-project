export async function addThread(newThread) {
    await fetch(`/api/threads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newThread)
    });
}

export async function closeThread(id) {
    await fetch(`/api/threads/${id}/close`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
}