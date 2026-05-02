import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/*** HELPERS ***/
const isNonEmptyString = (value) =>
    typeof value === 'string' && value.length > 0;

const asyncHandler = (fn) => (req, res) =>
    Promise.resolve(fn(req, res)).catch((error) =>
        res.status(500).json({ status: 'error', message: `DB error: ${error}` })
    );

/*** EXPRESS INITIALIZATION ***/
const app = express();
app.use(express.json());

/*** DATABASE ***/
let db;
try {
    db = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    console.log('Connected to MySQL');
} catch (error) {
    console.error(`Unable to connect to MySQL: ${error}`);
    process.exit(1);
}

/*** USER ROUTES ***/
app.get('/api/users', asyncHandler(async (req, res) => {
    const [rows] = await db.query('SELECT * FROM user');
    res.json({ status: 'success', users: rows });
}));

app.get('/api/users/:username', asyncHandler(async (req, res) => {
    const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [req.params.username]);
    res.json({ status: 'success', user: rows[0] });
}));

app.get('/api/users/:username/account-info', asyncHandler(async (req, res) => {
    const { username } = req.params;

    const [user] = await db.query(
        'SELECT * FROM user WHERE username = ?',
        [username]
    )

    const [threads] = await db.query(
        'SELECT * FROM thread WHERE username = ?',
        [username]
    );

    const [posts] = await db.query(
        `SELECT * FROM post WHERE username = ?`,
        [username]
    );

    res.json({ status: 'success', user: user[0], threads: threads, posts: posts });
}));

app.post('/api/users', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!isNonEmptyString(username))
        return res.status(400).json({ status: 'error', message: 'Username cannot be empty' });
    if (!isNonEmptyString(password))
        return res.status(400).json({ status: 'error', message: 'Password cannot be empty' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO user (username, hash_pass, created_on) VALUES (?, ?, NOW())',
        [username, hashedPassword]
    );
    res.json({ status: 'success', results: result });
}));

app.post('/api/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const rows = await db.query('SELECT * FROM user WHERE username = ?', [username]);
    const user = rows[0][0];

    if (!user)
        return res.status(404).json({ message: 'Account does not exist' });

    const isMatch = await bcrypt.compare(password, user.hash_pass);
    if (!isMatch)
        return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({ token });
}));

/*** COMMUNITY ROUTES ***/
app.get('/api/communities', asyncHandler(async (req, res) => {
    const [rows] = await db.query('SELECT * FROM community');
    res.json({ status: 'success', communities: rows });
}));

app.get('/api/communities/hot', asyncHandler(async (req, res) => {
    // Complex Query #5
    const [rows] = await db.query('SELECT c.*, ' +
        '(COUNT(DISTINCT(t.thread_id)) + COUNT(DISTINCT(p.post_id))) AS total ' +
        'FROM community AS c ' +
        'LEFT JOIN thread AS t ON c.community_name = t.community_name ' +
        'LEFT JOIN post AS p ON t.thread_id = p.thread_id ' +
        'WHERE p.post_id IN (' +
        'SELECT post_id FROM post WHERE created_on >= NOW() - INTERVAL 1 DAY' +
        ') ' +
        'OR t.thread_id IN (' +
        'SELECT thread_id FROM thread WHERE created_on >= NOW() - INTERVAL 1 DAY' +
        ') ' +
        'GROUP BY c.community_name ORDER BY total DESC');

    res.json({ status: 'success', communities: rows });
}))

app.get('/api/communities/unanswered', asyncHandler(async (req, res) => {
    // Complex Query #4
    const [rows] = await db.query('SELECT c.*, ' +
        'COUNT(DISTINCT(t.thread_id)) AS unanswered_threads ' +
        'FROM community AS c LEFT JOIN thread AS t ' +
        'ON c.community_name = t.community_name ' +
        'WHERE NOT EXISTS (' +
        'SELECT 1 FROM post WHERE thread_id = t.thread_id' +
        ')' +
        'GROUP BY c.community_name ORDER BY unanswered_threads DESC');

    res.json({ status: 'success', communities: rows });
}));

app.get('/api/communities/majority-genre', asyncHandler(async (req, res) => {

    // Complex Query #3
    const [rows] = await db.query('SELECT c.community_name, ' +
        'GROUP_CONCAT(DISTINCT g.genre_name) AS highest_genres ' +
        'FROM community AS c ' +
        'JOIN genre_counts AS g ON c.community_name = g.community_name ' +
        'JOIN max_per_community AS m ON g.community_name = m.community_name ' +
        '    AND g.total = m.max_total ' +
        'GROUP BY c.community_name');

    res.json({ status: 'success', communities: rows });
}));

app.post('/api/communities', asyncHandler(async (req, res) => {
    const { community_name, description } = req.body;

    if (!isNonEmptyString(community_name))
        return res.status(400).json({ status: 'error', message: 'Community name cannot be empty' });
    if (!isNonEmptyString(description))
        return res.status(400).json({ status: 'error', message: 'Community description cannot be empty' });

    const [result] = await db.query(
        'INSERT INTO community (community_name, description) VALUES (?, ?)',
        [community_name, description]
    );
    res.json({ status: 'success', results: result });
}));

app.put('/api/communities/:community_name', asyncHandler(async (req, res) => {
    const { community_name, description, previous_community_name } = req.body;

    if (!isNonEmptyString(community_name))
        return res.status(400).json({ status: 'error', message: 'Community name cannot be empty' });
    if (!isNonEmptyString(description))
        return res.status(400).json({ status: 'error', message: 'Community description cannot be empty' });

    const [result] = await db.query(
        'UPDATE community SET community_name = ?, description = ? WHERE community_name = ?',
        [community_name, description, previous_community_name]
    );
    res.json({ status: 'success', results: result });
}));

app.delete('/api/communities/:community_name', asyncHandler(async (req, res) => {
    const { community_name } = req.params;

    const [result] = await db.query(
        'DELETE FROM community WHERE community_name = ?',
        [community_name]
    );
    if (result.affectedRows === 0)
        return res.status(404).json({ status: 'error', message: 'Community not found' });

    res.json({ status: 'success', results: result });
}));

/*** THREAD ROUTES ***/
app.get('/api/communities/:community_name/threads', asyncHandler(async (req, res) => {
    const { community_name } = req.params;

    const [communities] = await db.query(
        'SELECT * FROM community WHERE community_name = ?',
        [community_name]
    );

    // Complex Query #1
    const [threads] = await db.query(
        'SELECT t.*, GROUP_CONCAT(b.title) AS books ' +
        'FROM thread AS t ' +
        'LEFT JOIN refers_book AS r on t.thread_id = r.thread_id ' +
        'LEFT JOIN book as b on r.book_id = b.book_id ' +
        'WHERE t.community_name = ? ' +
        'GROUP BY t.thread_id',
        [community_name]
    );

    if (communities.length !== 1)
        return res.status(404).json({ status: 'error', message: 'Community not found' });

    res.json({ status: 'success', community: communities[0], threads});
}));

app.post('/api/threads', asyncHandler(async (req, res) => {
    const { title, content, username, community_name, books } = req.body;

    if (!isNonEmptyString(title))
        return res.status(400).json({ status: 'error', message: 'Thread title cannot be empty' });
    if (!isNonEmptyString(content))
        return res.status(400).json({ status: 'error', message: 'Thread content cannot be empty' });

    const conn = await db.getConnection();

    try {
        // Complex Query #2
        await conn.beginTransaction();

        const [result] = await conn.query(
            'INSERT INTO thread (community_name, title, content, ' +
            'username, created_on) ' +
            'VALUES (?, ?, ?, ?, NOW())',
            [community_name, title, content, username]
        );

        const thread_id = result.insertId;

        if (books && books.length > 0) {
            const bookValues = books.map(book_id => [thread_id, book_id]);
            await conn.query(
                'INSERT INTO refers_book (thread_id, book_id) VALUES ?',
                [bookValues]
            );
        }

        await conn.commit();
        res.json({ status: 'success', results: result });
    } catch (e) {
        await conn.rollback();
        res.status(500).json({ status: 'error', message: e.message });
    } finally {
        conn.release();
    }
}));

app.put('/api/threads/:thread_id/close', asyncHandler(async (req, res) => {
    const { thread_id } = req.params;

    const [result] = await db.query(
        'UPDATE thread SET closed_on = NOW() WHERE thread_id = ?',
        [thread_id]
    );
    res.json({ status: 'success', results: result });
}));

/*** POST ROUTES ***/
app.get('/api/posts', asyncHandler(async (req, res) => {
    const [posts] = await db.query(
        'SELECT * FROM post'
    )

    res.json({status: 'success', posts})
}))

app.get('/api/threads/:thread_id/posts', asyncHandler(async (req, res) => {
    const { thread_id } = req.params;

    const [threads] = await db.query(
        'SELECT * FROM thread WHERE thread_id = ?',
        [thread_id]
    );

    const [posts] = await db.query(
        `SELECT * FROM post WHERE thread_id = ?`,
        [thread_id]
    );

    if (threads.length !== 1)
        return res.status(404).json({ status: 'error', message: 'Thread not found' });

    res.json({ status: 'success', thread: threads[0], posts });
}));

app.post('/api/posts', asyncHandler(async (req, res) => {
    const { content, username, thread_id } = req.body;

    if (!isNonEmptyString(content))
        return res.status(400).json({ status: 'error', message: 'Post content cannot be empty' });

    const [result] = await db.query(
        'INSERT INTO post (post_id, thread_id, content, created_on, username) VALUES (?, ?, ?, NOW(), ?)',
        [0, thread_id, content, username]
    );
    res.json({ status: 'success', results: result });
}));

app.put('/api/posts', asyncHandler(async (req, res) => {
    const { post_id, content } = req.body;
    const id = parseInt(post_id)

    if (!isNonEmptyString(content))
        return res.status(400).json({ status: 'error', message: 'Updated content cannot be empty' });

    const [result] = await db.query(
        'UPDATE post SET content = ? WHERE post_id = ?',
        [content, id]
    )

    res.json({ status: 'success', results: result });
}))

app.delete('/api/posts/:post_id', asyncHandler(async (req, res) => {
    const { post_id } = req.params;

    const [result] = await db.query(
        'DELETE FROM post WHERE post_id = ?',
        [post_id]
    );
    if (result.affectedRows === 0)
        return res.status(404).json({ status: 'error', message: 'Post not found' });

    res.json({ status: 'success', results: result });
}));

/*** Book Routes ***/
app.get('/api/books', asyncHandler(async (req, res) => {
    const [books] = await db.query(
        'SELECT * FROM book'
    )

    res.json({ status: 'success', books})
}))

/*** Genre Routes ***/
app.get('/api/genre-names', asyncHandler(async (req, res) => {
    const [genre_names] = await db.query(
        'SELECT genre_name FROM genre'
    )

    res.json({ status: 'success', genre_names })
}))

/*** Special Query Routes ***/
app.get('/thread-and-post-dates-counts', asyncHandler(async (req, res) => {

}));

/*** CATCH-ALL ***/
app.get('/*splat', (req, res) => {
    res.sendFile('index.html', { root: '.' });
});

app.listen(8000, () => console.log('Listening on http://localhost:8000'));