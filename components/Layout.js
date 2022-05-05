import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>My blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <p>
            <Link href="/">
              <a>My blog</a>
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
                <a>Home</a>
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
