export async function addCommunity(newCommunity) {
    await fetch('/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCommunity)
    });
}

export async function deleteCommunity(community_name) {
    await fetch(`/api/communities/${community_name}`, { method: 'DELETE' });
}

export async function updateCommunity(updatedCommunity) {
    return fetch(`/api/communities/${updatedCommunity.previous_community_name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCommunity)
    });
}