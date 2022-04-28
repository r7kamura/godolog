import fs from "fs";
import path from "path";
import { parse } from "node-html-parser";

const documentsDirectory = path.join(process.cwd(), "google_docs");

/**
 * @param {string} articleName e.g. "2022-04-28-about"
 * @returns {object|undefined} An article if found.
 */
export function getArticle({ articleName }) {
  const documents = listDocuments();
  const document = documents.find((document) => document.name == articleName);
  if (document) {
    return documentToArticle(document);
  }
}

export function listArticles() {
  const articles = listDocuments().map((document) => {
    return documentToArticle(document);
  });
  return articles.sort(({ createdTime: a }, { createdTime: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

function documentToArticle(document) {
  const body = documentHtmlToBody(document.html);
  const title = documentHtmlToTitle(document.html);

  return {
    ...document,
    body,
    title,
  };
}

function documentHtmlToBody(html) {
  const root = parse(html);
  const body = root.querySelector("body");
  body.querySelectorAll("*[style]").forEach((element) => {
    element.removeAttribute("style");
  });
  body.querySelectorAll("*[id]").forEach((element) => {
    element.removeAttribute("id");
  });
  body.querySelectorAll("p").forEach((element) => {
    if (!element.text) {
      element.remove();
    }
  });
  return body.innerHTML;
}

function documentHtmlToTitle(html) {
  const root = parse(html);
  const firstElement = root.querySelector("body > *");
  return firstElement.text;
}

function listDocuments() {
  const fileNames = fs.readdirSync(documentsDirectory);
  return fileNames.map((fileName) => {
    const relativePath = path.join(documentsDirectory, fileName);
    const fileContent = fs.readFileSync(relativePath, "utf8");
    return JSON.parse(fileContent);
  });
}
