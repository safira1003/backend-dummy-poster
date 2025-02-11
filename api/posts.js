// const fs = require('node:fs/promises');

// async function getStoredPosts() {
//   const rawFileContent = await fs.readFile('posts.json', { encoding: 'utf-8' });
//   const data = JSON.parse(rawFileContent);
//   const storedPosts = data.posts ?? [];
//   return storedPosts;
// }

// function storePosts(posts) {
//   return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
// }

// exports.getStoredPosts = getStoredPosts;
// exports.storePosts = storePosts;

// const fs = require('fs').promises;
// const path = require('path');

// const filePath = path.join(__dirname, '../data/posts.json');

// async function getStoredPosts() {
//   try {
//     const rawFileContent = await fs.readFile(filePath, 'utf-8');
//     const data = JSON.parse(rawFileContent);
//     return data.posts ?? [];
//   } catch (error) {
//     console.error("Error reading posts.json:", error);
//     return [];
//   }
// }

// async function storePosts(posts) {
//   try {
//     await fs.writeFile(filePath, JSON.stringify({ posts: posts || [] }));
//   } catch (error) {
//     console.error("Error writing posts.json:", error);
//   }
// }

// module.exports = { getStoredPosts, storePosts };

let storedPosts = [];

async function getStoredPosts() {
  return storedPosts;
}

async function storePosts(posts) {
  storedPosts = posts;
}

module.exports = { getStoredPosts, storePosts };
