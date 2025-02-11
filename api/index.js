const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const { getStoredPosts, storePosts } = require('../data/posts');

const app = express();

console.log("Server is starting...");


app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  console.log("Fetching posts...");
  const storedPosts = await getStoredPosts();
  console.log("Posts fetched:", storedPosts.length);
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

// app.listen(8080);
// app.listen(8080, () => {
//   console.log("Server is running on http://localhost:8080");
// });

// // Export the app as a serverless function
const serverless = require('serverless-http');
module.exports = serverless(app);
