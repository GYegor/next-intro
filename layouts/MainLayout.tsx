import Head from "next/head";
import Link from "next/link";

interface Props {
  title?: string;
}

export const MainLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${title} | Next Intro`}</title>
        <meta name="keywords" content="next, react, next intro"/>
        <meta name="description" content="This is GYegor NextJS sandbox"/>
        <meta charSet="utf-8" />
      </Head>
      <nav>
        <Link href={'/'}><a>Home</a></Link>
        <Link href={'/about'}><a>About</a></Link>
        <Link href={'/posts'}><a>Posts</a></Link>
      </nav>
      <main>
        {children}
      </main>
      <style jsx>{`
        nav a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </>
  )
};

