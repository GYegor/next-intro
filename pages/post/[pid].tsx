import { useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage, NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { MainLayout } from "../../layouts/MainLayout";
import { MyPost } from "../../interfaces/post";
import { ParsedUrlQuery } from "querystring";

interface PostProps {
  post?: MyPost
}

const Post: NextPage<PostProps> = ({ post: serverPost }) => {
  const [post, setPost] = useState(serverPost);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch(`${process.env.BASE_API_URL}/posts/${router.query.pid}`)
      const data = await res.json();
      setPost(data)
      }
    
    if(!serverPost)
      load();
  }, [])

  if (!post) {
    return (
      <MainLayout title={`Post`}>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={`Post ${post.title}`}>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.text}</p>
      <Link href={'/posts'}><a>Return to posts</a></Link>
    </MainLayout>
  )
};


// Post.getInitialProps = async (ctx) => {
//   if (!ctx.req) { // means we already on front and has no req
//     return { post: null } 
//   }
//   console.log(ctx)
//   const res = await fetch(`${process.env.BASE_API_URL}/posts/${ctx.query.pid}`)
//   const post = await res.json();
//   return { post }
// };

interface PostGetServerSidePropsContext extends GetServerSidePropsContext {
  query: ParsedUrlQuery & { pid?: number; }
}


// только для SSR
export const getServerSideProps: GetServerSideProps<{post: MyPost}> = async ({ query, req }: PostGetServerSidePropsContext) =>  {
  if (!req) { // means we already on front and has no req
    return { 
      props: { 
        post: null
      } 
    } 
  }
  const res = await fetch(`${process.env.BASE_API_URL}/posts/${query.pid}`)
  const post = await res.json();
  return {
    props: {
      post
    }
  }
};

export default Post;
