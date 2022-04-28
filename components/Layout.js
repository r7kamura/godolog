import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Googleドキュメントで書くブログ</title>
        <meta
          name="description"
          content="This blog is generated from Google Docs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <p>
            <Link href="/">
              <a>Googleドキュメントで書くブログ</a>
            </Link>
          </p>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>ホーム</a>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/r7kamura"
                target="_blank"
                rel="noreferrer"
              >
                作者
              </a>
            </li>
            <li>
              <a
                href="https://github.com/r7kamura/google-docs-blog-example"
                target="_blank"
                rel="noreferrer"
              >
                コード
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
