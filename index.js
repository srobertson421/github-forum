import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import readFile from 'github-fs/readFile.js';
import writeFile from 'github-fs/writeFile.js';

dotenv.config();

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const {
  GITHUB_BASE_URL,
  GITHUB_TOKEN
} = process.env;

async function createTopic({ fileContents, fileName }) {
  const fileWrite = await writeFile({
    repoOwner: 'srobertson421',
    repoName: 'github-forum',
    fileName: `/topics/${fileName}.md`,
    fileContents
  });

  return fileWrite;
}

app.get('/create-topic', async (req, res) => {
  const { topicTitle, topicContent } = req.body;

  const encodedFileName = topicTitle.toLowerCase().replace(' ', '-');

  const topicCreate = createTopic({
    fileName: encodedFileName,
    fileContents: topicContent
  });

  res.send(topicCreate);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});