const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const { getStoredPosts, storePosts } = require('./posts');

const app = express();
app.use(bodyParser.json());

// CORS Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

// ✅ Ekspor sebagai serverless function untuk Vercel
module.exports = serverless(app);
