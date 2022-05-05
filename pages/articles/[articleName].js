import Head from "next/head";
import { getArticle, listArticles, renderArticle } from "../../lib/article";
import Time from "../../components/Time";

export default function ShowArticle({ article }) {
  return (
    <article>
      <Head>
        <title>{article.title}</title>
      </Head>
      <header>
        <Time date={article.date} />
        <h1>{article.title}</h1>
      </header>
      <div dangerouslySetInnerHTML={{ __html: article.renderedBody }}></div>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = listArticles().map((article) => {
    return {
      params: {
        articleName: article.name,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = await renderArticle(
    getArticle({ articleName: params.articleName })
  );
  return {
    props: {
      article,
    },
  };
}
