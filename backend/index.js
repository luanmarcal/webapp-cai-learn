const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'posts.json');

app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send(`backend is running on port ${port}`);
});

app.get('/posts', (req, res) => {
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const filePosts = JSON.parse(fileData);

        res.status(200).send(filePosts);
    } else {
        res.status(404).send({ message: 'File not found' });
    }
});

app.post('/posts', (req, res) => {
    const { id, user, post, date } = req.body;

    if (post) {
        let posts = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            posts = JSON.parse(fileData);
        } else {
            fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8');
        }

        posts.push({ id: id, user: user, post: post, date: date });
        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');
        console.log(post);
        res.status(201).send({ message: 'Post created successfully', post });
    } else {
        res.status(400).send({ message: 'Post content is required' });
    }
});

app.delete('/posts', (req, res) => {
    const postId = req.body.id;

    if (postId) {
        let posts = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            posts = JSON.parse(fileData);
        }
        console.log(posts);
        posts.forEach((p, index) => {
            if (p.id === postId) {
                posts.splice(index, 1);
            }
        });
        console.log(posts);
        fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');

        res.status(200).send({ message: 'Post deleted successfully' });
    } else {
        res.status(400).send({ message: 'Post content is required' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});