import Head from "next/head";
import { getArticle, listArticles } from "../../lib/article";
import Time from "../../components/Time";

export default function ShowArticle({ article }) {
  return (
    <article>
      <Head>
        <title>{article.title}</title>
      </Head>
      <Time datetime={article.createdTime} />
      <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
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
  return {
    props: {
      article: getArticle({ articleName: params.articleName }),
    },
  };
}
