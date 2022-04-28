import Link from "next/link";
import { listArticles } from "../lib/article";
import Time from "../components/Time";
import styles from "../styles/articles.module.css";

export default function ListArticles({ articles }) {
  return (
    <>
      <section>
        <ol className={styles.articles}>
          {articles.map((article) => (
            <li key={article.id}>
              <Time datetime={article.createdTime} />
              <Link href={`/articles/${article.id}`}>
                <a>{article.title}</a>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      articles: listArticles(),
    },
  };
}
