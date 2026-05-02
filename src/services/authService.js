export async function addUser(newUser) {
    await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    });
}

export async function loginUser(user) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.token;
}