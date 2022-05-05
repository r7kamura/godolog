import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const articlesDirectoryPaths =
  process.env.ARTICLES_DIRECTORY_PATHS ? process.env.ARTICLES_DIRECTORY_PATHS.split(",") : [path.join(process.cwd(), "google_docs")];

export function getArticle({ articleName }) {
  const articleFile = findArticleFile({ articleName });
  return articleFileToArticle(articleFile);
}

export function listArticles() {
  return articlesDirectoryPaths.flatMap((directoryPath) => {
    return fs.readdirSync(directoryPath).map((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      const content = fs.readFileSync(filePath);
      return {
        content,
        path: filePath,
      };
    });
  })
    .map((articleFile) => {
      return articleFileToArticle(articleFile);
    })
    .filter((article) => {
      return article.date;
    })
    .sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      } else {
        return 0;
      }
    });
}

export async function renderArticle(article) {
  const renderResult = await renderArticleBody(article.body);
  return {
    ...article,
    ...renderResult,
  };
}

async function renderArticleBody(articleBody) {
  const result = await remark()
    .use(remarkHtml)
    // .use(extractDescription)
    // .use(extractImageUrl)
    .process(articleBody);
  const data = result.data;
  return {
    description: data.description || null,
    imageUrl: data.imageUrl || null,
    renderedBody: result.toString(),
  };
}

function articleNameToArticleMetadata(articleName) {
  const matchArray = articleName.match(/^((\d{4}-\d{2}-\d{2})(?:-(.+))?)$/);
  if (matchArray) {
    const name = matchArray[1];
    const date = matchArray[2];
    const slug = matchArray[3] || null;
    return {
      date,
      name,
      slug,
    };
  }
}

function findArticleFile({ articleName }) {
  let result;
  articlesDirectoryPaths.find((directoryPath) => {
    const filePath = path.join(directoryPath, `${articleName}.md`);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      result = {
        content,
        path: filePath,
      }
      return true;
    } catch (error) {
      return false;
    }
  });
  return result;
}

function articleFileToArticle(articleFile) {
  const articleMatter = matter(articleFile.content);
  const articleName = path.basename(articleFile.path, ".md");
  const articleMetadata = articleNameToArticleMetadata(articleName);
  return {
    ...articleMetadata,
    body: articleMatter.content,
    name: articleName,
    title: articleMatter.data.title,
  };
}
